<!--
  相亲对象 - 新增 / 编辑
  由 cloud-react-native/src/screens/EditDating/index.tsx 迁移。

  表单容器按用户要求换成 wot 的 wd-form（此前几个迁移页是手写 Flex + input）：
  - 文本类字段直接用 wd-input / wd-textarea（自带 label + prop，挂在 wd-form 上，不用 wd-form-item）；
    姓名必填（rules），保存前 validate()。
  - 籍贯：RN 的 CityPicker 自定义滚轮 -> wot 的 wd-picker（两列联动，columnChange 里 setColumnData 换市列表）。
  - 认识日期 / 最近联系：RN 的 DateTimePicker -> wot 的 wd-datetime-picker（type=date）。
    ⚠️ wd-datetime-picker 的 modelValue 必须是时间戳：它内部 `new Date(value)`，
    字符串会被按 UTC 解析，差时区就会显示错一天。
  - 当前状态：7 个药丸单选（自绘），颜色取 constants/datingData 的状态语义色。
  - 标签：MoreButton -> 通用 InputDialog -> DeleteableTags（不用 wot 的 wd-tag closable，它有写死的样式 bug）。
  - 头像：分包内的 FileUploader（mode="avatar"）—— 单张，点击弹系统相册，走同一套压缩 + 上传。

  骨架与其它编辑页一致：根 flex column 100vh + z-paging :fixed="false" 当滚动容器 + 底部固定操作条。
-->
<template>
  <view :style="themeVars" class="edit-dating">
    <z-paging
      ref="pagingRef"
      v-model="list"
      class="edit-dating__paging"
      :fixed="false"
      :auto="true"
      :refresher-enabled="false"
      :loading-more-enabled="false"
      hide-empty-view
      @query="queryList">
      <view class="edit-dating__form">
        <wd-form ref="formRef" :model="form" :rules="rules">
          <!-- 头像：独立居中模块，不与 label-value 行混排 -->
          <FileUploader :images="avatarImages" mode="avatar" @update:images="onAvatarChange" />
          <view class="edit-dating__line" />

          <wd-input
            v-model="form.name"
            label="姓名"
            prop="name"
            required
            clearable
            no-border
            align-right
            placeholder="例如：林知夏"
            :maxlength="-1" />
          <view class="edit-dating__line" />

          <wd-input
            :model-value="numberText(form.birthYear)"
            label="出生年份"
            type="number"
            clearable
            no-border
            align-right
            placeholder="如 1997"
            @update:model-value="onBirthYearInput" />
          <view class="edit-dating__line" />

          <wd-input
            :model-value="numberText(form.height)"
            label="身高"
            type="number"
            clearable
            no-border
            align-right
            placeholder="cm"
            @update:model-value="onHeightInput" />
          <view class="edit-dating__line" />

          <wd-input
            v-model="form.education"
            label="学历"
            clearable
            no-border
            align-right
            placeholder="选填，例如 硕士"
            :maxlength="-1" />
          <view class="edit-dating__line" />

          <wd-input
            v-model="form.job"
            label="职业"
            clearable
            no-border
            align-right
            placeholder="选填，例如 UI设计师"
            :maxlength="-1" />
          <view class="edit-dating__line" />

          <!-- 籍贯：两列联动（省 -> 市），confirm 回传的是各列 value 组成的数组 -->
          <Flex horizontal justify="space-between">
            <text class="edit-dating__label">籍贯</text>
            <wd-picker
              :model-value="cityValue"
              :columns="cityColumns"
              value-key="value"
              label-key="label"
              :root-portal="true"
              :z-index="999"
              :column-change="onCityColumnChange"
              @confirm="onCityConfirm">
              <MoreButton :label="cityLabel || '请选择'" />
            </wd-picker>
          </Flex>
          <view class="edit-dating__line" />

          <!-- 当前状态：平铺药丸单选 -->
          <view class="edit-dating__status">
            <text class="edit-dating__label">当前状态</text>
            <view class="edit-dating__status-tags">
              <view
                v-for="s in DATING_STATUS_OPTIONS"
                :key="s"
                class="edit-dating__status-tag"
                :style="statusTagStyle(s)"
                @click="form.status = s">
                <text class="edit-dating__status-tag-text" :style="{ color: statusTagColor(s) }">
                  {{ DATING_STATUS_LABEL[s] }}
                </text>
              </view>
            </view>
          </view>
          <view class="edit-dating__line" />

          <!-- 认识日期 -->
          <Flex horizontal justify="space-between">
            <text class="edit-dating__label">认识日期</text>
            <wd-datetime-picker
              :model-value="meetAtValue"
              type="date"
              :root-portal="true"
              :z-index="999"
              @confirm="onMeetAtConfirm">
              <MoreButton :label="form.meetAt || '请选择'" />
            </wd-datetime-picker>
          </Flex>
          <view class="edit-dating__line" />

          <!-- 最近联系 -->
          <Flex horizontal justify="space-between">
            <text class="edit-dating__label">最近联系</text>
            <wd-datetime-picker
              :model-value="latestContactValue"
              type="date"
              :root-portal="true"
              :z-index="999"
              @confirm="onLatestContactConfirm">
              <MoreButton :label="form.latestContactAt || '请选择'" />
            </wd-datetime-picker>
          </Flex>
          <view class="edit-dating__line" />

          <!-- 标签 -->
          <Flex horizontal justify="space-between">
            <text class="edit-dating__label">标签</text>
            <MoreButton
              :label="form.tags.length > 0 ? '继续添加' : '新增标签'"
              @press="tagInputVisible = true" />
          </Flex>
          <view v-if="form.tags.length" class="edit-dating__tags">
            <DeleteableTags :datas="form.tags" @delete="onTagDelete" />
          </view>
          <view class="edit-dating__line" />

          <!-- 描述：label 在上、textarea 在下，别挤在右侧窄空间里 -->
          <view class="edit-dating__stack">
            <text class="edit-dating__label edit-dating__label--top">
              基本描述 / 第一印象
            </text>
            <wd-textarea
              v-model="form.description"
              placeholder="例如：朋友婚礼上认识的，气质安静..."
              :maxlength="-1"
              auto-height
              no-border />
          </view>
          <!-- ★最后一行后不画 __line -->
        </wd-form>
      </view>
    </z-paging>

    <view class="edit-dating__divider" />
    <Flex horizontal :custom-style="{ padding: '20rpx 30rpx', gap: '12px' }">
      <wd-button
        v-if="id"
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

    <InputDialog
      :show="tagInputVisible"
      title="新增标签"
      message="请输入标签内容，例如：温柔"
      placeholder="请输入"
      confirm-text="确定"
      @close="tagInputVisible = false"
      @confirm="onTagAppend" />

    <DialogContainer />
  </view>
  <ToastContainer />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import dayjs from 'dayjs'
import { deleteDating, mergeDating, selectDating } from '@/api'
import { Router } from '@/common/router'
import DeleteableTags from '@/components/DeleteableTags.vue'
import DialogContainer from '@/components/DialogContainer.vue'
import ToastContainer from '@/components/ToastContainer.vue'
import Flex from '@/components/Flex.vue'
import InputDialog from '@/components/InputDialog.vue'
import MoreButton from '@/components/MoreButton.vue'
import { Dialog } from '@/components/Dialog'
import FileUploader from '@/components/FileUploader.vue'
import { useUserStore } from '@/stores/user'
import { useChinaCitiesStore } from '@/stores/chinaCities'
import { cloneDeep, nanoid, toast } from '@/utils'
import {
  DATING_STATUS_LABEL,
  DATING_STATUS_OPTIONS
} from '@/constants/datingData'
import { getCityFullName } from '@/constants/chinaCities'
import type { DatingStatus, Dating } from '@/types/dating'
import type { PicGoSrc } from '@/types/media'
import type { FormInstance, FormRules } from 'wot-design-uni/components/wd-form/types'
import type { ColumnItem } from 'wot-design-uni/components/wd-picker-view/types'
import { useThemeVars } from '@/composables/useThemeVars'

const themeVars = useThemeVars()


const userStore = useUserStore()
const theme = computed(() => userStore.theme)
/** 籍贯数据从 store 读（首页统一拉取 + persist），本页只消费 */
const chinaCitiesStore = useChinaCitiesStore()

const formRef = ref<FormInstance>()

/** 姓名必填 */
const rules: FormRules = {
  name: [{ required: true, message: '请填写姓名' }]
}

/** z-paging 只当滚动容器：数据恒空、内容走默认插槽，必须 hide-empty-view */
const pagingRef = ref<any>(null)
const list = ref<unknown[]>([])

const queryList = () => {
  pagingRef.value?.complete([])
}

const id = ref('')

/**
 * 表单结构 = Dating（= DatingBase + progresses）。
 * 为什么带 progresses：mergeDating 的入参就是 Dating，编辑态要把它原样带回去
 * （RN 的 EditDating 也是这么做的，EMPTY 里也留着 progresses: []）。
 */
const emptyDating = (): Dating => ({
  id: '',
  name: '',
  avatar: '',
  tags: [],
  status: 'talking',
  description: '',
  progresses: [],
  createAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  updateAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
})

const form = ref<Dating>(emptyDating())

/** 头像：FileUploader 要 PicGoSrc[]，受控在页面侧（单张） */
const avatarImages = ref<PicGoSrc[]>([])

const onAvatarChange = (imgs: PicGoSrc[]) => {
  avatarImages.value = imgs
  form.value.avatar = imgs[0]?.url || ''
}

/* ---------------- 数字类字段 ---------------- */
const numberText = (n?: number) => (n || n === 0 ? String(n) : '')

const onNumberInput = (key: 'birthYear' | 'height', value: string) => {
  const parsed = parseInt(value, 10)
  form.value[key] = isNaN(parsed) ? undefined : parsed
}

/**
 * 模板专用：把 key 固定住的两个 handler。
 *
 * ★ 不写成模板里的 @update:model-value="(v: string) => onNumberInput('birthYear', v)"：
 *   模板表达式由 @vue/compiler-dom 交给 babel 解析，参数上的 TS 类型标注只有在显式开启
 *   typescript 表达式插件时才成立（Volar / Vite 都开了，所以能跑），未开启该插件的解析器
 *   （部分编辑器的高亮引擎）会直接解析失败、从那一行起整片跑偏。
 */
const onBirthYearInput = (value: string) => onNumberInput('birthYear', value)
const onHeightInput = (value: string) => onNumberInput('height', value)

/* ---------------- 籍贯（wd-picker 两列联动，数据在线加载） ---------------- */
/** 省列：随 store 内 cities 加载自动填充 */
const provinceOptions = computed<ColumnItem[]>(() =>
  chinaCitiesStore.cities.map(p => ({ label: p.name, value: p.code }))
)

const citiesOf = (provinceCode: string): ColumnItem[] => {
  const province = chinaCitiesStore.cities.find(p => p.code === provinceCode)
  return (province?.cities || []).map(c => ({ label: c.name, value: c.code }))
}

/** 当前省编码：等数据加载后由 loadDating 按已选城市反推；初始空，cityColumns 用首省兜底 */
const provinceCode = ref('')

/** 两列：省列 + 当前省对应的市列，随 cities / provinceCode 联动（provinceCode 空时用首省） */
const cityColumns = computed<ColumnItem[][]>(() => {
  const pc = provinceCode.value || String(provinceOptions.value[0]?.value ?? '') || ''
  return [provinceOptions.value, citiesOf(pc)]
})

/** wd-picker 的 modelValue：多列要传「各列 value 组成的数组」 */
const cityValue = computed(() => {
  const code = form.value.city
  if (!code) return []
  return [code.slice(0, 2) + '0000', code]
})

const cityLabel = computed(() => getCityFullName(form.value.city || ''))

/**
 * 换省 -> 重设市列的候选（setColumnData 内部会把该列选中下标夹到 0）。
 * 函数必须是 4 个形参才会走「异步 + resolve」那条分支（wot 内部按 fn.length 判断）。
 */
const onCityColumnChange = (
  pickerView: any,
  selects: any,
  index: number,
  resolve: () => void
) => {
  if (index === 0) {
    const picks = Array.isArray(selects) ? selects : [selects]
    const picked = String(picks?.[0]?.value ?? '')
    if (picked) {
      provinceCode.value = picked
      pickerView.setColumnData(1, citiesOf(picked))
    }
  }
  resolve()
}

/** confirm 回传 { value: 各列 value 数组, selectedItems } */
const onCityConfirm = ({ value }: { value: string | number | (string | number)[] }) => {
  const values = Array.isArray(value) ? value.map(String) : [String(value)]
  // 第二列是市；理论上都在，取不到就退回省
  form.value.city = values[1] || values[0] || ''
}

/* ---------------- 状态药丸 ---------------- */
/** 选中态统一主题色（边框 + 主题色 8% 底色 + 主题色文字），未选中灰，不再用各状态杂色 */
const statusTagStyle = (s: DatingStatus) =>
  form.value.status === s
    ? { borderColor: theme.value, backgroundColor: `${theme.value}14` }
    : { borderColor: '#e2e2e2', backgroundColor: '#fafafa' }

const statusTagColor = (s: DatingStatus) =>
  form.value.status === s ? theme.value : '#555'

/* ---------------- 日期 ---------------- */
/** wd-datetime-picker 按时间戳传参（见文件头注释） */
const meetAtValue = computed(() => {
  const date = form.value.meetAt
  return date ? dayjs(date).valueOf() : Date.now()
})

const latestContactValue = computed(() => {
  const date = form.value.latestContactAt
  return date ? dayjs(date).valueOf() : Date.now()
})

const onMeetAtConfirm = ({ value }: { value: number | string }) => {
  form.value.meetAt = dayjs(value).format('YYYY-MM-DD')
}

const onLatestContactConfirm = ({ value }: { value: number | string }) => {
  form.value.latestContactAt = dayjs(value).format('YYYY-MM-DD')
}

/* ---------------- 标签 ---------------- */
const tagInputVisible = ref(false)

const onTagAppend = (s: string) => {
  const tag = (s || '').trim()
  if (tag) {
    // 去重（RN 同款：Array.from(new Set(...))）
    form.value.tags = Array.from(new Set([...form.value.tags, tag]))
  }
  tagInputVisible.value = false
}

const onTagDelete = (index: number) => {
  const tags = [...form.value.tags]
  tags.splice(index, 1)
  form.value.tags = tags
}

/* ---------------- 加载 / 保存 / 删除 ---------------- */
const loadDating = async () => {
  if (!id.value) {
    form.value = { ...emptyDating(), id: nanoid() }
    return
  }
  try {
    const detail = await selectDating(id.value)
    if (!detail) return
    form.value = cloneDeep(detail)
    // 已选城市的省，决定市列初值（cityColumns 是 computed，会随 provinceCode 自动重算）
    if (form.value.city) provinceCode.value = form.value.city.slice(0, 2) + '0000'
    // 头像回显：后端只存一个 URL，这里包成 PicGoSrc 喂给 FileUploader
    avatarImages.value = form.value.avatar
      ? [
          {
            id: `avatar-${form.value.id}`,
            mimeType: 'image/jpeg',
            name: form.value.name || 'avatar',
            size: 0,
            objectKey: '',
            updateAt: form.value.updateAt || form.value.createAt,
            url: form.value.avatar
          }
        ]
      : []
  } catch (error) {
    // 加载失败保持空表单（RN 同款）
  }
}

const onSave = async () => {
  const check = await formRef.value?.validate()
  if (check && !check.valid) {
    toast(check.errors[0]?.message || '请检查表单后重试')
    return
  }
  const saved: Dating = {
    ...form.value,
    name: form.value.name.trim(),
    description: form.value.description?.trim() || '',
    updateAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
  }
  try {
    await mergeDating(saved)
    toast('操作成功')
    Router.back()
  } catch (error) {
    toast('保存失败')
  }
}

const onDelete = async () => {
  const result = await Dialog.show({
    title: '提示',
    message: '删除后，该对象下所有进度记录都会一并移除，确定继续？',
    positiveText: '删除',
    negativeText: '取消'
  })
  if (result !== 'confirm') return
  try {
    await deleteDating(form.value.id)
    toast('已删除')
    Router.back()
  } catch (error) {
    toast('删除失败')
  }
}

onLoad((options?: any) => {
  // onLoad 入参已被 uni 统一 decode 过一次，这里不要再 decodeURIComponent
  id.value = options?.id || ''
  uni.setNavigationBarTitle({ title: id.value ? '编辑相亲对象' : '新增相亲对象' })
  loadDating()
})
</script>

<style lang="scss" scoped>
.edit-dating {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fff;

  &__paging {
    flex: 1;
  }
  &__form {
    padding: 30rpx;
    /* wd-input / wd-textarea 的 cell 模式自带上下 10px + 左右 15px 内边距，
       行距与左右留白由页面的 __form / __line 控制，这里清零 */
    --wot-input-cell-padding: 0;
    --wot-input-padding: 0;
    --wot-textarea-cell-padding: 0;
    --wot-textarea-padding: 0;
  }
  /* 自绘行 label：28rpx = 14px，跟 wd-input 自带 label 的字号对齐 */
  &__label {
    font-size: 28rpx;
    color: #333;
  }
  &__label--top {
    margin-bottom: 12rpx;
  }
  /* 长文本：label 在上、textarea 在下 */
  &__stack {
    display: flex;
    flex-direction: column;
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

  &__status {
    display: flex;
    flex-direction: column;
  }
  &__status-tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16rpx;
    margin-top: 20rpx;
  }
  &__status-tag {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64rpx;
    padding: 0 28rpx;
    border: 1px solid;
    border-radius: 32rpx;
  }
  &__status-tag-text {
    font-size: 26rpx;
    font-weight: 500;
  }

  &__tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 16rpx;
    margin-top: 20rpx;
  }
}
</style>
