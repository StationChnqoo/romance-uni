/**
 * 文件选择 / 压缩 / 上传相关的公共方法。
 *
 * 从 pkg-post/edit 与 pkg-dating/components/FileUploader 两处完全重复的代码里抽出来，
 * 之前两处各写了一份，改动极易漂移 —— 现在统一收敛到这里。
 *
 * 覆盖：
 * 1. pickDocument：App 端 uni.chooseFile 不可用，用 Native.js 调系统 ACTION_GET_CONTENT
 *    选择器，content:// 经 ContentResolver 流拷贝到 _doc 再上传（仅 Android）。
 * 2. 压缩：图片 1280 边界等比缩 + JPEG 80 + 体积回退（照搬 react-native-compressor@1.19.0
 *    的 auto 档）；视频长边 1280 + 帧率上限 30 + BPP 码率模型 + 小文件不压 + 体积回退
 *    （uni.compressVideo 原生转码；算法骨架同 RN 库 auto，但 maxSize、帧率上限、码率档位
 *     刻意不同，详见 VIDEO_MAX_SIZE / MAX_VIDEO_FPS / bppOf 处的注释）。
 *
 *    ⚠️ 锯齿根因 & 本次修复（A+C）：
 *    plus.zip.compressImage 在 Android 上的缩放重采样质量远低于 RN compressor（最近邻/低质量
 *    硬缩放），大倍率 downscale（截图 2340→1280、相机图 4000→1280）把文字高频细节混叠出锯齿，
 *    且混叠后 JPEG 更好压 → 同 quality 下文件反而更小。
 *    - A（治本 + 最优）：Android 改用 Native.js 调 android.graphics.Bitmap，做「分级减半
 *      （staged downsample）」双线性缩放（filter=true），即先按 1/2、1/4… 逐级减半到目标 2 倍内、
 *      再精确 bilinear 到目标——消除单步双线性在大倍率缩小下的混叠波纹（Glide/Fresco/Core Graphics
 *      同款）；iOS 走 plus.zip（Core Graphics 缩放质量本就较好，无需替换）。
 *    - C（针对文字图）：原图是 PNG（截图/UI 多为 PNG）时输出保 PNG 无损，跳过 JPEG 量化与 4:2:0
 *      色度子采样，文字边缘不渗色、不糊。
 *      ❗️格式判定用 `uni.getImageInfo` 返回的 **type**（原生真实格式），取不到才退回后缀
 *      `extOf(path) === 'png'`。两条禁令：① 禁止只看后缀（iOS 会给「名字 .PNG、内容 JPEG」的文件，
 *      判成无损 PNG 后 plus.zip 既不出 PNG 也不缩放 → 白压，见 compressImageAuto 的实测注释）；
 *      ② 禁止「读文件头魔数」——plus.io.FileReader 在 iOS App 上回调不触发，会让压缩永久卡死
 *      （2026-11-01，见 compressImageAuto 处的警告）。
 * 3. 路径工具：toAbsoluteUrl（归一化成 file:// URI 给 uni API）、fileUrlToPath（file://
 *    URI 转纯路径给 Java 流）。
 *
 * ⚠️ 两个踩过的坑（都体现在下面实现里）：
 * - plus.io.convertLocalFileSystemURL 返回的是 file:// URI，不能直接喂给 Java 的
 *   FileOutputStream（只认纯路径），否则写出「大小对、内容坏」的文件。
 * - InputStream.read(byte[]) 经 Native.js 反射后返回值是 java.lang.Integer 对象，
 *   手写 `while(len>0)` + 三参数 write 都不可靠，改系统级 FileUtils.copy 一步到位。
 */

/** 把任意本地路径归一化成 file:// 绝对路径（getImageInfo / compressImage 对 _doc 相对路径、含中文名路径不稳） */
export const toAbsoluteUrl = (p: string) => {
  if (typeof plus === 'undefined') return p
  try {
    return plus.io.convertLocalFileSystemURL(p)
  } catch {
    return p
  }
}

/**
 * 把 file:// URI 转成纯文件系统路径（供 Java 的 FileOutputStream 等原生类使用）。
 * convertLocalFileSystemURL 返回的是 file:///storage/... 这种 URI，
 * 而 FileOutputStream 只认纯路径，直接喂 URI 会写坏/写空文件。
 */
export const fileUrlToPath = (p: string) => {
  if (!p) return p
  return p.replace(/^file:\/\//, '')
}

/** 取扩展名（小写、不含点） */
export const extOf = (name: string) => (name.split('.').pop() || '').toLowerCase()

/** 图片 / 视频的扩展名（「选择文件」选到媒体时改走压缩流程） */
export const IMAGE_EXTS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'heic']
export const VIDEO_EXTS = ['mp4', 'mov', 'avi', 'mkv', '3gp', 'flv', 'wmv', 'm4v', 'webm']

/** 取本地临时文件大小（字节），取不到按 0 */
export const getFileSize = (filePath: string) =>
  new Promise<number>(resolve => {
    uni.getFileInfo({
      filePath,
      success: res => resolve(res.size || 0),
      fail: () => resolve(0)
    })
  })

/**
 * 把本地临时文件的「文件名部分」改成全小写（目录不动），用于上传前归一。
 *
 * ★ 为什么：uni.uploadFile 以 filePath 的 basename 作为 multipart 文件名发给后端，
 *   后端（PicGo 默认行为）若按原始文件名落库 / 生成 objectKey，就会把 .PNG / .MOV 这类
 *   大写后缀原样存进去，导致 CDN URL、objectKey 大小写不一、回源/缓存踩坑。
 *   iOS 经 chooseImage / chooseVideo 得到的临时文件名正是大写后缀（xxx.PNG / xxx.MOV），
 *   故在上传入口统一把文件名转小写。
 *
 * - 只在 App（有 plus.io）下真改名；非 App 端无本地文件操作能力，原样返回。
 * - 已经全小写 → 不改动，原样返回。
 * - 小写名已存在（与当前仅大小写不同）→ 不覆盖、保留原路径，避免误删其它文件。
 * - 任何异常 → 原样返回原路径，上传照常进行（最坏只是名字没小写，绝不让上传失败）。
 * - 超过 2s 没结果 → 也按原路径返回。plus.io 的回调在个别机型上可能一个都不回
 *   （同一类坑造成过「一直停在正在压缩」），改名只是锦上添花，绝不能把上传卡死。
 */
const RENAME_TIMEOUT = 2000

export const renameToLowercase = (filePath: string): Promise<string> => {
  if (typeof plus === 'undefined') return Promise.resolve(filePath)
  let url: string
  try {
    url = toAbsoluteUrl(filePath)
  } catch {
    return Promise.resolve(filePath)
  }
  const lastSlash = url.lastIndexOf('/')
  if (lastSlash < 0) return Promise.resolve(filePath)
  const dir = url.slice(0, lastSlash)
  const base = url.slice(lastSlash + 1)
  const lower = base.toLowerCase()
  // 已经全小写 → 不必改名
  if (lower === base) return Promise.resolve(filePath)

  const renaming = new Promise<string>(resolve => {
    plus.io.resolveLocalFileSystemURL(
      url,
      (entry: any) => {
        plus.io.resolveLocalFileSystemURL(
          dir,
          (parent: any) => {
            // 小写名已存在（与当前仅大小写不同）→ 不覆盖，保留原路径
            parent.getFile(
              lower,
              { create: false },
              () => resolve(filePath),
              () => {
                entry.moveTo(
                  parent,
                  lower,
                  () => resolve(`${dir}/${lower}`),
                  () => resolve(filePath)
                )
              }
            )
          },
          () => resolve(filePath)
        )
      },
      () => resolve(filePath)
    )
  })
  const timeout = new Promise<string>(resolve => {
    setTimeout(() => resolve(filePath), RENAME_TIMEOUT)
  })
  return Promise.race([renaming, timeout])
}

/* ==================== 压缩 ==================== */

/** react-native-compressor auto 默认参数：图片边界宽高与 JPEG 质量 */
const COMPRESS_MAX_WIDTH = 1280
const COMPRESS_MAX_HEIGHT = 1280
const COMPRESS_QUALITY = 80

/**
 * 视频自动压缩的目标长边上限。
 *
 * ★ 这里**故意不跟** react-native-compressor@1.19.0 的 auto 默认值 640：
 *   那个档位是给「聊天发小视频」设计的（库源码注释自证 "acceptable for chat playback"），
 *   输出只有 640×360，在手机全屏播放是糊的。本 App 的视频是云盘/笔记附件，要存档回看，
 *   故提到 1280（720p 级）。其余算法（长边等比缩、取偶、不放大、clamp 结构）
 *   仍与 RN 库逐行一致。
 */
const VIDEO_MAX_SIZE = 1280

/**
 * 每像素比特数（BPP）阶梯：分辨率越低编码效率越差，单位像素要给的码率越多。
 *
 * 取代了 RN 库的「WhatsApp 风格写死分档表」。写死表的毛病是 ceiling 是个与分辨率脱钩的
 * 硬顶——目标长边 <720 一律锁死 900kbps，源码率 6Mbps 还是 40Mbps 都被按到同一个值，
 * 且分辨率一提高 ceiling 就跟不上（1080p 只给 3.5Mbps → BPP 0.056，明显劣化）。
 * BPP 模型让码率随分辨率、帧率自动缩放，各档画质一致。
 *
 * 校准口径（H.264 High + 手机播放）：BPP ≥0.10 富余 / 0.07~0.10 良好 /
 * 0.05~0.07 可接受 / <0.05 明显劣化。
 */
const bppOf = (targetLongSide: number): number => {
  if (targetLongSide >= 1920) return 0.075
  if (targetLongSide >= 1280) return 0.09
  if (targetLongSide >= 960) return 0.105
  return 0.125
}

/**
 * 帧率效率因子：帧率越高，相邻帧冗余越大，码率不该按帧率线性翻倍。
 * 校准自 YouTube 建议值 720p60 / 720p30 = 7.5 / 5 = 1.5 倍（不是 2 倍）→ (30/60)^0.4 ≈ 0.76。
 * 不加这个的话 60fps 源在同等画质下会白拿一倍码率（BPP 模型按 fps 线性给）。
 */
const fpsFactor = (fps: number): number => Math.pow(30 / Math.max(fps, 1), 0.4)

/**
 * 输出帧率上限。
 *
 * ★ 这里**故意不跟** react-native-compressor 的 clamp 1..60：
 *   60fps 对云盘/笔记附件没什么存档价值（那是给慢动作、游戏录屏用的），而 60fps 档在
 *   BPP 模型下只有 0.068（卡在「可接受」下沿），27MB/分钟是花在「帧多」上、不是「每帧清晰」。
 *   降到 30fps：体积省 34%，2:1 规整丢帧（无 judder），BPP 反而升到 0.090（每帧更清晰）。
 *
 *   ⚠️ 别改 24：体积 ∝ fps^0.6 是次线性的（帧少了每帧残差变大 + fpsFactor 反向补码率），
 *   30→24 只省 12.5%，却换来 1.25:1 的丢帧抖动；60→24 更是 2.5:1，快速运动直接频闪。
 *
 *   ⚠️ 必须用 min 而不是写死 30：24fps 电影感片源、延时摄影这类低帧率源要保留原帧率，
 *   否则会被强行升帧，体积反而变大。
 */
const MAX_VIDEO_FPS = 30

/** 小于这个体积的视频直接不压（重编码收益极低，还容易被码率 floor 顶到「越压越大」） */
const MIN_VIDEO_BYTES = 1024 * 1024

/** 尺寸取偶（最小 2，奇数减 1） */
const evenDimension = (v: number) => {
  const p = Math.max(2, Math.round(v))
  return p % 2 === 0 ? p : p - 1
}

/** App 端原生压缩（iOS / 非 Android）：plus.zip.compressImage（iOS 走 Core Graphics，缩放质量较好） */
const compressNative = (filePath: string, w: number, h: number, png: boolean) =>
  new Promise<string | null>(resolve => {
    plus.zip.compressImage(
      {
        src: toAbsoluteUrl(filePath),
        dst: toAbsoluteUrl(`_doc/compress_${Date.now()}.${png ? 'png' : 'jpg'}`),
        quality: png ? 100 : COMPRESS_QUALITY,
        width: `${w}px`,
        height: `${h}px`,
        format: png ? 'png' : 'jpg',
        overwrite: true
      },
      (res: { target: string }) => resolve(res.target),
      () => resolve(null)
    )
  })

/**
 * Android 高质量缩小：分级减半（staged downsample），对标 Glide / Fresco / iOS Core Graphics。
 * 单次双线性只取 2×2 邻域，对 3 倍以上的大幅缩小会欠采样 → 细文字/网格线残留混叠波纹；
 * 这里先按 1/2、1/4、1/8… 逐级减半（每级采样比 ≤2，双线性接近理想），落到目标 2 倍内
 * 再做最后一步精确 bilinear 到目标尺寸。filter=true → 双线性插值，文字边缘平滑。
 */
const createScaledBitmapStaged = (Bitmap: any, src: any, w: number, h: number): any => {
  let current = src
  let cw = src.getWidth()
  let ch = src.getHeight()
  while (cw / 2 >= w && ch / 2 >= h) {
    const nw = Math.floor(cw / 2)
    const nh = Math.floor(ch / 2)
    const half = Bitmap.createScaledBitmap(current, nw, nh, true)
    if (current !== src) current.recycle()
    current = half
    cw = nw
    ch = nh
  }
  const final = Bitmap.createScaledBitmap(current, w, h, true)
  if (current !== src) current.recycle()
  return final
}

/**
 * Android 专用：Native.js 调 android.graphics.Bitmap 高质量分级减半缩放 + 编码。
 * 灭掉 plus.zip.compressImage 硬缩放（最近邻/低质量）导致的文字锯齿，并进一步用
 * staged downsample 消除单步双线性在大倍率缩小下的混叠波纹（真正最优缩小）。
 */
const compressNativeAndroid = (filePath: string, w: number, h: number, png: boolean) =>
  new Promise<string | null>(resolve => {
    try {
      const Bitmap = plus.android.importClass('android.graphics.Bitmap') as any
      const BitmapFactory = plus.android.importClass('android.graphics.BitmapFactory') as any
      const Options = plus.android.importClass('android.graphics.BitmapFactory$Options') as any
      const CompressFormat = plus.android.importClass('android.graphics.Bitmap$CompressFormat') as any
      const FileOutputStream = plus.android.importClass('java.io.FileOutputStream') as any

      const absSrc = fileUrlToPath(toAbsoluteUrl(filePath))
      const src = BitmapFactory.decodeFile(absSrc, new Options())
      if (!src) { resolve(null); return }
      const scaled = createScaledBitmapStaged(Bitmap, src, w, h)
      const dst = `_doc/compress_${Date.now()}.${png ? 'png' : 'jpg'}`
      const out = new FileOutputStream(fileUrlToPath(toAbsoluteUrl(dst)))
      scaled.compress(png ? CompressFormat.PNG : CompressFormat.JPEG, png ? 100 : COMPRESS_QUALITY, out)
      out.flush()
      out.close()
      src.recycle()
      scaled.recycle()
      resolve(toAbsoluteUrl(dst))
    } catch {
      resolve(null)
    }
  })

/** 按目标尺寸/格式编码一次：Android 走 Native.js 高质量缩放，iOS / 其它端走 plus.zip。失败返回 null */
const encodeImage = (filePath: string, w: number, h: number, png: boolean) =>
  plus.os.name === 'Android'
    ? compressNativeAndroid(filePath, w, h, png)
    : compressNative(filePath, w, h, png)

/** 图片 auto 压缩：1280 边界等比缩 + JPEG 80（真 PNG 输入优先保无损）+ 压完不比原图小就退回原文件；
 *  Android 走 Native.js 双线性高质量缩放灭锯齿，iOS 走 plus.zip（Core Graphics 质量已较好）。
 *
 *  ★ 永远返回「可直接上传的路径」（最坏就是原图），**不返回 null**：
 *    null 会让调用方走另一条 UI，导致同类型文件有的弹「压缩完成」有的静默上传。
 *    现在调用方拿到路径就能无条件弹「压缩完成（前后大小/压缩率）」，UI 与压缩结果彻底解耦。 */
export const compressImageAuto = async (filePath: string): Promise<string> => {
  const info = await new Promise<{ width: number; height: number; type: string } | null>(resolve => {
    uni.getImageInfo({
      src: toAbsoluteUrl(filePath),
      success: it =>
        resolve({ width: it.width, height: it.height, type: String(it.type || '') }),
      fail: () => resolve(null)
    })
  })
  if (!info) return filePath
  const originalSize = await getFileSize(filePath)

  let w = info.width
  let h = info.height
  if (h > COMPRESS_MAX_HEIGHT || w > COMPRESS_MAX_WIDTH) {
    const imgRatio = w / h
    const maxRatio = COMPRESS_MAX_WIDTH / COMPRESS_MAX_HEIGHT
    if (imgRatio < maxRatio) {
      w = Math.round((COMPRESS_MAX_HEIGHT / h) * w)
      h = COMPRESS_MAX_HEIGHT
    } else if (imgRatio > maxRatio) {
      h = Math.round((COMPRESS_MAX_WIDTH / w) * h)
      w = COMPRESS_MAX_WIDTH
    } else {
      w = COMPRESS_MAX_WIDTH
      h = COMPRESS_MAX_HEIGHT
    }
  }

  // 输出格式按「真实内容」判定，**不按文件名后缀**。
  //
  // ★ 2026-11-01 实测血案：iOS 相册/选择器给的临时文件会出现「名字叫 xxx.PNG、内容其实是 JPEG」
  //   （Exif 的 datetime/density 都是系统重编码时写进去的）。原实现只看后缀 → 判成无损 PNG →
  //   而 plus.zip 在 iOS 上并不支持 png 输出、也不按 width/height 缩放（用户实测上传结果：
  //   内容 JPEG、尺寸仍是原像素 1170×1603、名字 .PNG）→ 等于白压一遍、体积几乎不变「像没压缩」。
  //   这里改用 uni.getImageInfo 返回的 type —— 原生的真实格式，且不走 plus.io.FileReader
  //   （那个在 iOS App 上回调不触发会把压缩卡死，见下方警告，禁止使用）。type 取不到才退回后缀。
  const realType = info.type.toLowerCase()
  const outputPng = realType ? realType === 'png' : extOf(filePath) === 'png'

  // 非 App 端没有 plus，无法压缩，直接上传原文件
  if (typeof plus === 'undefined') return filePath

  // 主候选：真 PNG（文字截图/UI 图）保无损 PNG，跳过 JPEG 量化与 4:2:0 色度子采样，文字不渗色；
  // 其余（JPEG 照片等）一律 JPEG 80。
  const primary = await encodeImage(filePath, w, h, outputPng)
  const primarySize = primary ? await getFileSize(primary) : 0
  if (primary && primarySize > 0 && primarySize < originalSize) return primary

  // 兜底：主候选没压小 —— 真 PNG 大图的「无损」重编码常与源持平甚至更大；iOS 上 plus.zip 不缩放
  // 时更是必然不缩。这时用 JPEG 80 再编一次（有损但必然变小），取更小者。
  // 口径：文字图**优先无损**，只在「无损压不动」时才降级，保证任何图都真能压下来。
  if (outputPng) {
    const jpeg = await encodeImage(filePath, w, h, false)
    const jpegSize = jpeg ? await getFileSize(jpeg) : 0
    if (jpeg && jpegSize > 0 && jpegSize < originalSize) return jpeg
  }

  // 两种编码都没压小（源图本就高度优化 / 体积取不到）→ 一律用原图。
  // 这属于「没必要压缩」而非失败，照样弹「压缩完成」让用户看到 0.0% 前后对比。
  return filePath
}

/**
 * 视频 auto 压缩：长边 1280 + 帧率上限 30 + BPP 码率模型，最后 uni.compressVideo 原生转码。
 *
 * 与 RN 库 auto 一致的部分：长边等比缩、取偶、不放大、帧率取不到时用 30、
 * 码率 clamp 结构（floor ≤ scaled ≤ min(ceiling, sourceCap)）。
 * 刻意不同的部分：maxSize 640→1280（见 VIDEO_MAX_SIZE）、码率分档表→BPP 模型（见 bppOf）、
 * 帧率上限 60→30（见 MAX_VIDEO_FPS）。
 *
 * 与 compressImageAuto 同口径：**永远返回可直接上传的路径**（最坏是原图），不返回 null，
 * 这样调用方对图片/视频的 UI 完全一致（无条件弹「压缩完成」）。
 */
export const compressVideoAuto = (filePath: string) =>
  new Promise<string>(resolve => {
    uni.getVideoInfo({
      src: toAbsoluteUrl(filePath),
      success: async info => {
        const srcW = info.width
        const srcH = info.height
        if (!srcW || !srcH) {
          resolve(filePath)
          return
        }

        // 小文件不压：重编码收益极低，而码率 floor 可能把它顶到比原文件还大
        const originalSize = await getFileSize(filePath)
        if (originalSize > 0 && originalSize < MIN_VIDEO_BYTES) {
          resolve(filePath)
          return
        }

        const sw = evenDimension(srcW)
        const sh = evenDimension(srcH)
        const srcLong = Math.max(sw, sh)
        let tw = sw
        let th = sh
        if (srcLong > VIDEO_MAX_SIZE) {
          const scale = VIDEO_MAX_SIZE / srcLong
          tw = evenDimension(sw * scale)
          th = evenDimension(sh * scale)
        }
        const targetLong = Math.max(tw, th)

        const srcFps = info.fps || 0
        // 取不到帧率时用 30（RN 库同）；否则取源帧率但不超 MAX_VIDEO_FPS，
        // 且不低于 1 —— 低帧率源（24fps 电影感、延时摄影）保留原帧率，绝不升帧
        const fps = srcFps <= 0 ? 30 : Math.min(MAX_VIDEO_FPS, Math.max(1, srcFps))

        let srcBitrateBps = (info.bitrate || 0) * 1000
        if (srcBitrateBps <= 0 && info.duration > 0 && info.size > 0) {
          srcBitrateBps = (info.size * 1024 * 8) / info.duration
        }

        // 目标码率 = 像素 × 帧率 × BPP × 帧率效率因子；floor 给 60% 留退化空间，ceiling 即目标值
        const wantBps = tw * th * fps * bppOf(targetLong) * fpsFactor(fps)
        const floor = wantBps * 0.6
        const ceiling = wantBps
        let bitrateBps = floor
        if (srcBitrateBps > 0) {
          const pixelRatio = (tw * th) / (srcW * srcH)
          const fpsRatio = Math.max(fps / Math.max(srcFps, 1), 0.85)
          const scaledBitrate = srcBitrateBps * pixelRatio * fpsRatio
          // 源本身撑不到 ceiling 时按源的 90% 走，绝不凭空把码率抬上去
          const sourceCap = Math.max(srcBitrateBps * 0.9, floor)
          bitrateBps = Math.min(Math.max(scaledBitrate, floor), Math.min(ceiling, sourceCap))
        }

        const resolution = Math.min(1, targetLong / Math.max(srcW, srcH))

        // ★ 短路：目标绝对码率压不过源码率时，重编码不可能减小体积 —— 直接返回原文件，
        //   省掉整段无谓重编码。视频文件大小 ≈ 码率 × 时长（与分辨率无直接关系，分辨率只决定
        //   「同画质下需要多少码率」，时长不变、编码器同为 H.264，目标码率 ≥ 源码率 → 输出 ≥ 源）。
        //   典型如本身已是低码率的 640×360 小视频：不缩放（resolution=1）、源码率低于我们的
        //   floor，若强行整段重编码，只会白转几分钟、最后越压越大退化回原文件、显示「压缩率 0%」。
        //   真正能压小的视频（高码率 / 需缩放，目标码率 < 源码率）照常走下方编码。
        if (srcBitrateBps > 0 && bitrateBps >= srcBitrateBps) {
          resolve(filePath)
          return
        }

        uni.compressVideo({
          src: toAbsoluteUrl(filePath),
          bitrate: Math.round(bitrateBps / 1000),
          fps,
          resolution: Math.round(resolution * 100) / 100,
          success: async (res: any) => {
            const output: string = res.tempFilePath
            // 压完没变小就退回原文件 —— 对齐 compressImageAuto 的口径。
            // 少了这一步，低码率小视频会被码率 floor 顶大，弹窗里就出现「压缩率 -66.7%」。
            const compressedSize = await getFileSize(output)
            if (compressedSize > 0 && compressedSize < originalSize) resolve(output)
            else resolve(filePath)
          },
          fail: () => resolve(filePath)
        })
      },
      fail: () => resolve(filePath)
    })
  })

/** 压缩入口：按 isImage 分流。两者都保证返回可直接上传的路径（最坏是原图） */
export const compressFile = (filePath: string, isImage: boolean): Promise<string> =>
  isImage ? compressImageAuto(filePath) : compressVideoAuto(filePath)

/* ==================== 选择文件（Native.js） ==================== */

const DOCUMENT_PICK_CODE = 1001

export interface PickedDocument {
  /** file:// URI，给 getImageInfo / compressImage / uploadFile 用 */
  path: string
  /** 原始显示名（可能含中文/空格） */
  name: string
  /** 字节大小（来自 SAF 元数据，可能为 0） */
  size: number
}

/**
 * 选择文件：App 端 uni.chooseFile 不可用，用 Native.js 调系统文件选择器
 * （ACTION_GET_CONTENT），content:// 经 ContentResolver 流拷贝到 _doc 再上传。仅 Android。
 *
 * 返回 null 表示取消或失败。拷贝目标文件名只保留扩展名 + 时间戳，去掉中文/空格等
 * 特殊字符 —— getImageInfo / compressImage 对含中文名的 _doc 绝对路径解析不稳。
 */
export const pickDocument = () =>
  new Promise<PickedDocument | null>(resolve => {
    const main: any = plus.android.runtimeMainActivity()
    const Intent: any = plus.android.importClass('android.content.Intent')
    const intent = new Intent(Intent.ACTION_GET_CONTENT)
    intent.setType('*/*')
    intent.addCategory(Intent.CATEGORY_OPENABLE)
    // 回调每次唤起前重新注册（Native.js 的惯例）
    main.onActivityResult = (requestCode: number, resultCode: number, resultData: any) => {
      if (requestCode !== DOCUMENT_PICK_CODE) return
      // resultCode -1 = RESULT_OK；其余（含用户取消）按放弃处理
      if (resultCode !== -1 || !resultData) {
        resolve(null)
        return
      }
      try {
        plus.android.importClass(resultData)
        const uri = resultData.getData()
        plus.android.importClass(uri)
        const resolver = main.getContentResolver()
        plus.android.importClass(resolver)

        // SAF 授权的 content:// 无真实路径，先查显示名和大小
        let name = ''
        let size = 0
        const cursor = resolver.query(uri, ['_display_name', '_size'], null, null, null)
        plus.android.importClass(cursor)
        if (cursor && cursor.moveToFirst()) {
          name = cursor.getString(0) || ''
          size = Number(cursor.getLong(1) || 0)
          cursor.close()
        }
        if (!name) name = String(uri.getLastPathSegment() || `file_${Date.now()}`)

        const safeExt = extOf(name) ? `.${extOf(name)}` : ''
        const safeName = `upload_${Date.now()}${safeExt}`
        const dstRelative = `_doc/${safeName}`
        const dstUrl = plus.io.convertLocalFileSystemURL(dstRelative) // file:// URI，给 uni API 用
        const dstPath = fileUrlToPath(dstUrl) // 纯路径，给 Java 流用

        // 用系统级 FileUtils.copy(InputStream, OutputStream) 拷贝，不手写 read/write 循环：
        // InputStream.read 的返回值在 Native.js 反射下是 java.lang.Integer 对象，
        // `while (len > 0)` 与三参数 write 重载都不可靠，会写出「大小对、内容坏」的文件。
        const input = resolver.openInputStream(uri)
        plus.android.importClass(input)
        const FileOutputStream: any = plus.android.importClass('java.io.FileOutputStream')
        const fos = new FileOutputStream(dstPath)
        plus.android.importClass(fos)
        const FileUtils: any = plus.android.importClass('android.os.FileUtils')
        FileUtils.copy(input, fos)
        fos.flush()
        fos.close()
        input.close()
        resolve({ path: dstUrl, name, size })
      } catch (e) {
        resolve(null)
      }
    }
    main.startActivityForResult(intent, DOCUMENT_PICK_CODE)
  })
