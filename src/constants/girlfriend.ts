/**
 * 「关于她」小事记 —— 选项与语义色。
 *
 * ★ 颜色口径：这里的 4 个态度色是**业务语义色**（喜欢玫红 / 不喜欢石板蓝 / 心愿紫 / 随口松绿），
 *   与全站主题色是两回事：主题色唯一源头仍是 stores/user.ts 的 THEME_COLOR，
 *   页面里所有跟主题色相关的元素（悬浮按钮、激活下划线、保存按钮）一律取 userStore.theme，
 *   不在此处写死。语义色集中在本文件一处定义，页面只引用不散落 hex、不堆 CSS 色类。
 *
 * ★ 四色统一按「实底配白字对比度 ≈4.8:1」校准（4.78 / 4.84 / 4.80 / 4.79），明度带一致：
 *   旧版四色明度不齐，且「心愿」的浊金 #c69540 对比只有 2.7:1、白字发虚，色相又紧贴
 *   主题粉 #ee5a92，选中时像一块脏棕斑。心愿改用紫，与主题粉拉开色相；
 *   四色也避开了行情红 #f20c00（纯亮红）与主题粉。
 *
 * ★ 图标名全部取自 wot 自带图标表（wot-icons.html 已核对存在）。
 * ★ 已接后端真实接口，本地示例数据（DEMO_SEEDS / buildDemoNotes）随之删除。
 */
import type {
  GirlAttitude,
  GirlStatus
} from '@/types/girlfriend'

export interface GirlAttitudeOption {
  key: GirlAttitude
  label: string
  icon: string
  color: string
}

/** 四档态度：不只「喜欢 / 不喜欢」，中性事实和心愿也各有位置 */
export const GIRL_ATTITUDES: GirlAttitudeOption[] = [
  { key: 'like', label: '喜欢', icon: 'heart', color: '#bc4f58' },
  { key: 'dislike', label: '不喜欢', icon: 'thumb-down', color: '#5f7390' },
  { key: 'wish', label: '心愿清单', icon: 'gift', color: '#8465a4' },
  { key: 'mention', label: '随口一提', icon: 'chat', color: '#467d66' }
]

export interface GirlOption<T extends string> {
  key: T
  label: string
}

/**
 * 后续：只回答「办没办」，不再重复表达「重不重要 / 该不该躲」
 * （「别忘」交给 starred，「需避开」交给态度里的不喜欢）。
 */
export const GIRL_STATUSES: GirlOption<GirlStatus>[] = [
  { key: 'record', label: '仅记录' },
  { key: 'todo', label: '待安排' },
  { key: 'done', label: '已兑现' }
]

/** 排序：删掉「分量」后，「最要紧的在前」改由星标承担 */
export type GirlSort = 'new' | 'old' | 'star'
export const GIRL_SORTS: GirlOption<GirlSort>[] = [
  { key: 'new', label: '最新的在前' },
  { key: 'old', label: '最早的在前' },
  { key: 'star', label: '星标在前' }
]

/* ---------------- 查表 ---------------- */

export const attitudeOf = (key: GirlAttitude): GirlAttitudeOption =>
  GIRL_ATTITUDES.find(it => it.key === key) || GIRL_ATTITUDES[3]

export const statusLabel = (key: GirlStatus): string =>
  GIRL_STATUSES.find(it => it.key === key)?.label || '仅记录'

/** 状态药丸的样式：只换文字色，底色统一浅色，避免堆色类 */
export const statusTone = (key: GirlStatus): { color: string; background: string } => {
  if (key === 'todo') return { color: '#96682a', background: '#fdf3e6' }
  if (key === 'done') return { color: '#4d7a5f', background: '#edf4ef' }
  return { color: '#8a8078', background: '#f4f1ec' }
}
