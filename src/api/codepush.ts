/**
 * codepush 热更新接口
 *
 * 对接 test-code-push-api 的 /v1/update/check。约定：服务端只回一个 type，
 * 决策全在服务端，客户端只看 type 决定行为（none / optional / force / native）。
 */
import { createHttp } from '@/http'
import { ENV } from '@/constants/env'

/**
 * 热更新是独立服务（与主 API 同主机、不同端口）：dev 40080 / sit 40081 / uat 40082，
 * 因此自建实例、baseURL 走 ENV.CODEPUSH_BASE_URL（由 constants/env.ts 的 PRESETS 按环境给出），
 * 不复用主 API 的 apiHttp。
 * 检查更新是公开接口（无 token），unauthorizedCodes 置空，避免 401 误触发登录跳转。
 */
const codepushHttp = createHttp({
  baseURL: ENV.CODEPUSH_BASE_URL,
  unwrap: true,
  unauthorizedCodes: []
})

/** 服务端判定结果类型 */
export type UpdateType = 'none' | 'optional' | 'force' | 'native'

/** 目标版本信息，type=none|native 时为 null */
export interface UpdateRelease {
  id: string
  versionCode: number
  versionName: string
  isForce: number
  md5: string
  fileUrl: string
  fileSize: number
}

/** /v1/update/check 的完整返回（R.data 解包后） */
export interface UpdateResult {
  type: UpdateType
  release: UpdateRelease | null
  note: string
  trace?: string[]
}

/** 检查更新入参 */
export interface UpdateCheckPayload {
  appKey: string
  /** android / ios */
  platform: string
  /** 当前已安装的 wgt 版本，未安装过传 0 */
  wgtVersionCode: number
  /** 宿主原生版本号（整数） */
  nativeVersionCode: number
  channel?: string
  /** 设备唯一标识，用于灰度分桶 */
  deviceId?: string
}

/** 检查更新 */
export const checkUpdate = (payload: UpdateCheckPayload) =>
  codepushHttp.post<UpdateResult>('/v1/update/check', payload)
