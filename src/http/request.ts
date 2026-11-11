/**
 * 传输层：uni.request 封装
 *
 * 相比旧的 BaseService，这里有三条硬约束：
 * 1. baseURL 在 createHttp 时固定，闭包持有，调用方无法在运行时改写，
 *    杜绝「改了 baseURL 不还原」「header 累积残留」这类污染问题。
 * 2. token 由外部注册的 getter 延迟读取，不再用 require 动态取 store。
 * 3. 返回值语义统一：unwrap=true 时直接拿到 R.data，业务码失败抛 HttpError。
 */
import { HttpError } from './types'
import type { HttpMethod, RequestOptions, UploadOptions } from './types'
import { toast } from '@/utils'

type TokenGetter = () => string

let tokenGetter: TokenGetter = () => ''
let unauthorizedHandler: (() => void) | null = null

/** 注册 token 读取方式，延迟调用以规避 store 循环依赖 */
export const setTokenGetter = (fn: TokenGetter) => {
  tokenGetter = fn
}

/** 注册登录态失效处理（清 token + 跳登录） */
export const setUnauthorizedHandler = (fn: (() => void) | null) => {
  unauthorizedHandler = fn
}

export interface CreateHttpOptions {
  /** 固定基址，创建后不可修改 */
  baseURL: string
  timeout?: number
  /**
   * 上传专用超时（毫秒），缺省 180000。
   * 不与 `timeout` 共用：文件上传耗时随体积增长，共用一个短超时会出现
   * 「后端已上传成功、前端却超时报失败」并留下 COS 孤儿文件。
   */
  uploadTimeout?: number
  /** 实例级默认 header */
  headers?: Record<string, string>
  /** true 时按 R<T> 解包，false 时原样返回响应体（第三方数据源用） */
  unwrap?: boolean
  /** 视为成功的业务码 */
  successCodes?: number[]
  /** 触发登录失效处理的业务码 */
  unauthorizedCodes?: number[]
}

export interface HttpInstance {
  request<T>(method: HttpMethod, url: string, options?: RequestOptions): Promise<T>
  get<T>(url: string, options?: RequestOptions): Promise<T>
  post<T>(url: string, data?: any, options?: RequestOptions): Promise<T>
  put<T>(url: string, data?: any, options?: RequestOptions): Promise<T>
  delete<T>(url: string, options?: RequestOptions): Promise<T>
  upload<T>(url: string, options: UploadOptions): Promise<T>
}

const isAbsolute = (url: string) => /^https?:\/\//.test(url)

/** 序列化 query，跳过 undefined / null */
const stringifyParams = (params?: Record<string, any>) => {
  if (!params) return ''
  return Object.keys(params)
    .filter(k => params[k] !== undefined && params[k] !== null)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&')
}

/** 判断是否后端统一响应结构 R<T> */
const isEnvelope = (body: unknown): body is { code: number; msg?: string; data: any } =>
  !!body &&
  typeof body === 'object' &&
  typeof (body as any).code === 'number' &&
  'data' in (body as any)

/**
 * 把 uni.request / uploadFile 的网络层 errMsg 翻译成中文提示，并带上出问题的接口路径，
 * 否则出了网络错误完全看不出是哪个接口（errMsg 本身只有「request:fail timeout」这类字眼）。
 *
 * 提示统一走 toast(msg)：toast 已改为自绘 view 版（带穿透、自动消失、多行换行），
 * 网络抖动这类瞬时错误提示完就该消失，不挡用户操作；
 * 接口路径这类细节已在 dev 的 [CURL] 日志里，不靠提示传。
 */
const describeNetworkError = (errMsg: string, endpoint?: string) => {
  const where = endpoint ? `（${endpoint}）` : ''
  if (errMsg.includes('timeout')) return `接口${where}连接超时`
  if (errMsg.includes('request:fail')) return `无法连接服务器${where}`
  return `服务器开小差了${where}`
}

export function createHttp(options: CreateHttpOptions): HttpInstance {
  const baseURL = options.baseURL
  const timeout = options.timeout ?? 10000
  /**
   * ★ 上传专用超时，**不与普通请求共用** 10s。
   * 文件上传耗时随体积线性增长：9MB PDF 实测后端「收到 → COS putObject 完成」就用了 11.6s
   * （`UploadController.upload` 的 `Uploaded file: 11614ms` 日志），
   * 而客户端还要加上「本地 → 服务器」的传输时间，总时长必然超过 10s。
   * 共用一个 10s 的后果是：**后端已经上传成功并返回 R.ok，前端却先超时掐断报「上传失败」**，
   * 更糟的是 COS 上会留下一个用户以为没传上去的孤儿文件。
   * 普通接口仍走 10s（卡住就该尽快报错），只有上传放宽。
   */
  const uploadTimeout = options.uploadTimeout ?? 180000
  const unwrap = options.unwrap ?? true
  const successCodes = options.successCodes ?? [0, 200]
  const unauthorizedCodes = options.unauthorizedCodes ?? [401]
  const defaultHeaders: Record<string, string> = { ...(options.headers || {}) }

  const buildUrl = (url: string, params?: Record<string, any>) => {
    const full = isAbsolute(url) ? url : `${baseURL}${url}`
    const qs = stringifyParams(params)
    if (!qs) return full
    return `${full}${full.includes('?') ? '&' : '?'}${qs}`
  }

  const buildHeader = (extra?: Record<string, string>) => ({
    token: tokenGetter(),
    ...defaultHeaders,
    ...(extra || {})
  })

  /** 生成等效 curl 命令，便于在终端复现调试（仅 dev 打印） */
  const buildCurl = (
    method: HttpMethod,
    url: string,
    params?: Record<string, any>,
    data?: any,
    headers?: Record<string, string>
  ) => {
    const full = buildUrl(url, params)
    // 对齐 uni.request 默认行为：带 body 且未显式声明时按 JSON 补 Content-Type，
    // 否则 curl 的 -d 默认走 form-urlencoded，服务端会回 415 Unsupported Media Type
    const hdrs: Record<string, string> = { ...(headers || {}) }
    if (data !== undefined && !('content-type' in hdrs) && !('Content-Type' in hdrs)) {
      hdrs['Content-Type'] = 'application/json'
    }
    const headerStr = Object.entries(hdrs)
      .filter(([, v]) => v !== undefined && v !== '')
      .map(([k, v]) => `-H '${k}: ${v}'`)
      .join(' ')
    const bodyStr = data !== undefined ? `-d '${JSON.stringify(data)}'` : ''
    return `curl -X ${method} '${full}' ${headerStr} ${bodyStr}`.replace(/\s+/g, ' ').trim()
  }

  /** 按实例配置解包业务响应，失败抛 HttpError */
  const settle = <T>(
    body: any,
    statusCode: number,
    silent: boolean | undefined,
    resolve: (v: T) => void,
    reject: (e: unknown) => void,
    raw: any
  ) => {
    if (!unwrap || !isEnvelope(body)) {
      resolve((body ?? raw) as T)
      return
    }
    if (unauthorizedCodes.includes(body.code)) {
      unauthorizedHandler?.()
      reject(new HttpError('登录已失效', body.code, statusCode, body.msg))
      return
    }
    if (!successCodes.includes(body.code)) {
      const msg = body.msg || '服务器开小差了'
      if (!silent) toast(msg)
      reject(new HttpError(msg, body.code, statusCode, body.msg))
      return
    }
    resolve(body.data as T)
  }

  function request<T>(
    method: HttpMethod,
    url: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const fullUrl = buildUrl(url, options.params)
    const headers = buildHeader(options.headers)
    if (import.meta.env.DEV) {
      console.log('[CURL]', buildCurl(method, url, options.params, options.data, headers))
    }
    return new Promise<T>((resolve, reject) => {
      uni.request({
        url: fullUrl,
        method,
        data: options.data,
        header: headers,
        timeout: options.timeout ?? timeout,
        success: res => {
          const statusCode = res.statusCode
          if (statusCode >= 400) {
            if (!options.silent) toast('服务器开小差了')
            reject(new HttpError(`HTTP ${statusCode}`, -1, statusCode))
            return
          }
          settle<T>(res.data, statusCode, options.silent, resolve, reject, res.data)
        },
        fail: err => {
          const msg = describeNetworkError(err?.errMsg || '', url)
          if (!options.silent) toast(msg)
          reject(new HttpError(msg))
        }
      })
    })
  }

  function upload<T>(url: string, options: UploadOptions): Promise<T> {
    const fullUrl = isAbsolute(url) ? url : `${baseURL}${url}`
    return new Promise<T>((resolve, reject) => {
      uni.uploadFile({
        url: fullUrl,
        filePath: options.filePath,
        name: options.name || 'file',
        formData: options.formData || {},
        header: buildHeader(options.headers),
        /* 上传用自己的长超时（见 uploadTimeout 注释），调用方仍可按次覆盖 */
        timeout: options.timeout ?? uploadTimeout,
        success: res => {
          let body: any = res.data
          if (typeof body === 'string') {
            try {
              body = JSON.parse(body)
            } catch (e) {
              /* 后端返回非 JSON，原样透传 */
            }
          }
          const statusCode = res.statusCode
          if (statusCode >= 400) {
            if (!options.silent) toast('服务器开小差了')
            reject(new HttpError(`HTTP ${statusCode}`, -1, statusCode))
            return
          }
          settle<T>(body, statusCode, options.silent, resolve, reject, res.data)
        },
        fail: err => {
          const msg = describeNetworkError(err?.errMsg || '', url)
          if (!options.silent) toast(msg)
          reject(new HttpError(msg))
        }
      })
    })
  }

  return {
    request,
    upload,
    get: <T>(url: string, options?: RequestOptions) => request<T>('GET', url, options),
    post: <T>(url: string, data?: any, options?: RequestOptions) =>
      request<T>('POST', url, { ...options, data }),
    put: <T>(url: string, data?: any, options?: RequestOptions) =>
      request<T>('PUT', url, { ...options, data }),
    delete: <T>(url: string, options?: RequestOptions) => request<T>('DELETE', url, options)
  }
}
