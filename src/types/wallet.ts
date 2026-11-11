/**
 * 钱包相关类型定义
 */

/** 钱包 */
export interface TWallet {
  id: string;
  userId: string;
  unionpay: string;
  wechat: string;
  alipay: string;
  eastmoney: string;
  cash: string;
  indexSh000001: string;
  indexSpx: string;
  /**
   * 本周「圈外」资金进出明细（JSON 数字数组，单位 k），如 [14, -5, -1]。
   * 正 = 存入，负 = 取出；净流入 = 数组求和，由前端算，不单独存汇总值。
   * ★ 不是资产科目：不进 WalletMaps / calculateWalletFormSum，只用于把余额变化
   *   拆成「本金投入」与「投资收益」（TWR）。
   * ★ 可选是因为历史记录没有这一列：null / undefined / [] / '' = 未记录（缺失），
   *   有明细（合计可以是 0）= 已记录，两者语义不同，前端不可把缺失当 0。
   * ★ 兼容早期单个数字 / 数字字符串（旧 DECIMAL 列），parseNetInflow 会当一笔处理。
   */
  netInflow?: Array<number | string> | string | number | null;
  fund: string[];
  carpool: string[];
  settleOn: string;
  createAt: string;
  updateAt: string;
}

export interface CustomServer {
  host: string;
  status: boolean;
}

export interface Property {
  _id: string;
  id: string;
  wechat: string;
  alipay: string;
  unionpay: string[];
  cash: string;
  carpooling: string[];
  eastmoney: string;
  housefund: string[];
  usd: string[];
  createTime: number;
  settleDate: number;
  updateTime: number;
  total: string;
  userId: string;
}
