<!--
  纪录片 - 系列 item（列表页一行 = 一个系列）
  只被 pkg-program/list 引用，故放分包内 components/。

  折叠用 wot 现成组件：外层列表页放 <wd-collapse accordion v-model>，本组件内是
  <wd-collapse-item>（靠 provide/inject 找父级，跨组件一层没问题）——
  展开动画 / 手风琴互斥 / 点击切换都交给 wot，本组件只负责渲染 + 派发。

  - 展开态由 wd-collapse 持有（accordion 下 v-model 是 string = 展开项的 name），
    插槽参数 `{ expanded }` 拿来做箭头旋转，本组件不自己存状态。
  - 期目数据 / 加载态由父级（列表页）传入：按 seriesId 缓存、防重复请求是「列表级」逻辑。
  - 派发：edit（点「编辑」）/ select（点期目，父级直接进详情页播放）；
    展开/收起由 wd-collapse-item 的 header 自动处理。
  - 当前播放的集（来自 useProgramPlayerStore）高亮：命中 currentEpisodeId 的行加 is-current，
    标题走主题色、整行浅主题色底、右侧「播放中」标记 —— 列表页与详情页共享同一份状态。
  - 封面 <image> 走 mediaUrl 编码（中文/空格，Android 才不加载失败）；
    无封面用 wd-icon 占位（字体图标墨迹高度约 0.67em，size 要比盒子小）。
  - 期目有 m3u8 → 主题色播放图标；无 → 灰字「无播放地址」（点它同样派发 play，由父级提示）。
  - 去掉 wot collapse-item 自带的内边距：卡片自己就是整块 header，不留白。
    header / 分隔线都在组件内部，且组件在小程序端是 isolated（:deep 选不进去），
    所以不用 :deep，改在「组件自己的根节点」上用 CSS 变量（custom-style 内联），
    变量沿 DOM 树继承到 header / ::after —— 不跨组件边界，App / H5 / 小程序三端都稳：
      --wot-collapse-header-padding: 0      → header 默认「13px 上下 + 15px 左右」归零；
      --wot-color-border-light: transparent  → 根节点 ::after 与展开时 header ::after 两条半像素线隐形；
      custom-body-style="padding: 0"          → body 内边距（内联，同机制）。
-->
<template>
  <wd-collapse-item
    :name="item.id"
    custom-class="program-item"
    custom-style="--wot-collapse-header-padding: 0; --wot-color-border-light: transparent;"
    custom-body-style="padding: 0;"
  >
    <!-- 标题自绘：整块卡片就是折叠栏的 header（点它展开/收起，wot 自己管）。
         走 #title 插槽而不是 :deep 压 wot 内部 —— 插槽内容带的是本组件的 scope id，
         跨端都能用普通类选择器定制（见 MEMORY.md「改 wot 组件内部样式」）。 -->
    <template #title="{ expanded }">
      <view class="program-item__card" hover-class="program-item__card_hover">
        <view class="program-item__cover">
          <image
            v-if="item.coverUrl"
            class="program-item__cover-img"
            :src="mediaUrl(item.coverUrl)"
            mode="aspectFill"
          />
          <view v-else class="program-item__cover-placeholder">
            <wd-icon name="play-circle" />
          </view>
        </view>
        <view class="program-item__body">
          <view class="program-item__text">
            <text class="program-item__title">{{ item.title?.trim() || '未命名系列' }}</text>
            <text v-if="item.description?.trim()" class="program-item__desc">
              {{ item.description.trim() }}
            </text>
          </view>
          <view class="program-item__info">
            <!-- 左：编辑（阻止冒泡，避免触发折叠栏的展开/收起） -->
            <text class="program-item__edit" :style="{ color: theme }" @click.stop="emit('edit')">
              编辑
            </text>
            <!-- 右：期数 + 展开指示箭头（展开时旋转 180°） -->
            <view class="program-item__right">
              <text class="program-item__meta">{{ item.episodeCount }} 期</text>
              <wd-icon
                name="arrow-down"
                class="program-item__arrow"
                :class="{ 'is-expanded': expanded }"
              />
            </view>
          </view>
        </view>
      </view>
    </template>

    <!-- 展开区：该系列的期目（节目少，直接铺开；点期目播放） -->
    <view class="program-item__episodes">
      <view v-if="!episodes.length" class="program-item__episodes-empty">
        {{ loading ? '加载中…' : '还没有期目' }}
      </view>
      <view
        v-for="(ep, i) in episodes"
        :key="ep.id"
        class="program-item__episode"
        :class="{ 'is-current': isCurrent(ep.id) }"
        :style="isCurrent(ep.id) ? { backgroundColor: currentBg } : {}"
        hover-class="program-item__episode_hover"
        @click="emit('select', ep)"
      >
        <text class="program-item__episode-index">{{ i + 1 }}</text>
        <text
          class="program-item__episode-title"
          :class="{ 'is-current-text': isCurrent(ep.id) }"
        >
          {{ ep.title?.trim() || '未命名期目' }}
        </text>
        <view class="program-item__episode-right">
          <text v-if="isCurrent(ep.id)" class="program-item__episode-playing">播放中</text>
          <wd-icon
            v-if="ep.m3u8"
            name="play-circle"
            class="program-item__episode-play"
            :style="{ color: theme }"
          />
          <text v-else class="program-item__episode-noplay">无播放地址</text>
        </view>
      </view>
    </view>
  </wd-collapse-item>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useProgramPlayerStore } from '@/stores/programPlayer'
import { mediaUrl } from '@/utils'
import type { ProgramEpisode, ProgramSeries } from '@/api'

defineProps<{
  /** 系列数据（列表接口返回，含 episodeCount） */
  item: ProgramSeries
  /** 该系列的期目（父级按 seriesId 缓存后传入） */
  episodes: ProgramEpisode[]
  /** 是否正在拉取期目（展开区显示「加载中…」） */
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'edit'): void
  (e: 'select', ep: ProgramEpisode): void
}>()

const userStore = useUserStore()
/** 主题色：注入「编辑」入口与期目播放图标 */
const theme = computed(() => userStore.theme)

const playerStore = useProgramPlayerStore()
/** 某集是否「当前正在播放」（跨页面共享，列表页与详情页同一份状态） */
const isCurrent = (episodeId: string) => episodeId === playerStore.currentEpisodeId
/** 当前集高亮底色：主题色 8% 叠白（主题色可换，高亮跟着变） */
const currentBg = computed(() => {
  const m = theme.value.replace('#', '')
  const r = parseInt(m.slice(0, 2), 16)
  const g = parseInt(m.slice(2, 4), 16)
  const b = parseInt(m.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, 0.08)`
})
</script>

<style lang="scss" scoped>
.program-item {
  /* wot collapse-item 自带的内边距 / 分隔线在模板里用 CSS 变量从根节点清掉了
     （header padding、body padding、两条 ::after 半像素线），见模板上方注释。
     这里不用 :deep：mp-weixin 端组件是 isolated，父组件样式根本选不进组件内部。 */

  &__card {
    display: flex;
    flex-direction: row;
    background-color: #fff;
    overflow: hidden;
  }
  &__card_hover {
    opacity: 0.8;
  }
  /* 左侧预览图：3:4 小图（宽 150rpx，高 200rpx = 150 * 4/3）。
     不用 aspect-ratio（Android webview 不支持），高度用 rpx 写死。 */
  &__cover {
    width: 150rpx;
    height: 200rpx;
    flex: none;
    background-color: #f5f5f5;
  }
  &__cover-img {
    width: 100%;
    height: 100%;
  }
  &__cover-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #cfcfcf;
    font-size: 64rpx;
  }
  /* 右侧信息区：占满剩余宽度，标题+描述在上、编辑/期数在下 */
  &__body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20rpx 24rpx;
  }
  &__text {
    min-width: 0;
  }
  &__title {
    font-size: 30rpx;
    color: #333;
    font-weight: 500;
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  &__desc {
    display: block;
    font-size: 24rpx;
    color: #999;
    line-height: 1.4;
    margin-top: 8rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  &__info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  /* 「编辑」入口：随主题色。负 margin 把热区往外扩一圈、但不改变行高 */
  &__edit {
    font-size: 26rpx;
    font-weight: 500;
    padding: 6rpx 16rpx;
    margin: -6rpx -16rpx;
  }
  &__right {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &__meta {
    font-size: 24rpx;
    color: #999;
  }
  /* 展开指示箭头：展开时转 180° */
  &__arrow {
    margin-left: 12rpx;
    font-size: 28rpx;
    color: #999;
    transition: transform 0.25s;

    &.is-expanded {
      transform: rotate(180deg);
    }
  }

  /* 展开区：该系列的期目列表 */
  &__episodes {
    background-color: #fff;
    border-top: 1px solid #f0f0f0;
    padding: 0 24rpx 8rpx;
  }
  &__episodes-empty {
    padding: 32rpx 0;
    text-align: center;
    font-size: 26rpx;
    color: #bbb;
  }
  &__episode {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 22rpx 16rpx;
    margin: 0 -16rpx;
    border-bottom: 1px solid #f5f5f5;

    &:last-child {
      border-bottom: none;
    }
    /* 当前播放的集：左侧主题色粗条 + 整行浅主题色底（底色走内联 style，主题色可换） */
    &.is-current {
      border-left: 6rpx solid;
      border-left-color: var(--wot-color-theme, #ee5a92);
      border-radius: 8rpx;
    }
  }
  &__episode_hover {
    opacity: 0.6;
  }
  &__episode-index {
    width: 40rpx;
    flex: none;
    font-size: 24rpx;
    color: #bbb;
  }
  &__episode-title {
    flex: 1;
    min-width: 0;
    margin-right: 16rpx;
    font-size: 28rpx;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &.is-current-text {
      font-weight: 500;
    }
  }
  &__episode-right {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &__episode-playing {
    flex: none;
    margin-right: 12rpx;
    padding: 4rpx 12rpx;
    border-radius: 8rpx;
    font-size: 20rpx;
    color: #fff;
    background-color: var(--wot-color-theme, #ee5a92);
  }
  &__episode-play {
    flex: none;
    font-size: 40rpx;
  }
  &__episode-noplay {
    flex: none;
    font-size: 22rpx;
    color: #ccc;
  }
}
</style>
