<!--
  新增 / 编辑纪录片系列
  数据来自后端接口（/program-series）。字段：标题、预览图 URL、简介。
  期目（episodes）在「编辑期目」页单独增删改，这里只负责列表展示 + 跳转。

  - 滚动容器用 z-paging 伪容器（:fixed="false" + height:100vh 父 + hide-empty-view，与编辑纪念日同款）。
  - 输入控件用 wot 的 wd-input / wd-textarea（label 在上、输入在下，长文本用 textarea）；
    wot cell 内边距清零交给外层排版（与编辑纪念日同款变量）。
  - 删除系列：Dialog.show 二次确认（项目口径：确认弹窗只用 Dialog.show，根 view 末尾挂 <DialogContainer />）。
  - 「保存」对新建系列：写后端后 replace 回本页（带 id），这样能立刻继续添加期目；
    对已有系列：只更新 meta 字段（保留后端已有的 episodes，不覆盖）。
-->
<template>
  <view :style="themeVars" class="doc-edit-series">
    <z-paging
      ref="pagingRef"
      v-model="list"
      class="doc-edit-series__paging"
      :fixed="false"
      :refresher-enabled="false"
      :loading-more-enabled="false"
      hide-empty-view
      @query="queryList"
    >
      <view class="doc-edit-series__form">
        <view class="doc-edit-series__stack">
          <text class="doc-edit-series__label doc-edit-series__label--top">
            <text>标题</text>
            <text class="doc-edit-series__required"> *</text>
          </text>
          <wd-textarea
            v-model="form.title"
            clearable
            no-border
            auto-height
            placeholder="如：舌尖上的中国"
          />
        </view>
        <view class="doc-edit-series__line" />

        <view class="doc-edit-series__stack">
          <text class="doc-edit-series__label doc-edit-series__label--top">预览图 URL</text>
          <wd-textarea
            v-model="form.coverUrl"
            clearable
            no-border
            auto-height
            placeholder="系列封面图地址（https://...）"
          />
        </view>
        <view class="doc-edit-series__line" />

        <view class="doc-edit-series__stack">
          <text class="doc-edit-series__label doc-edit-series__label--top">简介</text>
          <wd-textarea
            v-model="form.description"
            placeholder="系列简介"
            :maxlength="-1"
            auto-height
            no-border
          />
        </view>
        <view class="doc-edit-series__line" />

        <!-- 期目管理：编辑态（id 已存在）才展示，新建系列需先保存才能加期目 -->
        <view class="doc-edit-series__section">
          <view class="doc-edit-series__section-head">
            <text class="doc-edit-series__section-title">期目（{{ episodes.length }}）</text>
            <view
              v-if="id"
              class="doc-edit-series__add"
              :style="{ color: theme }"
              @click="onAddEpisode"
            >
              <wd-icon name="add" />
              <text>添加期目</text>
            </view>
          </view>

          <view v-if="!id" class="doc-edit-series__hint">
            保存系列后可添加期目
          </view>

          <view
            v-for="(ep, idx) in episodes"
            :key="ep.id"
            class="doc-edit-series__episode"
            hover-class="doc-edit-series__episode_hover"
            @click="onEditEpisode(ep)"
          >
            <view class="doc-edit-series__episode-cover">
              <image
                v-if="ep.coverUrl"
                class="doc-edit-series__episode-cover-img"
                :src="mediaUrl(ep.coverUrl)"
                mode="aspectFill"
              />
              <view v-else class="doc-edit-series__episode-cover-ph">
                <wd-icon name="play-circle" />
              </view>
            </view>
            <view class="doc-edit-series__episode-body">
              <text class="doc-edit-series__episode-title">
                {{ idx + 1 }}. {{ ep.title?.trim() || '未命名期目' }}
              </text>
              <text class="doc-edit-series__episode-content">
                {{ ep.content?.trim() || '暂无内容' }}
              </text>
            </view>
            <view
              class="doc-edit-series__episode-del"
              @click.stop="onDeleteEpisode(ep)"
            >
              <wd-icon name="close" />
            </view>
          </view>
        </view>
      </view>
    </z-paging>

    <view class="doc-edit-series__divider" />
    <Flex horizontal :custom-style="{ padding: '20rpx 30rpx', gap: '12px' }">
      <wd-button
        v-if="id"
        block
        plain
        :round="false"
        :custom-style="'flex: 1; min-width: 0; color: ' + theme"
        @click="onDelete"
      >
        删除
      </wd-button>
      <wd-button
        block
        :round="false"
        :disabled="!canSave"
        :custom-style="'flex: 1; min-width: 0; background-color: ' + theme"
        @click="onSave"
      >
        保存
      </wd-button>
    </Flex>
    <DialogContainer />
  </view>
  <ToastContainer />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { Router } from '@/common/router'
import Flex from '@/components/Flex.vue'
import { Dialog } from '@/components/Dialog'
import DialogContainer from '@/components/DialogContainer.vue'
import ToastContainer from '@/components/ToastContainer.vue'
import { useUserStore } from '@/stores/user'
import { cloneDeep, mediaUrl, toast } from '@/utils'
import {
  createProgramSeries,
  deleteProgramEpisode,
  deleteProgramSeries,
  mergeProgramSeries,
  selectProgramSeriesDetail
} from '@/api'
import type { ProgramEpisode, ProgramSeries, ProgramSeriesDetail } from '@/api'
import { useThemeVars } from '@/composables/useThemeVars'

const themeVars = useThemeVars()


const userStore = useUserStore()
const theme = computed(() => userStore.theme)

const id = ref('')
/** 编辑态拉取的详情（含期目），新建态为空 */
const detail = ref<ProgramSeriesDetail | null>(null)

/** 表单（meta 字段的临时副本）：标题 / 封面 / 简介 */
const form = ref<ProgramSeries>(createProgramSeries())

/** 期目列表：编辑态来自后端详情，新建态为空 */
const episodes = ref<ProgramEpisode[]>([])

const canSave = computed(() => !!form.value.title?.trim())

/** z-paging 伪容器 */
const pagingRef = ref<any>(null)
const list = ref<unknown[]>([])
const queryList = () => {
  pagingRef.value?.complete([])
}

const onAddEpisode = () => {
  if (!id.value) return
  Router.navigate('EditProgramEpisode', { seriesId: id.value })
}

const onEditEpisode = (ep: ProgramEpisode) => {
  if (!id.value) return
  Router.navigate('EditProgramEpisode', { seriesId: id.value, id: ep.id })
}

const onDeleteEpisode = async (ep: ProgramEpisode) => {
  if (!id.value) return
  const result = await Dialog.show({
    title: '提示',
    message: `确定删除「${ep.title?.trim() || '该期目'}」？`,
    positiveText: '确定',
    negativeText: '取消'
  })
  if (result !== 'confirm') return
  await deleteProgramEpisode(ep.id)
  episodes.value = episodes.value.filter(x => x.id !== ep.id)
}

const onSave = async () => {
  if (!canSave.value) {
    toast('请填写标题')
    return
  }
  const title = form.value.title.trim()
  const coverUrl = (form.value.coverUrl || '').trim()
  const description = (form.value.description || '').trim()
  const payload: ProgramSeries = { ...form.value, title, coverUrl, description }
  const saved = await mergeProgramSeries(payload)
  if (!saved?.id) {
    toast('保存失败')
    return
  }
  if (id.value) {
    Router.back()
  } else {
    // 新建后 replace 回本页（带 id），立刻能继续添加期目
    Router.replace('EditProgramSeries', { id: saved.id })
  }
}

const onDelete = async () => {
  if (!id.value) return
  const result = await Dialog.show({
    title: '提示',
    message: '删除后该系列及全部期目不可恢复，请谨慎操作',
    positiveText: '确定',
    negativeText: '取消'
  })
  if (result !== 'confirm') return
  await deleteProgramSeries(id.value)
  Router.back()
}

const loadDetail = async () => {
  try {
    detail.value = await selectProgramSeriesDetail(id.value)
  } catch {
    detail.value = null
  }
  return detail.value
}

onLoad(async (options?: any) => {
  id.value = options?.id || ''
  if (id.value) {
    const s = await loadDetail()
    if (s) {
      // 期目不进 form（单独存 episodes），这里只拷 meta
      form.value = cloneDeep({
        id: s.id,
        title: s.title,
        coverUrl: s.coverUrl,
        description: s.description,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt
      })
      episodes.value = s.episodes ?? []
    } else {
      toast('未找到该系列')
      Router.back()
      return
    }
  } else {
    form.value = createProgramSeries()
    episodes.value = []
  }
  uni.setNavigationBarTitle({ title: id.value ? '编辑系列' : '新建系列' })
})

/**
 * onShow 只刷新期目列表：从「编辑期目」返回时，新增/修改/删除的期目能立即回显。
 * ⚠️ 不动 form（标题/封面/简介）—— 用户可能正在编辑还没保存，返回时不能被接口数据冲掉。
 * 首次 onShow 紧跟 onLoad（onLoad 已拉过一次），跳过以免重复请求。
 */
let firstShow = true
onShow(async () => {
  if (!id.value) return
  if (firstShow) {
    firstShow = false
    return
  }
  const s = await loadDetail()
  if (s) {
    episodes.value = s.episodes ?? []
  }
})
</script>

<style lang="scss" scoped>
.doc-edit-series {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fff;

  &__paging {
    flex: 1;
  }
  &__form {
    padding: 30rpx;
    --wot-input-cell-padding: 0;
    --wot-input-padding: 0;
    --wot-textarea-cell-padding: 0;
    --wot-textarea-padding: 0;
  }
  &__stack {
    display: flex;
    flex-direction: column;
  }
  &__label {
    font-size:28rpx;
    color: #333;
    line-height: 48rpx;
  }
  &__label--top {
    margin-bottom: 12rpx;
    line-height: 44rpx;
  }
  &__required {
    color: #ff5252;
  }
  &__line {
    height: 1px;
    background-color: #eee;
    margin: 24rpx 0;
  }
  &__divider {
    height: 1px;
    background-color: #eee;
  }

  /* 期目管理区 */
  &__section {
    margin-top: 12rpx;
  }
  &__section-head {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  &__section-title {
    font-size: 28rpx;
    color: #333;
    font-weight: 500;
  }
  &__add {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 28rpx;
    :deep(.wd-icon) {
      margin-right: 6rpx;
    }
  }
  &__hint {
    font-size: 24rpx;
    color: #bbb;
    margin-top: 24rpx;
  }
  &__episode {
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 20rpx 0;
    border-bottom: 1px solid #f2f2f2;
  }
  &__episode_hover {
    opacity: 0.85;
  }
  &__episode-cover {
    width: 140rpx;
    height: 88rpx;
    flex-shrink: 0;
    background-color: #f5f5f5;
    overflow: hidden;
    margin-right: 20rpx;
  }
  &__episode-cover-img {
    width: 100%;
    height: 100%;
  }
  &__episode-cover-ph {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #cfcfcf;
    font-size: 44rpx;
  }
  &__episode-body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__episode-title {
    font-size: 28rpx;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /* 期目内容：最多一行，超出省略号（原来是两行 clamp，与上方标题行不齐） */
  &__episode-content {
    font-size:24rpx;
    color: #999;
    margin-top: 8rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /* 删除期目：右上角小圆，覆盖在行上（事件 stop 防止触发整行编辑） */
  &__episode-del {
    position: absolute;
    right: 0;
    top: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44rpx;
    height: 44rpx;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.04);
    color: #999;
    font-size: 28rpx;
  }
}
</style>
