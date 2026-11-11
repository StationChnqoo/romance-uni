/**
 * 投资记录接口（原「投资组合 -> 每周记录」两层已砍掉组合层，记录直接平铺）
 */
import { apiHttp } from '@/http';
import type { Page, PaginationProps } from '@/types/common';
import type { PortfolioWeeklyRecord } from '@/types/portfolio';

export const selectPortfolioWeeklyRecords = (params: PaginationProps) =>
  apiHttp.get<Page<PortfolioWeeklyRecord>>('/portfolio-weekly-records', {
    params,
  });

export const selectPortfolioWeeklyRecord = (id: string) =>
  apiHttp.get<PortfolioWeeklyRecord>(`/portfolio-weekly-records/${id}`);

export const createPortfolioWeeklyRecord = (record: PortfolioWeeklyRecord) =>
  apiHttp.post<PortfolioWeeklyRecord>('/portfolio-weekly-records', record);

export const updatePortfolioWeeklyRecord = (id: string, record: PortfolioWeeklyRecord) =>
  apiHttp.put<PortfolioWeeklyRecord>(`/portfolio-weekly-records/${id}`, record);

export const deletePortfolioWeeklyRecord = (id: string) =>
  apiHttp.delete<void>(`/portfolio-weekly-records/${id}`);
