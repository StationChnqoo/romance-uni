<!--
  纪念日列表
  由 cloud-react-native/src/screens/Anniversaries/index.tsx 迁移。

  - RN 的 FlatList + RefreshControl + useInfiniteQuery 分页
    -> z-paging（v-model + @query），与 pkg-media/list 同款写法。
  - RN 的自定义 ToolBar -> uni-app 原生导航栏（pages.json 里配 title「纪念日」）。
  - 卡片（RN 的 AnniversaryCard）内联在本页，点卡片进编辑页：
    id 走 URL，整条记录走内存传参（common/pageParams），编辑页优先用它回显。
  - 天数口径与 RN 完全一致：
    未来日期 → 「还有 N 天」；未来且当年周年未到 → 「还有 N 天」；
    当年周年已过 → 以原始日期算「已过 N 天」；恰为今天 → 「今天 / 0」。
-->
<template>
  <view :style="themeVars" class="anniversaries">
    <z-paging
      ref="pagingRef"
      v-model="list"
      class="anniversaries__paging"
      :fixed="true"
      :auto="true"
      :refresher-enabled="true"
      :loading-more-enabled="true"
      @query="queryList"
    >
      <view class="anniversaries__list">
        <view
          v-for="(item, idx) in list"
          :key="`${item.id}:${idx}`"
          class="anniversaries__card"
          hover-class="anniversaries__card_hover"
          @click="onItemPress(item)"
        >
          <Flex horizontal>
            <view class="anniversaries__content">
              <text class="anniversaries__title" :number-of-lines="1">
                {{ item.title }}
              </text>
              <view class="anniversaries__gap" />
              <Flex horizontal>
                <text class="anniversaries__description" :number-of-lines="1">
                  {{ item.description || '暂无描述' }}
                </text>
                <text class="anniversaries__date">
                  {{ item.anniversaryDate }}{{ item.isLunar ? ' 📅' : '' }}
                </text>
              </Flex>
            </view>
            <view class="anniversaries__emoji-box">
              <text class="anniversaries__emoji">{{ item.emoji || '😄' }}</text>
            </view>
            <view class="anniversaries__days-box" :style="{ backgroundColor: theme + '20' }">
              <text class="anniversaries__days-tag" :style="{ color: theme }">
                {{ daysInfo(item.anniversaryDate).tag }}
              </text>
              <text class="anniversaries__days-value" :style="{ color: theme }">
                {{ daysInfo(item.anniversaryDate).value }}
              </text>
            </view>
          </Flex>
        </view>
      </view>
      </z-paging>

    <!-- 新增纪念日：右下角独立悬浮「+」按钮 -->
    <view class="anniversaries__add-fab" :style="{ background: theme }" @click="onAdd">
      <wd-icon name="add" />
    </view>
  </view>
  <ToastContainer />
</template>

<script lang="ts" setup>
import ToastContainer from '@/components/ToastContainer.vue'
import { computed, ref } from 'vue'
import dayjs from 'dayjs'
import { selectAnniversaries } from '@/api'
import { Router } from '@/common/router'
import { PAGE_PARAMS, setPageParam } from '@/common/pageParams'
import Flex from '@/components/Flex.vue'
import { useUserStore } from '@/stores/user'
import { toast } from '@/utils'
import type { Page } from '@/types/common'
import type { Anniversary } from '@/types/media'
import { useThemeVars } from '@/composables/useThemeVars'

const themeVars = useThemeVars()


const userStore = useUserStore()
const theme = computed(() => userStore.theme)

const pagingRef = ref<any>(null)
const list = ref<Anniversary[]>([])

/**
 * 与 RN 的 getAnniversaryDaysInfo 一致：算距纪念日的天数文案。
 * 模板里对同一条目调用两次，dayjs 计算很轻，不做缓存。
 */
const daysInfo = (anniversaryDate: string): { tag: string; value: string } => {
  try {
    const anniversary = dayjs(anniversaryDate).startOf('day')
    const today = dayjs().startOf('day')

    if (!anniversary.isValid()) {
      return { tag: '纪念日', value: '--' }
    }

    // 日期在未来：直接倒计时
    if (anniversary.isAfter(today)) {
      return { tag: '还有', value: String(anniversary.diff(today, 'day')) }
    }

    // 日期在过去：看当年周年是否已到
    const thisYearAnniversary = anniversary.year(today.year())
    if (thisYearAnniversary.isAfter(today)) {
      return { tag: '还有', value: String(thisYearAnniversary.diff(today, 'day')) }
    }
    if (thisYearAnniversary.isBefore(today)) {
      return { tag: '已过', value: String(today.diff(anniversary, 'day')) }
    }

    return { tag: '今天', value: '0' }
  } catch (error) {
    return { tag: '纪念日', value: '--' }
  }
}

const onItemPress = (item: Anniversary) => {
  if (!item?.id) return
  // 整条记录走内存传参：编辑页直接用它回显，不依赖详情接口
  setPageParam(PAGE_PARAMS.anniversary, item)
  Router.navigate('EditAnniversary', {id: item.id})
}

/** 右下角「+」：进纪念日新增页（floatpanel 的新增入口已下放到各 list 页） */
const onAdd = () => {
  Router.navigate('EditAnniversary', {})
}

/** z-paging 的分页回调：与 pkg-media/list 同款写法 */
const queryList = async (pageNo: number, pageSize: number) => {
  try {
    const pageData = await selectAnniversaries({currentPage: pageNo, pageSize})
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
.anniversaries {
  height: 100%;
  background-color: #f0f0f0;

  &__paging {
    background-color: #fff;
  }
  &__list {
    /* 四边 24rpx；底部不留「让位悬浮按钮」的高度 —— 按钮是 position: fixed 悬浮层，不占列表空间 */
    padding: 24rpx;
  }
  &__card {
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 10rpx;
    margin-bottom: 20rpx;
    overflow: hidden;
  }
  &__card_hover {
    opacity: 0.8;
  }
  &__content {
    flex: 1;
    justify-content: space-around;
    align-items: flex-start;
    padding: 10rpx 24rpx;
    overflow: hidden;
  }
  &__title {
    font-size: 28rpx;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__gap {
    height: 10rpx;
  }
  &__description {
    flex: 1;
    font-size: 24rpx;
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__date {
    flex-shrink: 0;
    font-size: 24rpx;
    color: #999;
  }
  &__emoji-box {
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: stretch;
    padding: 0 20rpx;
    background-color: #eee;
  }
  &__emoji {
    font-size: 36rpx;
  }
  &__days-box {
    width: 160rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: stretch;
  }
  &__days-tag {
    font-size: 24rpx;
  }
  &__days-value {
    font-size: 36rpx;
  }
  /* 新增纪念日悬浮按钮：内联 <view> + wd-icon（圆形 + 主题色底 + 白色图标）。 */
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
}
</style>
