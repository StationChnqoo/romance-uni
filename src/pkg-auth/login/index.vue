<template>
  <!--
    双根模板（LoginPage + ToastContainer）：Vue3 多根节点不吃 attrs 透传，
    主题变量只能两个根各绑一份（ToastContainer 是弹窗容器，Dialog 内按钮主色也要跟随）。
  -->
  <LoginPage :style="themeVars" />
  <ToastContainer :style="themeVars" />
</template>

<script lang="ts" setup>
import { useThemeVars } from '@/composables/useThemeVars'

import ToastContainer from '@/components/ToastContainer.vue'
import LoginPage from '@/pages/login/index.vue'

const themeVars = useThemeVars()
</script>