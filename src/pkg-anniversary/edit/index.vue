<!--
  新增 / 编辑纪念日
  由 cloud-react-native/src/screens/EditAnniversary/index.tsx 迁移。

  - 标题栏用 uni-app 原生导航栏，标题随「新增 / 编辑」切换，
    通过 uni.setNavigationBarTitle 写入；不再迁移 RN 版的自定义 ToolBar。
  - RN 的 TextInput -> wot 的 wd-input / wd-textarea（标题/描述多行用 textarea）；
    RN 的 Switcher -> wot 的 wd-switch（active-color 用 theme）。
  - RN 的 DateTimePicker -> wot 的 wd-datetime-picker（type=date），
    走默认插槽自己当触发器（不传则渲染成 wd-cell），排版由外层 Flex 控制。
    wd-datetime-picker 的入参按时间戳传：组件内部 new Date(value)，
    字符串会被当 UTC 解析，时间戳最稳。
  - 表单：wot 的 wd-form（标题、日期必填，rules 校验），保存前 validate()。
  - 编辑态底部有「删除」按钮，Dialog 二次确认后调 deleteAnniversary。
-->
<template>
  <view :style="themeVars" class="edit-anniversary">
    <!-- 项目约定：滚动容器统一用 z-paging。表单没有分页数据，
         关掉下拉刷新 / 上拉加载，只当滚动容器用，必须 hide-empty-view。 -->
    <z-paging
      ref="pagingRef"
      v-model="list"
      class="edit-anniversary__paging"
      :fixed="false"
      :auto="true"
      :refresher-enabled="false"
      :loading-more-enabled="false"
      hide-empty-view
      @query="queryList"
    >
      <view class="edit-anniversary__form">
        <wd-form ref="formRef" :model="form" :rules="rules">
          <!-- 标题：label 在上、input 在下（标题类字段一律两行展示）。
               去掉 align-right —— 独占整行后右对齐会让 placeholder 贴到右边。 -->
          <view class="edit-anniversary__stack">
            <text class="edit-anniversary__label edit-anniversary__label--top">
              <text>标题</text>
              <text class="edit-anniversary__required"> *</text>
            </text>
            <!-- 标题：多行自适应（wd-textarea auto-height），长标题不挤在单行里 -->
            <wd-textarea
              v-model="form.title"
              prop="title"
              required
              clearable
              no-border
              auto-height
              placeholder="请填写标题"
            />
          </view>
          <view class="edit-anniversary__line" />

          <!-- 描述是长文本：label 在上、textarea 在下、高度自适应，别挤在右侧窄空间里 -->
          <view class="edit-anniversary__stack">
            <text class="edit-anniversary__label edit-anniversary__label--top">描述</text>
            <wd-textarea
              v-model="form.description"
              placeholder="请填写描述"
              :maxlength="-1"
              auto-height
              no-border
            />
          </view>
          <view class="edit-anniversary__line" />

          <wd-input
            v-model="form.emoji"
            label="emoji"
            prop="emoji"
            clearable
            align-right
            no-border
            placeholder="😄请填写"
          />
          <view class="edit-anniversary__line" />

          <Flex horizontal justify="space-between">
            <text class="edit-anniversary__label">
              <text>日期</text>
              <text class="edit-anniversary__required"> *</text>
            </text>
            <wd-datetime-picker
              :model-value="anniversaryDateValue"
              type="date"
              :root-portal="true"
              :z-index="999"
              @confirm="onDateConfirm"
            >
              <MoreButton :label="form.anniversaryDate || '请选择日期'" />
            </wd-datetime-picker>
          </Flex>
          <view class="edit-anniversary__line" />

          <Flex horizontal justify="space-between">
            <text class="edit-anniversary__label">农历</text>
            <!-- 后端字段是 0/1：用 wd-switch 的 active/inactive-value 直接映射，
                 别用 @change 手转——它的参数是 {value} 对象，直接当布尔用恒为真 -->
            <wd-switch
              v-model="form.isLunar"
              size="20px"
              :active-value="1"
              :inactive-value="0"
              :active-color="theme"
              inactive-color="#eee"
            />
          </Flex>
          <view class="edit-anniversary__line" />

          <Flex horizontal justify="space-between">
            <text class="edit-anniversary__label">提醒</text>
            <wd-switch
              v-model="form.reminderEnabled"
              size="20px"
              :active-value="1"
              :inactive-value="0"
              :active-color="theme"
              inactive-color="#eee"
            />
          </Flex>
          <view class="edit-anniversary__line" />

          <template v-if="form.reminderEnabled === 1">
            <wd-input
              :model-value="`${form.reminderDays ?? ''}`"
              label="提前提醒(天)"
              prop="reminderDays"
              type="number"
              align-right
              no-border
              placeholder="1"
              @update:model-value="onReminderDaysInput"
            />
            <view class="edit-anniversary__line" />
          </template>

          <Flex horizontal justify="space-between">
            <text class="edit-anniversary__label">创建时间</text>
            <text class="edit-anniversary__static">{{ form.createAt || '-' }}</text>
          </Flex>
          <view class="edit-anniversary__line" />

          <Flex horizontal justify="space-between">
            <text class="edit-anniversary__label">修改时间</text>
            <text class="edit-anniversary__static">{{ form.updateAt || '-' }}</text>
          </Flex>
          <!-- ★最后一行后不画 __line，整张表单的尾巴由表单外的 __divider 接 -->
        </wd-form>
      </view>
    </z-paging>

    <view class="edit-anniversary__divider" />
    <!-- horizontal：不写 Flex 默认是 column，子项的 flex:1 撑的是高度，按钮不会满宽 -->
    <Flex horizontal :custom-style="{ padding: '20rpx 30rpx', gap: '12px' }">
      <!-- 编辑态才有删除：对应的 RN 是 BOTTOM_ACTION_SECONDARY_BUTTON_STYLE（镂空） -->
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
  createAnniversary,
  deleteAnniversary,
  selectAnniversary,
  updateAnniversary
} from '@/api'
import { Router } from '@/common/router'
import { PAGE_PARAMS, takePageParam } from '@/common/pageParams'
import Flex from '@/components/Flex.vue'
import MoreButton from '@/components/MoreButton.vue'
import { Dialog } from '@/components/Dialog'
import DialogContainer from '@/components/DialogContainer.vue'
import ToastContainer from '@/components/ToastContainer.vue'
import { useUserStore } from '@/stores/user'
import { cloneDeep, nanoid, toast } from '@/utils'
import type { Anniversary } from '@/types/media'
/** 与 @/api 的 createAnniversary（接口）同名，这里起别名区分 */
import { createAnniversary as createAnniversaryDraft } from '@/types/media'
import type { FormInstance, FormRules } from 'wot-design-uni/components/wd-form/types'
import { useThemeVars } from '@/composables/useThemeVars'

const themeVars = useThemeVars()


const formRef = ref<FormInstance>()

/** 标题、日期必填（与 RN 的 AnniversarySchemaForm 一致） */
const rules: FormRules = {
  title: [{ required: true, message: '请填写标题' }],
  anniversaryDate: [{ required: true, message: '请选择日期' }]
}

const createDraftAnniversary = (): Anniversary => createAnniversaryDraft()

/*
 * 底部按钮：直接用 wot 的 wd-button，尺寸/圆角全走 wot 的 size 默认值，
 * 这里的 custom-style 只传颜色（「删除」镂空取主题色、「保存」实底用主题色）。
 */

const userStore = useUserStore()
const theme = userStore.theme

/** z-paging 只当滚动容器：列表数据恒为空，不参与渲染 */
const pagingRef = ref<any>(null)
const list = ref<unknown[]>([])

const queryList = () => {
  pagingRef.value?.complete([])
}

const id = ref('')
const form = ref<Anniversary>(createDraftAnniversary())

const checkForm = computed(
  () => !!form.value?.title?.trim() && !!form.value?.anniversaryDate
)

/** wd-datetime-picker（type=date）按时间戳传参（见文件头注释） */
const anniversaryDateValue = computed(() => {
  const date = form.value?.anniversaryDate
  return date ? dayjs(date).valueOf() : Date.now()
})

/** confirm 抛回来的 value 是时间戳 */
const onDateConfirm = ({ value }: { value: number | string }) => {
  form.value.anniversaryDate = dayjs(value).format('YYYY-MM-DD')
}

/** wd-input 的 update:model-value 直接给字符串（对应 RN：parseInt(t) || 1，非法输入兜底 1） */
const onReminderDaysInput = (value: string) => {
  const parsed = parseInt(value)
  form.value.reminderDays = isNaN(parsed) ? 1 : parsed
}

const loadAnniversary = async () => {
  // 列表页点进来时把整条记录放进了内存（common/pageParams），优先用它回显
  const cached = takePageParam<Anniversary>(PAGE_PARAMS.anniversary)
  if (cached && !id.value) {
    id.value = cached.id || ''
  }
  if (id.value) {
    let detail: Anniversary | undefined = cached || undefined
    if (!detail) {
      try {
        detail = await selectAnniversary(id.value)
      } catch (error) {
        toast('加载失败，请返回重试')
        return
      }
    }
    if (!detail) {
      toast('未加载到该纪念日数据')
      return
    }
    form.value = cloneDeep(detail) as Anniversary
  } else {
    form.value = createDraftAnniversary()
    form.value.id = nanoid()
  }
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
  const payload: Anniversary = {
    ...form.value,
    updateAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
  }
  try {
    if (id.value) {
      await updateAnniversary(payload)
    } else {
      await createAnniversary(payload)
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

const onDelete = async () => {
  const result = await Dialog.show({
    title: '提示',
    message: '删除后不可恢复，请谨慎操作',
    positiveText: '确定',
    negativeText: '取消'
  })
  if (result !== 'confirm') return
  try {
    await deleteAnniversary(form.value.id)
    Router.back()
  } catch (error) {
    Dialog.show({
      title: '提示',
      message: '删除失败，请稍后重试',
      positiveText: '我知道了'
    })
  }
}

onLoad((options?: any) => {
  id.value = options?.id || ''
  uni.setNavigationBarTitle({title: id.value ? '编辑纪念日' : '新增纪念日'})
  loadAnniversary()
})
</script>

<style lang="scss" scoped>
.edit-anniversary {
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
  /* 自绘行 label：28rpx = 14px，跟 wd-input 自带 label（wot 默认
     $-cell-title-fs: 14px）对齐。同一个表单里两种字号并排会看着不齐。 */
  &__label {
    font-size: 28rpx;
    color: #333;
  }
  /* 长文本：label 在上、textarea 在下，整体占一栏 */
  &__stack {
    display: flex;
    flex-direction: column;
  }
  &__label--top {
    margin-bottom: 12rpx;
  }
  &__required {
    color: #ff5252;
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
