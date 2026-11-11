<!--
  相亲对象 - 列表卡片
  由 cloud-react-native/src/screens/DatingList/index.tsx 的 DatingItem 迁移。

  ⚠️ 组件里只用 `import { Router }` 之外的东西都得显式 import —— 分包组件 autoscan 扫不到，
     本目录里的 FileUploader/DatingItem 都靠调用方写全路径 import 进来。

  RN 的 `<View>` 默认 flex，uni 的 `<view>` 是 block：凡是原来靠 flexDirection 排的行，
     这里都显式补了 `display: flex`（漏写就是死属性，每个元素独占一行）。

  日期口径与 RN 一致：
  - 「认识 N 天」= 今天 - (最先认识日期 || 创建时间)，取整天数
  - 「最近 x」= (最近联系 || 更新时间) 的相对时间，格式由 main.ts 里全局挂好的
    dayjs relativeTime 插件 + zh-cn locale 给出（本组件不重复 extend）
-->
<template>
  <view class="item" hover-class="item--hover" @click="onPress">
    <view class="item__top">
      <view class="item__avatar">
        <image
          v-if="item.avatar"
          class="item__avatar-img"
          :src="mediaUrl(item.avatar)"
          mode="aspectFill" />
      </view>
      <view class="item__head">
        <view class="item__name-row">
          <text class="item__name">{{ item.name || '未命名' }}</text>
          <text class="item__status" :style="{ color: theme }">{{ statusLabel }}</text>
        </view>
        <text v-if="metaText" class="item__meta">{{ metaText }}</text>
      </view>
    </view>

    <text v-if="item.description" class="item__desc">{{ item.description }}</text>

    <view v-if="item.tags?.length" class="item__tags">
      <Tag v-for="(t, i) in item.tags" :key="`${t}-${i}`" :text="String(t)" />
    </view>

    <view class="item__bottom">
      <view class="item__stats">
        <text class="item__stat">
          认识 {{ daysKnow >= 0 ? daysKnow + ' 天' : '—' }}
        </text>
        <text class="item__stat">进度 {{ item.progressCount || 0 }} 条</text>
      </view>
      <text class="item__updated">最近 {{ latestText }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import dayjs from 'dayjs'
import Tag from '@/components/Tag.vue'
import { DATING_STATUS_LABEL } from '@/constants/datingData'
import { getCityFullName } from '@/constants/chinaCities'
import { mediaUrl } from '@/utils'
import { useUserStore } from '@/stores/user'
import type { DatingListItem } from '@/types/dating'

const props = defineProps<{ item: DatingListItem }>()
const emit = defineEmits<{ (e: 'press'): void }>()

const onPress = () => emit('press')

/** 姓名后的状态：不再用实底 badge，直接以主题色文字展示 */
const userStore = useUserStore()
const theme = computed(() => userStore.theme)
const statusLabel = computed(() => DATING_STATUS_LABEL[props.item.status])

/** 认识天数：与 RN 同口径，取整天数；日期异常时给负数，模板里显示「—」 */
const daysKnow = computed(() =>
  dayjs().diff(dayjs(props.item.meetAt || props.item.createAt), 'day')
)

/** 最近联系的相对时间（如「3 天前」） */
const latestText = computed(() =>
  dayjs(props.item.latestContactAt || props.item.updateAt).fromNow()
)

/**
 * 资料摘要行：年龄(出生年份) · 身高 · 学历 · 职业 · 籍贯。
 * 年龄由当前年 - 出生年现算（后端只存 birthYear，避免跨年后字段过期）。
 */
const metaText = computed(() => {
  const it = props.item
  return [
    it.birthYear ? `${new Date().getFullYear() - it.birthYear}岁 (${it.birthYear})` : '',
    it.height ? `${it.height}cm` : '',
    it.education || '',
    it.job || '',
    getCityFullName(it.city || '')
  ]
    .filter(Boolean)
    .join(' · ')
})
</script>

<style lang="scss" scoped>
.item {
  /* RN 的 TouchableOpacity(activeOpacity 0.8) */
  &--hover {
    background-color: #f7f7f7;
  }

  display: flex;
  flex-direction: column;
  padding: 24rpx 30rpx;
  background-color: #fff;

  &__top {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
  &__avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 96rpx;
    height: 96rpx;
    border-radius: 50%;
    overflow: hidden;
    background-color: #fafafa;
    flex-shrink: 0;
  }
  &__avatar-img {
    width: 100%;
    height: 100%;
  }
  /* flex:1 的输入块必须补 min-width:0，否则长名字会把状态徽章顶出屏幕 */
  &__head {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    margin-left: 20rpx;
  }
  &__name-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  &__name {
    flex: 1;
    min-width: 0;
    font-size: 32rpx;
    font-weight: 500;
    color: #1a1a1a;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /* 姓名后的状态：去掉实底 badge，直接主题色文字（行内 <text>，靠父级 name-row 的
     align-items:center 垂直居中，无需 padding 撑高，符合「小药丸/徽章一律定高+flex 居中」的反例——这里根本不是药丸） */
  &__status {
    flex-shrink: 0;
    margin-left: 16rpx;
    font-size: 24rpx;
    line-height: 1;
    color: var(--wot-color-theme, #ee5a92);
  }
  &__meta {
    display: block;
    margin-top: 8rpx;
    font-size: 24rpx;
    color: #888;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /* 描述最多两行（RN numberOfLines={2}）；-webkit-box 是各端 webview 通用做法 */
  &__desc {
    display: -webkit-box;
    margin-top: 16rpx;
    font-size: 26rpx;
    color: #444;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  &__tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 10rpx;
    margin-top: 16rpx;
  }
  &__bottom {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 20rpx;
    padding: 12rpx 16rpx;
    border-radius: 8rpx;
    background-color: rgba(0, 0, 0, 0.04);
  }
  &__stats {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 24rpx;
  }
  &__stat {
    font-size: 24rpx;
    color: #555;
  }
  &__updated {
    font-size: 24rpx;
    color: #999;
    flex-shrink: 0;
  }
}
</style>
