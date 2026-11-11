/**
 * 再平衡计算器 store（全天候组合 · 5/25 规则）
 * 页面：pkg-misc/rebalancer。数据全本地、不发请求，整包 persist（storage 用 uniStorage）。
 *
 * - classes：资产类别（名称 + 目标权重 + 下属标的）。全天候的 5 个类别与目标权重是
 *   **工具定义**（ALL_WEATHER_DEFAULTS）。标的名称按用户选定的跟踪标的预填（股票 = 标普500，
 *   商品 = 3 只 ETF），**市值一律留空**由用户自己输。
 *   ★ 商品仓位是 3 只 ETF 合成的一个仓位（有色金属 / 能源化工 / 饲料豆粕，各 2.5% = 合计 7.5%），
 *   5/25 只在**合计层级**执行（7.5% → 5.625%–9.375%），3 只 ETF 不单独设阈值。
 * - 市值单位统一为 **K**（输入 210 = ¥210,000），页面内所有金额显示都带 K。
 * - 「新增资金」模式与 planXRaw / modeLabel 已于 2026-10-16 删除（只保留现有资金重分配）。
 */
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { uniStorage } from '@/storage/uniStorage'

export interface RebalanceHolding {
  name: string
  valueRaw: string
}

export interface RebalanceClass {
  name: string
  targetRaw: string
  holdings: RebalanceHolding[]
}

/**
 * 商品仓位的 3 只 ETF（对齐 stores/market.ts DEFAULT_MSN_CONFIG 里的 3 条 2.5% 持仓）。
 * 它们是同一个 7.5% 仓位的组成部分，只在合计层级做再平衡，各自不设阈值。
 */
export const COMMODITY_ETFS = ['有色金属', '能源化工', '饲料豆粕']

/**
 * 5 个类别下的默认标的名称（市值一律留空，由用户自己输）。
 * 股票 = 标普500（单一标的）；长期债券 40、中期债券 15、黄金 7.5（各单一标的）；
 * 大宗商品 = 3 只 ETF 合成的 7.5% 仓位。合计正好等于类别目标（30/40/15/7.5/7.5）。
 * 用户改名 / 增删标的都随意。
 */
export const ALL_WEATHER_DEFAULTS: Array<{ name: string; targetRaw: string; holdings: string[] }> = [
  { name: '股票', targetRaw: '30', holdings: ['标普500'] },
  { name: '长期债券', targetRaw: '40', holdings: ['长期债券'] },
  { name: '中期债券', targetRaw: '15', holdings: ['中期债券'] },
  { name: '黄金', targetRaw: '7.5', holdings: ['纽约黄金'] },
  // 商品仓位 = 3 只 ETF 合成的同一个 7.5% 仓位，只在合计层级做 5/25，各自不设阈值
  { name: '大宗商品', targetRaw: '7.5', holdings: COMMODITY_ETFS }
]

/** 空骨架：按默认名称生成标的行，市值一律留空 */
export const emptyRebalanceClasses = (): RebalanceClass[] =>
  ALL_WEATHER_DEFAULTS.map(c => ({
    name: c.name,
    targetRaw: c.targetRaw,
    holdings: c.holdings.map(name => ({ name, valueRaw: '' }))
  }))

/**
 * 老版本持久化数据兜底：某一类只有「一行、名称空、市值空」时补成默认标的名称，
 * 用户已经改过名称或填过市值的一律不动（只在读到老数据时跑一次，见 persist.afterRestore）。
 */
const normalizeSkeleton = (list: RebalanceClass[]) => {
  list.forEach(cls => {
    const def = ALL_WEATHER_DEFAULTS.find(d => d.name === cls.name)
    const untouched = cls.holdings.length === 1 && !cls.holdings[0].name && !cls.holdings[0].valueRaw
    if (def && untouched) {
      cls.holdings = def.holdings.map(name => ({ name, valueRaw: '' }))
    }
  })
}

export const useRebalancerStore = defineStore(
  'useRebalancerStore',
  () => {
    const classes = ref<RebalanceClass[]>(emptyRebalanceClasses())

    return {
      classes
    }
  },
  {
    persist: {
      storage: uniStorage,
      /* 读到老数据后补一次默认标的名称（见 normalizeSkeleton 注释） */
      afterRestore: ({ store }) => normalizeSkeleton(store.$state.classes as RebalanceClass[])
    }
  }
)
