<!--
  全局轻提示容器（view 版 toast 的渲染端）

  - 为什么自绘：原生 uni.showToast 偶发不自动消失、且会挡点击；这里用 view 画一个
    「带穿透、自动消失」的提示。
  - 穿透：根节点 pointer-events: none（App/H5 的 webview 生效），整层不拦截任何
    点击/滚动，后面的元素照常可点。小程序端天然不挡（view 默认不拦穿透点击）。
  - 层级：position: fixed 居中，z-index 用 9999（比 Dialog 的 9990 高一层，提示要盖在弹窗上）。
  - 动画：出现淡入，到期前淡出再移除节点（不直接消失，避免闪烁）。
  - 使用方：调用了 toast() 的页面在根节点末尾挂一个 <ToastContainer />；
    忘挂时 toast() 会兜底走 uni.showToast（见 Toast.ts），提示不丢。
  - 无需 import：pages.json 的 easycom autoscan 会扫到 components/ 下的组件，
    模板里直接写 <ToastContainer /> 即可（与 DialogContainer 一致）。
-->
<template>
  <view v-if="current" class="toast" :class="{ 'toast--hide': hiding }">
    <text class="toast__text">{{ current }}</text>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import type { ToastConfig } from '@/components/Toast'
import { registerToast, unregisterToast } from '@/components/Toast'

const current = ref('')
const hiding = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

const DURATION = 2500
const FADE = 300

/** 显示一条提示：覆盖上一条，先淡入，到期后淡出再移除 */
function handle(config: ToastConfig) {
  if (timer) clearTimeout(timer)
  if (hideTimer) clearTimeout(hideTimer)
  current.value = config.message
  hiding.value = false
  timer = setTimeout(() => {
    // 先淡出（opacity -> 0），FADE 后再移除节点
    hiding.value = true
    hideTimer = setTimeout(() => {
      current.value = ''
      hiding.value = false
      hideTimer = null
    }, FADE)
    timer = null
  }, DURATION - FADE)
}

onMounted(() => registerToast(handle))
onUnmounted(() => {
  if (timer) clearTimeout(timer)
  if (hideTimer) clearTimeout(hideTimer)
  timer = null
  hideTimer = null
  current.value = ''
  unregisterToast()
})
</script>

<style lang="scss" scoped>
.toast {
  /* 穿透：整层不拦截点击，后面元素照常可点（App/H5 的 webview 生效） */
  pointer-events: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  /* 半透明黑底圆角，白字，跟原生 toast 视觉一致 */
  background: rgba(17, 17, 17, 0.85);
  border-radius: 16rpx;
  padding: 12rpx 24rpx;
  max-width: 70%;
  opacity: 1;
  transition: opacity 0.2s ease;
  animation: toast-in 0.2s ease;
}

.toast--hide {
  opacity: 0;
}

.toast__text {
  color: #fff;
  font-size: 28rpx;
  text-align: center;
}

@keyframes toast-in {
  from {
    transform: translate(-50%, -50%) scale(0.92);
  }
  to {
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
