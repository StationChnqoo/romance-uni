<!--
  持仓扇形图（原 pkg-portfolio/analysis 持仓分析页的饼图）。
  2026-11-08 分析页连同「分析」入口一起删除，饼图移进 edit-record 编辑页，
  直接对**当前表单**（可能尚未保存）实时联动：改金额 → 扇区即时变。
-->
<template>
  <view class="pie">
    <text class="pie__total">总持仓 {{ chartTotalAmount.toFixed(1) }}K</text>
    <template v-if="chartData.length">
      <view
        class="pie__canvas"
        :style="{ width: `${chartWidth}px`, height: `${chartHeight}px` }"
      >
        <l-echart ref="chartRef" />
      </view>
    </template>
    <view v-else class="pie__empty">
      <text class="pie__empty-text">暂无可用于饼图的数据</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
/**
 * 持仓扇形图：按名称聚合资产金额（同名资产合并为一个扇区，扇区值 = 金额合计），
 * 口径与原持仓分析页完全一致：
 * - 环形 radius ['42%','66%']，扇区外「名称 占比%」标签，底部按行居中的 legend
 *   （splitLegendRows 拆多行，各 left:'center'，解决 echarts 单 legend 行内左对齐）；
 * - tooltip 必须 renderMode:'richText'（默认 'html' 靠 DOM 拼弹层，App/小程序无 DOM → 不显示）；
 * - 金额单位沿用 K。
 */
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import LEchart from '@/components/l-echart/l-echart.vue'
import echarts from '@/echarts/echarts.esm.js'
import { CHART_HEIGHT } from '@/constants/chart'
import type { PortfolioAssetItem } from '@/types/portfolio'
import { formatPiePercentTooltip, getWindowWidth, splitLegendRows } from '@/utils'

const props = defineProps<{ assets: PortfolioAssetItem[] }>()

/** 扇区配色，与原分析页（RN 的 PIE_COLORS）逐项一致 */
const PIE_COLORS = [
  '#1e88e5',
  '#4CAF50',
  '#ff6b6b',
  '#ffb74d',
  '#8e24aa',
  '#26a69a',
  '#546e7a',
  '#f06292',
  '#7e57c2',
  '#ab47bc'
]

const chartWidth = Math.round(getWindowWidth() - 48)
const chartHeight = CHART_HEIGHT

const chartRef = ref<any>(null)
const echartInst = ref<any>(null)
/** l-echart.init 内部有 beforeDelay 异步等待，重复调用会 echarts.init 两次；用它互斥 */
let chartIniting = false

const toNumber = (value: unknown) => {
  const num = Number(value)
  return isNaN(num) ? 0 : num
}

/** amount 可能是单值也可能是数组（schema 的 preprocess 已统一成数组，这里再兜一次） */
const toAmountArray = (asset: PortfolioAssetItem): number[] => {
  const raw: unknown[] = Array.isArray(asset.amount) ? asset.amount : [asset.amount]
  return raw.map(toNumber).filter(num => !isNaN(num))
}

/** 同名资产合并（含空名）算总额，过滤掉没有金额的项 */
const chartData = computed(() => {
  const totals: Record<string, number> = {}
  props.assets.forEach(asset => {
    const sum = toAmountArray(asset).reduce((acc, num) => acc + num, 0)
    totals[asset.name] = (totals[asset.name] ?? 0) + sum
  })
  return Object.keys(totals)
    .filter(name => totals[name] > 0)
    .map((name, index) => ({
      name,
      value: totals[name],
      color: PIE_COLORS[index % PIE_COLORS.length]
    }))
})

const chartTotalAmount = computed(() =>
  chartData.value.reduce((sum, item) => sum + item.value, 0)
)

const buildOption = (): any => {
  const data = chartData.value.map(it => ({
    name: it.name,
    value: it.value,
    itemStyle: { color: it.color }
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
    // 图注用 echarts 自带 legend；单个 legend 折多行时行内左对齐（echarts 没有「行内居中」
    // 开关），按行拆成多个 legend 各 left:'center' 实现「每行居中」，bottom 逐行抬高。
    legend: splitLegendRows(chartData.value.map(it => it.name)).map((data, i, all) => ({
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
      data
    })),
    series: [{
      type: 'pie',
      radius: ['42%', '66%'],
      // 底部留出 legend 空间，饼心略上移
      center: ['50%', '46%'],
      label: { show: true, color: '#666', fontSize: 10, formatter: '{b} {d}%' },
      labelLine: { length: 8, length2: 8 },
      data
    }]
  }
}

const render = () => {
  const el = chartRef.value
  // 空数据时 l-echart 会被 v-if 卸载（el 为 null），这里顺手清掉旧实例，
  // 否则下次数据回来会拿着绑在已卸载 canvas 上的旧实例走 setOption（白图）
  if (!el || chartData.value.length === 0) {
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

// 数据可能在挂载前就有了（onLoad 里同步赋值的场景）→ watch 先于 DOM 触发、
// chartRef 仍为 null 会直接 return；onMounted 补一次兜底，否则饼图永久空白。
watch(
  () => chartData.value,
  () => nextTick(render),
  { deep: true }
)
onMounted(() => nextTick(render))
</script>

<style lang="scss" scoped>
.pie {
  &__total {
    display: block;
    padding-top: 8rpx;
    color: #666;
    font-size: 28rpx;
    text-align: center;
  }
  &__canvas {
    display: block;
    margin: 0 auto;
  }
  &__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80rpx 0;
  }
  &__empty-text {
    color: #999;
    font-size: 28rpx;
  }
}
</style>
