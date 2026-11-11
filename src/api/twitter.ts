/**
 * Twitter 博主收藏夹接口
 */
import { apiHttp } from '@/http';
import type { Page, PaginationProps } from '@/types/common';
import type { TwitterBlogger } from '@/types/twitter';

/** 列表：当前用户收藏博主，后端已改真分页（currentPage / pageSize，返回 CommonPage{records, hasNextPage}） */
export const selectTwitterBloggers = (params: PaginationProps) =>
  apiHttp.get<Page<TwitterBlogger>>('/twitter-bloggers', { params });

/** 详情：单个博主（含 twitterUrl，供前端跳 H5） */
export const selectTwitterBlogger = (id: string) =>
  apiHttp.get<TwitterBlogger>(`/twitter-bloggers/${id}`);

/** 新增或更新，id 由前端 nanoid 预生成 */
export const mergeTwitterBlogger = (blogger: TwitterBlogger) =>
  apiHttp.post<TwitterBlogger>('/twitter-bloggers', blogger);

/** 删除 */
export const deleteTwitterBlogger = (id: string) =>
  apiHttp.delete<void>(`/twitter-bloggers/${id}`);
