<!--
  热更新升级弹窗（纯 UI，逻辑全部来自 useUpdate；弹层与按钮都走 wot：wd-popup + wd-button）

  通过 props 接收状态、通过 emits 暴露动作，自身不调接口、不触碰平台 API，
  这样 UI 与业务彻底解耦：别的 app 直接 <UpdateModal v-bind="useUpdate(...)" /> 即可复用。

  type 取值（由服务端决定）：
    optional / force  → 展示版本信息与「立即更新」按钮；force 不可取消
    native            → 展示「去应用商店更新」按钮（原生版本过低，必须升商店）

  头图：自带「发现新版本」文案的蓝天横幅（540×228），版本号不再叠在图里，
  单独一行显示 `v版本名(wgt版本号)`，如 v1.0.0(2)。

  层级：wd-popup 的 z-index 是普通 prop，直接传 :z-index="9999"（盖住 Dialog 的 9990 与
  一切业务弹层），不用再像 uni-popup 那样去 App.vue 写 !important 全局规则压 99 默认值。
  root-portal：把弹层テレポート到文档根，脱离首页 .home 子树 —— 否则与
  wd-floating-panel（position:fixed + transform + z-index:99）同处一个层叠上下文会被盖住。
  注意本组件仍要挂在页面根节点（不能塞进 wd-floating-panel 这类 transform 容器）。

  配色：按钮/进度条用天蓝（与头图同色系）。
-->
<template>
  <!-- wd-popup 用 v-model 接外部 props.visible；层级直接传 :z-index="9999"。
       下载中 / force 时关掉点遮罩关闭（:close-on-click-modal），避免误触丢进度。 -->
  <wd-popup
    v-model="show"
    position="center"
    :close-on-click-modal="cancelable && !downloading"
    :z-index="9999"
    root-portal
    custom-class="upd-popup"
    @update:model-value="onModelUpdate"
  >
    <view class="upd-card" :style="{ '--wot-button-primary-bg-color': accentColor }">
      <!-- 头图：横幅自带「发现新版本」标题，满宽等比缩放（原图 540×228，卡片 540rpx 宽 → 高 228rpx）。
           图的上方两角是透明的（圆角横幅），所以弹层/卡片背景必须透明，不能垫白底。 -->
      <image class="upd-hero" src="/static/codepush/update-banner.png" mode="widthFix" />

      <!-- 头图以下的内容区：白底 + 底部两角圆角（图底部是白色不透明方角，与白底无缝衔接） -->
      <view class="upd-body">
        <!-- 版本号 + wgt 版本号：单独一行，格式 v1.0.0(2) -->
        <view v-if="release" class="upd-ver">v{{ release.versionName }}({{ release.versionCode }})</view>

        <!-- 更新内容：自适应高度，超过上限（400rpx）这块自己滚，不再顶高整个弹窗 -->
        <view v-if="note" class="upd-note-wrap">
          <view class="upd-note">
            <text class="upd-note-text">{{ note }}</text>
          </view>
        </view>

        <!-- 自绘进度条（不用 wd-progress：它内部是分段颜色模型 + 动画定时器，
             高频进度更新会被丢掉导致条子滞后于数字，这里直接绑 width） -->
        <view v-if="downloading" class="upd-progress-wrap">
          <view class="upd-progress-track">
            <view class="upd-progress-bar" :style="{ width: `${safeProgress}%` }" />
          </view>
          <!-- 已下载 / 总大小：服务端没给 Content-Length 时 total 为 0，只显示已下载 -->
          <view class="upd-progress-meta">{{ sizeText }}</view>
        </view>

      <!-- 按钮一律 wot（项目口径）：主按钮实心天蓝，次按钮天蓝幽灵（plain）。
           天蓝通过在卡片上覆写 --wot-button-primary-bg-color 生效，主/次一起变。
           ⚠️ custom-style 必须带 `min-width: 0`：wot 的 .wd-button.is-medium（默认尺寸）
           自带 min-width:120px，两个按钮 240px + gap 8px 会撑破 540rpx 卡片的内容区
           （540rpx=270px，减左右 40rpx 内边距后仅 230px），只写 `flex: 1` 压不住 min-width。
           内联样式优先级最高，不用 !important、也不用 :deep。 -->
        <view class="upd-actions">
          <template v-if="type === 'native'">
            <wd-button custom-style="flex: 1; min-width: 0" type="primary" @click="emit('goto-store')">
              去应用商店更新
            </wd-button>
          </template>
          <template v-else>
            <wd-button
              custom-style="flex: 1; min-width: 0"
              type="primary"
              :loading="downloading"
              :loading-color="accentColor"
              @click="onUpdateClick"
            >
              <!-- progress 到 100 表示已下载完、正在安装，别再显示「下载中 100%」像卡住 -->
              {{
                downloading
                  ? progress >= 100
                    ? '安装中…'
                    : `下载中 ${progress}%`
                  : '立即更新'
              }}
            </wd-button>
            <wd-button
              v-if="cancelable && !downloading"
              custom-style="flex: 1; min-width: 0"
              plain
              @click="emit('close')"
            >
              稍后再说
            </wd-button>
          </template>
        </view>
      </view>
    </view>
  </wd-popup>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, ref, watch } from 'vue'
import type { UpdateRelease } from '@/api/codepush'
import { CODEPUSH_UPDATE_COLOR } from '@/constants/codepush'

const props = defineProps({
  visible: { type: Boolean, default: false },
  /** none / optional / force / native */
  type: { type: String, default: 'optional' },
  release: { type: Object as PropType<UpdateRelease | null>, default: null },
  note: { type: String, default: '' },
  downloading: { type: Boolean, default: false },
  progress: { type: Number, default: 0 },
  /** 已下载字节数（来自 useUpdate.downloadedBytes） */
  downloaded: { type: Number, default: 0 },
  /** 总字节数，服务端未返回 Content-Length 时为 0（来自 useUpdate.totalBytes） */
  total: { type: Number, default: 0 },
  /** 强调色（按钮 / 进度条），默认天蓝与头图同色系，可覆盖 */
  accentColor: { type: String, default: CODEPUSH_UPDATE_COLOR }
})

const emit = defineEmits(['update', 'close', 'goto-store'])

/** wd-popup 的 v-model：同步外部 props.visible */
const show = ref(props.visible)
// force 不可取消；其余（optional）允许点遮罩 /「稍后再说」关闭
const cancelable = computed(() => props.type !== 'force')

watch(
  () => props.visible,
  v => {
    show.value = v
  }
)

/**
 * wd-popup 点遮罩关闭时把 modelValue 置 false 并回传。这里只在「已开 → 被关」时上报父级：
 * 点遮罩走的就是这条路（组件先自己关再回传）。父级把 props.visible 置 false 来关时
 * 不回传 update，不需要再 emit close。
 */
function onModelUpdate(val: boolean) {
  if (!val) emit('close')
}

/** 主按钮：下载中禁用（防重复触发下载），空闲时才派发 update */
function onUpdateClick() {
  if (props.downloading) return
  emit('update')
}

/** 宽度只能 0~100，越界会让条子溢出轨道（useUpdate 已封顶 99，这里再兜一次） */
const safeProgress = computed(() => Math.min(100, Math.max(0, props.progress)))

/** 字节转可读大小（B / KB / MB，保留一位小数足够看） */
function formatBytes(bytes: number) {
  if (!bytes || bytes <= 0) return '0 B'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

/** 进度条下方的「已下载 / 总共」文案；总大小拿不到时退化成只显示已下载 */
const sizeText = computed(() => {
  const done = `已下载 ${formatBytes(props.downloaded)}`
  return props.total > 0 ? `${done} / 共 ${formatBytes(props.total)}` : done
})
</script>

<style lang="scss" scoped>
/* 卡片本身透明：不垫白底，头图上方两角的透明区才能直接透出遮罩。
   宽度 540rpx（屏宽的 72%）：与头图原图 540px 同数，图按 1:1 比例铺满、不留缩放误差。 */
.upd-card {
  box-sizing: border-box;
  width: 540rpx;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 头图以下的内容区：白底 + 底部两角圆角。
   头图底部是白色不透明的方角，与这里的白底无缝接上；上方圆角由头图自身的透明角负责。 */
.upd-body {
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  border-radius: 0 0 24rpx 24rpx;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 头图：满宽等比缩放，横幅自带标题文案（原图 540×228，600rpx 宽 → 高 253rpx） */
.upd-hero {
  display: block;
  width: 100%;
}

/* 版本行：v版本名(wgt版本号)，如 v1.0.0(2) */
.upd-ver {
  margin-top: 28rpx;
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
}

.upd-note-wrap {
  width: 100%;
  box-sizing: border-box;
  padding: 0 40rpx;
  margin-top: 24rpx;
}

/* 说明区：内容多高就多高，但设 max-height 兜底 ——
   更新说明是服务端自由文本（useUpdate 直接吃 res.note，无长度限制），
   不封顶时卡片会超过屏幕高度，把底部「立即更新 / 稍后再说」按钮顶出视口点不到。
   超高后这块自己滚（小程序 / App-webview 的 view 都认 overflow-y: auto）。 */
.upd-note {
  width: 100%;
  box-sizing: border-box;
  padding: 22rpx 24rpx;
  background: #f7f8fa;
  border-radius: 16rpx;
  max-height: 400rpx;
  overflow-y: auto;
}

/* white-space: pre-wrap 只在空格/换行处换行，拆不断长英文串（API 名、文件路径、commit hash），
   超宽会被外层 .upd-body 的 overflow:hidden 直接裁掉、连省略号都没有；
   加 word-break + overflow-wrap 让长串强制断行（小程序 / App-webview 都生效）。 */
.upd-note-text {
  display: block;
  font-size: 26rpx;
  color: #666;
  white-space: pre-wrap;
  word-break: break-all;
  overflow-wrap: break-word;
}

.upd-progress-wrap {
  width: 100%;
  box-sizing: border-box;
  padding: 0 40rpx;
  margin-top: 28rpx;
}

/* 轨道：浅灰底 + 圆角，条子溢出部分靠 overflow 裁掉 */
.upd-progress-track {
  height: 12rpx;
  border-radius: 6rpx;
  background: #f2f3f5;
  overflow: hidden;
}

.upd-progress-bar {
  height: 100%;
  border-radius: 6rpx;
  background: v-bind('accentColor');
  /* 下载回调是百毫秒级跳变，给一点过渡免得一格一格蹦 */
  transition: width 0.15s linear;
}

/* 进度条下方居中的大小文案（已下载 x MB / 共 y MB） */
.upd-progress-meta {
  margin-top: 12rpx;
  text-align: center;
  font-size: 22rpx;
  color: #8b9490;
}

.upd-actions {
  width: 100%;
  box-sizing: border-box;
  padding: 36rpx 40rpx 40rpx;
  display: flex;
  flex-direction: row;
  gap: 16rpx;
}
</style>

<!-- ⚠️ popup 根（custom-class="upd-popup"）的白底覆盖规则**不在本文件写**，写在 App.vue 的
     全局样式里。原因：uni-app 编译会给本组件**所有** style 块（含非 scoped 的）都加
     [data-v-xxx]，产物实测是 `.wd-popup.upd-popup[data-v-4038aa02]` —— 而 popup 根是
     wd-popup 这个子组件的根元素、没有父组件的 data-v 属性，规则永远命中不了。
     只有 App.vue 里那套不带 data-v 的全局样式能改到它。详见 App.vue 同名注释。 -->
