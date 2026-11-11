/**
 * 用户与全局设置 store
 * 由 stores/caches.ts（Options 写法）拆分重构而来，对应 RN zustand 的
 * user / token / password / theme / showSecret。
 *
 * Vue3 setup 写法：ref + computed，直接返回；更新一律直接赋值
 * （userStore.token = 'xxx'），不再提供 setXxx action。
 * 持久化：整包 persist（不配 paths），storage 用 uniStorage。
 */
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { createUser } from '@/types/common'
import type { User } from '@/types/common'
import { cloneDeep } from '@/utils'
import { uniStorage } from '@/storage/uniStorage'

export type SecretSettingKey = 'mediaVisible'

export type SecretSettingsState = Record<SecretSettingKey, boolean>

export const DEFAULT_SECRET_SETTINGS: SecretSettingsState = {
  mediaVisible: false
}

/**
 * 项目主题色：恋爱粉（#ee5a92，玫瑰粉调，明快但不荧光，白字对比可读）。
 *
 * ★ **色值的唯一源头就是这里**。其它任何地方都不许再写死 hex：
 *   - 组件里要主题色 → `import { THEME_COLOR } from '@/stores/user'` 当默认值
 *     （`components/Tag.vue` 的 theme 默认值、`pkg-duole/baohuang/components/Person.vue` 的 prop 默认值）；
 *   - 页面里要主题色 → `const theme = computed(() => userStore.theme)` 再内联 `:custom-style`
 *     （`pages/login` 的登录按钮、各页按钮/选中态都这么走）；
 *   - `pkg-misc/webviewer/index.vue` 的进度条颜色直接引本常量。
 *   唯一例外：`App.vue` 的 `--wot-color-theme`（CSS 引用不了 JS 常量），那里是**默认色兜底**
 *   （设置页可切换主题后，页面根节点经 `useThemeVars` 动态下发，兜底只覆盖「没接入的页面」）。
 * ⚠️ 粉色与行情模块「涨=红」(#f20c00) 色相接近：行情涨跌幅一律保留自己的独立红色，
 *    不许用主题色去染涨跌数字；主题色只管按钮 / 选中态 / 进度条等交互元素。
 */
export const THEME_COLOR = '#ee5a92'

/** 「Webview 打开方式」：app = 应用内 <web-view>（Webviewer 页）；browser = 系统默认浏览器 */
export type WebviewOpenMode = 'app' | 'browser'

/** 默认 App 内打开（保持既有行为） */
export const DEFAULT_WEBVIEW_OPEN_MODE: WebviewOpenMode = 'app'

/** 合法值清单，afterRestore 校验用 */
export const WEBVIEW_OPEN_MODE_OPTIONS: WebviewOpenMode[] = ['app', 'browser']

export const useUserStore = defineStore(
  'useUserStore',
  () => {
    const password = ref('123456')
    const user = ref(createUser() as User)
    const token = ref('')
    /** 主题色：见文件顶部 THEME_COLOR */
    const theme = ref(THEME_COLOR)
    const secretSettings = ref(
      cloneDeep(DEFAULT_SECRET_SETTINGS) as SecretSettingsState
    )
    const showSecret = ref(false)
    /** Webview 打开方式：见文件顶部 WebviewOpenMode */
    const webviewOpenMode = ref<WebviewOpenMode>(DEFAULT_WEBVIEW_OPEN_MODE)

    const mediaVisible = computed(() => !!secretSettings.value.mediaVisible)

    return {
      password,
      user,
      token,
      theme,
      secretSettings,
      showSecret,
      mediaVisible,
      webviewOpenMode
    }
  },
  {
      persist: {
        storage: uniStorage,
        /**
         * theme：主题色已**不再让用户切换**（设置页的「主题颜色」选项已删），
         * 恢复时一律固定为代码默认色 THEME_COLOR，避免旧版本存过的其它色值/脏数据把主题带偏。
         *
         * webviewOpenMode 校验：旧数据/脏值一律拽回默认（App 内打开）。
         */
        afterRestore: ({ store }) => {
          const s = store as unknown as { theme: string; webviewOpenMode: string }
          s.theme = THEME_COLOR
          if (!WEBVIEW_OPEN_MODE_OPTIONS.includes(s.webviewOpenMode as WebviewOpenMode)) {
            s.webviewOpenMode = DEFAULT_WEBVIEW_OPEN_MODE
          }
        }
      }
  }
)
