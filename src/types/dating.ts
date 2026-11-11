import type {PicGoSrc} from './media';

/**
 * 相亲附件：与后端 FileObject 对齐，直接复用 PicGoSrc
 * （id / mimeType / name / objectKey / size / updateAt / url）。
 * 类型（图片/视频/PDF/文档）由 mimeType 派生，不再单独存 type 字段。
 */
export type DatingAttachment = PicGoSrc;

export type DatingProgress = {
  id: string;
  datingId?: string;
  date: string;
  title: string;
  description: string;
  /** 当日心情：用户手动输入 emoji 或 emoji + 简短描述，如 "😊 开心" */
  mood?: string;
  attachments: DatingAttachment[];
  createAt: string;
};

export type DatingStatus =
  | 'talking' // 初期沟通
  | 'dating' // 约会中
  | 'deep' // 深度了解
  | 'meeting' // 见家长
  | 'engaged' // 订婚
  | 'success' // 成功
  | 'failed'; // 失败

/** 相亲对象公共字段 */
export type DatingBase = {
  id: string;
  name: string;
  avatar?: string;
  /** 出生年份，如 1997；避免跨年后“年龄”字段不准，由显示层按需换算年龄 */
  birthYear?: number;
  height?: number;
  education?: string;
  job?: string;
  city?: string;
  tags: string[];
  status: DatingStatus;
  meetAt?: string; // 认识日期
  latestContactAt?: string; // 最近联系日期
  description: string;
  createAt: string;
  updateAt: string;
};

/** 列表项（不含 progresses，用 progressCount 展示进度条数） */
export type DatingListItem = DatingBase & {
  progressCount: number;
};

/** 详情（含全部进度） */
export type Dating = DatingBase & {
  progresses: DatingProgress[];
};

/** 编辑表单（新建/编辑通用，id 由前端 nanoid 预生成） */
export type DatingForm = DatingBase;

/** 进度编辑表单（含 datingId 关联） */
export type DatingProgressForm = DatingProgress & {
  updateAt?: string;
};
