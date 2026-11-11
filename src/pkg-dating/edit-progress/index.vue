<!--
  相亲进度 - 新增 / 编辑
  由 cloud-react-native/src/screens/EditDatingProgress/index.tsx 迁移。

  表单容器按用户要求用 wot 的 wd-form：
  - 进度日期（wd-datetime-picker）、标题（wd-textarea，必填、多行自适应）、当日心情（wd-input，手输 emoji 或 emoji+文字）、
    进展描述（wd-textarea，label 在上）、附件材料（分包内的 FileUploader）。
  - mood 是自由文本，不是枚举（constants/datingData 里那批 MOOD_* 枚举早已废弃，没迁过来）。

  新建时的默认日期照 RN 还原：若该对象已有进度，默认取「最近一条日期 + 1 天」，
  但如果顺延后超过今天，就退回今天（避免默认日期落在未来）。
-->
<template>
  <view :style="themeVars" class="edit-progress">
    <z-paging
      ref="pagingRef"
      v-model="list"
      class="edit-progress__paging"
      :fixed="false"
      :auto="true"
      :refresher-enabled="false"
      :loading-more-enabled="false"
      hide-empty-view
      @query="queryList">
      <view class="edit-progress__form">
        <wd-form ref="formRef" :model="form" :rules="rules">
          <!-- 进度日期 -->
          <Flex horizontal justify="space-between">
            <text class="edit-progress__label">进度日期</text>
            <wd-datetime-picker
              :model-value="dateValue"
              type="date"
              :root-portal="true"
              :z-index="999"
              @confirm="onDateConfirm">
              <MoreButton :label="form.date || '请选择'" />
            </wd-datetime-picker>
          </Flex>
          <view class="edit-progress__line" />

          <!-- 标题：多行自适应。★ 不传 label —— 传了 wd-textarea 根节点就变 display:flex
               （cell 模式），label 固定占 33%、输入框只剩右边 67%，长标题在窄栏里折行很难看。
               改用自绘 label 在上 + 全宽 textarea（与下方「进展描述」同款）。 -->
          <view class="edit-progress__stack">
            <text class="edit-progress__label edit-progress__label--top">
              <text>标题</text>
              <text class="edit-progress__required"> *</text>
            </text>
            <wd-textarea
              v-model="form.title"
              prop="title"
              required
              clearable
              no-border
              auto-height
              placeholder="例如：第一次吃饭"
              :maxlength="-1" />
          </view>
          <view class="edit-progress__line" />

          <!-- 当日心情：手输 emoji 或 emoji + 简短描述 -->
          <wd-input
            v-model="form.mood"
            label="当日心情"
            clearable
            no-border
            align-right
            :placeholder="DATING_MOOD_HINT"
            :maxlength="-1" />
          <view class="edit-progress__line" />

          <!-- 描述：label 在上、textarea 在下 -->
          <view class="edit-progress__stack">
            <text class="edit-progress__label edit-progress__label--top">进展描述</text>
            <wd-textarea
              v-model="form.description"
              placeholder="写下今天发生了什么、说了什么、心情如何..."
              :maxlength="-1"
              auto-height
              no-border />
          </view>
          <view class="edit-progress__line" />

          <!-- 附件材料 -->
          <view class="edit-progress__attach">
            <text class="edit-progress__label">
              附件材料
              <text class="edit-progress__label-count">({{ form.attachments.length }})</text>
            </text>
            <view class="edit-progress__attach-gap" />
            <FileUploader
              :images="form.attachments"
              @update:images="onAttachmentsChange" />
          </view>
          <!-- ★最后一行后不画 __line -->
        </wd-form>
      </view>
    </z-paging>

    <view class="edit-progress__divider" />
    <Flex horizontal :custom-style="{ padding: '20rpx 30rpx', gap: '12px' }">
      <wd-button
        v-if="progressId"
        block
        plain
        :round="false"
        :custom-style="'flex: 1; min-width: 0; color: ' + theme"
        @click="onDelete">
        删除
      </wd-button>
      <wd-button
        block
        :round="false"
        :custom-style="'flex: 1; min-width: 0; background-color: ' + theme"
        @click="onSave">
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
import { deleteDatingProgress, mergeDatingProgress, selectDating } from '@/api'
import { Router } from '@/common/router'
import DialogContainer from '@/components/DialogContainer.vue'
import ToastContainer from '@/components/ToastContainer.vue'
import Flex from '@/components/Flex.vue'
import MoreButton from '@/components/MoreButton.vue'
import { Dialog } from '@/components/Dialog'
import FileUploader from '@/components/FileUploader.vue'
import { useUserStore } from '@/stores/user'
import { cloneDeep, nanoid, toast } from '@/utils'
import { DATING_MOOD_HINT } from '@/constants/datingData'
import type { Dating, DatingProgress } from '@/types/dating'
import type { PicGoSrc } from '@/types/media'
import type { FormInstance, FormRules } from 'wot-design-uni/components/wd-form/types'
import { useThemeVars } from '@/composables/useThemeVars'

const themeVars = useThemeVars()


const userStore = useUserStore()
const theme = computed(() => userStore.theme)

const formRef = ref<FormInstance>()

/** 标题必填 */
const rules: FormRules = {
  title: [{ required: true, message: '请填写进度标题' }]
}

/** z-paging 只当滚动容器：数据恒空、内容走默认插槽，必须 hide-empty-view */
const pagingRef = ref<any>(null)
const list = ref<unknown[]>([])

const queryList = () => {
  pagingRef.value?.complete([])
}

const datingId = ref('')
const progressId = ref('')
/** 用于导航栏标题（对应 RN 的 datingName） */
const datingName = ref('')

const emptyProgress = (id: string): DatingProgress => ({
  id: nanoid(),
  datingId: id,
  date: dayjs().format('YYYY-MM-DD'),
  title: '',
  description: '',
  mood: undefined,
  attachments: [],
  createAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
})

const form = ref<DatingProgress>(emptyProgress(''))

/** 附件列表：FileUploader 直接操作 PicGoSrc[] */
const onAttachmentsChange = (imgs: PicGoSrc[]) => {
  form.value.attachments = imgs
}

/** wd-datetime-picker 按时间戳传参：内部 new Date(value)，字符串会被当 UTC 解析 */
const dateValue = computed(() => {
  const date = form.value.date
  return date ? dayjs(date).valueOf() : Date.now()
})

const onDateConfirm = ({ value }: { value: number | string }) => {
  form.value.date = dayjs(value).format('YYYY-MM-DD')
}

const loadProgress = async () => {
  if (!datingId.value) return
  try {
    const dating: Dating | undefined = await selectDating(datingId.value)
    if (!dating) return
    datingName.value = dating.name

    // 编辑：在该对象的进度里找目标那条
    if (progressId.value) {
      const target = (dating.progresses || []).find(p => p.id === progressId.value)
      if (target) form.value = cloneDeep(target)
      return
    }

    // 新建：默认日期 = 最近一条 + 1 天，顺延后超过今天就退回今天
    const progresses = dating.progresses || []
    if (progresses.length) {
      const latest = [...progresses].sort((a, b) =>
        dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1
      )[0]
      const next = dayjs(latest.date).add(1, 'day')
      form.value.date = next.isAfter(dayjs())
        ? dayjs(latest.date).format('YYYY-MM-DD')
        : dayjs().format('YYYY-MM-DD')
    }
  } catch (error) {
    // 加载失败保持空表单
  }
}

const onSave = async () => {
  const check = await formRef.value?.validate()
  if (check && !check.valid) {
    toast(check.errors[0]?.message || '请检查表单后重试')
    return
  }
  const saved: DatingProgress = {
    ...form.value,
    title: form.value.title.trim(),
    description: form.value.description.trim(),
    createAt: form.value.createAt || dayjs().format('YYYY-MM-DD HH:mm:ss')
  }
  try {
    await mergeDatingProgress(saved)
    toast('操作成功')
    Router.back()
  } catch (error) {
    toast('保存失败')
  }
}

const onDelete = async () => {
  if (!progressId.value) {
    Router.back()
    return
  }
  const result = await Dialog.show({
    title: '提示',
    message: '确定要删除这条进度记录吗？',
    positiveText: '删除',
    negativeText: '取消'
  })
  if (result !== 'confirm') return
  try {
    await deleteDatingProgress(progressId.value)
    toast('已删除')
    Router.back()
  } catch (error) {
    toast('删除失败')
  }
}

onLoad((options?: any) => {
  // onLoad 入参已被 uni 统一 decode 过一次，这里不要再 decodeURIComponent
  datingId.value = options?.datingId || ''
  progressId.value = options?.id || ''
  form.value = emptyProgress(datingId.value)
  uni.setNavigationBarTitle({
    title: progressId.value ? '编辑进度' : '新增进度'
  })
  loadProgress().then(() => {
    // 对象名拿到之后，标题补成「某某·编辑进度」（RN 同款）
    if (datingName.value) {
      uni.setNavigationBarTitle({
        title: `${datingName.value}·${progressId.value ? '编辑进度' : '新增进度'}`
      })
    }
  })
})
</script>

<style lang="scss" scoped>
.edit-progress {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fff;

  &__paging {
    flex: 1;
  }
  &__form {
    padding: 30rpx;
    /* wd-input / wd-textarea 的 cell 模式自带内边距，这里清零，行距由页面控制 */
    --wot-input-cell-padding: 0;
    --wot-input-padding: 0;
    --wot-textarea-cell-padding: 0;
    --wot-textarea-padding: 0;
  }
  &__label {
    font-size: 28rpx;
    color: #333;
  }
  &__label--top {
    margin-bottom: 12rpx;
  }
  /* 必填星号（自绘 label 后 wot 的 marker 不再渲染，得自己画） */
  &__required {
    color: #ff5252;
  }
  &__label-count {
    font-size: 24rpx;
    color: #999;
  }
  &__stack {
    display: flex;
    flex-direction: column;
  }
  &__attach {
    display: flex;
    flex-direction: column;
  }
  &__attach-gap {
    height: 24rpx;
  }
  /* 1px 绝对单位：rpx 会被按屏宽换算，1rpx 实测只有 0.5px 几乎不可见 */
  &__line {
    height: 1px;
    margin: 24rpx 0;
    background-color: #eee;
  }
  &__divider {
    height: 1px;
    background-color: #eee;
  }
}
</style>
