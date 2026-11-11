<template>
  <view class="wtrend">
    <view class="wtrend__card">
      <view class="wtrend__head">
        <text class="wtrend__title">资产与指数同期走势</text>
        <text class="wtrend__subtitle">累计涨跌幅（以区间起点为基准）</text>
        <!-- 区间切换：直接用 wot 官方 wd-segmented（virtualHost+shared，跨端样式可控），整卡宽、与卡片同圆角 -->
        <wd-segmented
          v-model:value="range"
          :options="RANGES"
          size="middle"
          custom-class="wtrend__seg"
        >
          <template #label="{ option }">
            <text>{{ rangeLabel(option.value) }}</text>
          </template>
        </wd-segmented>
      </view>

      <view
        v-if="rows.length > 1"
        class="wtrend__chart-wrap"
        :style="`width:${chartWidth}px;height:${chartHeight}px`"
      >
        <l-echart ref="chartRef" />
      </view>
      <view v-else class="wtrend__empty">
        <text class="wtrend__empty-text">
          {{ points.length ? '所选区间不足两期记录' : '暂无走势数据' }}
        </text>
      </view>

      <!-- 自绘图例：与 series 一一对应（某序列全空时不显示） -->
      <view v-if="rows.length > 1" class="wtrend__legend">
        <view v-for="it in legendItems" :key="it.name" class="wtrend__legend-item">
          <view class="wtrend__legend-dot" :style="{ backgroundColor: it.color }" />
          <text class="wtrend__legend-text">{{ it.name }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
/**
 * 资产与指数同期走势图（参考「資産価値の推移」卡：标题 + 区间切换 + 曲线）
 *
 * 三序列同图：总资产（面积）+ 上证指数（折线）+ 标普500（折线）。
 * 三者量纲不同（总资产是万元、指数是千点），直接叠绝对数值 Y 轴含义混乱，
 * 故统一按「区间起点 = 0%」归一化成累计涨跌幅，这样三条线可比、语义是「谁涨得多」。
 * 指数数据来自钱包记录自带的 indexSh000001 / indexSpx（每条周记录都有，早期可能为空 → 跳过该序列）。
 *
 * 渲染从 uCharts 迁到 echarts（lime-echart 跨端 canvas 封装 + 用户提供的 echarts 6.1.0 构建）：
 * - 三个序列各自归一化（互不影响），总资产 series 走面积填充（areaStyle），指数走纯折线。
 * - 区间切换只换数据；series 数量可能变化，echarts setOption(notMerge) 自动处理，无需销毁重建。
 * - x 轴抽稀用 axisLabel.interval（点数多时跳着显示，避免标签糊成一条）。
 * - 图例改用模板里的 HTML 图例（与旧版一致），echarts 内置 legend 关闭。
 *
 * 2026-10-31 布局调整：区间切换从「挤在标题右侧的药丸」改为整卡宽控件。最终直接复用 wot 官方
 * `wd-segmented`（自带等宽分段 + 滑块动画，virtualHost + styleIsolation:shared 跨端样式可控），
 * 不再自己手写等分控件。原因：药丸贴标题右侧会在右下角留大片空白、副标题单独成行显得悬空/突兀；
 * 整卡宽控件占满宽度、无空白，是金融 App 标准排法。
 */
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import LEchart from '@/components/l-echart/l-echart.vue'
import echarts from '@/echarts/echarts.esm.js'
import { useUserStore } from '@/stores/user'
import { formatAxisPercentTooltip, getWindowWidth } from '@/utils'

dayjs.extend(isoWeek)

interface TrendPoint {
  date: string
  total: number
  sh: number | null
  spx: number | null
}

/** 区间档位：value = 0 表示全部（按 settleOn 过滤） */
const RANGES = [
  { label: '近3月', value: 3 },
  { label: '近半年', value: 6 },
  { label: '近1年', value: 12 },
  { label: '全部', value: 0 }
]

const props = withDefaults(defineProps<{ points?: TrendPoint[] }>(), {
  points: () => []
})

const userStore = useUserStore()
const theme = computed(() => userStore.theme)

const range = ref(12)

const rows = computed(() => {
  if (range.value === 0) return props.points
  const cutoff = dayjs().subtract(range.value, 'month').valueOf()
  return props.points.filter(it => dayjs(it.date).valueOf() >= cutoff)
})

/**
 * 三序列各自归一化成「相对区间起点累计涨跌幅 %」：
 * 每条序列独立以自身第一个有效点为基准（互不影响，某序列中间有空也不连累其他）。
 */
const series = computed<any[]>(() => {
  const baseOf = (vals: (number | null)[]) => {
    const i = vals.findIndex(v => v != null)
    return i >= 0 ? (vals[i] as number) : null
  }
  const norm = (vals: (number | null)[]) => {
    const base = baseOf(vals)
    if (base == null || base === 0) return vals.map(() => null)
    return vals.map(v => (v != null ? Number((((v - base) / base) * 100).toFixed(2)) : null))
  }
  const total = norm(rows.value.map(r => r.total))
  const sh = norm(rows.value.map(r => r.sh))
  const spx = norm(rows.value.map(r => r.spx))
  const out: any[] = [{ name: '总资产', data: total, color: theme.value, type: 'area' }]
  if (sh.some(v => v != null)) {
    out.push({ name: '上证指数', data: sh, color: '#cccccc', type: 'line' })
  }
  if (spx.some(v => v != null)) {
    out.push({ name: '标普500', data: spx, color: '#333333', type: 'line' })
  }
  return out
})

/** 自绘图例项：与 series 一一对应（某序列全空时不显示） */
const legendItems = computed(() => series.value.map(s => ({ name: s.name as string, color: s.color as string })))

/** wd-segmented 的 option 只暴露 value，标签按 value 反查 */
const rangeLabel = (value: string | number) =>
  RANGES.find(r => r.value === value)?.label ?? `${value}`

/** 点少才画圆点，点一多反而糊成毛边 */
const showPoint = computed(() => rows.value.length <= 12)

/** 区间跨年时轴标签带年份，避免 10/21 这种短日期出现两次混淆 */
const crossYear = computed(() => {
  const years = rows.value.map(it => dayjs(it.date).year())
  return new Set(years).size > 1
})

/** 画布尺寸：图例已移出画布 */
const chartWidth = Math.round(getWindowWidth() - 60)
/** 画布高度：150 太矮，曲线挤成一条扁带，看不出走势形状 → 200px */
const chartHeight = 200

const chartRef = ref<any>(null)
const echartInst = ref<any>(null)

const buildOption = (): any => {
  const categories = rows.value.map(it => {
    const d = dayjs(it.date)
    return `${d.year()}年${String(d.isoWeek()).padStart(2, '0')}周`
  })
  const echSeries = series.value.map((ser) => {
    const isArea = ser.type === 'area'
    return {
      name: ser.name,
      type: 'line',
      data: ser.data,
      connectNulls: false,
      smooth: true,
      showSymbol: showPoint.value,
      symbol: 'circle',
      symbolSize: 4,
      lineStyle: { width: 1, color: ser.color },
      itemStyle: { color: ser.color },
      areaStyle: isArea ? { opacity: 0.18, color: ser.color } : undefined
    }
  })
  return {
    animation: true,
    grid: { left: 4, right: 8, top: 12, bottom: 22, containLabel: true },
    // ★ renderMode:'richText' 不能省：默认 'html' 是用 DOM 拼的弹层，
    //   App/小程序 canvas 环境没有可挂载的 DOM → tooltip 静默不显示（不报错）。
    tooltip: {
      trigger: 'axis',
      confine: true,
      renderMode: 'richText',
      formatter: formatAxisPercentTooltip
    },
    legend: { show: false },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: categories,
      // 抽稀交给 echarts 默认的 interval:'auto' + hideOverlap（按 label 实际宽度算间隔），
      // 不再自己按点数手算——那样近 3 月（~13 点）会全量显示，长标签必然糊成一片。
      // 轴上只显示「月/日」（跨年补两位年份），完整「xxxx年第nn周」留给 tooltip 标题。
      axisLabel: {
        color: '#999999',
        fontSize: 10,
        hideOverlap: true,
        formatter: (_value: string, index: number) => {
          const it = rows.value[index]
          if (!it) return ''
          const d = dayjs(it.date)
          const md = `${d.month() + 1}/${d.date()}`
          return crossYear.value ? `${String(d.year()).slice(2)}/${md}` : md
        }
      },
      axisLine: { lineStyle: { color: '#eeeeee' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#999999', fontSize: 10, formatter: '{value}%' },
      splitLine: { lineStyle: { color: '#f0f0f0', type: 'dashed' } }
    },
    series: echSeries
  }
}

const render = () => {
  const el = chartRef.value
  if (!el || rows.value.length < 2) {
    echartInst.value = null
    return
  }
  if (echartInst.value) {
    el.setOption(buildOption(), true)
    return
  }
  el.init(echarts, null, {}, (chart: any) => {
    echartInst.value = chart
    chart.setOption(buildOption(), true)
  })
}

watch([rows, series], () => nextTick(render), { deep: true })
onMounted(() => nextTick(render))
</script>

<style lang="scss" scoped>
.wtrend {
  &__card {
    padding: 24rpx;
    margin: 0 24rpx 20rpx;
    border-radius: 16rpx;
    background-color: #fff;
  }
  /* 头部：竖排，标题 + 副标题左对齐成一组，区间分段控件占整卡宽一行 */
  &__head {
    display: flex;
    flex-direction: column;
  }
  &__title {
    color: #333;
    font-size: 28rpx;
    font-weight: 500;
  }
  &__subtitle {
    margin-top: 4rpx;
    color: #999;
    font-size: 20rpx;
  }
  /* 区间切换：直接用 wot 官方 wd-segmented（virtualHost + styleIsolation:shared，跨端样式可控）。
     整卡宽、与卡片同圆角，替代之前自己手写的等分控件——既不用造轮子，也不会在标题右侧留空白。 */
  &__seg {
    margin-top: 16rpx;

    /* wd-segmented 默认激活项 font-weight:550，压到 500 以符合全局字重规范 */
    :deep(.wd-segmented__item) {
      font-weight: 400;
    }
    :deep(.wd-segmented__item.is-active) {
      font-weight: 500;
    }
  }
  &__chart-wrap {
    margin: 12rpx auto 0;
  }
  /* 自绘图例：居中的一行「色块 + 名称」，紧跟画布下方 */
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
      margin-left: 28rpx;
    }
  }
  &__legend-dot {
    width: 16rpx;
    height: 16rpx;
    border-radius: 4rpx;
  }
  &__legend-text {
    margin-left: 8rpx;
    color: #666;
    font-size: 20rpx;
    line-height: 1;
  }
  &__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 160rpx;
  }
  &__empty-text {
    color: #b0b6b8;
    font-size: 24rpx;
  }
}
</style>
