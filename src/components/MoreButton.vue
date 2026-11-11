<template>
  <!-- 文字按钮：直接用 wot 的 wd-button（type="text" 就是主题色纯文字按钮），
       不再自绘 view + @click。箭头用 wd-icon（原来那张 arrow-right.png 已删）；
       disabled 交给 wd-button 自己的 disabled（内部已拦掉点击）。 -->
  <view class="more">
    <wd-button
      type="text"
      size="small"
      :custom-style="'color: ' + color"
      :disabled="disabled"
      @click="onPress"
    >
      <view class="more__inner">
        <text class="more__label">{{ label }}</text>
        <view class="more__gap" />
        <!-- size 取 38rpx 不是 28rpx：字体图标的墨迹只占约 0.67em，
             38rpx × 0.67 ≈ 25rpx，正好等于原来那张 28rpx 的 png
             （箭头墨迹占图高 90.6%，#303030 也是从 png 里取的色） -->
        <wd-icon
          class="more__arrow"
          name="arrow-right"
          size="38rpx"
          color="#303030"
        />
      </view>
    </wd-button>
  </view>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import { useUserStore } from '@/stores/user';

const props = withDefaults(defineProps<{label: string; disabled?: boolean}>(), {
  disabled: false,
});

const emit = defineEmits<{(e: 'press'): void}>();

const userStore = useUserStore();
const color = computed(() => (props.disabled ? '#999' : userStore.theme));

const onPress = () => {
  if (props.disabled) return;
  emit('press');
};
</script>

<style lang="scss" scoped>
.more {
  /* 外层只负责「可被 flex 压缩」，按钮自身的尺寸全走 wd-button 预设 */
  display: flex;
  flex-shrink: 1;
  min-width: 0;

  &__inner {
    flex-direction: row;
    align-items: center;
    flex-shrink: 1;
    display: flex;
  }
  &__label {
    font-size: 28rpx;
    flex-shrink: 1;
    /* #ifdef APP-PLUS */
    lines: 1;
    /* #endif */
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  &__gap {
    width: 4rpx;
  }
  &__arrow {
    /* 尺寸 / 颜色都交给 wd-icon 自己（size / color 落在内联 style 上），
       这里只兜住「不被长 label 挤扁」。 */
    flex-shrink: 0;
  }
}
</style>
