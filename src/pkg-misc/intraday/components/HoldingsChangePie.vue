<template>
  <!-- 各标的涨跌幅饼图：扇区大小 = |涨跌幅|（不乘权重），颜色用 eCharts 默认调色板，
       不按涨跌染色。标签（标注）直接显示 标的名 + 带符号涨跌幅。放在矩阵树图下面。 -->
  <view class="cpie">
    <view class="cpie__head">
      <text class="cpie__title">标的涨跌</text>
      <text class="cpie__subtitle">仅涨跌幅，不含权重</text>
    </view>
    <view
      v-if="items.length"
      class="cpie__chart"
      :style="`width:${chartWidth}px;height:${chartHeight}px`"
    >
      <l-echart ref="chartRef" />
    </view>
    <view v-else class="cpie__empty">
      <text>暂无持仓数据</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getWindowWidth } from '@/utils'
import { nextTick, onMounted, ref, watch } from 'vue'
import LEchart from '@/components/l-echart/l-echart.vue'
import echarts from '@/echarts/echarts.esm.js'

interface HoldingChange {
  title: string
  weight: number
  changePercent: number
}

const props = defineProps<{ items: HoldingChange[] }>()
const chartRef = ref<any>(null)
const chart = ref<any>(null)
let chartIniting = false

const rpx = getWindowWidth() / 750
const chartWidth = Math.round(getWindowWidth() - 60 * rpx)
const chartHeight = 240

const fmt = (v: number) => `${v >= 0 ? '+' : '-'}${Math.abs(v).toFixed(2)}%`

const buildOption = () => ({
  animation: false,
  tooltip: { show: false },
  series: [
    {
      type: 'pie',
      // 环形饼图：留白给标签，减少小扇区标签重叠
      radius: ['38%', '66%'],
      center: ['50%', '50%'],
      label: {
        show: true,
        color: '#666666',
        fontSize: 10,
        formatter: (params: any) => `${params.data.name}\n${params.data.changeText}`
      },
      labelLine: {
        show: true,
        length: 8,
        length2: 10,
        lineStyle: { color: '#cccccc' }
      },
      data: props.items.map(item => ({
        name: item.title,
        // 扇区大小 = |涨跌幅|（最小兜底 0.01，避免 0 涨跌的标的塌成一条缝）
        value: Math.max(Math.abs(item.changePercent), 0.01),
        changeText: fmt(item.changePercent)
      }))
    }
  ]
})

const render = () => {
  const el = chartRef.value
  if (!el || !props.items.length) return
  if (chart.value) {
    el.setOption(buildOption(), true)
    return
  }
  if (chartIniting) return
  chartIniting = true
  el.init(echarts, null, {}, (instance: any) => {
    chartIniting = false
    chart.value = instance
    instance.setOption(buildOption(), true)
  })
}

onMounted(() => nextTick(render))
watch(
  () => props.items,
  () => nextTick(render),
  { deep: true }
)
</script>

<style lang="scss" scoped>
.cpie {
  padding: 20rpx 30rpx 0;
  margin-bottom: 2rpx;
  background-color: #fff;

  &__head {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 12rpx;
  }

  &__title {
    color: #333;
    font-size: 28rpx;
    font-weight: 500;
  }

  &__subtitle {
    color: #999;
    font-size: 20rpx;
  }

  &__chart {
    margin: 0 auto;
  }

  &__empty {
    padding: 60rpx 0;
    color: #b0b6b8;
    font-size: 24rpx;
    text-align: center;
  }
}
</style>
