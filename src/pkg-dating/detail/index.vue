<!--
  相亲 - 详情（资料卡 + 进度时间线）
  由 cloud-react-native/src/screens/DatingDetail/index.tsx 迁移。

  页面结构（自上而下都在这一个滚动容器里）：
  - 资料卡：居中大头像 → 姓名 → 状态彩色前缀 + meta（年龄·身高·学历·职业·籍贯·初见）→ 标签 → 描述
    → 三列统计（认识天数 / 记录条目 / 附件材料，数字用主题色）。
  - 「进度追溯」标题行 + 条数。
  - 时间线：左侧圆点 + 竖线（最后一条的圆点用主题色实心），右侧卡片
    （日期 + 心情药丸 + ⋯ 菜单 / 记录于 xxx / 标题 / 描述 / 附件行）。
  - 底部固定操作条：删除对象 · 编辑信息 · ＋追加进度。

  与 RN 的差异（都是项目既有口径，不是功能缩水）：
  - RN 的 Dropdown（⋯ 锚定下拉）→ wot 的 wd-action-sheet（底部弹层，现成组件）；
  - RN 的 ImageView → uni.previewImage；PreviewVideo → 通用播放页 PreviewVideo；
  - RN 的 useQuery(isFocused) → onShow 重拉（从编辑页 / 进度编辑页回来都要回显最新）。
-->
<template>
  <view :style="themeVars" class="dt-detail">
    <z-paging
      ref="pagingRef"
      v-model="list"
      class="dt-detail__paging"
      :fixed="false"
      :auto="false"
      :refresher-enabled="false"
      :loading-more-enabled="false"
      hide-empty-view>
      <!-- 加载 / 未找到：详情页不是列表，这里不用 z-paging 的空态图 -->
      <view v-if="!dating" class="dt-detail__hint">
        <text class="dt-detail__hint-text">
          {{ loading ? '加载中…' : '未找到相关对象' }}
        </text>
      </view>

      <template v-else>
        <!-- 资料卡 -->
        <view class="dt-detail__profile">
          <view class="dt-detail__avatar">
            <image
              v-if="dating.avatar"
              class="dt-detail__avatar-img"
              :src="mediaUrl(dating.avatar)"
              mode="aspectFill" />
          </view>

          <text class="dt-detail__name">{{ dating.name || '未命名' }}</text>

          <text class="dt-detail__meta-line">
            <text class="dt-detail__meta-status" :style="{ color: statusColor }">
              {{ statusLabel }}
            </text>
            <text v-if="metaSuffix">{{ metaSuffix }}</text>
          </text>

          <view v-if="dating.tags?.length" class="dt-detail__tags">
            <Tag
              v-for="(t, i) in dating.tags"
              :key="`${t}-${i}`"
              :text="String(t)" />
          </view>

          <view class="dt-detail__divider" />
          <text v-if="dating.description" class="dt-detail__desc">{{ dating.description }}</text>

          <!-- 三列统计：上下发丝分界 + 竖向发丝分隔 -->
          <view class="dt-detail__stats">
            <view class="dt-detail__stat">
              <text class="dt-detail__stat-num" :style="{ color: theme }">
                {{ daysKnow }}<text class="dt-detail__stat-unit"> 天</text>
              </text>
              <text class="dt-detail__stat-label">认识天数</text>
            </view>
            <view class="dt-detail__stat-sep" />
            <view class="dt-detail__stat">
              <text class="dt-detail__stat-num" :style="{ color: theme }">
                {{ progresses.length }}<text class="dt-detail__stat-unit"> 条</text>
              </text>
              <text class="dt-detail__stat-label">记录条目</text>
            </view>
            <view class="dt-detail__stat-sep" />
            <view class="dt-detail__stat">
              <text class="dt-detail__stat-num" :style="{ color: theme }">
                {{ attachmentTotal }}<text class="dt-detail__stat-unit"> 个</text>
              </text>
              <text class="dt-detail__stat-label">附件材料</text>
            </view>
          </view>
        </view>

        <!-- 时间线标题 -->
        <view class="dt-detail__tl-head-bar">
          <text class="dt-detail__tl-head-title">进度追溯</text>
          <text class="dt-detail__tl-head-count">共 {{ progresses.length }} 条</text>
        </view>

        <!-- 时间线 -->
        <view
          v-for="(p, index) in progresses"
          :key="p.id"
          class="dt-detail__tl-item">
          <view class="dt-detail__tl-col">
            <view
              class="dt-detail__tl-dot"
              :style="isLast(index) ? { backgroundColor: theme, borderColor: theme } : {}" />
            <view v-if="!isLast(index)" class="dt-detail__tl-line" />
          </view>

          <view class="dt-detail__tl-body" :style="{ paddingBottom: isLast(index) ? '0px' : '36rpx' }">
            <view class="dt-detail__tl-row">
              <view class="dt-detail__tl-date-wrap">
                <text class="dt-detail__tl-date">{{ p.date }}</text>
                <view v-if="p.mood" class="dt-detail__mood">
                  <text class="dt-detail__mood-text">{{ p.mood }}</text>
                </view>
              </view>
              <!-- ⋯ 菜单：RN 是锚定下拉，这里用 wot 的底部 action sheet -->
              <view class="dt-detail__more" @click="openActions(p)">
                <text class="dt-detail__more-icon">⋯</text>
              </view>
            </view>

            <text class="dt-detail__tl-created">
              记录于 {{ dayjs(p.createAt).format('YYYY-MM-DD HH:mm') }}
            </text>

            <view class="dt-detail__tl-card">
              <view class="dt-detail__tl-hairline" />
              <text class="dt-detail__tl-title">{{ p.title }}</text>
              <text v-if="p.description" class="dt-detail__tl-desc">{{ p.description }}</text>

              <view v-if="p.attachments?.length" class="dt-detail__files">
                <view
                  v-for="a in p.attachments"
                  :key="a.id"
                  class="dt-detail__file"
                  hover-class="dt-detail__file--hover"
                  @click="onAttachmentPreview(a)">
                  <image
                    v-if="getFile(a).type === PicGoFileType.Image"
                    class="dt-detail__file-icon"
                    :src="getFile(a).src"
                    mode="aspectFill" />
                  <view v-else class="dt-detail__file-icon dt-detail__file-icon--doc">
                    <wd-icon :name="getFile(a).icon" :color="getFile(a).iconColor" size="48rpx" />
                  </view>
                  <view class="dt-detail__file-body">
                    <text class="dt-detail__file-name">{{ a.name || typeLabel(a) }}</text>
                    <text class="dt-detail__file-meta">
                      {{ typeLabel(a) }}{{ a.size ? '  ·  ' + formatSize(a.size) : '' }}
                    </text>
                  </view>
                  <text class="dt-detail__file-go" :style="{ color: theme }">查看</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </template>
    </z-paging>

    <!-- 底部固定操作条：删除对象 · 编辑信息 · ＋追加进度（按钮一律 wd-button） -->
    <view class="dt-detail__bar">
      <view class="dt-detail__bar-left">
        <wd-button type="text" size="small" custom-style="color: #d4380d" @click="onDeleteDating">
          删除对象
        </wd-button>
        <view class="dt-detail__bar-divider" />
        <wd-button type="text" size="small" @click="onEditInfo">编辑信息</wd-button>
      </view>
      <!-- 尺寸：wot 的中号是 `medium` 不是 `middle`（ButtonSize = 'small' | 'medium' | 'large'，
           默认值本身就是 medium）。三档实际尺寸 small 28px / medium 36px / large 44px。
           ⚠️ `:round` 在 wot@1.14.0 的 wd-button 上是空操作（`is-round` 全库只在
           `hairline + plain` 分支里有一条规则），圆角只由 size 决定（medium = 4px）。
           这里按项目统一口径写 `:round="false"`（当防御：万一以后 wot 给 is-round 补上胶囊圆角，
           默认 true 会让全项目按钮突变）。 -->
      <wd-button
        size="medium"
        :round="false"
        :custom-style="'background-color: ' + theme + '; color: #fff'"
        @click="onAddProgress">
        ＋ 追加进度
      </wd-button>
    </view>

    <!-- 进度的 ⋯ 菜单 -->
    <wd-action-sheet
      v-model="actionVisible"
      :actions="[{ name: '编辑此进度' }, { name: '删除此进度' }]"
      :close-on-click-action="true"
      cancel-text="取消"
      @select="onActionSelect" />

    <!-- 确认弹窗（Dialog.show 的渲染端，页面必须挂一个） -->
    <DialogContainer />
  </view>
  <ToastContainer />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import dayjs from 'dayjs'
import { deleteDating, deleteDatingProgress, selectDating } from '@/api'
import { Router } from '@/common/router'
import DialogContainer from '@/components/DialogContainer.vue'
import ToastContainer from '@/components/ToastContainer.vue'
import Tag from '@/components/Tag.vue'
import { Dialog } from '@/components/Dialog'
import { useUserStore } from '@/stores/user'
import { getFile, mediaUrl, openOfficeDocument, PicGoFileType, toast } from '@/utils'
import { DATING_STATUS_LABEL } from '@/constants/datingData'
import { getCityFullName } from '@/constants/chinaCities'
import type { Dating, DatingAttachment, DatingProgress } from '@/types/dating'
import { useThemeVars } from '@/composables/useThemeVars'

const themeVars = useThemeVars()


const userStore = useUserStore()
const theme = computed(() => userStore.theme)

/** z-paging 只当滚动容器：数据恒空、内容走默认插槽，所以必须 hide-empty-view */
const pagingRef = ref<any>(null)
const list = ref<unknown[]>([])

const id = ref('')
const dating = ref<Dating | null>(null)
const loading = ref(true)

/** 姓名下的状态：去掉各状态花花绿绿颜色，统一主题色文字 */
const statusColor = computed(() => theme.value)
const statusLabel = computed(() =>
  dating.value ? DATING_STATUS_LABEL[dating.value.status] : ''
)

/** 认识天数：今天 - (认识日期 || 创建时间)，取整天（与列表同口径） */
const daysKnow = computed(() =>
  dating.value
    ? dayjs().diff(dayjs(dating.value.meetAt || dating.value.createAt), 'day')
    : 0
)

/** 进度按日期升序（时间线从早到晚） */
const progresses = computed<DatingProgress[]>(() =>
  [...(dating.value?.progresses || [])].sort((a, b) =>
    dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1
  )
)

const isLast = (index: number) => index === progresses.value.length - 1

const attachmentTotal = computed(() =>
  progresses.value.reduce((sum, p) => sum + (p.attachments?.length || 0), 0)
)

/** 状态后面的补充 meta：年龄(出生年) · 身高 · 学历 · 职业 · 籍贯 · 初见日期 */
const metaSuffix = computed(() => {
  const it = dating.value
  if (!it) return ''
  return [
    it.birthYear ? `${new Date().getFullYear() - it.birthYear}岁 (${it.birthYear})` : '',
    it.height ? `${it.height}cm` : '',
    it.education || '',
    it.job || '',
    getCityFullName(it.city || ''),
    it.meetAt ? `初见 ${dayjs(it.meetAt).format('YY/MM/DD')}` : ''
  ]
    .filter(Boolean)
    .map(v => `  ·  ${v}`)
    .join('')
})

/* ---------------- 附件展示 / 预览 ---------------- */
/** 全量进度里的图片附件（uni.previewImage 要一次喂全量才能左右滑） */
const allImageUrls = computed(() =>
  progresses.value.flatMap(p =>
    (p.attachments || [])
      .filter(a => getFile(a).type === PicGoFileType.Image && a.url)
      .map(a => a.url)
  )
)

function formatSize(bytes?: number): string {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes}B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`
}

const typeLabel = (a: DatingAttachment) => {
  const type = getFile(a).type
  if (type === PicGoFileType.Image) return '图片'
  if (type === PicGoFileType.Video) return '视频'
  return a.mimeType === 'application/pdf' ? 'PDF' : '文档'
}

const onAttachmentPreview = (a: DatingAttachment) => {
  const type = getFile(a).type
  if (type === PicGoFileType.Image) {
    uni.previewImage({ urls: allImageUrls.value, current: a.url })
    return
  }
  if (type === PicGoFileType.Video) {
    Router.navigate('PreviewVideo', { url: mediaUrl(a.url) })
    return
  }
  if (openOfficeDocument(a)) return
  Dialog.show({
    title: '提示',
    message: '该文件类型暂不支持预览，请先下载后查看～',
    positiveText: '知道了'
  })
}

/* ---------------- 数据 ---------------- */
const loadDetail = async () => {
  if (!id.value) {
    loading.value = false
    return
  }
  try {
    dating.value = (await selectDating(id.value)) || null
  } catch (error) {
    dating.value = dating.value || null
  } finally {
    loading.value = false
  }
}

/* ---------------- 进度操作（⋯ 菜单） ---------------- */
const actionVisible = ref(false)
const pendingProgress = ref<DatingProgress | null>(null)

const openActions = (p: DatingProgress) => {
  pendingProgress.value = p
  actionVisible.value = true
}

const onActionSelect = ({ item }: { item: { name: string } }) => {
  const target = pendingProgress.value
  actionVisible.value = false
  pendingProgress.value = null
  if (!target || !dating.value) return

  if (item.name === '编辑此进度') {
    Router.navigate('EditDatingProgress', { datingId: dating.value.id, id: target.id })
    return
  }
  if (item.name === '删除此进度') onDeleteProgress(target.id)
}

const onDeleteProgress = async (progressId: string) => {
  const result = await Dialog.show({
    title: '提示',
    message: '确定要删除这条进度记录吗？',
    positiveText: '删除',
    negativeText: '取消'
  })
  if (result !== 'confirm') return
  try {
    await deleteDatingProgress(progressId)
    toast('已删除')
    loadDetail()
  } catch (error) {
    toast('删除失败')
  }
}

/* ---------------- 对象操作（底部操作条） ---------------- */
const onEditInfo = () => {
  if (!dating.value) return
  Router.navigate('EditDating', { id: dating.value.id })
}

const onAddProgress = () => {
  if (!dating.value) return
  Router.navigate('EditDatingProgress', { datingId: dating.value.id })
}

const onDeleteDating = async () => {
  if (!dating.value) return
  const result = await Dialog.show({
    title: '提示',
    message: '删除后，该对象下所有进度记录都会一并移除，确定继续？',
    positiveText: '删除',
    negativeText: '取消'
  })
  if (result !== 'confirm') return
  try {
    await deleteDating(dating.value.id)
    toast('已删除')
    Router.back()
  } catch (error) {
    toast('删除失败')
  }
}

onLoad((options?: any) => {
  // onLoad 的入参已被 uni 统一 decode 过一次，这里不要再 decodeURIComponent
  id.value = options?.id || ''
})

// 从编辑页 / 进度编辑页返回后重拉（对应 RN 的 useIsFocused -> refetch）
onShow(() => {
  loadDetail()
})
</script>

<style lang="scss" scoped>
.dt-detail {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f0f0;

  &__paging {
    flex: 1;
  }
  &__hint {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 100rpx 0;
  }
  &__hint-text {
    font-size: 28rpx;
    color: #999;
  }

  /* ---------- 资料卡 ---------- */
  &__profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30rpx;
    background-color: #fff;
  }
  &__avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 136rpx;
    height: 136rpx;
    border-radius: 50%;
    overflow: hidden;
    background-color: #fafafa;
  }
  &__avatar-img {
    width: 100%;
    height: 100%;
  }
  &__name {
    margin-top: 16rpx;
    font-size: 40rpx;
    font-weight: 500;
    color: #111;
  }
  &__meta-line {
    margin-top: 8rpx;
    font-size: 28rpx;
    color: #666;
    text-align: center;
  }
  &__meta-status {
    font-weight: 500;
  }
  &__tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 8rpx;
    margin-top: 16rpx;
  }
  &__divider {
    /* 1px 绝对单位：rpx 会被按屏宽换算，1rpx 实测只有 0.5px 几乎不可见 */
    width: 100%;
    height: 1px;
    margin: 20rpx 0;
    background-color: #ddd;
  }
  &__desc {
    width: 100%;
    font-size: 28rpx;
    color: #333;
    text-align: left;
  }
  &__stats {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    width: 100%;
    margin-top: 24rpx;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  &__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    min-width: 0;
    padding: 24rpx 0;
  }
  &__stat-sep {
    width: 1px;
    margin: 16rpx 0;
    background-color: #ddd;
  }
  &__stat-num {
    font-size: 44rpx;
    font-weight: 500;
  }
  &__stat-unit {
    font-size: 24rpx;
    font-weight: 500;
    color: #999;
  }
  &__stat-label {
    margin-top: 12rpx;
    font-size: 24rpx;
    color: #888;
  }

  /* ---------- 时间线 ---------- */
  &__tl-head-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 28rpx 30rpx 20rpx;
    background-color: #fff;
  }
  &__tl-head-title {
    font-size: 28rpx;
    font-weight: 500;
    color: #222;
  }
  &__tl-head-count {
    font-size: 24rpx;
    color: #999;
  }
  &__tl-item {
    display: flex;
    flex-direction: row;
    padding: 0 30rpx;
    background-color: #fff;
  }
  &__tl-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 48rpx;
    flex-shrink: 0;
  }
  &__tl-dot {
    width: 24rpx;
    height: 24rpx;
    margin-top: 8rpx;
    border: 4rpx solid #dcdcdc;
    border-radius: 50%;
    background-color: #fff;
    box-sizing: border-box;
    flex-shrink: 0;
  }
  &__tl-line {
    flex: 1;
    width: 2rpx;
    margin-top: 8rpx;
    margin-bottom: -36rpx;
    background-color: #eee;
  }
  &__tl-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }
  &__tl-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  &__tl-date-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    flex: 1;
    min-width: 0;
  }
  &__tl-date {
    font-size: 32rpx;
    font-weight: 500;
    color: #333;
  }
  &__mood {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 40rpx;
    margin-left: 16rpx;
    padding: 0 16rpx;
    border-radius: 20rpx;
    background-color: #fff6e6;
  }
  &__mood-text {
    font-size: 24rpx;
    color: #b85a00;
  }
  &__more {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60rpx;
    height: 60rpx;
    flex-shrink: 0;
  }
  &__more-icon {
    font-size: 32rpx;
    color: #aaa;
  }
  &__tl-created {
    margin-top: 8rpx;
    font-size: 24rpx;
    color: #aaa;
  }
  &__tl-card {
    display: flex;
    flex-direction: column;
    margin-top: 8rpx;
    padding-bottom: 24rpx;
    background-color: #fff;
  }
  &__tl-hairline {
    height: 1px;
    margin-bottom: 20rpx;
    background-color: #eee;
  }
  &__tl-title {
    font-size: 28rpx;
    font-weight: 500;
    color: #333;
  }
  &__tl-desc {
    margin-top: 16rpx;
    font-size: 28rpx;
    color: #444;
  }
  &__files {
    display: flex;
    flex-direction: column;
    gap: 16rpx;
    margin-top: 24rpx;
  }
  &__file {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 12rpx;
    border: 1px solid #d9d9d9;
    border-radius: 16rpx;
    background-color: #fff;
  }
  &__file--hover {
    background-color: #fafafa;
  }
  &__file-icon {
    width: 88rpx;
    height: 88rpx;
    border-radius: 12rpx;
    overflow: hidden;
    background-color: #f0f0f0;
    flex-shrink: 0;
  }
  &__file-icon--doc {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
  }
  &__file-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    margin: 0 16rpx;
  }
  &__file-name {
    font-size: 24rpx;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__file-meta {
    margin-top: 6rpx;
    font-size: 24rpx;
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__file-go {
    padding: 0 16rpx;
    font-size: 24rpx;
    font-weight: 500;
    flex-shrink: 0;
  }

  /* ---------- 底部固定操作条 ---------- */
  &__bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx 30rpx;
    background-color: #fff;
    border-top: 1px solid #eee;
    flex-shrink: 0;
  }
  &__bar-left {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &__bar-divider {
    width: 1px;
    height: 28rpx;
    margin: 0 8rpx;
    background-color: #ddd;
  }
}
</style>
