/**
 * 通用工具方法
 * 由 cloud-react-native/src/constants/u.ts 迁移：
 * - Dimensions -> uni.getSystemInfoSync()
 * - showToast  -> toast()（自绘 view 版，见 components/Toast.ts）
 * - require(图片) -> /static 静态资源路径
 */
import dayjs from 'dayjs'
import type { PicGoSrc } from '@/types/media'
import { showToast } from '@/components/Toast'

/**
 * 屏幕尺寸 / 状态栏高度（px）。
 *
 * ★ 页面里要用这三个值就直接 import，**别再写**：
 * ```ts
 * const windowWidth = (() => { try { return uni.getSystemInfoSync().windowWidth || 375 } catch { return 375 } })()
 * ```
 * 这种 IIFE 兜底 —— 首页 / 保皇记牌器 / 笔记详情都各自抄过一份，改兜底值得满项目找。
 * getSystemInfoSync 在个别环境下会抛（App 起手太快、小程序未就绪），所以统一 try 兜底。
 *
 * 兜底值：宽 375 / 高 667（iPhone 6/7/8 逻辑分辨率），状态栏 0（拿不到就当没有）。
 */
export const getWindowWidth = () => {
  try {
    return uni.getSystemInfoSync().windowWidth || 375
  } catch (e) {
    return 375
  }
}

export const getWindowHeight = () => {
  try {
    return uni.getSystemInfoSync().windowHeight || 667
  } catch (e) {
    return 667
  }
}

export const getStatusBarHeight = () => {
  try {
    return uni.getSystemInfoSync().statusBarHeight || 0
  } catch (e) {
    return 0
  }
}

export const cloneDeep = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return obj.map(cloneDeep) as unknown as T
  const cloned = {} as T
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = cloneDeep((obj as any)[key])
    }
  }
  return cloned
}

/**
 * 生成短随机 id（本项目的 nanoid 实现，替代 npm 的 `nanoid` 包）。
 *
 * ⚠️ **别用 npm 的 `nanoid`**：它编译到小程序端是**裸 `crypto.getRandomValues`**
 * （`let o0=(t=21)=>{...crypto.getRandomValues(new Uint8Array(t|=0))...}`），
 * 而小程序运行环境**没有 `crypto` 全局** → 一调用就 `ReferenceError: crypto is not defined`。
 * 若这个调用发生在页面 `setup` 顶层，整个页面直接白屏、连 `onLoad` 都不执行（接口自然不请求）；
 * 只有小程序端会炸，App/H5 有 crypto 所以看不出来。
 *
 * 随机源按环境取：有 `crypto.getRandomValues` 就走强随机（App/H5），
 * 拿不到就退回 `Math.random`（小程序端）。这些 id 只是前端预生成的记录主键
 * （新建时用，随后交给后端 upsert），不需要密码学强度。
 */
const NANOID_ALPHABET = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'

export const nanoid = (size = 21): string => {
  // 必须绕 globalThis 取：小程序端 `crypto` 这个标识符根本不存在，
  // 直接写 `crypto.xxx` 会在取值那一刻就抛 ReferenceError。
  // globalThis 自身也只用 typeof 探一下（个别端/老基础库没有这个全局）。
  const globalObj =
    typeof globalThis !== 'undefined' ? (globalThis as { crypto?: Crypto }) : undefined
  const cryptoObj = globalObj ? globalObj.crypto : undefined
  const bytes = new Uint8Array(size)
  if (cryptoObj && typeof cryptoObj.getRandomValues === 'function') {
    cryptoObj.getRandomValues(bytes)
  } else {
    for (let i = 0; i < size; i++) {
      bytes[i] = Math.floor(Math.random() * 256)
    }
  }
  let id = ''
  for (let i = 0; i < size; i++) {
    id += NANOID_ALPHABET[bytes[i] & 63]
  }
  return id
}

export enum PicGoFileType {
  Image = 'Image',
  Video = 'Video',
  Other = 'Other'
}

interface PicGoFile {
  type: PicGoFileType
  /** 图片时是远端 url；非图片为空串（非图片用 icon 渲染） */
  src: string
  /** 非图片的 wot 图标名（`<wd-icon :name>`）；图片为空串 */
  icon: string
  /** 非图片的图标主色（沿用原 file-*.png 的按类型配色）；图片为空串 */
  iconColor: string
}

/**
 * 图片/视频地址归一化，给 `<image :src>` 用。
 *
 * Android 的 <image> 走原生层解码，URL 里含中文、空格等非 ASCII 字符时
 * 会直接加载失败（iOS 的 webview 相对宽容，表现为「iOS 正常、Android 不显示」）。
 * 附件名是用户自己命名的，中文/空格很常见，所以展示前统一 encode 一遍。
 *
 * 手动切出 query/hash 是为了只编码 path —— encodeURI 虽不碰 %xx，
 * 但 query 里如果有非 ASCII 参数值同样需要编码。已带 %xx 的不会被重复编码。
 */
export const mediaUrl = (url: string) => {
  const raw = (url || '').trim()
  if (!raw) return ''
  const hashIndex = raw.indexOf('#')
  const hash = hashIndex > -1 ? raw.slice(hashIndex) : ''
  const withoutHash = hashIndex > -1 ? raw.slice(0, hashIndex) : raw
  const queryIndex = withoutHash.indexOf('?')
  const path = queryIndex > -1 ? withoutHash.slice(0, queryIndex) : withoutHash
  const query = queryIndex > -1 ? withoutHash.slice(queryIndex) : ''
  return `${encodeURI(path)}${encodeURI(query)}${hash}`
}

/**
 * 路由参数里的「自由文本」兜底解码。
 *
 * 正常链路是对称的：Router.navigate 的 stringifyParams 用 encodeURIComponent 编一次，
 * uni 的 parseQuery 内部 decodeURIComponent 再解一次。但**个别端 onLoad 不还原**
 * （实测 url 到手仍是 `https%3A%2F%2F...`），自由文本就原样顶着 `%XX` 显示出来了
 * （例：pkg-post/detail 的 title → 导航栏标题「详情/https%3A%2F%2F...」）。
 *
 * 判据「还含 %[0-9A-Fa-f]{2} 转义」；极端会多编一层，所以最多解两层；
 * 解不动（落单 % 等非法转义）就保持原样，绝不把本来正常的文本弄坏
 * （如「涨幅50%的股票」不含 %XX，不会被碰）。与 pkg-misc/webviewer 的 normalizeTitle 同款逻辑。
 */
export const decodeRouteText = (raw?: string) => {
  let value = raw || ''
  for (let i = 0; i < 2 && /%[0-9A-Fa-f]{2}/.test(value); i++) {
    try {
      value = decodeURIComponent(value)
    } catch (error) {
      break
    }
  }
  return value
}

/**
 * 外跳系统默认浏览器打开链接（脱离 App 内置 <web-view> / 应用内浏览器）。
 * App 走 5+ runtime 直接唤起系统浏览器；其它端（H5 等）window.open 新标签。
 * ⚠️ uni.openURL 不在项目 Uni 类型里，故 App 端用 plus.runtime.openURL；
 *    两分支靠条件编译隔离，各自端只留一条，window / plus 引用不会落到对端。
 */
export const openExternal = (url: string) => {
  if (!url) return
  // #ifdef APP-PLUS
  plus.runtime.openURL(url)
  // #endif
  // #ifndef APP-PLUS
  window.open(url, '_blank')
  // #endif
}

/**
 * 附件类型判定 + 图标。
 *
 * 非图片不再用 `static/images/common/file-*.png`（那些图已删），改成 wot 的字体图标
 * `file-pdf / file-word / file-excel / file-powerpoint / file-copy / file-unknown / video1`，
 * iconColor 沿用原来那批 png 的主色，保住「按类型分色」的视觉区分。
 * 图片仍是远端 url（喂给 `<image>`），此时 icon / iconColor 为空串。
 */
export const getFile = (image: PicGoSrc): PicGoFile => {
  const mime = image.mimeType || ''
  if (mime.startsWith('image')) {
    // 图片走原生层解码，URL 里的中文/空格在 Android 上会直接加载失败
    return { type: PicGoFileType.Image, src: mediaUrl(image.url), icon: '', iconColor: '' }
  }
  if (mime.startsWith('video')) {
    return { type: PicGoFileType.Video, src: '', icon: 'video1', iconColor: '#d0508c' }
  }
  if (mime === 'application/pdf') {
    return { type: PicGoFileType.Other, src: '', icon: 'file-pdf', iconColor: '#e05a4f' }
  }
  if (
    mime === 'application/msword' ||
    mime ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    return { type: PicGoFileType.Other, src: '', icon: 'file-word', iconColor: '#4a7ebb' }
  }
  if (
    mime === 'application/vnd.ms-excel' ||
    mime ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ) {
    return { type: PicGoFileType.Other, src: '', icon: 'file-excel', iconColor: '#3c9e63' }
  }
  if (
    mime === 'application/vnd.ms-powerpoint' ||
    mime ===
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ) {
    return { type: PicGoFileType.Other, src: '', icon: 'file-powerpoint', iconColor: '#d9694a' }
  }
  if (
    mime === 'application/zip' ||
    mime === 'application/x-zip-compressed' ||
    mime === 'application/x-rar-compressed' ||
    mime === 'application/x-7z-compressed'
  ) {
    return { type: PicGoFileType.Other, src: '', icon: 'file-copy', iconColor: '#6b8fbf' }
  }
  return { type: PicGoFileType.Other, src: '', icon: 'file-unknown', iconColor: '#9aa0a6' }
}

/**
 * 轻提示。改用自绘 view 版 toast（components/Toast.ts + ToastContainer.vue）：
 *   - 原生 uni.showToast 偶发不自动消失、且会挡点击，不符合业务预期；
 *   - 自绘 view 带穿透（pointer-events: none）、自动消失、支持多行换行，样式统一。
 *
 * 业务侧一律用这个，别再直接 uni.showToast。
 */
export const toast = (s: string) => {
  if (!s) return
  showToast({ message: s })
}

/**
 * 办公文档扩展名 -> uni.openDocument 支持的 fileType
 * （App 端仅支持这 7 种：doc/xls/ppt/pdf/docx/xlsx/pptx）
 */
const OFFICE_FILE_TYPES: Record<string, string> = {
  doc: 'doc',
  docx: 'docx',
  xls: 'xls',
  xlsx: 'xlsx',
  ppt: 'ppt',
  pptx: 'pptx',
  pdf: 'pdf'
}

/** mimeType -> 扩展名（文件名/URL 里没扩展名时兜底） */
const MIME_EXT_MAP: Record<string, string> = {
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/vnd.ms-excel': 'xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  'application/vnd.ms-powerpoint': 'ppt',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
  'application/pdf': 'pdf'
}

/** 取附件扩展名（小写、不含点）：文件名 -> URL -> mimeType 依次兜底 */
export const getFileExt = (file: PicGoSrc) => {
  const fromName = (file.name || '').split('.').pop()
  if (fromName && fromName !== file.name && fromName.length <= 5) {
    return fromName.toLowerCase()
  }
  const fromUrl = (file.url || '').split('?')[0].split('#')[0].split('/').pop() || ''
  const urlExt = fromUrl.split('.').pop()
  if (urlExt && urlExt !== fromUrl && urlExt.length <= 5) {
    return urlExt.toLowerCase()
  }
  return MIME_EXT_MAP[file.mimeType || ''] || ''
}

/** 是否是 openDocument 能打开的办公文档（word/excel/ppt/pdf） */
export const isOfficeDocument = (file: PicGoSrc) => {
  return !!OFFICE_FILE_TYPES[getFileExt(file)]
}

/**
 * 打开办公文档预览：先 uni.downloadFile 下到本地临时目录（App 端保留原文件名与
 * 扩展名），再交给系统/WPS 查看器打开。返回 true 表示已处理，false 表示不是
 * 办公文档、调用方需自己兜底（弹提示）。
 */
export const openOfficeDocument = (file: PicGoSrc) => {
  const fileType = OFFICE_FILE_TYPES[getFileExt(file)]
  if (!fileType) return false

  uni.showLoading({ title: '文件加载中...', mask: true })
  uni.downloadFile({
    url: file.url,
    success: res => {
      if (res.statusCode !== 200) {
        uni.hideLoading()
        toast('文件下载失败')
        return
      }
      // 下载完立刻关 loading，别等 openDocument 回调：openDocument 会唤起系统/WPS
      // 阅读器、当前 webview 失焦，success/fail 回调在 App 端可能不回来，
      // 若把 hideLoading 挂在回调里就会漏关，loading 一直挂在屏幕上。
      uni.hideLoading()
      uni.openDocument({
        filePath: res.tempFilePath,
        fileType,
        fail: () => toast('打开文件失败，请确认已安装相关应用')
      })
    },
    fail: () => {
      uni.hideLoading()
      toast('文件下载失败')
    }
  })
  return true
}

export const renderUpOrDown = (n: number) => {
  const label = n > 0 ? '↑' : n < 0 ? '↓' : ''
  const color = n > 0 ? '#f20c00' : n < 0 ? '#0c8918' : 'gray'
  // 平盘返回空串（不能返回数字 0：模板里插值会渲染成 "0"，变成 "00.00%"）
  const operator = n > 0 ? '+' : n < 0 ? '-' : ''
  return { label, color, operator }
}

/**
 * 相对时间（新闻发布时间、记录更新时间等）。
 * 给 ISO 串返回「刚刚 / x分钟前 / x小时前 / x天前 / x周前 / x个月前 / x年前」。
 *
 * 为什么不用 `dayjs(x).fromNow()`：main.ts 确实已经 `dayjs.extend(relativeTime)` +
 * `dayjs.locale('zh-cn')`（dating 卡片就在用 fromNow），但它中文只有 秒/分/时/天/月/年
 * **六档，缺「周」** —— 10 天前只会出「10 天前」，40 天前直接跳到「1 个月前」。
 * 这里按天数自己切档，在「天」和「月」之间补了一档周。
 *
 * 切档一律用天数算（不用 dayjs 的 diff('month')）：跨自然月的天数取月差会掉 1
 * （如 01-01 → 01-31 是 30 天但 diff month = 0，会输出「0个月前」）。
 */
export const relativeTime = (iso: string): string => {
  if (!iso) return ''
  const then = dayjs(iso)
  if (!then.isValid()) return ''
  const now = dayjs()
  const diffMin = now.diff(then, 'minute')
  if (diffMin < 1) return '刚刚'
  if (diffMin < 60) return `${diffMin}分钟前`
  const diffHour = now.diff(then, 'hour')
  if (diffHour < 24) return `${diffHour}小时前`
  const diffDay = now.diff(then, 'day')
  if (diffDay < 7) return `${diffDay}天前`
  if (diffDay < 30) return `${Math.floor(diffDay / 7)}周前`
  if (diffDay < 365) return `${Math.min(11, Math.floor(diffDay / 30))}个月前`
  return `${Math.floor(diffDay / 365)}年前`
}

/**
 * ISO 8601 年周：给定 ISO 串返回「2026年第42周」。
 * 周记（投资记录等）按周结算，用「哪年第几周」比「x周前 / x个月前」定位更准。
 *
 * ⚠️ App 端逻辑层是裸 V8，没有 Intl.WeekInfo / toLocaleString 的周数能力，必须手写。
 * 算法：周四所在的周即为该 ISO 周；周一为周首；跨年周归属周四所在的年份。
 */
export const formatYearWeek = (iso: string): string => {
  if (!iso) return ''
  const d = dayjs(iso)
  if (!d.isValid()) return ''
  // 用 UTC 计算，规避本地时区把跨午夜记录算错周
  const date = new Date(Date.UTC(d.year(), d.month(), d.date()))
  const dayNum = date.getUTCDay() || 7 // 周日=0 → 视作 7
  date.setUTCDate(date.getUTCDate() + 4 - dayNum) // 移到本周周四
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
  const weekNo = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
  return `${date.getUTCFullYear()}年第${weekNo}周`
}

export const hex2Rgba = (hex: string, alpha: number) => {
  return `rgba(${parseInt(hex.slice(1, 3), 16)}, ${parseInt(
    hex.slice(3, 5),
    16
  )}, ${parseInt(hex.slice(5, 7), 16)}, ${alpha})`
}

/** 字号自适应：宽屏加几号字，返回 px */
export function fs(size: number) {
  const width = getWindowWidth()
  if (width >= 428) return size + 3 // Pro Max / Plus
  if (width >= 393) return size + 2 // iPhone 15/16/17
  if (width >= 390) return size + 1 // iPhone 12/13/14
  return size // SE 及更小屏
}

/** dip -> px（以 375 设计稿为基准） */
export const dip2px = (dip: number) => {
  const scale = getWindowWidth() / 375
  return Math.round(dip * scale)
}

/** px 数值转 css 字符串，方便 :style 使用 */
export const px = (n: number) => `${n}px`

/**
 * 图例分行：echarts 单个 legend 折成多行时，行内是从左往右排的（**没有**行内居中的开关，
 * legend.align / textStyle.align 只管文字自身对齐），所以第二行短的时候会明显靠左。
 * 想每行居中只能拆成多个 legend 组件（v3.0.0+ 支持 legend 传数组），各自 left:'center'。
 *
 * 行数按「每行最多 maxPerRow 项」取并尽量均分：5 项 → 3+2，7 项 → 4+3，9 项 → 3+3+3。
 * 返回的每个子数组直接当对应 legend 的 data 用（不传 data 会取全部 series）。
 */
export const splitLegendRows = (names: string[], maxPerRow = 4): string[][] => {
  if (names.length <= maxPerRow) return [names]
  const rowCount = Math.ceil(names.length / maxPerRow)
  const perRow = Math.ceil(names.length / rowCount)
  const rows: string[][] = []
  for (let i = 0; i < names.length; i += perRow) {
    rows.push(names.slice(i, i + perRow))
  }
  return rows
}

/**
 * 折线图/柱状图 axis tooltip 统一格式：首行 x 轴标签，每行「色块 + 系列名 + 两位小数%」。
 *
 * ★ 数值必须 toFixed(2)：series 里的值虽按 toFixed(2) 生成，但 `Number()` 会把尾零丢掉
 *   （1.20 → 1.2），tooltip 里小数位就会一位两位混着跳，所以格式化时必须再补一次。
 * ★ richText 渲染模式下 echarts 会把 params.marker 转成 `{markerX|  }` 富文本色块，
 *   直接拼在文本前即可（html 模式下它是 <span>，本函数只用于 richText 的图）。
 * ★ value 可能是 null（connectNulls:false 的断点），显示 `--` 而不是 0——Number(null) 是 0，
 *   不先判空会把缺口画成 0.00%。
 */
export const formatAxisPercentTooltip = (params: any): string => {
  const list: any[] = Array.isArray(params) ? params : [params]
  if (!list.length) return ''
  const head = list[0].axisValue ?? ''
  const lines = list.map((p) => {
    const raw = p.value
    const v = raw == null ? NaN : Number(raw)
    const text = Number.isFinite(v) ? `${v.toFixed(2)}%` : '--'
    return `${p.marker ?? ''}${p.seriesName}  ${text}`
  })
  return [head, ...lines].join('\n')
}

/** 饼图/环形图 item tooltip：色块 + 名称 + 两位小数占比 */
export const formatPiePercentTooltip = (params: any): string => {
  const p = Array.isArray(params) ? params[0] : params
  if (!p) return ''
  const percent = Number(p.percent)
  return `${p.marker ?? ''}${p.name}：${Number.isFinite(percent) ? percent.toFixed(2) : '0.00'}%`
}

export const links = {
  stockDetail: (code: string) =>
    `https://wap.eastmoney.com/quote/stock/${code}.html`,
  fundDetail: (code: string) =>
    `https://h5.1234567.com.cn/app/fund-details/?fCode=${code}`,
  /**
   * 走势曲线
   * @param code 0.799050
   */
  previewStockChart: (code: string, imageType?: string) =>
    `https://webquotepic.eastmoney.com/GetPic.aspx?imageType=${
      imageType || ''
    }&type=&nid=${code}&_${new Date().getTime()}`
}
