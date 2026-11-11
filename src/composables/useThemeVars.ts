/**
 * 页面根节点主题变量下发。
 *
 * 背景：wot 组件的主题色兜底链是 `var(--wot-xxx, var(--wot-color-theme, #4d80f0))`。
 * `App.vue` 在 page 级**静态**声明了 `--wot-color-theme`（默认色兜底），而小程序/App 端
 * 没有动态改 page 级 CSS 变量的手段 → 想让设置页切换主题后**所有页面即时生效**，
 * 只能在每个页面的根节点上绑定这个变量（CSS 自定义属性沿节点树继承，
 * 能穿透小程序自定义组件的 styleIsolation——App.vue 的 page 级声明能被
 * isolated 的 wot 组件吃到，就是同一机制的被验证先例）。
 *
 * 用法（每个页面的根节点）：
 * ```vue
 * <view class="xxx" :style="themeVars">
 * ```
 * ```ts
 * import { useThemeVars } from '@/composables/useThemeVars'
 * const themeVars = useThemeVars()
 * ```
 *
 * 新增页面**务必接入**（两行代码）；忘了接的页面会退回 App.vue 的默认色兜底，
 * 表现为「别的页都变色了、这页还是老的」。
 *
 * 响应式：computed 依赖 userStore.theme（pinia + persist），设置页切色后
 * 返回栈里的页面（变量绑定是响应式的）也会即时更新，无需重进。
 */
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

export function useThemeVars() {
  const userStore = useUserStore()
  return computed(() => ({ '--wot-color-theme': userStore.theme }))
}
