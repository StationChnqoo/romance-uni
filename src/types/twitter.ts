/**
 * Twitter 博主收藏夹
 * 列表 / 详情 / 编辑共用同一份结构（博主没有子实体，无需区分 ListVO / DetailVO）。
 */
export type TwitterBlogger = {
  id: string;
  /** 显示名，如 "Elon Musk" */
  name: string;
  /** 推特账号，含 @，如 "@elonmusk" */
  handle?: string;
  /** 头像 URL（外部链接，展示时原样用，不进 CDN 转换） */
  avatar?: string;
  /** 主页链接，用于外跳系统默认浏览器打开 */
  twitterUrl?: string;
  /** 标签数组，如 ["财经","科技"] */
  tags: string[];
  /** 简介 */
  description: string;
  /** 备注 */
  remark: string;
  createAt: string;
  updateAt: string;
};
