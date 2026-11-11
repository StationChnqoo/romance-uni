/**
 * 股票/行情相关类型定义
 * 包含东方财富、MSN 等数据源的行情数据结构
 */

/** 东方财富实时行情 */
export interface RealTimePrice {
  /** 股票价格 * 1000 */
  f43?: number;
  /** 股票代号 */
  f57?: string;
  /** 股票名字 */
  f58?: string;
  /** 当前净值 */
  f60?: number;
  /** 成交量 */
  f47?: number;
  /** 成交额 */
  f48?: number;
  /** 精度 */
  f59?: number;
  /** 时间 */
  f86?: number;
  /** 几级市场 */
  f107?: number;
  /** 涨跌额 */
  f169?: number;
  /** 涨跌幅 */
  f170?: number;
  /** 详情接口或者图片趋势的时候用 */
  code?: string;
}

/** 板块项目 */
export interface BoardItem {
  amount: number; // 成交额
  c: string; // 代码
  fbt: number; // 封板额
  hs: number; // 换手率
  hybk: string; // 行业板块
  ltsz: number; // 流通市值
  m: number; // 连板数
  n: string; // 名称
  p: number; // 最新价
  tshare: number; // 总市值
  zbc: number; // 炸板次数
  zdp: number; // 涨跌幅
  zf: number; // 振幅
  zs: number; // 涨速
  ztp: number; // 涨停价
}

/** 搜索股票结果 */
export interface SearchStockResult {
  code: string;
  innerCode: string;
  shortName: string;
  market: number; // ?.code
  pinyin: string;
  securityType: number[];
  securityTypeName: string; // 什么市场 沪A/深A
  smallType: number;
  status: number;
  flag: number;
  extSmallType: number;
}

/**
 * MSN 资讯流条目（`assets.msn.cn` 的 `/service/MSN/Feed/me`，列表在返回体的 `subCards`）
 * 只声明页面用到的字段，接口还有 abstract / reactionSummary / dedupeIds 等一大票不用的。
 */
export interface MsnNewsItem {
  id: string;
  type: string;
  title: string;
  url: string;
  /** ISO 时间串（UTC，带 Z），交给 dayjs 转本地时区 */
  publishedDateTime: string;
  images?: MsnNewsImage[];
  provider?: MsnNewsProvider;
}

export interface MsnNewsImage {
  width: number;
  height: number;
  url: string;
  title?: string;
}

export interface MsnNewsProvider {
  id?: string;
  /** 来源名，如「红星新闻」 */
  name?: string;
  /** 来源 logo（卡片左上角那个小图） */
  logoUrl?: string;
  mainLogoUrl?: string;
}

// ========== MSN 数据相关类型 ==========

export interface MsnChartSeriesItem {
  priceHigh: number;
  priceLow: number;
  prices: number[];
}

export interface MsnChartItem {
  instrumentId: string;
  timeLastUpdated: string;
  series: MsnChartSeriesItem;
}

export interface MsnQuoteItem {
  price: number;
  priceChange: number;
  priceChangePercent: number;

  priceDayHigh: number;
  priceDayLow: number;
  priceDayOpen: number;
  pricePreviousClose: number;
  datePreviousClose: string;

  priceAsk: number;
  askSize: number;
  priceBid: number;
  bidSize: number;

  accumulatedVolume: number;
  averageVolume: number;

  peRatio: number | null;
  yieldPercent: number | null;

  price52wHigh: number;
  price52wLow: number;

  priceChange1Week: number;
  priceChange1Month: number;
  priceChange3Month: number;
  priceChange6Month: number;
  priceChangeYTD: number;
  priceChange1Year: number;

  return1Week: number;
  return1Month: number;
  // return3Month: number; 有的是没有数据的 ...
  return6Month: number;
  returnYTD: number;
  return1Year: number;

  timeLastTraded: string;
  timeLastUpdated: string;

  marketCap: number;
  marketCapCurrency: string;

  currency: string;

  sourceExchangeCode: string;
  sourceExchangeName: string;

  exchangeId: string;
  exchangeCode: string;
  exchangeName: string;

  offeringStatus: 'regular' | string;

  displayName: string;
  shortName: string;
  symbol: string;

  securityType: 'stock' | string;
  instrumentId: string;

  country: string;
  market: string;

  icon?: string;

  localizedAttributes: Record<string, unknown>;

  /** MSN 内部字段 */
  _p: string;
  _t: 'UnifiedQuote';
  id: string;
  weight?: number;
  label?: string;
}

/** Quote和Chart只是其中一部分 */
export interface MsnStandardStock {
  chart: MsnChartItem;
  quote: MsnQuoteItem;
}

export interface StandardStock {
  name: string;
  market: number | string;
  code: string;
  currentPrice: number | string;
  zdf: number | string;
  updateTime: number;
}

/**
 * 自选指数的一行行情（首页外围股市看板、全球指数选择页共用）
 *
 * ★ 数据源：MSN。原来的 OtherCountryStock（东方财富 ulist 的 f2/f3/f12/f13/f14 口径）
 *   随 2026-10「自选指数换 MSN + 移除东财接口」一起删掉（它在 stock.ts 里被声明了两次，
 *   这次两个都清了）。
 */
export interface GlobalIndexQuote {
  /** fi- 形式的 MSN 标的 id */
  id: string;
  /** 中文名：取枚举里的名字，不用接口返回的 displayName（那是「上证综合指数」这类全称） */
  name: string;
  /** 最新价；接口没回来时是 0 */
  price: number;
  /**
   * 涨跌幅，**已是百分数**（MSN 的 priceChangePercent 直接就是这个口径，
   * 与 MsnCard 一致：0.0495 就是 0.0495%，不用再 /100）
   */
  changePercent: number;
}
