/**
 * 页面间传递大对象
 *
 * uni-app 的路由参数走 URL，各端对长度与编码的处理并不一致（小程序有硬限制，
 * App 端长串经过原生层也不可靠）。像「列表 -> 编辑页」要传整个对象
 * （如 MediaAsset / Anniversary，encodeURIComponent 后常超过 1KB）的场景，
 * 不能用 URL 传参。
 *
 * 这里用一个内存单例做中转：跳转前 set，目标页 take（取走即清空）。
 * 生命周期只覆盖当前页面栈存活期 —— 传的都是「当前表单」这类临时数据，App 被杀后
 * 丢失也无所谓，用户下次进来会重新编辑。
 */

const store = new Map<string, unknown>()

/** 已使用的 key，集中在这里避免两边写错字符串 */
export const PAGE_PARAMS = {
  /** MediaAsset：pkg-media/list -> pkg-media/edit（编辑页优先用它回显，避免详情接口异常导致空表单） */
  mediaAsset: 'mediaAsset',
  /** Anniversary：pkg-anniversary/list -> pkg-anniversary/edit（同 mediaAsset 的用途） */
  anniversary: 'anniversary',
  /** 笔记备注 markdown 原文：pkg-post/detail -> pkg-misc/preview-markdown（长文放不进 URL） */
  previewMarkdown: 'previewMarkdown'
} as const

export const setPageParam = (key: string, value: unknown) => {
  store.set(key, value)
}

/** 取走并删除，避免同一个值被后续进入的页面重复消费 */
export const takePageParam = <T>(key: string): T | undefined => {
  const value = store.get(key) as T | undefined
  store.delete(key)
  return value
}
