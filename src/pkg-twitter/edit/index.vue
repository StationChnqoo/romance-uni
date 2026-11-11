<!--
  Twitter 博主 - 新增 / 编辑
  由 EditDating 的表单范式迁移（wd-form + wd-input/wd-textarea + MoreButton 标签）。

  - 昵称必填（rules），保存前 validate()。
  - 账号(handle)、主页链接(twitterUrl) 为链接/短文本 → wd-input（handle）/
    自绘 __stack + wd-textarea（URL 类字段，长地址折行、label 在上、输入框全宽，不传 label）。
  - 头像(avatar)：图片上传（FileUploader mode="avatar"），单张，删除角标连 COS 一起删，
    写回的 url 存进 form.avatar（不再手贴 URL）。
  - 标签：MoreButton -> 通用 InputDialog -> DeleteableTags。
  - 简介 / 备注：自绘 __stack + wd-textarea（label 在上、高度自适应）。

  骨架与其它编辑页一致：根 flex column 100vh + z-paging :fixed="false" 当滚动容器 + 底部固定操作条。
-->
<template>
  <view :style="themeVars" class="edit-twitter">
    <z-paging
      ref="pagingRef"
      v-model="list"
      class="edit-twitter__paging"
      :fixed="false"
      :auto="true"
      :refresher-enabled="false"
      :loading-more-enabled="false"
      hide-empty-view
      @query="queryList">
      <view class="edit-twitter__form">
        <wd-form ref="formRef" :model="form" :rules="rules">
          <wd-input
            v-model="form.name"
            label="昵称"
            prop="name"
            required
            clearable
            no-border
            align-right
            placeholder="例如：Elon Musk"
            :maxlength="-1" />
          <view class="edit-twitter__line" />

          <wd-input
            v-model="form.handle"
            label="账号"
            clearable
            no-border
            align-right
            placeholder="例如：@elonmusk"
            :maxlength="-1" />
          <view class="edit-twitter__line" />

          <!-- 主页链接：URL 类，label 在上、textarea 在下，全宽 -->
          <view class="edit-twitter__stack">
            <text class="edit-twitter__label edit-twitter__label--top">主页链接</text>
            <wd-textarea
              v-model="form.twitterUrl"
              placeholder="例如：https://x.com/elonmusk"
              :maxlength="-1"
              auto-height
              no-border />
          </view>
          <view class="edit-twitter__line" />

          <!-- 头像：图片上传（FileUploader mode="avatar"），单张，删角标连 COS 一起删 -->
          <FileUploader :images="avatarImages" mode="avatar" @update:images="onAvatarChange" />
          <view class="edit-twitter__line" />

          <!-- 标签 -->
          <Flex horizontal justify="space-between">
            <text class="edit-twitter__label">标签</text>
            <MoreButton
              :label="form.tags.length > 0 ? '继续添加' : '新增标签'"
              @press="tagInputVisible = true" />
          </Flex>
          <view v-if="form.tags.length" class="edit-twitter__tags">
            <DeleteableTags :datas="form.tags" @delete="onTagDelete" />
          </view>
          <view class="edit-twitter__line" />

          <!-- 简介：label 在上、textarea 在下 -->
          <view class="edit-twitter__stack">
            <text class="edit-twitter__label edit-twitter__label--top">简介</text>
            <wd-textarea
              v-model="form.description"
              placeholder="例如：特斯拉 / SpaceX CEO，主要聊航天与 AI"
              :maxlength="-1"
              auto-height
              no-border />
          </view>
          <view class="edit-twitter__line" />

          <!-- 备注：label 在上、textarea 在下 -->
          <view class="edit-twitter__stack">
            <text class="edit-twitter__label edit-twitter__label--top">备注</text>
            <wd-textarea
              v-model="form.remark"
              placeholder="选填，自己的备注信息"
              :maxlength="-1"
              auto-height
              no-border />
          </view>
          <!-- ★最后一行后不画 __line -->
        </wd-form>
      </view>
    </z-paging>

    <view class="edit-twitter__divider" />
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
      message="请输入标签内容，例如：财经"
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
import { deleteTwitterBlogger, mergeTwitterBlogger, selectTwitterBlogger } from '@/api'
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
import { cloneDeep, nanoid, toast } from '@/utils'
import type { TwitterBlogger } from '@/types/twitter'
import type { PicGoSrc } from '@/types/media'
import type { FormInstance, FormRules } from 'wot-design-uni/components/wd-form/types'
import { useThemeVars } from '@/composables/useThemeVars'

const themeVars = useThemeVars()


const userStore = useUserStore()
const theme = computed(() => userStore.theme)

const formRef = ref<FormInstance>()

/** 昵称必填 */
const rules: FormRules = {
  name: [{ required: true, message: '请填写昵称' }]
}

/** z-paging 只当滚动容器：数据恒空、内容走默认插槽，必须 hide-empty-view */
const pagingRef = ref<any>(null)
const list = ref<unknown[]>([])

const queryList = () => {
  pagingRef.value?.complete([])
}

const id = ref('')

/**
 * 表单结构 = TwitterBlogger。id 由前端 nanoid 预生成（merge 语义，后端没传则新生成）。
 */
const emptyTwitterBlogger = (): TwitterBlogger => ({
  id: '',
  name: '',
  handle: '',
  avatar: '',
  twitterUrl: '',
  tags: [],
  description: '',
  remark: '',
  createAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  updateAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
})

const form = ref<TwitterBlogger>(emptyTwitterBlogger())

/** 头像：FileUploader 要 PicGoSrc[]，受控在页面侧（单张） */
const avatarImages = ref<PicGoSrc[]>([])

const onAvatarChange = (imgs: PicGoSrc[]) => {
  avatarImages.value = imgs
  form.value.avatar = imgs[0]?.url || ''
}

/* ---------------- 标签 ---------------- */
const tagInputVisible = ref(false)

const onTagAppend = (s: string) => {
  const tag = (s || '').trim()
  if (tag) {
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
const loadTwitterBlogger = async () => {
  if (!id.value) {
    form.value = { ...emptyTwitterBlogger(), id: nanoid() }
    return
  }
  try {
    const detail = await selectTwitterBlogger(id.value)
    if (!detail) return
    form.value = cloneDeep(detail)
    // 头像回显：后端只存一个 URL，这里包成 PicGoSrc 喂给 FileUploader
    avatarImages.value = form.value.avatar
      ? [{
          id: `avatar-${form.value.id}`,
          mimeType: 'image/jpeg',
          name: form.value.name || 'avatar',
          size: 0,
          objectKey: '',
          updateAt: form.value.updateAt || form.value.createAt,
          url: form.value.avatar
        }]
      : []
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
  const saved: TwitterBlogger = {
    ...form.value,
    name: form.value.name.trim(),
    handle: form.value.handle?.trim() || '',
    twitterUrl: form.value.twitterUrl?.trim() || '',
    avatar: form.value.avatar?.trim() || '',
    description: form.value.description?.trim() || '',
    remark: form.value.remark?.trim() || '',
    updateAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
  }
  try {
    await mergeTwitterBlogger(saved)
    toast('操作成功')
    Router.back()
  } catch (error) {
    toast('保存失败')
  }
}

const onDelete = async () => {
  const result = await Dialog.show({
    title: '提示',
    message: '确定要删除该博主收藏吗？',
    positiveText: '删除',
    negativeText: '取消'
  })
  if (result !== 'confirm') return
  try {
    await deleteTwitterBlogger(form.value.id)
    toast('已删除')
    Router.back()
  } catch (error) {
    toast('删除失败')
  }
}

onLoad((options?: any) => {
  // onLoad 的入参已被 uni 统一 decode 过一次，这里不要再 decodeURIComponent
  id.value = options?.id || ''
  uni.setNavigationBarTitle({ title: id.value ? '编辑博主' : '新增博主' })
  loadTwitterBlogger()
})
</script>

<style lang="scss" scoped>
.edit-twitter {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fff;

  &__paging {
    flex: 1;
  }
  &__form {
    padding: 30rpx;
    /* wd-input / wd-textarea 的 cell 模式自带上下 10px + 左右 15px 内边距，这里清零 */
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
  /* 长文本 / URL：label 在上、textarea 在下 */
  &__stack {
    display: flex;
    flex-direction: column;
  }
  &__line {
    height: 1px;
    margin: 24rpx 0;
    background-color: #eee;
  }
  &__divider {
    height: 1px;
    background-color: #eee;
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
