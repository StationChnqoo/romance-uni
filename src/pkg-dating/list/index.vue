<!--
  相亲 - 对象列表
  由 cloud-react-native/src/screens/DatingList/index.tsx 迁移。
  （RN 里它是 BottomTabs 的第 3 个 tab；uni 没有底部 tab，改由首页功能入口面板进入，
   所以这里需要自己在 pages.json 注册，并在列表右下角补一个「+」新建入口 —— RN 是
   从行情页的功能入口弹窗里进 EditDating 的。）

  - 顶部固定状态筛选（**自绘** tab 条 + wd-badge 条数，全部 + 7 状态），下方是列表：
    有固定头部，所以 z-paging 用 :fixed="false"（项目口径：纯列表页才用 :fixed="true"），
    骨架 = 根 flex column 100vh + 头部固定高 + z-paging flex:1。
    ⚠️ 为什么不用 wd-tabs：见文件末尾。
  - 接口 /datings 后端已改真分页（currentPage / pageSize / status，返回 CommonPage{records, totalItems, hasNextPage}），
    与 /posts 同口径：queryList 收 pageNo/pageSize，带当前状态请求，completeByNoMore(records, !hasNextPage)。
    状态筛选下放到后端（status 参数），切 tab = 换查询条件 → reload 重新走 @query。
  - 各状态角标计数从后端 totalItems 取：首屏与从编辑页返回时由 refreshCounts 并行拉取全部状态填满，无需点 tab 才更新。
  - 空态用 z-paging 自带的（不自己画）：首屏数据没回来时它不会闪。
  - 返回本页（新建/编辑/详情回来后）一律 onShow 重拉，保证数据回显最新。
  - 右下角悬浮「+」是绝对定位悬浮层，**不给列表留让位高度**（留了内容会被凭空撑高）。
-->
<template>
  <view :style="themeVars" class="dt-list">
    <!-- 状态筛选：全部 + 7 个状态，选中态 = 主题色文字 + 主题色下划线，条数走 wd-badge。
         8 个 tab 必然超出一屏，用 scroll-view 横滚（等价于 wd-tabs 的 slidable="always"）。
         ⚠️ **为什么自绘而不用 wd-tabs**：见文件末尾注释（App 端会递归重渲染导致整 App 卡死）。 -->
    <scroll-view class="dt-list__tabs" scroll-x :show-scrollbar="false">
      <view class="dt-list__tabs-inner">
        <view
          v-for="opt in filterOptions"
          :key="opt.value"
          class="dt-list__tab"
          @click="onTabClick(opt.value)">
          <wd-badge :model-value="opt.count">
            <text
              class="dt-list__tab-text"
              :style="{ color: activeValue === opt.value ? theme : '#555' }">
              {{ opt.label }}
            </text>
          </wd-badge>
          <!-- 下划线常驻（未激活透明），激活只换色：宽度恒定，切换时不抖动 -->
          <view
            class="dt-list__tab-line"
            :style="{
              backgroundColor: activeValue === opt.value ? theme : 'transparent'
            }" />
        </view>
      </view>
    </scroll-view>

    <z-paging
      ref="pagingRef"
      v-model="list"
      class="dt-list__paging"
      :fixed="false"
      :refresher-enabled="true"
      :loading-more-enabled="true"
      @query="queryList">
      <view class="dt-list__body">
        <view v-for="item in list" :key="item.id" class="dt-list__cell">
          <DatingItem :item="item" @press="onOpenDetail(item)" />
        </view>
      </view>
    </z-paging>

    <!-- 悬浮主按钮「+」：内联 <view> + wd-icon（项目口径：不封装组件、不用 uni-fab）。
         图标字号走容器 font-size（wd-icon 的 size prop 会落内联 style，内联 rpx 在 App 端不转换）。 -->
    <view class="dt-list__fab" :style="{ background: theme }" @click="onAdd">
      <wd-icon name="add" />
    </view>
  </view>
  <ToastContainer />
</template>

<script lang="ts" setup>
import ToastContainer from '@/components/ToastContainer.vue'
import { computed, ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { selectDatings } from '@/api'
import { Router } from '@/common/router'
import { useUserStore } from '@/stores/user'
import { DATING_STATUS_LABEL, DATING_STATUS_OPTIONS } from '@/constants/datingData'
import type { DatingListItem, DatingStatus } from '@/types/dating'
import DatingItem from '@/pkg-dating/components/DatingItem.vue'
import { useThemeVars } from '@/composables/useThemeVars'

const themeVars = useThemeVars()


type FilterValue = DatingStatus | 'all'

const userStore = useUserStore()
const theme = computed(() => userStore.theme)

/** z-paging 实例：complete / reload / scrollToTop 都走它 */
const pagingRef = ref<any>(null)

/** z-paging 渲染的那份（由 completeByNoMore 累积填充，跨页累加） */
const list = ref<DatingListItem[]>([])
/** 当前选中的筛选值（'all' = 全部）。自绘 tab 条直接点值，不再「下标 <-> 值」来回倒 */
const activeValue = ref<FilterValue>('all')

/** 各状态角标计数：后端按状态分页，totalItems 即该状态总数。
 *  首屏 + 从编辑页返回时由 refreshCounts 并行拉取所有状态填满，无需逐个点 tab 才更新 */
const counts = ref<Record<string, number>>({ all: 0 })

/** 筛选药丸的值/文案/条数：全部在首位，其后按状态枚举顺序 */
const filterOptions = computed(() => {
  const options: { value: FilterValue; label: string; count: number }[] = [
    { value: 'all', label: '全部', count: counts.value.all || 0 }
  ]
  DATING_STATUS_OPTIONS.forEach(s => {
    options.push({ value: s, label: DATING_STATUS_LABEL[s], count: counts.value[s] || 0 })
  })
  return options
})

/**
 * 并行拉取每个状态的 totalItems 填角标：后端按状态分页，单个「全部」查询只给总数，
 * 拿不到各状态条数，所以这里一次性并发查 7 个状态（pageSize=1，只取 totalItems）。
 * 失败不影响列表（角标可能为 0），仅用于刷新角标。'all' 的总数由 queryList 的 status='' 查询负责。
 */
const refreshCounts = async () => {
  try {
    const res = await Promise.allSettled(
      DATING_STATUS_OPTIONS.map(s => selectDatings({ currentPage: 1, pageSize: 1 }, s))
    )
    DATING_STATUS_OPTIONS.forEach((s, i) => {
      const r = res[i]
      if (r.status === 'fulfilled' && r.value) {
        counts.value[s] = r.value.totalItems ?? r.value.records?.length ?? 0
      }
    })
  } catch (e) {
    /* 角标计数失败不阻断列表 */
  }
}

/** 首屏进入即拉一次各状态角标（z-paging 的 auto @query 会另拉「全部」列表） */
refreshCounts()

/**
 * z-paging 查询回调（真分页，与 /posts 同口径）。
 * 状态筛选已下放到后端（status 参数），这里直接带当前 activeValue 请求；
 * 第二参用后端 hasNextPage 反推 !hasNextPage（单参会误判「还有更多」，露出加载更多）。
 * z-paging 在每次 @query（含 reload）后自动滚回顶部，无需手动 scrollToTop。
 */
const queryList = async (pageNo: number, pageSize: number) => {
  try {
    const status = activeValue.value === 'all' ? '' : activeValue.value
    const pageData = await selectDatings({ currentPage: pageNo, pageSize }, status)
    pagingRef.value?.completeByNoMore(pageData.records || [], !pageData.hasNextPage)
    counts.value[status || 'all'] = pageData.totalItems ?? pageData.records?.length ?? 0
  } catch (error) {
    pagingRef.value?.complete(false)
  }
}

const onTabClick = (value: FilterValue) => {
  if (activeValue.value === value) return
  activeValue.value = value
  // 切状态 = 换查询条件，重新走 @query（z-paging 会滚回顶部并重置列表）
  pagingRef.value?.reload()
}

const onOpenDetail = (item: DatingListItem) => {
  if (!item?.id) return
  Router.navigate('DatingDetail', { id: item.id })
}

const onAdd = () => Router.navigate('EditDating', {})

/**
 * ⚠️ 这里**不能**用 wd-tabs 当纯头部栏（曾经用过，2026-10-09 在 App 上炸了）
 *
 * 现象：小程序正常，**App 端一点「相亲」整个 App 卡死**，连首页 floatpanel 都点不动。
 * 原因：App 所有页面共用一个 JS 运行时（app-service.js），单页死循环会冻住全局；
 *       小程序每页独立上下文，所以只表现为「那一页卡」，看起来像「小程序没问题」。
 *
 * logcat 实锤（两条一起出现）：
 *   Maximum recursive updates exceeded in component <wd-tabs>
 *   Uncaught TypeError: Cannot read property '$' of undefined
 *
 * 根因在 wot 的父子注册机制（node_modules/wot-design-uni/components/composables/）：
 *   - useChildren.link() 在**子组件 setup 期间**（父 render effect 正在跑）调 sortChildren()，
 *     后者对 reactive 的 children 数组**原地排序**（= 写它自己）；
 *   - 而 wd-tabs 的渲染又读 children.length（class 绑定里的 `mapNum < children.length`）
 *     → effect 改自己的依赖 → 递归重渲染，正是上面那句报错的字面意思；
 *   - sortChildren 的比较器里有 `comp.$.uid`，而 unlink() 用 `splice(indexOf(), 1)`，
 *     indexOf 返回 -1 时 splice(-1,1) 会删错元素 → 数组错位 → comp 变 undefined → 第二条报错。
 *
 * 我们的用法踩满雷区：wd-tab 是**空插槽**（tabs 只当头部栏、内容放外部 z-paging）
 * + 默认 lazy:true（只有激活那个渲染内容）→ 8 个 tab 的 subTree 形态不一致
 * → 排序结果每次渲染都在抖 → 每次写回 reactive 数组 → 每次触发父组件重渲染。
 *
 * 结论：wd-tabs 只适合「带真实内容的 tab 容器」，拿它当**纯头部栏**用会在 App 上递归。
 * 所以这里自绘（scroll-view 横滚 + 主题色下划线 + wd-badge 条数），外观与 wd-tabs 一致。
 */
// 首次进入由 z-paging 自动 @query；用 firstShow 跳过首次 onShow，避免重复请求
let firstShow = true
onShow(() => {
  if (firstShow) {
    firstShow = false
    return
  }
  // 从新建 / 编辑 / 详情返回：重拉列表 + 刷新各状态角标计数
  pagingRef.value?.reload()
  refreshCounts()
})
</script>

<style lang="scss" scoped>
.dt-list {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f0f0;

  &__tabs {
    flex-shrink: 0;
    width: 100%;
    white-space: nowrap;
    background-color: #fff;
    border-bottom: 1px solid #eee;
  }
  /* scroll-view 横向滚动必须给内容一层 inline 宽的容器，否则子项会被压成一列 */
  &__tabs-inner {
    display: inline-flex;
    flex-direction: row;
    align-items: stretch;
  }
  &__tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 88rpx;
    padding: 0 24rpx;
    flex-shrink: 0;
  }
  &__tab-text {
    font-size: 28rpx;
    /* line-height:1 —— flex 居中的是行盒，行盒比字形高时墨迹会偏 */
    line-height: 1;
    color: #555;
  }
  /* 下划线常驻，未激活是透明的：宽度恒定、只换颜色，切换 tab 时不抖动 */
  &__tab-line {
    width: 100%;
    height: 4rpx;
    margin-top: 10rpx;
    border-radius: 2rpx;
    background-color: transparent;
  }

  &__paging {
    flex: 1;
  }
  &__body {
    display: flex;
    flex-direction: column;
  }
  /* 每张卡片自己带白底和内边距，这里只负责发丝分隔线（最后一条不画） */
  &__cell {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }
  }

  /* 右下角悬浮主按钮（绝对定位悬浮层，不占列表高度） */
  &__fab {
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
}
</style>
