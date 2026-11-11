/**
 * 媒体相关类型定义
 * 包含帖子、纪念日、演员、媒体资源等类型
 *
 * 说明：早期这些结构用 zod 的 schema 定义（顺带当默认值工厂用），
 * 2026-10-03 已把 zod 从项目里彻底移除，改成「interface + createXxx() 工厂」：
 * 类型归类型，默认值归工厂，不再引入运行时校验库。
 */

import dayjs from 'dayjs';

/** 帖子附件（后端 FileObject / PicGo 上传响应） */
export interface PicGoSrc {
  /** 图片的唯一标识符 */
  id: string;
  /** 图片的 MIME 类型 */
  mimeType: string;
  /** 图片的文件名 */
  name: string;
  /** 图片在存储系统中的路径/键值 */
  objectKey: string;
  /** 图片文件大小（字节） */
  size: number;
  /** 图片更新时间 */
  updateAt: string;
  /** 图片的访问 URL */
  url: string;
}

/** 笔记分类 */
export interface Category {
  id: string;
  userId: string;
  title: string;
  content: string;
  createAt: string;
  updateAt: string;
}

export const createCategory = (): Category => ({
  id: '',
  userId: '',
  title: '',
  content: '',
  createAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  updateAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
});

export interface Post {
  id: string;
  userId: string;
  categoryId: string;
  title: string;
  content: string;
  tags: string[];
  images: PicGoSrc[];
  createAt: string;
  updateAt: string;
  /** extra：后端可能回 null（未归类），前端一律当空串处理 */
  categoryTitle: string;
}

export const createPost = (): Post => ({
  id: '',
  userId: '',
  categoryId: '',
  title: '',
  content: '',
  tags: [],
  images: [],
  createAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  updateAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  categoryTitle: '',
});

export interface Anniversary {
  id: string;
  userId: string;
  title: string;
  description: string;
  emoji: string;
  anniversaryDate: string;
  reminderEnabled: number;
  reminderDays: number;
  isLunar: number;
  sortNo: number;
  createAt: string;
  updateAt: string;
}

export const createAnniversary = (): Anniversary => ({
  id: '',
  userId: '',
  title: '',
  description: '',
  emoji: '',
  anniversaryDate: '',
  reminderEnabled: 1,
  reminderDays: 0,
  isLunar: 0,
  sortNo: 0,
  createAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  updateAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
});

export interface Actor {
  id: string;
  name: string;
  aliasName: string;
  avatarUrl: string;
  remark: string;
  createAt: string;
  updateAt: string;
}

export const createActor = (): Actor => ({
  id: '',
  name: '',
  aliasName: '',
  avatarUrl: '',
  remark: '',
  createAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  updateAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
});

export interface MediaAsset {
  id: string;
  title: string;
  coverUrl: string;
  sourceUrl: string;
  description: string;
  remark: string;
  /** 资产类型：'media'=影视媒体库（默认） */
  kind?: string;
  createAt: string;
  updateAt: string;
  /** extra */
  actors: Actor[];
}

/**
 * 标题分组统计项
 * /media-assets/title-groups 返回的是 {label, value} 对象数组，不是字符串数组
 * （RN 那边按 string[] 直接渲染是历史 bug，会把整个对象显示出来）。
 */
export interface MediaTitleGroup {
  /** 分组名，页面上显示这个 */
  label: string;
  /** 分组值 */
  value: string;
}
