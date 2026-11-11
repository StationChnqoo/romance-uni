/**
 * 投资记录相关类型定义（原「投资组合 -> 每周记录」两层已砍掉组合层，记录直接平铺）
 *
 * 说明：早期用 zod 的 schema 定义（顺带当默认值工厂用），2026-10-03 已移除 zod，
 * 改成「interface + createXxx() 工厂」：createXxx(partial) 既能造空草稿，
 * 也能用接口数据补齐默认值（对应原来的 schema.parse(result)）。
 */

import dayjs from 'dayjs';

export interface PortfolioAssetItem {
  name: string;
  /** 多笔投资金额；后端老数据可能是单个数字/字符串，进表单前统一成数组 */
  amount: Array<number | string>;
  weight: number | string;
  note: string;
}

/** 金额归一：undefined/null/'' → []，单值 → [v]，本来就是数组则原样 */
const normalizeAmount = (
  value: unknown
): Array<number | string> => {
  if (Array.isArray(value)) {
    return value as Array<number | string>;
  }
  if (value === undefined || value === null || value === '') {
    return [];
  }
  return [value as number | string];
};

export const createPortfolioAssetItem = (
  partial: Partial<PortfolioAssetItem> = {}
): PortfolioAssetItem => ({
  name: partial.name ?? '',
  amount: normalizeAmount(partial.amount),
  weight: partial.weight ?? '0',
  note: partial.note ?? '',
});

export interface PortfolioWeeklyRecord {
  id: string;
  settleOn: string;
  totalAsset: number | string;
  assets: PortfolioAssetItem[];
  remark: string;
  createAt: string;
  updateAt: string;
}

export const createPortfolioWeeklyRecord = (
  partial: Partial<PortfolioWeeklyRecord> = {}
): PortfolioWeeklyRecord => ({
  id: partial.id ?? '',
  settleOn: partial.settleOn ?? dayjs().format('YYYY-MM-DD'),
  totalAsset: partial.totalAsset ?? '0',
  assets: (partial.assets ?? []).map(item => createPortfolioAssetItem(item)),
  remark: partial.remark ?? '',
  createAt: partial.createAt ?? dayjs().format('YYYY-MM-DD HH:mm:ss'),
  updateAt: partial.updateAt ?? dayjs().format('YYYY-MM-DD HH:mm:ss'),
});
