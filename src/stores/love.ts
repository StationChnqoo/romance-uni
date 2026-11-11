/**
 * 情侣空间 store —— 全部数据本地持久化，不依赖任何后端。
 *
 * 口径与项目其它 store 一致：Vue3 setup 写法（ref + computed 直接返回）、
 * 整包 persist（storage: uniStorage），不在页面里自己调 setStorage。
 * 跨端提醒：diary.images / checklist.image / 头像存的是本地图片路径（App 端 uni.saveFile
 * 后的永久路径），换设备不会同步，这是「纯本地」方案的既定边界。
 *
 * 交互口径参考小恩爱 / 恋爱记 / Amorno：
 * - 纪念日：可编辑 / 置顶 / 提前提醒 / 正数日，自动里程碑与双方生日只读
 * - 打卡：两个人各自点过才算当天完成（365 天双人签到），不是随手 toggle
 * - 每日一问：双方先各自私下写，都写完才一起揭晓（Connection Cards）
 */
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { cloneDeep } from '@/utils'
import { uniStorage } from '@/storage/uniStorage'
import {
  CHECKIN_BADGES,
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
  LoveCheckinDay,
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
    /** 首次引导：用户主动保存过资料后不再提示 */
    const profileDone = ref(false)
    /** 恋爱宣言，首页 Hero 下方展示 */
    const vow = ref('')
    /** 双方生日：自动生成生日倒数，不必再手动加一条纪念日 */
    const myBirthday = ref('')
    const partnerBirthday = ref('')
    /** 头像本地路径，空串时页面退回文字首字 */
    const myAvatar = ref('')
    const partnerAvatar = ref('')

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

    /** 双方都点过才算完成的日期；checkinRoles 里存两个人分别点过没有 */
    const checkins = ref<string[]>([])
    const checkinRoles = ref<Record<string, LoveCheckinDay>>({})
    /** key = 日期，同一天双方各一句 */
    const answers = ref<Record<string, LoveAnswer>>({})

    /* ---------------- 派生 ---------------- */

    /** 在一起第 N 天（含首日） */
    const daysTogetherCount = computed(() => daysTogether(startDate.value))

    /** 系统生成的生日倒数：跟着昵称与生日变，不落库、不可删 */
    const upcoming = computed(() => {
      const list = [...anniversaries.value]
      if (myBirthday.value) {
        list.push({
          id: 'system-birthday-mine',
          title: `${myName.value} 的生日`,
          date: myBirthday.value,
          repeat: 'yearly',
          icon: 'gift',
          remind: 7,
          system: true
        })
      }
      if (partnerBirthday.value) {
        list.push({
          id: 'system-birthday-partner',
          title: `${partnerName.value} 的生日`,
          date: partnerBirthday.value,
          repeat: 'yearly',
          icon: 'cake',
          remind: 7,
          system: true
        })
      }
      return buildUpcoming(list, startDate.value)
    })
    /** 已经过去的「仅一次」日子：竞品的正数日模式 */
    const pastAnniversaries = computed(() =>
      anniversaries.value
        .filter(a => !a.system && a.repeat === 'once' && dayjs(a.date).isBefore(dayjs().startOf('day')))
        .map(a => ({ ...a, daysPassed: Math.max(0, dayjs().startOf('day').diff(dayjs(a.date).startOf('day'), 'day')) }))
        .sort((a, b) => b.date.localeCompare(a.date))
    )

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

    /** 今天两个人分别点过没有 */
    const todayRoles = computed(() => checkinRoles.value[todayStr()] || { mine: false, partner: false })
    const mineCheckedToday = computed(() => !!todayRoles.value.mine)
    const partnerCheckedToday = computed(() => !!todayRoles.value.partner)
    /** 双方都完成才算今天打卡成功 */
    const todayCheckinComplete = computed(
      () => mineCheckedToday.value && partnerCheckedToday.value
    )
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
    const unlockedBadges = computed(() =>
      CHECKIN_BADGES.filter(b => checkinStreak.value >= b.days)
    )

    /** 当年第几天取模，保证同一天固定一道题 */
    const todayQuestion = computed(() => {
      const dayOfYear = dayjs().startOf('day').diff(dayjs().startOf('year'), 'day')
      return DAILY_QUESTIONS[dayOfYear % DAILY_QUESTIONS.length]
    })
    const todayAnswer = computed(() => answers.value[todayStr()])
    /** 双方都写完才揭晓，否则各自只能看到自己的「已封存」 */
    const answerRevealed = computed(
      () => !!(todayAnswer.value?.mine && todayAnswer.value?.partner)
    )
    /** 连续一起答完题的天数 */
    const answerStreak = computed(() => {
      const done = new Set(
        Object.values(answers.value)
          .filter(a => a.mine && a.partner)
          .map(a => a.date)
      )
      let cursor = dayjs().startOf('day')
      if (!done.has(cursor.format('YYYY-MM-DD'))) cursor = cursor.subtract(1, 'day')
      let n = 0
      while (done.has(cursor.format('YYYY-MM-DD'))) {
        n++
        cursor = cursor.subtract(1, 'day')
      }
      return n
    })
    /** 关系成长数据：竞品的「数据统计 / 爱情指数」轻量版 */
    const spaceStats = computed(() => ({
      diaries: diaries.value.length,
      checklist: checklistDoneCount.value,
      checkins: totalCheckins.value,
      answers: Object.values(answers.value).filter(a => a.mine && a.partner).length
    }))

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
      vow?: string
      myBirthday?: string
      partnerBirthday?: string
      myAvatar?: string
      partnerAvatar?: string
    }) => {
      if (patch.startDate !== undefined) startDate.value = patch.startDate
      if (patch.myName !== undefined) myName.value = patch.myName.trim() || '我'
      if (patch.partnerName !== undefined) partnerName.value = patch.partnerName.trim() || '亲爱的'
      if (patch.vow !== undefined) vow.value = patch.vow.trim()
      if (patch.myBirthday !== undefined) myBirthday.value = patch.myBirthday
      if (patch.partnerBirthday !== undefined) partnerBirthday.value = patch.partnerBirthday
      if (patch.myAvatar !== undefined) myAvatar.value = patch.myAvatar
      if (patch.partnerAvatar !== undefined) partnerAvatar.value = patch.partnerAvatar
      profileDone.value = true
    }

    const addAnniversary = (input: Omit<LoveAnniversary, 'id'>) => {
      anniversaries.value.push({
        ...input,
        id: createId(),
        createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    }
    const updateAnniversary = (id: string, patch: Partial<LoveAnniversary>) => {
      const item = anniversaries.value.find(a => a.id === id)
      if (!item || item.system) return
      Object.assign(item, patch)
    }
    const removeAnniversary = (id: string) => {
      anniversaries.value = anniversaries.value.filter(a => a.id !== id || a.system)
    }
    const toggleAnniversaryPin = (id: string) => {
      const item = anniversaries.value.find(a => a.id === id)
      if (!item || item.system) return
      item.pinned = !item.pinned
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

    /**
     * 双人打卡：各自点一次，两人都点过才写入 checkins（连续天数按「都完成」的天算）。
     * 同一天重复点幂等；已完成的日子不允许反悔，避免随手切换状态。
     */
    const checkInAs = (role: 'mine' | 'partner') => {
      const key = todayStr()
      const current = checkinRoles.value[key] || { mine: false, partner: false }
      if (current.mine && current.partner) return
      const next = { ...current, [role]: true }
      checkinRoles.value = { ...checkinRoles.value, [key]: next }
      if (next.mine && next.partner && !checkins.value.includes(key)) {
        checkins.value.push(key)
      }
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

    /** 设置页的「清空全部记录」：保留资料，只清内容，二次确认后调用 */
    const clearAll = () => {
      anniversaries.value = []
      checklist.value = cloneDeep(DEFAULT_CHECKLIST)
      diaries.value = []
      checkins.value = []
      checkinRoles.value = {}
      answers.value = {}
      sampleSeeded.value = true
    }

    return {
      startDate,
      myName,
      partnerName,
      profileDone,
      vow,
      myBirthday,
      partnerBirthday,
      myAvatar,
      partnerAvatar,
      anniversaries,
      checklist,
      diaries,
      sampleSeeded,
      checkins,
      checkinRoles,
      answers,
      daysTogetherCount,
      upcoming,
      pastAnniversaries,
      checklistDoneCount,
      checklistProgress,
      completedChecklist,
      mineCheckedToday,
      partnerCheckedToday,
      todayCheckinComplete,
      totalCheckins,
      checkinStreak,
      unlockedBadges,
      todayQuestion,
      todayAnswer,
      answerRevealed,
      answerStreak,
      spaceStats,
      sortedDiaries,
      setProfile,
      addAnniversary,
      updateAnniversary,
      removeAnniversary,
      toggleAnniversaryPin,
      completeChecklistItem,
      undoChecklistItem,
      addChecklistItem,
      removeChecklistItem,
      saveDiary,
      removeDiary,
      checkInAs,
      saveAnswer,
      clearAll
    }
  },
  {
    persist: {
      storage: uniStorage,
      /**
       * v1 插件整包 hydrate：旧 storage 里的 diaries: [] 会把首装示例盖成空，
       * 所以恢复后补一次。sampleSeeded 为 true 说明用户已经写过 / 删过日记，
       * 保持现状，避免「删光了又自己长回来」。
       * 同时把旧版「单方打卡」的日期补成双方完成，连续天数不会突然清零。
       */
      afterRestore: ({ store }) => {
        const s = store as unknown as {
          diaries: LoveDiary[]
          sampleSeeded: boolean
          checkins: string[]
          checkinRoles: Record<string, LoveCheckinDay>
        }
        if (!s.sampleSeeded && !s.diaries?.length) {
          s.diaries = cloneDeep(DEFAULT_DIARIES)
        }
        s.sampleSeeded = true
        const roles = { ...(s.checkinRoles || {}) }
        ;(s.checkins || []).forEach(date => {
          if (!roles[date]) roles[date] = { mine: true, partner: true }
        })
        s.checkinRoles = roles
      }
    }
  }
)
