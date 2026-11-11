<template>
  <view :style="themeVars" class="wallets">
    <WalletList ref="listRef" fixed :disabled="false" :show-add="true" />
  </view>
  <ToastContainer />
</template>

<script lang="ts" setup>
/**
 * 钱包列表（独立页面）
 * 由 cloud-react-native/src/screens/Wallets/index.tsx 迁移。
 *
 * - RN 里该组件同时被 Data Tab 内嵌、也作为独立 Screen 使用，
 *   独立使用时 onWalletPress 为空，点击走 Router.navigate('WalletDetail')。
 *   这里复用同一个 WalletList 组件，不传 on-wallet-press 即走内部路由。
 * - 标题栏用 uni-app 原生导航栏（pages.json 的 navigationBarTitleText），
 *   因此不再迁移 RN 版的自定义 ToolBar，页面内也没有状态栏占位。
 * - 分页、下拉刷新、上拉加载全部由列表内的 z-paging 负责（fixed 全屏模式），
 *   因此本页不注册 onPullDownRefresh / onReachBottom，pages.json 里也没开
 *   enablePullDownRefresh —— 两套刷新同时存在会互相打架。
 * - 首次进入由 z-paging 的 auto 自动加载；onShow 只负责「从详情页返回后刷新」，
 *   用 inited 跳过第一次，避免与 auto 重复请求。
 */
import ToastContainer from '@/components/ToastContainer.vue'
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import WalletList from '@/pkg-wallet/components/WalletList.vue'
import { Router } from '@/common/router'
import { useUserStore } from '@/stores/user'
import { toast } from '@/utils'
import { useThemeVars } from '@/composables/useThemeVars'

const themeVars = useThemeVars()


const userStore = useUserStore()

/** 子组件通过 defineExpose 暴露 reload */
const listRef = ref<any>(null)

/** 首次 onShow 与 z-paging 的 auto 加载重合，跳过以免重复请求 */
let inited = false

const checkLogin = () => {
  if (userStore.token) {
    return
  }
  toast('请登录后使用')
  Router.goLogin('Data')
}

onLoad(() => {
  checkLogin()
})

onShow(() => {
  checkLogin()
  if (inited) {
    listRef.value?.reload?.()
  }
  inited = true
})
</script>

<style lang="scss" scoped>
.wallets {
  height: 100vh;
  background-color: #f1f2f3;
}
</style>
