<script lang="ts" setup>
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

/**
 * ⚠️ 热更新不在 App.vue 里做，已移到首页 src/pages/home/index.vue。
 *
 * 原因：uni-app 的 App.vue **只跑生命周期，模板在 App 端不渲染**（官方 App.vue 也从不写
 * template）。曾经在这里挂 <UpdateModal> + onLaunch 调 check()，结果是「检查请求发了、
 * 服务端也回了更新，但弹窗永远不出现」。检查与弹窗必须同处一个页面组件内，故放首页。
 */
onLaunch(() => {
  console.log('App Launch')
})

onShow(() => {
  console.log('App Show')
})

onHide(() => {
  console.log('App Hide')
})
</script>

<!-- 无 template：App.vue 的模板在 App 端不渲染，曾挂在这里的 <UpdateModal> 从未显示过。
     热更新的检查与弹窗统一放在首页 src/pages/home/index.vue。 -->

<style lang="scss">
/* 内联子集字体（钉钉进步体 / 数码字），全局注册，任意页面可用，详见该文件头部注释 */
@use './styles/fonts.scss' as *;
/* 情侣空间视觉系统：lv-* 全局类（卡片 / 主视觉 / 装饰 / 按钮 / 弹层），详见该文件头部注释。
   ⚠️ 必须放 App.vue 的「无 scoped」style 块：页面级 style 会被加 data-v，跨不到 wd-popup 等组件根节点。 */
@use './styles/love-ui.scss' as *;
/* Remix Icon 子集字体：情侣空间所有图标统一走 .love-icon / .love-i-*，不再用 emoji */
@use './styles/love-icons.scss' as *;

/* 全局样式 */
page {
  background-color: var(--love-bg);
}

/**
 * wot 主题变量
 *
 * wot 组件的「主题色」统一写成 `var(--wot-xxx, var(--wot-color-theme, #4d80f0))`：
 * 没人声明 `--wot-color-theme` 时，全部退回 **wot 自己的蓝 #4d80f0** ——
 * 表现就是标签选中态、开关、复选、按钮主色全是蓝的，跟项目主题色无关。
 * 这里全局声明一次默认色，让 wot 组件跟项目默认主题色（恋爱粉 #ee5a92）对齐。
 *
 * ⚠️ 主题色已**固定为恋爱粉 #ee5a92**（2026-10-14 起设置页不再提供「主题颜色」切换，
 *    真源是 stores/user.ts 的 THEME_COLOR）：已接入的页面经 `composables/useThemeVars` 在**页面根节点**
 *    动态下发 `--wot-color-theme`（CSS 变量沿节点树继承，可穿透小程序组件边界），
 *    本条 page 级声明只是**默认色兜底**——覆盖「忘记接入 useThemeVars 的新页面」和 H5 端可能的 teleport 弹层。
 *    所以：新页面仍要接 `useThemeVars`（两行代码，见该文件头注释），否则这页拿不到主题色。
 */
page,
uni-page-body,
:root {
  /** 主题色：与 stores/user.ts 的 THEME_COLOR 手动保持一致（CSS 引用不了 JS 常量） */
  --wot-color-theme: #ee5a92;

  /** 恋爱粉色板：全局只在这里声明，页面一律 var(--love-*) 引用，不再散落 hex */
  --love-bg: #fff5f8;          /* 页面底色：极浅粉 */
  --love-surface: #ffffff;     /* 卡片面 */
  --love-nav: #ffe9f1;         /* 导航栏 / 浅色块 */
  --love-soft: #ffe9f1;        /* 选中态浅底 */
  --love-line: #f7dfe8;        /* 分隔线 */
  --love-ink: #3d2b33;         /* 主文字：暖调深棕 */
  --love-ink-2: #8a7079;       /* 次文字 */
  --love-ink-3: #b79aa5;       /* 弱文字 / 占位 */
  --love-gradient-from: #ffb3cb;
  --love-gradient-to: #dd6ea9;
  /* 辅助色：只给图标底 / 宫格 / 标签用，不参与主题色语义 */
  --love-peach: #ffd9c8;
  --love-lilac: #e6d9ff;
  --love-cream: #ffebc4;
  --love-mint: #d5f0e5;
  --love-sky: #dce9ff;
  --love-shadow: 0 14rpx 40rpx rgba(226, 100, 148, 0.09), 0 2rpx 10rpx rgba(226, 100, 148, 0.05);
  --love-shadow-hero: 0 22rpx 48rpx rgba(226, 92, 148, 0.26);
}

/**
 * 弹层层级：统一用 wot 的 wd-popup，层级由组件自身 :z-index 传（Dialog 9990、
 * UpdateModal 9999），不再需要全局 !important 规则去压 uni-popup 的 99 默认值。
 */

/**
 * 升级弹窗（UpdateModal）的 popup 根背景置透明。
 *
 * ⚠️ 必须写在 App.vue：wd-popup 的根是**子组件**的元素，组件里（哪怕非 scoped 的 style 块）
 *    写的规则会被 uni-app 统一加上 [data-v-xxx]（产物实测 `.wd-popup.upd-popup[data-v-4038aa02]`），
 *    而 popup 根没有父组件的 data-v 属性 → 命中不了，白底去不掉。App.vue 这套样式是全局的、
 *    不带 data-v，才能改到它。
 *
 * 用途：头图（蓝天横幅）上方两角是透明的，popup 根的白底会在圆角外垫出白方块；
 *      白底改由弹窗内部的 .upd-body（头图下方那段）承担。
 *
 * ⚠️ 必须 !important：wot 的产物规则是
 *    `.wd-popup-wrapper[data-v-f2ad800a] .wd-popup { background: #fff }`（特异性 0,3,0），
 *    这条只有 0,2,0，且顺序在它之后也压不过 —— 只能靠 !important。
 */
.wd-popup.upd-popup {
  background: transparent !important;
}

/**
 * iOS 宋体问题
 * 不声明 font-family 时，uni-app 的 WKWebView 默认渲染宋体（Songti SC）而非系统黑体。
 *
 * 字体栈刻意保持极简，只用苹方 + 通用 sans-serif：
 * - 不要用 -apple-system / BlinkMacSystemFont：这俩是 macOS 的字体系列名，
 *   iOS 模拟器上 WKWebView 解析异常，会渲染成乱码。
 * - 不要堆 Microsoft YaHei / Helvetica Neue：iOS 上用不到，徒增匹配失败的环节。
 * - PingFangSC-Regular 是苹方的 PostScript 名，作为 PingFang SC 的兜底
 *   （scss 编译会去掉引号，无空格的名字更稳）。
 *
 * 注：'DingTalk-JinBuTi' / 'Digital-7' 是页面内显式声明的，优先级高于继承，不受这里影响。
 */
page,
body,
uni-page-body {
  font-family: 'PingFang SC', 'PingFangSC-Regular', sans-serif;
}

/**
 * 空格展示
 * vue 页面走 web 渲染，<text> 编译成行内元素 uni-text，默认 white-space: normal
 * 会折叠/裁掉「行首、行尾」的空格（如 sum 的 " k" 后缀、指数行的 " | " 分隔符），
 * 而 RN 的 Text 是 Yoga 排版、空格原样保留——迁移代码里的空格因此全部丢失。
 * 这里统一 pre-wrap 对齐 RN：保留空格与换行。
 * 模板里 text 元素内的换行在编译期已被 whitespace: condense 移除，不会引入多余空行。
 */
uni-text {
  white-space: pre-wrap;
}

/* button / input / textarea 在 iOS 上有 UA 默认字体，不继承父级。
   这里写死同样的字体栈而非 inherit —— uni-input / uni-textarea 在 App 端是原生控件，
   inherit 在它上面解析不稳，直接写死更安全。 */
button,
input,
textarea,
uni-button,
uni-input,
uni-textarea {
  font-family: 'PingFang SC', 'PingFangSC-Regular', sans-serif;
}

/* H5 兼容 pc 所需 */
/* #ifdef H5 */
@media screen and (min-width: 768px) {
  body {
    overflow-y: scroll;
  }
}
/* #endif */

/* App 端默认容器撑满 */
/* #ifdef APP-PLUS */
uni-page-body {
  background-color: var(--love-bg);
  min-height: 100%;
}
/* #endif */
</style>
