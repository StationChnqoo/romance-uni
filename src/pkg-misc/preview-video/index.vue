<!--
  通用视频播放页（2026-10-25：替代原 components/VideoPreviewPopup.vue 弹窗）

  - 整页只有一个播放器 @/components/VideoPlayer.vue（原生 video + 自绘控制栏），铺满整屏：
    给组件传 `fill`，video 高度 = `calc(100vh - 8vw)`（8vw 即控制栏 60rpx），
    控制栏自然落在最底部，且与容器 height:100vh 同源 → 不会多出滚动。
    ★ 不要试图用 flex 让 video 撑满：App 端原生 video 拿不到 flex 分配的高度，会变成
      0 高（只有声音、没画面、控制栏被顶到最上面），详见 VideoPlayer 文件头。
    ★ 也不要拿 uni.getSystemInfoSync().windowHeight 算：App 端它含原生导航栏，
      算出来比可视区大 → 整页能往下滚（2026-10-25 报障）。
  - 路由 /pkg-misc/preview-video/index（Routes.PreviewVideo；路由表里早就预留了这个规划路径）。
    入参见 types/router.ts：{ url, poster?, title? }。
  - ★ 参数解码兜底：Router.stringifyParams 用 encodeURIComponent 编了一次，uni 端 onLoad 通常
    已还原，但个别端会多留一层（到手仍是 https%3A%2F%2F...）；判据「不是 http(s) 开头却含 %3A%2F%2F」
    才再解一次，避免误伤 url 里本来就合法带 % 的参数。标题没有 url 特征可依，改用「还含 %XX」
    判据、最多解两层。口径与 pkg-misc/webviewer 一致。
  - ★ 离开页面必须显式停播：App 端只销毁 video 节点，原生播放器会在后台继续出声
    （VideoPreviewPopup 时代踩过这个坑，见 MEMORY）。
-->
<template>
  <view class="preview-video">
    <!-- fill：video 高 = calc(100vh − 控制栏 60rpx)，与容器 height:100vh 同源。
         ★ 不再需要给根节点塞 flex:1 去拉伸——高度已经算准（原生 video 也只认明确高度） -->
    <VideoPlayer
      v-if="url"
      ref="playerRef"
      fill
      :src="url"
      :poster="poster"
      :title="title"
    />
    <text v-else class="preview-video__empty">视频地址无效</text>
  </view>
</template>

<script lang="ts" setup>
import VideoPlayer from '@/components/VideoPlayer.vue'
import { ref } from 'vue'
import { onLoad, onUnload } from '@dcloudio/uni-app'

const url = ref('')
const poster = ref('')
const title = ref('')
const playerRef = ref<any>(null)

/** url / poster 兜底解码：只在「明明是转义形态」时解一次 */
const normalizeUrl = (raw: string): string => {
  let value = raw || ''
  if (value && !/^https?:\/\//i.test(value) && /%3A%2F%2F/i.test(value)) {
    try {
      value = decodeURIComponent(value)
    } catch (error) {
      /* 非法转义（落单的 %）保持原样，让播放器自己报错 */
    }
  }
  return value
}

/** 标题兜底解码：还含 %XX 才解，最多两层，解不动就保持原样 */
const normalizeTitle = (raw: string): string => {
  let value = raw || ''
  for (let i = 0; i < 2 && /%[0-9A-Fa-f]{2}/.test(value); i++) {
    try {
      value = decodeURIComponent(value)
    } catch (error) {
      break
    }
  }
  return value
}

onLoad((options?: { url?: string; poster?: string; title?: string }) => {
  url.value = normalizeUrl(options?.url || '')
  poster.value = normalizeUrl(options?.poster || '')
  title.value = normalizeTitle(options?.title || '')
})

/** 离开页面显式停播：App 端只销毁节点，声音会留在后台 */
onUnload(() => {
  playerRef.value?.stop()
})
</script>

<style lang="scss" scoped>
/* 100vh = 页面可视区（webview 视口，已排除原生导航栏/状态栏）；父容器必须显式给高度，
   否则高度塌陷 → 播放器 area 撑不开（同 pkg-misc/webviewer）。
   overflow:hidden 是双保险：video 高用 calc(100vh - 8vw)，与控制栏 60rpx 折算可能有
   1px 取整差，溢出也只裁掉像素级，绝不让整页滚动 */
.preview-video {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #000;

  &__empty {
    display: block;
    padding: 80rpx 0;
    color: #999;
    font-size: 28rpx;
    text-align: center;
  }
}
</style>
