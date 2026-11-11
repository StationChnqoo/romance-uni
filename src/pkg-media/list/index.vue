<!--
  媒体列表
  由 cloud-react-native/src/screens/Media/index.tsx 迁移。

  - RN 的 FlatList + RefreshControl + 手动维护 pageNo/hasNextPage
    -> uni-app z-paging（v-model + @query），与 WalletList 风格一致。
  - RN 的 FlatList numColumns={2} -> 最初迁成 flex 两列网格；2026-10-11 按用户要求改**单列行卡**：
    左封面（240x135 定宽定高 ≈16:9，禁 aspect-ratio 用 rpx 写死）+ 右侧（标题 2 行省略 /
    底部一行：时间 + 「编辑」，编辑与整卡点击同动作——进编辑页）。
    点封面例外：@click.stop 直接 uni.previewImage 预览大图（图集 = 当前列表全部封面）。
  - RN 的 ListHeaderComponent（轮播）在列表内部，会跟着列表一起滚走，
    所以 <swiper> 必须放在 z-paging 的默认插槽（内容区），不能放 #top 插槽。
    #top 插槽只放「当前筛选状态」条：有筛选时才出现，无筛选时不占任何高度。
  - RN 的 react-native-snap-carousel -> uni-app 原生 <swiper>，自动轮播 + 指示点。
  - 演员相关交互（TitleGroupModal 里的点击演员过滤）按 EditMedia 同等约定不要。
  - 搜索 / 分组筛选的入口：原来那条常驻 88rpx 顶栏（分组 tag 预览 + 搜索按钮）已删，
    改成右下角一个主按钮（wd-icon），点开向上弹出「搜索」「筛选」两个选项
    （不依赖 uni-fab，图标用矢量 wd-icon，App 端稳定显示）。
    （本页不在 wd-floating-panel 里，悬浮按钮的 position:fixed + 视口坐标可以正常工作。）
  - 搜索：通用输入弹窗（components/InputDialog.vue）输入关键词
    -> 点「确定」才发起搜索（RN 是跳 SearchMedia 页面，这里不另建页面，用弹窗替代）。
    该弹窗同时被 pkg-wallet/edit、pkg-portfolio/edit-record 使用，不要再各写一份。
  - 分组筛选：底部弹窗（wot 的 wd-popup），数据源 selectMediaTitleGroups，
    按首字符做普通分组标题（不吸顶、无右侧索引栏），滚动容器用 z-paging，
    点某个分组后走 searchMediaAssets 的 keyword，再 reload 列表。
    分组标签用自绘的 Tag 组件（跟 DeleteableTags 同款描边药丸，只是没有删除按钮；
    选中=浅主题色底+主题色字，未选=灰描边+深灰字），不用 wot 的 wd-tag
    （灰底/蓝 primary 跟主题色冲突且丑）；媒体数量直接跟在 label 后面。
  - 本页横向留白统一 24rpx（= RN 的 paddingHorizontal: 15 换算）：轮播左右 margin 24rpx、
    卡片网格外层 padding 16rpx + 格子内 8rpx，两者真实边缘都收在 24rpx，对齐一致；
    卡片内部的 padding 仍是 20rpx（RN 的 10dp）。
    注意后端目前只有 keyword 参数、没有 group 参数，若分组名与标题不完全匹配，
    需要后端补 group 过滤条件。
  - selectMediaTitleGroups 返回的是 {label, value}[]：展示 label，别把整个对象渲染出来
    （会显示成 [object Object]）。
  - 点卡片进编辑页：id 走 URL，整条记录走内存传参（common/pageParams），
    编辑页优先用它回显。
-->
<template>
  <view :style="themeVars" class="media">
    <z-paging
      ref="pagingRef"
      v-model="list"
      class="media__paging"
      :fixed="true"
      :auto="true"
      :refresher-enabled="true"
      :loading-more-enabled="true"
      @query="queryList"
    >
      <template #top>
        <!-- 当前筛选状态：只在筛选生效时出现（原来那条常驻顶栏已删，
             搜索/筛选入口移到了右下角的 wd-fab）。
             #top 是 z-paging 自然流里的第一块，收起时高度为 0，内容区自动上移。 -->
        <view v-if="filterLabel" class="media__filter-bar">
          <text class="media__filter-text" :style="{ color: theme }">{{ filterLabel }}</text>
          <wd-button
            type="text"
            size="small"
            :custom-style="'color: #999'"
            @click="clearFilter"
          >
            清除
          </wd-button>
        </view>
      </template>

      <!-- 轮播在内容区，跟着列表一起滚（对应 RN 的 ListHeaderComponent） -->
      <swiper
        v-if="carouselItems.length"
        class="media__swiper"
        autoplay
        circular
        interval="2000"
        indicator-dots
        indicator-active-color="#333"
        indicator-color="rgba(255,255,255,0.5)"
      >
        <swiper-item v-for="item in carouselItems" :key="item.id">
          <view class="media__swiper-item" @click="onItemPress(item)">
            <image
              v-if="item.coverUrl"
              class="media__swiper-cover"
              :src="mediaUrl(item.coverUrl)"
              mode="aspectFill"
            />
            <view v-else class="media__swiper-placeholder">
              <text class="media__swiper-placeholder-text">16:9 封面</text>
            </view>
            <view class="media__swiper-title-wrap">
              <text class="media__swiper-title">{{ item.title }}</text>
            </view>
          </view>
        </swiper-item>
      </swiper>

      <!-- 卡片单列：左封面 + 右侧（标题 / 底部一行：时间 + 编辑）。
           整卡可点（进编辑页），「编辑」是同一动作的视觉强化，点击冒泡到卡根即可。
           点封面例外：直接预览大图（uni.previewImage），.stop 挡住冒泡不进编辑页；
           挂在 image 上（占位「暂无封面」不挂），无封面时点击仍走整卡的编辑动作。 -->
      <view class="media__grid">
        <view
          v-for="(item, idx) in list"
          :key="`${item.id}:${idx}`"
          class="media__card-cell"
          hover-class="media__card_hover"
          @click="onItemPress(item)"
        >
          <view class="media__card">
            <view class="media__card-cover">
              <image
                v-if="item.coverUrl"
                class="media__card-cover-img"
                :src="mediaUrl(item.coverUrl)"
                mode="aspectFill"
                @click.stop="onPreviewCover(item)"
              />
              <view v-else class="media__card-cover-placeholder">
                <text class="media__card-cover-placeholder-text">暂无封面</text>
              </view>
            </view>
            <view class="media__card-body">
              <text class="media__card-title" :number-of-lines="2">
                {{ item.title?.trim() || '未命名媒体' }}
              </text>
              <Flex horizontal justify="space-between" class="media__card-foot">
                <text class="media__card-meta">{{ formatDate(item.createAt) }}</text>
                <text class="media__card-hint">编辑</text>
              </Flex>
            </view>
          </view>
        </view>
      </view>

    </z-paging>

    <!-- 搜索 / 筛选入口：右下角一个主按钮，点开后向上弹出「搜索」「筛选」两个圆形选项
         （wd-icon，矢量、随主题色、稳定显示；不依赖 uni-fab 的图片路径 / uni-icons）。
         弹出菜单 z-index 100，低于 Dialog 弹层（wd-popup 9990），打开搜索/筛选弹层时会被遮罩盖住，无需压层级。 -->
    <view class="media__fab">
      <view v-if="fabOpen" class="media__fab-menu">
        <view
          class="media__fab-action"
          :style="{ background: theme }"
          @click.stop="onFabItem(1)"
        >
          <wd-icon name="filter" />
        </view>
        <view
          class="media__fab-action"
          :style="{ background: theme }"
          @click.stop="onFabItem(0)"
        >
          <wd-icon name="search" />
        </view>
      </view>
      <view
        class="media__fab-main"
        :style="{ background: theme }"
        @click="toggleFab"
      >
        <wd-icon :name="fabOpen ? 'close' : 'search'" />
      </view>
    </view>

    <!-- 新增媒体：右下角独立悬浮「+」按钮（与搜索/筛选主按钮分开，互不遮挡） -->
    <view class="media__add-fab" :style="{ background: theme }" @click="onAdd">
      <wd-icon name="add" />
    </view>

    <!-- 搜索弹窗：用通用输入弹窗（components/InputDialog.vue），
         输入关键词后点「确定」才发起搜索；点遮罩关闭 = 不搜索。 -->
    <InputDialog
      :show="searchVisible"
      :value="keyword"
      title="搜索媒体"
      placeholder="输入媒体标题"
      confirm-type="search"
      confirm-text="确定"
      clearable
      @close="closeSearch"
      @confirm="onSearchConfirm"
    />

    <!-- 分组筛选弹窗：数据源是已有的 selectMediaTitleGroups。
         字典序分组（首字符分组）只做普通的分组标题，**不吸顶**，右侧也没有索引栏；
         滚动容器用 z-paging（不是 scroll-view）。
         注意：z-paging 用 :fixed="false"，父容器必须给出确定高度
         （.media__pop--filter 定高 + .media__pop-body flex:1）；
         弹窗内容懒渲染 + 有动画，所以等展开完再挂载（filterReady），否则量到 0 高度。 -->
    <!-- wd-popup：用 v-model（:model-value 接 filterVisible）控制显隐，
         点遮罩关闭走 @update:model-value 把 filterVisible 同步回 false。
         safe-area-inset-bottom 关掉（默认就是 false）：底部安全区 manifest 已在原生层避让。 -->
    <wd-popup
      :model-value="filterVisible"
      position="bottom"
      :safe-area-inset-bottom="false"
      :close-on-click-modal="true"
      @update:model-value="onFilterModelUpdate"
    >
      <view class="media__pop media__pop--filter">
        <view class="media__pop-head">
          <text class="media__pop-title">媒体类型分布</text>
          <wd-button
            type="text"
            size="small"
            :custom-style="'color: #999'"
            @click="onSelectGroup('')"
          >
            全部
          </wd-button>
        </view>
        <view v-if="filterReady" class="media__pop-body">
          <z-paging
            ref="filterPagingRef"
            v-model="filterList"
            class="media__filter-paging"
            :fixed="false"
            :auto="true"
            :refresher-enabled="false"
            :loading-more-enabled="false"
            :show-scrollbar="false"
            hide-empty-view
            @query="queryFilter"
          >
            <view
              v-for="section in groupSections"
              :key="section.index"
              class="media__group"
            >
              <view class="media__group-head">
                <text class="media__group-title">{{ section.index }}</text>
              </view>
              <!-- 分组标签：自绘 Tag（跟 DeleteableTags 同款描边药丸，无删除按钮；
                   选中=浅主题色底+主题色字，未选=灰描边+深灰字）。 -->
              <view class="media__group-chips">
                <Tag
                  v-for="(group, idx) in section.items"
                  :key="`${section.index}:${idx}`"
                  :active="group.label === selectedGroup"
                  :theme="theme"
                  @click="onSelectGroup(group.label)"
                >
                  {{ group.label }} {{ group.value }}
                </Tag>
              </view>
            </view>
          </z-paging>
        </view>
      </view>
    </wd-popup>
  </view>
  <ToastContainer />
</template>

<script lang="ts" setup>
import ToastContainer from '@/components/ToastContainer.vue'
import { computed, ref, watch } from 'vue'
import {
  searchMediaAssets,
  selectMediaAssets,
  selectMediaTitleGroups,
  selectRandomMediaAssets
} from '@/api'
import { Router } from '@/common/router'
import { PAGE_PARAMS, setPageParam } from '@/common/pageParams'
import Flex from '@/components/Flex.vue'
import InputDialog from '@/components/InputDialog.vue'
import Tag from '@/components/Tag.vue'
import { useUserStore } from '@/stores/user'
import { mediaUrl, toast } from '@/utils'
import type { Page } from '@/types/common'
import type { MediaAsset, MediaTitleGroup } from '@/types/media'
import { useThemeVars } from '@/composables/useThemeVars'

const themeVars = useThemeVars()


const userStore = useUserStore()
/** 主题色：注入右下角悬浮按钮（主按钮 + 弹出菜单）的底色（夕阳红主题色） */
const theme = computed(() => userStore.theme)

/** 右下角悬浮入口的弹出状态：false 收起、true 展开「搜索 / 筛选」两个选项 */
const fabOpen = ref(false)
const toggleFab = () => {
  fabOpen.value = !fabOpen.value
}
/** 弹出的子项点击：先收起菜单再执行动作（0 搜索 / 1 筛选） */
const onFabItem = (index: number) => {
  fabOpen.value = false
  if (index === 0) openSearch()
  else openFilter()
}

/** 右下角「+」：进媒体新增页（floatpanel 的新增入口已下放到各 list 页） */
const onAdd = () => {
  Router.navigate('EditMedia', {})
}

const pagingRef = ref<any>(null)
const list = ref<MediaAsset[]>([])

/** 已生效的搜索关键词（与分组筛选共用 searchMediaAssets 的 keyword，关键词优先） */
const keyword = ref('')

/** 搜索弹窗：输入草稿与聚焦时机都由 InputDialog 内部管，这里只管显隐与确认 */
const searchVisible = ref(false)

const openSearch = () => {
  searchVisible.value = true
}

const closeSearch = () => {
  searchVisible.value = false
}

const onSearchConfirm = (val: string) => {
  keyword.value = (val || '').trim()
  selectedGroup.value = ''
  closeSearch()
  pagingRef.value?.reload()
}

/** 分组筛选：空串 = 全部；选中后走 searchMediaAssets 的 keyword 过滤 */
const filterVisible = ref(false)
const selectedGroup = ref('')
/** 弹窗展开动画结束后再挂载 z-paging，否则父容器高度还是 0、滚动区算不出来 */
const filterReady = ref(false)

const filterPagingRef = ref<any>(null)
/** z-paging 需要 v-model 数据源；分组是静态渲染的，这里恒空，@query 里直接结束 */
const filterList = ref<unknown[]>([])
const queryFilter = () => {
  filterPagingRef.value?.complete([])
}

const openFilter = () => {
  // 分组数据只在首屏「无筛选」时由 loadAuxiliary 拉过（queryList 里的判断）。
  // 万一那次失败或为空，弹窗会是空白的 —— 这里补拉一次，不阻塞弹窗展开。
  if (!titleGroups.value.length) loadAuxiliary()
  filterVisible.value = true
  filterReady.value = false
  setTimeout(() => {
    filterReady.value = true
  }, 350)
}

/** 当前筛选状态文案；空串 = 无筛选，#top 里那条状态条不渲染（不占高度） */
const filterLabel = computed(() => {
  if (keyword.value) return `搜索：${keyword.value}`
  if (selectedGroup.value) return `分组：${selectedGroup.value}`
  return ''
})

/** 清除全部筛选（关键词与分组是互斥的，一起清） */
const clearFilter = () => {
  keyword.value = ''
  selectedGroup.value = ''
  pagingRef.value?.reload()
}

// 筛选弹层的开合由 wd-popup 的 :model-value="filterVisible" 驱动，无需命令式 ref。

/** 点遮罩关闭时 wd-popup 把 modelValue 置 false 并回传，这里把状态同步回来 */
function onFilterModelUpdate(val: boolean) {
  if (!val) filterVisible.value = false
}

const onSelectGroup = (group: string) => {
  filterVisible.value = false
  const changed = selectedGroup.value !== group || !!keyword.value
  selectedGroup.value = group
  // 选分组与关键词是互斥的：选了分组就把关键词清掉（「全部」则两者一起清）
  keyword.value = ''
  if (changed) pagingRef.value?.reload()
}

const carouselItems = ref<MediaAsset[]>([])
const titleGroups = ref<MediaTitleGroup[]>([])

/**
 * 按字典序分组：首字符作为索引（中文取首字，英文转大写），
 * 排序用中文 collation，中文按拼音序、英文按字母序。
 */
const groupSections = computed(() => {
  const sorted = [...titleGroups.value].sort((a, b) =>
    (a.label || '').localeCompare(b.label || '', 'zh-Hans-CN')
  )
  const buckets = new Map<string, MediaTitleGroup[]>()
  sorted.forEach(group => {
    const label = group.label || ''
    const key = (label.trim()[0] || '#').toUpperCase()
    const bucket = buckets.get(key)
    if (bucket) {
      bucket.push(group)
    } else {
      buckets.set(key, [group])
    }
  })
  return Array.from(buckets, ([index, items]) => ({index, items}))
})

const formatDate = (date?: string) => (date ? date.slice(0, 10) : '')

const onItemPress = (item: MediaAsset) => {
  if (!item?.id) return
  // 整条记录走内存传参：编辑页直接用它回显，不依赖详情接口
  // （URL 放不下整个对象，见 common/pageParams.ts）
  setPageParam(PAGE_PARAMS.mediaAsset, item)
  Router.navigate('EditMedia', {id: item.id})
}

/**
 * 点封面直接预览大图（不进编辑页）。
 * 图集给当前列表全部封面（可左右滑着看），current 用点击那张的下标；
 * 只有一张时行为退化为单图预览。无封面不响应（外层 image 才挂了这个 handler）。
 */
const onPreviewCover = (item: MediaAsset) => {
  if (!item?.coverUrl) return
  const withCover = list.value.filter(it => !!it.coverUrl)
  const urls = withCover.map(it => mediaUrl(it.coverUrl as string))
  const index = Math.max(0, withCover.findIndex(it => it.id === item.id))
  uni.previewImage({urls, current: index})
}

/** 加载非分页数据：轮播与标题分组。失败不影响主列表展示。 */
const loadAuxiliary = async () => {
  try {
    const [random, groups] = await Promise.all([
      selectRandomMediaAssets(5).catch(() => [] as MediaAsset[]),
      selectMediaTitleGroups().catch(() => [] as MediaTitleGroup[])
    ])
    carouselItems.value = Array.isArray(random) ? random : []
    titleGroups.value = Array.isArray(groups) ? groups : []
  } catch (error) {
    // 静默：auxiliary 失败不影响主列表
  }
}

const loadDatas = async (
  page: number,
  pageSize: number
): Promise<Page<MediaAsset>> => {
  // 有关键词走搜索；否则选了分组也走搜索（keyword = 分组名）；都没有就拉全量
  const kw = keyword.value || selectedGroup.value
  if (kw) {
    return searchMediaAssets({currentPage: page, pageSize}, kw, 'media')
  }
  return selectMediaAssets({currentPage: page, pageSize}, 'media')
}

/**
 * z-paging 的分页回调：与 WalletList 同款写法。
 */
const queryList = async (pageNo: number, pageSize: number) => {
  try {
    // 只有在「无关键词、无分组」的首屏才拉轮播与分组：搜索/筛选时不必重复拉
    if (pageNo === 1 && !keyword.value && !selectedGroup.value) {
      await loadAuxiliary()
    }
    const pageData = await loadDatas(pageNo, pageSize)
    pagingRef.value?.completeByNoMore(
      pageData.records || [],
      !pageData.hasNextPage
    )
  } catch (e) {
    toast('加载失败，下拉重试')
    pagingRef.value?.complete(false)
  }
}
</script>

<style lang="scss" scoped>
.media {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;

  &__paging {
    background-color: #fff;
  }

  /* 当前筛选状态条：按需出现（无筛选时 z-paging 的 #top 高度为 0，不占位）。
     文字色由模板注入主题色。 */
  &__filter-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 72rpx;
    padding: 0 30rpx;
    background-color: #fdf6ec;
  }
  &__filter-text {
    flex: 1;
    min-width: 0;
    font-size: 26rpx;
    /* numberOfLines={1} */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__swiper {
    width: 702rpx;
    height: 392rpx;
    margin: 24rpx 24rpx 32rpx;
    border-radius: 12rpx;
    overflow: hidden;
  }
  &__swiper-item {
    position: relative;
    width: 100%;
    height: 100%;
  }
  &__swiper-cover {
    width: 100%;
    height: 100%;
  }
  &__swiper-placeholder {
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #ededed;
    height: 100%;
  }
  &__swiper-placeholder-text {
    color: #999;
    font-size: 24rpx;
  }
  &__swiper-title-wrap {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10rpx 30rpx;
    background-color: rgba(0, 0, 0, 0.2);
  }
  &__swiper-title {
    display: block;
    color: #fff;
    font-size: 28rpx;
    /* 底部文字最多一行：单行超长省略（uni 的 <text> :number-of-lines 不可靠，直接用 CSS 截断） */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* 列表：单列行卡（2026-10-11 从两列网格改来）：左封面 + 右侧（标题 / 底部一行：时间 + 编辑）。
     整页白底、item 不再做白卡（无圆角无描边），行与行之间只留 16rpx 间距。
     底部不留「让位悬浮按钮」的高度 —— 按钮是 position: fixed 悬浮层，不该占用列表空间
     （留了会把内容凭空撑高，一屏多一点的数据就多出滚动余量）。 */
  &__grid {
    padding: 0 24rpx;
  }
  &__card-cell {
    width: 100%;
    padding-bottom: 16rpx;
  }
  &__card {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
  &__card_hover {
    opacity: 0.8;
  }

  /* 清浮动兜底：列表是自己写的 flex（不是 float），这条是给列表里别的 float 元素兜底的，
     放着不影响（display:block + clear:both 对 flex 子项无效）。 */
  &:after {
    content: '';
    display: block;
    clear: both;
  }
  /* 左侧封面：定宽定高（禁 aspect-ratio，Android webview 不认），240:135 ≈ 16:9 */
  &__card-cover {
    flex: none;
    width: 240rpx;
    height: 135rpx;
    border-radius: 8rpx;
    overflow: hidden;
    background-color: #f5f5f5;
  }
  &__card-cover-img {
    width: 100%;
    height: 100%;
  }
  &__card-cover-placeholder {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ededed;
    height: 100%;
  }
  &__card-cover-placeholder-text {
    color: #999;
    font-size: 22rpx;
  }
  &__card-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    margin-left: 20rpx;
    /* 右列至少与封面同高，一行标题时底部行不会顶到封面外 */
    min-height: 135rpx;
  }
  &__card-title {
    font-size: 28rpx;
    color: #333;
    /* numberOfLines={2} */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    /* #ifdef APP-PLUS */
    lines: 2;
    /* #endif */
  }
  &__card-foot {
    margin-top: auto;
    padding-top: 12rpx;
  }
  &__card-meta {
    font-size: 24rpx;
    color: #999;
  }
  &__card-hint {
    font-size: 24rpx;
    color: #333;
    font-weight: 500;
  }

  /* ---------- 弹窗（搜索 / 分组 共用一套排版） ---------- */
  &__pop {
    padding: 32rpx 30rpx 40rpx;
    background-color: #fff;
    border-radius: 24rpx 24rpx 0 0;
  }
  /* 分组弹窗：定高，头部与内容区各自管自己的内边距 */
  &__pop--filter {
    display: flex;
    flex-direction: column;
    height: 61.8vh;
    padding: 0;
  }
  &__pop-head {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 24rpx;
  }
  &__pop--filter &__pop-head {
    padding: 32rpx 30rpx 24rpx;
  }
  &__pop-title {
    font-size: 32rpx;
    color: #333;
    font-weight: 500;
  }
  /* z-paging 用 :fixed="false"：父容器要确定高度，这里 body 撑开成 flex 列交给它 */
  &__pop-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  &__filter-paging {
    flex: 1;
  }
  /* 分组标题不吸顶，跟内容一起滚 */
  &__group-head {
    padding: 10rpx 30rpx;
    background-color: #f7f7f7;
  }
  &__group-title {
    font-size: 26rpx;
    color: #999;
  }
  /* 每个分组下的标签云：标签用自绘 Tag，这里只管排布 */
  &__group-chips {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12rpx;
    padding: 20rpx 30rpx;
  }

  /* 右下角悬浮入口：一个主按钮 + 点开向上弹出的菜单（wd-icon，不依赖 uni-fab）。
     图标字号走容器 font-size（wd-icon 的 size prop 会落到内联 px，内联 rpx 在 App 端不转换，
     这里用容器 font-size 继承更稳）。
     新增媒体按钮放在主位（bottom:60），搜索/筛选主按钮上移一层（bottom:170）避免重叠。 */
  &__fab {
    position: fixed;
    right: 30rpx;
    bottom: 170rpx;
    z-index: 100;
  }
  /* 新增媒体悬浮按钮：与搜索/筛选主按钮同款样式，固定在主位（右下角 bottom:60）。 */
  &__add-fab {
    position: fixed;
    right: 30rpx;
    bottom: 60rpx;
    z-index: 100;
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
  &__fab-main {
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
  &__fab-menu {
    position: absolute;
    right: 0;
    bottom: 120rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24rpx;
  }
  &__fab-action {
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
}
</style>
