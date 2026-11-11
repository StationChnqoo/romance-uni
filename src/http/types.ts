/**
 * HTTP 层类型定义
 *
 * 约定：业务后端统一返回 R<T> = { code, msg?, data }，
 * 传输层按 CreateHttpOptions.unwrap 决定是否解包。
 */

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD'

export interface RequestOptions {
  /** query 参数，拼到 url 上，空值会被跳过 */
  params?: Record<string, any>
  /** 请求体 */
  data?: any
  /** 仅本次请求生效的 header，不会写回实例默认值 */
  headers?: Record<string, string>
  /** 超时毫秒数，缺省取实例配置 */
  timeout?: number
  /** true 时失败不弹 toast，交由调用方处理 */
  silent?: boolean
}

export interface UploadOptions {
  /** 本地文件路径，来自 uni.chooseImage / chooseVideo */
  filePath: string
  /** 后端接收字段名，默认 file */
  name?: string
  formData?: Record<string, any>
  headers?: Record<string, string>
  timeout?: number
  silent?: boolean
}

/** 请求失败错误：网络异常 code 为 -1 */
export class HttpError extends Error {
  /** 业务码，网络异常时为 -1 */
  code: number
  /** HTTP 状态码，无响应时为 0 */
  statusCode: number
  /** 后端返回的 msg */
  msg: string

  constructor(message: string, code = -1, statusCode = 0, msg = '') {
    super(message)
    this.name = 'HttpError'
    this.code = code
    this.statusCode = statusCode
    this.msg = msg
  }
}
