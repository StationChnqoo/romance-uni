<template>
  <view :style="themeVars" class="valuation">
    <z-paging
      ref="pagingRef"
      v-model="list"
      class="valuation__paging"
      :fixed="false"
      :auto="true"
      :refresher-enabled="false"
      :loading-more-enabled="false"
      :show-scrollbar="false"
      hide-empty-view
      @query="queryList"
    >
      <!-- 贡献计算 -->
      <view class="valuation__table">
        <view class="valuation__header">
          <view class="valuation__cell valuation__cell--title">
            <text class="valuation__header-label valuation__header-label--left">名称</text>
          </view>
          <view class="valuation__cell valuation__cell--weight">
            <text class="valuation__header-label">权重%</text>
          </view>
          <view class="valuation__cell valuation__cell--change">
            <text class="valuation__header-label">涨跌%</text>
          </view>
          <view class="valuation__cell valuation__cell--result">
            <text class="valuation__header-label">贡献</text>
          </view>
          <view class="valuation__cell valuation__cell--del" />
        </view>
        <view
          v-for="(row, index) in rows"
          :key="items[index].etfMsnId || `new-${index}`"
          class="valuation__row"
        >
          <view class="valuation__cell valuation__cell--title">
            <wd-input
              v-model="items[index].title"
              :no-border="true"
              placeholder="输入名称"
              placeholder-style="color:#aaa"
              custom-class="valuation__input valuation__input--title"
            />
          </view>
          <view class="valuation__cell valuation__cell--weight">
            <wd-input
              v-model="items[index].weightRaw"
              type="digit"
              :no-border="true"
              placeholder="0"
              placeholder-style="color:#ddd"
              custom-class="valuation__input valuation__input--center"
            />
          </view>
          <view class="valuation__cell valuation__cell--change">
            <wd-input
              v-model="items[index].changeRaw"
              type="digit"
              :no-border="true"
              placeholder="0"
              placeholder-style="color:#ddd"
              custom-class="valuation__input valuation__input--center"
            />
          </view>
          <view class="valuation__cell valuation__cell--result">
            <view
              v-if="!row.isZero"
              class="valuation__result"
              :style="{ color: row.color }"
            >
              {{ row.operator }}{{ Math.abs(row.v).toFixed(2) }}%
            </view>
            <view v-else class="valuation__result-empty">-</view>
          </view>
          <view class="valuation__cell valuation__cell--del" @click="deleteItem(index)">
            <wd-icon name="close" size="18px" color="#ccc" />
          </view>
        </view>
        <view class="valuation__add-row">
          <wd-button block type="text" size="small" :custom-style="'color: #1890ff'" @click="addItem">
            + 新增
          </wd-button>
        </view>
      </view>

      <!-- 底部合计 + 导入按钮（RN 的 totalRow，放 #bottom 在最下面） -->
      <template #bottom>
        <view class="valuation__total">
          <view class="valuation__total-item">
            <text class="valuation__total-label">权重合计（共{{ items.length }}项）</text>
            <text
              class="valuation__total-value"
              :style="{ color: totalWeight === 100 ? '#2CA02C' : '#D62728' }"
            >
              {{ totalWeight.toFixed(2) }}%{{ totalWeight === 100 ? ' ✓' : ' (建议100%)' }}
            </text>
          </view>
          <view class="valuation__total-divider" />
          <view class="valuation__total-item">
            <text class="valuation__total-label">综合收益</text>
            <text class="valuation__total-value" :style="{ color: rd.color }">
              {{ rd.operator }}{{ Math.abs(result).toFixed(2) }}%
            </text>
          </view>
        </view>
        <view class="valuation__import-bottom">
          <wd-button
            block
            :round="false"
            :custom-style="'background-color: ' + theme"
            @click="importVisible = true"
          >
            导入历史数据
          </wd-button>
        </view>
      </template>
    </z-paging>

    <ImportModal
      :show="importVisible"
      :msn-config="importSources"
      @close="importVisible = false"
      @import="importChanges"
    />
  </view>
  <ToastContainer />
</template>

<script lang="ts" setup>
/**
 * 估值计算器
 * 由 cloud-react-native/src/screens/ValuationCalculator 迁移。
 *
 * - 贡献计算（权重 × 涨跌 = 贡献）单视图；平衡计算已移除（再平衡由独立的再平衡计算工具负责）。
 * - 数据源：取 marketStore.msnConfig 已启用项（商品已拆成 3 只 ETF，各 2.5%；旧 persist 里的
 *   「大宗商品」单条由 stores/market 的 afterRestore 迁移替换为这 3 只）。
 * - 导入弹窗：按时间范围拉各标的区间涨跌，一键填进涨跌%。
 * - z-paging 只当滚动容器（hide-empty-view），合计行 + 导入按钮放 #bottom 在最下面。
 */
import ToastContainer from '@/components/ToastContainer.vue'
import { computed, ref } from 'vue'
import { DEFAULT_MSN_CONFIG, useMarketStore } from '@/stores/market'
import { useUserStore } from '@/stores/user'
import type { MsnConfigItem } from '@/types/msn'
import { renderUpOrDown } from '@/utils'
import ImportModal from './ImportModal.vue'
import { useThemeVars } from '@/composables/useThemeVars'

const themeVars = useThemeVars()


type CalcItem = MsnConfigItem & { weightRaw?: string; changeRaw?: string }

const marketStore = useMarketStore()
const userStore = useUserStore()
const theme = computed(() => userStore.theme)

/** z-paging 只当滚动容器：列表数据恒为空，不参与渲染 */
const pagingRef = ref<any>(null)
const list = ref<unknown[]>([])

const queryList = () => {
  pagingRef.value?.complete([])
}

const emptyItem = (): MsnConfigItem => ({
  title: '',
  etfMsnId: '',
  weight: 0,
  enabled: true,
  note: ''
})

const configSource = marketStore.msnConfig
const defaultItems = (configSource.length ? configSource : DEFAULT_MSN_CONFIG).filter(
  it => it.enabled
)

const items = ref<CalcItem[]>(
  defaultItems.length
    ? defaultItems.map(it => ({ ...it, weightRaw: String(it.weight), changeRaw: '0' }))
    : [{ ...emptyItem(), weightRaw: '0', changeRaw: '0' } as CalcItem]
)

const parseNum = (raw?: string) => {
  if (!raw || raw === '') return 0
  const n = parseFloat(raw)
  return Number.isFinite(n) ? n : 0
}

const totalWeight = computed(() => items.value.reduce((acc, it) => acc + parseNum(it.weightRaw), 0))

const result = computed(() =>
  items.value.reduce((acc, it) => acc + (parseNum(it.weightRaw) * parseNum(it.changeRaw)) / 100, 0)
)

/** 每行展示数据：贡献 = 权重% × 涨跌% / 100（该标的对组合收益的占比，与综合收益同源÷100）。
 * 用 computed 一次性算好 值/颜色/符号/是否为零，模板直接取，避免模板里反复调函数导致个别机型不刷新。 */
const rows = computed(() =>
  items.value.map(it => {
    const v = (parseNum(it.weightRaw) * parseNum(it.changeRaw)) / 100
    const r = renderUpOrDown(v)
    return { v, color: r.color, operator: r.operator, isZero: v === 0 }
  })
)

const addItem = () => {
  items.value.push({ ...emptyItem(), weightRaw: '0', changeRaw: '0' } as CalcItem)
}

const deleteItem = (index: number) => {
  items.value.splice(index, 1)
}

/** 导入弹窗的数据源：marketStore.msnConfig 已启用项（与表格种子同源） */
const importSources = computed(() =>
  marketStore.msnConfig.filter(it => it.enabled)
)

const importVisible = ref(false)

const importChanges = (changes: Record<string, number>) => {
  items.value.forEach(it => {
    const change = changes[it.title]
    if (change !== undefined) {
      it.changeRaw = change.toFixed(2)
    }
  })
}

const rd = computed(() => renderUpOrDown(result.value))
</script>

<style lang="scss" scoped>
.valuation {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f0f0;

  /* :fixed="false" 时 z-paging 高度 100%，父容器必须给出确定高度 */
  &__paging {
    flex: 1;
  }
  &__table {
    background-color: #fff;
  }
  &__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16rpx 20rpx;
    background-color: #fafafa;
    border-bottom: 1rpx solid #eee;
  }
  &__header-label {
    color: #999;
    font-size: 24rpx;
    text-align: center;
  }
  &__header-label--left {
    text-align: left;
  }
  &__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16rpx 20rpx;
    background-color: #fafafa;
    border-bottom: 1rpx solid #eee;
  }
  &__row {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10rpx 20rpx;
    border-bottom: 1rpx solid #eee;
  }
  /* 每列包一层普通 view 当 flex item（绕开 wot wd-input 根节点不收 flex 的坑）；
     数值列写死宽度、标题列 flex:1 吃剩余 → 整行宽度恒 < 750rpx，不会溢出把贡献列推出屏外 */
  &__cell {
    box-sizing: border-box;
    min-width: 0;
  }
  &__cell--title {
    /* 名称列：固定基准 180rpx（容纳 4-5 字 + 内边距），不再 flex:1 1 0 吃掉整行 → 不再过宽 */
    flex: 0 0 180rpx;
    min-width: 0;
    margin-right: 10rpx;
  }
  &__cell--weight {
    /* 权重%：由 90rpx 加宽到 110rpx，给 2-3 位数字留足 */
    flex: 0 0 110rpx;
    margin-right: 10rpx;
    text-align: center;
  }
  &__cell--change {
    /* 涨跌%：同权重加宽到 110rpx */
    flex: 0 0 110rpx;
    margin-right: 10rpx;
    text-align: center;
  }
  &__cell--result {
    /* 贡献：基准 150rpx，flex-grow 吃掉行内剩余宽（约 60rpx）填满整行，避免右端留白 */
    flex: 1 1 150rpx;
    min-width: 0;
    margin-right: 10rpx;
    text-align: center;
  }
  &__cell--del {
    flex: 0 0 48rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__input {
    padding: 0;
  }
  &__input--center {
    /* 输入文本居中 */
    text-align: center;
  }
  &__result {
    font-weight: 500;
    font-size: 28rpx;
    text-align: center;
  }
  &__result--plain {
    color: #333;
    font-weight: 400;
  }
  &__result-empty {
    color: #ddd;
    font-size: 26rpx;
    text-align: center;
  }
  /* 「+ 新增」整行：按钮 block 铺满，点整行都有效 */
  &__add-row {
    background-color: #fff;
    border-bottom: 1rpx solid #eee;
  }
  &__total {
    padding: 20rpx 30rpx;
    background-color: #fff;
  }
  &__total-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 8rpx 0;
  }
  &__total-divider {
    height: 1rpx;
    margin: 8rpx 0;
    background-color: #eee;
  }
  &__total-label {
    color: #333;
    font-weight: 500;
    font-size: 28rpx;
  }
  &__total-value {
    font-weight: 500;
    font-size: 32rpx;
  }
  /* 底部导入按钮：占满底部宽度，置于合计行下方（最下面） */
  &__import-bottom {
    padding: 16rpx 24rpx 24rpx;
    background-color: #fff;
  }
}
</style>

<style>
/* wd-input 无 scoped 穿透：custom-class 挂在组件根上，这里全局写 */
.valuation__input {
  padding: 0 !important;
  width: 100%;
}
.valuation__input--center input,
.valuation__input--center .wd-input__inner {
  text-align: center;
}
</style>
