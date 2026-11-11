<!--
  单个类别的 5/25 监测行：徽标 + 三项数值 + 阈值条 + 区间文案
  纯展示：stat 由监测卡下发，barPos（依赖全局 stats 的刻度）也由监测卡算好传下来
-->
<template>
  <view class="rb-band">
    <view class="rb-band__head">
      <text class="rb-band__name">{{ stat.name }}</text>
      <view class="rb-band__bdg" :class="stat.triggered ? 'is-warn' : 'is-ok'">
        <text class="rb-band__bdg-t">{{ empty ? '—' : stat.triggered ? '已触发' : '区间内' }}</text>
      </view>
    </view>
    <view class="rb-band__nums">
      <text>目标 <text class="rb-b">{{ pct(stat.target) }}</text></text>
      <text>当前 <text class="rb-b">{{ pct(stat.weight) }}</text></text>
      <text>偏离 <text class="rb-b" :style="{ color: devColor(stat.dev) }">{{ signed(stat.dev) }}</text></text>
    </view>
    <view class="rb-bar">
      <view class="rb-bar__track">
        <view
          class="rb-bar__band"
          :style="{
            left: barPos(stat.effLow) + '%',
            width: barPos(stat.effHigh) - barPos(stat.effLow) + '%'
          }" />
        <view class="rb-bar__target" :style="{ left: barPos(stat.target) + '%' }" />
        <view
          class="rb-bar__cur"
          :class="{ 'is-warn': stat.triggered }"
          :style="{ left: barPos(stat.weight) + '%' }" />
      </view>
    </view>
    <view class="rb-band__ranges">
      <text>5%绝对 {{ pctBand(stat.absLow) }}~{{ pctBand(stat.absHigh) }}</text>
      <text>25%相对 {{ pctBand(stat.relLow) }}~{{ pctBand(stat.relHigh) }}</text>
    </view>
    <view class="rb-band__eff">
      触发阈值 <text class="rb-b">{{ pctBand(stat.effLow) }}~{{ pctBand(stat.effHigh) }}</text>
      <text class="rb-band__rule">{{ strictLabel(stat.strictRule) }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { pct, pctBand, signed, devColor, strictLabel } from '../useRebalanceCalc'
import type { ClassStat } from '../useRebalanceCalc'

defineProps<{
  stat: ClassStat
  /** 总资产为 0：徽标显示占位 */
  empty: boolean
  /** 权重位置 → 百分比（barScale 依赖全局 stats，由监测卡统一下发） */
  barPos: (v: number) => number
}>()
</script>

<style lang="scss" scoped>
.rb-band {
  padding: 18rpx 0;
  border-bottom: 1rpx solid #f2f2f2;
}
.rb-band:last-child {
  border-bottom: 0;
  padding-bottom: 4rpx;
}
.rb-band__head {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.rb-band__name {
  font-size: 28rpx;
  font-weight: 500;
  color: #222;
}
/* 小药丸：定高 + flex 居中，不用上下 padding 撑高 */
.rb-band__bdg {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36rpx;
  padding: 0 16rpx;
  border-radius: 999rpx;
}
.rb-band__bdg-t {
  font-size: 22rpx;
  line-height: 1;
}
.rb-band__bdg.is-warn {
  background-color: #fef3c7;
  color: #92400e;
}
.rb-band__bdg.is-ok {
  background-color: #f3f4f6;
  color: #777;
}
.rb-band__nums {
  display: flex;
  flex-direction: row;
  gap: 28rpx;
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #888;
}
.rb-bar {
  margin: 14rpx 0 6rpx;
}
.rb-bar__track {
  position: relative;
  height: 16rpx;
  background-color: #f0f0f0;
  border-radius: 8rpx;
}
.rb-bar__band {
  position: absolute;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
  background-color: #e2ebf6;
  border-left: 2rpx solid #b9cde4;
  border-right: 2rpx solid #b9cde4;
}
.rb-bar__target {
  position: absolute;
  top: -4rpx;
  bottom: -4rpx;
  width: 2rpx;
  background-color: #94a3b8;
  transform: translateX(-1rpx);
}
.rb-bar__cur {
  position: absolute;
  top: 50%;
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background-color: #334155;
  border: 2rpx solid #fff;
  transform: translate(-50%, -50%);
}
.rb-bar__cur.is-warn {
  background-color: #d97706;
}
.rb-band__ranges {
  display: flex;
  flex-direction: row;
  gap: 24rpx;
  font-size: 22rpx;
  color: #999;
}
.rb-band__eff {
  font-size: 22rpx;
  color: #999;
  margin-top: 4rpx;
}
.rb-band__rule {
  display: inline-flex;
  align-items: center;
  height: 32rpx;
  padding: 0 12rpx;
  margin-left: 10rpx;
  border-radius: 999rpx;
  background-color: #f3f4f6;
  color: #666;
  font-size: 20rpx;
}

.rb-b {
  color: #333;
  font-weight: 500;
}
</style>
