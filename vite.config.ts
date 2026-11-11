import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { patchMpWxss } from './vite-plugin-mp-wxss'
import { resolve } from 'path'
import { copyFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

/**
 * ★ 关掉 uni 的 sourcemap 外链（dist/dev/.sourcemap/* + 各 JS 末尾的 //# sourceMappingURL）。
 *
 * 微信开发者工具的 getAutoVersionBundledJSFiles 会去拼接这些 .map，
 * 遇到映射索引越界就抛 `No element indexed by N`，导致 appservice 起不来 → 白屏。
 * （实测加了 @qiun/ucharts 后多一个大 sourcemap，正好触发该索引越界。）
 *
 * 注：下面 build.sourcemap:false 只关「内联 base64 sourcemap」，关不掉这套外链——
 * uni 的 withSourcemap 在 build.sourcemap 为假时故意「不设」UNI_APP_SOURCEMAP
 * （mp 端 dev 也是 build 模式，不能简单置 false），于是 enableSourceMap() 走 dev 默认值 true。
 * 唯一能关掉的办法是显式把 UNI_APP_SOURCEMAP 置 'false'，enableSourceMap() 才返回 false。
 * 想临时开 sourcemap 调试（console 定位 .vue 源码）就把下一行注释掉再重启 watch。
 */
process.env.UNI_APP_SOURCEMAP = 'false'

export default defineConfig({
  plugins: [
    uni(),
    patchMpWxss(),
  ],
  build: {
    /**
     * ⚠️ 恒定 false，不要改回 inline。
     *
     * 曾经为了「console 能定位到 .vue 源文件」而把 dev 模式的 sourcemap 设成 'inline'
     * （绕过微信开发者工具 appservice 虚拟服务对 .map 相对路径的解析异常）。
     * 但 inline 会把 sourcemap 以 base64 塞进每个 JS 文件末尾 —— 实测 dev 的
     * `common/vendor.js` 从 358KB 涨到 2.70MB（86% 是 sourcemap），
     * 导致开发者工具「代码包分析」里主包显示 4.49MB 虚高（production 真实主包只有 769KB）。
     * 2026-10-04 改回 false：dev 产物体积恢复正常，代价是 dev 阶段 console 定位不到 .vue 源码。
     * 真要调源码可临时把这里改回 'inline' 再重启 watch，调完改回来。
     */
    sourcemap: false,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        /**
         * 静默 Dart Sass 的弃用警告。
         * 来源全是 node_modules/wot-design-uni 内部的 .scss（如 _function.scss 用全局 nth()），
         * 我们改不了第三方库源码，只能按需静默对应 id。
         * 以后再冒出别的 DEPRECATION WARNING，把方括号里的 id（如 [mixed-decls]）加进这个数组即可。
         */
        silenceDeprecations: ['legacy-js-api', 'import'],
      },
    },
  },
});