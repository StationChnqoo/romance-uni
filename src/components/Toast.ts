/**
 * 全局轻提示（view 版 toast 的单例逻辑）
 *
 * 为什么不用 uni.showToast：
 *   - 原生 toast 由 App 运行时接管，偶发不自动消失、且 icon:'none' 时仍可能挡点击；
 *   - 业务要「带穿透（不挡后面元素点击）、自动消失、样式统一」的提示，原生做不到。
 * 所以改成自绘 view：本文件持单例状态，视图在 components/ToastContainer.vue，
 * 容器挂载时 registerToast 注册自己的 render，业务侧还是走 utils/index.ts 的 toast()。
 *
 * 设计对齐 components/Dialog.ts：模块级单例 + 容器注册 handler。
 * 差别：toast 无交互（不用等用户点），所以 handler 是「同步渲染 + 内部定时消失」，
 *       不需要 Promise 链排队——连续弹直接覆盖上一条（跟原生 toast 的「后弹顶掉先弹」一致）。
 */

export interface ToastConfig {
  message: string
}

/** 容器的渲染函数：显示一条提示，内部自行定时消失 */
export type ToastHandler = (config: ToastConfig) => void

/** ToastContainer 挂载时注册自己的 render，卸载时注销 */
let _handler: ToastHandler | null = null

export const registerToast = (fn: ToastHandler) => {
  _handler = fn
}

export const unregisterToast = () => {
  _handler = null
}

/**
 * 弹一条轻提示。
 * 当前页面没挂 ToastContainer 时兜底走 uni.showToast（保证提示不丢），
 * 挂了则走自绘 view（带穿透、自动消失）。
 */
export const showToast = (config: ToastConfig) => {
  if (!config?.message) return
  if (_handler) {
    _handler(config)
    return
  }
  uni.showToast({ title: config.message, icon: 'none', duration: 2500 })
}
