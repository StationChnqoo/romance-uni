/**
 * 中国省/市二级数据（籍贯 / 城市选择）的全局 store
 *
 * 数据**在线加载**：从 CDN 拉取 `chinaCities.json`（结构等同 ProvinceCity[]：
 * [{ code, name, cities: [{ code, name }] }]，34 省 / 358 市，省与市均为 6 位行政码）。
 *
 * 加载时机统一收口在「首页 onShow」：首页触发一次 `load()`，写完 `cities` 即整包
 * persist（uniStorage）落地；后续启动直接从 storage 恢复，`load()` 检测到已非空就跳过网络。
 *
 * 消费方（pkg-dating/edit、detail、DatingItem）只通过 `getCityFullName()` 从本 store 读，
 * 不再各自发请求（见 constants/chinaCities.ts）。
 *
 * Vue3 setup 写法 + 整包 persist（uniStorage）。
 */
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { uniStorage } from '@/storage/uniStorage'
import { CITIES_URL, type ProvinceCity } from '@/constants/chinaCitiesData'

export const useChinaCitiesStore = defineStore(
  'useChinaCitiesStore',
  () => {
    /** 省/市数据，空数组表示尚未加载（也未持久化） */
    const cities = ref<ProvinceCity[]>([])

    /** 去重 Promise：并发多次调用只发一次请求 */
    let loadPromise: Promise<void> | null = null

    /** 拉取省/市数据：已加载（含 persist 恢复）则跳过；失败静默返回。 */
    const load = () => {
      if (cities.value.length) return
      if (loadPromise) return loadPromise
      loadPromise = new Promise<void>((resolve) => {
        uni.request({
          url: CITIES_URL,
          success: (res) => {
            const data = res.data as ProvinceCity[]
            if (Array.isArray(data) && data.length) {
              cities.value = data
            }
            resolve()
          },
          fail: () => resolve()
        })
      })
      return loadPromise
    }

    return { cities, load }
  },
  {
    persist: {
      storage: uniStorage
    }
  }
)
