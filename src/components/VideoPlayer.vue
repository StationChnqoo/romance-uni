<!--
  自绘视频播放器：原生 <video>（controls 关掉）+ 自绘控制栏

  - 控制栏 = 半透明黑底 + 白色 icon（播放/暂停）+ 白字时长 + WdSlider 进度条。
    wot wd-slider 用项目移植版 @/components/WdSlider.vue（原版在 Vue 3.2.47 下编译不过）。
  - ★ 控制栏必须排在 video 矩形**下方**（上下排，不悬浮其上）：
    App 端（android/iOS）的 <video> 是原生组件（ijkplayer），层级最高，普通 view 无论
    z-index 设多少都会被整个盖住（官方口径：同层渲染只有微信基础库 2.4.4+/app-nvue，
    app-vue 没有）；app-vue 的 cover-view 又不支持嵌套、只支持 click，WdSlider 的
    touchmove 拖动放不进去。微信小程序有同层渲染，同一套代码照样正常。
  - ★ icon 的 color/size 必须走 props（内联），不能靠父页面 scoped 嵌套 .wd-icon：
    scoped 进不了子组件根节点，颜色丢了就是黑 icon 压黑底 =「icon 没显示」。
  - ★ 时长只能从这个 @timeupdate 的 detail.duration 补：App 端不支持 @loadedmetadata
    （官方事件表只列微信/H5/抖音/京东），只靠 loadedmetadata 的话 duration 永远 0，
    连锁出「时长 00:00 + slider 永久 disabled（把手隐藏，只剩一条细线，看着不像 seekbar）
    + togglePlay 被时长门槛拦掉（暂停键点了没反应）」。
  - 每个实例的 video id 用 nanoid 生成：uni.createVideoContext 按 id 找节点，
    详情页和视频播放页可能各挂一个，写死 id 会互相串。
  - stop() 供外部显式调（播放页 onUnload）：只靠节点卸载，App 端声音会继续在后台放。
  - 高度两种用法（video 一律走**明确高度**，绝不靠 flex 撑）：
    ① 默认（详情页 video-height=422rpx）：按传入值定高，容器 height auto 也不塌。
    ② `fill`（整页播放页 pkg-misc/preview-video）：`height: calc(100vh - 8vw)`，
       即「视口高 − 控制栏 60rpx（= 8vw）」，与父容器 height:100vh 同源。
    ★★ 为什么不能用 flex 撑（2026-10-25 只有声音没画面案）：试过
       `flex:1 1 0` + 不设 height，结果是 video 计算高度 0 → **App 端原生层
       拿不到尺寸就不绘制画面**（声音照常输出、控制栏被顶到最上面，页面下方剩一片黑）。
       原生 video 只认明确高度，flex 的 used value 不会同步给原生层。
    ★★ 为什么不能用 windowHeight 算（同日第二案）：`uni.getSystemInfoSync().windowHeight`
       在 App 端比页面可视区大（含原生导航栏），拿它算出来的 video 高 + 控制栏会超出
       100vh 容器 → **整页能往下滚**。100vh 与父容器同源，才不会多算标题栏。
-->
<template>
  <view class="video-player">
    <video
      v-if="src"
      :id="videoId"
      class="video-player__video"
      :style="{ height: videoStyleHeight }"
      :src="src"
      :poster="poster"
      :title="title"
      :controls="false"
      :disable-picture-in-picture="false"
      :enable-progress-gesture="false"
      play-btn-position="center"
      :autoplay="autoplay"
      @play="playing = true"
      @pause="playing = false"
      @ended="playing = false"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
    />

    <!-- 自绘控制栏：紧贴视频矩形下方（不能悬浮视频上，见文件头）。
         顺序：播放键 → 进度条 → 时长（时长靠右） -->
    <view v-if="src" class="video-player__controls">
      <view class="video-player__btn" @click="togglePlay">
        <wd-icon :name="playing ? 'pause' : 'play'" color="#ffffff" size="64rpx" />
      </view>
      <!-- ★ 刻意用 PascalCase 标签：easycom 的 ^wd-(.*) 只拦 kebab 的 wd- 前缀，
           PascalCase 不会误命中 node_modules 里的原版 wd-slider（本项目编译不过）。
           ★ 尺寸（flex:1）走 custom-style 内联：父层 scoped 的 flex:1 进不了子组件根节点，
           丢了就是「轨道 0 宽 → 把手压住时长 + 拖不动」 -->
      <WdSlider
        :model-value="currentTime"
        :min="0"
        :max="duration || 100"
        :step="1"
        :disabled="!duration"
        active-color="#ffffff"
        inactive-color="rgba(255,255,255,0.3)"
        custom-style="flex:1;min-width:0;--wot-slider-handle-bg:#ffffff;--wot-slider-handle-radius:6px;--wot-slider-axie-bg:rgba(0,0,0,0.45);--wot-slider-axie-height:3px"
        @dragstart="onSeekStart"
        @update:modelValue="onSeekMove"
        @dragend="onSeekEnd"
      />
      <text class="video-player__time">{{ currentTimeText }} / {{ durationText }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, ref, watch } from 'vue'
import WdSlider from '@/components/WdSlider.vue'
import { nanoid } from '@/utils'

const props = defineProps({
  /** 播放地址（m3u8 / mp4）；变了就重置播放态/进度/时长 */
  src: { type: String, default: '' },
  poster: { type: String, default: '' },
  title: { type: String, default: '' },
  /** 加载完自动播 */
  autoplay: { type: Boolean, default: true },
  /** 视频区高度：写死 rpx，不用 aspect-ratio（Android webview 不认） */
  videoHeight: { type: String, default: '420rpx' },
  /**
   * 撑满整屏（整页播放页用）：忽略 videoHeight，改用
   * `calc(100vh - 8vw)`（视口高 − 控制栏）当 video 高度（见文件头）。
   */
  fill: { type: Boolean, default: false }
})

/** 每个实例一个唯一 id（前缀保证不以数字开头） */
const videoId = `video-player-${nanoid(8)}`

/**
 * 控制栏高度（rpx），必须与下方 wxss 的 .video-player__controls 保持一致。
 * 750rpx == 100vw，所以 60rpx 等价于 8vw；用 vw 而不是 rpx，是为了放进 calc 时
 * 不必依赖 rpx 的编译/运行时换算，纯 CSS 就能算出准确的 px。
 */
const CONTROLS_VW = 8

/**
 * fill 模式：video 高 = 视口高 − 控制栏。
 * ★ 写成 calc(100vh - 8vw) 而不是减 windowHeight：App 端 windowHeight 比页面可视区
 *   大（含原生导航栏），减出来的高度会让「video + 控制栏」超出父容器 100vh → 整页能滚
 *   （2026-10-25 报障）。100vh 和父容器 height 同源，算出来必然严丝合缝。
 * ★ 也不能交给 flex：原生 video 拿不到 flex 的 used value → 0 高，只有声音没画面。
 */
const fillHeight = `calc(100vh - ${CONTROLS_VW}vw)`

/** video 最终高度：fill 用「视口高 − 控制栏」，否则用外部传入的 videoHeight */
const videoStyleHeight = computed(() => (props.fill ? fillHeight : props.videoHeight))

/** 是否正在播放（靠 video 的 @play/@pause 驱动，不自己猜） */
const playing = ref(false)
/** 当前播放进度（秒） */
const currentTime = ref(0)
/** 视频总时长（秒）：微信/H5 走 @loadedmetadata，App 端靠 @timeupdate 补 */
const duration = ref(0)
/** 是否正在拖进度条：拖的过程中不让 timeupdate 回写，两边会打架 */
const seeking = ref(false)

const { proxy } = getCurrentInstance()!
let videoCtx: ReturnType<typeof uni.createVideoContext> | null = null
/** video 上下文懒创建：createVideoContext 要等 video 节点渲染出来才有意义 */
const getVideoCtx = () => {
  if (!videoCtx) videoCtx = uni.createVideoContext(videoId, proxy)
  return videoCtx
}

/**
 * uni <video> 的事件 detail。
 * @dcloudio/types 没给 video 组件的事件类型，模板里 @timeupdate 等会被推断成 (payload: Event)，
 * 这里自行收敛（App 端契约见 html5plus 的 video 事件文档：{currentTime, duration}，单位秒）。
 */
interface VideoEventDetail {
  currentTime?: number
  duration?: number
}
const detailOf = (e: Event): VideoEventDetail =>
  (e as unknown as { detail?: VideoEventDetail }).detail || {}

const onTimeUpdate = (e: Event) => {
  if (seeking.value) return
  const { currentTime: t, duration: d } = detailOf(e)
  if (typeof t === 'number') currentTime.value = t
  /* ★ App 端（android/iOS）不支持 @loadedmetadata，时长只能在这里补；
     d 不变时跳过，别每 250ms 写一次 ref */
  if (Number.isFinite(d) && (d as number) > 0 && d !== duration.value) duration.value = d as number
}

/** 仅微信/H5 等平台触发；App 端拿不到，时长靠 onTimeUpdate 补（见上） */
const onLoadedMetadata = (e: Event) => {
  const { duration: d } = detailOf(e)
  if (typeof d === 'number') duration.value = d
}

const togglePlay = () => {
  /* play/pause 跟时长无关，不能拿 duration 当前置条件：App 端 duration 靠 @timeupdate
     补、来得晚，带门槛会把点击全拦掉 */
  if (playing.value) getVideoCtx().pause()
  else getVideoCtx().play()
}

/** 开始拖进度条：屏蔽 timeupdate 回写 */
const onSeekStart = () => {
  seeking.value = true
}
/** 拖动过程中：只更新时间文案（进度条位置由 WdSlider 内部状态自己画） */
const onSeekMove = (value: number) => {
  currentTime.value = value
}
/** 松手：跳转 */
const onSeekEnd = (value: number) => {
  seeking.value = false
  getVideoCtx().seek(value)
}

/** 秒 → mm:ss（超过 1 小时退化成 h:mm:ss） */
const fmtTime = (sec: number): string => {
  const total = Math.max(0, Math.floor(sec || 0))
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  const mm = String(m).padStart(2, '0')
  const ss = String(s).padStart(2, '0')
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`
}
const currentTimeText = computed(() => fmtTime(currentTime.value))
const durationText = computed(() => fmtTime(duration.value))

/** 换源：播放态/进度/时长全部作废，等新视频的 @play/@timeupdate 重建。
    顺手丢掉缓存的 video 上下文：src 置空时 video 节点会卸载重建（弹窗关闭即如此），
    旧上下文指向的可能是已经销毁的节点。 */
watch(
  () => props.src,
  () => {
    videoCtx = null
    playing.value = false
    currentTime.value = 0
    duration.value = 0
    seeking.value = false
  }
)

/**
 * 停止播放并复位。
 * ★ 弹窗关闭时必须显式调：wd-popup 只卸载节点，App 端原生播放器未必跟着停，
 * 表现为「弹窗关了声音还在后台放」。
 * 用 pause + seek(0) 而不是 ctx.stop()：API 里确实有 stop()，但 @dcloudio/types 的
 * VideoContext 没声明它（只有 pause/play/seek/sendDanmu/playbackRate/全屏那几个），
 * 这两个组合起来语义等价且类型安全。
 */
const stop = () => {
  try {
    const ctx = getVideoCtx()
    ctx.pause()
    ctx.seek(0)
  } catch {
    /* 节点可能已卸载，忽略 */
  }
  playing.value = false
  currentTime.value = 0
}

defineExpose({ stop })
</script>

<style lang="scss" scoped>
.video-player {
  display: flex;
  flex-direction: column;
  width: 100%;
  /* 兜住「video calc 值 + 控制栏」可能存在的 1px 取整误差，不往上溢出 */
  overflow: hidden;
  background-color: #000;
}

.video-player__video {
  display: block;
  width: 100%;
  /* 高度由内联 style 明确给出（原生 video 必须有确定高度，靠 flex 分配的高度
     传不到原生层 → 0 高、只有声音没画面）。这里禁止 flex 再插手：
     grow 会去抢父容器剩余高、shrink 会压缩给定高，两种都会让实际高度偏离 calc 值 */
  flex: none;
}

/* 自绘控制栏：半透明黑底 + 白图标 + wot seekbar 进度条，紧贴视频矩形下方。
   高度 60rpx：slider 自身高 = handle-radius*3 = 18px(36rpx)，轨道线垂直居中，
   所以轨道到控制栏上下边各 12rpx，比 72rpx 时更紧凑 */
.video-player__controls {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: 60rpx;
  /* 左 8rpx：按钮自身 52rpx 内 icon 居中(40rpx)，icon 左沿距屏幕 8+6=14rpx，
     再大就显空；右 20rpx 留给靠右的时长 */
  padding: 0 20rpx 0 8rpx;
  background-color: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
}

.video-player__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  /* 56rpx 是控制栏 60rpx 内的上限，再大就贴边；icon 46rpx 居中，四周各留 5rpx */
  width: 56rpx;
  height: 56rpx;
}

.video-player__time {
  flex-shrink: 0;
  /* 时长在进度条右侧：左侧留 16rpx，把手圆心在进度点、半径 6px(12rpx)，
     拖到 100% 时不压时长开头 */
  margin: 0 0 0 16rpx;
  font-size: 24rpx;
  color: #fff;
  line-height: 1;
}
</style>
