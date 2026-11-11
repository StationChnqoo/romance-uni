<!--
  Twitter 博主收藏夹 - 列表
  由 DatingList 的骨架迁移（无状态筛选 tab，纯列表）。

  - 后端 /twitter-bloggers 已改真分页（currentPage / pageSize，返回 CommonPage{records, hasNextPage}），
    与 /posts 同口径：queryList 收 pageNo/pageSize，completeByNoMore(records, !hasNextPage)。
  - 空态用 z-paging 自带的（不自己画）。
  - 首屏由 z-paging 在 onLoad 时 @query 拉首屏，不用 onShow 重拉（避免返回时滚动条跳顶）。
  - 右下角悬浮「+」是绝对定位悬浮层，**不给列表留让位高度**。
  - 整卡点击外跳系统默认浏览器（plus.runtime.openURL 拉起系统浏览器，不再进应用内 Webviewer）。
  - 编辑 / 删除走每张卡片名字行右侧的「更多」icon（wd-popover 向下弹出菜单），不再用左滑。
-->
<template>
  <view :style="themeVars" class="tw-list">
    <z-paging
      ref="pagingRef"
      v-model="list"
      class="tw-list__paging"
      :fixed="false"
      :refresher-enabled="true"
      :loading-more-enabled="true"
      @query="queryList">
      <view class="tw-list__body">
        <view v-for="item in list" :key="item.id" class="tw-list__cell">
          <TwitterBloggerItem
            :item="item"
            @press="onOpenH5(item)"
            @edit="onEdit(item)"
            @delete="onDelete(item)" />
        </view>
      </view>
    </z-paging>

    <view class="tw-list__fab" :style="{ background: theme }" @click="onAdd">
      <wd-icon name="add" />
    </view>
  </view>
  <ToastContainer />
  <DialogContainer />
</template>

<script lang="ts" setup>
import ToastContainer from '@/components/ToastContainer.vue'
import DialogContainer from '@/components/DialogContainer.vue'
import { computed, ref } from 'vue'
import { selectTwitterBloggers, deleteTwitterBlogger } from '@/api'
import { Router } from '@/common/router'
import { Dialog } from '@/components/Dialog'
import { useUserStore } from '@/stores/user'
import { toast } from '@/utils'
import type { TwitterBlogger } from '@/types/twitter'
import TwitterBloggerItem from '@/pkg-twitter/components/TwitterBloggerItem.vue'
import { useThemeVars } from '@/composables/useThemeVars'

const themeVars = useThemeVars()


const userStore = useUserStore()
const theme = computed(() => userStore.theme)

/** z-paging 实例 */
const pagingRef = ref<any>(null)
const list = ref<TwitterBlogger[]>([])

/**
 * z-paging 查询回调（真分页，与 /posts 同口径）。
 * 收 pageNo / pageSize，第二参用后端 hasNextPage 反推 !hasNextPage
 * （单参调用 noMore 为 undefined 会被 z-paging 误判为「还有更多」从而露出加载更多，必须显式传）。
 * z-paging 在 onLoad 时自动 @query 拉首屏，无需 onShow 重拉。
 */
const queryList = async (pageNo: number, pageSize: number) => {
  try {
    const pageData = await selectTwitterBloggers({ currentPage: pageNo, pageSize })
    pagingRef.value?.completeByNoMore(pageData.records || [], !pageData.hasNextPage)
  } catch (error) {
    pagingRef.value?.complete(false)
  }
}

/** 外跳系统默认浏览器：App 端用 5+ runtime 直接拉起系统浏览器（外部），不进应用内 web-view */
const openExternal = (url: string) => {
  if (!url) return
  // #ifdef APP-PLUS
  plus.runtime.openURL(url)
  // #endif
  // #ifndef APP-PLUS
  window.open(url, '_blank')
  // #endif
}

/** 整卡点击：有主页链接外跳系统浏览器；无链接则进编辑页补填 */
const onOpenH5 = (item: TwitterBlogger) => {
  if (!item?.id) return
  if (!item.twitterUrl) {
    Router.navigate('EditTwitter', { id: item.id })
    return
  }
  openExternal(item.twitterUrl)
}

/** 更多菜单 - 编辑 */
const onEdit = (item: TwitterBlogger) => {
  if (!item?.id) return
  Router.navigate('EditTwitter', { id: item.id })
}

/** 更多菜单 - 删除（二次确认） */
const onDelete = async (item: TwitterBlogger) => {
  if (!item?.id) return
  const result = await Dialog.show({
    title: '提示',
    message: `确定删除「${item.name || '该博主'}」吗？删除后不可恢复`,
    positiveText: '删除',
    negativeText: '取消'
  })
  if (result !== 'confirm') return
  try {
    await deleteTwitterBlogger(item.id)
    toast('已删除')
    pagingRef.value?.reload()
  } catch (error) {
    Dialog.show({ title: '提示', message: '删除失败，请稍后重试', positiveText: '我知道了' })
  }
}

const onAdd = () => Router.navigate('EditTwitter', {})
</script>

<style lang="scss" scoped>
.tw-list {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f0f0;

  &__paging {
    flex: 1;
  }
  &__body {
    display: flex;
    flex-direction: column;
  }
  /* 每张卡片自己带白底和内边距，这里只负责发丝分隔线（最后一条不画） */
  &__cell {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }
  }

  /* 右下角悬浮主按钮（绝对定位悬浮层，不占列表高度） */
  &__fab {
    position: fixed;
    right: 30rpx;
    bottom: 60rpx;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 96rpx;
    height: 96rpx;
    border-radius: 50%;
    color: #fff;
    font-size: 52rpx;
    box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.2);

    &:active {
      transform: scale(0.94);
    }
  }
}
</style>
