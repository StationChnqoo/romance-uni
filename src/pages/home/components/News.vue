<template>
  <view class="news">
    <view v-if="!datas.length" class="news__loading">
      <wd-loading :color="theme" />
    </view>
    <view v-else class="news__list">
      <view
        v-for="(item, index) in datas"
        :key="item.id || index"
        class="news__item"
        hover-class="news__item_hover"
        @click="emit('press', item)"
      >
        <view class="news__main">
          <text class="news__title" :number-of-lines="2">{{ item.title }}</text>
          <view class="news__meta">
            <image
              v-if="item.provider && item.provider.logoUrl"
              class="news__logo"
              :src="item.provider.logoUrl"
              mode="aspectFit" />
            <text class="news__source">{{ (item.provider && item.provider.name) || 'MSN' }}</text>
            <text class="news__time">{{ relativeTime(item.publishedDateTime) }}</text>
          </view>
        </view>
        <view class="news__thumb">
          <image
            v-if="item.images && item.images[0] && item.images[0].url"
            class="news__thumb-img"
            :src="item.images[0].url"
            mode="aspectFill" />
          <wd-icon v-else name="image" :size="44" color="#c8c8c8" />
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
/**
 * 7x24 快讯卡片列表（MSN Feed 卡片）
 * 由 cloud-react-native 的 News.tsx 迁移，数据源从东方财富快讯换为 MSN Finance Feed
 * （见 api/third/msn.ts 的 selectMsnFinanceNews）。
 *
 * - 卡片布局：左侧标题（最多 2 行）+ 来源 / 时间（三行信息），右侧缩略图（无图时灰色占位图标），图片与左侧三行等高并稍微放大。
 * - 时间走 relativeTime（刚刚 / x分钟前 / x小时前 / x天前），不再用绝对 HH:mm。
 * - 缩略图高度写死 rpx（禁止 CSS aspect-ratio，Android webview 不认）。
 * - 标题多行省略沿用项目既有写法：<text :number-of-lines="2"> + -webkit-line-clamp（见 PostCard）。
 */
import { computed } from 'vue'
import { relativeTime } from '@/utils'
import { useUserStore } from '@/stores/user'
import type { MsnNewsItem } from '@/types/stock'

defineProps<{
  datas: MsnNewsItem[]
}>()

const emit = defineEmits<{
  (e: 'press', item: MsnNewsItem): void
}>()

const userStore = useUserStore()
const theme = computed(() => userStore.theme)
</script>

<style lang="scss" scoped>
.news {
  padding: 12rpx 30rpx;
  background-color: #fff;

  &__loading {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 40rpx 0;
  }
  &__list {
    display: flex;
    flex-direction: column;
  }
  &__item_hover {
    /* TouchableOpacity activeOpacity={0.8} */
    opacity: 0.8;
  }
  &__item {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    padding: 20rpx 0;
    border-bottom: 1rpx solid #f0f0f0;
  }
  &__thumb {
    flex: none;
    display: flex;
    align-items: center;
    justify-content: center;
    /* 与左侧三行信息（标题 2 行 + 来源/时间 1 行 ≈ 110rpx）等高，并稍微放大 */
    width: 165rpx;
    height: 110rpx;
    margin-left: 20rpx;
    border-radius: 8rpx;
    background-color: #f5f5f5;
    overflow: hidden;
  }
  &__thumb-img {
    width: 165rpx;
    height: 110rpx;
  }
  &__main {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* 与缩略图等高，避免右侧比左侧矮时空一块 */
    min-height: 110rpx;
  }
  &__title {
    color: #333;
    font-size: 28rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  &__meta {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 8rpx;
  }
  &__logo {
    flex: none;
    width: 28rpx;
    height: 28rpx;
    margin-right: 8rpx;
    border-radius: 4rpx;
  }
  &__source {
    flex: 1;
    min-width: 0;
    color: #999;
    font-size: 22rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__time {
    flex: none;
    color: #bbb;
    font-size: 22rpx;
    margin-left: 12rpx;
  }
}
</style>
