<!--
  通用分类标签（可点选 chip）

  ⚠️ 视觉口径：**跟 DeleteableTags.vue 完全同款（描边药丸），只是没有删除按钮**
     —— 64rpx 高、20rpx 圆角、2rpx 描边、32rpx 字；DeleteableTags 的 padding 是
     `0 8rpx 0 16rpx`（右边留给 × 图标），这里没有删除按钮，改成左右对称 `0 16rpx`。

  ⚠️ 为什么不用 wot 的 wd-tag：wot 默认是灰底/蓝 primary，跟本项目主题色冲突，
     在「媒体类型分布」「分组筛选」这类场景里一排蓝色/灰色 pill 很脏。
  - 默认态：透明底 + #333 字 + #e1e1e1 灰描边（就是 DeleteableTags 那颗）
  - 选中态：浅主题色底（theme + '1f'）+ 主题色字 + 主题色描边，用来标出当前选中的分组。
  纯 CSS + 内联色，不依赖任何运行时测距，mp / app 一致。

  用法：`<Tag :active="选中态" :theme="主题色" @click="...">文字</Tag>`
  文字优先用插槽，也支持 text prop。
-->
<template>
  <view
    class="tag"
    :class="{ 'is-active': active }"
    :style="tagStyle"
    hover-class="tag--hover"
    @click="onClick"
  >
    <slot>{{ text }}</slot>
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { THEME_COLOR } from '@/stores/user'

const props = withDefaults(
  defineProps<{
    /** 标签文字（缺省时走插槽） */
    text?: string
    /** 是否选中态：选中=主题色系，未选=DeleteableTags 的灰描边款 */
    active?: boolean
    /** 主题色（6 位 hex），用于推导选中态底色；默认取 stores/user 的 THEME_COLOR */
    theme?: string
  }>(),
  { text: '', active: false, theme: THEME_COLOR }
)

const emit = defineEmits<{ (e: 'click'): void }>()

// 6 位 hex + 2 位 alpha（'1f'），拼出带透明度的同色系底（主题色统一来自 stores/user）
const tagStyle = computed(() => ({
  backgroundColor: props.active ? props.theme + '1f' : 'transparent',
  color: props.active ? props.theme : '#333',
  borderColor: props.active ? props.theme : '#e1e1e1',
}))

const onClick = () => emit('click')
</script>

<style lang="scss" scoped>
.tag {
  /* 跟 DeleteableTags 的 &__item 同款：height 64rpx / border 2rpx / radius 20rpx；
     padding 左右对称（没有删除按钮，不用给右边留 icon 位） */
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  height: 50rpx;
  padding: 0 16rpx;
  border: 2rpx solid;
  border-radius: 12rpx;
  font-size: 28rpx;
  transition:
    background-color 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;

  &--hover {
    /* 跟 DeleteableTags 的 hover 一致（RN activeOpacity 0.8） */
    opacity: 0.6;
  }
}
</style>
