<!--
  再平衡方案 · 方式二：现有资金重分配（tab「现有资金重分配」）
  总资产 T 不变：Δ_i = w_i·T − V_i，ΣΔ_i = 0。
  数据全走 store（useRebalanceCalc），本组件无 props。
-->
<template>
  <view>
    <RbBanner v-if="total <= 0" type="info">请先输入各标的市值</RbBanner>
    <view v-for="(s, i) in stats" :key="i" class="rb-act">
      <text class="rb-act__name">{{ s.name }}</text>
      <view class="rb-act__right">
        <text
          class="rb-act__amt"
          :class="s.delta > 0.005 ? 'is-buy' : s.delta < -0.005 ? 'is-sell' : 'is-mut'">
          {{
            s.delta > 0.005
              ? '买入 ' + money(s.delta)
              : s.delta < -0.005
                ? '卖出 ' + money(-s.delta)
                : '不动'
          }}
        </text>
      </view>
    </view>
    <view class="rb-total">
      买入合计 <text class="rb-b">{{ money(buySum) }}</text>
      <text class="rb-dot">＝</text>
      卖出合计 <text class="rb-b">{{ money(sellSum) }}</text>
      <text class="rb-dot">·</text>
      总资产不变 <text class="rb-b">{{ money(total) }}</text>
    </view>
    <view class="rb-note">
      现有资金重分配不改变总资产：Δ_i = w_i·T − V_i，ΣΔ_i = 0（单位 K），卖出超配类别的资金恰好买入低配类别，调整后各类别精确回到目标权重。
    </view>
  </view>
</template>

<script lang="ts" setup>
import { money, useRebalanceCalc } from '../useRebalanceCalc'
import RbBanner from './RbBanner.vue'

const { total, stats, buySum, sellSum } = useRebalanceCalc()
</script>

<style lang="scss" scoped>
/* 方案行：买入红 / 卖出绿（涨红跌绿口径），不动置灰 */
.rb-act {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16rpx;
  padding: 16rpx 0;
  border-bottom: 1rpx solid #f2f2f2;
}
.rb-act__name {
  font-size: 26rpx;
  color: #333;
}
.rb-act__right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.rb-act__amt {
  font-size: 28rpx;
  font-weight: 500;
}
.rb-act__amt.is-buy {
  color: #f20c00;
}
.rb-act__amt.is-sell {
  color: #0c8918;
}
.rb-act__amt.is-mut {
  color: #999;
  font-weight: 400;
}
.rb-total {
  padding: 16rpx 0 4rpx;
  font-size: 24rpx;
  color: #666;
}
.rb-note {
  font-size: 22rpx;
  color: #999;
  margin-top: 12rpx;
}

.rb-b {
  color: #333;
  font-weight: 500;
}
.rb-dot {
  margin: 0 8rpx;
  color: #bbb;
}
</style>
