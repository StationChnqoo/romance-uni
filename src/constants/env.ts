/**
 * 环境变量统一入口（禁止业务代码再直接 import.meta.env.xxx）
 *
 * 为什么要套这一层：
 * uni-app 的 VITE_ 变量是「构建期内联」的，切环境必须重新生成资源、重装；
 * 而 HBuilderX 点「运行 / 发行」只能固定走 development / production 模式，传不了 --mode。
 * 所以这里把「环境名」抽成唯一开关 VITE_APP_ENV，由它决定整套配置：
 *
 *   唯一从外部读入的变量：VITE_APP_ENV（当前环境名）
 *     1) shell：export VITE_APP_ENV=uat && npm run dev:app
 *        —— Vite 的 loadEnv 会优先采用 process.env 里带 VITE_ 前缀的变量
 *        （vite/dist 注释："these are typically provided inline and should be prioritized"）
 *     2) .env.development.local / .env.production.local
 *        —— 点 HBuilderX 时想换环境就改这里（该文件优先级高于同名 .env）
 *     3) .env.development / .env.production / .env.sit 里的 VITE_APP_ENV
 *        —— 这三个文件各只导出这一个变量，别的都不写
 *     4) 兜底 'sit'
 *
 * 其余配置一律取下方 PRESETS[APP_ENV]，不再读 import.meta.env —— 改地址就改 PRESETS，
 * 一处为准，避免 URL 散落在多个 .env 里漂移。
 *
 * ⚠️ 已知副作用：PRESETS[APP_ENV] 是动态索引，Vite 无法 tree-shake，
 *    三套环境的地址都会被打进每一个包（含内网 IP）。当前风险可接受，
 *    若日后 prod 换成真实域名、dev/sit 为内网地址，再考虑改用 vite define 按 mode 注入。
 */

/** 可选环境名 */
export type EnvName = 'dev' | 'sit' | 'uat';

/** 单环境配置：原先散落在各 .env 里的变量，全部收在这里（唯一来源） */
type EnvPreset = {
  API_BASE_URL: string;
  CODEPUSH_BASE_URL: string;
  CODEPUSH_APP_KEY: string;
};

/** 各环境配置（改地址改这里即可） */
const PRESETS: Record<EnvName, EnvPreset> = {
  dev: {
    API_BASE_URL: 'http://110.42.253.75:40090',
    CODEPUSH_BASE_URL: 'http://110.42.253.75:40080',
    CODEPUSH_APP_KEY: 'Cloud',
  },
  sit: {
    API_BASE_URL: 'http://110.42.253.75:40091',
    CODEPUSH_BASE_URL: 'http:/110.42.253.75:40081',
    CODEPUSH_APP_KEY: 'Cloud',
  },
  uat: {
    API_BASE_URL: 'http://110.42.253.75:40092',
    CODEPUSH_BASE_URL: 'http://110.42.253.75:40082',
    CODEPUSH_APP_KEY: 'Cloud',
  },
};

/** 归一化环境名，无法识别返回空串（由调用方兜底） */
function normalizeEnvName(value: unknown): EnvName | '' {
  const name = String(value ?? '')
    .trim()
    .toLowerCase();
  if (name === 'dev' || name === 'development') return 'dev';
  if (name === 'sit') return 'sit';
  // prod 与 uat 目前是同一套地址，统一归到 uat（EnvName 里不单列 prod）
  if (name === 'prod' || name === 'production' || name === 'release')
    return 'uat';
  return '';
}

/**
 * 当前环境名。
 * 对应你想要的「export 环境变量 || sit」：
 * export VITE_APP_ENV=sit > .env*.local > .env.[mode] > 'sit'
 */
// export const APP_ENV: EnvName =
//   normalizeEnvName(import.meta.env.VITE_APP_ENV) || 'sit';
export const APP_ENV: EnvName = 'uat';

export type EnvKey = keyof EnvPreset | 'APP_ENV';

/**
 * 当前环境的完整配置（模块级常量，直接读属性即可：ENV.API_BASE_URL）。
 * 不用 class 包装：环境配置本质是常量，每次 new 出实例没有意义。
 */
export const ENV: Record<EnvKey, string> = {
  ...PRESETS[APP_ENV],
  APP_ENV,
};
