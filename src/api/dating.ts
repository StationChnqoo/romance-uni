/**
 * 相亲对象与进度
 */
import { apiHttp } from '@/http';
import type { Page, PaginationProps } from '@/types/common';
import type { Dating, DatingListItem, DatingProgress } from '@/types/dating';

/**
 * 相亲对象列表，可按状态过滤。后端已改真分页（currentPage / pageSize / status，返回 CommonPage{records, totalItems, hasNextPage}）。
 *
 * 返回的是**列表项**（每个对象带 progressCount，但不含 progresses）—— 与 DatingListItem 对齐。
 */
export const selectDatings = (params: PaginationProps, status?: string) =>
  apiHttp.get<Page<DatingListItem>>('/datings', {params: {...params, status: status || ''}});

/** 详情，含全部进度及附件 */
export const selectDating = (id: string) => apiHttp.get<Dating>(`/datings/${id}`);

/** 新增或更新，id 由前端 nanoid 预生成 */
export const mergeDating = (dating: Dating) => apiHttp.post<Dating>('/datings', dating);

/** 删除，级联删除进度及附件关联 */
export const deleteDating = (id: string) => apiHttp.delete<void>(`/datings/${id}`);

/** 新增或更新进度，附件随表单提交 */
export const mergeDatingProgress = (progress: DatingProgress) =>
  apiHttp.post<DatingProgress>('/datings/progresses', progress);

/** 删除单条进度 */
export const deleteDatingProgress = (id: string) =>
  apiHttp.delete<void>(`/datings/progresses/${id}`);
