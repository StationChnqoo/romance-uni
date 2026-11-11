/**
 * 多乐小游戏 - 牌面纯函数
 * 由 cn.xiaopacai.duole/src/constants/c.ts 迁移，只保留记牌器用到的三个。
 * 跨游戏共用（保皇 / 够级），所以放分包根而不是某个游戏的子目录里。
 */

/**
 * 把 "3A#4K" 这样的分组串展开成 "AAAKKKK"。
 * 每组最后一位是牌名，前面是数量；单个字符默认数量 1；解析不了的按原样保留。
 * 牌名集合含 大/小/鹰（大王/小王/鹰）：它们以纯文字存盘，仍要能走 "2大" = 大大 这种计数展开。
 */
export function parseCard3Groups(input: string): string {
  const tokens = input.trim().toUpperCase().split('#')
  let result = ''
  for (const token of tokens) {
    if (token.length >= 2) {
      const card = token.slice(-1)
      const count = parseInt(token.slice(0, -1), 10)
      if (!isNaN(count) && /^[A-Z0-9大小鹰]$/.test(card)) {
        result += card.repeat(count)
        continue
      }
    } else if (token.length === 1 && /^[A-Z0-9大小鹰]$/.test(token)) {
      result += token
      continue
    }
    result += token
  }
  return result
}

/**
 * 还没出过的牌面：34567890JQK2A 里去掉已经出现过的（每组最后一个字符算牌名）。
 */
export function calcRemainingRanks(playedCards: string): string {
  const allRanks = '34567890JQKA2'.split('')
  const groups = playedCards.toUpperCase().trim().split('#')
  const used = new Set<string>()
  for (const group of groups) {
    const card = group.slice(-1)
    if (allRanks.includes(card)) {
      used.add(card)
    }
  }
  return allRanks.map(rank => (used.has(rank) ? '' : rank)).join('')
}

/** #rrggbb -> rgba(r, g, b, a) */
export function hexToRgba(hex: string, alpha = 1): string {
  const value = hex.replace('#', '')
  const r = parseInt(value.substring(0, 2), 16)
  const g = parseInt(value.substring(2, 4), 16)
  const b = parseInt(value.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
