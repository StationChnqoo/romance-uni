<!--
  通用附件上传（相亲模块用）
  由 cloud-react-native/src/components/FileUploader.tsx 迁移（与 RN 里跨 Post / Media / Dating 复用的定位一致）。

  两种形态：
  - `mode="files"`（默认）：一行「选择文件 / 选择图片·视频」按钮 + 下方附件行列表。
    每行 = 缩略图（图片）/ wd-icon（其它类型） + 名称（可点击改名） + 大小|时间 + 分享（复制链接） + 删除（确认后连 COS 一起删）。
  - `mode="avatar"`：一个大圆头像（点击即选图）+ 提示文字，只保留一张（多选也只留最后一张）。
    相亲编辑页的头像用它，不再自己画一套。

  上传链路与 pkg-post/edit 完全一致（那页的实现在 RN 侧验证过，这里照搬，避免两条口径漂）：
  1. 选媒体：uni 没有 RN 那种 mediaType=mixed 的混合选择器 → 拆 chooseImage / chooseVideo，用 wd-action-sheet 二选一；
  2. 选文件：App 端 uni.chooseFile 不可用 → Native.js 调系统 ACTION_GET_CONTENT，content:// 流拷贝到 _doc 再传（仅 Android）；
  3. 压缩两步确认（受 stores/media 的 enableCompressUpload 控制，默认开）：文件信息(是否压缩) -> 正在压缩 ->
     压缩完成(前后大小 + 压缩率，是否继续上传)。**「压缩完成」每次都弹**，不因「有没有压小」分叉
     （压不小就用原图，压缩率显示 0.0%，方便对比前后）。
     不压缩则「上传确认」后传原文件。
     算法照搬 RN 实际依赖的 react-native-compressor@1.19.0 auto：图片 1280 边界等比缩 + JPEG 80（PNG 输入保无损）
     + 压完不比原图小就退回原文件；Android 走 Native.js 双线性高质量缩放灭锯齿、iOS 走 plus.zip（Core Graphics 质量好）；
     视频长边 1280 + BPP 码率模型 + 帧率上限 30（uni.compressVideo 原生转码）。
  4. 上传走 /upload/cloud（api/sdk.ts 的 uploadCloud）；上传成功把 PicGoSrc 追加进 v-model。

  ⚠️ 预览：图片走 uni 自己的 previewImage；视频跳通用播放页 PreviewVideo；office 文档下载后交系统查看器；
     其余类型弹提示（RN 的 PreviewMarkdown 未迁移）。

  用法：`<FileUploader v-model:images="form.attachments" />`
       `<FileUploader v-model:images="avatarList" mode="avatar" />`
-->
<template>
  <view class="fu">
    <!-- 头像形态：一个大圆 + 点击选图，不做列表；有图时右上角带删除角标 -->
    <view v-if="mode === 'avatar'" class="fu__avatar-wrap">
      <view class="fu__avatar-box">
        <view class="fu__avatar" hover-class="fu__avatar--hover" @click="onAvatarPick">
          <image
            v-if="images[0]?.url"
            class="fu__avatar-img"
            :src="mediaUrl(images[0].url)"
            mode="aspectFill" />
          <wd-icon v-else name="add" />
        </view>
        <!-- 删除角标：只在点已有头像时出现，@click.stop 避免误触选图 -->
        <view
          v-if="images[0]?.url"
          class="fu__avatar-del"
          @click.stop="onAvatarDelete">
          <wd-icon name="close" color="#fff" size="14px" />
        </view>
      </view>
      <text class="fu__avatar-tip">
        {{ images[0]?.url ? '点击可更换头像' : '点击上传头像' }}
      </text>
    </view>

    <!-- 附件形态：按钮行 + 文件行列表 -->
    <template v-else>
      <!-- ★ 上传期间**不置灰按钮**：改用全屏 loading 遮罩挡住交互（见模板末尾的 wd-overlay）。
           置灰会让用户以为功能被禁用，且看不出「正在上传」这个事实；遮罩语义更准确，
           按钮保持常态，遮罩一消失就能继续选下一个。 -->
      <view class="fu__btns">
        <MoreButton v-if="document" label="选择文件" @press="onDocumentSelect" />
        <view v-if="document" class="fu__btns-gap" />
        <MoreButton label="选择图片/视频" @press="mediaPickerVisible = true" />
      </view>

      <view v-if="images.length" class="fu__list">
        <view v-for="(file, index) in images" :key="file.id || index" class="fu__file">
          <image
            v-if="getFile(file).type === PicGoFileType.Image"
            class="fu__file-icon"
            :src="getFile(file).src"
            mode="aspectFill"
            @click="onPreviewFile(file)" />
          <view v-else class="fu__file-icon fu__file-icon--doc" @click="onPreviewFile(file)">
            <wd-icon :name="getFile(file).icon" :color="getFile(file).iconColor" size="56rpx" />
          </view>
          <view class="fu__file-body">
            <text
              class="fu__file-name"
              @click="renameable ? onEditName(index) : undefined">
              {{ file.name || '未命名附件' }}
            </text>
            <text class="fu__file-meta">{{ fileMeta(file) }}</text>
          </view>
          <!-- 分享：复制附件链接（与 pkg-post/detail 的文件分享同口径，App 端没有系统文件分享面板） -->
          <view class="fu__file-share" @click="onShareFile(file)">
            <wd-icon name="share" color="#666" size="16px" />
          </view>
          <view class="fu__file-del" @click="onFileDelete(file)">
            <wd-icon name="delete" color="#ff5252" size="16px" />
          </view>
        </view>
      </view>
    </template>

    <!-- 媒体类型二选一（uni 没有混合选择器）
         ★ 层级：wot 弹层默认 zIndex=10 且不开 root-portal，本组件嵌在编辑页 z-paging
           （.z-paging-content 是 position:relative + overflow:hidden）里，弹层节点会被困在
           这个滚动容器里，遮罩盖不到 z-paging 之外的底部「取消/保存」按钮。
           与编辑页 wd-datetime-picker / DialogContainer 同口径：传送到页面根 + 显式 999，
           仍低于 Dialog 9990、toast 9999。 -->
    <wd-action-sheet
      v-model="mediaPickerVisible"
      :root-portal="true"
      :z-index="999"
      :actions="[{ name: '图片' }, { name: '视频' }]"
      :close-on-click-action="true"
      cancel-text="取消"
      @select="onMediaTypeSelect" />

    <!-- 附件改名 -->
    <InputDialog
      :show="renameVisible"
      title="请输入"
      message="请输入文件名称"
      :value="renameDraft"
      placeholder="请输入"
      confirm-text="确定"
      @close="renameVisible = false"
      @confirm="onRenameConfirm" />

    <!--
      ★ 上传中 loading 遮罩 —— 用 wot 现成的两个组件组合，不自己画：
        · wd-overlay：position:fixed 四边 0，自带半透明背景 + fade 过渡 + lock-scroll，
                     是 wot 里唯一的全屏遮罩组件；
        · wd-loading：SVG 转圈（type=ring），size 走 addUnit（数字按 px）。
      层级 200：按项目约定（自定义浮层 200），且**必须低于自绘 toast(9999) 与 Dialog(9990)** ——
      上传失败时 toast 要能盖在遮罩之上，否则提示被挡住看不见。
      duration=0：上传结束立刻撤掉，不留淡出尾帧挡提示。
    -->
    <wd-overlay :show="uploading" :z-index="200" :duration="0">
      <view class="fu__mask">
        <wd-loading type="ring" color="#ffffff" :size="24" />
        <text class="fu__mask-text">上传中…</text>
      </view>
    </wd-overlay>
  </view>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import InputDialog from '@/components/InputDialog.vue'
import MoreButton from '@/components/MoreButton.vue'
import { Dialog } from '@/components/Dialog'
import { Router } from '@/common/router'
import { deleteCosFile, uploadCloud } from '@/api/sdk'
import { useMediaStore } from '@/stores/media'
import {
  getFile,
  mediaUrl,
  openOfficeDocument,
  PicGoFileType,
  toast
} from '@/utils'
import {
  IMAGE_EXTS,
  VIDEO_EXTS,
  extOf,
  getFileSize,
  compressFile,
  pickDocument
} from '@/utils/file'
import type { PicGoSrc } from '@/types/media'

type FileEntry = { src: PicGoSrc; index: number }

const props = withDefaults(
  defineProps<{
    images: PicGoSrc[]
    /** 'files' 附件列表（多张） / 'avatar' 单张头像（只有一个大圆） */
    mode?: 'files' | 'avatar'
    /** 'files' 模式下是否给「选择文件」入口（纯媒体场景可关） */
    document?: boolean
    /** 'files' 模式下点文件名可否改名 */
    renameable?: boolean
  }>(),
  { mode: 'files', document: true, renameable: true }
)

const emit = defineEmits<{ (e: 'update:images', images: PicGoSrc[]): void }>()

const images = computed(() => props.images || [])
/** 写回：头像形态只有一张，多张时取最后一张（RN 的 setAvatarImages 同款） */
const setImages = (list: PicGoSrc[]) => {
  emit('update:images', props.mode === 'avatar' && list.length > 1 ? list.slice(-1) : list)
}

const fileMeta = (file: PicGoSrc) =>
  `${(file.size / 1024 / 1024).toFixed(2)}MB | ${file.updateAt}`

const mediaStore = useMediaStore()

/* ---------------- 上传 ---------------- */
const uploading = ref(false)

const doUpload = async (filePath: string) => {
  uploading.value = true
  try {
    const picGo = await uploadCloud(filePath)
    if (picGo?.url) {
      setImages([...images.value, picGo])
    } else {
      toast('上传失败，请重试')
    }
  } catch (error) {
    toast('上传失败，请重试')
  } finally {
    uploading.value = false
  }
}

/** 选中后的完整流程：文件信息(是否压缩) → 压缩 → 压缩完成(前后大小+压缩率，是否继续上传) */
const onPicked = async (filePath: string, isImage: boolean, displayName?: string) => {
  const fileName = (displayName || filePath.split('/').pop() || '未知').toLowerCase()
  const size = await getFileSize(filePath)
  const sizeInMB = (size / (1024 * 1024)).toFixed(2)

  // 开关关闭：不弹任何确认，直接传
  if (!mediaStore.enableCompressUpload) {
    doUpload(filePath)
    return
  }

  // 第一步：文件信息，是否压缩
  const firstConfirm = await Dialog.show({
    title: '文件信息',
    message: `文件名：${fileName}\n文件大小：${sizeInMB} MB\n\n是否进行压缩？`,
    positiveText: '是',
    negativeText: '否'
  })

  if (firstConfirm !== 'confirm') {
    const noCompressConfirm = await Dialog.show({
      title: '上传确认',
      message: `文件名：${fileName}\n文件大小：${sizeInMB} MB\n\n是否直接上传原文件？`,
      positiveText: '是',
      negativeText: '否'
    })
    if (noCompressConfirm === 'confirm') doUpload(filePath)
    return
  }

  uni.showLoading({ title: '正在压缩', mask: true })
  let finalPath = filePath
  try {
    finalPath = await compressFile(filePath, isImage)
  } finally {
    uni.hideLoading()
  }

  // 第二步：压缩完成，**无条件**展示前后对比。
  // ★ 绝不按「压完有没有变小」决定弹不弹——那会让同类型 PNG 有的弹有的静默上传
  //   （2026-11-01 血案）。没压小时 compressFile 已回退原文件，这里显示的「压缩后」
  //   就是实际要上传的那个文件，压缩率自然 0.0%，并标注「未变小」。
  const finalSize = (await getFileSize(finalPath)) || size
  const finalMB = (finalSize / (1024 * 1024)).toFixed(2)
  const ratio = size > 0 ? (((size - finalSize) / size) * 100).toFixed(1) : '0'
  const unchanged = finalSize >= size ? '（未变小，已保留原图）' : ''
  const secondConfirm = await Dialog.show({
    title: '压缩完成',
    message: `压缩前：${sizeInMB} MB\n压缩后：${finalMB} MB\n压缩率：${ratio}%${unchanged}\n\n是否继续上传？`,
    positiveText: '是',
    negativeText: '否'
  })
  if (secondConfirm === 'confirm') doUpload(finalPath)
}

/** 图片/视频选择（action sheet 二选一） */
const mediaPickerVisible = ref(false)

const onMediaTypeSelect = ({ item }: { item: { name: string } }) => {
  if (item.name === '图片') {
    uni.chooseImage({
      count: 1,
      // 直接进系统相册，不弹 uni 默认的「拍照/相册」来源选择框（RN 也是直接进相册）
      sourceType: ['album'],
      sizeType: ['original'],
      success: res => {
        const path = res.tempFilePaths?.[0]
        if (path) onPicked(path, true)
      }
    })
    return
  }
  uni.chooseVideo({
    sourceType: ['album'],
    compressed: false,
    success: res => {
      const path = (res as any).tempFilePath
      if (path) onPicked(path, false)
    }
  })
}

/** 头像形态：只选图片，直接进相册 */
const onAvatarPick = () => {
  if (uploading.value) return
  uni.chooseImage({
    count: 1,
    sourceType: ['album'],
    sizeType: ['original'],
      success: res => {
        const path = res.tempFilePaths?.[0]
        if (path) onPicked(path, true)
      }
  })
}

/** 头像形态：右上角删除角标 -> 确认后连 COS 一起删，再清空（写回空数组） */
const onAvatarDelete = async () => {
  const current = images.value[0]
  if (!current?.url) return
  const result = await Dialog.show({
    title: '提示',
    message: '确定要删除当前头像吗？',
    positiveText: '删除',
    negativeText: '取消'
  })
  if (result !== 'confirm') return
  try {
    await deleteCosFile(current.url)
    toast('删除成功')
    setImages([])
  } catch (error) {
    toast('删除失败')
  }
}

/** 选择文件：媒体走压缩两步确认，纯文档走「文件信息 -> 是否上传」 */
const onDocumentSelect = async () => {
  if (typeof plus === 'undefined' || plus.os.name !== 'Android') {
    toast('该设备暂不支持选择文件')
    return
  }
  try {
    const doc = await pickDocument()
    if (!doc) return
    const ext = extOf(doc.name || doc.path)
    if (IMAGE_EXTS.includes(ext)) {
      onPicked(doc.path, true, doc.name)
      return
    }
    if (VIDEO_EXTS.includes(ext)) {
      onPicked(doc.path, false, doc.name)
      return
    }
    const size = doc.size || (await getFileSize(doc.path))
    const sizeInMB = (size / (1024 * 1024)).toFixed(2)
    const confirm = await Dialog.show({
      title: '文件信息',
      message: `文件名：${doc.name.toLowerCase()}\n文件大小：${sizeInMB} MB\n\n是否上传？`,
      positiveText: '是',
      negativeText: '否'
    })
    if (confirm === 'confirm') doUpload(doc.path)
  } catch (e) {
    toast('选择文件失败，请重试')
  }
}

/* ---------------- 预览 / 改名 / 删除 ---------------- */
const imageEntries = computed<FileEntry[]>(() =>
  images.value
    .map((src, index) => ({ src, index }))
    .filter(item => getFile(item.src).type === PicGoFileType.Image)
)

const onPreviewFile = (file: PicGoSrc) => {
  const type = getFile(file).type
  if (type === PicGoFileType.Image) {
    uni.previewImage({ urls: imageEntries.value.map(it => it.src.url), current: file.url })
    return
  }
  if (type === PicGoFileType.Video) {
    Router.navigate('PreviewVideo', { url: mediaUrl(file.url) })
    return
  }
  // word/excel/ppt/pdf 等办公文档：下载后调系统查看器打开
  if (openOfficeDocument(file)) return
  Dialog.show({
    title: '提示',
    message: '该文件类型暂不支持预览，请先下载后查看～',
    positiveText: '知道了'
  })
}

const renameVisible = ref(false)
const renameDraft = ref('')
const renameIndex = ref(0)

const onEditName = (index: number) => {
  renameIndex.value = index
  renameDraft.value = images.value[index]?.name || ''
  renameVisible.value = true
}

const onRenameConfirm = (s: string) => {
  const list = [...images.value]
  if (list[renameIndex.value]) {
    list[renameIndex.value] = { ...list[renameIndex.value], name: s }
    setImages(list)
  }
  renameVisible.value = false
}

/** 分享文件：复制附件链接（RN 的「分享原件」依赖系统分享面板，App 端简化为复制链接；
 *  与 pkg-post/detail 的 onShareLink 同口径，关掉系统 toast 改用项目统一 toast） */
const onShareFile = (file: PicGoSrc) => {
  uni.setClipboardData({
    data: file.url,
    showToast: false,
    success: () => toast('链接已复制到剪贴板')
  })
}

const onFileDelete = async (file: PicGoSrc) => {
  const result = await Dialog.show({
    title: '提示',
    message: '删除后不可恢复，请谨慎操作',
    positiveText: '确定',
    negativeText: '取消'
  })
  if (result !== 'confirm') return
  try {
    await deleteCosFile(file.url)
    toast('删除成功')
    setImages(images.value.filter(it => it.id !== file.id))
  } catch (error) {
    toast('删除失败')
  }
}
</script>

<style lang="scss" scoped>
.fu {
  display: flex;
  flex-direction: column;

  &__btns {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &__btns-gap {
    width: 16rpx;
  }
  /* 上传中全屏遮罩的内容层：铺满 wd-overlay 的 fixed 区域并居中（overlay 自身不是 flex 容器，
     所以铺满 + 居中都得在这一层做）。100% 有效是因为 .wd-overlay 四边 0、高度确定。 */
  &__mask {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  &__mask-text {
    margin-top: 20rpx;
    color: #fff;
    font-size: 26rpx;
    line-height: 1;
  }
  &__list {
    margin-top: 20rpx;
  }
  &__file {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8rpx 10rpx 8rpx 8rpx;
    margin-bottom: 20rpx;
    border: 2rpx solid #eee;
    border-radius: 10rpx;
  }
  &__file-icon {
    width: 104rpx;
    height: 104rpx;
    border-radius: 10rpx;
    background-color: #f0f0f0;
    flex-shrink: 0;
  }
  /* 非图片附件：这一格放 wd-icon，居中撑满同一格（保持行高一致） */
  &__file-icon--doc {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
  }
  &__file-body {
    flex: 1;
    min-width: 0;
    margin: 0 24rpx;
  }
  &__file-name {
    display: block;
    width: 100%;
    box-sizing: border-box;
    font-size: 28rpx;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__file-meta {
    display: block;
    width: 100%;
    box-sizing: border-box;
    margin-top: 8rpx;
    font-size: 24rpx;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /* 分享 / 删除两个圆形图标按钮：与删除的浅红底区分，分享用中性浅灰底 */
  &__file-share {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    background-color: #f2f3f5;
    flex-shrink: 0;
  }
  &__file-del {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60rpx;
    height: 60rpx;
    margin-left: 12rpx;
    border-radius: 50%;
    background-color: #ffecec;
    flex-shrink: 0;
  }

  /* 头像形态 */
  &__avatar-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20rpx 0 10rpx;
  }
  /* 圆 + 删除角标的定位容器，定宽高让角标能精确贴右上角 */
  &__avatar-box {
    position: relative;
    width: 200rpx;
    height: 200rpx;
  }
  &__avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200rpx;
    height: 200rpx;
    border-radius: 50%;
    overflow: hidden;
    border: 2rpx solid #eee;
    background-color: #fafafa;
    /* wd-icon 的 size 会落到内联 style（内联 rpx 在 App 端不转换），
       这里用容器 font-size 让它继承，跨端最稳 */
    font-size: 72rpx;
    color: #c8c8c8;
  }
  /* 删除角标：红色实心圆，白色 X；贴在圆右上角外缘 */
  &__avatar-del {
    position: absolute;
    top: -6rpx;
    right: -6rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    background-color: #ff5252;
    border: 2rpx solid #fff;
    box-shadow: 0 0 4rpx rgba(0, 0, 0, 0.2);
  }
  &__avatar--hover {
    opacity: 0.8;
  }
  &__avatar-img {
    width: 100%;
    height: 100%;
  }
  &__avatar-tip {
    margin-top: 16rpx;
    font-size: 24rpx;
    color: #999;
  }
}
</style>
