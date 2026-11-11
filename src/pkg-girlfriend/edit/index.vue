<!--
  关于她 · 小事记 —— 新增 / 编辑
  记录女朋友说的每一件事。

  - 原生导航栏（pages.json navigationStyle: default），标题随新增 / 编辑切换。
  - 表单：wd-form（内容必填，rules 校验），输入行 wd-input / wd-textarea 直挂 prop，不用 wd-form-item。
  - ★ 长文本（她说了什么 / 我的备注）一律 wd-textarea + auto-height 且**不传 label**：
    传 label 会进 is-cell 布局，label 固定 33% 窄栏把长文本挤折行；独占整行 = 自绘 label 在上。
  - ★ 标注区只有两组且是两种控件（原来四组同款药丸互相撞义，见模板内注释）：
    态度 = 普通 MoreButton（当前值直接当 label）+ 普通 wd-action-sheet（4 个药丸横排一行
    放不下；弹层只用纯文字选项 + 取消，不画语义色圆图标 / 选中浅底 / 勾），
    状态 = 一行 wd-radio（shape="dot" + inline）。
    ★ 回显不再自绘浅底卡片 + 语义色圆图标：和日期、标签行一样用项目现成的 MoreButton。
    「分量」已删（由星标接住）；「主题归类」整条删除，查找交给搜索 + 自由标签。
  - ★ 编辑页不设星标开关：列表卡片右侧星标可直接切换（重复入口），且「置顶提醒自己」
    这句不兑现（默认排序是最新在前）。form.starred 仍保留并随详情回显，否则编辑保存时
    后端会把已有星标按 null 落成 false。
  - 标签走项目统一范式：MoreButton -> InputDialog -> DeleteableTags（chip 可单个删除），
    不再用逗号串 wd-input，也不用 wot 的 wd-tag closable（关闭图标写死深灰实心圆）。
  - 日期：wd-datetime-picker（type=date）走默认插槽自己当触发器，按时间戳传。
  - 附件：复用根组件 FileUploader（v-model:images）—— 压缩两步确认 + /upload/cloud 上传 +
    全屏 loading 遮罩都是项目现成链路，不另造一套。
  - 回显：列表页只传 id，整条记录从后端 /girl-notes/{id} 取（大对象不走 URL，也不需要 pageParams）。
  - 确认弹窗只用 Dialog.show（根挂 DialogContainer）；轻提示一律 toast()。
  - z-paging 只当滚动容器（:fixed="false" + hide-empty-view），表单没有分页数据。
-->
<template>
  <view :style="themeVars" class="ge lv-page">
    <z-paging
      ref="pagingRef"
      v-model="list"
      class="ge__paging"
      :fixed="false"
      :auto="true"
      :refresher-enabled="false"
      :loading-more-enabled="false"
      hide-empty-view
      @query="queryList">
      <view class="ge__form">
        <wd-form ref="formRef" :model="form" :rules="rules">
          <!-- 她说了什么：唯一必填项，尽量用原话 -->
          <view class="ge__stack">
            <text class="ge__label ge__label--top">
              <text>她说了什么</text>
              <text class="ge__required"> *</text>
            </text>
            <wd-textarea
              v-model="form.content"
              prop="content"
              required
              clearable
              no-border
              auto-height
              :maxlength="-1"
              placeholder="比如：路过那家店的时候说，好想吃草莓蛋糕啊" />
          </view>
          <view class="ge__line" />

          <!-- ★ 标注区：原来「态度 / 主题 / 分量 / 状态」四组同款药丸 + 四条分隔线，
               视觉上像同一个控件复制四遍，且「随口」「别忘」「需避开」互相撞义。
               收敛后只剩两组、用两种控件、组内不画线：
                 态度 = 普通 MoreButton 回显 + 普通 wd-action-sheet（选中即关闭）
                 状态 = 一行 radio（只回答办没办，比等分大方块轻得多）
               「分量」删掉由星标接住；「主题归类」整条删除，不再占一行选择器。 -->
          <view class="ge__block">
            <Flex horizontal justify="space-between">
              <text class="ge__label">这句话属于哪一类 <text class="ge__required">*</text></text>
              <MoreButton
                :label="attitudeOf(form.attitude).label"
                @press="attitudeVisible = true" />
            </Flex>

            <view class="ge__stack ge__stack--gap">
              <text class="ge__label ge__label--top">后来怎么样了</text>
              <!-- 三个选项一行 radio 摆得开，不用再占一整条等分大方块。
                   shape="dot" + inline 是项目验证过的口径（同 pkg-settings/settings）：
                   不加 inline 时 wd-radio 是块级 flex，会竖排独占三行。 -->
              <wd-radio-group v-model="form.status" shape="dot" inline>
                <wd-radio
                  v-for="state in GIRL_STATUSES"
                  :key="state.key"
                  :value="state.key">
                  {{ state.label }}
                </wd-radio>
              </wd-radio-group>
            </view>
          </view>
          <view class="ge__line" />

          <!-- 日期 -->
          <Flex horizontal justify="space-between">
            <text class="ge__label">什么时候说的</text>
            <wd-datetime-picker
              :model-value="saidAtValue"
              type="date"
              :root-portal="true"
              :z-index="999"
              @confirm="onDateConfirm">
              <MoreButton :label="form.saidAt || '请选择日期'" />
            </wd-datetime-picker>
          </Flex>
          <view class="ge__line" />

          <!-- 当时的情境：短文本，用 wd-input 自带 label -->
          <wd-input
            v-model="form.scene"
            label="当时的情境"
            align-right
            no-border
            clearable
            placeholder="比如：周五下班，一起走回家" />
          <view class="ge__line" />

          <!-- 我的备注：长文本，label 自绘在上 -->
          <view class="ge__stack">
            <text class="ge__label ge__label--top">我的备注 / 打算怎么做</text>
            <wd-textarea
              v-model="form.memo"
              :maxlength="-1"
              auto-height
              no-border
              placeholder="比如：下周六买一个带过去；点菜时记得备注不加香菜" />
          </view>
          <view class="ge__line" />

          <!-- 标签：项目统一范式 MoreButton -> InputDialog -> DeleteableTags。
               不用 wd-input 逗号串（不可单个删除），也不用 wot 的 wd-tag closable
               （关闭图标写死深灰实心圆，公共组件注释里有说明）。 -->
          <Flex horizontal justify="space-between">
            <text class="ge__label">标签</text>
            <MoreButton
              :label="form.tags.length ? '继续添加' : '新增标签'"
              @press="tagInputVisible = true" />
          </Flex>
          <view v-if="form.tags.length" class="ge__tags">
            <DeleteableTags :datas="form.tags" @delete="onTagDelete" />
          </view>
          <view class="ge__line" />

          <!-- 附件：复用根组件 FileUploader（压缩 + 上传 + 预览 + 删除全是现成链路） -->
          <view class="ge__stack">
            <text class="ge__label ge__label--top">附件</text>
            <FileUploader v-model:images="attachments" />
          </view>
        </wd-form>
      </view>
    </z-paging>

    <view class="ge__divider" />
    <Flex horizontal :custom-style="{ padding: '20rpx 30rpx', gap: '12px' }">
      <wd-button
        v-if="id"
        block
        plain
        :round="false"
        :custom-style="deleteBtnStyle"
        @click="onDelete">
        删除
      </wd-button>
      <wd-button
        block
        :round="false"
        :disabled="!checkForm"
        :custom-style="saveBtnStyle"
        @click="onSave">
        保存
      </wd-button>
    </Flex>

    <!-- 新增标签：通用输入弹窗，@confirm 回传已 trim 的文本；一次可用逗号加多个 -->
    <InputDialog
      :show="tagInputVisible"
      title="新增标签"
      message="比如：忌口、生日、草莓（逗号分开可一次加多个）"
      placeholder="请输入标签"
      confirm-text="确定"
      @close="tagInputVisible = false"
      @confirm="onTagAppend" />

    <!-- 态度：普通 wd-action-sheet，纯文字选项 + 取消；当前值显示在表单那行 MoreButton 上。
         与项目其它弹层同口径开 root-portal + 显式层级，避免被页面子树困住。 -->
    <wd-action-sheet
      v-model="attitudeVisible"
      :actions="ATTITUDE_ACTIONS"
      :root-portal="true"
      :z-index="999"
      :close-on-click-action="true"
      cancel-text="取消"
      @select="onAttitudeSelect" />

    <DialogContainer />
  </view>
  <ToastContainer />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import dayjs from 'dayjs'
import ToastContainer from '@/components/ToastContainer.vue'
import DialogContainer from '@/components/DialogContainer.vue'
import DeleteableTags from '@/components/DeleteableTags.vue'
import InputDialog from '@/components/InputDialog.vue'
import { Dialog } from '@/components/Dialog'
import FileUploader from '@/components/FileUploader.vue'
import Flex from '@/components/Flex.vue'
import MoreButton from '@/components/MoreButton.vue'
import { Router } from '@/common/router'
import { useUserStore } from '@/stores/user'
import { useThemeVars } from '@/composables/useThemeVars'
import { toast } from '@/utils'
import { deleteGirlNote, mergeGirlNote, selectGirlNote } from '@/api'
import { createGirlNote } from '@/types/girlfriend'
import type { GirlNote } from '@/types/girlfriend'
import type { PicGoSrc } from '@/types/media'
import type { FormInstance, FormRules } from 'wot-design-uni/components/wd-form/types'
import {
  GIRL_ATTITUDES,
  GIRL_STATUSES,
  attitudeOf
} from '@/constants/girlfriend'

const themeVars = useThemeVars()
const userStore = useUserStore()
const theme = computed(() => userStore.theme)

const formRef = ref<FormInstance>()
const rules: FormRules = {
  content: [{ required: true, message: '先写下她说了什么吧' }]
}

/** z-paging 只当滚动容器：列表数据恒空，不参与渲染 */
const pagingRef = ref<any>(null)
const list = ref<unknown[]>([])
const queryList = () => {
  pagingRef.value?.complete([])
}

const id = ref('')
const form = ref<GirlNote>(createGirlNote())
const tagInputVisible = ref(false)
const attitudeVisible = ref(false)

/** 普通 action sheet 只要纯文字选项；顺序与 GIRL_ATTITUDES 一致，按 index 回写 */
const ATTITUDE_ACTIONS = GIRL_ATTITUDES.map(it => ({ name: it.label }))
const onAttitudeSelect = ({ index }: { index: number }) => {
  form.value.attitude = GIRL_ATTITUDES[index].key
}

const checkForm = computed(() => !!form.value?.content?.trim())

/** FileUploader 要 PicGoSrc[]，用 computed 中转，v-model:images 才能直接写回 form */
const attachments = computed<PicGoSrc[]>({
  get: () => form.value.attachments,
  set: value => {
    form.value.attachments = value
  }
})

/** wd-datetime-picker（type=date）按时间戳传参 */
const saidAtValue = computed(() => {
  const date = form.value?.saidAt
  return date ? dayjs(date).valueOf() : Date.now()
})
const onDateConfirm = ({ value }: { value: number | string }) => {
  form.value.saidAt = dayjs(value).format('YYYY-MM-DD')
}

/* ---------------- 标签（DeleteableTags 范式） ---------------- */
/** @confirm 回传已 trim 的文本；逗号 / 顿号可一次加多个，按 Set 去重 */
const onTagAppend = (raw: string) => {
  const incoming = (raw || '')
    .split(/[,，、]/)
    .map(it => it.trim())
    .filter(Boolean)
  if (incoming.length) {
    form.value.tags = Array.from(new Set([...form.value.tags, ...incoming]))
  }
  tagInputVisible.value = false
}
const onTagDelete = (index: number) => {
  const tags = [...form.value.tags]
  tags.splice(index, 1)
  form.value.tags = tags
}

/* ---------------- 底部按钮 ---------------- */
const deleteBtnStyle =
  'flex: 1; min-width: 0; background-color: #fff; color: #c6544a; border-color: #ecd4d0;'
const saveBtnStyle = computed(() =>
  `flex: 1; min-width: 0; background-color: ${theme.value}; color: #fff; border-color: ${theme.value};`
)

/* ---------------- 载入 / 保存 ---------------- */
onLoad((options?: any) => {
  id.value = options?.id || ''
  uni.setNavigationBarTitle({ title: id.value ? '编辑这件小事' : '记一件小事' })
  // 新增态 id 留空，由后端 nanoid 生成；不再前端预生成
  form.value = createGirlNote()
  if (id.value) loadDetail()
})

/** 列表页只传 id，整条记录从详情接口取；后端可空字段统一归一化，避免 wd-input 收到 null */
const loadDetail = async () => {
  try {
    const detail = await selectGirlNote(id.value)
    form.value = {
      ...createGirlNote(),
      ...detail,
      scene: detail.scene || '',
      memo: detail.memo || '',
      tags: detail.tags || [],
      attachments: detail.attachments || [],
      starred: !!detail.starred
    }
  } catch (e) {
    /* 失败留在空表单，http 层已提示 */
  }
}

const onSave = async () => {
  const check = await formRef.value?.validate()
  if (check && !check.valid) {
    toast(check.errors[0]?.message || '请检查表单')
    return
  }
  try {
    await mergeGirlNote(form.value)
    toast(id.value ? '已更新' : '记下了')
    Router.back()
  } catch (e) {
    /* 失败留在编辑页，http 层已提示 */
  }
}

const onDelete = async () => {
  const ok = await Dialog.show({
    title: '删掉这条？',
    message: '删除之后就找不回来了。',
    positiveText: '确定',
    negativeText: '取消'
  })
  if (ok !== 'confirm') return
  try {
    await deleteGirlNote(id.value)
    toast('已删除')
    Router.back()
  } catch (e) {
    /* 失败留在编辑页，http 层已提示 */
  }
}
</script>

<style lang="scss" scoped>
.ge {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: transparent;

  &__paging {
    flex: 1;
  }
  &__form {
    margin: 30rpx;
    padding: 24rpx 24rpx;
    border-radius: 32rpx;
    background-color: #fff;
    /* wd-input / wd-textarea 的 cell 模式自带上下内边距，行距由 __line 控制，这里清零 */
    --wot-input-cell-padding: 0;
    --wot-input-padding: 0;
    --wot-textarea-cell-padding: 0;
    --wot-textarea-padding: 0;
  }
  &__stack {
    display: flex;
    flex-direction: column;
  }
  /* 标注区两组之间只留间距，不再画分隔线（原来四组各一条线是重复感的来源） */
  &__stack--gap {
    margin-top: 32rpx;
  }
  &__block {
    display: flex;
    flex-direction: column;
  }
  /* 自绘行 label：28rpx = wd-input 自带 label 的 14px，两种字号并排会看着不齐 */
  &__label {
    font-size: 28rpx;
    color: var(--love-ink);
  }
  &__label--top {
    margin-bottom: 12rpx;
  }
  &__required {
    color: #c6544a;
  }
  &__line {
    height: 1rpx;
    background-color: var(--love-line);
    margin: 24rpx 0;
  }
  &__divider {
    height: 1rpx;
    background-color: var(--love-line);
  }
  /* 标签 chip 组：DeleteableTags 内部已 flex 折行，这里只管与上方输入框的间距 */
  &__tags {
    margin-top: 16rpx;
  }
}
</style>
