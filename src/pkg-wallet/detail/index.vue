<template>
  <view :style="themeVars" class="detail">
    <z-paging
      v-model="pagingList"
      class="detail__paging"
      :fixed="false"
      :auto="false"
      :refresher-enabled="false"
      :loading-more-enabled="false"
    >
      <view class="detail__container">
        <!-- 总资产 -->
        <view class="hero" :style="{ backgroundColor: theme }">
          <view class="hero__head">
            <text class="hero__label">总资产</text>
            <text class="hero__unit">单位：万元</text>
          </view>
          <text class="hero__value">{{ totalWan }}</text>
          <text class="hero__meta">{{ settleLabel }} · 结算日 {{ settleDay }}</text>
          <text class="hero__time">更新于 {{ wallet.updateAt || '-' }}</text>
        </view>

        <!-- 资产结构 -->
        <wd-card>
          <template #title>
            <text class="detail__section-title">资产结构</text>
          </template>
          <template v-if="pieData.length > 0">
            <!-- 中心总计用页面文字，与持仓分析页一致 -->
            <text class="struct__total">总资产 {{ totalWan }} 万</text>
            <view
              class="struct__chart-wrap"
              :style="`width:${pieChartWidth}px;height:${pieChartHeight}px`"
            >
              <l-echart ref="chartRef" />
            </view>
          </template>
          <text v-else class="detail__empty">暂无资产分布数据</text>
        </wd-card>

        <!-- 科目明细 -->
        <wd-card>
          <template #title>
            <text class="detail__section-title">科目明细</text>
          </template>
          <wd-collapse v-model="expandedNames">
            <wd-collapse-item
              v-for="it in detailItems"
              :key="it.key"
              :name="it.key"
              :disabled="!it.isArray"
            >
              <template #title="{ expanded }">
                <view class="items__head">
                  <text class="items__label">{{ it.label }}</text>
                  <text class="items__value">{{ it.value }}</text>
                  <view v-if="it.isArray" :class="['items__arrow', { 'is-open': expanded }]">
                    <wd-icon name="arrow-down" size="14px" color="#c8ccd0" />
                  </view>
                </view>
              </template>
              <view v-for="(v, i) in it.list" :key="i" class="items__sub">
                <text class="items__sub-label">第 {{ i + 1 }} 笔</text>
                <text class="items__sub-value">{{ v }}k</text>
              </view>
            </wd-collapse-item>
          </wd-collapse>
        </wd-card>

        <!-- 记账当日基准 -->
        <wd-card>
          <template #title>
            <text class="detail__section-title">记账当日基准</text>
          </template>
          <view class="bench__row">
            <view class="bench__item">
              <text class="bench__label">上证指数</text>
              <text class="bench__value">{{ wallet.indexSh000001 || '-' }}</text>
            </view>
            <view class="bench__item bench__item--mid">
              <text class="bench__label">标普500</text>
              <text class="bench__value">{{ wallet.indexSpx || '-' }}</text>
            </view>
            <view class="bench__item">
              <text class="bench__label">记账日期</text>
              <text class="bench__value">{{ settleDate }}</text>
            </view>
          </view>
          <text class="bench__note">仅为记账时的点位快照，不代表收益{{ flowNote }}</text>
          <!-- 本周圈外进出的逐笔明细（只读药丸，与编辑页 DeleteableTags 同文案，不带删除按钮） -->
          <view v-if="flowTags.length" class="bench__flows">
            <view v-for="(flowTag, flowIndex) in flowTags" :key="flowIndex" class="bench__flow">
              <text class="bench__flow-text">{{ flowTag }}</text>
            </view>
          </view>
        </wd-card>

        <!-- 记录信息 -->
        <view class="detail__footer">
          <text class="detail__footer-item">创建于 {{ wallet.createAt || '-' }}</text>
        </view>
      </view>

      <template #bottom>
        <view class="detail__bottom">
          <wd-button
            block
            :round="false"
            :custom-style="'background-color: ' + theme"
            @click="onEdit"
          >
            编辑钱包
          </wd-button>
        </view>
      </template>
    </z-paging>
  </view>
  <ToastContainer />
</template>

<script lang="ts" setup>
/**
 * 钱包详情
 * 由 cloud-react-native/src/screens/WalletDetail/index.tsx 迁移。
 *
 * - 标题栏用 uni-app 原生导航栏（pages.json 的 navigationBarTitleText = 钱包详情）。
 * - @tanstack/react-query 的 useQuery -> onLoad 直接调 selectWallet 写入 wallet ref。
 * - useIsFocused 触发的重新拉取 -> 页面级 onShow。
 * - 饼图迁到 echarts（lime-echart 跨端 canvas 封装 + 用户提供的 echarts 6.1.0 构建），
 *   与 pkg-portfolio/edit-record 的持仓饼图风格一致（实心饼 + 扇区外百分比标注 + 底部 legend）。
 *   中心总计改用页面文字（模板里的 struct__total）；
 *   科目明细 / 点位基准分别用 wd-collapse、wd-cell，不自己造折叠面板。
 * - 总资产接口口径是 k（千元），页面上按万元展示，数字用钉钉进步体。
 */
import ToastContainer from '@/components/ToastContainer.vue'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import LEchart from '@/components/l-echart/l-echart.vue'
import echarts from '@/echarts/echarts.esm.js'
import { selectWallet } from '@/api'
import { Router } from '@/common/router'
import { CHART_HEIGHT } from '@/constants/chart'
import {
  calculateWalletFormSum,
  netInflowTag,
  netInflowTotal,
  parseNetInflow,
  WalletMaps
} from '@/constants/wallet'
import { useUserStore } from '@/stores/user'
import type { TWallet } from '@/types/wallet'
import { useThemeVars } from '@/composables/useThemeVars'
import { formatPiePercentTooltip, getWindowWidth, splitLegendRows } from '@/utils'

const themeVars = useThemeVars()


dayjs.extend(isoWeek)

const PIE_COLORS = [
  '#1e88e5',
  '#4CAF50',
  '#ff6b6b',
  '#ffb74d',
  '#8e24aa',
  '#26a69a',
  '#546e7a'
]

const userStore = useUserStore()
const theme = computed(() => userStore.theme)

const id = ref('')
const wallet = ref<TWallet>({} as TWallet)
const pagingList = ref<unknown[]>([])
/** wd-collapse 当前展开的科目 key（只有多账户科目可展开） */
const expandedNames = ref<string[]>([])

const walletKeys = Object.keys(WalletMaps) as Array<keyof typeof WalletMaps>

const totalSum = computed(() => calculateWalletFormSum(wallet.value))

/** 接口/存储口径是 k（千元），总资产按万元展示 */
const totalWan = computed(() => (parseFloat(totalSum.value) / 10).toFixed(2))

const settleLabel = computed(() => {
  const date = wallet.value?.settleOn
  if (!date) return '-'
  return `${dayjs(date).format('YYYY年')}${dayjs(date).isoWeek()}周`
})

const settleDay = computed(() => {
  const date = wallet.value?.settleOn
  if (!date) return '-'
  return dayjs(date).format('MM-DD')
})

/** 逐笔明细标签：只展示金额，不记事由；与编辑页 DeleteableTags 同款文案 */
const flowTags = computed(() => parseNetInflow(wallet.value?.netInflow).map(netInflowTag))

/**
 * 本周圈外进出（解释项，不参与总资产求和）：明细是 JSON 数字数组，净流入为自动合计。
 * 缺失（NULL / []）与合计 0 分开显示：老记录没有这个字段，不能把「未记录」显示成「无进出」。
 */
const flowNote = computed(() => {
  const total = netInflowTotal(wallet.value?.netInflow)
  if (total === null) return ' · 本周圈外进出未记录'
  return ` · 本周净流入 ${netInflowTag(total)}（${flowTags.value.length} 笔）`
})

/** 记账当日基准里的日期，用完整日期与 Hero 的「结算日 MM-DD」区分 */
const settleDate = computed(() => {
  const date = wallet.value?.settleOn
  if (!date) return '-'
  return dayjs(date).format('YYYY-MM-DD')
})

/** 7 个科目全列（含 0），数组科目带 isArray / list 供折叠展开，按金额降序 */
const detailItems = computed(() =>
  walletKeys
    .map(key => {
      const raw = (wallet.value as unknown as Record<string, unknown>)?.[key]
      const isArray = Array.isArray(raw)
      const list: string[] = isArray ? (raw as string[]) : []
      const amount = isArray
        ? list.reduce((sum: number, it: string) => sum + (parseFloat(it || '0') || 0), 0)
        : parseFloat((raw as string) || '0') || 0
      return {
        key: key as string,
        label: WalletMaps[key],
        amount,
        isArray,
        list,
        value: isArray ? `${list.length} 笔` : `${raw || 0}k`
      }
    })
    .sort((a, b) => b.amount - a.amount)
)

/** 只取金额大于 0 的资产，占比 = 单项 / 合计 */
const pieData = computed<Array<{ key: string; label: string; color: string; percent: number; amount: number }>>(
  () => {
    const items = detailItems.value.filter(it => it.amount > 0)
    const total = items.reduce((sum: number, it: { amount: number }) => sum + it.amount, 0)
    return items.map((it, index) => ({
      key: it.key,
      label: it.label,
      color: PIE_COLORS[index % PIE_COLORS.length],
      percent: total > 0 ? (it.amount / total) * 100 : 0,
      amount: it.amount
    }))
  }
)

/**
 * 画布宽度：wd-card 的内容宽 = windowWidth - 15px(margin) - 15px(padding)×2 = -60px。
 * 必须比这个窄，否则画布右侧溢出被裁，饼图的外部标注线（引线 + 百分比）会被裁掉。
 */
const pieChartWidth = Math.round(getWindowWidth() - 60)
const pieChartHeight = CHART_HEIGHT

const chartRef = ref<any>(null)
const echartInst = ref<any>(null)
/** l-echart.init 内部有 beforeDelay 异步等待，重复调用会 echarts.init 两次；用它互斥 */
let chartIniting = false

const buildOption = (): any => {
  const data = pieData.value.map(item => ({
    name: item.label,
    value: item.amount,
    itemStyle: { color: item.color }
  }))
  return {
    animation: true,
    // ★ renderMode:'richText' 不能省：默认 'html' 靠 DOM 拼弹层，App/小程序无 DOM → 不显示
    tooltip: {
      trigger: 'item',
      confine: true,
      renderMode: 'richText',
      formatter: formatPiePercentTooltip
    },
    // 单个 legend 折多行时行内左对齐（echarts 无「行内居中」开关），
    // 按行拆成多个 legend 各自 left:'center' 才能每行居中；bottom 逐行抬高一档。
    legend: splitLegendRows(pieData.value.map(it => it.label)).map((names, i, all) => ({
      show: true,
      left: 'center',
      bottom: 2 + (all.length - 1 - i) * 16,
      // 默认 padding:5 会撑大 legend 盒、把行距算偏，收成 0 由 bottom 精确控制行距
      padding: 0,
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 10,
      textStyle: { color: '#666', fontSize: 10 },
      data: names
    })),
    series: [{
      type: 'pie',
      radius: '58%',
      center: ['50%', '46%'],
      label: { show: true, color: '#666', fontSize: 10, formatter: '{d}%' },
      labelLine: { length: 8, length2: 8 },
      data
    }]
  }
}

const render = () => {
  const el = chartRef.value
  if (!el || pieData.value.length === 0) {
    echartInst.value = null
    return
  }
  if (echartInst.value) {
    el.setOption(buildOption(), true)
    return
  }
  if (chartIniting) return
  chartIniting = true
  el.init(echarts, null, {}, (chart: any) => {
    chartIniting = false
    echartInst.value = chart
    chart.setOption(buildOption(), true)
  })
}

// watch 负责数据到达后渲染；onMounted 兜住「数据在挂载前就已就绪」的情况
// （挂载前 watch 触发时 chartRef 还是 null，render 会 return，若不补这一下就永久空白）
watch(pieData, () => nextTick(render), { deep: true })
onMounted(() => nextTick(render))

const loadWallet = async () => {
  if (!id.value) return
  wallet.value = await selectWallet(id.value)
}

const onEdit = () => {
  if (!wallet.value?.id) return
  Router.navigate('EditWallet', { id: wallet.value.id })
}

onLoad((options?: any) => {
  id.value = options?.id || ''
  loadWallet()
})

onShow(() => {
  if (id.value) {
    loadWallet()
  }
})
</script>

<style lang="scss" scoped>
.detail {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f6f7f8;

  &__paging {
    flex: 1;
  }
  &__container {
    padding: 24rpx;

    /* wd-card 收成页面统一的卡片外观 */
    :deep(.wd-card) {
      margin: 0 0 20rpx;
      padding: 24rpx;
      border-radius: 16rpx;
      box-shadow: none;
    }
    :deep(.wd-card__title-content) {
      padding: 0 0 20rpx;
    }
    /* collapse 自带的左右留白改由卡片统一负责 */
    :deep(.wd-collapse-item__header) {
      padding-left: 0;
      padding-right: 0;
    }
    :deep(.wd-collapse-item__body) {
      padding: 0 0 20rpx;
    }
  }
  &__section-title {
    color: #333;
    font-size: 32rpx;
    font-weight: 500;
  }
  &__empty {
    color: #999;
    font-size: 24rpx;
  }
  &__footer {
    padding: 0;
  }
  &__footer-item {
    display: block;
    color: #b0b6b8;
    font-size: 24rpx;
    text-align: center;
  }
  &__bottom {
    padding: 20rpx 24rpx;
    background-color: #fff;
  }
}

/* 总资产 */
.hero {
  padding: 32rpx;
  margin-bottom: 20rpx;
  border-radius: 16rpx;

  &__head {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  &__label {
    color: rgba(255, 255, 255, 0.85);
    font-size: 26rpx;
  }
  &__unit {
    color: rgba(255, 255, 255, 0.6);
    font-size: 22rpx;
  }
  &__value {
    display: block;
    margin-top: 10rpx;
    color: #fff;
    /* 钉钉进步体，见 src/styles/fonts.scss（子集化 + base64 内联） */
    font-family: 'DingTalk-JinBuTi', 'PingFang SC', sans-serif;
    font-size: 72rpx;
    font-weight: normal;
  }
  &__meta {
    display: block;
    margin-top: 18rpx;
    color: rgba(255, 255, 255, 0.85);
    font-size: 24rpx;
  }
  &__time {
    display: block;
    margin-top: 6rpx;
    color: rgba(255, 255, 255, 0.6);
    font-size: 22rpx;
  }
}

/* 资产结构 */
.struct {
  &__chart-wrap {
    display: block;
    margin: 0 auto;
  }
  &__total {
    display: block;
    padding-top: 8rpx;
    color: #666;
    font-size: 28rpx;
    text-align: center;
  }
}

/* 科目明细 */
.items {
  &__head {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
  }
  &__label {
    flex: 1;
    color: #666;
    font-size: 28rpx;
  }
  &__value {
    color: #333;
    font-size: 28rpx;
  }
  &__arrow {
    display: flex;
    align-items: center;
    margin-left: 8rpx;
    transition: transform 0.3s;

    &.is-open {
      transform: rotate(180deg);
    }
  }
  &__sub {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: 16rpx;
  }
  &__sub-label {
    color: #999;
    font-size: 24rpx;
  }
  &__sub-value {
    color: #333;
    font-size: 24rpx;
  }
}

/* 记账当日基准：三项一行两端对齐（中项占满余量并居中） */
.bench {
  &__row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
  &__item {
    display: flex;
    flex-direction: column;
    min-width: 0;

    &:last-child {
      align-items: flex-end;
    }

    &--mid {
      flex: 1;
      align-items: center;
    }
  }
  &__label {
    color: #999;
    font-size: 24rpx;
  }
  &__value {
    margin-top: 8rpx;
    color: #333;
    font-size: 28rpx;
  }
  &__note {
    display: block;
    padding-top: 20rpx;
    color: #b0b6b8;
    font-size: 22rpx;
  }
  /* 本周圈外进出逐笔明细：定高 + flex 居中，不用上下 padding 撑高；
     与编辑页 DeleteableTags 同一套描边药丸，只是没有删除按钮 */
  &__flows {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12rpx;
    margin-top: 16rpx;
  }
  &__flow {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    height: 52rpx;
    padding: 0 14rpx;
    border: 2rpx solid #e5e5e5;
    border-radius: 12rpx;
  }
  &__flow-text {
    color: #333;
    font-size: 26rpx;
    line-height: 1;
  }
}
</style>
