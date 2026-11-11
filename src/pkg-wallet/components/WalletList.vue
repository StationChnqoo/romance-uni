<template>
  <view class="wallets">
    <z-paging
      ref="pagingRef"
      v-model="list"
      class="wallets__paging"
      :fixed="fixed"
      :auto="!disabled"
      :refresher-enabled="!disabled"
      :loading-more-enabled="!disabled"
      @query="queryList"
    >
      <!--
        资产总览：按「资产价值报告」那张图的信息层级重排
        （Hero 大数值 + 同期指数 → 走势曲线 → 四宫格统计）。
        全部放在 z-paging 的默认插槽里随列表滚动 —— 原来那张首末对比卡也在这个位置。
        没有数据时不渲染（空数据由 z-paging 自带空态负责，不自绘）。
      -->
      <template v-if="hasOverview">
        <WalletHero
          :total-wan="heroTotalWan"
          :change-text="heroChange ? heroChange.text : ''"
          :change-amount="heroChange ? heroChange.amount : ''"
          :change-color="heroChange ? heroChange.color : ''"
          :since-date="earliestInfo.date"
          :index-rows="indexRows"
        />
        <WalletTrend :points="trendPoints" />
        <WalletStats :items="statItems" />

        <view class="wallets__section">
          <text class="wallets__section-title">周记录</text>
        </view>
      </template>

      <view v-for="(item, index) in list" :key="`${item.id}:${index}`" class="wallets__card">
        <view class="wallets__item" hover-class="wallets__item_hover" @click="onItemPress(item)">
          <view class="wallets__item-head">
            <text class="wallets__week">第{{ isoWeekOf(item.settleOn) }}周</text>
            <text class="wallets__sum" :style="{ color: theme }">
              {{ calculateWalletFormSum(item) }}<text class="wallets__sum-unit"></text>
            </text>
          </view>
          <view class="wallets__item-meta">
            <text class="wallets__index">上证指数： {{ item.indexSh000001 }}</text>
            <text class="wallets__index">标普500： {{ item.indexSpx }}</text>
            <text class="wallets__index">{{ formatDate(item.settleOn) }}</text>
          </view>
          <view class="wallets__assets">
            <!-- 六列等宽网格：自己写 flex，不依赖 uni-grid（库在滚动容器里量宽可能量到 0 退化成内联）。
                 每格 1/6 宽 + box-sizing:border-box，格线由 cell 的右边/下边 + 容器的上边/左边围成，
                 最右一列外边由容器 overflow:hidden 裁掉。 -->
            <view class="wallets__asset-grid">
              <view
                v-for="(row, rowIdx) in expandedAssets(item)"
                :key="row.key"
                class="wallets__asset-cell"
              >
                <view class="wallets__asset">
                  <text class="wallets__map-label">{{ row.label }}</text>
                  <text class="wallets__map-value">{{ row.value }}</text>
                </view>
              </view>
            </view>
          </view>
          <!-- 本周圈外进出：有明细才回显自动合计，老记录「未记录」则不占位 -->
          <text v-if="netInflowText(item)" class="wallets__flow">
            本周净流入 {{ netInflowText(item) }}
          </text>
        </view>
      </view>
    </z-paging>

    <!-- 新增钱包：右下角独立悬浮「+」按钮（showAdd 为 true 时才渲染） -->
    <view
      v-if="props.showAdd"
      class="wallets__add-fab"
      :style="{ background: theme }"
      @click="onAdd"
    >
      <wd-icon name="add" />
    </view>

    <!-- 夏普比率说明：点四宫格那一格 / 右上角问号打开，口径、局限与本金收益拆解都在弹层里 -->
    <SharpeInfoPopup
      :show="sharpeInfoVisible"
      :clean-mode="cleanSharpeUsed"
      :covered-weeks="covered.weeks"
      :inflow-text="coveredInflowText"
      :profit-text="coveredProfitText"
      @close="sharpeInfoVisible = false"
    />
  </view>
</template>

<script lang="ts" setup>
/**
 * 钱包列表 + 资产总览
 * 由 cloud-react-native/src/screens/Wallets/index.tsx 迁移。
 *
 * - 分页、下拉刷新、上拉加载、空数据视图全部交给 z-paging：
 *   @tanstack/react-query 的 useInfiniteQuery 与自维护的 currentPage / hasNextPage / loading
 *   都被替换成 z-paging 内部的 pageNo，只在 @query 回调里按页码请求。
 * - z-paging 用 `:fixed="false"` 的容器滚动模式，高度由父容器撑满：
 *   独立钱包页撑满页面。注意：使用容器滚动后，页面级 onPullDownRefresh / onReachBottom
 *   不再需要，pages.json 里对应的 enablePullDownRefresh 也已关闭，否则两套刷新会互相打架。
 * - 总览数据两路：
 *   ① `first-and-last`（首末两条，权威口径）→ Hero 的「较首期」与最早/最近日期；
 *   ② `/wallets` 拉一页大 size（260 条 ≈ 5 年周记录）本地按 settleOn 升序 → 走势曲线、
 *      四宫格统计（峰值 / 夏普 / 增长率 / 平均年化）；夏普只吃这条历史序列，不额外请求。
 *      记了「本周圈外进出」明细的周用 TWR 剔除出入金（F 为逐笔自动合计），未记录的老周跳过。
 *   两者只在第一页并行拉一次，失败各自降级（概览少一块，不影响列表）。
 * - 原「首末对比卡」WalletCompare 已删除：它的三条数据拆开落到了
 *   Hero（总资产较首期）与四宫格（资产巅峰 / 夏普 / 总增长率 / 平均年化）里，
 *   不再单独占一张卡（参考图的头部本来就只有 Hero 一块）。
 * - 涨跌一律 `renderUpOrDown`：+/- 放数值前，涨红跌绿。
 */
import { computed, ref } from 'vue'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import { selectFirstAndLastWallet, selectWallets } from '@/api'
import { Router } from '@/common/router'
import { useUserStore } from '@/stores/user'
import {
  calculateWalletFormSum,
  netInflowTag,
  netInflowTotal,
  parseNetInflow,
  WalletMaps
} from '@/constants/wallet'
import { renderUpOrDown } from '@/utils'
import SharpeInfoPopup from './SharpeInfoPopup.vue'
import WalletHero from './WalletHero.vue'
import WalletStats from './WalletStats.vue'
import WalletTrend from './WalletTrend.vue'
import type { Page } from '@/types/common'
import type { TWallet } from '@/types/wallet'

dayjs.extend(isoWeek)

const props = defineProps<{
  disabled?: boolean
  /**
   * 是否使用 z-paging 的 fixed 全屏布局。
   * 独立页面用 true（z-paging 自己占满视口剩余高度）。
   */
  fixed?: boolean
  onWalletPress?: (item: TWallet) => void
  /**
   * 是否在右下角显示「新增钱包」悬浮按钮。
   * 仅独立钱包页传 true。
   */
  showAdd?: boolean
}>()

const userStore = useUserStore()
const theme = computed(() => userStore.theme)

/** z-paging 实例：reload / complete 都走它 */
const pagingRef = ref<any>(null)

const list = ref<TWallet[]>([])
const firstAndLast = ref<TWallet[]>([])
/** 全量历史（按 settleOn 升序），只给走势图与统计用 */
const history = ref<TWallet[]>([])
/** 夏普比率说明弹层（点四宫格那一格 / 右上角问号打开） */
const sharpeInfoVisible = ref(false)

/** 走势图那一页拉多大：260 条周记录 ≈ 5 年，足够了 */
const HISTORY_PAGE_SIZE = 260

/**
 * 夏普比率（周频年化）：Sharpe = mean(r − rf/52) / std(r, 样本) × √52
 *
 * 两种周收益 r，按数据完备度自动切换：
 * - 净值口径（优先）：某周记了圈外进出明细（F = 逐笔合计）才纳入，r = (V_t − V_{t−1} − F) / V_{t−1}，
 *   把工资入账、消费、圈外转账从「收益」里扣掉。★ 老记录没有 F（NULL）就整周跳过，
 *   绝不能把缺失当 0 —— 当 0 等于把存进去的钱重新算成收益。
 * - 近似口径（回退）：有效周不足 MIN_SHARPE_SAMPLES 时，用全历史总资产环比（加字段前的算法）。
 *   当前实际用哪种口径在 SharpeInfoPopup 里标明，不在页面上常驻写免责文字。
 * - 同期上证指数是纯价格序列，没有现金流问题，始终按水平序列环比算基准。
 * - 现金 / 公积金等低波动科目仍会压小分母，两种口径都只是参考。
 * - 无风险利率按 0：项目没有利率数据源，写死某个「当前国债收益率」等于编数据；
 *   要换真实 rf 只改 RISK_FREE_ANNUAL 这一个常数。
 */
const RISK_FREE_ANNUAL = 0
const WEEKS_PER_YEAR = 52
const MIN_SHARPE_SAMPLES = 10

/** 周收益序列 → 年化夏普；样本不足或零波动时不给数，避免结果爆炸 */
const sharpeFromReturns = (returns: number[]): number | null => {
  const n = returns.length
  if (n < MIN_SHARPE_SAMPLES) return null
  const rf = RISK_FREE_ANNUAL / WEEKS_PER_YEAR
  const excess = returns.map(r => r - rf)
  const mean = excess.reduce((sum, r) => sum + r, 0) / n
  const variance = excess.reduce((sum, r) => sum + (r - mean) ** 2, 0) / (n - 1)
  const sd = Math.sqrt(variance)
  if (!(sd > 0)) return null
  return (mean / sd) * Math.sqrt(WEEKS_PER_YEAR)
}

/** levels = 按时间升序的水平序列（总资产 / 指数点位），先转环比收益再年化 */
const sharpeOf = (levels: number[]): number | null => {
  const returns: number[] = []
  for (let i = 1; i < levels.length; i++) {
    const prev = levels[i - 1]
    const cur = levels[i]
    // 零值 / 无效点跳过（早期周可能全空、指数可能缺值）。缺周时相邻两点会跨期，
    // 收益被压进一段里，属于「仅供参考」口径的一部分，不做日历补齐。
    if (!(prev > 0 && cur > 0)) continue
    returns.push(cur / prev - 1)
  }
  return sharpeFromReturns(returns)
}

/** 展示文本：无值给 null（调用方决定显示 —），两位小数 */
const sharpeText = (v: number | null) => (v === null ? null : v.toFixed(2))

const walletKeys = Object.keys(WalletMaps) as Array<keyof typeof WalletMaps>

/** 接口口径是 k（千元），页面统一按万元展示 */
const WAN_UNIT = 10

const isoWeekOf = (date?: string) => dayjs(date).isoWeek()
const formatDate = (date?: string) => dayjs(date).format('YYYY-MM-DD')

const timeOf = (wallet: TWallet) => {
  const t = dayjs(wallet.settleOn).valueOf()
  return Number.isNaN(t) ? 0 : t
}

const dayText = (date?: string) => {
  if (!date) return '—'
  const d = dayjs(date)
  return d.isValid() ? d.format('YYYY-MM-DD') : '—'
}

/** 千元 → 万元，带千分位（App 端逻辑层是裸 V8，Intl 不保证有，手写分隔符） */
const toWan = (k: number) => k / WAN_UNIT
const formatWan = (k: number) =>
  toWan(k)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

/**
 * 四宫格那种窄格子用的紧凑写法：万元不带空格，超过 1000 万就不再留小数
 * （四列等分后每格内容宽 ≈ 147rpx，'1,205.30 万' 会被省略号吃掉）。
 */
const formatWanShort = (k: number) => {
  const wan = toWan(k)
  const digits = Math.abs(wan) >= 1000 ? 0 : 2
  return `${wan.toFixed(digits).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}万`
}

const totalK = (wallet?: TWallet) =>
  wallet ? parseFloat(calculateWalletFormSum(wallet)) || 0 : 0

/**
 * 周记录卡片回显：netInflow 是逐笔金额数组，合计由 netInflowTotal 现算。
 * NULL / [] = 老记录「未记录」，有明细且合计 0 = 已记录且本周无进出，未记录则不占位。
 * ★ 两者绝不等价：把缺失当 0，工资入账就会重新被算成投资收益。
 */
const netInflowText = (wallet: TWallet) => {
  const total = netInflowTotal(wallet.netInflow)
  if (total === null) return ''
  const count = parseNetInflow(wallet.netInflow).length
  return `${netInflowTag(total)} · ${count} 笔`
}

/**
 * 已记录圈外出入的周（TWR 口径）：只统计「相邻两期总资产都有效 + 本期有明细」的周。
 *   r_t = (V_t − V_{t−1} − F_t) / V_{t−1}
 * 同一段循环顺手累计两个金额，回答「钱是存出来的还是赚出来的」：
 *   ΣF = 累计净投入，Σ(V_t − V_{t−1} − F) = 累计投资收益（单位 k）。
 * 覆盖周可能不连续（老记录没 F），所以这两个数只代表覆盖的 N 周，不等于「末 − 首」，
 * 弹层里必须带上周数，别让人误读成全周期拆解。
 */
const covered = computed(() => {
  const rows = history.value
  const returns: number[] = []
  let inflow = 0
  let profit = 0
  for (let i = 1; i < rows.length; i++) {
    const prev = totalK(rows[i - 1])
    const cur = totalK(rows[i])
    const flow = netInflowTotal(rows[i].netInflow)
    if (flow === null || !(prev > 0) || !(cur > 0)) continue
    const gain = cur - prev - flow
    returns.push(gain / prev)
    inflow += flow
    profit += gain
  }
  return { returns, inflow, profit, weeks: returns.length }
})

/** 弹层用的本金 / 收益拆解文本：k → 万元，带符号 */
const signedWan = (k: number) =>
  `${renderUpOrDown(k).operator}${formatWan(Math.abs(k))} 万`
const coveredInflowText = computed(() => signedWan(covered.value.inflow))
const coveredProfitText = computed(() => signedWan(covered.value.profit))

/**
 * 组合夏普：优先净值口径（TWR 收益），有效周不足 10 期时整段退回总资产环比近似口径。
 * 基准夏普：同期上证指数是纯价格序列，无现金流问题，始终走水平序列。
 */
const sharpeClean = computed(() => sharpeFromReturns(covered.value.returns))
const sharpeApprox = computed(() => sharpeOf(history.value.map(totalK)))
const cleanSharpeUsed = computed(() => sharpeClean.value !== null)
const sharpe = computed(() => sharpeClean.value ?? sharpeApprox.value)
const sharpeSh = computed(() =>
  sharpeOf(
    history.value
      .map(it => parseFloat(it.indexSh000001 || ''))
      .filter(v => Number.isFinite(v) && v > 0)
  )
)

/** from → to 的变化（带符号文本 + 涨跌色 + 差值），无有效基准时返回 null */
const signedChange = (from: number, to: number) => {
  if (!from || !Number.isFinite(from) || !Number.isFinite(to)) return null
  const diff = to - from
  const rud = renderUpOrDown(diff)
  return {
    diff,
    operator: rud.operator,
    color: rud.color,
    text: `${rud.operator}${Math.abs((diff / from) * 100).toFixed(2)}%`
  }
}

type AssetRow = { key: string; label: string; value: string }

/**
 * 把每条资产展开成 N 条：标量字段 1 条，数组字段（顺风车/公积金）每个元素各 1 条（label 重复）。
 * 每条各自占网格的一格，避免 `[10k 20k]` 这种把多个金额挤在一格里看不清。
 *
 * 注意：数组内元素的顺序由各项目源数据决定；若出现「同周各项目顺序不一致」属于数据层问题，
 * 需要在数据来源处按稳定字段（如时间 / id）排序，此处不做 UI 兜底（之前求和归并的方案已回退）。
 */
const expandedAssets = (item: TWallet): AssetRow[] => {
  const rows: AssetRow[] = []
  for (const key of walletKeys) {
    const raw = (item as unknown as Record<string, unknown>)[key]
    if (Array.isArray(raw)) {
      raw.forEach((it, idx) => {
        rows.push({
          key: `${key}-${idx}`,
          label: WalletMaps[key],
          value: `${it}`
        })
      })
    } else {
      rows.push({
        key,
        label: WalletMaps[key],
        value: `${raw}`
      })
    }
  }
  return rows
}

/** 权威首末两条（首条 = 最早，末条 = 最新） */
const earliest = computed<TWallet | undefined>(() => firstAndLast.value?.[0])
const latest = computed<TWallet | undefined>(
  () => firstAndLast.value?.[1] || history.value[history.value.length - 1]
)

const hasOverview = computed(() => !!latest.value)

const heroTotalWan = computed(() => formatWan(totalK(latest.value)))

/** 较首期：涨跌色 + 百分比 + 增减额（万元） */
const heroChange = computed(() => {
  const change = signedChange(totalK(earliest.value), totalK(latest.value))
  if (!change) return null
  return {
    text: change.text,
    color: change.color,
    amount: `${change.operator}${formatWan(Math.abs(change.diff))} 万`
  }
})

/**
 * 年化增长率（复合年化，CAGR）：把「较首期累计涨幅」按首末时间跨度折算到年。
 *   years = (末 - 首) 天数 / 365.25
 *   annual = (末 / 首) ^ (1 / years) - 1
 * 注意是「率」不是「额」，所以这里返回百分比文本（涨红跌绿），与「总增长率」口径同源、只是多除一次年限。
 */
const annualChange = computed(() => {
  const first = earliest.value
  const last = latest.value
  if (!first?.settleOn || !last?.settleOn) return null
  const fk = totalK(first)
  const lk = totalK(last)
  if (!fk || !Number.isFinite(fk) || !Number.isFinite(lk) || lk <= 0) return null
  const days = dayjs(last.settleOn).diff(dayjs(first.settleOn), 'day')
  if (days <= 0) return null
  const years = days / 365.25
  const annual = Math.pow(lk / fk, 1 / years) - 1
  const rud = renderUpOrDown(annual)
  const span = Math.round((years * 10)) / 10
  return {
    text: `${rud.operator}${(annual * 100).toFixed(2)}%`,
    color: rud.color,
    span: `近 ${span} 年`
  }
})

const earliestInfo = computed(() => ({
  wan: formatWan(totalK(earliest.value)),
  date: dayText(earliest.value?.settleOn)
}))

/**
 * 历史总资产峰值（含所在日期）。
 * history 正常是升序全量；万一为空就降级用最新一期，保证这一格不空着。
 */
const peak = computed(() => {
  const rows = history.value.length ? history.value : latest.value ? [latest.value] : []
  let best: { k: number; date: string } | null = null
  for (const it of rows) {
    const k = totalK(it)
    if (!best || k > best.k) best = { k, date: dayText(it.settleOn) }
  }
  return best
})

/** 四宫格：最多总资产 / 夏普比率（同期上证作基准） / 资产增长率 / 单期均值 */
const statItems = computed(() => {
  const change = heroChange.value
  const sharpeValue = sharpeText(sharpe.value)
  const sharpeBench = sharpeText(sharpeSh.value)

  return [
    {
      icon: 'chart-bar',
      label: '最多财富',
      value: peak.value ? formatWanShort(peak.value.k) : '—',
      sub: peak.value ? peak.value.date : '—'
    },
    {
      /* 已记录圈外进出的周够 10 期就用 TWR 净值口径，否则整段退回总资产环比近似口径；
         基准值放 sub，组合值按涨红跌绿着色。当前口径、局限与「本金 vs 收益」拆解
         都写在说明弹层里（点这一格或右上角问号），不在页面上常驻文字。 */
      icon: 'chart',
      label: '夏普比率',
      value: sharpeValue ?? '—',
      sub: sharpeBench !== null ? `上证 ${sharpeBench}` : '周频年化',
      color: sharpe.value === null ? undefined : renderUpOrDown(sharpe.value).color,
      onPress: () => {
        sharpeInfoVisible.value = true
      }
    },
    {
      icon: 'list',
      label: '财富增长',
      value: change ? change.text : '—',
      sub: change ? change.amount : '较首期',
      color: change?.color
    },
    {
      icon: 'money-circle',
      label: '平均年化',
      value: annualChange.value ? annualChange.value.text : '—',
      sub: annualChange.value ? annualChange.value.span : '较首期',
      color: annualChange.value?.color
    }
  ]
})

/**
 * 走势点（升序）：
 * - total：总资产（万元），给面积序列
 * - sh：上证指数（TWallet.indexSh000001，字段名带 Sh000001 即上证 000001），spx：标普500（TWallet.indexSpx）
 *   指数只在后端有记录的周才有值，早期周可能为空 → null，WalletTrend 自动跳过空序列
 */
interface WalletTrendPoint {
  date: string
  total: number
  sh: number | null
  spx: number | null
}

const trendPoints = computed<WalletTrendPoint[]>(() =>
  history.value
    .filter(it => !!it.settleOn && dayjs(it.settleOn).isValid())
    .map(it => {
      const sh = parseFloat(it.indexSh000001 || '')
      const spx = parseFloat(it.indexSpx || '')
      return {
        date: dayjs(it.settleOn).format('YYYY-MM-DD'),
        total: Number(toWan(totalK(it)).toFixed(2)),
        sh: Number.isFinite(sh) ? sh : null,
        spx: Number.isFinite(spx) ? spx : null
      }
    })
)

/**
 * 同期指数对比（原「资产分析」模块，已移入首卡 Hero 内部）：
 * 同期上证指数 / 同期标普500 两条同期涨跌幅，与「较首期」口径同源（首末两点）。
 * 指数早期可能无值 → 该条直接不展示。全部本地算，不接大模型、不引接口。
 *「总资产」那条不在这里重复（首卡已有「较首期」）。
 */
const indexRows = computed(() => {
  const first = earliest.value
  const last = latest.value
  const rows: { label: string; change: string; color?: string; ratio: number }[] = []
  if (!first || !last) return rows

  // 同期上证指数
  const shFirst = parseFloat(first.indexSh000001 || '') || 0
  const shLast = parseFloat(last.indexSh000001 || '') || 0
  const sh = signedChange(shFirst, shLast)
  if (sh) {
    rows.push({
      label: '同期上证指数',
      change: sh.text,
      color: sh.color,
      ratio: shFirst ? (shLast - shFirst) / shFirst : 0
    })
  }

  // 同期标普500
  const spxFirst = parseFloat(first.indexSpx || '') || 0
  const spxLast = parseFloat(last.indexSpx || '') || 0
  const spx = signedChange(spxFirst, spxLast)
  if (spx) {
    rows.push({
      label: '同期标普500',
      change: spx.text,
      color: spx.color,
      ratio: spxFirst ? (spxLast - spxFirst) / spxFirst : 0
    })
  }

  return rows
})

const loadDatas = async (page: number, pageSize: number): Promise<Page<TWallet>> =>
  selectWallets({
    currentPage: page,
    pageSize
  })

/** 首末两条：供 Hero 的「较首期」用。失败就退化成「只有列表」，不连累整页 */
const loadFirstAndLastWallet = async () => {
  try {
    const result = await selectFirstAndLastWallet()
    const datas = result?.records
    firstAndLast.value = Array.isArray(datas) ? datas : []
  } catch (error) {
    firstAndLast.value = []
  }
}

/**
 * 全量历史：走势曲线 + 夏普比率 + 净流入覆盖周统计。
 * 后端若对 pageSize 有上限，这里拿到的只是最近 N 周 —— 曲线左端就不是真正的最早一期，
 * 夏普也只覆盖这段窗口（少样本直接不给数，退回近似口径）；「较首期 / 最早一期」另有权威来源 first-and-last。
 */
const loadHistory = async () => {
  try {
    const page = await selectWallets({ currentPage: 1, pageSize: HISTORY_PAGE_SIZE })
    const records = page.records || []
    history.value = [...records].sort((a, b) => timeOf(a) - timeOf(b))
  } catch (error) {
    history.value = []
  }
}

/**
 * z-paging 的分页回调
 * 只传当前页数据，累计由 z-paging 内部完成；是否还有下一页由接口的 hasNextPage 决定。
 * 第一页时并行拉两份总览数据（互不依赖），失败各自降级。
 */
const queryList = async (pageNo: number, pageSize: number) => {
  try {
    if (pageNo === 1) {
      await Promise.all([loadFirstAndLastWallet(), loadHistory()])
    }
    const pageData = await loadDatas(pageNo, pageSize)
    pagingRef.value?.completeByNoMore(pageData.records || [], !pageData.hasNextPage)
  } catch (e) {
    pagingRef.value?.complete(false)
  }
}

const onItemPress = (item: TWallet) => {
  if (props.disabled) return
  if (props.onWalletPress) {
    props.onWalletPress(item)
    return
  }
  Router.navigate('WalletDetail', { id: item.id })
}

/** 右下角「+」：进钱包新增页（floatpanel 的新增入口已下放到各 list 页） */
const onAdd = () => {
  Router.navigate('EditWallet', {})
}

/** 供父页面 onShow 触发的刷新 */
const reload = () => {
  if (props.disabled) return
  pagingRef.value?.reload()
}

defineExpose({ reload })
</script>

<style lang="scss" scoped>
.wallets {
  display: flex;
  flex-direction: column;
  /* :fixed="false" 时 z-paging 高度 100%，父容器必须给出确定高度 */
  height: 100%;
  background-color: #f1f2f3;

  &__paging {
    /* scoped 样式会作用在子组件根元素上，fixed 模式下用它兜住列表底色 */
    background-color: #f1f2f3;
  }
  /* 周记录小标题（总览与列表之间的分隔） */
  &__section {
    padding: 4rpx 24rpx 16rpx;
  }
  &__section-title {
    color: #999;
    font-size: 24rpx;
  }
  /* 每条周记录一张白卡：与上面几张总览卡同一套间距/圆角 */
  &__card {
    padding: 24rpx;
    margin: 0 24rpx 20rpx;
    border-radius: 16rpx;
    background-color: #fff;
  }
  &__item_hover {
    /* TouchableOpacity activeOpacity={0.8} */
    opacity: 0.8;
  }
  &__item {
    display: flex;
    flex-direction: column;
  }
  &__item-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__title {
    flex: 1;
    font-size: 32rpx;
    color: #333;
    /* numberOfLines={1} */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    /* #ifdef APP-PLUS */
    lines: 1;
    /* #endif */
  }
  &__week {
    font-weight: 500;
  }
  &__sum {
    font-size: 32rpx;
  }
  &__sum-unit {
    font-size: 28rpx;
  }
  /**
   * 一行三项两端对齐：上证指数 / 标普500指数 / 记账日期。
   * 每项都允许收缩 + 省略号，金额位数变长时先截文字而不是把行撑破。
   */
  &__item-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 18rpx;
  }
  &__index {
    min-width: 0;
    overflow: hidden;
    color: #666;
    font-size: 24rpx;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /**
   * 资产排列：自己写的六列等宽 flex 网格，每格「科目在上、金额在下」，格内居中。
   * 数组字段展开成多个格子，每个金额都独占一格（不再 `[10k 20k]` 挤一起）。
   * 列宽用 CSS 定死（calc(100%/6) + border-box），不依赖组件测量，避免滚动容器里量到 0。
   */
  &__assets {
    margin-top: 18rpx;
    padding-top: 18rpx;
    border-top: 1rpx solid #f1f2f3;
  }
  /* 圈外净流入回显：<text> 是行内元素，display:block 才能按容器宽度排布 */
  &__flow {
    display: block;
    margin-top: 12rpx;
    color: #8a9496;
    font-size: 22rpx;
  }
  &__asset-grid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow: hidden;
    border-left: 1rpx solid #f1f2f3;
  }
  &__asset-cell {
    width: calc(100% / 6);
    box-sizing: border-box;
    border-right: 1rpx solid #f1f2f3;
    border-bottom: 1rpx solid #f1f2f3;
  }
  &__asset {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 0;
    /* 每格 12rpx 纵向间距（六列窄格不能贴边） */
    padding: 12rpx 0;
  }
  &__map-label {
    overflow: hidden;
    color: #8a9496;
    font-size: 24rpx;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__map-value {
    margin-top: 4rpx;
    overflow: hidden;
    color: #333;
    font-size: 28rpx;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /* 新增钱包悬浮按钮：内联 <view> + wd-icon（圆形 + 主题色底 + 白色图标）。 */
  &__add-fab {
    position: fixed;
    z-index: 100;
    right: 30rpx;
    bottom: 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 96rpx;
    height: 96rpx;
    border-radius: 50%;
    color: #fff;
    font-size: 52rpx;
    box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.2);

    &:active {
      transform: scale(0.94);
    }
  }
}
</style>
