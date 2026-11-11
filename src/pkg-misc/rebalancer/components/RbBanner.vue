<!--
  提示条：info / warn / ok / err 四态
  琥珀（warn）与灰（ok / info）不占红绿，避免与行情「涨红跌绿」冲突；
  err 仅用于「新增资金不足」这种数学上不可行的场景。
-->
<template>
  <view class="rb-banner" :class="['rb-banner--' + type, bottom ? 'rb-banner--bottom' : '']">
    <slot />
  </view>
</template>

<script lang="ts" setup>
defineProps<{
  type: 'info' | 'warn' | 'ok' | 'err'
  /** 贴底用法（总览条内）：去掉下外边距 */
  bottom?: boolean
}>()
</script>

<style lang="scss" scoped>
.rb-banner {
  border-radius: 10rpx;
  padding: 14rpx 18rpx;
  font-size: 24rpx;
  margin-bottom: 16rpx;
}
.rb-banner--warn {
  background-color: #fef3c7;
  color: #92400e;
}
.rb-banner--ok {
  background-color: #f0fdf4;
  color: #166534;
}
.rb-banner--err {
  background-color: #fef2f2;
  color: #991b1b;
}
.rb-banner--info {
  background-color: #f8fafc;
  color: #888;
}
.rb-banner--bottom {
  margin: 12rpx 0 0;
}
</style>
