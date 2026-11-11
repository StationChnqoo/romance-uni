<!--
  笔记卡片
  由 cloud-react-native/src/screens/Posts/components/PostCard.tsx 迁移。
  笔记列表页（pkg-post/list）与搜索笔记页（pkg-post/search）共用，
  对应 RN 里 Posts / SearchPosts 两个屏幕都引用 Posts/components/PostCard.tsx。

  结构：标题 / 正文2行 / 标签 / 图片宫格(最多3张 +N) / 附件 footer / 分类+时间条。
-->
<template>
  <view class="post-card" hover-class="post-card_hover" @click="emit('press', item)">
    <text class="post-card__title" :number-of-lines="1">
      {{ item.title }}
    </text>
    <text v-if="item.content" class="post-card__content" :number-of-lines="2">
      {{ item.content }}
    </text>
    <view v-if="item.tags.length" class="post-card__tags">
      <view v-for="(tag, ti) in item.tags" :key="ti" class="post-card__tag">
        <text class="post-card__tag-text">{{ tag }}</text>
      </view>
    </view>
    <view v-if="item.images.length" class="post-card__attach">
      <view v-if="imageFiles.length" class="post-card__grid">
        <view
          v-for="(file, fi) in previewFiles"
          :key="fi"
          class="post-card__tile"
          :class="{ 'post-card__tile--single': previewFiles.length === 1 }"
        >
          <image class="post-card__tile-img" :src="mediaUrl(file.url)" mode="aspectFill" />
          <view v-if="fi === 2 && item.images.length > 3" class="post-card__more">
            <text class="post-card__more-text">+{{ item.images.length - 3 }}</text>
          </view>
        </view>
      </view>
      <view class="post-card__attach-footer">
        <text class="post-card__attach-count">{{ item.images.length }} 个附件</text>
        <text class="post-card__attach-hint" :style="{ color: theme }">查看详情</text>
      </view>
    </view>
    <view class="post-card__gap" />
    <view class="post-card__bottom">
      <text class="post-card__category">{{ item.categoryTitle || '默认分类' }}</text>
      <text class="post-card__time">{{ item.updateAt }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { getFile, mediaUrl } from '@/utils'
import type { Post } from '@/types/media'

const props = defineProps<{ item: Post }>()
const emit = defineEmits<{ (e: 'press', item: Post): void }>()

const userStore = useUserStore()
const theme = userStore.theme

/** 图片附件：按 file.type 过滤，预览最多 3 张 +N */
const imageFiles = computed(() => props.item.images.filter(it => getFile(it).type === 'Image'))
const previewFiles = computed(() => imageFiles.value.slice(0, 3))
</script>

<style lang="scss" scoped>
.post-card {
  padding: 20rpx 24rpx;
  background-color: #fff;
  border-bottom: 2rpx solid #f0f0f0;

  &_hover {
    opacity: 0.8;
  }
  &__title {
    display: block;
    width: 100%;
    box-sizing: border-box;
    font-size: 32rpx;
    color: #333;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__content {
    margin-top: 10rpx;
    font-size: 28rpx;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  &__tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 16rpx;
  }
  /* 标签定高 + flex 居中（禁上下 padding 撑高）；间距用 margin 不用 gap，
     行距（8rpx）小于列距（10rpx），换行时不显得松垮 */
  &__tag {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    height: 40rpx;
    margin-right: 10rpx;
    margin-bottom: 8rpx;
    padding: 0 12rpx;
    border: 2rpx solid #ccc;
    border-radius: 8rpx;
  }
  &__tag-text {
    font-size: 24rpx;
    line-height: 1;
    color: #999;
  }
  &__attach {
    margin-top: 20rpx;
  }
  &__grid {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12rpx;
  }
  &__tile {
    position: relative;
    flex: 1;
    /* 不用 aspect-ratio：Android 的 uni-app webview 不支持，
       flex:1 + aspect-ratio 算不出高度，图片 height:100% 就成了 0（iOS 正常）。
       卡片宽度 = (750 - 60左右边距 - 2个12rpx间隔) / 3，高度按 1:1 取 204rpx 即可 */
    height: 204rpx;
    border-radius: 20rpx;
    overflow: hidden;
    background-color: #f0f0f0;
    border: 2rpx solid #eef2f7;
  }
  &__tile--single {
    max-width: 248rpx;
  }
  &__tile-img {
    width: 100%;
    height: 100%;
  }
  &__more {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(15, 23, 42, 0.38);
  }
  &__more-text {
    font-size: 28rpx;
    color: #fff;
    font-weight: 500;
  }
  &__attach-footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 8rpx;
  }
  &__attach-count {
    font-size: 24rpx;
    color: #8a94a3;
  }
  &__attach-hint {
    font-size: 24rpx;
    font-weight: 500;
  }
  &__gap {
    height: 10rpx;
  }
  &__bottom {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 12rpx 16rpx;
    border-radius: 10rpx;
    background-color: rgba(0, 0, 0, 0.04);
  }
  &__category {
    font-size: 28rpx;
    color: #333;
  }
  &__time {
    font-size: 24rpx;
    color: #999;
  }
}
</style>
