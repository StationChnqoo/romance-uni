<template>
  <view class="md-preview">
    <rich-text v-if="content" class="md-preview__content" :nodes="contentHtml" selectable />
    <view v-else class="md-preview__empty">
      <text class="md-preview__empty-text">暂无内容</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
/**
 * Markdown 预览页
 * 由 cloud-react-native/src/screens/PreviewMarkdown 迁移（RN 用 WebView + CDN markdown-it，
 * uni 改成本地 markdown-it -> 带内联样式的 HTML -> <rich-text>，不依赖 CDN，见 utils/markdown.ts）。
 *
 * - 入口：笔记详情（pkg-post/detail）「备注」行右侧的「Markdown 预览」按钮。
 *   备注原文可能很长，不放 URL，改经 common/pageParams 的内存单例中转（take 走即清），
 *   与 mediaAsset 等同款约定。
 * - 渲染复用 utils/markdown.ts 的 renderMarkdownHtml（内联样式版，小程序 class 命中不了）。
 * - ⚠️ 链接点击：rich-text 在 App-vue 端 <a> 可点；**小程序端 rich-text 不响应节点事件、
 *   链接点不了**——这是 rich-text 的既有限制，按产品口径暂不处理（要能点得上得自绘渲染器，成本高）。
 */
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { takePageParam, PAGE_PARAMS } from '@/common/pageParams'
import { renderMarkdownHtml } from '@/utils/markdown'

interface PreviewMarkdownParams {
  title?: string
  content: string
}

const content = ref('')

const contentHtml = computed(() => renderMarkdownHtml(content.value))

onLoad(() => {
  const params = takePageParam<PreviewMarkdownParams>(PAGE_PARAMS.previewMarkdown)
  content.value = params?.content || ''
  const title = params?.title
  if (title) {
    uni.setNavigationBarTitle({ title })
  }
})
</script>

<style lang="scss" scoped>
.md-preview {
  /* 100vh 在 App 端等于页面可视区高度（已排除原生导航栏与状态栏），
     内容超高时页面自身滚动；给个 min-height 让白底铺满短内容场景 */
  min-height: 100vh;
  padding: 24rpx 30rpx;
  background-color: #fff;

  &__content {
    display: block;
  }

  &__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 120rpx 0;

    &-text {
      color: #999;
      font-size: 28rpx;
    }
  }
}
</style>
