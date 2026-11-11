/**
 * 东方财富数据源
 *
 * 每个域名一个独立实例，baseURL 创建后不可变；
 * referer / Cookie 通过单次请求的 headers 传入，不会残留到下一次请求。
 */
import { createHttp } from '@/http';
import dayjs from 'dayjs';

const push2 = createHttp({baseURL: 'https://push2.eastmoney.com', unwrap: false});
const push2Delay = createHttp({baseURL: 'https://push2delay.eastmoney.com', unwrap: false});
const push2Ex = createHttp({baseURL: 'https://push2ex.eastmoney.com', unwrap: false});
const codeTable = createHttp({baseURL: 'https://search-codetable.eastmoney.com', unwrap: false});

const refers = {
  sector: (code: string) => `https://data.eastmoney.com/bkzj/${code}.html`,
  quote: 'https://quote.eastmoney.com/center/hszs.html',
  search: (code: string) => `https://so.eastmoney.com/web/s?keyword=${code}`,
  zjlx: 'https://data.eastmoney.com/zjlx/dpzjlx.html',
  home: 'https://www.eastmoney.com/default.html',
  hy: 'https://data.eastmoney.com/bkzj/hy_5.html',
};

/** 板块下所有股票 */
export const selectStocksOfSector = (code: string) =>
  push2Delay.get<any>('/api/qt/clist/get', {
    headers: {referer: refers.sector(code)},
    params: {
      cb: '',
      fid: 'f62',
      po: 1,
      pz: 99,
      pn: 1,
      np: 1,
      fltt: 2,
      invt: 2,
      fs: `b:${code}`,
      fields:
        'f12,f14,f2,f3,f62,f184,f66,f69,f72,f75,f78,f81,f84,f87,f204,f205,f124,f1,f13',
    },
  });

/** 单日 K 线走势，分钟级 */
export const selectDailyTrends = (code: string) =>
  push2.get<any>('/api/qt/stock/trends2/get', {
    headers: {referer: refers.quote},
    params: {
      secid: code,
      fields1: Array.from({length: 13}, (_, i) => `f${i + 1}`).join(','),
      fields2: Array.from({length: 8}, (_, i) => `f${50 + i}`).join(','),
      iscr: 0,
      cb: '',
      isqhquote: '',
    },
  });

/** 指数实时净值 */
export const selectRealtimePrice = (code: string) =>
  push2.get<any>('/api/qt/stock/get', {
    headers: {
      referer: refers.search(code),
      // 该接口依赖 Cookie 才返回数据
      Cookie:
        'qgqp_b_id=; st_nvi=; st_si=; st_pvi=; st_sp=; st_inirUrl=; st_asi=delete; st_sn=2; st_psi=; ' +
        `nid=${Math.random()}; nid_create_time=; gvi=; gvi_create_time=`,
    },
    params: {
      cb: '',
      fields:
        'f57,f58,f59,f152,f43,f169,f170,f60,f44,f45,f168,f50,f47,f48,f49,f46,f78,f85,f86,f169,f117,f107,f111,f116,f117,f118,f163,f171,f113,f114,f115,f161,f162,f164,f168,f172,f177,f180,f181,f292,f751,f752',
      secid: code,
      invt: 2,
    },
  });

/** 代码搜索 */
export const selectSearcher = (s: string) =>
  codeTable.get<any>('/codetable/search/web', {
    headers: {referer: refers.home},
    params: {
      client: 'web',
      clientType: 'webSuggest',
      clientVersion: 'lastest',
      cb: '',
      keyword: s,
      pageIndex: 1,
      pageSize: 20,
      securityFilter: '',
    },
  });

/**
 * 已移除：外围股市涨跌（`/api/qt/ulist/get`，secids 口径）。
 * 2026-10 起首页「外围股市」看板与「全球指数」选择页都改用 MSN 的
 * `selectMsnStocks`（见 api/third/msn.ts），这条东财接口随之删除。
 */

/** 基金排行 */
export const selectFundRanks = () =>
  push2.get<any>('/api/qt/clist/get', {
    headers: {referer: refers.hy},
    params: {
      cb: '',
      fid: 'f164',
      po: 1,
      pz: 99,
      pn: 1,
      np: 1,
      fltt: 2,
      invt: 2,
      fs: 'm:90 s:4',
      fields:
        'f12,f14,f2,f3,f62,f184,f66,f69,f72,f75,f78,f81,f84,f87,f204,f205,f124,f1,f13',
    },
  });

const buildZtbParams = (params: {date?: string; sort?: string; dpt?: string}) => ({
  cb: '',
  ut: '7eea3edcaed734bea9cbfc24409ed989',
  pageindex: 0,
  pagesize: 255,
  ...params,
});

/** 炸板 */
export const selectBoomBoards = (date?: string) =>
  push2Ex.get<any>('/getTopicZBPool', {
    params: buildZtbParams({
      date: date || dayjs().format('YYYYMMDD'),
      dpt: 'wz.ztzt',
      sort: 'fbt:asc',
    }),
  });

/** 涨停板 */
export const selectLimitUpBoards = (date?: string) =>
  push2Ex.get<any>('/getTopicZTPool', {
    params: buildZtbParams({
      date: date || dayjs().format('YYYYMMDD'),
      dpt: 'wz.ztzt',
      sort: 'fbt:desc',
    }),
  });

/** 次新股 */
export const selectNearNewBoards = (date?: string) =>
  push2Ex.get<any>('/getTopicCXPooll', {
    params: buildZtbParams({
      date: date || dayjs().format('YYYYMMDD'),
      dpt: 'wz.ztzt',
      sort: 'ods:asc',
    }),
  });
