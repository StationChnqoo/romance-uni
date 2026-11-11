/**
 * 情侣空间：预置内容 + 纯函数工具。
 *
 * 100 件小事 / 每日一问题库都是静态内容，随包走、不请求接口；
 * 日期口径统一走 dayjs，业务页面不再各自算天数（避免「含不含当天」各写一套）。
 */
import dayjs from 'dayjs'
import type {
  LoveAnniversary,
  LoveChecklistItem,
  LoveDiary,
  LoveUpcoming
} from '@/types/love'

/** 清单的五个分类，每 20 条一类（顺序与 WISH_TEXTS 对齐） */
export const LOVE_CATEGORIES = ['日常陪伴', '一起出发', '仪式感', '共同成长', '小浪漫'] as const

/** 100 件值得一起做的小事：竞品「恋人清单 / 恋爱清单」同款，按分类各 20 条 */
export const WISH_TEXTS: string[] = [
  // 日常陪伴 1-20
  '一起吃一顿慢悠悠的早餐', '一起逛一次菜市场', '一起做一顿饭', '一起洗碗收拾厨房',
  '一起散步不带目的地', '一起看一次完整的日落', '一起在周末睡到自然醒', '一起追完一部剧',
  '一起敷面膜看综艺', '一起给家里大扫除', '一起养一盆绿植', '一起逛超市列购物清单',
  '一起打一把游戏', '一起拼一次拼图', '一起坐公交坐到终点站', '一起在雨天窝在家里',
  '一起点外卖并交换尝一口', '一起整理手机相册', '一起给对方吹一次头发', '一起什么都不做待一下午',
  // 一起出发 21-40
  '一起去看海', '一起爬一次山', '一起坐一次高铁去邻市', '一起住一次民宿',
  '一起露营看星星', '一起逛一次博物馆', '一起去游乐园', '一起看一场日出',
  '一起走一条没走过的小路', '一起坐一次摩天轮', '一起去动物园', '一起泡一次温泉',
  '一起在陌生城市迷一次路', '一起拍一组同款游客照', '一起赶一次早班飞机', '一起在地图上挑下次目的地',
  '一起坐轮渡', '一起逛一次夜市', '一起自驾走一段沿海公路', '一起把车票存进同一个盒子',
  // 仪式感 41-60
  '一起过一次纪念日', '一起写一张手写卡片', '一起拍一张正式合照', '一起给未来的自己写封信',
  '一起做一本相册', '一起选一对情侣杯', '一起布置一次节日房间', '一起互送一份不贵但用心的礼物',
  '一起许一个来年的愿望', '一起把合照设成手机壁纸', '一起吃一次烛光晚餐', '一起穿一次情侣装出门',
  '一起录一段给对方的话', '一起过一次生日零点', '一起做一张年度歌单', '一起把第一次的票根收好',
  '一起拍一组周年照', '一起给彼此的父母问好', '一起存一笔「未来基金」', '一起定一个只属于两人的暗号',
  // 共同成长 61-80
  '一起读完同一本书', '一起学一道新菜', '一起坚持运动一个月', '一起早起一周',
  '一起学几句外语', '一起报一门体验课', '一起做一次年度复盘', '一起列一份共同目标',
  '一起把坏习惯改掉一个', '一起参加一次志愿活动', '一起学一支简单的舞', '一起记一次家庭账',
  '一起听对方讲一次工作烦恼', '一起给对方一次认真鼓励', '一起讨论一次「以后住哪」', '一起学会一道甜品',
  '一起整理彼此的书架', '一起看一次纪录片并聊感受', '一起教会对方一项自己的技能', '一起为对方的一个决定鼓掌',
  // 小浪漫 81-100
  '一起在便签上写一句情话', '一起给对方起一个专属昵称', '一起在雨里共撑一把伞', '一起分享一副耳机听歌',
  '一起数一次星星', '一起给对方一个突然的拥抱', '一起写一张「今天最开心的事」', '一起把手机调成勿扰一晚上',
  '一起拍一张影子合照', '一起在窗口看一次夜景', '一起给对方留一次惊喜', '一起说一次认真的谢谢',
  '一起挑一张照片打印出来', '一起把对方随口说的愿望记下来', '一起做一次「只夸不损」的聊天', '一起在睡前说晚安',
  '一起把某首歌设为我们的歌', '一起复刻第一次约会', '一起认真说一次「我爱你」', '一起把清单里剩下的小事慢慢做完'
]

/** 预置清单：id 稳定，方便 persist 后的数据对得上 */
export const DEFAULT_CHECKLIST: LoveChecklistItem[] = WISH_TEXTS.map((title, i) => ({
  id: `wish-${i + 1}`,
  title,
  category: LOVE_CATEGORIES[Math.floor(i / 20)],
  done: false,
  doneAt: '',
  note: '',
  image: '',
  custom: false
}))

/** 每日一问：按当年第几天取模，保证同一天两人看到的是同一题 */
export const DAILY_QUESTIONS: string[] = [
  '今天最想对我说的一句话是什么？', '我们第一次见面时，你对我是什么印象？',
  '最近哪一件小事让你觉得被爱着？', '如果明天放假一天，最想和我做什么？',
  '你最喜欢我们在一起的哪个瞬间？', '有哪句话我一直没说，但你很想听？',
  '今天有没有一点点想我？是什么时候？', '你觉得我们最像的地方是什么？',
  '下一次旅行，你最想去哪里？', '我做过什么让你偷偷开心过？',
  '如果给我们的关系起个名字，叫什么？', '今天有什么小烦恼想交给我？',
  '你最想和我一起坚持的一件事是什么？', '我们下次约会，你来安排会去哪？',
  '你记得我最近随口提过的一个愿望吗？', '今天最想感谢我的是什么？',
  '你觉得十年后的我们在做什么？', '哪一首歌会让你想起我？',
  '最近最想和我一起吃的一顿饭是什么？', '有没有一件一直没告诉我的小事？',
  '你觉得我哪个小习惯最可爱？', '如果只能留一张我们的合照，选哪张？',
  '今天给自己打几分？为什么？', '你希望我最近多陪你做点什么？',
  '我们吵过的一次架，现在回头看会笑吗？', '你最喜欢我怎么称呼你？',
  '如果给今天配一个小图标，你会选哪个？', '最近有没有一个瞬间特别想抱抱我？',
  '你最想和我一起完成清单里的哪一件？', '我们最该改掉的一个小毛病是什么？',
  '你觉得「被好好记住」是什么感觉？', '今天有没有为我骄傲一下？',
  '下一次纪念日，你想要什么样的惊喜？', '你最舍不得删的一条聊天记录是哪句？',
  '如果明天要分开一周，最想先说什么？', '你觉得我什么时候最让你安心？',
  '有没有一句我说过的话，你一直记着？', '今天最想和我分享的一张照片是什么？',
  '你希望我们以后养一只什么小动物？', '用三个词形容我们的现在'
]

/** 日记心情：icon 为 love-icons.scss 的语义图标名（love-i-<icon>） */
export const MOODS = [
  { key: 'sweet', label: '甜蜜', icon: 'heart' },
  { key: 'happy', label: '开心', icon: 'sun' },
  { key: 'calm', label: '平淡', icon: 'leaf' },
  { key: 'miss', label: '想念', icon: 'moon' },
  { key: 'tired', label: '有点累', icon: 'cloud' },
  { key: 'quarrel', label: '闹别扭', icon: 'bubble' }
] as const

export const moodOf = (key: string) => MOODS.find(m => m.key === key) || MOODS[0]

/** 纪念日可选图标：语义名 -> love-i-* 类（Remix Icon 子集，见 styles/love-icons.scss） */
export const ANNIVERSARY_ICONS = ['heart', 'cake', 'flower', 'ring', 'sparkle', 'plane', 'movie', 'gift', 'star', 'bear']

/**
 * 主按钮统一样式（wd-button 的 custom-style）。
 * wot 的按钮默认直角，页面各自写一遍圆角会散，这里集中成胶囊 + 粉渐变（扁平、无投影）。
 * 注意：custom-style 是绑到组件根节点的内联样式，写不了 CSS 变量作用域外的类。
 */
export const LOVE_PRIMARY_BTN =
  'background-image: linear-gradient(100deg, #ff92b4, #ee5a92); background-color: #ee5a92; border-radius: 999rpx; border: none;'

/** 次按钮（删除 / 取消）：描边胶囊，不抢主按钮的视觉 */
export const LOVE_GHOST_BTN =
  'background-color: #fff; color: #e0518c; border: 2rpx solid #ffd0e0; border-radius: 999rpx;'

/** 自动生成的「在一起第 N 天」里程碑 */
export const MILESTONE_DAYS = [100, 200, 365, 520, 1000, 1314, 2000, 3650]

/* ---------------- 日期工具 ---------------- */

export const todayStr = () => dayjs().format('YYYY-MM-DD')

/** 本地 id：不引入额外依赖，同一毫秒连点也几乎不会撞 */
export const createId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

/** 在一起第几天：首日算第 1 天（与主流情侣 App 口径一致） */
export const daysTogether = (start: string) =>
  Math.max(1, dayjs().startOf('day').diff(dayjs(start).startOf('day'), 'day') + 1)

/** 距离某天还有几天；今天 = 0，已过去 = 负数 */
export const daysUntil = (date: string) =>
  dayjs(date).startOf('day').diff(dayjs().startOf('day'), 'day')

/** 每年重复的日子：取今年（已过则明年） */
export const nextYearlyDate = (date: string) => {
  const origin = dayjs(date)
  let target = dayjs().month(origin.month()).date(origin.date())
  if (target.isBefore(dayjs().startOf('day'))) target = target.add(1, 'year')
  return target.format('YYYY-MM-DD')
}

/**
 * 首页 / 纪念日页的倒数列表：用户自定义纪念日 + 自动里程碑（天数 / 周年）。
 * 自动项不需要存 store —— 改「在一起的日子」后会自动重算，不会出现脏数据。
 */
export const buildUpcoming = (
  list: LoveAnniversary[],
  start: string
): LoveUpcoming[] => {
  const items: LoveUpcoming[] = []

  list.forEach(a => {
    const date = a.repeat === 'yearly' ? nextYearlyDate(a.date) : a.date
    const left = daysUntil(date)
    if (left < 0) return
    items.push({
      id: a.id,
      title: a.title,
      icon: a.icon,
      date,
      daysLeft: left,
      years: a.repeat === 'yearly' ? Math.max(1, dayjs(date).year() - dayjs(a.date).year()) : 0,
      auto: !!a.system,
      remind: a.remind || 0,
      pinned: !!a.pinned,
      note: a.note || '',
      createdAt: a.createdAt || '',
      daysPassed: daysSince(a.date)
    })
  })

  MILESTONE_DAYS.forEach(n => {
    const date = dayjs(start).add(n - 1, 'day').format('YYYY-MM-DD')
    const left = daysUntil(date)
    if (left < 0) return
    items.push({
      id: `milestone-${n}`,
      title: `在一起 ${n} 天`,
      icon: 'heart',
      date,
      daysLeft: left,
      years: 0,
      auto: true,
      remind: 0,
      pinned: false,
      note: '',
      createdAt: '',
      daysPassed: 0
    })
  })

  for (let y = 1; y <= 60; y++) {
    const date = dayjs(start).add(y, 'year').format('YYYY-MM-DD')
    const left = daysUntil(date)
    if (left < 0) continue
    items.push({
      id: `year-${y}`,
      title: `在一起 ${y} 周年`,
      icon: 'cake',
      date,
      daysLeft: left,
      years: y,
      auto: true,
      remind: 0,
      pinned: false,
      note: '',
      createdAt: '',
      daysPassed: 0
    })
    break
  }

  /** 置顶优先，其余按临近程度；竞品「把重要的日子置在顶部」 */
  return items.sort(
    (a, b) => Number(b.pinned) - Number(a.pinned) || a.daysLeft - b.daysLeft
  )
}

/**
 * 首装示例日记：第一次打开时光轴就有内容，用户写完自己的第一篇可以直接删掉。
 * 不是只读假数据 —— id 固定为 sample-*，编辑 / 删除都走 store 的常规动作。
 * 日期按「今天 / 昨天 / 三天前」相对生成，装得再晚也像刚发生。
 */
export const DEFAULT_DIARIES: LoveDiary[] = [
  {
    id: 'sample-1',
    date: dayjs().format('YYYY-MM-DD'),
    content: '路过花店时你说「这束好像我们家客厅」，然后就真的抱了一束回家。',
    mood: 'sweet',
    images: [],
    createAt: `${dayjs().format('YYYY-MM-DD')} 20:30:00`
  },
  {
    id: 'sample-2',
    date: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
    content: '一起把厨房折腾得一团糟，最后煮出来的面还是有点咸，但你吃得很认真。',
    mood: 'happy',
    images: [],
    createAt: `${dayjs().subtract(1, 'day').format('YYYY-MM-DD')} 21:10:00`
  },
  {
    id: 'sample-3',
    date: dayjs().subtract(3, 'day').format('YYYY-MM-DD'),
    content: '你出差的第一晚，视频里困得眼睛都睁不开，还是陪我聊到了十二点。',
    mood: 'miss',
    images: [],
    createAt: `${dayjs().subtract(3, 'day').format('YYYY-MM-DD')} 23:50:00`
  }
]

/* ---------------- 竞品交互口径：提醒 / 正数日 ---------------- */

/** 正数日：从那天到今天已经过去多少天（纪念日详情的「已经一起走过」） */
export const daysSince = (date: string) =>
  Math.max(0, dayjs().startOf('day').diff(dayjs(date).startOf('day'), 'day'))

/** 提前提醒档位：纯本地页内提醒，不开系统推送（无账号 / 无推送通道） */
export const REMIND_OPTIONS = [
  { value: 0, label: '当天' },
  { value: 1, label: '提前 1 天' },
  { value: 3, label: '提前 3 天' },
  { value: 7, label: '提前 7 天' }
] as const

