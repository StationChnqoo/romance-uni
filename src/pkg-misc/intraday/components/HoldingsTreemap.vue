<template>
  <view class="treemap">
    <view class="treemap__head">
      <text class="treemap__title">持仓贡献</text>
      <text class="treemap__subtitle">权重 × 涨跌幅</text>
    </view>
    <view
      v-if="items.length"
      class="treemap__chart"
      :style="`width:${chartWidth}px;height:${chartHeight}px`">
      <l-echart ref="chartRef" />
    </view>
    <view v-else class="treemap__empty">
      <text>暂无持仓数据</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import {getWindowWidth} from '@/utils';
import {nextTick, onMounted, ref, watch} from 'vue';
import LEchart from '@/components/l-echart/l-echart.vue';
import echarts from '@/echarts/echarts.esm.js';

interface HoldingContribution {
  title: string;
  weight: number;
  changePercent: number;
}

const props = defineProps<{items: HoldingContribution[]}>();
const chartRef = ref<any>(null);
const chart = ref<any>(null);
let chartIniting = false;

const rpx = getWindowWidth() / 750;
const chartWidth = Math.round(getWindowWidth() - 60 * rpx);
const chartHeight = 160;

const buildOption = () => ({
  animation: false,
  tooltip: {show: false},
  series: [
    {
      type: 'treemap',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      padding: 0,
      roam: false,
      nodeClick: false,
      breadcrumb: {show: false},
      squareRatio: 1.15,
      gapWidth: 1,
      label: {
        show: true,
        color: '#fff',
        fontSize: 12,
        align: 'center',
        formatter: ({
          data,
        }: {
          data: {name: string; changePercent: number; contribution: number};
        }) =>
          // `${data.name}\n${data.changePercent.toFixed(2)}% / ${data.contribution.toFixed(2)}%`
          `${data.name}\n${data.contribution.toFixed(2)}%`,
      },
      upperLabel: {show: false},
      data: props.items
        .map(item => ({
          name: item.title,
          value: Math.max(Math.abs(item.weight * item.changePercent), 0.01),
          changePercent: item.changePercent,
          contribution: (item.weight * item.changePercent) / 100,
          itemStyle: {
            color: item.changePercent >= 0 ? '#e54848' : '#16a34a',
            borderColor: '#fff',
            borderWidth: 1,
            gapWidth: 1,
          },
        }))
        .sort((a, b) => b.value - a.value),
    },
  ],
});

const render = () => {
  const el = chartRef.value;
  if (!el || !props.items.length) return;
  if (chart.value) {
    el.setOption(buildOption(), true);
    return;
  }
  if (chartIniting) return;
  chartIniting = true;
  el.init(echarts, null, {}, (instance: any) => {
    chartIniting = false;
    chart.value = instance;
    instance.setOption(buildOption(), true);
  });
};

onMounted(() => nextTick(render));
watch(
  () => props.items,
  () => nextTick(render),
  {deep: true},
);
</script>

<style lang="scss" scoped>
.treemap {
  padding: 20rpx 30rpx;
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
