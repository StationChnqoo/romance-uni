<template>
  <view :style="themeVars" class="choose-global">
    <view class="choose-global__list">
      <z-paging
        ref="pagingRef"
        v-model="list"
        class="choose-global__paging"
        :fixed="false"
        :auto="true"
        :loading-more-enabled="false"
        :show-scrollbar="false"
        hide-empty-view
        @query="queryList"
      >
        <view class="choose-global__indexes">
          <view
            v-for="it in quotes"
            :key="it.id"
            class="choose-global__index"
            :style="{ borderColor: isChecked(it) ? theme : '#ccc' }"
            @click="onIndexPress(it)"
          >
            <text
              class="choose-global__index-name"
              :style="{ color: isChecked(it) ? theme : '#666' }"
            >
              {{ orderOf(it) ? `${orderOf(it)}.` : '' }}{{ it.name }}
            </text>
            <text class="choose-global__index-price">{{ priceTextOf(it) }}</text>
            <text class="choose-global__index-sep">|</text>
            <text
              class="choose-global__index-change"
              :style="{ color: directionOf(it).color }"
            >
              {{ changeTextOf(it) }}
            </text>
          </view>
        </view>
      </z-paging>
    </view>
  </view>
  <ToastContainer />
</template>

<script lang="ts" setup>
/**
 * 全球指数（自选指数选择）
 * 由 cloud-react-native/src/screens/ChooseGlobal/index.tsx 迁移。
 *
 * ★ 数据源：**MSN 财经（微软）**，与首页「外围股市」看板同源。
 *   - 不再按东方财富分组逐组拉（`selectOtherCountryStocks` 已删）；`GlobalIndexes` 已是扁平的
 *     6 项自选指数（`{name, value: 'fi-...'}`），本页直接一次性拉全 6 个行情（`selectMsnStocks`）。
 *   - `QuoteSummary` 的 ids 不认 `fi-` 前缀，调接口前统一走 `msnCodeOf()` 剥前缀。
 *   - 返回体形状随 id 个数变（单 id `[{...}]` / 多 id `[[{...}],...]`），先摊平再按 `instrumentId`
 *     建索引，不依赖返回顺序（与首页 fetchMsnQuoteMap 同口径）。
 * - 选中集合存 marketStore.global（`fi-` 形式的 MSN id 字符串数组，与首页看板共用），
 *   点条目切换选中；名称前的数字是该指数在已选集合中的序号（RN 同款）。
 * - z-paging 只当滚动容器：列表恒空，hide-empty-view 必须开，防默认空数据图。
 */
import ToastContainer from '@/components/ToastContainer.vue'
import { computed, ref } from 'vue'
import { GlobalIndexes, msnCodeOf } from '@/constants/config'
import { selectMsnStocks } from '@/api'
import { useMarketStore } from '@/stores/market'
import { useUserStore } from '@/stores/user'
import { renderUpOrDown } from '@/utils'
import type { GlobalIndexQuote } from '@/types/stock'
import { useThemeVars } from '@/composables/useThemeVars'

const themeVars = useThemeVars()


const marketStore = useMarketStore()
const userStore = useUserStore()
const theme = computed(() => userStore.theme)

const pagingRef = ref<any>(null)
const list = ref<unknown[]>([])

const quotes = ref<GlobalIndexQuote[]>([])

/** z-paging：下拉刷新 + 首次 auto 加载都走 @query，列表数据恒为空（hide-empty-view 必须开） */
const queryList = async () => {
  try {
    await loadQuotes()
    pagingRef.value?.complete([])
  } catch (error) {
    quotes.value = []
    pagingRef.value?.complete(false)
  }
}

/**
 * 一次拉全 6 个自选指数行情（MSN QuoteSummary，ids 逗号拼接一个请求），
 * 摊平后按 instrumentId 建索引，再按 GlobalIndexes 顺序组装成 GlobalIndexQuote[]。
 */
const loadQuotes = async () => {
  const map = new Map<string, any>()
  const codes = Array.from(new Set(GlobalIndexes.map(it => msnCodeOf(it.value))))
  if (codes.length) {
    const res = (await selectMsnStocks(codes.join(','))) as any[]
    ;(res || []).forEach(group => {
      const item = Array.isArray(group) ? group[0] : group
      const quote = item?.quote
      if (quote && item?.instrumentId) map.set(item.instrumentId, quote)
    })
  }
  quotes.value = GlobalIndexes.map(it => {
    const quote = map.get(msnCodeOf(it.value))
    return {
      id: it.value,
      name: it.name,
      price: quote?.price ?? 0,
      changePercent: quote?.priceChangePercent ?? 0,
    }
  })
}

const isChecked = (it: GlobalIndexQuote) => marketStore.global.includes(it.id)

/** 已选时显示序号（在 global 里的位置 + 1），未选返回 0 不显示 */
const orderOf = (it: GlobalIndexQuote) => {
  const index = marketStore.global.indexOf(it.id)
  return index >= 0 ? index + 1 : 0
}

const onIndexPress = (it: GlobalIndexQuote) => {
  const next = [...marketStore.global]
  const index = next.indexOf(it.id)
  if (index >= 0) {
    next.splice(index, 1)
  } else {
    next.push(it.id)
  }
  marketStore.global = next
}

/** 接口没回来时 price 是 0，显示占位而不是 0.00 */
const priceTextOf = (item: GlobalIndexQuote) =>
  typeof item.price === 'number' && item.price > 0 ? item.price.toFixed(2) : '--'

/** changePercent 已是百分数，不要再 /100 */
const changeTextOf = (item: GlobalIndexQuote) => {
  const { operator } = renderUpOrDown(item.changePercent)
  return `${operator}${Math.abs(item.changePercent).toFixed(2)}%`
}

const directionOf = (item: GlobalIndexQuote) => renderUpOrDown(item.changePercent)
</script>

<style lang="scss" scoped>
.choose-global {
  display: flex;
  flex-direction: row;
  height: 100vh;
  background-color: #fff;

  &__list {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }
  /* :fixed="false" 时 z-paging 高度 100%，父容器已由 flex:1 撑出确定高度 */
  &__paging {
    flex: 1;
  }
  &__indexes {
    padding: 12rpx 30rpx;
  }
  &__index {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 64rpx;
    margin: 12rpx 0;
    padding: 0 24rpx;
    border: 1rpx solid #ccc;
    border-radius: 10rpx;
  }
  &__index-name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 28rpx;
  }
  &__index-price {
    color: #999;
    font-size: 28rpx;
  }
  /* 竖线左右间距用 margin，别写进文本内容：`<text> | </text>` 的首尾空白会被各端 trim 掉 */
  &__index-sep {
    margin: 0 10rpx;
    color: #999;
    font-size: 28rpx;
  }
  &__index-change {
    font-size: 28rpx;
  }
}
</style>
