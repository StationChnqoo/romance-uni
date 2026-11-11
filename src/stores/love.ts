/**
 * 情侣空间 store —— 全部数据本地持久化，不依赖任何后端。
 *
 * 口径与项目其它 store 一致：Vue3 setup 写法（ref + computed 直接返回）、
 * 整包 persist（storage: uniStorage），不在页面里自己调 setStorage。
 * 跨端提醒：diary.images 存的是本地图片路径（App 端 uni.saveFile 后的永久路径），
 * 换设备不会同步，这是「纯本地」方案的既定边界。
 */
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { cloneDeep } from '@/utils'
import { uniStorage } from '@/storage/uniStorage'
import {
  DAILY_QUESTIONS,
  DEFAULT_CHECKLIST,
  buildUpcoming,
  createId,
  daysTogether,
  todayStr
} from '@/constants/love'
import type {
  LoveAnniversary,
  LoveAnswer,
  LoveChecklistItem,
  LoveDiary
} from '@/types/love'

export const useLoveStore = defineStore(
  'useLoveStore',
  () => {
    /** 在一起的那天 YYYY-MM-DD；默认今天，设置页里改 */
    const startDate = ref(dayjs().format('YYYY-MM-DD'))
    const myName = ref('我')
    const partnerName = ref('亲爱的')

    const anniversaries = ref<LoveAnniversary[]>([])
    const checklist = ref<LoveChecklistItem[]>(cloneDeep(DEFAULT_CHECKLIST))
    const diaries = ref<LoveDiary[]>([])
    /** 已打卡的日期 YYYY-MM-DD[]，天然去重靠 includes 判断 */
    const checkins = ref<string[]>([])
    /** key = 日期，同一天双方各一句 */
    const answers = ref<Record<string, LoveAnswer>>({})

    /* ---------------- 派生 ---------------- */

    /** 在一起第 N 天（含首日） */
    const daysTogetherCount = computed(() => daysTogether(startDate.value))

    /** 所有倒数日子：自定义纪念日 + 自动天数里程碑 + 周年，按临近程度排好 */
    const upcoming = computed(() => buildUpcoming(anniversaries.value, startDate.value))

    const checklistDoneCount = computed(() => checklist.value.filter(i => i.done).length)
    const checklistProgress = computed(() =>
      checklist.value.length
        ? Math.round((checklistDoneCount.value / checklist.value.length) * 100)
        : 0
    )

    const checkedInToday = computed(() => checkins.value.includes(todayStr()))
    const totalCheckins = computed(() => checkins.value.length)
    /** 连续打卡：今天没打就从昨天往前数，断了就归零 */
    const checkinStreak = computed(() => {
      const set = new Set(checkins.value)
      let cursor = dayjs().startOf('day')
      if (!set.has(cursor.format('YYYY-MM-DD'))) cursor = cursor.subtract(1, 'day')
      let n = 0
      while (set.has(cursor.format('YYYY-MM-DD'))) {
        n++
        cursor = cursor.subtract(1, 'day')
      }
      return n
    })

    /** 当年第几天取模，保证同一天固定一道题 */
    const todayQuestion = computed(() => {
      const dayOfYear = dayjs().startOf('day').diff(dayjs().startOf('year'), 'day')
      return DAILY_QUESTIONS[dayOfYear % DAILY_QUESTIONS.length]
    })
    const todayAnswer = computed(() => answers.value[todayStr()])

    /** 时光轴：日期新的在前，同一天按创建时间倒序 */
    const sortedDiaries = computed(() =>
      [...diaries.value].sort(
        (a, b) => b.date.localeCompare(a.date) || b.createAt.localeCompare(a.createAt)
      )
    )

    /* ---------------- 动作 ---------------- */

    const setProfile = (patch: {
      startDate?: string
      myName?: string
      partnerName?: string
    }) => {
      if (patch.startDate !== undefined) startDate.value = patch.startDate
      if (patch.myName !== undefined) myName.value = patch.myName.trim() || '我'
      if (patch.partnerName !== undefined) partnerName.value = patch.partnerName.trim() || '亲爱的'
    }

    const addAnniversary = (input: Omit<LoveAnniversary, 'id'>) => {
      anniversaries.value.push({ ...input, id: createId() })
    }
    const removeAnniversary = (id: string) => {
      anniversaries.value = anniversaries.value.filter(a => a.id !== id)
    }

    const toggleChecklistItem = (id: string) => {
      const item = checklist.value.find(i => i.id === id)
      if (!item) return
      item.done = !item.done
      item.doneAt = item.done ? todayStr() : ''
    }
    const addChecklistItem = (title: string) => {
      const text = title.trim()
      if (!text) return
      checklist.value.unshift({
        id: createId(),
        title: text,
        category: '我们加的',
        done: false,
        doneAt: '',
        custom: true
      })
    }
    const removeChecklistItem = (id: string) => {
      checklist.value = checklist.value.filter(i => i.id !== id || !i.custom)
    }

    /** id 为空 = 新增；否则按 id 覆盖，编辑后列表即时更新 */
    const saveDiary = (diary: LoveDiary) => {
      const next: LoveDiary = {
        ...diary,
        id: diary.id || createId(),
        createAt: diary.createAt || dayjs().format('YYYY-MM-DD HH:mm:ss')
      }
      const idx = diaries.value.findIndex(d => d.id === next.id)
      if (idx >= 0) diaries.value[idx] = next
      else diaries.value.push(next)
    }
    const removeDiary = (id: string) => {
      diaries.value = diaries.value.filter(d => d.id !== id)
    }

    /** 打卡幂等：同一天重复点不会加天数 */
    const checkIn = () => {
      const today = todayStr()
      if (checkins.value.includes(today)) return
      checkins.value.push(today)
    }

    const saveAnswer = (role: 'mine' | 'partner', text: string) => {
      const key = todayStr()
      const current = answers.value[key] || {
        question: todayQuestion.value,
        mine: '',
        partner: '',
        date: key
      }
      answers.value = {
        ...answers.value,
        [key]: { ...current, [role]: text.trim() }
      }
    }

    return {
      startDate,
      myName,
      partnerName,
      anniversaries,
      checklist,
      diaries,
      checkins,
      answers,
      daysTogetherCount,
      upcoming,
      checklistDoneCount,
      checklistProgress,
      checkedInToday,
      totalCheckins,
      checkinStreak,
      todayQuestion,
      todayAnswer,
      sortedDiaries,
      setProfile,
      addAnniversary,
      removeAnniversary,
      toggleChecklistItem,
      addChecklistItem,
      removeChecklistItem,
      saveDiary,
      removeDiary,
      checkIn,
      saveAnswer
    }
  },
  {
    persist: {
      storage: uniStorage
    }
  }
)
