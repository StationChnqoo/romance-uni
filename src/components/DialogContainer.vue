<!--
  全局确认弹窗容器（Dialog.show 的渲染端）

  - 弹层用 wot 的 wd-popup（2026-10-05 曾短暂换 uni-ui 的 uni-popup，现已换回 wot）。
    Dialog.show 的签名与返回值不变，业务侧 30+ 处 `await Dialog.show(...)` 零改动。
  - wd-popup 用 v-model 控制显隐；层级直接走组件 :z-index="9990"（wot 的 z-index 是普通
    prop，不用再像 uni-popup 那样在 App.vue 写 !important 全局规则去压 99 的默认值）。
  - 关闭（含点遮罩）统一走 @close，在这里把结果 resolve 掉；cancelable=false 时
    :close-on-click-modal 设 false，点遮罩不关。
  - 按钮仍然用 wd-button（项目口径：按钮一律 wot）：确定为「主题色实心」，取消为「主题色空心」（plain），主次分明。
  - 使用方：调用了 Dialog.show 的页面在根节点末尾挂一个 <DialogContainer />；
    忘挂时 Dialog.show 会兜底走 uni.showModal（见 Dialog.ts），弹窗不丢。
-->
<template>
  <!-- root-portal：弹窗テレポート到文档根，脱离所在页面子树。
       在首页时，wd-floating-panel（position:fixed + transform + z-index:99）与弹窗同处一个
       层叠上下文会被盖住；テレポート到根后固定在最上层（层级仍由 :z-index 控制）。 -->
  <wd-popup
    v-model="visible"
    position="center"
    :close-on-click-modal="cancelable"
    :z-index="9990"
    root-portal
    @close="onClose"
  >
    <view class="dlg">
      <view v-if="current?.title" class="dlg__title">{{ current.title }}</view>
      <scroll-view v-if="current?.message" class="dlg__msg" scroll-y>
        <text class="dlg__msg-text">{{ current.message }}</text>
      </scroll-view>

      <view class="dlg__actions">
        <!-- 取消按钮：type=info（wot 内置浅灰，不依赖主题色变量、不受弹层内变量取不到的影响）。
             ⚠️ wd-button 默认 type=primary 是实心主题色，弹层内取不到 --wot-color-theme 会退回默认蓝，
             所以这里显式给 info，别靠变量上色。 -->
        <wd-button
          v-if="current?.negativeText"
          type="info"
          :round="false"
          custom-style="flex: 1"
          @click="finish('cancel')"
        >
          {{ current.negativeText }}
        </wd-button>
        <!-- 确定按钮：底色 = config.theme 或用户主题色（wot 的 customStyle 只吃字符串） -->
        <wd-button
          type="primary"
          :round="false"
          :custom-style="`flex: 1; background-color: ${btnTheme}; border-color: ${btnTheme};`"
          @click="finish('confirm')"
        >
          {{ current?.positiveText || '确定' }}
        </wd-button>
      </view>
    </view>
  </wd-popup>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { DialogConfig, DialogResult } from '@/components/Dialog'
import { registerDialog, unregisterDialog } from '@/components/Dialog'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const visible = ref(false)
const current = ref<DialogConfig | null>(null)
const cancelable = ref(true)
/** 当前弹窗的结果回调（open 期间有效），任何关闭路径都要走 finish 把它兑现 */
let resolver: ((r: DialogResult) => void) | null = null

/** 确定按钮底色：config.theme 优先，否则用户主题色 */
const btnTheme = computed(() => current.value?.theme || userStore.theme)

/**
 * 弹一次窗，等用户点了按钮（或点遮罩 / 程序关闭）才 resolve。
 * Dialog.ts 负责排队（同一时刻只有一条），这里只管一次的开合。
 */
function handle(config: DialogConfig): Promise<DialogResult> {
  current.value = config
  cancelable.value = config.cancelable !== false
  visible.value = true
  return new Promise<DialogResult>(resolve => {
    resolver = resolve
  })
}

/** 统一收口：关弹层 + 兑现结果（重复调用无害） */
function finish(result: DialogResult) {
  visible.value = false
  current.value = null
  const r = resolver
  resolver = null
  r?.(result)
}

/**
 * wd-popup 的 @close 只在「用户主动关闭」（点遮罩 / closable 的 X）时触发。
 * 已经开了、现在被关 = 用户取消，按 RN 口径算 cancel。
 * （程序里 finish 设 visible=false 也会关弹窗，但不走 @close，不会重复 resolve。）
 */
function onClose() {
  if (resolver) finish('cancel')
}

onMounted(() => registerDialog(handle))
onUnmounted(() => {
  // 页面销毁时若还有没兑现的等待，先兑现掉，避免调用方 Promise 永远挂住
  finish('dismiss')
  unregisterDialog()
})
</script>

<style lang="scss" scoped>
.dlg {
  box-sizing: border-box;
  width: 600rpx;
  padding: 40rpx 40rpx 32rpx;
  background: #fff;
  border-radius: 28rpx;
  display: flex;
  flex-direction: column;
}

.dlg__title {
  font-size: 32rpx;
  font-weight: 500;
  color: #1f2d3d;
  text-align: center;
}

/* 长文案可滚动：toast 超过 20 字会升级成弹窗，正文可能有几十上百字 */
.dlg__msg {
  max-height: 400rpx;
  margin-top: 20rpx;
  /* ⚠️ text-align 必须写在块级父容器上（scroll-view），不能写在下面的 <text> 上：
     <text> 是行内元素，自己设 text-align 不生效（标题是 <view> 块级所以能居中）。
     父级设了之后 text 继承，单行/多行都会居中。 */
  text-align: center;
}

.dlg__msg-text {
  font-size: 28rpx;
  color: #666;
}

.dlg__actions {
  margin-top: 36rpx;
  display: flex;
  flex-direction: row;
  gap: 16rpx;
}
</style>
