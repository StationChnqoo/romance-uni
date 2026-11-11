/**
 * useUpdate —— 热更新逻辑 hook（与 UI 解耦，方便复用到别的 app）
 *
 * 职责：
 * 1. 采集检查更新所需的环境信息（platform / 原生版本 / wgt 版本 / 设备号）
 * 2. 调 /v1/update/check，按服务端返回的 type 驱动弹窗
 * 3. 在 App 平台下载 wgt 并静默安装 + 重启；非 App 平台降级（见下方说明）
 *
 * 为什么平台/版本/设备号都在这采，而不是让组件传？
 * 这些值的获取方式分散且带条件编译（plus.* 只在 APP-PLUS 存在），
 * 收口到一个 hook 里，组件只管渲染，别的 app 接入时无需关心细节。
 *
 * 关于「小程序」：uni-app 编译的微信小程序不支持 wgt 热更新（走 wx.getUpdateManager），
 * 因此默认只在 App 平台（android/ios）执行检查与安装；小程序/H5 调 check() 会被直接跳过，
 * 如需小程序侧更新，请在该平台另行接入，不要混用本 hook。
 */
import { ref } from 'vue'
import { checkUpdate, type UpdateRelease, type UpdateResult } from '@/api/codepush'
import { toast } from '@/utils'

// HTML5+ 引擎在 App 平台注入的全局对象，非 App 平台整段被条件编译剔除
declare const plus: any

export interface UseUpdateOptions {
  /** 后端 App 的 appKey（必填，标识这是哪个 app） */
  appKey: string
  /** 渠道标识，可选 */
  channel?: string
  /** 当前 wgt 版本号，默认动态读取运行中的 wgt 版本；一般无需传，仅测试覆盖用 */
  wgtVersionCode?: number
  /** 非 App 平台是否仍调用检查，默认 false（小程序/H5 不走 wgt 热更新） */
  enableNonApp?: boolean
}

export function useUpdate(options: UseUpdateOptions) {
  const visible = ref(false)
  const type = ref<UpdateResult['type']>('none')
  const release = ref<UpdateRelease | null>(null)
  const note = ref('')
  const downloading = ref(false)
  const progress = ref(0)
  /** 已下载 / 总字节数：progress 只给百分比，弹窗要显示「x MB / y MB」时用这两个 */
  const downloadedBytes = ref(0)
  const totalBytes = ref(0)
  const error = ref('')

  /**
   * 本机信息：初始化即采集，供「检测升级」详情页展示。
   * wgtVersion 为异步获取（需读 wgt 资源版本），其余同步可取。
   */
  const deviceId = ref(getDeviceId())
  const platform = ref(getPlatform())
  const nativeVersion = ref(getNativeVersionCode())
  const wgtVersion = ref(0)
  getWgtVersionCode().then(v => (wgtVersion.value = v))
  /** 服务端判定链路，排查问题时用（对应后台 Simulator 的 trace 时间线） */
  const trace = ref<string[]>([])

  function isAppPlatform(): boolean {
    // #ifdef APP-PLUS
    return true
    // #endif
    return false
  }

  function getPlatform(): string {
    // #ifdef APP-PLUS
    const os = plus.os?.name?.toLowerCase()
    if (os === 'ios') return 'ios'
    if (os === 'android') return 'android'
    // #endif
    return uni.getSystemInfoSync().platform || ''
  }

  function getNativeVersionCode(): number {
    // #ifdef APP-PLUS
    // ⚠️ 离线打包下 plus.runtime.versionCode 返回「当前装着的 Android 原生 APK 的 versionCode」
    //    （gradle 现在是 1；你 curl 里看到的 1487 是设备上那个旧 APK 的 versionCode，
    //     重装新包后就会变成 1），与 wgt 无关，即「原生壳版本」。读它就是对的，不用改 plus.android。
    return parseInt(plus.runtime.versionCode || '0', 10) || 0
    // #endif
    return 0
  }

  /**
   * 当前 wgt 资源版本。
   * ⚠️ 不能读 plus.runtime.versionCode —— 它返回的是装着的原生 APK 版本（gradle=1），
   *    拿不到 wgt 真实版本；必须用 getProperty 取 wgtinfo.versionCode：
   *    首次为 uni 基线 versionCode（manifest 的 versionCode），装 wgt 后为 wgt 包版本。
   */
  function getWgtVersionCode(): Promise<number> {
    // #ifdef APP-PLUS
    return new Promise((resolve) => {
      plus.runtime.getProperty(plus.runtime.appid, (wgtinfo: any) => {
        resolve(parseInt(wgtinfo?.versionCode || '0', 10) || 0)
      })
    })
    // #endif
    return Promise.resolve(0)
  }

  /** 设备唯一标识：App 端用 plus.device.uuid，其余生成并持久化一个随机 id */
  function getDeviceId(): string {
    // #ifdef APP-PLUS
    const uuid = plus.device?.uuid
    if (uuid) return String(uuid)
    // #endif
    let id = uni.getStorageSync('codepush_device_id')
    if (!id) {
      id = 'dev-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
      uni.setStorageSync('codepush_device_id', id)
    }
    return id
  }

  /** 检查更新：结果通过 visible/type/release 暴露给弹窗，同时返回判定结果供手动触发时区分提示 */
  async function check(): Promise<UpdateResult['type'] | 'skipped' | 'error'> {
    if (!options.appKey) {
      console.warn('[useUpdate] 缺少 appKey，跳过检查')
      return 'skipped'
    }
    if (!isAppPlatform() && !options.enableNonApp) {
      return 'skipped'
    }
    error.value = ''
    try {
      const wgtVersionCode = options.wgtVersionCode ?? (await getWgtVersionCode())
      const res = await checkUpdate({
        appKey: options.appKey,
        platform: getPlatform(),
        wgtVersionCode,
        nativeVersionCode: getNativeVersionCode(),
        channel: options.channel,
        deviceId: getDeviceId()
      })
      // 服务端说 none = 已是最新，静默（调用方据此弹「已是最新」提示）
      if (res.type === 'none') return 'none'
      type.value = res.type
      release.value = res.release
      note.value = res.note || ''
      trace.value = res.trace || []
      visible.value = true
      return res.type
    } catch (e) {
      // 网络/接口失败不应阻断用户正常使用，静默处理
      console.warn('[useUpdate] 检查更新失败', e)
      return 'error'
    }
  }

  /** 关闭弹窗（可选更新时用户点了「稍后再说」） */
  function dismiss() {
    visible.value = false
  }

  /** type=native：引导去应用商店升级原生 App */
  function goStore() {
    // #ifdef APP-PLUS
    if (getPlatform() === 'ios') {
      // TODO: 替换为真实 App Store id，例如 itms-apps://itunes.apple.com/app/idXXXXXXXXX
      plus.runtime.openURL('itms-apps://itunes.apple.com/app/idAPPLE_ID')
    } else {
      plus.runtime.openURL(`market://details?id=${plus.runtime.appid}`)
    }
    // #endif
    dismiss()
  }

  /** 下载并安装 wgt，安装完成后自动重启 */
  async function install() {
    if (!release.value?.fileUrl) return
    if (!isAppPlatform()) {
      // 非 App 平台无法 wgt 安装，降级为去商店
      type.value = 'native'
      return
    }
    downloading.value = true
    progress.value = 0
    downloadedBytes.value = 0
    totalBytes.value = 0
    error.value = ''
    const fileUrl = release.value.fileUrl
    const task = uni.downloadFile({
      url: fileUrl,
      success: (res) => {
        if (res.statusCode !== 200) {
          downloading.value = false
          toast('下载失败')
          return
        }
        // 下载完成 → 进度封顶 100，此后进入安装阶段（UI 上显示「安装中」而非卡在 100%）
        progress.value = 100
        // #ifdef APP-PLUS
        // force: true —— 跳过 uni 自带的版本号校验。
        // 服务端已用 type 决定要不要更新，客户端再校验一次纯属多余且必踩坑：
        // force:false 时 uni 会比较「新 wgt 包 versionCode」与「当前 app versionCode」，
        // 而离线壳的 plus.runtime.versionCode 返回的是整包 APK 版本（如 1487），
        // 远高于 wgt 包 versionCode（如 2）→ 判定"不高于现有版本"→ 报
        // -1205 WGT installation package manifest.json the version of the file does not match。
        plus.runtime.install(
          res.tempFilePath,
          { force: true },
          () => {
            downloading.value = false
            plus.runtime.restart()
          },
          (err: any) => {
            downloading.value = false
            toast('安装失败，请重试')
            console.warn('[useUpdate] 安装失败', err)
          }
        )
        // #endif
      },
      fail: () => {
        downloading.value = false
        toast('下载失败')
      }
    })
    task.onProgressUpdate((p: any) => {
      /**
       * 自己按字节算进度，比官方 p.progress 稳：
       * 服务端没返回 Content-Length 时 totalBytesExpectedToWrite 是 -1/0，官方 progress 会
       * 一直 0 或跳变；此时才退回 p.progress。
       * 下载阶段最多到 99%，100% 专门留给「下载完成 → 安装中」，避免进度条早早就顶满。
       */
      const total = Number(p?.totalBytesExpectedToWrite || 0)
      const written = Number(p?.totalBytesWritten || 0)
      totalBytes.value = total > 0 ? total : 0
      downloadedBytes.value = written > 0 ? written : 0
      progress.value =
        total > 0 ? Math.min(99, Math.round((written / total) * 100)) : Math.min(99, Number(p?.progress) || 0)
    })
  }

  return {
    visible,
    type,
    release,
    note,
    downloading,
    progress,
    downloadedBytes,
    totalBytes,
    error,
    // 本机信息 + 服务端判定链路（供「检测升级」详情页展示）
    deviceId,
    platform,
    nativeVersion,
    wgtVersion,
    trace,
    check,
    install,
    dismiss,
    goStore
  }
}
