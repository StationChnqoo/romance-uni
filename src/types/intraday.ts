/**
 * 日内收益走势类型定义
 * 与 tv-tauri 的 IntradayReturnSample 对齐（同后端 /intraday-returns）。
 */

/** 日内收益的一个采样点 */
export interface IntradayReturnSample {
  /** 采样时刻（ISO 字符串，如 2026-10-20T09:45:00） */
  time: string;
  /** 我的预计收益（百分数，如 0.1234 表示 0.1234%） */
  expected: number;
  /** 上证指数当日涨跌幅（百分数），该时刻未采样为 null */
  shanghai: number | null;
  /** 沪深300 当日涨跌幅（百分数），该时刻未采样为 null */
  csi300: number | null;
  /** 创业板指 当日涨跌幅（百分数），该时刻未采样为 null */
  chinext: number | null;
}
