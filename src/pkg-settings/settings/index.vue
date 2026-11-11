<template>
  <!--
    设置页（独立分包 pkg-settings）：统一收拢零散设置项。
    2026-10-29：行情数据源（场内ETF / 标准指数）切换已删——配置里只留 etfMsnId 一套口径，
    marketStore.msnIdField 一并移除，本页不再有该项。

    wd-radio-group 交互形态（2026-10-11 用户指定）：**单选**，`shape="dot"` 经典圆形单选，
    两个选项同行排布。
    - `inline` 是必须的：`wd-radio` 根节点是 `display:flex; justify-content:space-between` 的**块级**
      flex 容器，不加 `inline` 时每个选项独占一整行 → 竖排。加了才走 wot 的 `is-inline` 样式
      （`display:inline-block` + 圆点 `float:left` + `margin-right:10px`），圆点回到文字左侧。
    - group 自身 `font-size:0`，行内块之间的空白字符不会撑出额外间隙。
    - 选中色 `$-radio-checked-color` → `$-checkbox-checked-color` → `$-color-theme`
      → 即 App.vue 声明的 `--wot-color-theme`（项目主题色），也不用传 checkedColor。

    滚动容器一律走 z-paging（项目约定）：本页是原生导航栏（navigationStyle: default），
    webview 起点就在导航栏下方，所以 z-paging 用 :fixed="true" 直接占满可视区、不会被遮挡；
    内容不足一屏则不可滚，正好满足「静态单屏设置页」。
    关掉 refresher / loading-more / empty-view：本页不调接口、无列表、无需下拉刷新与上拉加载。
  -->
  <z-paging
    class="settings"
    :style="themeVars"
    :fixed="true"
    :auto="false"
    :refresher-enabled="false"
    :loading-more-enabled="false"
    :hide-empty-view="true"
  >
    <view class="settings__group">
      <text class="settings__label">Webview 打开方式</text>
      <wd-radio-group v-model="userStore.webviewOpenMode" shape="dot" inline>
        <wd-radio value="app">App 内打开</wd-radio>
        <wd-radio value="browser">默认浏览器打开</wd-radio>
      </wd-radio-group>
      <text class="settings__hint"
        >资讯、行情等网页的打开方式：应用内网页视图，或直接跳转系统默认浏览器。修改后自动保存。</text
      >
    </view>

    <!-- 检测升级：原首页用户条「检测更新」圆钮的功能移到这里（2026-10-11）。
         详情页 onMounted 自动触发检查并展示本机/服务端版本信息，非 App 平台页内 toast 提示不支持。 -->
    <view class="settings__divider" />
    <view class="settings__group">
      <view class="settings__cell" @click="onCheckUpdate">
        <text class="settings__cell-label">检测升级</text>
        <!-- 箭头不传 size/color：内联样式里的 rpx 在 H5/App 不生效，走容器 font-size 继承 -->
        <wd-icon name="arrow-right" />
      </view>
    </view>
  </z-paging>
</template>

<script lang="ts" setup>
import { useThemeVars } from '@/composables/useThemeVars'
import { Router } from '@/common/router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const themeVars = useThemeVars()

/** 检测升级：跳 codepush 详情页（页内 onMounted 自动检查） */
const onCheckUpdate = () => {
  Router.navigate('CodepushCheck')
}
</script>

<style lang="scss" scoped>
.settings {
  /* z-paging 根（fixed 模式占满可视区），灰底由这里铺满；内容不足一屏不可滚。 */
  background-color: #f0f0f0;

  &__group {
    background-color: #fff;
    padding: 0 30rpx;
    /* 两组贴合成一张卡，分隔靠模板里的 __divider（不再留灰缝） */
  }
  &__divider {
    height: 1rpx;
    background-color: #ececec;
  }
  &__label {
    display: block;
    padding: 24rpx 0 20rpx;
    color: #333;
    font-size: 30rpx;
    font-weight: 500;
  }
  &__hint {
    display: block;
    padding: 24rpx 0 24rpx;
    color: #999;
    font-size: 24rpx;
  }
  /* 单行入口 cell（检测升级）：字号给在容器上由 wd-icon 继承（内联 rpx 在 H5/App 不生效） */
  &__cell {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 24rpx 0;
    font-size: 32rpx;
  }
  &__cell-label {
    color: #333;
    font-size: 30rpx;
    font-weight: 500;
  }
}
</style>
