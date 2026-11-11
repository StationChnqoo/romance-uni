/**
 * 节目收藏接口（program_series / program_episode）
 *
 * 后端 user_id 由 token 拦截器注入，前端不传。
 * 系列与期目是两张独立表：列表/详情分别走接口，不再像本地 store 那样把 episodes 内嵌进 series。
 */
import { apiHttp } from '@/http'
import { nanoid } from '@/utils'
import type { Page, PaginationProps } from '@/types/common'

/** 期目（每集） */
export interface ProgramEpisode {
  id: string
  /** 所属系列 */
  seriesId: string
  /** 第几集，用于排序与「第N集」展示（默认 0，按创建顺序） */
  episodeNo: number
  title: string
  content: string
  /** 预览图（完整 URL） */
  coverUrl: string
  /** m3u8 播放地址（完整 URL，禁止编码破坏 ?query）；非必填，源抓不到时为空串，播放前需判空 */
  m3u8: string
  createdAt: string
}

/** 系列（收藏单元） */
export interface ProgramSeries {
  id: string
  title: string
  /** 系列封面（完整 URL） */
  coverUrl: string
  description: string
  /** 列表用的期目计数（详情接口不返回此字段） */
  episodeCount?: number
  createdAt: string
  updatedAt: string
}

/** 系列详情：基本信息 + 期目列表（detail 接口返回） */
export interface ProgramSeriesDetail extends ProgramSeries {
  episodes: ProgramEpisode[]
}

/** 新建一条空白系列（id 用项目内 nanoid，避免小程序端裸 crypto 白屏） */
export const createProgramSeries = (): ProgramSeries => ({
  id: nanoid(),
  title: '',
  coverUrl: '',
  description: '',
  createdAt: '',
  updatedAt: ''
})

/** 新建一期空白节目（必须带上 seriesId，后端据此归属） */
export const createProgramEpisode = (seriesId: string): ProgramEpisode => ({
  id: nanoid(),
  seriesId,
  episodeNo: 0,
  title: '',
  content: '',
  coverUrl: '',
  m3u8: '',
  createdAt: ''
})

/** 系列列表（当前用户，按更新时间倒序，含期目计数）—— 分页，与 /wallets 等同款 CommonPage */
export const selectProgramSeries = (params: PaginationProps) =>
  apiHttp.get<Page<ProgramSeries>>('/program-series', { params })

/** 系列详情（含期目，按集号/创建时间排序） */
export const selectProgramSeriesDetail = (id: string) =>
  apiHttp.get<ProgramSeriesDetail>(`/program-series/${id}`)

/** 新增或更新系列（merge，id 由前端预生成） */
export const mergeProgramSeries = (series: ProgramSeries) =>
  apiHttp.post<ProgramSeries>('/program-series', series)

/** 删除系列（级联删除其下全部期目） */
export const deleteProgramSeries = (id: string) =>
  apiHttp.delete<void>(`/program-series/${id}`)

/** 新增或更新期目（merge，必须带 seriesId） */
export const mergeProgramEpisode = (episode: ProgramEpisode) =>
  apiHttp.post<ProgramEpisode>('/program-episodes', episode)

/** 删除单期目 */
export const deleteProgramEpisode = (id: string) =>
  apiHttp.delete<void>(`/program-episodes/${id}`)
