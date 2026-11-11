import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import type { Plugin } from 'vite'

/**
 * 小程序（mp-weixin）补丁：直接改写 wot 组件编译后的 wxss。
 *
 * 为什么必须这么做（而不是页面里写样式）：
 * - 微信小程序的**自定义组件默认 styleIsolation: isolated**，wot 组件编译后的 json 里
 *   既没有 styleIsolation 也没有 addGlobalClass（已核实），所以：
 *     · 页面 scoped 的 `:deep(.wd-xxx)` → 编译成普通后代选择器，
 *       与组件自身规则特异性打平、且输在组件 wxss 加载顺序，覆盖静默失效；
 *     · 页面/全局声明的 CSS 变量 → 进不了组件内部，变量读不到，仍走组件默认兜底。
 * - 唯一不依赖任何继承/隔离机制的写法：直接在组件自己的 wxss 上把默认值改掉。
 *
 * ⚠️ 必须同时覆盖 dist/dev 和 dist/build：
 *   `uni -p mp-weixin --watch`（开发，微信开发者工具通常指向这里）输出到 dist/dev/mp-weixin，
 *   `uni build -p mp-weixin` 输出到 dist/build/mp-weixin。
 *   只改一个会出现「构建产物是对的、开发者工具里没变」的假象。
 *
 * App/H5 不走这里：那边是 webview，样式/变量都能正常作用到组件内部，
 * 由 App.vue 的全局变量 + 全局规则对齐，两端结果一致。
 */

const ROOTS = ['dist/dev/mp-weixin', 'dist/build/mp-weixin']
const WOT = 'node-modules/wot-design-uni/components'

interface Patch {
  /** 相对产物的 wxss 路径 */
  rel: string
  /** 要替换的原文（必须与产物里逐字一致） */
  from: string
  /** 替换成 */
  to: string
  /** 日志里显示的名字 */
  label: string
}

/**
 * 目前**没有**需要 patch 的规则。
 *
 * 曾经有一条「wd-tabs 下划线跟随主题色」（把产物里 line 的兜底色 #4d80f0 改成主题色），
 * 2026-10-09 随 wd-tabs 一起下线：相亲列表顶部的 tab 条改成自绘了，src 里已无任何
 * `<wd-tabs>` 引用，组件不会被打进产物，这条补丁成了死代码，故移除。
 *
 * 背景（为什么 wd-tabs 不能当纯头部栏，见 pkg-dating/list/index.vue 末尾注释）：
 * App 端一点相亲就**整个 App 卡死**，logcat 报
 *   `Maximum recursive updates exceeded in component <wd-tabs>`
 * 根因是 wot 的 useChildren.link() 在父组件 render effect 运行期间原地排序 reactive 的
 * children 数组（改自己的依赖）。所以纯头部栏一律自绘，别再引回 wd-tabs。
 *
 * 这套机制留着：以后再要改 wot 组件（wd-xxx）的内部默认值，往下面数组里加一条即可，
 * 比在页面写 :deep / CSS 变量可靠（原因见文件头）。
 */
const PATCHES: Patch[] = []

function patchAll(): void {
  const hit: string[] = []
  for (const root of ROOTS) {
    for (const { rel, from, to, label } of PATCHES) {
      const file = join(process.cwd(), root, rel)
      if (!existsSync(file)) continue
      const source = readFileSync(file, 'utf-8')
      if (!source.includes(from)) continue
      writeFileSync(file, source.replaceAll(from, to))
      hit.push(label)
    }
  }
  if (hit.length > 0) {
    console.log(`[patch-mp-wxss] ${hit.join(' | ')}`)
  }
}

export function patchMpWxss(): Plugin {
  return {
    name: 'patch-mp-wxss',
    apply: (_config, { command }) => command === 'build',
    // 修上一次遗留的产物：dev watch 重启后，上一轮留下的旧值能立刻被清掉
    buildStart() {
      patchAll()
    },
    // 每次构建 / watch 重建写出产物后，再修一遍
    writeBundle() {
      patchAll()
    },
  }
}
