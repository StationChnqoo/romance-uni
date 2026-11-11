/**
 * 再平衡计算器领域层（全天候组合 · 5/25 规则）
 * 页面 pkg-misc/rebalancer 与其下 components/ 各组件共用。
 * 这里只放「从 store 派生的纯计算 + store 变更」，不碰任何 UI；
 * 无内部状态（状态全在 pinia store），多个组件各自调用只会各生成一批 computed，绑同一个 store。
 *
 * 口径（与 index.vue 文件头注释一致）：
 * - 5/25 规则：触发阈值 = 「绝对 5 个百分点」与「相对 25%」中更严格（更窄）者，
 *   生效区间 = [max(w−5pp, 0.75w), min(w+5pp, 1.25w)]，越出即触发，按「调回目标权重」计算。
 * - 再平衡方式只有一种：现有资金重分配，总资产 T 不变，Δ_i = w_i·T − V_i，ΣΔ_i = 0。
 *   （「新增资金」模式 2026-10-16 删除：再分配的买入行已能回答新资金该去哪，分母数学边际价值低。）
 * - 金额单位统一为 K（输入 210 = ¥210,000）。
 */
import { computed } from 'vue'
import { useRebalancerStore, emptyRebalanceClasses } from '@/stores/rebalancer'
import type { RebalanceClass } from '@/stores/rebalancer'
import { renderUpOrDown } from '@/utils'

export interface ClassStat {
  name: string
  total: number
  weight: number
  target: number
  absLow: number
  absHigh: number
  relLow: number
  relHigh: number
  effLow: number
  effHigh: number
  strictRule: 'abs' | 'rel' | 'same'
  dev: number
  triggered: boolean
  delta: number
}

/* ---------- 格式化（手写千分位：App 端裸 V8 没有 Intl / toLocaleString） ---------- */
const parseNum = (raw?: string) => {
  if (!raw || raw === '') return 0
  const n = parseFloat(raw)
  return Number.isFinite(n) ? n : 0
}
const fmtK = (n: number) => {
  const r = Math.round(n * 100) / 100
  const parts = String(r).split('.')
  const int = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts[1] ? int + '.' + parts[1] : int
}
/** 金额单位统一 K：money(210) = 210K（不画 ¥，单位 K 已表意） */
export const money = (n: number) => (n < 0 ? '-' : '') + fmtK(Math.abs(n)) + 'K'
export const pct = (v: number, d = 2) => {
  let s = (v * 100).toFixed(d)
  if (s.indexOf('.') >= 0) s = s.replace(/0+$/, '').replace(/\.$/, '')
  return s + '%'
}
/** 区间上下限保留 3 位小数，与 5.625% / 9.375% 对齐 */
export const pctBand = (v: number) => pct(Math.max(0, v), 3)
export const signed = (v: number) => (v >= 0 ? '+' : '-') + Math.abs(v * 100).toFixed(2) + 'pp'
/** 涨红跌绿：偏离着色同行情口径 */
export const devColor = (v: number) => renderUpOrDown(v).color
export const strictLabel = (r: ClassStat['strictRule']) =>
  r === 'rel' ? '25% 相对更严' : r === 'abs' ? '5% 绝对更严' : '两者相同'

export function useRebalanceCalc() {
  /** 数据源：rebalancer store（pinia + persist 整包；深层 mutate 即触发持久化） */
  const store = useRebalancerStore()

  /* ---------- 派生计算 ---------- */
  const classTotal = (c: RebalanceClass) =>
    c.holdings.reduce((sum, h) => sum + parseNum(h.valueRaw), 0)

  const total = computed(() =>
    store.classes.reduce((sum, c) => sum + classTotal(c), 0)
  )
  const classWeight = (c: RebalanceClass) =>
    total.value > 0 ? classTotal(c) / total.value : 0
  const targetSum = computed(() =>
    store.classes.reduce((sum, c) => sum + parseNum(c.targetRaw), 0)
  )
  const targetSumOff = computed(() => Math.abs(targetSum.value - 100) > 0.001)

  const stats = computed<ClassStat[]>(() => {
    const T = total.value
    return store.classes.map(c => {
      const V = classTotal(c)
      const w = parseNum(c.targetRaw) / 100
      const weight = T > 0 ? V / T : 0
      const absLow = w - 0.05
      const absHigh = w + 0.05
      const relLow = w * 0.75
      const relHigh = w * 1.25
      const effLow = Math.max(absLow, relLow)
      const effHigh = Math.min(absHigh, relHigh)
      const absW = absHigh - absLow
      const relW = relHigh - relLow
      const strictRule: ClassStat['strictRule'] =
        Math.abs(absW - relW) < 1e-12 ? 'same' : relW < absW ? 'rel' : 'abs'
      return {
        name: c.name,
        total: V,
        weight,
        target: w,
        absLow,
        absHigh,
        relLow,
        relHigh,
        effLow,
        effHigh,
        strictRule,
        dev: weight - w,
        triggered: T > 0 && (weight < effLow - 1e-9 || weight > effHigh + 1e-9),
        delta: w * T - V
      }
    })
  })
  const triggeredCount = computed(() => stats.value.filter(s => s.triggered).length)
  const triggerText = computed(() =>
    stats.value
      .filter(s => s.triggered)
      .map(s =>
        s.name +
        ' ' +
        pct(s.weight) +
        (s.weight > s.effHigh
          ? '（高于上限 ' + pctBand(s.effHigh) + '）'
          : '（低于下限 ' + pctBand(s.effLow) + '）')
      )
      .join('；')
  )

  /* ---------- 再平衡：现有资金重分配 ---------- */
  const buySum = computed(() => stats.value.reduce((sum, s) => sum + Math.max(0, s.delta), 0))
  const sellSum = computed(() => stats.value.reduce((sum, s) => sum + Math.max(0, -s.delta), 0))

  /* ---------- 权重条刻度 ---------- */
  const barScale = computed(() => {
    let m = 0.5
    stats.value.forEach(s => {
      m = Math.max(m, s.weight, s.effHigh)
    })
    return m * 1.12
  })
  const barPos = (v: number) => Math.min(100, Math.max(0, (v / barScale.value) * 100))

  /* ---------- 增删 / 重置 ---------- */
  const addHolding = (ci: number) => {
    store.classes[ci].holdings.push({ name: '', valueRaw: '' })
  }
  const delHolding = (ci: number, hi: number) => {
    store.classes[ci].holdings.splice(hi, 1)
  }
  /** 恢复全天候类别骨架（类别 + 目标权重 + 空标的行） */
  const resetSkeleton = () => {
    store.classes = emptyRebalanceClasses()
  }

  return {
    store,
    /* 派生 */
    classTotal,
    classWeight,
    total,
    targetSum,
    targetSumOff,
    stats,
    triggeredCount,
    triggerText,
    /* 再分配：现有资金重分配 */
    buySum,
    sellSum,
    /* 权重条刻度 */
    barPos,
    /* 变更 */
    addHolding,
    delHolding,
    resetSkeleton
  }
}
