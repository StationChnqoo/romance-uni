<template>
  <view class="whero">
    <view class="whero__card">
      <view class="whero__head">
        <text class="whero__title">最新总资产</text>
        <text class="whero__unit">单位：万元</text>
      </view>

      <text class="whero__value" :style="{ color: theme }">{{ totalWan }}</text>

      <!-- 较首期：涨红跌绿（项目口径），颜色由父级按 renderUpOrDown 传进来；括号里带首期日期 -->
      <view v-if="changeText" class="whero__delta">
        <view class="whero__badge" :style="{ backgroundColor: tint }">
          <text class="whero__badge-text" :style="{ color: changeColor }">{{ changeText }}</text>
        </view>
        <text class="whero__delta-text">较首期{{ sinceDate ? '（' + sinceDate + '）' : '' }}{{ changeAmount ? ' ' + changeAmount : '' }}</text>
      </view>

      <!-- 同期指数（原「资产分析」模块，移入首卡下方）：名称 + 涨跌幅 + 幅度细条 -->
      <view v-if="indexRows.length" class="whero__indices">
        <view v-for="item in indexRows" :key="item.label" class="whero__index-row">
          <view class="whero__index-head">
            <text class="whero__index-label">{{ item.label }}</text>
            <text
              class="whero__index-change"
              :style="item.color ? { color: item.color } : {}"
            >{{ item.change }}</text>
          </view>
          <view class="whero__index-bar">
            <view
              class="whero__index-bar-fill"
              :style="{ width: barWidth(item.ratio) + '%', backgroundColor: item.color || theme }"
            />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
/**
 * 钱包总览 Hero 卡（参考「资产价值报告」页的头部：大数值 + 同比徽章 + 两列子格）
 * 纯展示组件：所有数值都由 WalletList 算好传进来，这里不做业务推导。
 *
 * - 大数字沿用详情页的钉钉进步体（见 src/styles/fonts.scss），字号对齐 Hero 的 72rpx。
 * - 徽章底色用主题色 + 12% 透明度（hex2Rgba 现场算），不引入新的写死色值；
 *   文字色用父级传的涨跌色（涨红跌绿）。
 */
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { hex2Rgba } from '@/utils'

interface IndexRow {
  label: string
  /** 形如 '+4.62%' */
  change: string
  /** 涨红跌绿 */
  color?: string
  /** 涨跌幅小数（如 0.0462），给条形比例用；只取绝对值 */
  ratio: number
}

const props = withDefaults(
  defineProps<{
    totalWan?: string
    /** 形如 '+4.62%'，空串表示没有可比数据（不渲染徽章） */
    changeText?: string
    /** 形如 '+54.56 万' */
    changeAmount?: string
    changeColor?: string
    /** 首期（最早一期）日期，形如 '2023-01-01'，用于「较首期（日期）」 */
    sinceDate?: string
    /** 同期指数对比（原「资产分析」模块，移入首卡下方）：上证指数 / 标普500 的同期涨跌幅 */
    indexRows?: IndexRow[]
  }>(),
  {
    totalWan: '—',
    changeText: '',
    changeAmount: '',
    changeColor: '',
    sinceDate: '',
    indexRows: () => []
  }
)

const userStore = useUserStore()
const theme = computed(() => userStore.theme)
/**
 * 「较首期」徽章底色：跟**涨跌文字**同色系的 12% 浅透底（涨=浅红底、跌=浅绿底）。
 * 之前用的主题色透底——设置页切了主题色（比如翡翠绿）后底色跟着变绿、字却是涨红，
 * 语义脱节（2026-10-11 用户指出不合适），故不再依赖 theme。
 */
const tint = computed(() => hex2Rgba(props.changeColor || '#999999', 0.12))

/** 条形按「两项里最大绝对值」归一，最长那条占满 100%，其余按比例（只比相对幅度） */
const maxAbs = computed(() => Math.max(1e-9, ...props.indexRows.map(it => Math.abs(it.ratio))))
const barWidth = (ratio: number) => Math.min(100, (Math.abs(ratio) / maxAbs.value) * 100)
</script>

<style lang="scss" scoped>
.whero {
  &__card {
    padding: 24rpx;
    /* 首卡：与页面顶部留 24rpx，左右随全页 24rpx 内缩 */
    margin: 24rpx 24rpx 20rpx;
    border-radius: 16rpx;
    background-color: #fff;
  }
  &__head {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  &__title {
    color: #666;
    font-size: 26rpx;
  }
  &__unit {
    color: #b0b6b8;
    font-size: 22rpx;
  }
  &__value {
    display: block;
    margin-top: 12rpx;
    /* 钉钉进步体（子集化 + base64 内联，见 src/styles/fonts.scss） */
    font-family: 'DingTalk-JinBuTi', 'PingFang SC', sans-serif;
    font-size: 72rpx;
    font-weight: normal;
  }
  &__delta {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 16rpx;
  }
  &__badge {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 40rpx;
    padding: 0 14rpx;
    border-radius: 8rpx;
  }
  &__badge-text {
    font-size: 24rpx;
    line-height: 1;
  }
  &__delta-text {
    margin-left: 12rpx;
    color: #999;
    font-size: 24rpx;
  }
  /* 首卡内的同期指数（来自原「资产分析」）：名称 + 涨跌幅 + 幅度细条 */
  &__indices {
    margin-top: 20rpx;
  }
  &__index-row {
    & + & {
      margin-top: 16rpx;
    }
  }
  &__index-head {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  &__index-label {
    color: #666;
    font-size: 24rpx;
  }
  &__index-change {
    color: #333;
    font-size: 26rpx;
    font-weight: 500;
    /* 钉钉进步体（与 Hero / 四宫格大数值一致），% 子集没有会自动回退 */
    font-family: 'DingTalk-JinBuTi', 'PingFang SC', sans-serif;
  }
  &__index-bar {
    margin-top: 8rpx;
    height: 8rpx;
    border-radius: 4rpx;
    overflow: hidden;
    background-color: #f1f2f3;
  }
  &__index-bar-fill {
    height: 100%;
    min-width: 2rpx;
    border-radius: 4rpx;
  }
}
</style>
