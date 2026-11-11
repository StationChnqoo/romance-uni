/**
 * HTTP 出口
 *
 * 业务侧只从这里拿 apiHttp；第三方数据源在各自 api 模块里用 createHttp 自建实例，
 * 互不影响 baseURL 与 header。
 */
import { createHttp, setTokenGetter, setUnauthorizedHandler } from './request'
import { ENV } from '@/constants/env'
import { useUserStore } from '@/stores/user'
import { Router } from '@/common/router'

export * from './types'
export { createHttp, setTokenGetter, setUnauthorizedHandler } from './request'

/** 业务后端实例：baseURL 固定，响应按 R<T> 解包 */
export const apiHttp = createHttp({
  baseURL: ENV.API_BASE_URL,
  unwrap: true
})

// 延迟到请求时才读 store，避免模块加载期的循环依赖
setTokenGetter(() => useUserStore().token || '')

setUnauthorizedHandler(() => {
  const userStore = useUserStore()
  if (userStore.token) userStore.token = ''
  // 与主动登录校验保持一致：reLaunch 到登录页，登录成功后回首页
  Router.goLogin()
})
