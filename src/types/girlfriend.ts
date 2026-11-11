/**
 * 「关于她」小事记 —— 数据模型
 *
 * 数据来自后端 /girl-notes（girl_note 表），id 由后端 nanoid 生成，列表走真分页。
 * 附件沿用项目既有的 FileUploader -> /upload/cloud，字段类型复用 PicGoSrc（后端 FileObject）。
 * zod 已卸载，一律「interface + createXxx() 工厂」，不再引入运行时校验库。
 */
import dayjs from 'dayjs'
import type { PicGoSrc } from '@/types/media'

/** 态度：不只是喜欢 / 不喜欢，中性事实和心愿也各有位置 */
export type GirlAttitude = 'like' | 'dislike' | 'wish' | 'mention'
/**
 * 后续：记了要做，才算真的记住。
 * ★ 不再设「分量」和「需避开」：分量与 starred 撞义，需避开与态度「不喜欢」撞义，
 *   三档状态只负责「办没办」，不重复表达「重不重要 / 该不该躲」。
 * ★ 也不设「主题归类」：查找靠搜索 + 态度 tab + 状态 + 星标 + 自由标签，
 *   固定 8 类与标签是两套并行分类，且记录当下是一次没有回报的互斥单选。
 */
export type GirlStatus = 'record' | 'todo' | 'done'

export interface GirlNote {
  id: string
  /** 她说了什么（尽量用原话），唯一必填项 */
  content: string
  attitude: GirlAttitude
  status: GirlStatus
  /** 事情发生 / 她说的日期 YYYY-MM-DD（可补记，不等于创建时间） */
  saidAt: string
  /** 当时的情境：什么时候、在哪、聊到什么 */
  scene: string
  /** 我的备注 / 打算怎么做 */
  memo: string
  tags: string[]
  attachments: PicGoSrc[]
  starred: boolean
  /** createAt / updateAt 由服务端 TimeUtils.now() 生成，以接口返回为准 */
  createAt: string
  updateAt: string
}

/** 列表查询参数：全部下推后端，与 GirlNoteQueryDTO 对齐 */
export interface GirlNoteQuery {
  /** 空串 = 全部态度 */
  attitude?: string
  /** 空串 = 全部状态 */
  status?: string
  /** true = 只看星标；false / 不传 = 不过滤 */
  starred?: boolean
  /** 搜 content / memo / scene / tags */
  keyword?: string
  /** new 最新在前 / old 最早在前 / star 星标在前 */
  sort?: string
}

/** 待办提醒里的精简条目（/stats 返回，不是完整 GirlNote） */
export interface GirlNoteTodo {
  id: string
  content: string
  saidAt: string
}

/** 概览统计：分页列表拿不到全局角标，单独由 /girl-notes/stats 返回 */
export interface GirlNoteStats {
  total: number
  /** key: all / like / dislike / wish / mention */
  attitudeCounts: Record<string, number>
  todoCount: number
  todoPreview: GirlNoteTodo[]
}

export const createGirlNote = (): GirlNote => ({
  id: '',
  content: '',
  attitude: 'mention',
  status: 'record',
  saidAt: dayjs().format('YYYY-MM-DD'),
  scene: '',
  memo: '',
  tags: [],
  attachments: [],
  starred: false,
  createAt: '',
  updateAt: ''
})

export const createGirlNoteStats = (): GirlNoteStats => ({
  total: 0,
  attitudeCounts: {},
  todoCount: 0,
  todoPreview: []
})
