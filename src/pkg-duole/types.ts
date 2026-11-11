/**
 * 多乐小游戏 - 通用类型
 * 由 cn.xiaopacai.duole/src/constants/t.ts 迁移，目前在用的只有保皇记牌器。
 *
 * 分包 pkg-duole 按「一个游戏一个子目录」组织（baohuang/，以后够级放 gouji/），
 * 跨游戏共用的类型放这个文件，游戏私有的放各自子目录里。
 */

/** 一位玩家的牌面与当前录入位 */
export interface BaohuangPlayer {
  id: number
  name: string
  /** 三个槽位：[进贡, 吃贡, 出牌记录] */
  cards: string[]
  /** 当前正在录入的槽位索引 -> cards[currentCardIndex] */
  currentCardIndex: number
}

/**
 * 一整局保皇的记牌局面。
 * 存在 stores/duole.ts 的 `baohuangGame` 里（整包 persist）：
 * 每次录入变化都会持久化，重进页面 / 重启 App 自动恢复。
 */
export interface BaohuangGame {
  players: BaohuangPlayer[]
  /** 当前正在录入的玩家 id */
  currentPlayerIndex: number
}
