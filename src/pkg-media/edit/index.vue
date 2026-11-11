<!--
  新增 / 编辑媒体
  由 cloud-react-native/src/screens/EditMedia/index.tsx 迁移。

  - 标题栏用 uni-app 原生导航栏，标题随「新增 / 编辑」切换，
    通过 uni.setNavigationBarTitle 写入；不再迁移 RN 版的自定义 ToolBar。
  - 演员模块按需求移除：UI 字段（添加按钮、演员列表、DeleteableTags）
    全部不渲染；mediaStore.selectedActor / setSelectedActor 也无需引入。
  - 删除按钮按需求移除（onDelete 与之相关的 Dialog 二次确认都不要）。
  - RN 的 TextInput -> uni-app <input>（单行）/ <textarea>（多行）；
    KeyboardAvoidingView -> uni-app 输入框聚焦由系统自动顶起，未额外处理。
  - 表单：wot 的 wd-form（标题必填，rules 校验），输入行用 wd-input / wd-textarea
    直连 form（自带 label + prop，无需 wd-form-item）。
-->
<template>
  <view :style="themeVars" class="edit">
    <!-- 项目约定：滚动容器统一用 z-paging。表单没有分页数据，
         关掉下拉刷新 / 上拉加载，只当滚动容器用。
         这是代替 scroll-view 的场景，必须 hide-empty-view，避免弹默认空数据图盖住表单。 -->
    <z-paging
      ref="pagingRef"
      v-model="list"
      class="edit__paging"
      :fixed="false"
      :auto="true"
      :refresher-enabled="false"
      :loading-more-enabled="false"
      hide-empty-view
      @query="queryList"
    >
      <view class="edit__form">
        <wd-form ref="formRef" :model="form" :rules="rules">
          <view class="edit__preview">
            <image
              v-if="form.coverUrl"
              class="edit__preview-image"
              :src="form.coverUrl"
              mode="aspectFill"
            />
            <view v-else class="edit__preview-placeholder">
            </view>
          </view>

          <!-- URL 类字段一律多行自适应（长地址在单行里会被截断，看不清填了什么）。
               ★ 不传 label：wd-textarea 一旦有 label 根节点就变 display:flex（cell 模式），
               label 固定占 33%、输入框只剩右边 67% —— 长地址在窄右栏里折行很难看。
               这里改用自绘 label 在上 + 全宽 textarea（与下方 title/description 同款）。 -->
          <view class="edit__stack">
            <text class="edit__label edit__label--top">封面 URL</text>
            <wd-textarea
              v-model="form.coverUrl"
              prop="coverUrl"
              clearable
              no-border
              auto-height
              placeholder="请输入封面地址"
            />
          </view>
          <view class="edit__line" />

          <!-- 标题：label 在上、input 在下（标题类字段一律两行展示）。
               去掉 align-right —— 独占整行后右对齐会让 placeholder 贴到右边。 -->
          <view class="edit__stack">
            <text class="edit__label edit__label--top">
              <text>标题</text>
              <text class="edit__required"> *</text>
            </text>
            <wd-textarea
              v-model="form.title"
              prop="title"
              required
              clearable
              no-border
              auto-height
              placeholder="请输入标题"
            />
          </view>
          <view class="edit__line" />

          <!-- 同上：自绘 label 在上，输入框独占整行 -->
          <view class="edit__stack">
            <text class="edit__label edit__label--top">来源 URL</text>
            <wd-textarea
              v-model="form.sourceUrl"
              prop="sourceUrl"
              clearable
              no-border
              auto-height
              placeholder="请输入来源地址"
            />
          </view>
          <view class="edit__line" />

          <!-- 描述：长文本，label 在上、textarea 在下、高度自适应 -->
          <view class="edit__stack">
            <text class="edit__label edit__label--top">描述</text>
            <wd-textarea
              v-model="form.description"
              placeholder="请输入简介"
              :maxlength="-1"
              auto-height
              no-border
            />
          </view>
          <view class="edit__line" />

          <!-- 备注：长文本，同上 -->
          <view class="edit__stack">
            <text class="edit__label edit__label--top">备注</text>
            <wd-textarea
              v-model="form.remark"
              placeholder="可选"
              :maxlength="-1"
              auto-height
              no-border
            />
          </view>
          <view class="edit__line" />

          <Flex horizontal justify="space-between">
            <text class="edit__label">创建时间</text>
            <text class="edit__static">{{ form.createAt || '-' }}</text>
          </Flex>
          <view class="edit__line" />

          <Flex horizontal justify="space-between">
            <text class="edit__label">修改时间</text>
            <text class="edit__static">{{ form.updateAt || '-' }}</text>
          </Flex>
        </wd-form>
      </view>
    </z-paging>

    <view class="edit__divider" />
    <!-- horizontal：不写 Flex 默认是 column，子项的 flex:1 撑的是高度，按钮不会满宽 -->
    <Flex horizontal :custom-style="{ padding: '20rpx 30rpx' }">
      <wd-button
        block
        :round="false"
        :disabled="!checkForm"
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
import { onLoad } from '@dcloudio/uni-app'
import dayjs from 'dayjs'
import {
  createMediaAsset,
  selectMediaAsset,
  updateMediaAsset
} from '@/api'
import { Router } from '@/common/router'
import { PAGE_PARAMS, takePageParam } from '@/common/pageParams'
import Flex from '@/components/Flex.vue'
import { Dialog } from '@/components/Dialog'
import DialogContainer from '@/components/DialogContainer.vue'
import ToastContainer from '@/components/ToastContainer.vue'
import { useMediaStore } from '@/stores/media'
import { useUserStore } from '@/stores/user'
import { cloneDeep, nanoid, toast } from '@/utils'
import type { MediaAsset } from '@/types/media'
import type { FormInstance, FormRules } from 'wot-design-uni/components/wd-form/types'
import { useThemeVars } from '@/composables/useThemeVars'

const themeVars = useThemeVars()


/**
 * 字段副本：仅取页面所需的字段，actors 字段不参与 UI 与提交。
 * （RN 版在保存时显式把 actors 清空再附 actorIds；本版按需求不做演员模块，
 *   因此 payload 直接丢弃 actors，字段更少更安全。）
 */
type MediaAssetForm = Omit<MediaAsset, 'actors'>

const formRef = ref<FormInstance>()

/** 标题必填 */
const rules: FormRules = {
  title: [{ required: true, message: '请填写标题' }]
}

const createDraftMedia = (): MediaAssetForm =>
  ({
    id: nanoid(),
    coverUrl: '',
    title: '',
    sourceUrl: '',
    description: '',
    remark: '',
    createAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    updateAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
  }) as MediaAssetForm

/*
 * 底部按钮：直接用 wot 的 wd-button，尺寸/圆角全走 wot 的 size 默认值，
 * 这里的 custom-style 只把实底色换成本项目主题色。
 */

const mediaStore = useMediaStore()
const userStore = useUserStore()
const theme = computed(() => userStore.theme)

/** z-paging 只当滚动容器：列表数据恒为空，不参与渲染 */
const pagingRef = ref<any>(null)
const list = ref<unknown[]>([])

/**
 * z-paging 的查询回调：表单页没有分页数据，首次（也是唯一一次）直接结束。
 */
const queryList = () => {
  pagingRef.value?.complete([])
}

const id = ref('')
const form = ref<MediaAssetForm>(createDraftMedia())

const checkForm = computed(() => !!form.value?.title?.trim())

const loadMedia = async () => {
  // 列表页点进来时把整条记录放进了内存（common/pageParams），优先用它回显：
  // 详情接口拿不到数据时表单也不至于全空。
  const cached = takePageParam<MediaAsset>(PAGE_PARAMS.mediaAsset)
  if (cached) {
    const draft = cloneDeep(cached) as unknown as Record<string, unknown>
    // 本页不做演员模块，提交时也不带 actors
    delete draft.actors
    form.value = draft as MediaAssetForm
    if (!id.value && typeof draft.id === 'string') {
      id.value = draft.id
    }
    console.log('[EditMedia] 用内存数据回显', id.value, JSON.stringify(draft))
    return
  }

  if (!id.value) {
    // 新增：直接给一份草稿（id 为空说明列表项没带 id，或就是点新增进来的）
    form.value = createDraftMedia()
  } else {
    try {
      const result = await selectMediaAsset(id.value)
      console.log('[EditMedia] 详情返回', id.value, JSON.stringify(result))
      if (!result) {
        toast('未加载到该媒体数据')
        return
      }
      const detail = cloneDeep(result) as unknown as Record<string, unknown>
      delete detail.actors
      form.value = detail as MediaAssetForm
    } catch (error) {
      console.error('[EditMedia] 详情加载失败', id.value, error)
      toast('加载失败，请返回重试')
      return
    }
  }
  // 不再一进页面就把 updateAt 改成当前时间：那是保存时（onSave）才该做的事
}

const onSave = async () => {
  const check = await formRef.value?.validate()
  if (check && !check.valid) {
    Dialog.show({
      title: '提示',
      message: check.errors[0]?.message ?? '请检查表单',
      positiveText: '我知道了'
    })
    return
  }
  const payload: MediaAssetForm = {
    ...form.value,
    updateAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
  }
  try {
    if (id.value) {
      await updateMediaAsset(id.value, payload as MediaAsset)
    } else {
      await createMediaAsset(payload as MediaAsset)
    }
    toast('操作成功')
    Router.back()
  } catch (error) {
    Dialog.show({
      title: '提示',
      message: '保存失败，请稍后重试',
      positiveText: '我知道了'
    })
  }
}

onLoad((options?: any) => {
  id.value = options?.id || ''
  // 排查回显用：拿不到 id 就会走「新增」分支，表单自然是空的
  console.log('[EditMedia] onLoad options', options, 'id=', id.value)
  uni.setNavigationBarTitle({title: id.value ? '编辑媒体' : '新增媒体'})
  loadMedia()
})
</script>

<style lang="scss" scoped>
.edit {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fff;

  /* :fixed="false" 时 z-paging 高度 100%，父容器必须给出确定高度 */
  &__paging {
    flex: 1;
  }
  &__form {
    padding: 30rpx;
    /* wd-input/wd-textarea 的 cell 模式自带 10px 上下 + 15px 左右内边距，
       行距与左右留白仍由页面的 __form / __line 控制，这里清零 */
    --wot-input-cell-padding: 0;
    --wot-input-padding: 0;
    --wot-textarea-cell-padding: 0;
    --wot-textarea-padding: 0;
  }
  &__preview {
    width: 100%;
    /* 不用 aspect-ratio：Android 的 uni-app webview 不支持，高度会是 0。
       表单区左右各 30rpx，宽 690rpx，16:9 对应高度取 388rpx */
    height: 388rpx;
    border-radius: 24rpx;
    overflow: hidden;
    background-color: #ededed;
    margin-bottom: 24rpx;
  }
  &__preview-image {
    width: 100%;
    height: 100%;
  }
  /* 自绘行 label：28rpx = 14px，跟 wd-input 自带 label（wot 默认
     $-cell-title-fs: 14px）对齐。同一个表单里两种字号并排会看着不齐。 */
  &__label {
    font-size: 28rpx;
    color: #333;
  }
  &__required {
    color: #ff5252;
  }
  /* 长文本：label 在上、textarea 在下，整体占一栏 */
  &__stack {
    display: flex;
    flex-direction: column;
  }
  &__label--top {
    margin-bottom: 12rpx;
  }
  &__static {
    font-size: 28rpx;
    color: #333;
  }
  &__line {
    /* 1px 绝对单位：rpx 在 webview / 小程序里会按屏宽换算，
       1rpx 实测只有 0.5px 左右几乎不可见，2rpx 又会随设备变粗。分割线一律用 1px。 */
    height: 1px;
    background-color: #eee;
    margin: 24rpx 0;
  }
  &__divider {
    /* 1px：理由见 __line 注释 */
    height: 1px;
    background-color: #eee;
  }
}
</style>