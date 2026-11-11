/**
 * 情侣空间数据模型 —— 纯本地（Pinia + persist），不依赖任何后端接口。
 *
 * 参考小恩爱 / 恋爱记的常用功能收敛为四块：纪念日倒数、100 件小事、
 * 恋爱日记时光轴、每日打卡 + 每日一问；再加「关于她」（复用 pkg-girlfriend）。
 * 所有 id 由 constants/love.ts 的 createId() 本地生成。
 */

/** 纪念日：yearly 每年重复（生日 / 在一起纪念日），once 只提醒一次（演唱会 / 旅行） */
export interface LoveAnniversary {
  id: string
  title: string
  /** YYYY-MM-DD */
  date: string
  repeat: 'yearly' | 'once'
  /** love-icons.scss 的语义图标名，如 heart / cake / flower */
  icon: string
}

/** 一件小事：预置 100 条 + 自己加的 */
export interface LoveChecklistItem {
  id: string
  title: string
  category: string
  done: boolean
  /** 完成日期 YYYY-MM-DD，未完成为空串 */
  doneAt: string
  /**
   * 解锁打卡时写的一句感受 / 那天的合照（本地永久路径）。
   * 可选：旧版本 persist 里没有这两个字段，照常按「只完成、没留念」显示。
   */
  note?: string
  image?: string
  /** 自己加的（可删除），预置项不能删 */
  custom: boolean
}

/** 恋爱日记：文字 + 心情 + 本地图片路径 */
export interface LoveDiary {
  id: string
  /** 记录哪一天 YYYY-MM-DD（可补记） */
  date: string
  content: string
  /** MOODS 的 key */
  mood: string
  images: string[]
  /** 创建时间戳字符串，同一天多篇时用来排序 */
  createAt: string
}

/** 每日一问：同一天双方各写一句，question 落库避免隔天题库顺序变化后对不上 */
export interface LoveAnswer {
  question: string
  mine: string
  partner: string
  date: string
}

/** 首页 / 纪念日页展示用的「下一个值得期待的日子」 */
export interface LoveUpcoming {
  id: string
  title: string
  /** 同 LoveAnniversary.icon */
  icon: string
  /** 本次要到的日期 YYYY-MM-DD */
  date: string
  daysLeft: number
  /** 第几个周年；天数里程碑 / 一次性日子为 0 */
  years: number
  /** 自动算出来的（天数里程碑 / 周年），不可删除 */
  auto: boolean
}
