import type { TWallet } from '@/types/wallet'

export const WalletMaps: Record<string, string> = {
  wechat: '微信',
  alipay: '支付宝',
  unionpay: '银联',
  cash: '现金',
  carpool: '顺风车',
  eastmoney: '股票',
  fund: '公积金'
}

export const calculateWalletFormSum = (form: TWallet) => {
  const s: number = Object.keys(WalletMaps).reduce((total, key) => {
    const value = (form as any)[key]
    if (Array.isArray(value)) {
      return (
        total +
        value.reduce((sum, item) => {
          return sum + parseFloat(item)
        }, 0)
      )
    } else if (!isNaN(value)) {
      return total + parseFloat(value)
    }
    return total
  }, 0)
  return s.toFixed(2)
}

/** 解析入参的类型：后端正常给 JSON 数组，老记录可能是单个数字 / 数字字符串 */
type NetInflowRaw = Array<number | string> | string | number | null | undefined

/**
 * 本周「圈外」资金进出明细 → 数字数组（如 [14, -5, -1]）。
 * 后端是 JSON 列（List<BigDecimal>），直接返回数组；这里兼容三种历史形态：
 *   - 单个数字 / 数字字符串（旧 DECIMAL 列，如 "8"）→ 当成一笔 [8]
 *   - JSON 数组字符串（如 "[14,-5]"）→ 解析成数组
 *   - null / '' / 非法内容 → []，即「未记录」
 * ★ 调用方绝不能把 [] 当 0：[] 是缺失，0 是「有明细且合计为 0」。
 */
export const parseNetInflow = (raw: NetInflowRaw): number[] => {
  if (raw === null || raw === undefined) return []
  if (Array.isArray(raw)) {
    return raw
      .map(v => (typeof v === 'number' ? v : parseFloat(`${v}`)))
      .filter(v => Number.isFinite(v))
  }
  const text = `${raw}`.trim()
  if (!text) return []
  if (text.startsWith('[')) {
    try {
      const parsed = JSON.parse(text)
      if (Array.isArray(parsed)) return parseNetInflow(parsed)
    } catch {
      return []
    }
    return []
  }
  const v = parseFloat(text)
  return Number.isFinite(v) ? [v] : []
}

/** 净流入合计：无明细返回 null（未记录），有明细返回求和（可以是 0） */
export const netInflowTotal = (raw: NetInflowRaw): number | null => {
  const items = parseNetInflow(raw)
  return items.length ? items.reduce((sum, v) => sum + v, 0) : null
}

/** 逐笔金额 → 标签文案（+14k / -5k / 0k），不保留无意义的小数尾零 */
export const netInflowTag = (v: number) => `${v > 0 ? '+' : ''}${Math.round(v * 100) / 100}k`
