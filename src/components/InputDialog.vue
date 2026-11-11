<template>
  <!-- wd-popup：用 v-model（:model-value 接外部 props.show）控制显隐，
       点遮罩关闭时走 @update:model-value 把状态同步回父级（emit close）。
       ⚠️ safe-area-inset-bottom 关掉（默认就是 false）：底部安全区由 manifest 的
       safearea.bottom.offset=auto 在系统层统一避让，弹层再加一遍会多出一截空白。 -->
  <!-- ★ root-portal + 显式层级：这个组件也被 FileUploader 用在 z-paging 表单内，
       不开传送会被 .z-paging-content 的 overflow:hidden 困住（弹层盖不到页面底部按钮）。
       与 wd-datetime-picker 一致取 999，低于 Dialog 9990 / toast 9999。 -->
  <wd-popup
    :model-value="props.show"
    position="bottom"
    :safe-area-inset-bottom="false"
    :close-on-click-modal="true"
    :root-portal="true"
    :z-index="999"
    @update:model-value="onModelUpdate"
  >
    <view class="dialog">
      <view class="dialog__head">
        <text class="dialog__title">{{ title }}</text>
        <wd-button
          v-if="clearable && text"
          type="text"
          size="small"
          :custom-style="'color: #999'"
          @click="text = ''"
        >
          清除
        </wd-button>
      </view>

      <text v-if="message" class="dialog__message">{{ message }}</text>

      <!-- App 端输入框是原生控件：
           - 用 v-model（异步赋值写 :value 有概率不刷新）
           - focus 交给 innerFocus，等弹窗展开动画结束再置真，
             否则面板还没到位键盘就先弹起来
           - textarea 的 maxlength 不设上限（uni 默认 140，长内容会被静默截断） -->
      <textarea
        v-if="multiline"
        v-model="text"
        class="dialog__input dialog__input--area"
        :placeholder="placeholder"
        :maxlength="-1"
        :focus="innerFocus"
        :auto-focus="innerFocus"
      />
      <input
        v-else
        v-model="text"
        class="dialog__input"
        :placeholder="placeholder"
        :confirm-type="confirmType"
        :focus="innerFocus"
        @confirm="onConfirm"
      />

      <Flex horizontal :custom-style="{ marginTop: '32rpx' }">
        <wd-button
          block
          :round="false"
          :custom-style="'flex: 1; min-width: 0; background-color: ' + theme"
          @click="onConfirm"
        >
          {{ confirmText }}
        </wd-button>
      </Flex>
    </view>
  </wd-popup>
</template>

<script lang="ts" setup>
/**
 * 通用输入弹窗（底部弹层）
 * 由 cloud-react-native/src/components/InputDialog.tsx 迁移，
 * 排版口径取自媒体列表的搜索弹窗（pkg-media/list），现在三处共用这一个组件：
 *   - pkg-media/list        搜索媒体关键词
 *   - pkg-wallet/edit       追加资产项
 *   - pkg-portfolio/edit-record 追加一条金额
 *
 * 结构：头部（标题 + 可选「清除」）→ 可选说明文字 → 输入框 → 满宽确认按钮。
 * 关闭方式：点遮罩 / 点确认（没有单独的「取消」，与媒体弹窗一致）。
 *
 * 位置：RN 的 Modal 容器是 justifyContent:'flex-end' + 上圆角（见 components/Modal.tsx），
 * 所以这里是底部弹层、通栏，不是居中卡片。
 */
import { computed, ref, watch } from 'vue'
import Flex from '@/components/Flex.vue'
import { useUserStore } from '@/stores/user'

/** 确认按钮：直接用 wot 的 wd-button，尺寸走 wot 默认值，只把实底色换成本项目主题色 */
const userStore = useUserStore()
const theme = computed(() => userStore.theme)

const props = withDefaults(
  defineProps<{
    show: boolean
    title: string
    /** 标题下的说明文字，可不传 */
    message?: string
    /** 打开时回填的初始值 */
    value?: string
    placeholder?: string
    /** 头部是否提供「清除」（有内容时才显示） */
    clearable?: boolean
    /** 多行输入（默认单行 input） */
    multiline?: boolean
    /** uni input 的 confirm-type，搜索场景传 search */
    confirmType?: 'done' | 'search' | 'next' | 'go' | 'send'
    confirmText?: string
  }>(),
  {
    message: '',
    value: '',
    placeholder: '',
    clearable: false,
    multiline: false,
    confirmType: 'done',
    confirmText: '确认'
  }
)

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm', value: string): void
}>()

/** 初值直接取 props.value：初始就可能 show=true（watch 不再 immediate） */
const text = ref(props.value || '')
const innerFocus = ref(false)
let focusTimer: ReturnType<typeof setTimeout> | null = null

const clearFocusTimer = () => {
  if (focusTimer) {
    clearTimeout(focusTimer)
    focusTimer = null
  }
}

watch(
  () => props.show,
  visible => {
    clearFocusTimer()
    if (visible) {
      text.value = props.value || ''
      innerFocus.value = false
      // 弹层有展开动画，等它到位再给焦点，否则键盘先弹、面板还在下面
      focusTimer = setTimeout(() => {
        innerFocus.value = true
      }, 350)
    } else {
      innerFocus.value = false
    }
  }
)

/**
 * wd-popup 点遮罩关闭时把 modelValue 置 false 并回传。这里复位焦点 + 通知父级。
 * ⚠️ 父级把 props.show 置 false 来关闭时，wd-popup 不回传 update（那是外部主动关，
 *    不需要再 emit close），所以焦点复位交给上面的 watch 兜底即可。
 */
function onModelUpdate(val: boolean) {
  if (val) return
  clearFocusTimer()
  innerFocus.value = false
  emit('close')
}

const onConfirm = () => emit('confirm', (text.value || '').trim())
</script>

<style lang="scss" scoped>
/* 排版与媒体列表弹窗（.media__pop）保持完全一致 */
.dialog {
  padding: 32rpx 30rpx 40rpx;
  background-color: #fff;
  border-radius: 24rpx 24rpx 0 0;

  &__head {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  &__title {
    color: #333;
    font-weight: 500;
    font-size: 32rpx;
  }
  &__message {
    display: block;
    margin-top: 16rpx;
    color: #666;
    font-size: 28rpx;
  }
  &__input {
    box-sizing: border-box;
    width: 100%;
    height: 88rpx;
    margin-top: 24rpx;
    padding: 0 24rpx;
    font-size: 28rpx;
    color: #333;
    background-color: #f5f5f5;
    border-radius: 12rpx;
  }
  &__input--area {
    height: 200rpx;
    padding: 20rpx 24rpx;
  }
}
</style>
