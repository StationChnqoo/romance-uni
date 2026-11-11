/**
 * 媒体与上传设置 store
 * 由 stores/caches.ts（Options 写法）拆分重构而来，对应 RN zustand 的
 * category / selectedActor / enableCompressUpload。
 *
 * Vue3 setup 写法：ref，直接返回；更新一律直接赋值
 * （mediaStore.selectedActor = actor），不再提供 setXxx action。
 * 持久化：整包 persist（不配 paths），storage 用 uniStorage。
 */
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { createActor, createCategory } from '@/types/media'
import type { Actor, Category } from '@/types/media'
import { uniStorage } from '@/storage/uniStorage'

export const useMediaStore = defineStore(
  'useMediaStore',
  () => {
    const category = ref(createCategory() as Category)
    const selectedActor = ref(createActor() as Actor)
    const enableCompressUpload = ref(true)

    return { category, selectedActor, enableCompressUpload }
  },
  {
    persist: {
      storage: uniStorage
    }
  }
)
