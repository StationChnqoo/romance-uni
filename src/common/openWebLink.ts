/**
 * 打开网页链接（资讯 / 行情详情等），按设置页「Webview 打开方式」分流：
 * - app：跳应用内 Webviewer 页（<web-view>，既有行为）；
 * - browser：直接外跳系统默认浏览器（plus.runtime.openURL / window.open）。
 *
 * 放 common 而不放 utils：本文件要同时引 Router 与 useUserStore，而 stores/user
 * 已 import utils 的 cloneDeep，塞进 utils 会和 store 形成循环依赖。
 */
import { Router } from '@/common/router'
import { useUserStore } from '@/stores/user'
import { openExternal } from '@/utils'

export const openWebLink = (url: string, title?: string) => {
  if (!url) return
  const userStore = useUserStore()
  if (userStore.webviewOpenMode === 'browser') {
    openExternal(url)
  } else {
    Router.navigate('Webviewer', { title: title || '', url })
  }
}
