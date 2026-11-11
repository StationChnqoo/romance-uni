<!--
  纪录片 - 系列列表（可折叠）
  数据来自后端接口（/program-series），每次进入/下拉刷新重新拉取。

  - 纯列表页（无顶部固定头部），按项目口径用 z-paging :fixed="true"（与 pkg-media/list 同款）。
    真分页：@query(pageNo, pageSize) 里 completeByNoMore(records, !hasNextPage)，上拉加载下一页；
    空态交给 z-paging 自带的空数据图（与 pkg-anniversary / pkg-portfolio 列表同款，不再自己画）。
    额外关掉 :auto-load-more —— 本页数据量小、内容常常只比一屏多几十 rpx，
    z-paging 会以为"没满一屏、还有下一页"而自动拉第二页并滚到底，首条被顶出屏幕。
    第一页渲染完再 scrollToTop 兜一层，保证首次进入 / 下拉刷新 / 从编辑页返回都停在顶部。
    底部不留「让位悬浮按钮」的高度（按钮是 position: fixed 悬浮层），否则内容被凭空撑高，
    一屏多一点的数据就会多出滚动余量。
  - 单个系列（卡片 + 展开的期目）抽成 @/pkg-program/components/ProgramItem.vue（内部是 wd-collapse-item），
    本页只持有「列表级」状态：展开哪个（expandedId）、期目缓存（episodesMap）、加载中（loadingId），
    以及接口调用与跳转（点期目直接进 ProgramDetail 详情页播放，写 useProgramPlayerStore
    标记当前集，列表页/详情页同步高亮；2026-10-25 去掉了 wd-action-sheet 播放方式选择弹窗）。
  - 当前播放的集的高亮状态在 useProgramPlayerStore（pinia + persist），跨页面共享。
  - 折叠交给 wot 现成组件：外层 wd-collapse（accordion 手风琴，同一时间只展开一个），
    展开动画 / 互斥 / 点击切换都由它管；展开时按需调详情接口拉期目并缓存。
  - 右下角悬浮主按钮「+」：点开直接进新建系列（不依赖 uni-fab，图标用矢量 wd-icon）。
-->
<template>
  <view :style="themeVars" class="doc-list">
    <z-paging
      ref="pagingRef"
      v-model="list"
      class="doc-list__paging"
      :fixed="true"
      :auto-load-more="false"
      :refresher-enabled="true"
      @query="queryList"
    >
      <!-- 折叠用 wot 现成组件：accordion 手风琴（同一时间只展开一个），
           v-model 即展开项的 name（系列 id，收起时为 ''）。
           每个 item 组件内部是 wd-collapse-item，靠 provide/inject 找到这个父级。 -->
      <view class="doc-list__grid">
        <wd-collapse v-model="expandedId" accordion @change="onCollapseChange">
          <view v-for="(item, idx) in list" :key="`${item.id}:${idx}`" class="doc-list__cell">
            <ProgramItem
              :item="item"
              :episodes="episodesMap[item.id] || []"
              :loading="loadingId === item.id"
              @edit="onEdit(item)"
              @select="onSelect"
            />
          </view>
        </wd-collapse>
      </view>
    </z-paging>

    <!-- 右下角悬浮主按钮「+」：内联 <view> + wd-icon（项目口径：悬浮按钮不封装组件、不用 uni-fab）。
         图标字号走容器 font-size（wd-icon 的 size prop 会落到内联 style，内联 rpx 在 App 端不转换，
         用容器 font-size 继承更稳）。 -->
    <view class="doc-list__fab" :style="{ background: theme }" @click="onAdd">
      <wd-icon name="add" />
    </view>
  </view>
  <ToastContainer />
</template>

<script lang="ts" setup>
import ToastContainer from '@/components/ToastContainer.vue'
import { computed, nextTick, ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { Router } from '@/common/router'
import { useUserStore } from '@/stores/user'
import { useProgramPlayerStore } from '@/stores/programPlayer'
import { selectProgramSeries, selectProgramSeriesDetail } from '@/api'
import type { ProgramEpisode, ProgramSeries } from '@/api'
import ProgramItem from '@/pkg-program/components/ProgramItem.vue'
import { useThemeVars } from '@/composables/useThemeVars'

const themeVars = useThemeVars()


const userStore = useUserStore()
/** 主题色：注入右下角悬浮按钮 */
const theme = computed(() => userStore.theme)
const playerStore = useProgramPlayerStore()

/** 系列列表：真分页，数据由 z-paging 的 v-model 持有（上拉自动加载下一页） */
const list = ref<ProgramSeries[]>([])

/** 折叠面板的展开项：accordion 模式是 string（收起为 ''），由 wd-collapse 的 v-model 双向绑定 */
const expandedId = ref('')
/** 已拉取的期目缓存：seriesId -> episodes（避免反复请求） */
const episodesMap = ref<Record<string, ProgramEpisode[]>>({})
/** 正在拉期目的系列 id（占位「加载中…」） */
const loadingId = ref('')

/** z-paging 实例：reload / complete 都走它 */
const pagingRef = ref<any>(null)

/**
 * z-paging 分页回调（真分页，与 pkg-wallet 同款口径）：
 * 只回传当前页数据，累计由 z-paging 内部完成；还有没有下一页由接口的 hasNextPage 决定。
 */
const queryList = async (pageNo: number, pageSize: number) => {
  // 第一页 = 首次进入 / 下拉刷新 / 从编辑页返回：先收起展开态、清期目缓存，避免残留过期数据
  if (pageNo === 1) {
    expandedId.value = ''
    episodesMap.value = {}
  }
  try {
    const pageData = await selectProgramSeries({ currentPage: pageNo, pageSize })
    pagingRef.value?.completeByNoMore(pageData.records || [], !pageData.hasNextPage)
    // 第一页渲染完滚回顶部：数据量小的时候，内容常常只比一屏多几十 rpx，
    // 滑一下就到头、把第一条顶出屏幕（看起来"顶部空了一块"）。
    // 等 z-paging 渲染完这一页再滚，否则量到的内容高度还是旧的、滚不到位。
    if (pageNo === 1) nextTick(() => pagingRef.value?.scrollToTop())
  } catch {
    pagingRef.value?.complete(false)
  }
}

/** 拉某系列的期目（带缓存 / 防重复），写入 episodesMap */
const loadEpisodes = async (id: string) => {
  if (episodesMap.value[id] || loadingId.value === id) return
  loadingId.value = id
  try {
    const detail = await selectProgramSeriesDetail(id)
    episodesMap.value = { ...episodesMap.value, [id]: detail?.episodes ?? [] }
  } catch {
    episodesMap.value = { ...episodesMap.value, [id]: [] }
  } finally {
    loadingId.value = ''
  }
}

/**
 * 折叠面板切换（accordion 模式：value = 展开项的 name，即系列 id；全部收起时是 ''）。
 * v-model 已由 wot 同步到 expandedId，这里只负责展开时按需拉期目。
 */
const onCollapseChange = ({ value }: { value: string }) => {
  if (!value) return
  loadEpisodes(value)
}

/** 「编辑」：进系列编辑页（不再有详情页） */
const onEdit = (item: ProgramSeries) => {
  if (!item?.id) return
  Router.navigate('EditProgramSeries', { id: item.id })
}

/** 点期目：直接进详情页播放（2026-10-25 去掉「选择播放方式」弹出框） */
const onSelect = (ep: ProgramEpisode) => {
  if (!ep?.id) return
  const seriesId = ep.seriesId || ''
  // 标记当前集：列表页与详情页靠它同步高亮
  playerStore.setCurrent(seriesId, ep.id)
  Router.navigate('ProgramDetail', { seriesId, episodeId: ep.id })
}

const onAdd = () => {
  Router.navigate('EditProgramSeries', {})
}

// 首次进入由 z-paging 自动 @query 拉第一页；用 firstShow 跳过首次 onShow，避免重复请求
let firstShow = true
// 返回本页（如从编辑页回来）重拉第一页 —— queryList 里会顺带收起展开态、清期目缓存
onShow(() => {
  if (firstShow) {
    firstShow = false
    return
  }
  pagingRef.value?.reload()
})
</script>

<style lang="scss" scoped>
.doc-list {
  height: 100%;
  /* 整页白底（含 z-paging 容器，即滚动区 / 下拉刷新区 / 空态区） */
  background-color: #fff;

  &__paging {
    background-color: #fff;
  }

  /* 单列竖排：每个条目占满整行，四边留白 24rpx。
     底部不留任何「给悬浮按钮让位」的高度 —— 按钮本来就是 position: fixed 绝对定位
     浮在列表上层，不该占用列表空间（留了就是凭空多一截空白）。 */
  &__grid {
    display: flex;
    flex-direction: column;
    padding: 24rpx;
  }
  /* 单个系列的容器：只负责卡片间距（老 Android webview 不认 gap，用 padding 兜）。
     写成 column flex —— 组件节点本身就是 flex item，column 下它的宽度落在交叉轴，
     被 align-items: stretch 拉满（写默认 row 的话它按内容收缩，卡片会变窄）。 */
  &__cell {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding-bottom: 16rpx;
  }

  /* 右下角悬浮主按钮：内联 <view> + wd-icon（矢量、随主题色、稳定显示）。 */
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
