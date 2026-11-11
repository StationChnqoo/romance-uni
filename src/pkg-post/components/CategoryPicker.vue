<!--
  笔记分类选择弹窗（编辑笔记页底部弹层）
  由 pkg-post/edit/index.vue 内的弹层抽出来（原「选择分类」二级页已删除）。

  - 列表数据由父页面持有（页面 onShow 统一拉取），本组件只负责展示与交互：
    · 单击标签 = 选中，emit pick（父级回填表单并关掉弹层）
    · 长按标签 = 编辑 / 删除：先收起本弹层、再弹操作菜单，两层不同时出现
      （两个 wd-popup 同时开着层级不可控，且 App 端弹层叠弹层视觉很乱）
    · 末尾虚线「+ 新建」= 跳 EditCategory（不传 id，标题自动切「新增分类」）
  - 编辑 / 新建都会离开本页，返回时父页面 onShow 自动重拉列表，本组件不用管刷新；
    删除分类留在页内，删完 emit refresh 让父级重拉。

  滚动区用 scroll-view 而不是 z-paging：本弹层内容高度不定，z-paging（:fixed="false"）
  要求父容器有确定高度，否则量到 0（media 的筛选弹层是靠「定高 + 延迟挂载 filterReady」
  才用上 z-paging 的）。标签云是静态内容，scroll-view + max-height 自适应更直接，
  与 ImportModal / DialogContainer 的弹层内滚动同款。
-->
<template>
  <view class="cat-picker">
    <wd-popup
      :model-value="props.show"
      position="bottom"
      :safe-area-inset-bottom="false"
      :close-on-click-modal="true"
      @update:model-value="onModelUpdate"
    >
      <view class="cat-picker__pop">
        <view class="cat-picker__head">
          <text class="cat-picker__title">选择分类</text>
        </view>
        <scroll-view scroll-y class="cat-picker__scroll">
          <view class="cat-picker__chips">
            <!--
              每个标签外面包一层 cell：@click / @longpress 挂在这层（Tag 只声明了 click，
              长按要跨端稳定触发就得挂在自己的节点上），同时这层在 flex 容器里收缩到内容宽度、
              用 flex 布局避免 inline-flex 的 Tag 参与行盒计算、下方多出一条基线空隙。
            -->
            <view
              v-for="item in props.list"
              :key="item.id"
              class="cat-picker__cell"
              @click="onPick(item)"
              @longpress="onLongPress(item)"
            >
              <Tag :active="item.id === props.activeId" :theme="theme">{{ item.title }}</Tag>
            </view>

            <!-- 云末尾的「+ 新建」：虚线描边 + 主题色，尺寸与 Tag 完全一致 -->
            <view class="cat-picker__cell" @click="onCreate">
              <view class="cat-picker__new" :style="{ borderColor: theme }">
                <wd-icon name="add" :size="13" :color="theme" />
                <text class="cat-picker__new-text" :style="{ color: theme }">新建</text>
              </view>
            </view>
          </view>

          <!-- 空态自绘：分类为空时「+ 新建」还在，不能用 z-paging 的默认空数据图 -->
          <view v-if="!props.list.length" class="cat-picker__empty">
            {{ props.loading ? '加载中…' : '暂无分类，点「新建」创建一个' }}
          </view>
        </scroll-view>
      </view>
    </wd-popup>

    <!-- 长按分类弹出：编辑 / 删除（标题带分类名，避免长按错人） -->
    <wd-action-sheet
      v-model="actionVisible"
      :title="pendingCategory ? pendingCategory.title : '选择操作'"
      :actions="CATEGORY_ACTIONS"
      :close-on-click-action="true"
      cancel-text="取消"
      @select="onActionSelect"
    />
  </view>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { deleteCategory } from '@/api'
import { Router } from '@/common/router'
import Tag from '@/components/Tag.vue'
import { Dialog } from '@/components/Dialog'
import { useUserStore } from '@/stores/user'
import { toast } from '@/utils'
import type { Category } from '@/types/media'

const props = defineProps<{
  /** 弹层显隐（父级 v-model 语义，用 :show + @close） */
  show: boolean
  /** 分类列表（数据由父页面拉取、传入） */
  list: Category[]
  /** 列表加载中（空态文案用） */
  loading: boolean
  /** 当前已选中的分类 id */
  activeId: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'pick', item: Category): void
  (e: 'refresh'): void
}>()

const userStore = useUserStore()
const theme = computed(() => userStore.theme)

const CATEGORY_ACTIONS = [{ name: '编辑分类' }, { name: '删除分类' }]

/*
 * wd-popup 点遮罩关闭时把 modelValue 置 false 并回传。这里上报父级。
 * 父级把 props.show 置 false 来关时不回传 update，无需再 emit close。
 */
const onModelUpdate = (val: boolean) => {
  if (!val) emit('close')
}

/** 长按菜单 */
const actionVisible = ref(false)
const pendingCategory = ref<Category | null>(null)

/** 单击标签 = 选中（父级回填表单并关掉弹层，本组件不自己关） */
const onPick = (item: Category) => {
  emit('pick', item)
}

/** 长按标签 = 编辑 / 删除：先收起选择弹层，再弹操作菜单（两层不同时出现） */
const onLongPress = (item: Category) => {
  pendingCategory.value = item
  emit('close')
  setTimeout(() => {
    actionVisible.value = true
  }, 250)
}

/** 菜单选中：编辑进 EditCategory，删除走二次确认 */
const onActionSelect = ({ item }: { item: { name: string } }) => {
  const target = pendingCategory.value
  actionVisible.value = false
  pendingCategory.value = null
  if (!target) return

  if (item.name === '编辑分类') {
    Router.navigate('EditCategory', { id: target.id })
    return
  }
  if (item.name === '删除分类') {
    onDelete(target)
  }
}

/** 删除分类（文案与 EditCategory 页内一致）；删完让父级重拉列表 */
const onDelete = async (item: Category) => {
  const result = await Dialog.show({
    title: '提示',
    message: '删除后不可恢复，请谨慎操作',
    positiveText: '确定',
    negativeText: '取消'
  })
  if (result !== 'confirm') return
  try {
    await deleteCategory(item.id)
    toast('操作成功')
    emit('refresh')
  } catch (error) {
    Dialog.show({
      title: '提示',
      message: '删除失败，请稍后重试',
      positiveText: '我知道了'
    })
  }
}

/** 新建：跳 EditCategory 不传 id，页面标题自动切「新增分类」 */
const onCreate = () => {
  emit('close')
  Router.navigate('EditCategory', { id: '' })
}
</script>

<style lang="scss" scoped>
.cat-picker {
  /*
   * 弹层内容（原 pkg-post/choose-category 搬来）
   * 滚动区用 scroll-view —— 弹层内容高度不定，z-paging 量不到高度；
   * 这里 max-height 之内按内容撑高、超出才滚，标签云这种静态内容最省事。
   */
  &__pop {
    display: flex;
    flex-direction: column;
    background-color: #fff;
  }
  &__head {
    flex-shrink: 0;
    padding: 24rpx 30rpx;
    /* text-align 设在块级容器上（<text> 是行内元素，自设无效） */
    text-align: center;
  }
  &__title {
    font-size: 30rpx;
    color: #333;
    font-weight: 500;
  }
  &__scroll {
    max-height: 60vh;
  }
  /*
   * 标签云：流式自适应换行（与 pkg-media 分组筛选同一套排布），间距用 margin 不用 gap。
   * ⚠️ 横向留白必须写在这里，**不能写在上面的 scroll-view 上**：
   *   uni 的 scroll-view 自带显式 `width: 100%`（@dcloudio/uni-components/style/scroll-view.css），
   *   而本项目没有全局 `box-sizing: border-box` —— padding 挂在它身上，盒子总宽就变成
   *   100% + 60rpx 横向溢出；外层 `.wd-popup` 是 `overflow-y: auto`，按 CSS 规范另一轴的
   *   visible 会被计算成 auto → 整个弹层跟着能左右滑动（用户报的「弹窗还能左右滑动」）。
   *   同理 ImportModal 的 __list、DialogContainer 的 .dlg 都是内层承担横向 padding。
   */
  &__chips {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0 30rpx 10rpx;
  }
  /* 每个标签的外层格子：收缩到内容宽度，自身 flex 避免 inline-flex 的 Tag 多出基线空隙 */
  &__cell {
    display: flex;
    margin: 0 16rpx 16rpx 0;
  }
  /* 「+ 新建」：与 Tag.vue 完全同尺寸（高 50rpx / 圆角 12rpx / 左右 16rpx / 字 28rpx），描边改虚线、取主题色 */
  &__new {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 50rpx;
    padding: 0 16rpx;
    border: 2rpx dashed #e1e1e1;
    border-radius: 12rpx;
  }
  &__new-text {
    margin-left: 6rpx;
    font-size: 28rpx;
    line-height: 1;
  }
  &__empty {
    /* 左右留白与 __chips 对齐（横向 padding 都在内层，见 __chips 注释） */
    padding: 20rpx 30rpx 40rpx;
    text-align: center;
    font-size: 28rpx;
    color: #999;
  }
}
</style>
