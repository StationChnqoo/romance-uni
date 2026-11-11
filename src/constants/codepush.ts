/**
 * codepush 热更新相关常量
 *
 * 后端地址不在本文件配置：地址统一由 constants/env.ts 的 PRESETS 按 VITE_APP_ENV 决定。
 */
import { ENV } from '@/constants/env'

/**
 * 与小火箭配图搭配的主题绿（取自配图主色 #1c8a67~#309070 的中间调）。
 * 「检测升级」详情页（pkg-codepush/check）用它作为强调色。
 */
export const CODEPUSH_ROCKET_COLOR = '#22a06b'

/** 升级弹窗强调色：天蓝（取自头图蓝天，Material Light Blue），用于更新按钮 / 进度条 */
export const CODEPUSH_UPDATE_COLOR = '#2196f3'

/**
 * 当前 app 在 codepush 后端注册的 appKey。
 * 从 VITE_CODEPUSH_APP_KEY 读取（走 constants/env.ts 这一层，不再直读 import.meta.env）；
 * 接入别的 app 时只需改对应 .env 的该值，无需动 hook / 组件。
 * 未配置时留空，useUpdate 会 warn 并跳过检查，避免误检到别的 app。
 */
export const CODEPUSH_APP_KEY = ENV.CODEPUSH_APP_KEY
