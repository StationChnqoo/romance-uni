<!--
  新增 / 编辑纪录片单期
  字段：标题、内容（简介）、预览图 URL、m3u8 播放地址。
  ⚠️ m3u8 非必填（有的源抓不到地址），只校验标题；播放时若无 m3u8，详情页会直接提示不可播放。
  数据写入后端接口（/program-episodes，必须带 seriesId）。
  保存即落库，Router.back() 回系列编辑页；系列编辑页从详情接口重新读取。

  - 滚动容器用 z-paging 伪容器（:fixed="false" + height:100vh 父 + hide-empty-view）。
  - 输入控件用 wot 的 wd-input / wd-textarea，cell 内边距清零交给外层（与编辑纪念日同款）。
  - 删除：Dialog.show 二次确认。
  - 底部放一个「预览」卡：封面（image）+ 标题 + 播放地址，方便核对填对了没有。
-->
<template>
  <view :style="themeVars" class="doc-edit-episode">
    <z-paging
      ref="pagingRef"
      v-model="list"
      class="doc-edit-episode__paging"
      :fixed="false"
      :refresher-enabled="false"
      :loading-more-enabled="false"
      hide-empty-view
      @query="queryList"
    >
      <view class="doc-edit-episode__form">
        <!-- 顶部操作行：粘贴 CCTV 播放接口 JSON，一键解析 title / image / hls_url -->
        <view class="doc-edit-episode__head">
          <text class="doc-edit-episode__head-hint">粘贴播放接口 JSON 可一键导入</text>
          <view class="doc-edit-episode__import" @click="openImport">
            <wd-icon name="file-paste" :color="theme" size="30rpx" />
            <text class="doc-edit-episode__import-text" :style="{ color: theme }">导入</text>
          </view>
        </view>

        <view class="doc-edit-episode__stack">
          <text class="doc-edit-episode__label doc-edit-episode__label--top">
            <text>标题</text>
            <text class="doc-edit-episode__required"> *</text>
          </text>
          <wd-textarea
            v-model="form.title"
            clearable
            no-border
            auto-height
            placeholder="如：第1集 自然的馈赠"
          />
        </view>
        <view class="doc-edit-episode__line" />

        <view class="doc-edit-episode__stack">
          <text class="doc-edit-episode__label doc-edit-episode__label--top">内容 / 简介</text>
          <wd-textarea
            v-model="form.content"
            placeholder="这期讲了什么"
            :maxlength="-1"
            auto-height
            no-border
          />
        </view>
        <view class="doc-edit-episode__line" />

        <view class="doc-edit-episode__stack">
          <text class="doc-edit-episode__label doc-edit-episode__label--top">预览图 URL</text>
          <wd-textarea
            v-model="form.coverUrl"
            clearable
            no-border
            auto-height
            placeholder="期目封面图地址（https://...）"
          />
        </view>
        <view class="doc-edit-episode__line" />

        <view class="doc-edit-episode__stack">
          <text class="doc-edit-episode__label doc-edit-episode__label--top">m3u8 播放地址（选填）</text>
          <wd-textarea
            v-model="form.m3u8"
            clearable
            no-border
            auto-height
            placeholder="https://.../index.m3u8"
          />
        </view>
        <view class="doc-edit-episode__line" />

        <!-- 预览卡：核对填对没有（封面 + 标题 + 播放地址） -->
        <view v-if="form.coverUrl || form.m3u8 || form.title" class="doc-edit-episode__preview">
          <view class="doc-edit-episode__preview-cover">
            <image
              v-if="form.coverUrl"
              class="doc-edit-episode__preview-cover-img"
              :src="mediaUrl(form.coverUrl)"
              mode="aspectFill"
            />
            <view v-else class="doc-edit-episode__preview-cover-ph">
              <wd-icon name="play-circle" />
            </view>
          </view>
          <view class="doc-edit-episode__preview-body">
            <text class="doc-edit-episode__preview-title">
              {{ form.title?.trim() || '未命名期目' }}
            </text>
            <text class="doc-edit-episode__preview-url">
              {{ form.m3u8?.trim() || '未填播放地址' }}
            </text>
          </view>
        </view>
      </view>
    </z-paging>

    <view class="doc-edit-episode__divider" />
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
    <InputDialog
      :show="importVisible"
      title="导入期目信息"
      message="粘贴播放接口返回的 JSON，自动解析 title / image / hls_url"
      placeholder="粘贴 JSON 后点「解析」"
      multiline
      confirm-text="解析"
      @close="importVisible = false"
      @confirm="onImportConfirm"
    />
    <DialogContainer />
  </view>
  <ToastContainer />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { Router } from '@/common/router'
import Flex from '@/components/Flex.vue'
import { Dialog } from '@/components/Dialog'
import DialogContainer from '@/components/DialogContainer.vue'
import ToastContainer from '@/components/ToastContainer.vue'
import InputDialog from '@/components/InputDialog.vue'
import { useUserStore } from '@/stores/user'
import { cloneDeep, mediaUrl, toast } from '@/utils'
import {
  createProgramEpisode,
  deleteProgramEpisode,
  mergeProgramEpisode,
  selectProgramSeriesDetail
} from '@/api'
import type { ProgramEpisode, ProgramSeriesDetail } from '@/api'
import { useThemeVars } from '@/composables/useThemeVars'

const themeVars = useThemeVars()


const userStore = useUserStore()
const theme = computed(() => userStore.theme)

const seriesId = ref('')
const id = ref('')
const detail = ref<ProgramSeriesDetail | null>(null)

const form = ref<ProgramEpisode>(createProgramEpisode(seriesId.value))
/** m3u8 非必填（有的源抓不到地址），只校验标题 */
const canSave = computed(() => !!form.value.title?.trim())

/** 导入弹层：粘贴播放接口返回的 JSON，解析后回填表单 */
const importVisible = ref(false)

const openImport = () => {
  importVisible.value = true
}

/**
 * 解析粘贴的 JSON，回填三个字段：
 *   title   → 标题
 *   image   → 预览图 URL
 *   hls_url → m3u8 播放地址
 * 只覆盖解析到的字段（缺失的保持原值）；解析失败保留弹窗，方便改完重试。
 */
const onImportConfirm = (raw: string) => {
  const text = (raw || '').trim()
  if (!text) {
    toast('请先粘贴 JSON')
    return
  }
  // 容错：只取第一个 { 到最后一个 } 之间的内容，忽略首尾多余文字
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  const body = start >= 0 && end > start ? text.slice(start, end + 1) : text
  let json: any
  try {
    json = JSON.parse(body)
  } catch {
    toast('解析失败：不是合法的 JSON')
    return
  }
  const title = typeof json.title === 'string' ? json.title.trim() : ''
  const image = typeof json.image === 'string' ? json.image.trim() : ''
  const hls = typeof json.hls_url === 'string' ? json.hls_url.trim() : ''
  if (!title && !image && !hls) {
    toast('未识别到 title / image / hls_url')
    return
  }
  if (title) form.value.title = title
  if (image) form.value.coverUrl = image
  if (hls) form.value.m3u8 = hls
  importVisible.value = false
  toast('已导入')
}

const pagingRef = ref<any>(null)
const list = ref<unknown[]>([])
const queryList = () => {
  pagingRef.value?.complete([])
}

const onSave = async () => {
  if (!canSave.value) {
    toast('请填写标题')
    return
  }
  const payload: ProgramEpisode = {
    ...form.value,
    seriesId: seriesId.value,
    title: form.value.title.trim(),
    content: (form.value.content || '').trim(),
    coverUrl: (form.value.coverUrl || '').trim(),
    m3u8: (form.value.m3u8 || '').trim()
  }
  await mergeProgramEpisode(payload)
  Router.back()
}

const onDelete = async () => {
  if (!id.value) return
  const result = await Dialog.show({
    title: '提示',
    message: '删除后不可恢复，请谨慎操作',
    positiveText: '确定',
    negativeText: '取消'
  })
  if (result !== 'confirm') return
  await deleteProgramEpisode(id.value)
  Router.back()
}

onLoad(async (options?: any) => {
  seriesId.value = options?.seriesId || ''
  id.value = options?.id || ''
  if (id.value) {
    try {
      detail.value = await selectProgramSeriesDetail(seriesId.value)
    } catch {
      detail.value = null
    }
    const ep = detail.value?.episodes.find(e => e.id === id.value)
    if (ep) {
      form.value = cloneDeep(ep)
    } else {
      toast('未找到该期目')
      Router.back()
      return
    }
  } else {
    form.value = createProgramEpisode(seriesId.value)
  }
  uni.setNavigationBarTitle({ title: id.value ? '编辑期目' : '新建期目' })
})
</script>

<style lang="scss" scoped>
.doc-edit-episode {
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
  &__head {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16rpx;
  }
  &__head-hint {
    font-size: 22rpx;
    color: #bbb;
  }
  &__import {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8rpx 18rpx;
    border-radius: 999rpx;
    background-color: #f5f5f5;
  }
  &__import-text {
    margin-left: 6rpx;
    font-size: 26rpx;
  }
  &__stack {
    display: flex;
    flex-direction: column;
  }
  &__label {
    font-size: 28rpx;
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

  /* 预览卡 */
  &__preview {
    display: flex;
    flex-direction: row;
    padding: 20rpx;
    margin-top: 12rpx;
    background-color: #f7f7f7;
    border-radius: 12rpx;
  }
  &__preview-cover {
    width: 160rpx;
    height: 100rpx;
    flex-shrink: 0;
    background-color: #ececec;
    overflow: hidden;
    margin-right: 20rpx;
  }
  &__preview-cover-img {
    width: 100%;
    height: 100%;
  }
  &__preview-cover-ph {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #cfcfcf;
    font-size: 52rpx;
  }
  &__preview-body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__preview-title {
    font-size: 28rpx;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__preview-url {
    font-size: 22rpx;
    color: #999;
    margin-top: 12rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
