<template>
  <view :style="themeVars" class="webviewer">
    <web-view
      v-if="url"
      :src="url"
      :update-title="false"
      :webview-styles="{ progress: { color: THEME_COLOR } }"
    />
    <text v-else class="webviewer__empty">链接无效</text>
  </view>
  <ToastContainer />
</template>

<script lang="ts" setup>
/**
 * 网页查看器
 * 由 cloud-react-native/src/screens/Webviewer/index.tsx 迁移。
 *
 * - RN 的自绘 ToolBar -> uni-app 原生导航栏：pages.json 里这一页用 navigationStyle: default，
 *   标题在 onLoad 时用 setNavigationBarTitle 写入。与钱包 / 媒体等分包页同款约定，
 *   不再迁移 RN 的自定义 ToolBar。
 * - RN 的 react-native-webview -> **uni 内置 `<web-view>`**（2026-10-04 改，自封装的
 *   components/NativeWebView.vue 已删除）。内置组件在 App 端底层同样走
 *   `plus.webview.create(src, id, webviewStyles)`（见 @dcloudio/uni-app-plus 的 WebView 组件），
 *   并且**会自动按原生导航栏高度算 top**，够用，不再自己维护一层原生子窗口。
 * - ⚠️ 内置组件的能力边界（源码里 props 就这三个）：
 *     `src` / `updateTitle` / `webviewStyles`（后者可传 progress.color 等）
 *   —— **没有**注入 JS、自定义请求头、缓存策略、网页内后退、error 事件。
 *   因此本页不再消费 `injectedJavaScript`（types/router.ts 已移除该字段）。
 * - 标题固定显示调用方传入的 title（RN 版行为），所以 update-title 传 false，
 *   不让网页自己的 <title> 把导航栏顶掉。
 *
 * 入参见 types/router.ts 的 Webviewer：{ title, url }，由调用方保证非空。
 */
import ToastContainer from '@/components/ToastContainer.vue'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { THEME_COLOR } from '@/stores/user'
import { mediaUrl } from '@/utils'
import { useThemeVars } from '@/composables/useThemeVars'

const themeVars = useThemeVars()


/**
 * URL 归一化（解码兜底 + 非 ASCII 编码）
 *
 * 1) 兜底解码：正常链路是对称的（Router.navigate 编一次、uni parseQuery 解一次），
 *    但个别端 / 个别场景会多包一层 encode，表现为到手仍是 `https%3A%2F%2F...` 形态，
 *    拿到这种 url 会直接加载失败（看起来就像"没 decode"）。这里只在「明确还是 encode 形态」时
 *    再解一次：用 ^https?:// 判断 + %3A%2F%2F 特征，避免误伤 url 里本来就带 % 的合法参数。
 *
 * 2) ★ 再统一 encode 成 ASCII 安全形态（复用 utils 的 mediaUrl）：
 *    MSN Feed 返回的文章 url 路径段带**未编码中文**（例 `.../money/热门股/.../ar-XXXX`），
 *    而 App 端 <web-view> 与 <image> 一样走原生层解码，非 ASCII（中文 / 空格）会加载失败
 *    或落到错误页 —— 表现就是「点详情链接不对」。mediaUrl 用 encodeURI 只编码非 ASCII、
 *    不碰已存在的 %xx 转义，正是这里要的处理。
 */
const normalizeUrl = (raw: string) => {
  let value = raw || ''
  if (value && !/^https?:\/\//i.test(value) && /%3A%2F%2F/i.test(value)) {
    try {
      value = decodeURIComponent(value)
    } catch (error) {
      /* 非法转义（比如落单的 %），保持原样交给 webview 自己报错 */
    }
  }
  return mediaUrl(value)
}

/**
 * 标题兜底解码
 *
 * 与 url 是**同一个坑**：Router.navigate 的 stringifyParams 用 encodeURIComponent 编了一次，
 * 但个别端到 onLoad 时并不还原（url 那边实测到手仍是 `https%3A%2F%2F...`），
 * 标题里的空格就原样顶着 `%20` 显示出来了。
 * 标题没有 url 那种 `^https?://` 特征可依，改用「**还含 %XX 转义**」作判据；
 * 极端情况下会多编一层，所以最多解两层；解不动（落单 % 等非法转义）就保持原样，
 * 绝不把本来正常的标题弄坏（比如「涨幅50%的股票」不含 %XX，不会被碰）。
 */
const normalizeTitle = (raw: string) => {
  let value = raw || ''
  for (let i = 0; i < 2 && /%[0-9A-Fa-f]{2}/.test(value); i++) {
    try {
      value = decodeURIComponent(value)
    } catch (error) {
      break
    }
  }
  return value
}

const url = ref('')

onLoad((options?: any) => {
  url.value = normalizeUrl(options?.url || '')
  const title = normalizeTitle(options?.title || '')
  if (title) {
    uni.setNavigationBarTitle({ title })
  }
})
</script>

<style lang="scss" scoped>
.webviewer {
  /**
   * 100vh 在 App 端等于页面可视区高度（uni-app 已排除原生导航栏与状态栏），
   * 父容器必须显式给高度，否则高度塌陷 -> 白屏。
   */
  width: 100%;
  height: 100vh;

  &__empty {
    display: block;
    padding: 80rpx 0;
    color: #999;
    font-size: 28rpx;
    text-align: center;
  }
}
</style>
