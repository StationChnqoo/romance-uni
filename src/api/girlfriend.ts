/**
 * 「关于她」小事记 —— 后端真实接口
 *
 * 后端 /girl-notes 全部按 token 里的 userId 隔离，前端不传 userId。
 * 列表是真分页（CommonPage），tab 角标 / 待办提醒走 /stats（分页接口拿不到全局统计）。
 * id 由后端 NanoIdUtils 生成，前端新增时 id 传空串即可。
 */
import { apiHttp } from '@/http'
import type { Page, PaginationProps } from '@/types/common'
import type { GirlNote, GirlNoteQuery, GirlNoteStats } from '@/types/girlfriend'

/** 分页列表：筛选条件下推到 SQL */
export const selectGirlNotes = (params: PaginationProps & GirlNoteQuery) =>
  apiHttp.get<Page<GirlNote>>('/girl-notes', { params })

/** 概览统计：态度角标 + 待办数量与最近 3 条 */
export const selectGirlNoteStats = () =>
  apiHttp.get<GirlNoteStats>('/girl-notes/stats')

/** 详情（含附件，URL 已转 CDN） */
export const selectGirlNote = (id: string) =>
  apiHttp.get<GirlNote>(`/girl-notes/${id}`)

/** 新增 / 编辑（merge），返回 id；新建时该 id 由后端 nanoid 生成 */
export const mergeGirlNote = (note: GirlNote) =>
  apiHttp.post<string>('/girl-notes', note)

/** 切换星标，返回切换后的值 */
export const toggleGirlNoteStar = (id: string) =>
  apiHttp.post<boolean>(`/girl-notes/${id}/star`)

/** 删除（后端级联清附件关联） */
export const deleteGirlNote = (id: string) =>
  apiHttp.delete<void>(`/girl-notes/${id}`)
