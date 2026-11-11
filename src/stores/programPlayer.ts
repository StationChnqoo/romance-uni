/**
 * 节目收藏 - 当前播放（正在观看）的集
 *
 * 用于「列表页」与「详情页」共享高亮状态：无论在哪一处点了播放，
 * 那一条集都会被标记，两处同步高亮（见 MEMORY.md「节目收藏」）。
 *
 * Vue3 setup 写法 + 整包 persist（uniStorage）：重启 App 也保留「上次看到哪一集」。
 * 页面里不许手写 uni.setStorageSync（项目口径），走 store + persist 即可。
 */
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { uniStorage } from '@/storage/uniStorage'

export const useProgramPlayerStore = defineStore(
  'useProgramPlayerStore',
  () => {
    /** 当前播放的系列 id */
    const currentSeriesId = ref('')
    /** 当前播放的集 id（高亮主键） */
    const currentEpisodeId = ref('')

    /** 标记某集为「当前播放」 */
    const setCurrent = (seriesId: string, episodeId: string) => {
      currentSeriesId.value = seriesId
      currentEpisodeId.value = episodeId
    }

    /** 清掉高亮（如删除该集后） */
    const clear = () => {
      currentSeriesId.value = ''
      currentEpisodeId.value = ''
    }

    return { currentSeriesId, currentEpisodeId, setCurrent, clear }
  },
  {
    persist: {
      storage: uniStorage
    }
  }
)
