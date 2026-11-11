/**
 * 媒体库相关接口：分类、笔记、媒体资源、演员及其关联
 */
import { apiHttp } from '@/http';
import type { Page, PaginationProps } from '@/types/common';
import type { Actor, Anniversary, Category, MediaAsset, MediaTitleGroup, Post } from '@/types/media';
import type { Property } from '@/types/wallet';

// ─── 分类 ────────────────────────────────────────────────
export const selectCategories = (params: PaginationProps) =>
  apiHttp.get<Page<Category>>('/categories', {params});

export const selectCategory = (id: string) => apiHttp.get<Category>(`/categories/${id}`);

export const mergeCategory = (category: Category) =>
  apiHttp.post<Category>('/categories', category);

export const deleteCategory = (id: string) => apiHttp.delete<void>(`/categories/${id}`);

// ─── 资产项 ──────────────────────────────────────────────
// TODO 原实现指向 /categories，疑为历史复制粘贴导致，需与后端确认是否应为 /properties
export const mergeProperty = (property: Property) =>
  apiHttp.post<Property>('/categories', property);

export const deleteProperty = (id: string) => apiHttp.delete<void>(`/categories/${id}`);

// ─── 笔记 ────────────────────────────────────────────────
export const selectPosts = (params: PaginationProps, categoryId: string) =>
  apiHttp.get<Page<Post>>('/posts', {
    params: {...params, categoryId},
  });

export const searchPosts = (params: PaginationProps, keyword: string) =>
  apiHttp.get<Page<Post>>('/posts/search', {
    params: {...params, keyword},
  });

export const selectPost = (id: string) => apiHttp.get<Post>(`/posts/${id}`);

export const mergePost = (post: Post) => apiHttp.post<Post>('/posts', post);

export const deletePost = (id: string) => apiHttp.delete<void>(`/posts/${id}`);

// ─── 媒体资源 ────────────────────────────────────────────
/** kind 为空串时不参与过滤（兼容旧调用）；传 'media' 做业务隔离 */
export const selectMediaAssets = (params: PaginationProps, kind = '') =>
  apiHttp.get<Page<MediaAsset>>('/media-assets', {
    params: {...params, ...(kind ? {kind} : {})},
  });

/** 注意返回的是 {label, value}[]，不是 string[] */
export const selectMediaTitleGroups = () =>
  apiHttp.get<MediaTitleGroup[]>('/media-assets/title-groups');

export const selectRandomMediaAssets = (count = 5) =>
  apiHttp.get<MediaAsset[]>('/media-assets/random', {params: {count}});

export const searchMediaAssets = (params: PaginationProps, keyword: string, kind = '') =>
  apiHttp.get<Page<MediaAsset>>('/media-assets', {
    params: {...params, keyword, ...(kind ? {kind} : {})},
  });

export const selectMediaAsset = (id: string) => apiHttp.get<MediaAsset>(`/media-assets/${id}`);

export const createMediaAsset = (mediaAsset: MediaAsset) =>
  apiHttp.post<MediaAsset>('/media-assets', mediaAsset);

/** 批量创建媒体资产（表情包导入用）：后端 POST /media-assets/batch */
export const createMediaAssetsBatch = (mediaAssets: MediaAsset[]) =>
  apiHttp.post<MediaAsset[]>('/media-assets/batch', mediaAssets);

export const updateMediaAsset = (id: string, mediaAsset: MediaAsset) =>
  apiHttp.put<MediaAsset>(`/media-assets/${id}`, mediaAsset);

export const deleteMediaAsset = (id: string) => apiHttp.delete<void>(`/media-assets/${id}`);

// ─── 演员 ────────────────────────────────────────────────
export const selectActors = (params: PaginationProps) =>
  apiHttp.get<Page<Actor>>('/actors', {params});

export const selectActor = (id: string) => apiHttp.get<Actor>(`/actors/${id}`);

export const createActor = (actor: Actor) => apiHttp.post<Actor>('/actors', actor);

export const updateActor = (id: string, actor: Actor) => apiHttp.put<Actor>(`/actors/${id}`, actor);

export const deleteActor = (id: string) => apiHttp.delete<void>(`/actors/${id}`);

// ─── 纪念日 ──────────────────────────────────────────────
export const selectAnniversaries = (params: PaginationProps) =>
  apiHttp.get<Page<Anniversary>>('/anniversaries', {params});

export const selectAnniversary = (id: string) => apiHttp.get<Anniversary>(`/anniversaries/${id}`);

export const createAnniversary = (anniversary: Anniversary) =>
  apiHttp.post<Anniversary>('/anniversaries', anniversary);

export const updateAnniversary = (anniversary: Anniversary) =>
  apiHttp.put<Anniversary>(`/anniversaries/${anniversary.id}`, anniversary);

export const deleteAnniversary = (id: string) => apiHttp.delete<void>(`/anniversaries/${id}`);

// ─── 媒体与演员关联 ──────────────────────────────────────
export const selectMediaActorRelByMediaId = (mediaId: string) =>
  apiHttp.get<any[]>('/media-actor-rels', {params: {mediaId}});

export const mergeMediaActorRel = (rel: any) => apiHttp.post<any>('/media-actor-rels', rel);

export const deleteMediaActorRel = (id: string) =>
  apiHttp.delete<void>(`/media-actor-rels/${id}`);
