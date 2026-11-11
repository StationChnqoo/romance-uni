/**
 * 全局确认弹窗
 * 由 cloud-react-native/src/components/Dialog.tsx 迁移。
 *
 * 渲染端是 wot 的 wd-popup（components/DialogContainer.vue，卡片内容自绘），
 * 容器把 handle() 注册进来；Dialog.show 通过模块级单例与容器通信，
 * API 与 RN 版完全一致：
 *   const r = await Dialog.show({title, message, positiveText, negativeText})
 *   // r: 'confirm' | 'cancel' | 'dismiss'
 *
 * - 容器同一时刻只能弹一条，所以这里用 Promise 链排队：上一条结束后才弹下一条
 *   （与 RN 版队列行为一致）。
 * - 页面忘挂容器时，show 自动兜底走 uni.showModal，不会静默吞掉弹窗。
 * - 按钮是容器里的 wot wd-button，不自绘：只覆盖确定按钮的背景色
 *   （config.theme 优先，否则容器取用户主题色），圆角/尺寸/内边距全走 wot 预设。
 * - 自定义内容（renderContent）暂不支持，降级为 message。
 *
 * ⚠️ 本文件不 import 任何 store / 组件：容器单向依赖这里，方向反了会成环
 *    （DialogContainer → Dialog → stores/user → utils → Dialog）。
 */

export type DialogResult = 'confirm' | 'cancel' | 'dismiss'

export interface DialogConfig {
  title?: string;
  message?: string;
  positiveText?: string;
  negativeText?: string;
  theme?: string;
  cancelable?: boolean;
  /** 自定义内容暂不支持，降级为 message */
  renderContent?: unknown;
}

/** 容器的弹窗处理函数：开一次窗，等用户点了按钮（或关掉）才 resolve */
export type DialogHandler = (config: DialogConfig) => Promise<DialogResult>

/** DialogContainer 挂载时注册自己的 handle，卸载时注销 */
let _handler: DialogHandler | null = null

export const registerDialog = (fn: DialogHandler) => {
  _handler = fn
}

export const unregisterDialog = () => {
  _handler = null
}

/** 用 Promise 链串行化：容器一次只能弹一条，必须等上一条结束 */
let _chain: Promise<unknown> = Promise.resolve()

export class Dialog {
  /**
   * 显示对话框并返回用户选择的结果
   * @returns Promise<'confirm' | 'cancel' | 'dismiss'>
   */
  static show(config: DialogConfig): Promise<DialogResult> {
    if (_handler) {
      const p = _chain.then(() => _handler!(config), () => _handler!(config))
      _chain = p.catch(() => 'cancel')
      return p
    }
    // 兜底：当前页面没挂 DialogContainer 时走系统弹窗，保证弹窗不丢
    return new Promise(resolve => {
      uni.showModal({
        title: config.title || '提示',
        content: config.message || '',
        showCancel: !!config.negativeText,
        confirmText: config.positiveText || '确定',
        cancelText: config.negativeText || '取消',
        success: res => {
          if (res.confirm) resolve('confirm')
          else resolve('cancel')
        },
        fail: () => resolve('dismiss')
      })
    })
  }
}

export default Dialog
