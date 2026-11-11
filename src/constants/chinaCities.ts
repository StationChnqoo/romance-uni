/**
 * 中国省/市二级数据（籍贯 / 城市选择）
 *
 * 数据改为**在线加载**：原先写死的 CHINA_CITIES 大表已删除，运行时从 CDN 拉取
 * `chinaCities.json`（结构等同 ProvinceCity[]：[{ code, name, cities: [{ code, name }] }]，
 * 34 省 / 358 市，省与市均为 6 位行政码）。
 *
 * 加载与持久化统一收口在 `stores/chinaCities.ts`（首页 onShow 触发 load，整包 persist）。
 * 本文件只保留「数据地址 + 类型 + 纯查询函数」，查询函数从 store 读取，
 * 消费方（pkg-dating/edit、detail、DatingItem）只调用 `getCityFullName`，不自管加载。
 *
 * 迁移自 cloud-react-native/src/constants/chinaCities.ts，纯数据 + 纯函数，无 RN 依赖。
 */
import { useChinaCitiesStore } from '@/stores/chinaCities'

export type { CityItem, ProvinceCity } from '@/constants/chinaCitiesData'
export { CITIES_URL } from '@/constants/chinaCitiesData'

/** 根据城市编码查省/市全称，例如 '330100' -> '浙江省 杭州市'。
 *  从 chinaCities store 读取（store 加载/持久化后自动联动刷新）。 */
export function getCityFullName(code: string): string {
  if (!code) return ''
  const list = useChinaCitiesStore().cities
  if (!list.length) return ''
  const province = list.find((p) => p.code.startsWith(code.slice(0, 2)))
  if (!province) return ''
  const city = province.cities.find((c) => c.code === code)
  if (city) return `${province.name} ${city.name}`
  return province.name
}
