<template>
  <view class="return-row">
    <view v-for="item in timeKeys" :key="item.key" class="return-row__item">
      <text class="return-row__label">{{ item.label }}</text>
      <view class="return-row__gap" />
      <text
        class="return-row__value"
        :style="{color: directionOf(item.key).color}"
        >{{
          `${directionOf(item.key).operator}${Math.abs(percentOf(item.key)).toFixed(2)}`
        }}<text :style="{fontSize: '24rpx'}">%</text>
      </text>
    </view>
  </view>
</template>

<script lang="ts" setup>
/**
 * 区间收益对比行（按时间维度逐个显示加权收益）
 * 由 cloud-react-native/src/screens/Financing/components/ReturnCompareRow.tsx 迁移。
 *
 * - RN 的 timeKeys 由父组件传入，这里保持一致（数组顺序即展示顺序）。
 * - RN 的 keyPrefix 只用于拼 React 的 key，Vue 侧用 item.key 即可，不再需要。
 * - getPercentByKey 是函数 props：父组件在「历史收益 / 标的收益」之间切换时换掉这个函数，
 *   行内只负责渲染，不关心口径。
 */
import {renderUpOrDown} from '@/utils';

const props = defineProps<{
  timeKeys: ReadonlyArray<{key: string; label: string}>;
  getPercentByKey: (key: string) => number;
}>();

const percentOf = (key: string) => props.getPercentByKey(key) || 0;
const directionOf = (key: string) => renderUpOrDown(percentOf(key));
</script>

<style lang="scss" scoped>
.return-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &__label {
    color: #ccc;
    font-size: 24rpx;
  }
  &__gap {
    height: 10rpx;
  }
  &__value {
    font-size: 32rpx;
  }
}
</style>
