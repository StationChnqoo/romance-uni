/**
 * 跨端 storage 适配器
 *
 * 替换 pinia-plugin-persistedstate v1.x 默认的 `window.localStorage`。
 *
 * 默认 storage 在 uni-app 各端都不可靠：
 * - H5：HBuilderX 真机调试时浏览器原生 localStorage 会被独立沙箱包一层，
 *   reload 后 key 不一致；
 * - App：uni-app app-plus 没有原生 window.localStorage，插件检测到 `undefined`
 *   会**静默跳过读写**，所以 token 既没保存也没恢复；
 * - 小程序：完全独立的 wx storage，与 web localStorage 不互通。
 *
 * `uni.getStorageSync` / `uni.setStorageSync` 在 H5、App、各小程序下都被
 * 编译到对应平台的原生 API（H5 走浏览器 localStorage，App 走 SQLite，
 * 小程序走 wx storage），行为一致。
 *
 * 类型与 pinia-plugin-persistedstate 定义的 StorageLike 一致：
 *   Pick<Storage, 'getItem' | 'setItem'>
 */
export const uniStorage: Pick<Storage, 'getItem' | 'setItem'> = {
  getItem(key) {
    try {
      const v = uni.getStorageSync(key)
      // uni 的接口约定：无值或空串都返回 ''，与 web storage「返回 null」不一致，
      // 这里统一成「返回 null 表示没有」让插件逻辑可识别。
      if (v === '' || v == null) return null
      return typeof v === 'string' ? v : JSON.stringify(v)
    } catch {
      return null
    }
  },
  setItem(key, value) {
    try {
      uni.setStorageSync(key, value)
    } catch {
      /* storage 配额满或被禁用，跳过持久化；下次启动用户会被要求重新登录 */
    }
  }
}