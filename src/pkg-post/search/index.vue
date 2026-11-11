<!--
  搜索笔记
  由 cloud-react-native/src/screens/SearchPosts/index.tsx 迁移。

  - RN 的 ToolBar「搜索笔记」-> pages.json 的原生导航栏（navigationStyle: default）。
  - 顶部搜索行：RN 是 TextInput + 主题色「搜索」按钮，这里换成 wot 的 wd-search
    （自带搜索图标 / 清空按钮 / confirm-type=search），「搜索」按钮放在 wd-search **外面**
    做成兄弟节点（别塞 suffix 插槽，组件具名插槽里的事件会不透传）。
    仍保持「输入 -> 点搜索才发请求」的节奏，不做输入即搜。
  - 结果列表交给 z-paging（分页 / 下拉刷新 / 空态），卡片与笔记列表页共用 PostCard。
  - 未输入关键词时不请求，空态文案区分「还没搜」和「没搜到」。
-->
<template>
  <view :style="themeVars" class="post-search">
    <!-- 搜索行：wd-search 只管输入（hide-cancel 关掉它自带的「取消」），
         「搜索」按钮放在它外面、而不是塞进 suffix 插槽 ——
         组件具名插槽里绑的事件在部分端上不透传（点了没反应就是这么来的），
         放成兄弟节点就是页面自己的元素，点击一定有效。

         focus 打开：wd-search 默认先盖一层 cover 遮罩（不渲染 input），要点一下才展开输入框，
         搜索页进来就该能直接打字，所以让它挂载后自动展开并聚焦。 -->
    <view class="post-search__bar">
      <wd-search
        v-model="inputKeyword"
        :focus="true"
        placeholder="搜索标题、描述、标签"
        hide-cancel
        @search="onSearch"
        @clear="onClear"
      />
      <view class="post-search__submit-wrap">
        <wd-button
          size="small"
          :round="false"
          :custom-style="'background-color: ' + theme"
          @click="onSearch"
        >
          搜索
        </wd-button>
      </view>
    </view>

    <z-paging
      ref="pagingRef"
      v-model="list"
      class="post-search__list"
      :fixed="false"
      :auto="true"
      :refresher-enabled="true"
      :loading-more-enabled="true"
      :empty-view-text="keyword ? '没有找到相关笔记' : '输入关键词搜索笔记'"
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
  <ToastContainer />
</template>

<script lang="ts" setup>
import ToastContainer from '@/components/ToastContainer.vue'
import { ref } from 'vue'
import { searchPosts } from '@/api'
import { Router } from '@/common/router'
import PostCard from '@/pkg-post/components/PostCard.vue'
import { useUserStore } from '@/stores/user'
import { toast } from '@/utils'
import type { Post } from '@/types/media'
import { useThemeVars } from '@/composables/useThemeVars'

const themeVars = useThemeVars()


const userStore = useUserStore()
const theme = userStore.theme

/** inputKeyword 是输入框里的实时值，keyword 是「已提交」的关键词，只有它变了才重新请求 */
const inputKeyword = ref('')
const keyword = ref('')

const pagingRef = ref<any>(null)
const list = ref<Post[]>([])

const onSearch = () => {
  const kw = (inputKeyword.value || '').trim()
  inputKeyword.value = kw
  keyword.value = kw
  uni.hideKeyboard()
  pagingRef.value?.reload()
}

const onClear = () => {
  inputKeyword.value = ''
  keyword.value = ''
  pagingRef.value?.reload()
}

const queryList = async (pageNo: number, pageSize: number) => {
  const kw = keyword.value.trim()
  if (!kw) {
    // 没关键词不发请求（RN 的 enabled 判定同款）
    pagingRef.value?.completeByNoMore([], true)
    return
  }
  try {
    const pageData = await searchPosts({currentPage: pageNo, pageSize}, kw)
    pagingRef.value?.completeByNoMore(
      pageData.records || [],
      !pageData.hasNextPage
    )
  } catch (e) {
    toast('加载失败，下拉重试')
    pagingRef.value?.complete(false)
  }
}

const onItemPress = (item: Post) => {
  if (!item?.id) return
  Router.navigate('PostDetail', {id: item.id})
}
</script>

<style lang="scss" scoped>
.post-search {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f0f0;

  &__bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #fff;
  }
  /* wd-search 占满剩余宽度，右侧留给「搜索」按钮 */
  :deep(.wd-search) {
    flex: 1;
    min-width: 0;
  }
  /* 只负责外间距：按钮自身的尺寸/圆角/内边距全走 wd-button 的 small 预设 */
  &__submit-wrap {
    flex: none;
    margin-right: 24rpx;
  }

  &__list {
    flex: 1;
    background-color: #fff;
  }
}
</style>
