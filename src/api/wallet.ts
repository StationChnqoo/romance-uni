import { apiHttp } from '@/http';
import type { Page, PaginationProps } from '@/types/common';
import type { TWallet } from '@/types/wallet';

/** 钱包分页列表 */
export const selectWallets = (params: PaginationProps) =>
  apiHttp.get<Page<TWallet>>('/wallets', {params});

/** 钱包详情 */
export const selectWallet = (id: string) => apiHttp.get<TWallet>(`/wallets/${id}`);

/** 首末两条钱包记录，用于同比对比卡（后端字段 datas -> records） */
export const selectFirstAndLastWallet = () =>
  apiHttp.get<{records: TWallet[]}>('/wallets/first-and-last');

/** 新增或更新钱包 */
export const mergeWallet = (wallet: TWallet) => apiHttp.post<TWallet>('/wallets', wallet);

/** 删除钱包 */
export const deleteWallet = (id: string) => apiHttp.delete<void>(`/wallets/${id}`);
