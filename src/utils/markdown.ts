/**
 * Markdown -> 富文本 HTML 渲染（供 `<rich-text :nodes>` 使用）
 *
 * 由 cloud-react-native/src/components/MarkdownPreviewer/markdown.ts 迁移：
 * RN 那边是在 WebView 里 CDN 引 markdown-it + `<style>` 排版；uni 这边改成
 * **本地 markdown-it 渲染 + `<rich-text>` 展示**，不再依赖 CDN 与 WebView。
 *
 * ⚠️ 两个平台约束决定了本文件的写法：
 * 1. **不能靠 class + 页面样式排版**：rich-text 的 nodes 是「一次性快照」，
 *    class 在 mp-weixin 端能不能被外部 wxss 命中全看运气（它渲染出来的不是普通
 *    view，外部样式进不去），uni 官方示例（hello-uniapp）里也是一律内联 style。
 *    所以这里把 markdown-it 渲染出的标签逐个改成「内联 style」版本。
 * 2. **节点内联 style 里用 px，不用 rpx**：节点 style 走各端原生解析，rpx 表现
 *    不一致（uni 官方示例同样用 px）。为保证与页面里的 rpx 视觉一致，按屏幕宽把
 *    设计稿的 750rpx 折算成 px。
 *
 * markdown-it 是纯 JS（entities / linkify-it / mdurl / punycode / uc.micro；
 * argparse 只在它的 CLI 入口里用，库代码不引），不碰 BOM 全局，小程序与 App 裸 V8
 * 都能跑（与 nanoid 那类坑无关）。
 * `html: false` 会转义原文里的 HTML，`validateLink` 默认拦 javascript: 之类的协议。
 */
import MarkdownIt from 'markdown-it'
import { getWindowWidth, mediaUrl } from '@/utils'

/** rpx -> px：rich-text 节点内联样式只认 px（见文件头第 2 条） */
let pxPerRpx = 0
const rpx = (n: number) => {
  if (!pxPerRpx) pxPerRpx = getWindowWidth() / 750
  return Math.round(n * pxPerRpx * 100) / 100
}

interface MdStyles {
  [tag: string]: string
}

/** 首次渲染时才算样式：模块加载期拿屏幕宽不稳 */
let styles: MdStyles | null = null

/** 只出数值，单位由各条样式自己拼（这些字符串是给内联 style 用的） */
const buildStyles = (): MdStyles => {
  const size = (n: number) => `${rpx(n)}`
  return {
    h1: `font-size:${size(40)}px;font-weight:500;color:#222;margin:${size(24)}px 0 ${size(12)}px;`,
    h2: `font-size:${size(36)}px;font-weight:500;color:#222;margin:${size(24)}px 0 ${size(12)}px;`,
    h3: `font-size:${size(32)}px;font-weight:500;color:#222;margin:${size(20)}px 0 ${size(10)}px;`,
    h4: `font-size:${size(30)}px;font-weight:500;color:#222;margin:${size(20)}px 0 ${size(10)}px;`,
    h5: `font-size:${size(28)}px;font-weight:500;color:#222;margin:${size(16)}px 0 ${size(8)}px;`,
    h6: `font-size:${size(28)}px;font-weight:500;color:#222;margin:${size(16)}px 0 ${size(8)}px;`,
    p: `color:#333;font-size:${size(28)}px;margin:0 0 ${size(16)}px;`,
    ul: `margin:0 0 ${size(16)}px;padding-left:${size(36)}px;`,
    ol: `margin:0 0 ${size(16)}px;padding-left:${size(36)}px;`,
    li: `color:#333;font-size:${size(28)}px;margin:${size(4)}px 0;`,
    blockquote: `margin:0 0 ${size(16)}px;padding:${size(4)}px 0 ${size(4)}px ${size(16)}px;border-left:3px solid #dfe6ef;color:#666;`,
    pre: `margin:0 0 ${size(16)}px;padding:${size(12)}px ${size(16)}px;background-color:#f4f4f5;border-radius:8px;font-size:${size(26)}px;color:#333;white-space:pre-wrap;`,
    code: `font-family:monospace;background-color:#f4f4f5;border-radius:4px;padding:${size(2)}px ${size(6)}px;font-size:${size(26)}px;color:#333;`,
    preCode: `font-family:monospace;background-color:transparent;padding:0;font-size:${size(26)}px;color:#333;`,
    table: `width:100%;margin:0 0 ${size(16)}px;font-size:${size(26)}px;border-collapse:collapse;`,
    th: `border:1px solid #e5e7eb;padding:${size(8)}px ${size(10)}px;text-align:left;font-weight:500;background-color:#f7f7f8;color:#333;`,
    td: `border:1px solid #e5e7eb;padding:${size(8)}px ${size(10)}px;text-align:left;color:#333;`,
    hr: `border:none;border-top:1px solid #e5e7eb;margin:${size(16)}px 0;`,
    // rich-text 屏蔽节点事件，小程序端点不了链接，这里只保证看得见（App-vue 可点）
    a: `color:#1a73e8;text-decoration:none;font-size:${size(28)}px;`,
    img: `max-width:100%;border-radius:8px;`,
    // 粗体统一 500 权重（与 RN 的 strong/b/th 处理一致，中文 700 太糊）
    strong: `font-weight:500;`
  }
}

const getStyles = (): MdStyles => {
  if (!styles) styles = buildStyles()
  return styles
}

/** 参数与 RN 的 WebView 版保持一致 */
const md = new MarkdownIt({html: false, linkify: true, breaks: true, typographer: true})

/*
 * 渲染规则改写：只改「开标签」，闭标签仍走 markdown-it 默认渲染（tag 名没变）。
 * 内联代码 / 代码块 / 图片 / 链接需要带内容的，整条规则重写。
 *
 * ⚠️ 每条规则都要先判 `tokens[idx].hidden`：紧凑列表（没有空行的列表）里 markdown-it
 * 会把 paragraph 的 open/close 标成 hidden 来去掉 `<p>` 壳，只看 tag 名不看 hidden
 * 就会渲染出没有 `</p>` 的残缺标签（rich-text 直接把它连子树一起丢掉）。
 */
const styledOpen = (tag: string, styleKey: string) => (tokens: MarkdownIt.Token[], idx: number) =>
  tokens[idx].hidden ? '' : `<${tag} style="${getStyles()[styleKey]}">\n`

md.renderer.rules.heading_open = (tokens, idx) => {
  const level = Number(tokens[idx].tag.slice(1)) || 6
  return tokens[idx].hidden ? '' : `<h${level} style="${getStyles()['h' + level]}">`
}
md.renderer.rules.paragraph_open = styledOpen('p', 'p')
md.renderer.rules.bullet_list_open = styledOpen('ul', 'ul')
md.renderer.rules.ordered_list_open = styledOpen('ol', 'ol')
md.renderer.rules.list_item_open = styledOpen('li', 'li')
md.renderer.rules.blockquote_open = styledOpen('blockquote', 'blockquote')
md.renderer.rules.table_open = styledOpen('table', 'table')
md.renderer.rules.hr = () => `<hr style="${getStyles().hr}">\n`
md.renderer.rules.th_open = styledOpen('th', 'th')
md.renderer.rules.td_open = styledOpen('td', 'td')
md.renderer.rules.code_inline = (tokens, idx) =>
  `<code style="${getStyles().code}">${md.utils.escapeHtml(tokens[idx].content)}</code>`
md.renderer.rules.fence = (tokens, idx) =>
  `<pre style="${getStyles().pre}"><code style="${getStyles().preCode}">` +
  `${md.utils.escapeHtml(tokens[idx].content)}</code></pre>\n`
md.renderer.rules.image = (tokens, idx) => {
  const src = tokens[idx].attrGet('src') || ''
  const alt = tokens[idx].content || ''
  // 图片 URL 过一遍 mediaUrl：URL 里的中文/空格在 Android 原生层会加载失败
  return `<img src="${md.utils.escapeHtml(mediaUrl(src))}" alt="${md.utils.escapeHtml(alt)}" style="${getStyles().img}" />`
}
md.renderer.rules.link_open = (tokens, idx) =>
  `<a href="${md.utils.escapeHtml(tokens[idx].attrGet('href') || '')}" style="${getStyles().a}">`
md.renderer.rules.strong_open = () => `<strong style="${getStyles().strong}">`

/**
 * Markdown -> 富文本 HTML（内联样式版），直接喂 `<rich-text :nodes="html" />`。
 *
 * 纯文本也能直接用：`breaks: true` 会把换行转成 `<br>`，跟原来的 `<text>` 观感一致。
 */
export const renderMarkdownHtml = (source: string) => md.render(source || '')
