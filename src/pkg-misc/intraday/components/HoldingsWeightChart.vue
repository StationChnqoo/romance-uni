<template>
  <view class="weights">
    <view class="weights__head">
      <text class="weights__title">持仓涨跌</text>
      <text class="weights__subtitle">按权重从高到低排列</text>
    </view>
    <view
      v-if="items.length"
      class="weights__chart"
      :style="`width:${chartWidth}px;height:${chartHeight}px`"
    >
      <l-echart ref="chartRef" />
    </view>
    <view v-else class="weights__empty">
      <text>暂无持仓配置</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getWindowWidth } from '@/utils'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import LEchart from '@/components/l-echart/l-echart.vue'
import echarts from '@/echarts/echarts.esm.js'

interface HoldingChange {
  title: string
  changePercent: number
}

const props = defineProps<{ items: HoldingChange[] }>()

const chartRef = ref<any>(null)
const chart = ref<any>(null)
let chartIniting = false

const rpx = getWindowWidth() / 750
const chartWidth = Math.round(getWindowWidth() - 60 * rpx)
const chartHeight = 160

const buildOption = () => ({
  animation: false,
  tooltip: { show: false },
  grid: { left: 8, right: 28, top: 12, bottom: 8, containLabel: true },
  // 横排柱状图：x 轴数值（涨跌幅%），y 轴类目（持仓名）
  xAxis: {
    type: 'value',
    axisLabel: { color: '#999999', fontSize: 10, formatter: '{value}%' },
    splitLine: { lineStyle: { color: '#f0f0f0', type: 'dashed' } }
  },
  yAxis: {
    type: 'category',
    data: props.items.map(item => item.title),
    // 数据已按权重降序传入（首项=最大）；y 轴默认首项在最下，inverse 后首项到最上
    inverse: true,
    axisLabel: { color: '#666666', fontSize: 10, interval: 0 },
    axisLine: { lineStyle: { color: '#eeeeee' } },
    axisTick: { show: false }
  },
  series: [{
    type: 'bar',
    data: props.items.map(item => ({
      value: item.changePercent,
      itemStyle: {
        color: item.changePercent >= 0 ? '#e54848' : '#16a34a',
        // 横排：圆角在右端（涨，向右）或左端（跌，向左）
        borderRadius: item.changePercent >= 0 ? [0, 4, 4, 0] : [4, 0, 0, 4]
      }
    })),
    barMaxWidth: 18,
    label: {
      show: true,
      position: 'right',
      color: '#666666',
      fontSize: 10,
      formatter: ({ value }: { value: number }) => `${Number(value).toFixed(2)}%`
    }
  }]
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
.weights {
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
