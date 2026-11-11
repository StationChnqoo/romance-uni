/**
 * 相亲模块常量
 * 由 cloud-react-native/src/constants/datingData.ts 迁移（只迁仍在用的部分）。
 *
 * RN 那边还有 MOOD_PRESETS / MOOD_LABEL / MOOD_EMOJI 三组导出，但它们自己已经标了
 * `@deprecated`：mood 早就改成用户手动输入的字符串（emoji 或 emoji + 文字，如 "😊 开心"），
 * 枚举 key 没人读了，所以不迁 —— 这里只留状态相关的三样东西。
 */
import type { DatingStatus } from '@/types/dating'

/** 状态中文名（列表徽章 / 详情前缀 / 编辑页状态药丸 / 筛选药丸都用它） */
export const DATING_STATUS_LABEL: Record<DatingStatus, string> = {
  talking: '初期沟通',
  dating: '约会中',
  deep: '深度了解',
  meeting: '见家长',
  engaged: '订婚',
  success: '成功',
  failed: '失败'
}

/**
 * 状态主色（徽章底色 / 状态文字色 / 编辑页选中态描边与浅底）。
 * 这套色是「状态语义色」，跟主题色无关（主题色只有一个源头，见 stores/user.ts），
 * 也不参与行情「涨红跌绿」那套口径，所以照 RN 原样保留。
 */
export const DATING_STATUS_COLOR: Record<DatingStatus, string> = {
  talking: '#1677ff',
  dating: '#fa8c16',
  deep: '#722ed1',
  meeting: '#13c2c2',
  engaged: '#eb2f96',
  success: '#52c41a',
  failed: '#8c8c8c'
}

/**
 * 状态枚举顺序：列表页筛选药丸、编辑页状态单选都按这个顺序铺，
 * 别在页面里各自再写一遍数组（顺序会漂）。
 */
export const DATING_STATUS_OPTIONS: DatingStatus[] = [
  'talking',
  'dating',
  'deep',
  'meeting',
  'engaged',
  'success',
  'failed'
]

/** 进度「当日心情」输入框的占位提示（手输 emoji 或 emoji + 文字，与 RN 一字不差） */
export const DATING_MOOD_HINT = '例如：😊 开心  /  😥  /  😤 无语'
