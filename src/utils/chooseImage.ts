/**
 * 选一张合照并落成永久本地路径。
 *
 * uni.chooseImage 在 App 端返回的是临时文件，重启后会失效，所以再走一次 saveFile；
 * H5 / 小程序不支持 saveFile 时退回临时路径（本次会话内可见）——
 * 与 pkg-love/diary/edit.vue 的日记配图是同一套口径，纯本地方案的既定边界。
 * 取消或失败统一返回空串，调用方不用处理异常。
 */
export const chooseLocalImage = (): Promise<string> =>
  new Promise(resolve => {
    uni.chooseImage({
      count: 1,
      success: res => {
        const path = (res.tempFilePaths as string[])[0]
        if (!path) {
          resolve('')
          return
        }
        // H5 / 部分小程序没有 saveFile，直接退回临时路径
        if (typeof uni.saveFile !== 'function') {
          resolve(path)
          return
        }
        uni.saveFile({
          tempFilePath: path,
          success: r => resolve(r.savedFilePath),
          fail: () => resolve(path)
        })
      },
      fail: () => resolve('')
    })
  })
