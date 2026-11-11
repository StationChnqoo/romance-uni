<!--
  笔记列表
  由 cloud-react-native/src/screens/Posts/index.tsx + components/PostCard.tsx 迁移。

  - RN 的 3:8 分栏（左分类 ScrollView + 右笔记 FlatList）
    -> 左右两个 z-paging（:fixed="false"，父 .posts__body 给确定高度）。
  - 卡片抽成 @/pkg-post/components/PostCard.vue，与搜索页共用（对应 RN 两个屏幕引用同一个 PostCard）。
  - 顶部的「N个分类 / N篇笔记 / 搜索按钮」概览栏已去掉：
    搜索改为右下角悬浮按钮（wd-icon 圆形按钮）跳独立搜索页 SearchPosts，不做页内输入弹窗。
-->
<template>
  <view :style="themeVars" class="posts">
    <view class="posts__body">
      <!-- 左：分类栏（一次性拉全，仅下拉刷新）。
           注意：v-model 绑的 catList 恒空（内容由 catDisplay 算出来渲染），
           对 z-paging 而言就是「没有数据」-> 必须 hide-empty-view，
           否则会弹默认空数据图盖住分类。同款见 pkg-media/list 的筛选弹窗。 -->
      <z-paging
        ref="catPagingRef"
        v-model="catList"
        class="posts__cats"
        :fixed="false"
        :auto="true"
        :refresher-enabled="true"
        :loading-more-enabled="false"
        :show-scrollbar="false"
        hide-empty-view
        @query="queryCategories"
      >
        <view
          v-for="it in catDisplay"
          :key="it.id"
          class="posts__cat"
          :class="{ 'posts__cat--checked': it.id === categoryId }"
          @click="onSelectCategory(it.id)"
        >
          <text
            class="posts__cat-text"
            :class="{ 'posts__cat-text--checked': it.id === categoryId }"
            :number-of-lines="1"
          >
            {{ it.title }}
          </text>
        </view>
      </z-paging>

      <view class="posts__divider" />

      <!-- 右：笔记列表 -->
      <z-paging
        ref="pagingRef"
        v-model="list"
        class="posts__list"
        :fixed="false"
        :auto="true"
        :refresher-enabled="true"
        :loading-more-enabled="true"
        @query="queryList"
      >
        <PostCard
          v-for="(item, idx) in list"
          :key="`${item.id}:${idx}`"
          :item="item"
          @press="onItemPress"
        />
      </z-paging>
    </view>

    <!-- 搜索入口：右下角悬浮按钮（圆形 + 主题色底 + 白色 wd-icon），
         跳独立搜索页（SearchPosts -> /pkg-post/search/index）。
         直接拿 wd-icon 用，不单独封装组件。 -->
    <view
      class="posts__search-fab"
      :style="{ background: theme }"
      @click="openSearch"
    >
      <wd-icon name="search" />
    </view>

    <!-- 新增笔记：右下角独立悬浮「+」按钮（与搜索按钮分开，互不影响） -->
    <view class="posts__add-fab" :style="{ background: theme }" @click="onAdd">
      <wd-icon name="add" />
    </view>
  </view>
  <ToastContainer />
</template>

<script lang="ts" setup>
import ToastContainer from '@/components/ToastContainer.vue'
import { computed, ref } from 'vue'
import { selectCategories, selectPosts } from '@/api'
import { Router } from '@/common/router'
import PostCard from '@/pkg-post/components/PostCard.vue'
import { useUserStore } from '@/stores/user'
import { toast } from '@/utils'
import type { Category, Post } from '@/types/media'
import { useThemeVars } from '@/composables/useThemeVars'

const themeVars = useThemeVars()


const userStore = useUserStore()
const theme = computed(() => userStore.theme)

/** 分类栏：catList 恒空（只是 z-paging 的 v-model 占位），catDisplay 首行插入「全部分类」 */
const catPagingRef = ref<any>(null)
const catList = ref<unknown[]>([])
const categories = ref<Category[]>([])
const catDisplay = computed<Category[]>(() => [
  {id: '', title: '全部分类'} as Category,
  ...categories.value
])

const queryCategories = async () => {
  try {
    const page = await selectCategories({currentPage: 1, pageSize: 100})
    categories.value = page.records || []
    catPagingRef.value?.completeByNoMore([], true)
  } catch (e) {
    toast('分类加载失败')
    catPagingRef.value?.complete(false)
  }
}

/** 列表数据：仅按分类过滤 */
const pagingRef = ref<any>(null)
const list = ref<Post[]>([])
const categoryId = ref('')

const onSelectCategory = (id: string) => {
  if (categoryId.value === id) return
  categoryId.value = id
  pagingRef.value?.reload()
}

const queryList = async (pageNo: number, pageSize: number) => {
  try {
    const pageData = await selectPosts({currentPage: pageNo, pageSize}, categoryId.value)
    pagingRef.value?.completeByNoMore(
      pageData.records || [],
      !pageData.hasNextPage
    )
  } catch (e) {
    toast('加载失败，下拉重试')
    pagingRef.value?.complete(false)
  }
}

const openSearch = () => {
  Router.navigate('SearchPosts')
}

/** 右下角「+」：进笔记新增页（floatpanel 的新增入口已下放到各 list 页） */
const onAdd = () => {
  Router.navigate('EditPost', {})
}

const onItemPress = (item: Post) => {
  if (!item?.id) return
  Router.navigate('PostDetail', {id: item.id})
}
</script>

<style lang="scss" scoped>
.posts {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f0f0;

  &__body {
    flex: 1;
    display: flex;
    flex-direction: row;
    overflow: hidden;
  }
  &__cats {
    flex: 3;
    background-color: #fff;
  }
  &__divider {
    width: 2rpx;
    background-color: #f0f0f0;
  }
  &__list {
    flex: 8;
    background-color: #fff;
  }

  /* 搜索悬浮按钮：内联 wd-icon（圆形 + 主题色底 + 白色图标），不单独封装组件。
     自身 z-index 100，低于 Dialog 弹层（wd-popup 9990），弹层打开时会被遮罩盖住。
     图标字号走容器 font-size（wd-icon 的 size prop 会落到内联 px，内联 rpx 在 App 端不转换，
     所以这里用容器 font-size 继承更稳）。
     新增笔记按钮放在主位（bottom:60），搜索按钮上移一层（bottom:170）避免重叠。 */
  &__search-fab {
    position: fixed;
    z-index: 100;
    right: 30rpx;
    bottom: 170rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 96rpx;
    height: 96rpx;
    border-radius: 50%;
    color: #fff;
    font-size: 44rpx;
    box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.2);

    &:active {
      transform: scale(0.94);
    }
  }
  /* 新增笔记悬浮按钮：与搜索按钮同款样式，固定在主位（右下角 bottom:60）。 */
  &__add-fab {
    position: fixed;
    z-index: 100;
    right: 30rpx;
    bottom: 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 96rpx;
    height: 96rpx;
    border-radius: 50%;
    color: #fff;
    font-size: 52rpx;
    box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.2);

    &:active {
      transform: scale(0.94);
    }
  }
  &__cat {
    padding: 20rpx 24rpx;
    background-color: #fff;
    text-align: center;
  }
  &__cat--checked {
    background-color: #eee;
  }
  &__cat-text {
    font-size: 28rpx;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__cat-text--checked {
    color: #333;
    font-weight: 500;
  }
}
</style>
