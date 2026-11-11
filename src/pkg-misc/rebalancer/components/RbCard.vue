<!--
  卡片壳：白底圆角 + 标题（可带副标题） + 内容插槽
  本工具四张卡（持仓输入 / 阈值监测 / 再平衡方案 / 公式说明）共用
-->
<template>
  <view class="rb-card">
    <view class="rb-card__title">
      <text>{{ title }}</text>
      <text v-if="sub" class="rb-card__sub">{{ sub }}</text>
    </view>
    <slot />
  </view>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
  /** 副标题：标题右侧的灰色小字 */
  sub?: string
}>()
</script>

<style lang="scss" scoped>
.rb-card {
  background-color: #fff;
  border-radius: 16rpx;
  margin: 20rpx 24rpx;
  padding: 24rpx;
}
.rb-card__title {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  font-size: 30rpx;
  font-weight: 500;
  color: #222;
  margin-bottom: 16rpx;
}
.rb-card__sub {
  font-size: 22rpx;
  font-weight: 400;
  color: #999;
  margin-left: 12rpx;
}
</style>
