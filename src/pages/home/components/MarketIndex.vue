<template>
  <view class="market-index" @click="emit('press', title)">
    <text class="market-index__title" :number-of-lines="1">{{ title }}</text>
    <text class="market-index__value" :style="{ color: direction.color }"
      >{{ `${price} | ${direction.operator}${Math.abs(percent).toFixed(2)}%` }}</text
    >
  </view>
</template>

<script lang="ts" setup>
/**
 * 单条市场指数（CBOE 波动率、桥水全天候 ETF 等）
 * 由 cloud-react-native/src/screens/Financing/components/MarketIndex.tsx 迁移。
 *
 * - RN 的价格直接原样渲染（`data?.price ?? ''`），不做 toFixed，这里保持一致。
 * - RN 里被注释掉的 timeLastTraded 时间行不迁。
 * - 点击事件把 title 原样抛给父组件（RN 用来拼 MSN 详情链接）。
 */
import { computed } from 'vue'
import { renderUpOrDown } from '@/utils'
import type { MsnQuoteItem } from '@/types/stock'

const props = defineProps<{
  title: string
  data?: MsnQuoteItem
}>()

const emit = defineEmits<{
  (e: 'press', title: string): void
}>()

const percent = computed(() =>
  typeof props.data?.priceChangePercent === 'number' ? props.data.priceChangePercent : 0
)
const price = computed(() => props.data?.price ?? '')
const direction = computed(() => renderUpOrDown(percent.value))
</script>

<style lang="scss" scoped>
.market-index {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20rpx 30rpx;
  margin-bottom: 2rpx;
  background-color: #fff;

  &__title {
    flex: 1;
    min-width: 0;
    font-size: 28rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__value {
    font-size: 28rpx;
  }
}
</style>
