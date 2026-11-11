<!--
  wd-input 薄封装：本工具所有输入框的公共配置收在一处

  ⚠️ mp-weixin 端的两道隔离墙（2026-10-16 踩坑，见 wot-components.md）：
  1. wd-input 编译后是 isolated 组件，**组件（RbInput）的 wxss 默认出不去**——
     所以本组件必须声明 styleIsolation:'shared'，下面的内部规则才进得去；
     App/H5 是 webview 无隔离，不依赖这个声明。
  2. 布局若只走 scoped 选择器 + custom-class，mp 端选不中组件根节点——
     所以布局**双通道**：内联 custom-style（mp 端一定赢）+ scoped 布局类
     （App/H5 端 webview 会丢弃内联 rpx，那边靠 scoped 类接管）。
  3. 右对齐用 wd-input 内置 align-right  prop（is-align-right 是组件自身规则，
     全平台免维护），不再自己写 text-align。
-->
<template>
  <wd-input
    :model-value="modelValue"
    :type="type"
    :no-border="true"
    :align-right="align === 'right'"
    :placeholder="placeholder"
    :placeholder-style="placeholderStyle"
    :custom-class="inpClass"
    :custom-style="rootStyle"
    @update:model-value="onInput" />
</template>

<script lang="ts">
/**
 * mp-weixin：wd-input 是 isolated 自定义组件，本组件的 wxss（含 scoped）默认影响不到它。
 * shared 让本组件样式可进入 wd-input 内部（App/H5 无隔离，此声明无副作用）。
 */
export default {
  name: 'RbInput',
  options: {
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  /** 绑定值（含数字位也按原始字符串存 store） */
  modelValue?: string
  placeholder?: string
  /** 数字键盘 */
  type?: 'text' | 'digit'
  /** 值对齐方式（right 走内置 align-right prop，center 走内部规则） */
  align?: 'left' | 'right' | 'center'
  /** 名称位：加粗 30rpx */
  bold?: boolean
  /** 宽度档位；不传 = 内容宽度（auto），grow = 撑满剩余 */
  width?: 'grow' | 'pct' | 'val' | 'money'
  /** placeholder 颜色；不传走 wot 默认灰 */
  placeholderStyle?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [string]
}>()

/**
 * 布局内联下发（mp-weixin 主通道）：
 * 默认不撑满（flex: 0 1 auto = 内容宽度，父级 space-between 才能显出间隔），
 * 要撑满显式传 width="grow"；flex/min-width 无 rpx，App/H5 的 webview 也不会丢；
 * rpx 宽度在 App 端会被 webview 整条丢弃，但同值写在下方 scoped 布局类里，App/H5 走那条。
 */
const rootStyle = computed(() => {
  if (props.width === 'pct') return 'width: 90rpx; flex: none;'
  if (props.width === 'val') return 'width: 200rpx; flex: none;'
  if (props.width === 'money') return 'width: 230rpx; flex: none;'
  return 'flex: 0 1 auto; min-width: 0;'
})

/** class 钩子：布局类给 App/H5 的 scoped 规则用；center / bold 钩子给内部规则用 */
const inpClass = computed(() =>
  [
    'rb-inp',
    props.align === 'center' ? 'rb-inp--center' : '',
    props.bold ? 'rb-inp--bold' : '',
    props.width ? 'rb-inp--' + props.width : ''
  ]
    .filter(Boolean)
    .join(' ')
)

const onInput = (v: string) => emit('update:modelValue', v)
</script>

<style lang="scss" scoped>
/* 布局类（App/H5 通道）：走 custom-class 落在 wd-input 根节点上，scoped 可吃 */
.rb-inp--grow {
  flex: 1;
  min-width: 0;
}
.rb-inp--pct {
  width: 90rpx;
  flex: none;
}
.rb-inp--val {
  width: 200rpx;
  flex: none;
}
.rb-inp--money {
  width: 230rpx;
  flex: none;
}
</style>

<style>
/* wd-input 内部规则：靠 styleIsolation:'shared' 进入 isolated 组件（mp-weixin）；
   App/H5 无隔离，同样生效。右对齐不在这里——用内置 align-right prop */
.rb-inp {
  padding: 0 !important;
}
.rb-inp--center input,
.rb-inp--center .wd-input__inner {
  text-align: center;
}
.rb-inp--bold input {
  font-weight: 500;
  font-size: 30rpx;
}
</style>
