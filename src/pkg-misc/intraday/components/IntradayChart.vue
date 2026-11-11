<!--
  盘中收益走势（同 tv-tauri 的日内走势）：四条线——预计收益 / 上证 / 沪深300 / 创业板指。
  数据源 /intraday-returns，由父页（首页）查一次后经 samples 传入；本组件只负责渲染。

  ★ 渲染用 echarts（lime-echart 跨端 canvas 封装 + 项目统一的 echarts 构建），
    与 WalletTrend 同款范式（注入式 init + setOption(notMerge)）。
  性能红线（旧 uCharts 版踩过的坑，迁 echarts 后仍适用）：
    - animation: false —— 盘中一天能累积 1400+ 样本，入场动画会逐帧全量重绘、真机卡死；
    - 折线用直线（smooth: false），不用曲线，减少每条指令参数；
    - canvas 上不绑 touch 事件（tooltip 会整图重绘 + 吃掉滚动容器手势）。
-->
<template>
  <view class="intraday">
    <view class="intraday__head">
      <text class="intraday__title">盘中收益走势</text>
      <text class="intraday__subtitle">09:45–11:45 · 13:15–15:15</text>
    </view>

    <!-- 图表用 v-if：样本不足两点时卸载，改画空态（切回时要重建实例，见 watch） -->
    <view
      v-if="canDraw"
      class="intraday__chart-wrap"
      :style="`width:${chartWidth}px;height:${chartHeight}px`">
      <l-echart ref="chartRef" />
    </view>
    <view v-else class="intraday__empty">
      <text class="intraday__empty-text">暂无走势数据</text>
    </view>

    <!-- 自绘图例：与 series 一一对应，紧跟画布下方 -->
    <view v-if="canDraw" class="intraday__legend">
      <view v-for="it in legendItems" :key="it.name" class="intraday__legend-item">
        <view class="intraday__legend-dot" :style="{ backgroundColor: it.color }" />
        <text class="intraday__legend-text">{{ it.name }}</text>
      </view>
    </view>

    <view class="intraday__values">
      <view v-for="item in latestValues" :key="item.name" class="intraday__value">
        <text class="intraday__value-name">{{ item.name }}</text>
        <text
          class="intraday__value-number"
          :style="{ color: valueColor(item.value) }"
        >
          {{ formatValue(item.value) }}
        </text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
/**
 * 盘中收益走势图
 *
 * 四条线共用一条 Y 轴（都是百分比，量纲一致）：
 *   预计收益（后端按持仓权重加权的当日涨跌）+ 上证指数 + 沪深300 + 创业板指。
 * 指数未采到时值为 null，echarts `connectNulls: false` 会在此断线（不连片），图表不空。
 *
 * ★ x 轴是**固定轴**（与 tv-tauri 同步）：09:45–11:45 + 13:15–15:15 两段拼接，
 *   午休 11:45–13:15 不占刻度；没有数据的时间槽填 null，线断开留白。
 *   写死是因为数据源比真实盘面晚 15 分钟（9:30 开盘记成 9:45、15:00 收盘记成 15:15），
 *   不能按「有几个点画几个点」动态铺轴，否则未开盘时段图会一路往左缩。
 */
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import LEchart from '@/components/l-echart/l-echart.vue';
import echarts from '@/echarts/echarts.esm.js';
import { getWindowWidth } from '@/utils';
import type { IntradayReturnSample } from '@/types/intraday';

const props = withDefaults(defineProps<{ samples?: IntradayReturnSample[] }>(), {
  samples: () => []
});

/**
 * 四条线的配色（图例与 series 共用同一份，HTML 自绘图例和 canvas 画线才不会脱色）。
 * 预计收益用项目涨红（唯一红 = UP_COLOR #e54848），三个指数用蓝 / 青 / 紫区分。
 * ★ 不用灰色阶（原来的 #333/#888/#ccc）：三档深浅灰在白底上对比度都偏低，
 *   三条线挤在一起分不清谁是谁，一眼看过去像「两条深灰 + 一条浅灰」。
 */
const SERIES_META = [
  { key: 'expected', name: '预计收益', color: '#e54848' },
  { key: 'shanghai', name: '上证指数', color: '#3b82f6' },
  { key: 'csi300', name: '沪深300', color: '#0d9488' },
  { key: 'chinext', name: '创业板指', color: '#8b5cf6' }
] as const;

const legendItems = computed(() => SERIES_META.map(({ name, color }) => ({ name, color })));

const latestValues = computed(() => {
  const sample = props.samples[props.samples.length - 1];
  return SERIES_META.map(({ key, name }) => ({
    name,
    value: sample?.[key] ?? null
  }));
});

const formatValue = (value: number | null) =>
  value == null || !Number.isFinite(value) ? '暂无' : `${value.toFixed(2)}%`;

const valueColor = (value: number | null) => {
  if (value == null || !Number.isFinite(value) || value === 0) return '#666';
  return value > 0 ? '#e54848' : '#16a34a';
};

/** 画布尺寸：卡片左右各 30rpx 内边距，按 rpx 折算成 px 扣掉（不同屏宽都准） */
const rpx = getWindowWidth() / 750;
const chartWidth = Math.round(getWindowWidth() - 60 * rpx);
const chartHeight = 160;

/** 无数据可推断间隔时的兜底步长（分钟） */
const FALLBACK_STEP = 15;

/**
 * 固定时段（当天分钟数）：[09:45, 11:45] 与 [13:15, 15:15]。
 * 午休 11:45–13:15 被 slotsOf 跳过，两段直接拼接。
 */
const SESSIONS: ReadonlyArray<readonly [number, number]> = [
  [9 * 60 + 45, 11 * 60 + 45],
  [13 * 60 + 15, 15 * 60 + 15]
];

/**
 * 'yyyy-MM-ddTHH:mm:ss' → 当天分钟数（09:45 → 585）。
 * ★ 字符串切片，不走 new Date()：api 层已把 sampleAt 规范成 'yyyy-MM-ddTHH:mm:ss'，
 *   切片拿到的就是后端写入时的北京时间墙上时间；用 new Date() 会引入时区/解析歧义
 *   （小程序与 iOS 对无时区的 ISO 串解析口径不同，可能差 8 小时）。
 */
const minutesOf = (time: string): number => {
  const hh = Number(time.slice(11, 13));
  const mm = Number(time.slice(14, 16));
  if (!Number.isFinite(hh) || !Number.isFinite(mm)) return -1;
  return hh * 60 + mm;
};

/** 分钟数 → 'HH:mm' */
const labelOf = (minutes: number): string => {
  const h = String(Math.floor(minutes / 60)).padStart(2, '0');
  const m = String(minutes % 60).padStart(2, '0');
  return `${h}:${m}`;
};

/**
 * 采样步长取相邻点分钟差的**众数**（比取最小值抗抖动）；
 * >60 分钟视为断档（午休/停牌）不参与推断，避免把步长算歪。
 */
const stepOf = (times: number[]): number => {
  const counts = new Map<number, number>();
  for (let i = 1; i < times.length; i += 1) {
    const diff = times[i] - times[i - 1];
    if (diff <= 0 || diff > 60) continue;
    counts.set(diff, (counts.get(diff) ?? 0) + 1);
  }
  if (!counts.size) return FALLBACK_STEP;
  let best = FALLBACK_STEP;
  let bestCount = 0;
  counts.forEach((count, diff) => {
    if (count > bestCount) {
      best = diff;
      bestCount = count;
    }
  });
  return best;
};

/** 固定槽位序列：两段拼接，午休不占刻度 */
const slotsOf = (step: number): number[] => {
  const slots: number[] = [];
  SESSIONS.forEach(([start, end]) => {
    for (let m = start; m <= end; m += step) slots.push(m);
  });
  return slots;
};

/** 步长由实际数据推断；没数据时用兜底值，保证空图也是完整坐标轴 */
const step = computed(() => {
  const times = props.samples
    .map(s => minutesOf(s.time))
    .filter((m) => m >= 0)
    .sort((a, b) => a - b);
  return stepOf(times);
});

/** 固定 x 轴刻度，与数据量无关 */
const slots = computed(() => slotsOf(step.value));
const categories = computed(() => slots.value.map(labelOf));

/** 采样分钟 → 样本，便于按槽位查表 */
const sampleByMinute = computed(() => {
  const map = new Map<number, IntradayReturnSample>();
  props.samples.forEach(s => {
    const m = minutesOf(s.time);
    if (m >= 0) map.set(m, s);
  });
  return map;
});

/** 落在固定槽位上的真实点数（= 有数据的槽位数，不是原始样本条数） */
const pointCount = computed(() => {
  const map = sampleByMinute.value;
  return slots.value.filter(m => map.has(m)).length;
});

/** 样本不足两点画不出线；此时不挂图表，走空态 */
const canDraw = computed(() => props.samples.length > 1);

/**
 * 槽位 → 数值；槽位无样本填 null。
 * echarts 折线遇 null 默认断开不连片（connectNulls: false），正是「无数据留白」要的效果。
 */
const series = computed<any[]>(() => {
  const map = sampleByMinute.value;
  return SERIES_META.map(({ key, name, color }) => ({
    name,
    color,
    data: slots.value.map(m => {
      const s = map.get(m);
      if (!s) return null;
      const v = s[key];
      return typeof v === 'number' ? v : null;
    })
  }));
});

/** x 轴目标标签数：按**槽位数**（固定轴长度）算，不按样本数 */
const labelCount = computed(() => {
  const n = slots.value.length;
  if (n > 80) return 5;
  if (n > 30) return 4;
  return 3;
});

/** echarts axisLabel.interval：每隔 (interval+1) 个显示一个 */
const labelInterval = computed(() => {
  const n = slots.value.length;
  const target = labelCount.value;
  return n > target ? Math.ceil(n / target) - 1 : 0;
});

/**
 * 点少才画圆点，点一多反而糊成毛边（与 WalletTrend 同款口径）。
 * 按**真实点数**判断：固定轴下槽位总数不代表数据密度，盘初只有几个点时要画点，
 * 否则那条短线一个点都看不见。
 */
const showPoint = computed(() => pointCount.value <= 12);

const buildOption = (): any => ({
  // ★ 真机性能红线：关闭入场动画（盘中样本量大，逐帧全量重绘会卡死）
  animation: false,
  grid: { left: 4, right: 8, top: 10, bottom: 4, containLabel: true },
  tooltip: { show: false },
  legend: { show: false },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: categories.value,
    axisLabel: { color: '#999999', fontSize: 10, interval: labelInterval.value },
    axisLine: { lineStyle: { color: '#eeeeee' } },
    axisTick: { show: false }
  },
  yAxis: {
    type: 'value',
    axisLabel: { color: '#999999', fontSize: 10, formatter: '{value}%' },
    splitLine: { lineStyle: { color: '#f0f0f0', type: 'dashed' } }
  },
  series: series.value.map(s => ({
    name: s.name,
    type: 'line',
    data: s.data,
    // 指数未采到时 null 断线，不连片
    connectNulls: false,
    // 直线不用曲线：减少单条绘制指令参数（真机性能）
    smooth: false,
    showSymbol: showPoint.value,
    symbol: 'circle',
    symbolSize: 4,
    lineStyle: { width: 1.5, color: s.color },
    itemStyle: { color: s.color }
  }))
});

const chartRef = ref<any>(null);
const echartInst = ref<any>(null);
/** l-echart.init 内部有 beforeDelay 异步等待，重复调用会 echarts.init 两次；用它互斥 */
let chartIniting = false;

const render = () => {
  const el = chartRef.value;
  if (!el || !canDraw.value) {
    echartInst.value = null;
    return;
  }
  if (echartInst.value) {
    el.setOption(buildOption(), true);
    return;
  }
  if (chartIniting) return;
  chartIniting = true;
  el.init(echarts, null, {}, (chart: any) => {
    chartIniting = false;
    echartInst.value = chart;
    chart.setOption(buildOption(), true);
  });
};

// onMounted 兜住「样本在挂载前就已就绪」的情况；watch 负责样本到达 / 刷新后重绘
onMounted(() => nextTick(render));
watch(
  () => props.samples,
  () => {
    // 图表是 v-if 挂载的：样本从不足两点变够时图表才被创建，
    // 必须等 nextTick 让 canvas 真渲染出来再画，否则画到不存在的节点上。
    if (!canDraw.value) {
      // 切走时空态替代图表（l-echart beforeDestroy 已 dispose），旧实例作废
      echartInst.value = null;
      chartIniting = false;
      return;
    }
    nextTick(render);
  }
  // ★ 不开 deep：父组件是**整体替换**数组（`intradaySamples.value = await selectIntradayReturns()`），
  //   引用一变浅 watch 就会触发。deep 要对 1400+ 个对象逐字段建依赖、触发时再深度 diff，
  //   真机上纯属白烧 CPU。若将来父组件改成 push 原地改，必须把 deep 加回来。
);
</script>

<style lang="scss" scoped>
.intraday {
  padding: 20rpx 30rpx 24rpx;
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
  &__chart-wrap {
    margin: 0 auto;
  }
  /* 空态：样本不足两点（如 09:45 前 / 非交易日）时占位，避免图表空白 */
  &__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 150px;
  }
  &__empty-text {
    color: #b0b6b8;
    font-size: 24rpx;
  }
  /* 自绘图例：居中的一行「短横杠 + 名称」，紧跟画布下方 */
  &__legend {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 10rpx;
  }
  &__legend-item {
    display: flex;
    flex-direction: row;
    align-items: center;

    & + & {
      margin-left: 24rpx;
    }
  }
  /* 自绘图例：色块改成短横杠，跟图里的折线形态一致（方块看着像色卡不像线） */
  &__legend-dot {
    width: 20rpx;
    height: 6rpx;
    border-radius: 3rpx;
  }
  &__legend-text {
    margin-left: 8rpx;
    color: #666;
    font-size: 20rpx;
    line-height: 1;
  }

  &__values {
    display: flex;
    flex-direction: row;
    margin-top: 18rpx;
    border-top: 1rpx solid #f0f0f0;
    padding-top: 16rpx;
  }

  &__value {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
  }

  &__value + &__value {
    border-left: 1rpx solid #f0f0f0;
  }

  &__value-name {
    color: #888;
    font-size: 20rpx;
  }

  &__value-number {
    margin-top: 6rpx;
    font-size: 26rpx;
    font-weight: 500;
  }
}
</style>
