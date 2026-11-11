<!--
  检测升级 · 详情页（二级页面）

  从首页悬浮面板的「检测升级」入口进入（该入口单击直接跳这里）。
  相比弹窗（UpdateModal）只显示「发现新版本」，这个页面把排查需要的信息全摊开：
   - 本机信息：当前 deviceId / 平台 / 原生版本 / wgt 版本 / appKey（客户端上报的原样参数）
   - 服务端判定结果：type、目标版本、是否强制、包大小、md5、下载路径、下发说明
   - 服务端判定链路 trace（与后台 Simulator 页面同源）

  滚动容器用 z-paging（本页无顶部固定头，走 :fixed="true" 铺满视口 + 原生导航栏）：
  它不是分页列表，所以关掉加载更多、并让 @query 只驱动一次「检测」，
  下拉刷新即重新检测（对应原「重新检测」按钮之外的第二条触发路径）。
  逻辑仍全部来自 useUpdate，本页只做展示 + 触发，不碰 plus.* / 平台差异。
-->
<template>
  <view class="check" :style="{ ...themeVars, '--wot-button-primary-bg-color': accentColor }">
    <z-paging
      ref="pagingRef"
      v-model="list"
      class="check__paging"
      :fixed="true"
      :auto="true"
      :refresher-enabled="true"
      :loading-more-enabled="false"
      :hide-empty-view="true"
      @query="queryList">
      <!-- 本机信息 -->
      <view class="card">
        <view class="card-head">
          <text class="card-title">本机信息</text>
          <text class="card-sub">客户端上报给服务端的原始参数</text>
        </view>
        <view class="rows">
          <view class="row">
            <text class="row-label">设备号</text>
            <text class="row-value mono">{{ deviceId || '—' }}</text>
          </view>
          <view class="row">
            <text class="row-label">平台</text>
            <text class="row-value">{{ platform || '—' }}</text>
          </view>
          <view class="row">
            <text class="row-label">原生版本</text>
            <text class="row-value">{{ nativeVersion }}</text>
          </view>
          <view class="row">
            <text class="row-label">当前 wgt 版本</text>
            <text class="row-value">v{{ wgtVersion }}</text>
          </view>
          <view class="row">
            <text class="row-label">appKey</text>
            <text class="row-value mono">{{ appKey || '—' }}</text>
          </view>
        </view>
      </view>

      <!-- 判定结果 -->
      <view class="card">
        <view class="card-head">
          <text class="card-title">判定结果</text>
          <text class="card-sub">决策在服务端，客户端只看 type</text>
        </view>

        <view v-if="!checked" class="hint">正在检测…</view>

        <template v-else>
          <view class="result-head">
            <view class="tag" :style="{ color: typeMeta.color, backgroundColor: typeMeta.bg }">
              {{ typeMeta.label }}
            </view>
            <text class="result-desc">{{ typeMeta.desc }}</text>
          </view>

          <view v-if="upRelease" class="rows">
            <view class="row">
              <text class="row-label">目标版本</text>
              <text class="row-value"
                >v{{ upRelease.versionName }}（{{ upRelease.versionCode }}）</text
              >
            </view>
            <view class="row">
              <text class="row-label">是否强制</text>
              <text class="row-value">{{
                upRelease.isForce ? '是（装完立即重启）' : '否（下次启动生效）'
              }}</text>
            </view>
            <view class="row">
              <text class="row-label">包大小</text>
              <text class="row-value">{{ formatSize(upRelease.fileSize) }}</text>
            </view>
            <view class="row">
              <text class="row-label">md5</text>
              <text class="row-value mono">{{ upRelease.md5 || '—' }}</text>
            </view>
            <view class="row">
              <text class="row-label">下载路径</text>
              <text class="row-value mono">{{ upRelease.fileUrl || '—' }}</text>
            </view>
          </view>

          <view v-if="upNote" class="note">
            <text class="note-label">下发说明</text>
            <text class="note-text">{{ upNote }}</text>
          </view>

          <view v-if="trace.length" class="trace">
            <text class="trace-label">服务端判定链路</text>
            <view v-for="(t, i) in trace" :key="i" class="trace-item">
              <view class="trace-dot" :style="{ backgroundColor: traceColor(t) }" />
              <text class="trace-text">{{ t }}</text>
            </view>
          </view>
        </template>
      </view>

      <!-- 下载 / 安装进度（自绘，理由同 UpdateModal：wd-progress 会丢高频更新） -->
      <view v-if="downloading" class="card">
        <view class="progress-head">
          <text class="progress-label">{{
            progress >= 100 ? '安装中…' : `下载中 ${progress}%`
          }}</text>
        </view>
        <view class="progress-track">
          <view class="progress-bar" :style="{ width: `${progress}%` }" />
        </view>
      </view>

      <!-- 操作按钮固定在底部：放 z-paging 的 #bottom 插槽，
           由它固定并自动给滚动区留出高度，不用 position: fixed + 垫占位块。
           loading-color 必须显式传：wd-button 的转圈默认按 type 硬编码成 wot 蓝 #4D80F0，
           不读 --wot-color-theme / --wot-button-primary-bg-color 这类变量 -->
      <template #bottom>
        <view class="actions">
          <wd-button
            custom-style="flex: 1"
            plain
            :loading="checking"
            :loading-color="accentColor"
            @click="doCheck">
            重新检测
          </wd-button>
          <wd-button
            v-if="canUpdate"
            custom-style="flex: 1"
            type="primary"
            :loading="downloading"
            :loading-color="accentColor"
            @click="doInstall">
            立即更新
          </wd-button>
          <wd-button
            v-else-if="upType === 'native'"
            custom-style="flex: 1"
            type="primary"
            @click="doStore">
            去应用商店
          </wd-button>
        </view>
      </template>
    </z-paging>
  </view>
  <ToastContainer />
</template>

<script lang="ts" setup>
import ToastContainer from '@/components/ToastContainer.vue'
import { computed, ref } from 'vue'
import { useUpdate } from '@/composables/useUpdate'
import { useThemeVars } from '@/composables/useThemeVars'
import { CODEPUSH_APP_KEY, CODEPUSH_ROCKET_COLOR } from '@/constants/codepush'
import { toast } from '@/utils'

const accentColor = CODEPUSH_ROCKET_COLOR
const themeVars = useThemeVars()
const appKey = CODEPUSH_APP_KEY

const {
  type: upType,
  release: upRelease,
  note: upNote,
  downloading,
  progress,
  deviceId,
  platform,
  nativeVersion,
  wgtVersion,
  trace,
  check,
  install,
  goStore
} = useUpdate({ appKey: CODEPUSH_APP_KEY, channel: 'default' })

/** 是否已完成过至少一次检测（区分「还没检测」与「已是最新」） */
const checked = ref(false)
const checking = ref(false)

/** z-paging 容器：本页不是列表，list 恒空，只借它的滚动 / 下拉刷新 / 生命周期 */
const pagingRef = ref<any>(null)
const list = ref<unknown[]>([])

const TYPE_META: Record<string, { label: string; color: string; bg: string; desc: string }> = {
  none: {
    label: '已是最新',
    color: '#8a9a96',
    bg: 'rgba(138, 154, 150, 0.12)',
    desc: '当前已是最新版本，无需更新'
  },
  optional: {
    label: '可选更新',
    color: '#22a06b',
    bg: 'rgba(34, 160, 107, 0.12)',
    desc: '有可选更新，用户确认后安装，下次启动生效'
  },
  force: {
    label: '强制更新',
    color: '#e54d42',
    bg: 'rgba(229, 77, 66, 0.12)',
    desc: '强制更新，不可跳过，装完立即重启'
  },
  native: {
    label: '需整包升级',
    color: '#f0a020',
    bg: 'rgba(240, 160, 32, 0.12)',
    desc: '宿主版本过低，需前往应用商店升级整包'
  }
}

const typeMeta = computed(() => TYPE_META[upType.value] || TYPE_META.none)
const canUpdate = computed(
  () => (upType.value === 'optional' || upType.value === 'force') && !!upRelease.value
)

/**
 * z-paging 的查询回调：本页拿它当「检测」的触发点。
 * auto=true 时进页自动跑一次（对应原来 onLoad 的自动检测），下拉刷新再跑一次。
 * 恒 complete([])：没有分页数据，列表为空但内容全靠插槽渲染，故容器上要 hide-empty-view。
 */
async function queryList() {
  await doCheck()
  pagingRef.value?.complete([])
}

async function doCheck() {
  checking.value = true
  const r = await check()
  checking.value = false
  // skipped：未配 appKey 或非 App 平台（小程序/H5 不走 wgt 热更新）
  if (r === 'skipped') {
    toast('当前环境不支持热更新检查')
  } else if (r === 'error') {
    toast('检查失败，请稍后重试')
  }
  checked.value = true
}

async function doInstall() {
  await install()
}

function doStore() {
  goStore()
}

/** 字节转可读大小 */
function formatSize(bytes?: number) {
  if (!bytes || bytes <= 0) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

/**
 * trace 单行状态点颜色，与后台 Simulator 的判定一致：
 *   命中/成功=绿；排除/未命中=红；-> none=灰；-> native=橙
 */
function traceColor(t: string) {
  if (t.includes('-> none')) return '#8a9a96'
  if (t.includes('-> native')) return '#f0a020'
  if (t.includes('排除') || t.includes('未命中')) return '#e54d42'
  return '#22a06b'
}
</script>

<style lang="scss" scoped>
.check {
  height: 100%;
  background-color: #f0f0f0;

  &__paging {
    background-color: #f0f0f0;
  }
}

.card {
  margin: 20rpx 24rpx;
  padding: 28rpx 30rpx;
  background-color: #fff;
  border-radius: 24rpx;
}

.card-head {
  display: flex;
  flex-direction: column;
  margin-bottom: 12rpx;
}

.card-title {
  font-size: 30rpx;
  font-weight: 500;
  color: #1f2d26;
}

.card-sub {
  margin-top: 6rpx;
  font-size: 22rpx;
  color: #9aa5a1;
}

.rows {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18rpx 0;
  border-bottom: 1rpx solid #f2f3f5;

  &:last-child {
    border-bottom: none;
  }
}

.row-label {
  flex: none;
  width: 176rpx;
  font-size: 26rpx;
  color: #8b9490;
}

.row-value {
  flex: 1;
  text-align: right;
  font-size: 26rpx;
  color: #2b3a34;
  word-break: break-all;
}

.mono {
  font-family: Menlo, Consolas, monospace;
  font-size: 24rpx;
}

.result-head {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
}

.tag {
  flex: none;
  padding: 8rpx 20rpx;
  border-radius: 999rpx;
  font-size: 24rpx;
  font-weight: 500;
}

.result-desc {
  flex: 1;
  margin-left: 16rpx;
  font-size: 24rpx;
  color: #6b7772;
}

.note {
  margin-top: 20rpx;
  padding: 20rpx 24rpx;
  background-color: #f7f8fa;
  border-radius: 16rpx;
}

.note-label {
  font-size: 24rpx;
  color: #8b9490;
}

.note-text {
  display: block;
  margin-top: 10rpx;
  font-size: 26rpx;
  color: #4a5651;
  white-space: pre-wrap;
}

.trace {
  margin-top: 24rpx;
}

.trace-label {
  font-size: 26rpx;
  font-weight: 500;
  color: #1f2d26;
}

.trace-item {
  display: flex;
  align-items: flex-start;
  margin-top: 16rpx;
}

.trace-dot {
  flex: none;
  width: 16rpx;
  height: 16rpx;
  margin-top: 8rpx;
  border-radius: 50%;
}

.trace-text {
  flex: 1;
  margin-left: 14rpx;
  font-size: 24rpx;
  color: #5a6661;
}

.hint {
  padding: 40rpx 0;
  text-align: center;
  font-size: 26rpx;
  color: #9aa5a1;
}

.progress-head {
  margin-bottom: 16rpx;
}

.progress-label {
  font-size: 26rpx;
  color: #2b3a34;
}

.progress-track {
  height: 14rpx;
  border-radius: 7rpx;
  background-color: #f2f3f5;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: 7rpx;
  background-color: #22a06b;
  transition: width 0.15s linear;
}

/* 在 z-paging 的 #bottom 插槽里：位置由 z-paging 负责，这里只管外观 */
.actions {
  display: flex;
  flex-direction: row;
  padding: 20rpx 24rpx;
  background-color: #fff;
  box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.06);
  gap: 20rpx;
}
</style>
