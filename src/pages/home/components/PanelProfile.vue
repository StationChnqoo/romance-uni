<template>
  <view class="panel-profile">
    <view class="panel-profile__avatar-wrap" @click="onAvatar">
      <image v-if="logined" class="panel-profile__avatar" :src="user.avatar" />
      <view v-else class="panel-profile__avatar panel-profile__avatar--empty" />
    </view>
    <text class="panel-profile__name">{{ user?.name || '请登录' }}</text>
    <view class="panel-profile__spacer" />
    <view class="panel-profile__action" :style="{ backgroundColor: theme }" @click="onPress">
      <wd-icon :name="logined ? 'logout' : 'login'" />
    </view>
  </view>
</template>

<script lang="ts" setup>
/**
 * 首页悬浮面板 - 用户条
 * 点头像进设置页 + 昵称 + 右侧圆形 icon 按钮：登录·退出。
 * （设置入口改为从头像进，首页宫格里的「设置」入口已删。）
 * 版式参考原「我的」页 Profile.vue（该页已删除），但不带 Card 外壳与 longpress showSecret。
 *
 * 用户信息：userStore.user 随「我的」页一起删除后不再有页面拉取，
 * 所以挂载时若有 token 但没有用户信息，自动 selectUser 补拉一次。
 * 登录退出行为沿用原「我的」页：退出先弹确认，清 token / user 后去登录页。
 * 登录页 reLaunch 打开后统一回首页，所以 goLogin 不需要带 from。
 */
import { computed, onMounted } from 'vue'
import type { User } from '@/types/common'
import { useUserStore } from '@/stores/user'
import { selectUser } from '@/api'
import { Dialog } from '@/components/Dialog'
import { Router } from '@/common/router'

const userStore = useUserStore()
const theme = computed(() => userStore.theme)
const user = computed(() => userStore.user)
const logined = computed(() => !!userStore.token)

onMounted(async () => {
  if (userStore.token && !userStore.user?.id) {
    try {
      const user = await selectUser()
      if (user) {
        userStore.user = user
      }
    } catch (error) {
      /* 拉不到就维持「请登录」占位，不打断面板 */
    }
  }
})

/** 点头像进设置页（设置入口改到头像，宫格入口已删） */
const onAvatar = () => {
  Router.navigate('MarketSettings')
}

const onPress = async () => {
  if (logined.value) {
    const result = await Dialog.show({
      title: '提示',
      message: '确认要退出登录吗？',
      positiveText: '确认',
      negativeText: '取消'
    })
    if (result !== 'confirm') return
    userStore.token = ''
    userStore.user = {} as User
    setTimeout(() => {
      Router.goLogin()
    }, 1000)
  } else {
    Router.goLogin()
  }
}
</script>

<style lang="scss" scoped>
.panel-profile {
  display: flex;
  flex-direction: row;
  align-items: center;
  /* 面板容器已去掉左右 padding，用户条自己留边 */
  margin: 0 32rpx 24rpx;

  &__avatar-wrap {
    display: flex;
  }
  &__avatar {
    width: 72rpx;
    height: 72rpx;
    border-radius: 36rpx;
    background-color: #eee;
  }
  &__avatar--empty {
    background-color: #eee;
  }
  &__name {
    margin-left: 16rpx;
    color: #333;
    font-weight: 500;
    font-size: 32rpx;
    /* 只留昵称一行，超长截断 */
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__spacer {
    flex: none;
  }
  &__action {
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: 64rpx;
    height: 64rpx;
    border-radius: 32rpx;
    /* 与左侧相邻元素（昵称 / 另一个按钮）拉开间距 */
    margin-left: 16rpx;
    /* 字号给在容器上、由里面的 wd-icon 继承：走 size / color 会落到内联 style，
       而内联样式里的 rpx 在 H5 / App 上不生效 */
    font-size: 40rpx;
    color: #fff;
  }
}
</style>
