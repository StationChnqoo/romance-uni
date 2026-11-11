<!--
  笔记详情
  由 cloud-react-native/src/screens/PostDetail/index.tsx 迁移。

  - 标题（长按可选）/ 分类+更新时间 / 备注（selectable）/ 标签 / 附件列表。
  - 预览用 uni 自己的：图片 uni.previewImage（替代 RN 的 ImageView，含多图切换）。
  - 备注默认展示原文（**不**就地渲染 Markdown）；「备注」行右侧的「Markdown 预览」按钮
    跳 PreviewMarkdown 页用 <rich-text> 渲染（markdown-it -> HTML，见 utils/markdown.ts），
    与 RN 的「Markdown 预览」按钮一致。备注原文经 pageParams 中转，不放 URL。
  - 视频预览跳通用的 PreviewVideo 播放页（整页一个播放器，替代原 VideoPreviewPopup 弹窗）。
  - 下载：RNFS+CameraRoll -> uni.downloadFile + saveImageToPhotosAlbum /
    saveVideoToPhotosAlbum（仅图片/视频显示下载按钮，与 RN 口径一致）。
  - 分享：RN 是 Dialog 二选一（分享原件走 RNFS+Share.open）。App 端无对应
    文件分享能力，简化为「复制链接」（uni.setClipboardData + toast）。
  - 底部「编辑」按钮 -> EditPost。页面用了 Dialog，需挂 DialogContainer。
-->
<template>
  <view :style="themeVars" class="detail">
    <z-paging
      ref="pagingRef"
      v-model="list"
      class="detail__paging"
      :fixed="false"
      :auto="true"
      :refresher-enabled="false"
      :loading-more-enabled="false"
      hide-empty-view
      @query="queryList"
    >
      <view class="detail__container">
        <view class="detail__block">
          <text class="detail__title" selectable>{{ post.title || '未命名笔记' }}</text>
          <view class="detail__gap" />
          <text class="detail__meta">
            {{ displayCategoryTitle }} | 更新于 {{ post.updateAt || '-' }}
          </text>
          <template v-if="post.content">
            <view class="detail__content-header">
              <text class="detail__block-title">备注</text>
              <wd-button
                size="small"
                :custom-style="'background-color:#eee;color:#555;border:none;'"
                @click="onPreviewMarkdown">
                Markdown 预览
              </wd-button>
            </view>
            <!-- 默认展示原文（不就地渲染 Markdown）；点右上角「Markdown 预览」跳独立预览页 -->
            <text class="detail__content" selectable>{{ post.content }}</text>
          </template>
        </view>

        <view v-if="post.tags.length" class="detail__block">
          <text class="detail__block-title">标签</text>
          <view class="detail__tags">
            <view v-for="(tag, index) in post.tags" :key="`${tag}:${index}`" class="detail__tag">
              <text class="detail__tag-text">{{ tag }}</text>
            </view>
          </view>
        </view>

        <view v-if="post.images.length" class="detail__block">
          <text class="detail__block-title">附件</text>
          <view class="detail__gap" />
          <view
            v-for="(file, index) in post.images"
            :key="`${file.id}:${index}`"
            class="detail__file"
            @click="onFilePreview(file)"
          >
            <!-- 图片：直接显示缩略图；其它类型：wot 字体图标（原 file-*.png 已删） -->
            <image
              v-if="isImage(file)"
              class="detail__file-icon"
              :src="getFile(file).src"
              mode="aspectFill"
            />
            <view v-else class="detail__file-icon detail__file-icon--doc">
              <wd-icon
                :name="getFile(file).icon"
                :color="getFile(file).iconColor"
                size="56rpx" />
            </view>
            <view class="detail__file-body">
              <text class="detail__file-name" :number-of-lines="1">
                {{ file.name || '未命名附件' }}
              </text>
              <view class="detail__file-gap" />
              <text class="detail__file-meta" :number-of-lines="1">
                {{ (file.size / 1024).toFixed(0) }}KB · {{ (file.updateAt || '').slice(0, 16) }}
              </text>
            </view>
            <view class="detail__file-actions">
              <view
                v-if="isImage(file) || isVideo(file)"
                class="detail__file-round"
                @click.stop="onDownload(file)"
              >
                <wd-loading v-if="downloadingId === file.id" :size="16" color="#666" />
                <wd-icon v-else name="download" color="#666" size="16px" />
              </view>
              <view class="detail__file-round" @click.stop="onShareLink(file)">
                <wd-icon name="share" color="#666" size="16px" />
              </view>
            </view>
          </view>
        </view>
      </view>
    </z-paging>

    <view class="detail__divider" />
    <view class="detail__bottom">
      <wd-button
        block
        :round="false"
        :custom-style="'background-color: ' + theme"
        @click="onEdit"
      >
        编辑
      </wd-button>
    </view>

    <DialogContainer />
  </view>
  <ToastContainer />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import {
  selectCategory,
  selectPost
} from '@/api'
import { Router } from '@/common/router'
import { setPageParam, PAGE_PARAMS } from '@/common/pageParams'
import DialogContainer from '@/components/DialogContainer.vue'
import ToastContainer from '@/components/ToastContainer.vue'
import { Dialog } from '@/components/Dialog'
import { useUserStore } from '@/stores/user'
import { toast, getFile, mediaUrl, openOfficeDocument, PicGoFileType } from '@/utils'
import type { PicGoSrc, Post } from '@/types/media'
import { createPost } from '@/types/media'
import { useThemeVars } from '@/composables/useThemeVars'

const themeVars = useThemeVars()


/*
 * 底部「编辑」按钮：直接用 wot 的 wd-button，尺寸/圆角全走 wot 的 size 默认值，
 * 这里只把实底颜色换成本项目主题色（对应 RN 的 BOTTOM_ACTION_SINGLE_BUTTON_STYLE）。
 */
const userStore = useUserStore()
const theme = computed(() => userStore.theme)

/** z-paging 只当滚动容器 */
const pagingRef = ref<any>(null)
const list = ref<unknown[]>([])

const queryList = () => {
  pagingRef.value?.complete([])
}

const postId = ref('')
const post = ref<Post>(createPost())
const categoryTitle = ref('')
const downloadingId = ref('')

const displayCategoryTitle = computed(
  () => categoryTitle.value || post.value.categoryTitle || '默认分类'
)

/**
 * 「Markdown 预览」：把备注原文经 pageParams 中转（长文不放 URL），跳独立预览页
 * （PreviewMarkdown 用 <rich-text> 渲染，见 utils/markdown.ts）。
 */
const onPreviewMarkdown = () => {
  if (!post.value.content) return
  setPageParam(PAGE_PARAMS.previewMarkdown, {
    title: post.value.title,
    content: post.value.content
  })
  Router.navigate('PreviewMarkdown')
}

const isImage = (file: PicGoSrc) => getFile(file).type === PicGoFileType.Image
const isVideo = (file: PicGoSrc) => getFile(file).type === PicGoFileType.Video

const loadPost = async () => {
  try {
    const detail = await selectPost(postId.value)
    post.value = detail
    if (post.value.categoryId) {
      selectCategory(post.value.categoryId)
        .then(it => (categoryTitle.value = it.title))
        .catch(() => {})
    }
  } catch (error) {
    toast('加载失败，请返回重试')
  }
}

/** 预览：图片 uni.previewImage；视频跳通用播放页 PreviewVideo（对应 RN 的 PreviewVideo） */
const onFilePreview = (file: PicGoSrc) => {
  const type = getFile(file).type
  if (type === PicGoFileType.Image) {
    const urls = post.value.images
      .filter(it => getFile(it).type === PicGoFileType.Image)
      .map(it => it.url)
    uni.previewImage({urls, current: file.url})
    return
  }
  if (type === PicGoFileType.Video) {
    Router.navigate('PreviewVideo', { url: mediaUrl(file.url) })
    return
  }
  // word/excel/ppt/pdf 等办公文档：下载后调系统查看器打开
  if (openOfficeDocument(file)) return
  Dialog.show({
    title: '提示',
    message: '该文件类型暂不支持预览，请先下载后查看～',
    positiveText: '知道了'
  })
}

/** 下载到相册（仅图片/视频）：uni.downloadFile + saveXxxToPhotosAlbum */
const onDownload = (file: PicGoSrc) => {
  if (downloadingId.value === file.id) {
    toast('正在下载中，请稍等')
    return
  }
  downloadingId.value = file.id
  uni.downloadFile({
    url: file.url,
    success: res => {
      if (res.statusCode !== 200) {
        toast('下载失败')
        return
      }
      const done = (ok: boolean) => {
        toast(ok ? '已保存到相册' : '保存到相册失败')
      }
      if (isVideo(file)) {
        uni.saveVideoToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => done(true),
          fail: () => done(false)
        })
      } else {
        uni.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => done(true),
          fail: () => done(false)
        })
      }
    },
    fail: () => toast('下载失败'),
    complete: () => (downloadingId.value = '')
  })
}

/** 分享：复制附件链接（RN 的「分享原件」依赖系统分享面板，App 端简化为复制链接） */
const onShareLink = (file: PicGoSrc) => {
  uni.setClipboardData({
    data: file.url,
    showToast: false, // 关掉系统自带的「内容已复制」toast，改用项目统一的 toast
    success: () => toast('链接已复制到剪贴板')
  })
}

const onEdit = () => {
  if (post.value.id) {
    Router.navigate('EditPost', {id: post.value.id})
  }
}

onLoad((options?: any) => {
  postId.value = options?.id || ''
})

// 从编辑页返回后重拉（对应 RN 的 useIsFocused -> refetch）
onShow(() => {
  loadPost()
})
</script>

<style lang="scss" scoped>
.detail {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f7f7f8;

  &__paging {
    flex: 1;
  }
  &__container {
    padding: 20rpx 24rpx;
  }
  &__block {
    padding: 24rpx;
    background-color: #fff;
    margin-bottom: 20rpx;
  }
  &__gap {
    height: 20rpx;
  }
  &__title {
    color: #222;
    font-size: 32rpx;
    font-weight: 500;
  }
  &__meta {
    color: #888;
    font-size: 24rpx;
  }
  &__content-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 24rpx;
    margin-bottom: 16rpx;
  }
  &__block-title {
    color: #333;
    font-size: 32rpx;
    font-weight: 500;
  }
  &__content {
    /* 备注原文（不渲染 Markdown）：<text> 是行内元素，display:block 才能正常换行铺满；
       pre-wrap 保留原文换行，break-word 防长串/长链接撑破容器 */
    display: block;
    color: #333;
    font-size: 28rpx;
    margin-top: 8rpx;
    white-space: pre-wrap;
    word-break: break-word;
  }
  &__tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 16rpx;
  }
  /* 与列表页 PostCard 同款：定高 + flex 居中（禁上下 padding 撑高），间距用 margin，
     行距（8rpx）小于列距（10rpx），换行的纵向间距不再虚大 */
  &__tag {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    height: 40rpx;
    margin-right: 10rpx;
    margin-bottom: 8rpx;
    padding: 0 12rpx;
    border: 2rpx solid #ddd;
    border-radius: 8rpx;
  }
  &__tag-text {
    color: #777;
    font-size: 24rpx;
    line-height: 1;
  }
  &__file {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 12rpx;
    margin-bottom: 16rpx;
    border: 2rpx solid #eee;
    border-radius: 16rpx;
    background-color: #fff;
  }
  &__file-icon {
    width: 104rpx;
    height: 104rpx;
    border-radius: 12rpx;
    background-color: #f0f0f0;
    flex-shrink: 0;
  }
  /* 非图片附件：这一格放的是 wd-icon，居中撑满同一格（保持行高一致） */
  &__file-icon--doc {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
  }
  &__file-body {
    flex: 1;
    min-width: 0;
    margin: 0 16rpx;
  }
  &__file-gap {
    height: 6rpx;
  }
  &__file-name {
    display: block;
    width: 100%;
    box-sizing: border-box;
    color: #333;
    font-size: 28rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__file-meta {
    display: block;
    width: 100%;
    box-sizing: border-box;
    color: #888;
    font-size: 24rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__file-actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-shrink: 0;
    gap: 12rpx;
  }
  &__file-round {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    background-color: #f5f5f5;
  }
  &__divider {
    height: 2rpx;
    background-color: #eee;
  }
  &__bottom {
    padding: 20rpx 24rpx;
    background-color: #fff;
  }
}
</style>
