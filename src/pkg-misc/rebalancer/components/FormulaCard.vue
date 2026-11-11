<!--
  公式说明卡（静态文案）：独立成件，让页面保持纯组合
-->
<template>
  <RbCard title="公式说明">
    <view class="rb-note">
      <view>· 5/25 生效区间 [max(w−5pp, 0.75w), min(w+5pp, 1.25w)]，取更窄者，越出即触发。</view>
      <view>· 商品仓位 = 有色金属 / 能源化工 / 饲料豆粕 3 只 ETF 合成（各 2.5%，合计 7.5%）；5/25 只在合计层级执行，区间 5.625%–9.375%，3 只 ETF 不单独设阈值。</view>
      <view>· 现有资金重分配：Δ_i = w_i·T − V_i，ΣΔ_i = 0，总资产 T 不变；卖出超配类别的资金恰好买入低配类别，调整后各类别精确回到目标权重。</view>
    </view>
  </RbCard>
</template>

<script lang="ts" setup>
import RbCard from './RbCard.vue'
</script>

<style lang="scss" scoped>
.rb-note {
  font-size: 22rpx;
  color: #999;
  margin-top: 12rpx;
}
</style>
