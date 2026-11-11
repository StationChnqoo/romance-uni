<!--
  底部总览条（固定不滚）：总资产 / 目标合计 / 触发数 / 状态
  数据全走 store（useRebalanceCalc），本组件无 props
-->
<template>
  <view class="rb__bottom">
    <view class="rb__ov">
      <view class="rb__ov-item">
        <text class="rb__ov-k">总资产</text>
        <text class="rb__ov-v">{{ money(total) }}</text>
      </view>
      <view class="rb__ov-item">
        <text class="rb__ov-k">目标合计</text>
        <text class="rb__ov-v" :class="{ 'is-warn': targetSumOff }">{{ pct(targetSum / 100, 0) }}</text>
      </view>
      <view class="rb__ov-item">
        <text class="rb__ov-k">触发 5/25</text>
        <text class="rb__ov-v">{{ triggeredCount }} / {{ store.classes.length }}</text>
      </view>
      <view class="rb__ov-item">
        <text class="rb__ov-k">状态</text>
        <text class="rb__ov-v" :class="triggeredCount > 0 ? 'is-warn' : 'is-ok'">
          {{ total <= 0 ? '—' : triggeredCount > 0 ? '需再平衡' : '阈值内' }}
        </text>
      </view>
    </view>
    <RbBanner v-if="targetSumOff" type="warn" bottom>
      目标权重合计 {{ pct(targetSum / 100, 2) }}，应为 100%（全天候默认配比 30 / 40 / 15 / 7.5 / 7.5）
    </RbBanner>
  </view>
</template>

<script lang="ts" setup>
import { money, pct, useRebalanceCalc } from '../useRebalanceCalc'
import RbBanner from './RbBanner.vue'

const { store, total, targetSum, targetSumOff, triggeredCount } = useRebalanceCalc()
</script>

<style lang="scss" scoped>
.rb__bottom {
  background-color: #fff;
  border-top: 1rpx solid #eee;
  padding: 16rpx 24rpx;
}
.rb__ov {
  display: flex;
  flex-direction: row;
}
.rb__ov-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.rb__ov-k {
  font-size: 20rpx;
  color: #999;
}
.rb__ov-v {
  font-size: 26rpx;
  font-weight: 500;
  color: #222;
  margin-top: 2rpx;
}
.rb__ov-v.is-warn {
  color: #b45309;
}
.rb__ov-v.is-ok {
  color: #666;
}
</style>
