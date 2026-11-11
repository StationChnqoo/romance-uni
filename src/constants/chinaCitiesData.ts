/**
 * 中国省/市二级数据的「纯数据 + 类型」层（零 import，专门用来打断循环依赖）
 *
 * 在线加载的地址与 ProvinceCity / CityItem 类型放这里，供 `stores/chinaCities.ts`（store）
 * 与 `constants/chinaCities.ts`（查询函数）共同引用，避免后两者互相 import 形成循环依赖。
 *
 * 结构等同 ProvinceCity[]：[{ code, name, cities: [{ code, name }] }]，
 * 34 省 / 358 市，省与市均为 6 位行政码。
 */
export type CityItem = {
  code: string
  name: string
}

export type ProvinceCity = {
  code: string
  name: string
  cities: CityItem[]
}

export const CITIES_URL =
  'https://cdn.xiaopacai.cn/apps/cn.xiaopacai.cloud.uni/chinaCities.json'
