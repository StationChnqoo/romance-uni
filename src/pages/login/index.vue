<template>
  <view class="login">
    <view class="login__gap" />
    <input
      :value="params.mobile"
      class="login__input"
      placeholder="手机"
      placeholder-class="login__placeholder"
      @input="onMobileInput"
    />
    <view class="login__line" />
    <input
      :value="params.password"
      class="login__input"
      placeholder="密码"
      placeholder-class="login__placeholder"
      :password="true"
      @input="onPasswordInput"
    />
    <view class="login__gap" />
    <wd-button
      block
      size="large"
      :round="false"
      :custom-style="'background-color: ' + theme"
      @click="onSubmit"
    >
      登录
    </wd-button>
  </view>
  <ToastContainer />
</template>

<script lang="ts" setup>
/**
 * 登录
 * 由 cloud-react-native/src/screens/Login/index.tsx 迁移。
 *
 * - RN 的 <ToolBar title="登录"> -> uni-app 原生导航栏：pkg-auth/login 在 pages.json 里
 *   配 navigationStyle=default + navigationBarTitleText=登录。
 *   注意不能用 custom，否则原生栏被隐藏、标题栏整个消失。
 * - RN 的 ToolBar 带返回按钮，这里没有：登录页是 Router.goLogin 用 uni.reLaunch 打开的，
 *   进去后它是栈里唯一的页面，原生栏本来就不会渲染返回箭头，行为一致。
 */
import ToastContainer from '@/components/ToastContainer.vue'
import { computed, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useUserStore } from '@/stores/user'
import { login } from '@/api'
import { toast } from '@/utils'
import { Router } from '@/common/router'
import type { LoginFrom } from '@/types/router'

const userStore = useUserStore()

/** 按钮底色统一走 store 的主题色，别再写死色值 */
const theme = computed(() => userStore.theme)

const params = reactive({
  mobile: '',
  password: ''
})

/** 保留来源参数，兼容旧入口链接。登录后统一回首页。 */
let from: LoginFrom = 'Data'

// uni-app 的 input 事件载荷在 detail.value（H5 原生为 target.value），这里兼容两种
const onMobileInput = (e: any) => {
  params.mobile = e?.detail?.value ?? e?.target?.value ?? ''
}

const onPasswordInput = (e: any) => {
  params.password = e?.detail?.value ?? e?.target?.value ?? ''
}

const onSubmit = async () => {
  if (!params.mobile || !params.password) {
    toast('请填写正确手机和密码')
    return
  }
  const token = await login(params)
  if (token) {
    userStore.token = token
    toast('登录成功')
    Router.goHome()
    return
  }
  toast('登录失败')
}

/**
 * 登录页位于功能分包。
 * 已有 token 时直接进首页，不再展示表单。
 */
onLoad(options => {
  const target = (options as { from?: string })?.from
  if (target === 'My' || target === 'Data') {
    from = target
  }
  if (userStore.token) {
    Router.goHome()
  }
})
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  padding-left: 30rpx;
  padding-right: 30rpx;
  background-color: #fff;
  min-height: 100vh;

  &__gap {
    height: 32rpx;
    flex-shrink: 0;
  }
  &__input {
    height: 72rpx;
    margin: 0;
    padding: 0 24rpx;
    background-color: #eee;
    border-radius: 10rpx;
    font-size: 32rpx;
    box-sizing: border-box;
    width: 100%;
  }
  &__placeholder {
    color: #999;
  }
  &__line {
    height: 2rpx;
    background-color: #eee;
    margin-top: 10rpx;
    margin-bottom: 10rpx;
    flex-shrink: 0;
  }
}
</style>
