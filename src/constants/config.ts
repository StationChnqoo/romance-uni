export enum Fonts {
  digitalMono = 'Digital-7-mono',
  digital = 'Digital-7',
}

/**
 * 自选指数（外围股市看板 + 全球指数选择页共用）
 *
 * ★ 数据源：**MSN 财经（微软）**，不再走东方财富。
 *
 * value 一律写成 MSN 详情页用的 `fi-` 形式（`https://www.msn.cn/zh-cn/money/stockdetails/fi-adfh77`），
 * 但 **QuoteSummary 接口不认这个前缀** —— 实测 `ids=fi-adfh77` 只回一个空壳
 * `[{"instrumentId":"fi-adfh77","_t":"QuoteSummary"}]`（没有 quote 字段，取不到价），
 * 必须剥掉前缀传 `adfh77` 才有完整行情。所以调接口前统一走 `msnCodeOf()`。
 */
export const GLOBAL_INDEX_ID = {
  /** 上证指数 */
  SH: 'fi-adfh77',
  /** 创业板指数 */
  CYB: 'fi-adg21h',
  /** 沪深300 */
  HS300: 'fi-ah772w',
  /** 标普500 */
  SPX: 'fi-c4fayc',
  /** 纳斯达克指数（综合指数 COMP；旧的 fi-a3yy77 是「纳斯达克 100 指数」） */
  NDX: 'fi-a3oxnm',
  /** 日经225 */
  N225: 'fi-a9j7bh',
};

export type GlobalIndexItem = {
  /** 中文名（接口返回的 displayName 是「上证综合指数」这类全称，列表里不用它） */
  name: string;
  /** fi- 形式的 MSN 标的 id */
  value: string;
};

/** 可勾选的自选指数，顺序即选择页的展示顺序 */
export const GlobalIndexes: GlobalIndexItem[] = [
  {name: '上证指数', value: GLOBAL_INDEX_ID.SH},
  {name: '创业板指数', value: GLOBAL_INDEX_ID.CYB},
  {name: '沪深300', value: GLOBAL_INDEX_ID.HS300},
  {name: '标普500', value: GLOBAL_INDEX_ID.SPX},
  {name: '纳斯达克', value: GLOBAL_INDEX_ID.NDX},
  {name: '日经225', value: GLOBAL_INDEX_ID.N225},
];

/** 'fi-adfh77' -> 'adfh77'：QuoteSummary 的 ids 参数只吃无前缀的 code */
export const msnCodeOf = (value: string) => value.replace(/^fi-/, '');

/**
 * 是否是当前枚举里的自选指数。
 * 用来过滤 persist 里残留的旧值（2026-10 之前 marketStore.global 存的是东方财富 secid，
 * 形如 '1.000001' / '100.SPX'，换数据源后这些串已经没有对应的行情可查）。
 */
export const isGlobalIndex = (value: string) =>
  GlobalIndexes.some(it => it.value === value);
