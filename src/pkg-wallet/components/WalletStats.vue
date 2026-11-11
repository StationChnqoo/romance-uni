<template>
  <view class="wstats">
    <view class="wstats__grid">
      <view
        v-for="item in items"
        :key="item.label"
        class="wstats__cell"
        :hover-class="item.onPress ? 'wstats__cell_hover' : ''"
        @click="onCellPress(item)"
      >
        <!-- 右上角提示 icon：只有带说明的格子才显示（目前是「夏普比率」）；
             点它靠冒泡走整格的 onPress，不额外绑事件 -->
        <view v-if="item.onPress" class="wstats__hint">
          <wd-icon name="help-circle" :size="12" color="#b0b6b8" />
        </view>
        <view class="wstats__icon" :style="{ backgroundColor: tint }">
          <wd-icon :name="item.icon" :size="16" :color="theme" />
        </view>
        <text class="wstats__label">{{ item.label }}</text>
        <text class="wstats__value" :style="item.color ? { color: item.color } : {}">{{ item.value }}</text>
        <text class="wstats__sub">{{ item.sub }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
/**
 * 四宫格统计（参考图底部那排小卡：图标 + 名称 + 大值 + 副文案）
 * 纯展示组件，items 由 WalletList 组装。
 *
 * 布局：四列等分用自写 flex（`flex: 1 1 0` + `min-width: 0`），与首页/钱包的网格口径一致，
 * 不用 uni-grid；`text-align: center` 设在「块级容器」cell 上（<text> 是行内元素，自设无效）。
 */
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { hex2Rgba } from '@/utils'

interface StatItem {
  icon: string
  label: string
  value: string
  sub: string
  color?: string
  /** 有则说明型格子：右上角显示问号，整格可点（回调由组装方提供，组件不掺业务） */
  onPress?: () => void
}

withDefaults(defineProps<{ items?: StatItem[] }>(), { items: () => [] })

/** 用显式函数调，不在模板里写可选链调用（小程序模板编译器对可选链支持不一致） */
const onCellPress = (item: StatItem) => item.onPress?.()

const userStore = useUserStore()
const theme = computed(() => userStore.theme)
const tint = computed(() => hex2Rgba(theme.value, 0.12))
</script>

<style lang="scss" scoped>
.wstats {
  &__grid {
    display: flex;
    flex-direction: row;
    padding: 0 24rpx;
    margin-bottom: 20rpx;
  }
  &__cell {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 1 0;
    min-width: 0;
    padding: 20rpx 8rpx;
    border-radius: 16rpx;
    background-color: #fff;
    /* 居中设在块级容器上，由子元素继承 */
    text-align: center;

    & + & {
      margin-left: 16rpx;
    }
  }
  &__cell_hover {
    opacity: 0.88;
  }
  /* 右上角提示 icon：绝对定位不占布局（格子只有约 147rpx 宽），定高 + flex 居中给足点击热区 */
  &__hint {
    position: absolute;
    top: 4rpx;
    right: 4rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44rpx;
    height: 44rpx;
  }
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56rpx;
    height: 56rpx;
    border-radius: 50%;
  }
  &__label {
    margin-top: 12rpx;
    max-width: 100%;
    overflow: hidden;
    color: #999;
    font-size: 22rpx;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__value {
    margin-top: 8rpx;
    max-width: 100%;
    overflow: hidden;
    color: #333;
    font-size: 28rpx;
    font-weight: 500;
    /* 钉钉进步体（子集化 + base64 内联，见 src/styles/fonts.scss），与 Hero 大数值一致；
       符号 / 汉字（如 %、万、笔）子集里没有 → 自动回退到 sans-serif，不会缺字 */
    font-family: 'DingTalk-JinBuTi', 'PingFang SC', sans-serif;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__sub {
    margin-top: 4rpx;
    max-width: 100%;
    overflow: hidden;
    color: #b0b6b8;
    font-size: 20rpx;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
