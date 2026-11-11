/**
 * 行情与持仓 store
 * 由 stores/caches.ts（Options 写法）拆分重构而来，对应 RN zustand 的
 * cared / global / msnConfig。
 *
 * Vue3 setup 写法：ref + computed，直接返回；更新一律直接赋值
 * （marketStore.global = [...]），不再提供 setXxx action。
 * 持久化：整包 persist（不配 paths），storage 用 uniStorage。
 */
import {ref} from 'vue';
import {defineStore} from 'pinia';
import type {MsnConfigItem} from '@/types/msn';
import {GlobalIndexes, isGlobalIndex} from '@/constants/config';
import {cloneDeep} from '@/utils';
import {uniStorage} from '@/storage/uniStorage';

export const DEFAULT_MSN_CONFIG: MsnConfigItem[] = [
  // SPY 513500
  {
    title: '标普500',
    etfMsnId: 'ad79lh',
    weight: 30,
    enabled: true,
    note: '指数：SPY，场内ETF：513500',
  },
  {
    title: '纳斯达克',
    etfMsnId: 'bgogcw',
    weight: 15,
    enabled: false,
    note: '指数：COMP，场内ETF：513100',
  },
  {
    title: '日经225',
    etfMsnId: 'bql98m',
    weight: 10,
    enabled: false,
    note: '指数：N225，场内ETF：513880，本来计划用513000，一看买的513880 ...',
  },
  {
    title: '沪深300',
    etfMsnId: 'ad73pr',
    weight: 5,
    enabled: false,
    note: '指数：000300，场内ETF：510300',
  },
  {
    title: '亚太精选',
    etfMsnId: 'c8gtu2',
    weight: 5,
    enabled: false,
    note: '指数：CSOP FTSE Asia Pacific Select Index ETF USD (LCS)，场内ETF：159687',
  },
  {
    title: '中证红利',
    etfMsnId: 'bt9g1h',
    weight: 0,
    enabled: false,
    note: '指数：000922，场内ETF：515180',
  },
  {
    title: '有色金属',
    etfMsnId: 'btasrw',
    weight: 2.5,
    enabled: true,
    note: '159980 大成有色金属期货交易型开放式指数证券投资基金',
  },
  {
    title: '能源化工',
    etfMsnId: 'btgyxm',
    weight: 2.5,
    enabled: true,
    note: '159981 建信易盛郑商所能源化工期货交易型开放式指数证券投资基金',
  },
  {
    title: '饲料豆粕',
    etfMsnId: 'bswv27',
    weight: 2.5,
    enabled: true,
    note: '159985 华夏饲料豆粕期货交易型开放式证券投资基金',
  },
  {
    title: '纽约黄金',
    etfMsnId: 'addnr7',
    weight: 7.5,
    enabled: true,
    note: '现货：GOLD，场内ETF：159937，正常是518880，不知为啥买的159937',
  },
  // {
  //   title: '大宗商品',
  //   etfMsnId: 'admg4c',
  //   weight: 7.5,
  //   enabled: true,
  //   note: '指数：DBC，场内ETF：全球商品FOF 161815'
  // },
  {
    title: '短期债券',
    etfMsnId: 'cfpbr7', // 大成深证基准做市信用债
    weight: 15,
    enabled: false,
    note: '回退长期债券，用中债对标长债，用信用债159395，对标美股的余额宝SGOV',
  },
  {
    title: '中期债券',
    etfMsnId: 'c7o7nm',
    weight: 15,
    enabled: true,
    note: '场内ETF：511520',
  },
  {
    title: '长期债券',
    etfMsnId: 'c9zcnm',
    weight: 40,
    enabled: true,
    note: '指数：长期国债40%+中期国债15%，场内ETF：511090',
  },
];

const defaultCared = [{market: 100, code: 'VNINDEX', label: '越南胡志明指数'}];

/** 默认全选：取自选指数枚举的全部项（fi- 形式的 MSN id） */
const defaultGlobal = GlobalIndexes.map(it => it.value);

export const useMarketStore = defineStore(
  'useMarketStore',
  () => {
    /** 我的持仓关注（market.code 形式） */
    const cared = ref<string[]>(
      cloneDeep(defaultCared).map(it => `${it.market}.${it.code}`),
    );
    /** 外围股市看板选中的指数（fi- 形式的 MSN id） */
    const global = ref<string[]>(cloneDeep(defaultGlobal));
    /** 持仓配置（编辑权重 / 首页持仓卡片共用） */
    const msnConfig = ref<MsnConfigItem[]>(cloneDeep(DEFAULT_MSN_CONFIG));

    return {cared, global, msnConfig};
  },
  {
    persist: {
      storage: uniStorage,
      /**
       * global 里残留的旧值要清掉。
       *
       * 2026-10 之前存的是东方财富 secid（'1.000001' / '100.SPX' 等），换成 MSN 枚举后
       * 这些串查不到任何行情，看板会一直空着。这里在 persist 恢复之后过滤一遍：
       * - 非空的过滤结果照用（保留用户自己的勾选）；
       * - 过滤完为空（老用户整份都是旧 secid）才回落到默认全选；
       * - 用户主动全部取消时本来就是空数组，保持空，不强行塞回默认。
       */
      afterRestore: ({store}) => {
        const target = store as unknown as {
          global: string[];
          msnConfig: MsnConfigItem[];
        };
        /**
         * 旧版把大宗商品作为单条（权重 7.5%），现已拆成 有色金属 / 能源化工 / 饲料豆粕
         * 三只 ETF（各 2.5%，合计 7.5%）。老用户 persist 里仍留着旧的「大宗商品」单条，
         * 恢复时清掉它、并补齐三只 ETF（缺才补，已存在的不动）。幂等，可每次恢复时重跑。
         */
        if (Array.isArray(target.msnConfig)) {
          target.msnConfig = target.msnConfig.filter(
            it => it.title !== '大宗商品',
          );
          const ensure = (title: string, etfMsnId: string, weight: number) => {
            if (!target.msnConfig.some(it => it.title === title)) {
              target.msnConfig.push({
                title,
                etfMsnId,
                weight,
                enabled: true,
                note: '',
              });
            }
          };
          ensure('有色金属', 'btasrw', 2.5);
          ensure('能源化工', 'btgyxm', 2.5);
          ensure('饲料豆粕', 'bswv27', 2.5);
        }
        const list = target.global || [];
        if (!list.length) return;
        const kept = list.filter(isGlobalIndex);
        target.global = kept.length ? kept : [...defaultGlobal];
      },
    },
  },
);
