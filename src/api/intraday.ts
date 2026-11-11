/**
 * 日内收益走势接口（与 tv-tauri 同后端 /intraday-returns）。
 *
 * 后端每条记录字段是 sampleAt + 四个数值（expected / shanghai / csi300 / chinext），
 * 这里在 api 层就把 sampleAt 归一成 time、数值转 number，
 * 业务侧直接拿 IntradayReturnSample 用，不必再关心后端字段名与 string/number 转换。
 */
import { apiHttp } from '@/http';
import type { IntradayReturnSample } from '@/types/intraday';

interface IntradayReturnRecord {
  sampleAt: string;
  expected: number;
  shanghai: number | null;
  csi300: number | null;
  chinext: number | null;
}

/** 不传 date 时后端默认取当天；date 传 'YYYY-MM-DD' 可取历史某天 */
export const selectIntradayReturns = (date?: string) =>
  apiHttp
    .get<IntradayReturnRecord[]>('/intraday-returns', { params: { date } })
    .then((records): IntradayReturnSample[] =>
      (records || []).map(record => ({
        time: record.sampleAt.includes('T') ? record.sampleAt : record.sampleAt.replace(' ', 'T'),
        expected: Number(record.expected),
        shanghai: record.shanghai == null ? null : Number(record.shanghai),
        csi300: record.csi300 == null ? null : Number(record.csi300),
        chinext: record.chinext == null ? null : Number(record.chinext)
      }))
    );
