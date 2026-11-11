<template>
  <view class="vix">
    <!-- 标题左、当前值 | 涨跌幅 右：一行两端对齐 -->
    <view class="vix__head">
      <text class="vix__title">市场风险程度</text>
      <view class="vix__readout">
        <text class="vix__value" :style="{ color: valueColor }">{{ displayValue }}</text>
        <text class="vix__sep">|</text>
        <text v-if="changeText" class="vix__change" :style="{ color: changeColor }">{{ changeText }}</text>
      </view>
    </view>

    <!-- 分段进度条：四档等宽（绿/黄/橙/红），当前值用一根白游标标出 -->
    <view class="vix__bar">
      <view class="vix__bar-track">
        <view
          v-for="zone in ZONES"
          :key="zone.label"
          class="vix__bar-seg"
          :style="{ backgroundColor: zone.color }" />
      </view>
      <view v-if="ready && value > 0" class="vix__bar-thumb" :style="{ left: thumbPos + '%' }" />
    </view>

    <!-- 刻度：四档名称 + 区间，与上方四段一一对齐；当前档的名称用档位色 -->
    <view class="vix__scale">
      <view v-for="zone in ZONES" :key="zone.label" class="vix__scale-item">
        <text
          class="vix__scale-label"
          :style="{ color: zone.label === valueLabel ? zone.color : '#333' }">
          {{ zone.label }}
        </text>
        <text class="vix__scale-range">{{ zone.range }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
/**
 * 市场风险程度（VIX 恐慌指数）· 分段进度条
 *
 * 2026-10-29：原来的 echarts 仪表盘（l-echart + 自绘色弧 + 右侧竖排图注）整块去掉，
 * 换成四段等宽的进度条 + 游标 —— 表盘缩在 200rpx 方框里刻度太密，档位区间反而读不出来。
 *
 * 风险分级（华尔街/CBOE 惯例）：<15 低波动 / 15–20 正常 / 20–30 偏高 / ≥30 高风险。
 * 四段**等宽**，不按数值区间比例：高风险那档从 30 一直延伸到 80+，按比例画要占掉半条以上，
 * 前三个档位被压成一条缝；等宽 + 档位名 + 区间文字更直观。
 *
 * 游标位置 =（档位序号 + 段内比例）× 25%：段内比例按该档区间插值，
 * 最后一档按 30–60 插值，VIX > 60（极端行情）就贴右端。
 *
 * 当前值与当日涨跌幅缩在标题右侧（「26.50 | −3.48%」），不再单独占一行；
 * 数值颜色跟随当前风险档位，涨跌幅颜色走全局 renderUpOrDown（涨红 #f20c00 / 跌绿 #0c8918），
 * 两者同字号同字重（不同字号行盒不齐会一高一低）。
 *
 * 2026-10-31 微调：当前值去粗（数字笔画密，600 会糊成一团）、进度条收窄 20rpx→12rpx、
 * 刻度行改为「档位名 + 区间」同行展示（原来上下两行）。
 */
import { computed } from 'vue'
import { renderUpOrDown } from '@/utils'

const props = withDefaults(defineProps<{ value?: number; ready?: boolean; changePercent?: number }>(), {
  value: 0,
  ready: false,
  changePercent: 0,
})

/** 四档：max 是档位上沿（最后一档取 60 只为游标插值），range 是刻度上显示的区间文字 */
const ZONES = [
  { max: 15, label: '低波动', range: '<15', color: '#22a06b' },
  { max: 20, label: '正常', range: '15–20', color: '#e5b80b' },
  { max: 30, label: '偏高', range: '20–30', color: '#f5803e' },
  { max: 60, label: '高风险', range: '≥30', color: '#e54848' }
] as const

/** 当前所在档位下标；未就绪返回 -1 */
const zoneIndex = computed(() => {
  if (!props.ready || props.value <= 0) return -1
  const i = ZONES.findIndex(z => props.value < z.max)
  return i < 0 ? ZONES.length - 1 : i
})

/** 图外数值：未就绪显示 --，就绪显示两位小数 */
const displayValue = computed(() =>
  props.ready && props.value > 0 ? props.value.toFixed(2) : '--'
)

/** 数值颜色跟随当前风险档位 */
const valueColor = computed(() => (zoneIndex.value < 0 ? '#999' : ZONES[zoneIndex.value].color))

/** 当前档位名：只用来点亮下方刻度行里对应的那格，不再作为文案单独显示 */
const valueLabel = computed(() => (zoneIndex.value < 0 ? '' : ZONES[zoneIndex.value].label))

/** 当日涨跌百分比：priceChangePercent 已是百分数口径，与 MsnCard 一致 */
const changeText = computed(() => {
  if (!props.ready) return ''
  const { operator } = renderUpOrDown(props.changePercent)
  return `${operator}${Math.abs(props.changePercent).toFixed(2)}%`
})

/** 涨跌颜色走全局 renderUpOrDown */
const changeColor = computed(() => renderUpOrDown(props.changePercent).color)

/** 游标位置（百分比）：先定位到所在段（每段 25%），再按段内比例插值 */
const thumbPos = computed(() => {
  const index = zoneIndex.value
  if (index < 0) return 0
  const low = index === 0 ? 0 : ZONES[index - 1].max
  const span = ZONES[index].max - low
  const ratio = Math.min(1, Math.max(0, (props.value - low) / span))
  return (index + ratio) * 25
})
</script>

<style lang="scss" scoped>
/* 与 Global / MarketIndex 同款：满宽白块 + 2rpx 灰缝分隔，不做独立卡片（无外边距、无圆角） */
.vix {
  box-sizing: border-box;
  padding: 20rpx 30rpx;
  margin-bottom: 2rpx;
  background-color: #fff;

  /* 标题左、当前值 | 涨跌幅 右（两端对齐） */
  &__head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  &__title {
    font-size: 28rpx;
    font-weight: 500;
    color: #333;
  }
  /* 右侧读数：当前值 | 涨跌幅，同一行同字号同字重（不同字号行盒不齐会一高一低） */
  &__readout {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  /* 当前值：数字重笔画本身就密，再加粗会糊成一团 → 用常规字重（不要 600） */
  &__value {
    font-size: 26rpx;
    font-weight: 400;
    line-height: 1;
  }
  &__sep {
    margin: 0 10rpx;
    font-size: 22rpx;
    line-height: 1;
    color: #ddd;
  }
  /* 当日涨跌百分比，颜色走全局 renderUpOrDown（涨红/跌绿）
     ★ 与 __value 同字号同字重（项目铁律：同行文本对齐靠同字号同字重，不靠 flex 调）；
       value 去粗后这里必须一起改，否则右侧读数一行两种字重 */
  &__change {
    font-size: 26rpx;
    font-weight: 400;
    line-height: 1;
  }

  /* 进度条外框：只负责给游标定位，不能裁切（游标要上下露出条外） */
  &__bar {
    position: relative;
    margin-top: 24rpx;
  }
  /* 条本体：四段等宽，圆角裁掉两端 */
  &__bar-track {
    display: flex;
    flex-direction: row;
    height: 12rpx;
    border-radius: 999rpx;
    overflow: hidden;
  }
  /* 四段等宽：写死 25%（mp 端 flex:1 的 flex-basis 在个别机型上算不准，宽度直接给死） */
  &__bar-seg {
    flex: none;
    width: 25%;
    height: 100%;
  }
  /* 游标：白色竖条骑在进度条上，细描边保证在四段任意底色上都看得见
     高度 = 条高 + 上下各露出 6rpx（12rpx 的条配 24rpx 的游标，上下各露 6rpx） */
  &__bar-thumb {
    position: absolute;
    top: -6rpx;
    width: 6rpx;
    height: 24rpx;
    border-radius: 999rpx;
    background-color: #fff;
    box-shadow: 0 0 0 2rpx rgba(0, 0, 0, 0.12);
    transform: translateX(-50%);
  }

  /* 刻度行：四列等宽，与上面四段一一对齐
     档位名与区间放同一行（「正常 15–20」），不再上下两行 */
  &__scale {
    display: flex;
    flex-direction: row;
    margin-top: 12rpx;
  }
  &__scale-item {
    flex: none;
    width: 25%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  &__scale-label {
    font-size: 22rpx;
    line-height: 1.2;
  }
  /* 区间：与档位名同行 → 必须同字号同字重（项目铁律），靠颜色 #999 区分主次，不靠字号 */
  &__scale-range {
    margin-left: 6rpx;
    font-size: 22rpx;
    line-height: 1.2;
    color: #999;
  }
}
</style>
