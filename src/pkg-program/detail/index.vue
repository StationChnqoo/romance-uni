<!--
  纪录片 - 系列详情（B 站式：内置播放器 + 分集网格）

  - 不展示 series 信息（封面/标题/描述那一套卡片没有），页面焦点就是「播放器 + 分集」。
  - 滚动容器一律 z-paging（:fixed="true" 铺满整屏），**播放器放进 #top 插槽**：
    固定在顶部不随分集列表滚动；分集网格在滚动区。详情接口是一次性全量返回，
    不是分页列表 —— pagingList 恒空、query 里直接 complete([])，否则会一直停在 loading 态。
  - 顶部内置播放器：@/components/VideoPlayer.vue（原生 <video> + 自绘控制栏：
    黑底 + 白图标 + WdSlider seekbar，控制栏排在视频矩形**下方**、不悬浮其上——
    App 端 video 是原生组件层级最高，压在上面的自绘 UI 会被整个盖住，详见该组件头注释）。
    列表页「直接播放」跳 PreviewVideo 播放页，里面复用同一个 VideoPlayer。
  - 播放器交互：播放/暂停、拖动 seek、时长回写全在 VideoPlayer 内部；本页只决定播哪一集
    （切集 = 换 src，组件自己重置播放态/进度/时长）。跳进来默认 autoplay，
    点其它分集切换 src（不强制 autoplay，用户自己点）。
  - 下方分集网格：每集一张预览图（coverUrl）+「第 N 集」+ 标题（2 行省略），
    点任意一集切换播放器源并写 useProgramPlayerStore，列表页/详情页共享高亮。
  - 当前集高亮：命中 playerStore.currentEpisodeId 的格子，预览图描主题色边 + 左上「播放中」角标。
  - 系列 id 来自路由参数 seriesId（必填）；episodeId 可选，不传则默认第一集。
-->
<template>
  <view :style="themeVars" class="program-detail">
    <!-- 滚动容器一律 z-paging：播放器放 #top 插槽（固定在顶部，不随分集列表滚），
         分集网格在滚动区。详情是一次性全量接口，不是分页列表，query 里直接 complete -->
    <z-paging
      ref="pagingRef"
      v-model="pagingList"
      class="program-detail__paging"
      :fixed="true"
      :auto="true"
      :refresher-enabled="false"
      :loading-more-enabled="false"
      hide-empty-view
      @query="queryList"
    >
      <!-- 内置播放器（固定在顶部）：controls 关掉、控制栏自绘，全部在 @/components/VideoPlayer.vue
           （详情页与 PreviewVideo 播放页共用同一套，控制栏排在视频矩形下方，见该组件头注释） -->
      <template #top>
        <view class="program-detail__player">
          <VideoPlayer
            v-if="current && current.m3u8"
            :src="current.m3u8"
            :poster="current.coverUrl ? mediaUrl(current.coverUrl) : ''"
            :title="current.title?.trim() || '未命名期目'"
            video-height="422rpx"
          />

          <view v-else class="program-detail__player-empty">
            <wd-icon name="play-circle" color="#444444" size="80rpx" />
            <text>{{ current ? '该期目没有可播放的地址' : '加载中…' }}</text>
          </view>
        </view>
      </template>

      <!-- 当前集标题（分集信息，不是 series 信息） -->
      <view v-if="current" class="program-detail__now">
        <text class="program-detail__now-title">{{ current.title?.trim() || '未命名期目' }}</text>
      </view>

      <!-- 分集 + 预览图 -->
      <view class="program-detail__episodes">
        <view
          v-for="(ep, i) in episodes"
          :key="ep.id"
          class="program-detail__episode"
          :class="{ 'is-current': isCurrent(ep.id) }"
          hover-class="program-detail__episode_hover"
          @click="onPick(ep)"
        >
          <view class="program-detail__episode-cover">
            <image
              v-if="ep.coverUrl"
              class="program-detail__episode-img"
              :src="mediaUrl(ep.coverUrl)"
              mode="aspectFill"
            />
            <view v-else class="program-detail__episode-placeholder">
              <wd-icon name="play-circle" />
            </view>
            <view v-if="isCurrent(ep.id)" class="program-detail__episode-badge">播放中</view>
            <view class="program-detail__episode-no">第 {{ i + 1 }} 集</view>
          </view>
          <text class="program-detail__episode-title">{{ ep.title?.trim() || '未命名期目' }}</text>
        </view>
      </view>
    </z-paging>
  </view>
  <ToastContainer />
</template>

<script lang="ts" setup>
import ToastContainer from '@/components/ToastContainer.vue'
import VideoPlayer from '@/components/VideoPlayer.vue'
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useProgramPlayerStore } from '@/stores/programPlayer'
import { mediaUrl, toast } from '@/utils'
import { selectProgramSeriesDetail } from '@/api'
import type { ProgramEpisode } from '@/api'
import { useThemeVars } from '@/composables/useThemeVars'

const themeVars = useThemeVars()


const playerStore = useProgramPlayerStore()

/* z-paging 只当滚动容器：播放器在 #top 固定不动，分集网格在滚动区。
   详情接口是一次性全量返回（不是分页），所以列表恒为空、query 里直接 complete，
   否则 z-paging 会一直停在 loading 态。 */
const pagingRef = ref<any>(null)
const pagingList = ref<unknown[]>([])
const queryList = () => {
  pagingRef.value?.complete([])
}

/** 系列 id（路由必填） */
const seriesId = ref('')
/** 该系列全部期目（detail 接口返回） */
const episodes = ref<ProgramEpisode[]>([])
/** 详情页内部当前选中的集 id（同时同步到 playerStore，供列表页回看时高亮） */
const currentId = ref('')

/* 播放器（video + 自绘控制栏）整体在 @/components/VideoPlayer.vue，
   本页只管「播哪一集」；切集由组件内部 watch(src) 重置播放态/进度/时长。 */

/** 当前选中的集对象 */
const current = computed(
  () => episodes.value.find(e => e.id === currentId.value) || null
)
/** 某集是否「当前播放」（与列表页共享同一份 store 状态） */
const isCurrent = (episodeId: string) => episodeId === playerStore.currentEpisodeId

/** 进入页面：拉详情、初始化当前集（onLoad 回调需返回 void，故内部走 async IIFE） */
onLoad((opts?: { seriesId?: string; episodeId?: string }) => {
  void (async () => {
    seriesId.value = opts?.seriesId || ''
    if (!seriesId.value) {
      toast('缺少系列参数')
      return
    }
    try {
      const detail = await selectProgramSeriesDetail(seriesId.value)
      episodes.value = detail?.episodes ?? []
    } catch {
      episodes.value = []
    }
    // 初始选中：传了 episodeId 用它的，否则第一个（与「去详情页播放」带上的 id 对齐）
    const target = opts?.episodeId
      ? episodes.value.find(e => e.id === opts.episodeId)
      : episodes.value[0]
    if (target) {
      currentId.value = target.id
      playerStore.setCurrent(seriesId.value, target.id)
    }
  })()
})

/** 点某集：切换播放器源 + 写 store（列表页/详情页同步高亮） */
const onPick = (ep: ProgramEpisode) => {
  if (!ep?.id) return
  currentId.value = ep.id
  playerStore.setCurrent(seriesId.value, ep.id)
  if (!ep.m3u8) toast('该期目没有可播放的地址')
}
</script>

<style lang="scss" scoped>
.program-detail {
  /* z-paging 用 :fixed="true" 自己铺满整屏（position:fixed，不占文档流），
     这里不需要给高度，只兜背景色 */
  background-color: #fff;

  /* 内置播放器容器：video + 控制栏都在 @/components/VideoPlayer.vue 里（16:9，高度 rpx
     写死、不用 aspect-ratio——Android webview 不认），本页只给黑底兜住视频加载前的空白 */
  &__player {
    width: 100%;
    background-color: #000;
  }
  &__player-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    /* 与 video 等高（422rpx）：player 容器已不写死高度，100% 会塌成 0 */
    height: 422rpx;
    color: #666;
    font-size: 26rpx;

    text {
      margin-top: 16rpx;
    }
  }

  /* 当前集标题（分集信息） */
  &__now {
    padding: 24rpx 24rpx 8rpx;
  }
  &__now-title {
    font-size: 30rpx;
    font-weight: 500;
    color: #333;
    line-height: 1.4;
  }

  /* 分集网格：两列，卡片 = 预览图 + 第N集 + 标题。
     底部留 24rpx：滚动区由 z-paging 铺满整屏，不留白最后一行会贴屏幕底 */
  &__episodes {
    display: flex;
    flex-wrap: wrap;
    padding: 16rpx 16rpx 24rpx;
  }
  &__episode {
    width: 50%;
    box-sizing: border-box;
    padding: 8rpx;
  }
  &__episode_hover {
    opacity: 0.7;
  }
  &__episode-cover {
    position: relative;
    width: 100%;
    height: 191rpx;
    border-radius: 12rpx;
    overflow: hidden;
    background-color: #f5f5f5;
    box-sizing: border-box;
    /* 始终预留 4rpx 边框位：未激活透明、激活主题色，边框宽度恒定 => 切换高亮时盒子尺寸不变，item 不晃动 */
    border: 4rpx solid transparent;

    /* 当前集：主题色描边（只改颜色，不动宽度） */
    .program-detail__episode.is-current & {
      border-color: var(--wot-color-theme, #ee5a92);
    }
  }
  &__episode-img {
    width: 100%;
    height: 100%;
  }
  &__episode-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #cfcfcf;
    font-size: 56rpx;
  }
  &__episode-badge {
    position: absolute;
    left: 0;
    top: 0;
    padding: 4rpx 14rpx;
    border-bottom-right-radius: 12rpx;
    background-color: var(--wot-color-theme, #ee5a92);
    color: #fff;
    font-size: 20rpx;
  }
  &__episode-no {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 4rpx 12rpx;
    border-top-left-radius: 12rpx;
    background-color: rgba(0, 0, 0, 0.45);
    color: #fff;
    font-size: 20rpx;
    line-height: 1.2;
  }
  &__episode-title {
    display: block;
    margin-top: 10rpx;
    font-size: 26rpx;
    color: #333;
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}
</style>
