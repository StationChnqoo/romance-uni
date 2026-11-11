<template>
  <view class="msn-card" @click="emit('press')">
    <text class="msn-card__title" :number-of-lines="1">{{ title }}</text>
    <view class="msn-card__gap" />
    <!-- 价格（左） + 涨跌/时间竖排（右）：整行 flex row，底部对齐、两端分布 -->
    <view class="msn-card__row">
      <text class="msn-card__price" :style="{ color: direction.color }">{{ priceText }}</text>
      <view class="msn-card__meta">
        <text class="msn-card__change" :style="{ color: direction.color }">{{ changeText }}</text>
        <text class="msn-card__time">{{ timeText }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
/**
 * 单个持仓 / 自选标的卡片
 * 由 cloud-react-native/src/screens/Financing/components/MsnCard.tsx 迁移。
 *
   * - 两列排布交给外层自定义 flex 网格（每格 width:50% + border-box），本组件不再管宽度，
   *   只铺满所在格子（外层 flex-wrap，同行 align-items 默认 stretch，两格等高）；
   *   box-sizing 仍要显式写，否则 padding 会把卡片撑出格子。
   * - ★ 高度：外层 flex 同行默认 stretch，两格等高；本组件 height:100% 铺满格子，
   *   同一行里内容最多的那张决定行高。
 *   本组件原来没设高度，内容少的那张下方就空一块 —— 看着像「下内边距格外大」，
 *   其实是行高差。`height: 100%` + `justify-content: space-between` 解决：
 *   卡片铺满格子，三块内容（标题/价格/footer）均匀分布。
 * - `__title` 不能带 `flex: 1`：那会吃掉剩余空间，`space-between` 就失效了。
 * - RN 的 onHistoryPress（历史收益弹窗 MsnCardHistoryModal）本轮没迁，
 *   因此右上角的历史图标按钮一并去掉，避免留一个点了没反应的按钮。
 * - RN 的价格字体是 DingTalkJinBuTi，这里按需求换成数码字体 Digital-7
 *   （字体在 src/styles/fonts.scss 里子集化 + base64 内联，见那里的字符集说明）。
 */
import { computed } from 'vue'
import dayjs from 'dayjs'
import { renderUpOrDown } from '@/utils'
import type { MsnQuoteItem } from '@/types/stock'

const props = defineProps<{
  title: string
  data?: MsnQuoteItem
}>()

const emit = defineEmits<{
  (e: 'press'): void
}>()

const changePercent = computed(() => props.data?.priceChangePercent ?? 0)
const direction = computed(() => renderUpOrDown(changePercent.value))
const priceText = computed(() =>
  typeof props.data?.price === 'number' ? props.data.price.toFixed(2) : '--'
)
const changeText = computed(
  () => `${direction.value.operator}${Math.abs(changePercent.value).toFixed(2)}%`
)
const timeText = computed(() => dayjs(props.data?.timeLastTraded).format('MM-DD HH:mm') || '--')
</script>

<style lang="scss" scoped>
.msn-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  /* 撑满 grid-item（它是 height:100%）：同一行里内容最多的那张决定行高，
     撑不满的卡片下方会空一块，看着就是「下内边距格外大」。配合 space-between
     让内容均匀铺开，底部不吊空。 */
  height: 100%;
  padding: 12rpx 30rpx;
  background-color: #fff;

  &__gap {
    height: 6rpx;
  }
  &__title {
    min-width: 0;
    color: #333;
    font-size: 28rpx;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__price {
    font-family: 'Digital-7', -apple-system, BlinkMacSystemFont, 'PingFang SC', Arial, sans-serif;
    /* 原 44rpx 偏小，放大到 52rpx（再大会和右侧竖排挤在一行：格子内容宽约 335rpx） */
    font-size: 64rpx;
  }
  /* 价格 + 右侧竖排：底部对齐、两端分布 */
  &__row {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    min-width: 0;
  }
  /* 涨跌比例在上、时间在下，整体靠右 */
  &__meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    min-width: 0;
    gap: 4rpx;
    /* 价格数字很长时优先让价格缩，别把右侧挤出格子 */
    flex: none;
  }
  &__time {
    color: #666;
    font-size: 20rpx;
  }
  &__change {
    font-size: 24rpx;
  }
}
</style>
