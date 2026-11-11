/** MSN 指数配置（原 RN 项目定义在 stores 中，这里抽出避免 constants -> store 的反向依赖）
 *  id 统一走 etfMsnId（2026-10-29 删掉 indexMsnId / futureMsnId 与「场内ETF / 标准指数」切换，全用场内ETF 口径）。 */
export type MsnConfigItem = {
  title: string;
  etfMsnId: string;
  weight: number;
  enabled: boolean;
  note: string;
};
