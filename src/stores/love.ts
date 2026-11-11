/**
 * 情侣空间 store —— 全部数据本地持久化，不依赖任何后端。
 *
 * 口径与项目其它 store 一致：Vue3 setup 写法（ref + computed 直接返回）、
 * 整包 persist（storage: uniStorage），不在页面里自己调 setStorage。
 * 跨端提醒：diary.images / checklist.image 存的是本地图片路径（App 端 uni.saveFile
 * 后的永久路径），换设备不会同步，这是「纯本地」方案的既定边界。
 */
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { cloneDeep } from '@/utils'
import { uniStorage } from '@/storage/uniStorage'
import {
  DAILY_QUESTIONS,
  DEFAULT_CHECKLIST,
  DEFAULT_DIARIES,
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

    /** 首装带 3 篇示例日记，用户可以直接编辑或删掉 */
    const diaries = ref<LoveDiary[]>(cloneDeep(DEFAULT_DIARIES))
    /**
     * 一次性迁移标记：区分「旧版本 persist 里存的空数组」和「用户自己把日记删光了」。
     * persist 是整包 hydrate，旧数据里的 diaries: [] 会盖掉上面的首装示例 ——
     * 恢复后要补一次；但用户主动清空后绝不能再把示例塞回来。
     */
    const sampleSeeded = ref(false)

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
    /** 已解锁的小事按日期倒序，等于竞品「甜蜜空间」的回忆时间轴 */
    const completedChecklist = computed(() =>
      checklist.value
        .filter(i => i.done)
        .sort((a, b) => b.doneAt.localeCompare(a.doneAt))
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

    /**
     * 示例日记在任何时机都可见：正常由 afterRestore 补齐，
     * 这里再兜住「store 已经建好、diaries 仍是空且用户从没动过日记」的情况
     * （HMR / 旧包热更新时不会出现一进页面就是空时光轴）。
     * 用户写过或删过之后 sampleSeeded 为 true，空就是真空，交给空态引导。
     */
    const diarySource = computed(() =>
      diaries.value.length || sampleSeeded.value ? diaries.value : DEFAULT_DIARIES
    )
    /** 时光轴：日期新的在前，同一天按创建时间倒序 */
    const sortedDiaries = computed(() =>
      [...diarySource.value].sort(
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

    /**
     * 解锁一件小事：参考恋爱记的「拍照打卡」——必须留下合照或一句心情，
     * 由详情弹层确认后才调用，列表本身点一下不会改变状态。
     */
    const completeChecklistItem = (id: string, note: string, image: string) => {
      const item = checklist.value.find(i => i.id === id)
      if (!item || item.done) return
      item.done = true
      item.doneAt = todayStr()
      item.note = note.trim()
      item.image = image
    }
    /** 撤销打卡：连留念一起清掉，回到「还没一起做」 */
    const undoChecklistItem = (id: string) => {
      const item = checklist.value.find(i => i.id === id)
      if (!item || !item.done) return
      item.done = false
      item.doneAt = ''
      item.note = ''
      item.image = ''
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
        note: '',
        image: '',
        custom: true
      })
    }
    /** 预置的 100 件不允许删，只对自己加的生效 */
    const removeChecklistItem = (id: string) => {
      checklist.value = checklist.value.filter(i => i.id !== id || !i.custom)
    }

    /** id 为空 = 新增；否则按 id 覆盖，编辑后列表即时更新 */
    const saveDiary = (diary: LoveDiary) => {
      sampleSeeded.value = true
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
      sampleSeeded.value = true
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
      sampleSeeded,
      checkins,
      answers,
      daysTogetherCount,
      upcoming,
      checklistDoneCount,
      checklistProgress,
      completedChecklist,
      checkedInToday,
      totalCheckins,
      checkinStreak,
      todayQuestion,
      todayAnswer,
      sortedDiaries,
      setProfile,
      addAnniversary,
      removeAnniversary,
      completeChecklistItem,
      undoChecklistItem,
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
      storage: uniStorage,
      /**
       * v1 插件整包 hydrate：旧 storage 里的 diaries: [] 会把首装示例盖成空，
       * 所以恢复后补一次。sampleSeeded 为 true 说明用户已经写过 / 删过日记，
       * 保持现状，避免「删光了又自己长回来」。
       */
      afterRestore: ({ store }) => {
        const s = store as unknown as {
          diaries: LoveDiary[]
          sampleSeeded: boolean
        }
        if (!s.sampleSeeded && !s.diaries?.length) {
          s.diaries = cloneDeep(DEFAULT_DIARIES)
        }
        s.sampleSeeded = true
      }
    }
  }
)
