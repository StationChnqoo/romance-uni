<!--
  新增/编辑分类
  由 cloud-react-native/src/screens/EditCategory/index.tsx 迁移。
  同一个页面按有没有 id 切换用途：RN 的 route.params.id 有值=编辑，无值=新增。

  - RN 自绘 ToolBar（标题按 id 切「编辑分类」/「新增分类」）
    -> uni-app 原生导航栏 + onLoad 里 setNavigationBarTitle 动态改标题。
  - 表单只有两个可编辑字段：标题、描述（都是右对齐、multiline 的输入框），
    再加创建时间/修改时间两行只读文本。分类没有图标字段（Category 类型里无 icon）。
  - 底部「删除」+「保存」并排，删除有二次确认（Dialog.show，文案照搬 RN）。
  - 保存调 POST /categories（upsert：body 带 id 就是编辑，不带就是新建），
    id 前端用 nanoid 生成，与 RN 一致。
  - 比 RN 多做了一件事：标题做了非空校验。RN 的 onSave 直接提交、空标题也能存进去，
    会存出一个空白分类，下回来连名字都看不见。
-->
<template>
  <view :style="themeVars" class="edit-category">
    <z-paging
      ref="pagingRef"
      v-model="list"
      class="edit-category__paging"
      :fixed="false"
      :auto="true"
      :refresher-enabled="false"
      :loading-more-enabled="false"
      :show-scrollbar="false"
      hide-empty-view
      @query="queryList"
    >
      <view class="edit-category__form">
        <Flex horizontal justify="space-between">
          <text class="edit-category__label">标题</text>
          <textarea
            v-model="form.title"
            class="edit-category__textarea"
            placeholder="标题"
            :maxlength="-1"
            :auto-height="true"
          />
        </Flex>
        <view class="edit-category__line" />

        <Flex horizontal justify="space-between">
          <text class="edit-category__label">描述</text>
          <textarea
            v-model="form.content"
            class="edit-category__textarea"
            placeholder="描述"
            :maxlength="-1"
            :auto-height="true"
          />
        </Flex>
        <view class="edit-category__line" />

        <Flex horizontal justify="space-between">
          <text class="edit-category__label">创建时间</text>
          <text class="edit-category__time">{{ form.createAt || '-' }}</text>
        </Flex>
        <view class="edit-category__line" />

        <Flex horizontal justify="space-between">
          <text class="edit-category__label">修改时间</text>
          <text class="edit-category__time">{{ form.updateAt || '-' }}</text>
        </Flex>
        <view class="edit-category__line" />
      </view>
    </z-paging>

    <view class="edit-category__footer">
      <Flex horizontal :custom-style="{ gap: '12px' }">
        <wd-button
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
          :custom-style="'flex: 1; min-width: 0; background-color: ' + theme"
          @click="onSave"
        >
          保存
        </wd-button>
      </Flex>
    </view>

    <DialogContainer />
  </view>
  <ToastContainer />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import dayjs from 'dayjs'
import { onLoad } from '@dcloudio/uni-app'
import { deleteCategory, mergeCategory, selectCategory } from '@/api'
import { Router } from '@/common/router'
import { Dialog } from '@/components/Dialog'
import DialogContainer from '@/components/DialogContainer.vue'
import ToastContainer from '@/components/ToastContainer.vue'
import Flex from '@/components/Flex.vue'
import { useUserStore } from '@/stores/user'
import { nanoid, toast } from '@/utils'
import { createCategory } from '@/types/media'
import type { Category } from '@/types/media'
import { useThemeVars } from '@/composables/useThemeVars'

const themeVars = useThemeVars()


/*
 * 底部按钮：直接用 wot 的 wd-button，尺寸/圆角全走 wot 的 size 默认值，
 * 这里的 custom-style 只传颜色（「删除」镂空取主题色、「保存」实底用主题色）。
 */
const userStore = useUserStore()
const theme = computed(() => userStore.theme)

const id = ref('')

const pagingRef = ref<any>(null)
const list = ref<unknown[]>([])

const form = ref<Category>(createCategory())


onLoad(async options => {
  id.value = options?.id ? decodeURIComponent(options.id) : ''
  // 标题按有无 id 切「新增分类」/「编辑分类」（RN 是同一个 ToolBar title 表达式）
  uni.setNavigationBarTitle({ title: id.value ? '编辑分类' : '新增分类' })
  if (id.value) {
    try {
      form.value = await selectCategory(id.value)
    } catch (error) {
      toast('加载失败，请返回重试')
    }
  } else {
    // 新建：前端生成 id（与 RN 的 nanoid 一致），接口是 upsert
    form.value.id = nanoid()
  }
  form.value.updateAt = dayjs().format('YYYY-MM-DD HH:mm:ss')
})

/** z-paging 在这里只当滚动容器用，列表恒空 */
const queryList = () => {
  pagingRef.value?.complete([])
}

const onSave = async () => {
  if (!form.value.title?.trim()) {
    Dialog.show({ title: '提示', message: '请输入标题', positiveText: '我知道了' })
    return
  }
  try {
    await mergeCategory({ ...form.value, title: form.value.title.trim() })
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
    await deleteCategory(form.value.id)
    Router.back()
  } catch (error) {
    Dialog.show({
      title: '提示',
      message: '删除失败，请稍后重试',
      positiveText: '我知道了'
    })
  }
}
</script>

<style lang="scss" scoped>
.edit-category {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #fff;

  /* :fixed="false" 时 z-paging 靠父容器 flex:1 撑高度，父容器必须有确定高度 */
  &__paging {
    flex: 1;
  }

  &__form {
    /* RN：<View style={{padding: 15}}>，15dp -> 30rpx */
    padding: 30rpx;
  }

  &__label {
    font-size: 28rpx;
    color: #333;
    font-weight: 500;
    flex-shrink: 0;
  }

  &__textarea {
    flex: 1;
    min-width: 0;
    text-align: right;
    font-size: 28rpx;
    color: #666;
    padding: 10rpx 0;
  }

  &__time {
    font-size: 26rpx;
    color: #999;
  }

  &__line {
    /* RN 的 loadLine() = styles.line { height:1, marginVertical:12 }，
       迁移时漏了 marginVertical -> 每行都挤在一起看着特别窄。12dp -> 24rpx */
    height: 2rpx;
    margin: 24rpx 0;
    background-color: #eee;
  }

  &__footer {
    flex-shrink: 0;
    padding: 20rpx 30rpx;
    background-color: #fff;
    border-top: 2rpx solid #eee;
  }
}
</style>
