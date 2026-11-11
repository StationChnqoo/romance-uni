/**
 * MSN 财经数据源
 */
import { createHttp } from '@/http';

const assets = createHttp({baseURL: 'https://assets.msn.cn', unwrap: false});

const API_KEY = '0QfOX3Vn51YCzitbLaRkTTBadtWpgTN8NZLW0C1SEM';

export const selectMsnStocks = (msnCodes: string) =>
  assets.get<any>('/service/Finance/QuoteSummary', {
    params: {
      apikey: API_KEY,
      ids: msnCodes,
      activityId: '6981448a-200a-4e5a-9586-e00164638bd7',
      ocid: 'finance-utils-peregrine',
      cm: 'zh-cn',
      it: 'web',
      scn: 'ANON',
      intents: 'Quotes,Exchanges,QuoteDetails',
      wrapodata: 'false',
    },
  });

/**
 * 更长周期的走势
 * 注意：intents 加上 Quotes 会导致返回空数组，这里只用 Charts
 */
export const selectMsnStocksInMoreGap = (params: {
  msnCodes: string;
  type: '1Y' | '3Y' | '5Y';
}) =>
  assets.get<any>('/service/Finance/QuoteSummary', {
    params: {
      apikey: API_KEY,
      ids: params.msnCodes,
      activityId: '6981448a-200a-4e5a-9586-e00164638bd7',
      ocid: 'finance-utils-peregrine',
      cm: 'zh-cn',
      it: 'web',
      scn: 'ANON',
      intents: 'Charts,QuoteDetails,Exchanges',
      wrapodata: 'false',
      type: params.type,
    },
  });

/**
 * 财经资讯流（首页「7x24 小时新闻」/ 头条轮播）
 *
 * 实测：**不需要任何 cookie / token**，只带 apikey 等参数即可 200（9 万多字节、30 条）。
 * ★ 走 `assets.msn.cn`（与 QuoteSummary 同域），别改成 `api.msn.com`（那是返回里 nextPageUrl 的域名）。
 * ★ 返回体是 OData 风格：`{ nextPageUrl, subCards: [...], feed: {} }` —— **列表在 `subCards`**，
 *   不是 `value` / `data`。
 * ★ 分页：`$top` = 每页条数，`$skip` = **页号（0 起，每页 +1）**，不是「跳过的条数」。
 *   实测（top=10）：skip=0 → 第 1~10 条、skip=1 → 第 11~20 条、skip=2 → 第 21~30 条（三页互不重叠）；
 *   而 skip=10 / skip=20 返回的内容与 skip=1 / skip=2 **完全一样** ——
 *   所以 `(pageNo-1)*pageSize` 这种 10N 写法是错的（值会撞车），正确写法 `skip = pageNo - 1`。
 *   **不要**直接请求返回体里的 `nextPageUrl` —— 它是 `api.msn.com` 域，与我们走通的
 *   `assets.msn.cn` 白名单不是一回事（那条链路上 ocid/apikey 未必被认）。
 * ★ 接口不给 hasNextPage，判断「没有更多」靠调用侧：返回条数 < pageSize 即最后一页。
 */
export const selectMsnFinanceNews = (top = 30, skip = 0) =>
  assets.get<any>('/service/MSN/Feed/me', {
    params: {
      $top: top,
      $skip: skip,
      DisableTypeSerialization: 'true',
      activityId: '6aca200e-c864-4a59-aac4-92f0bdcbfed5',
      apikey: API_KEY,
      cm: 'zh-cn',
      contentType: 'article,video,slideshow',
      it: 'web',
      ocid: 'finance-verthp-feeds',
      query: 'finance_trending',
      queryType: 'myfeed',
      responseSchema: 'cardview',
      scn: 'ANON',
      wrapodata: 'false',
    },
  });

/**
 * 通用首页新闻流（首页**下方新闻列表**用；头条轮播走的是上面的 selectMsnFinanceNews）
 *
 * 与 selectMsnFinanceNews 同域、同 apikey、同白名单 ocid，仅 `query` 换成 `'news'`
 * —— 返回的是 MSN **通用首页资讯**（齐鲁晚报 / 红星新闻 / 财富FORTUNE 等综合新闻，带图），
 * 而不是 `finance_trending` 的财经垂直流，更贴近 msn.cn/zh-cn 首页那张「大图 + 来源 + 标题」的卡片。
 *
 * 实测：该 key 只白名单了 `finance-verthp-feeds` 这个 ocid，`ocid=hpmsn` / `hpmsncns`
 * 会 401（"App authentication info not found in the security db"），所以这里沿用白名单 ocid、
 * 只换 query 拿到通用新闻，而不是用首页壳 URL 里的 `hpmsn`。
 *
 * ★ 注意：msn.cn/zh-cn 首页 SSR 注入的 `window.ssrWpoData` 其实是 **WPO（Web Page Optimization）
 *   实验/页面优化数据**（含 serviceContext / dddTmpl / prg-wpo-* flight 开关，读取后立刻 delete），
 *   里面没有任何标题/图片/来源字段，根本不是卡片内容；卡片来自上面的 Feed 服务。
 * ★ 返回体同 OData 风格：`{ nextPageUrl, subCards: [...], feed }`，列表在 `subCards`。
 */
export const selectMsnHomeNews = (top = 30) =>
  assets.get<any>('/service/MSN/Feed/me', {
    params: {
      $top: top,
      DisableTypeSerialization: 'true',
      activityId: '6aca200e-c864-4a59-aac4-92f0bdcbfed5',
      apikey: API_KEY,
      cm: 'zh-cn',
      contentType: 'article,video,slideshow',
      it: 'web',
      ocid: 'finance-verthp-feeds',
      query: 'news',
      queryType: 'myfeed',
      responseSchema: 'cardview',
      scn: 'ANON',
      wrapodata: 'false',
    },
  });
