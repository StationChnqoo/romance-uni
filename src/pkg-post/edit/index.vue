<!--
  新增 / 编辑笔记
  由 cloud-react-native/src/screens/EditPost/index.tsx 迁移。

  - 标题栏用原生导航栏（编辑/新增随 id 切换）；底部 删除 + 保存（gap 12）。
  - 分类选择：RN 是跳独立的 ChooseCategory 页；这里改成**页内底部弹窗**
    （components/CategoryPicker.vue：flex-wrap 标签云 + 末尾虚线「+ 新建」），
    单击标签即选中、长按标签可编辑 / 删除该分类；分类列表由本页 onShow 统一重拉。
    原独立页 pkg-post/choose-category 已删除（为一个分类单开一页太重）。
  - 标签：MoreButton -> 通用 InputDialog -> DeleteableTags 公共组件展示（不用 wot 的 wd-tag closable，它有写死的样式 bug）。
  - 表单：wot 的 wd-form（分类、标题必填），输入行用 wd-input / wd-textarea
    直连 form（自带 label + prop，无需 wd-form-item），保存前 validate()。
  - 附件：RN 的 FileUploader 迁移（App 端能力所限）：
  · 「选择文件」（RN 的 pickDocument）：App 端 uni.chooseFile 不可用，Android 用
    Native.js 调系统 ACTION_GET_CONTENT 选择器，content:// 流拷贝到 _doc 后上传；
    选中的是图片/视频格式（按扩展名判断）时改走压缩两步确认，纯文档直接「文件信息
    (是否上传)」不压缩。iOS 需原生插件暂不支持（toast 提示）。
    「选择图片/视频」一个入口，action sheet 二选一（RN 是 mediaType mixed 的混合
    选择器，uni 无对应物，拆 chooseImage / chooseVideo 两路）；
  · 压缩确认两步弹窗照 RN 还原（受「压缩上传」开关控制）：文件信息(是否压缩) ->
    正在压缩(loading) -> 压缩完成(前后大小+压缩率，是否继续上传)；不压缩则「上传确认」
    后传原文件；压缩失败 toast 后直接传原文件。图片压缩照搬 RN 项目实际依赖的
    react-native-compressor@1.19.0 的 auto 算法（边界 1280x1280 等比缩 + JPEG
    quality 80 + 压完不比原图小退回原文件）；Android 改用 Native.js 调 Bitmap 双线性缩放灭锯齿、
    iOS 走 plus.zip（Core Graphics 质量好），PNG 输入保 PNG 无损；视频压缩照搬同库 video auto
    （长边 640 + WhatsApp 风格码率分档，uni.compressVideo 按码率转码，App 端原生）；
    H5 端两者都不支持，走失败分支传原文件。
    · 上传走 /upload/cloud（api/sdk.ts 的 uploadCloud，对应 RN 的 usePicGoUpload）。
    · 附件行（RN 的 PicGoFile）：缩略图 / 名称(点击改名) / 大小|时间 / 删除(确认后删 COS)。
    · 预览：图片用 uni.previewImage（用户指定「预览用 uni 自己的」）；
      视频跳通用播放页 PreviewVideo；其它类型暂不支持
      （PreviewMarkdown 未迁移）。
  - 删除笔记：确认后先删全部 COS 附件再 deletePost（RN 同款顺序）。
-->
<template>
  <view :style="themeVars" class="edit-post">
    <z-paging
      ref="pagingRef"
      v-model="list"
      class="edit-post__paging"
      :fixed="false"
      :auto="true"
      :refresher-enabled="false"
      :loading-more-enabled="false"
      hide-empty-view
      @query="queryList"
    >
      <view class="edit-post__form">
        <wd-form ref="formRef" :model="form" :rules="rules">
          <Flex horizontal justify="space-between">
            <text class="edit-post__label">
              <text>分类</text>
              <text class="edit-post__required"> *</text>
            </text>
            <MoreButton :label="categoryTitle || '请选择'" @press="categoryVisible = true" />
          </Flex>
          <view class="edit-post__line" />

          <!-- 标题：label 在上、input 在下（用户要求：标题类字段一律两行展示）。
               去掉 align-right —— 独占整行后右对齐会让 placeholder 贴到右边。 -->
          <view class="edit-post__stack">
            <text class="edit-post__label edit-post__label--top">
              <text>标题</text>
              <text class="edit-post__required"> *</text>
            </text>
            <wd-textarea
              v-model="form.title"
              prop="title"
              required
              clearable
              no-border
              auto-height
              placeholder="标题"
              :maxlength="-1"
            />
          </view>
          <view class="edit-post__line" />

          <!-- 描述是长文本：label 在上、textarea 在下、高度自适应，别挤在右侧窄空间里 -->
          <view class="edit-post__stack">
            <text class="edit-post__label edit-post__label--top">描述</text>
            <wd-textarea
              v-model="form.content"
              prop="content"
              placeholder="描述"
              :maxlength="-1"
              auto-height
              no-border
            />
          </view>
          <view class="edit-post__line" />

          <Flex horizontal justify="space-between">
            <text class="edit-post__label">标签</text>
            <MoreButton label="请填写标签" @press="tagInputVisible = true" />
          </Flex>
          <view v-if="form.tags.length" class="edit-post__tags">
            <!-- 可删除标签：公共组件 DeleteableTags（wot 的 wd-tag closable 关闭图标写死深灰实心圆，有 bug） -->
            <DeleteableTags :datas="form.tags" @delete="onTagDelete" />
          </view>
          <view class="edit-post__line" />

          <Flex horizontal justify="space-between">
            <text class="edit-post__label">创建时间</text>
            <text class="edit-post__static">{{ form.createAt || '-' }}</text>
          </Flex>
          <view class="edit-post__line" />

          <Flex horizontal justify="space-between">
            <text class="edit-post__label">修改时间</text>
            <text class="edit-post__static">{{ form.updateAt || '-' }}</text>
          </Flex>
          <view class="edit-post__line" />

          <!-- 附件（RN 的 FileUploader 简化版，见文件头注释）。★最后一行，后面不画 __line -->
          <Flex horizontal justify="space-between">
            <text class="edit-post__label">附件</text>
            <!-- ★ 上传期间**不置灰按钮**：改用全屏 loading 遮罩挡住交互（见模板末尾的 wd-overlay） -->
            <view class="edit-post__upload-btns">
              <MoreButton label="选择文件" @press="onDocumentSelect" />
              <view class="edit-post__upload-gap" />
              <MoreButton label="选择图片/视频" @press="mediaPickerVisible = true" />
            </view>
          </Flex>
        </wd-form>

        <view v-if="imageEntries.length" class="edit-post__group">
          <text class="edit-post__group-title">图片</text>
          <view class="edit-post__group-gap" />
          <view
            v-for="item in imageEntries"
            :key="item.src.id"
            class="edit-post__file"
          >
            <image
              class="edit-post__file-icon"
              :src="getFile(item.src).src"
              mode="aspectFill"
              @click="onPreviewFile(item.src)"
            />
            <view class="edit-post__file-body">
              <text class="edit-post__file-name" :number-of-lines="1" @click="onEditName(item.index)">
                {{ item.src.name || '未命名附件' }}
              </text>
              <text class="edit-post__file-meta">
                {{ (item.src.size / 1024 / 1024).toFixed(2) }}MB | {{ item.src.updateAt }}
              </text>
            </view>
            <view class="edit-post__file-del" @click="onFileDelete(item.src)">
              <wd-icon name="delete" color="#ff5252" size="16px" />
            </view>
          </view>
        </view>

        <view v-if="otherEntries.length" class="edit-post__group">
          <text class="edit-post__group-title">其他文件</text>
          <view class="edit-post__group-gap" />
          <view
            v-for="item in otherEntries"
            :key="item.src.id"
            class="edit-post__file"
          >
            <!-- 非图片附件：wot 字体图标（原 file-*.png 已删） -->
            <view
              class="edit-post__file-icon edit-post__file-icon--doc"
              @click="onPreviewFile(item.src)"
            >
              <wd-icon
                :name="getFile(item.src).icon"
                :color="getFile(item.src).iconColor"
                size="56rpx" />
            </view>
            <view class="edit-post__file-body">
              <text class="edit-post__file-name" :number-of-lines="1" @click="onEditName(item.index)">
                {{ item.src.name || '未命名附件' }}
              </text>
              <text class="edit-post__file-meta">
                {{ (item.src.size / 1024 / 1024).toFixed(2) }}MB | {{ item.src.updateAt }}
              </text>
            </view>
            <view class="edit-post__file-del" @click="onFileDelete(item.src)">
              <wd-icon name="delete" color="#ff5252" size="16px" />
            </view>
          </view>
        </view>
      </view>
    </z-paging>

    <!--
      ★ 上传中 loading 遮罩 —— 与 components/FileUploader.vue 同款（wot 现成组件组合，不自己画）：
        · wd-overlay：position:fixed 四边 0，自带半透明背景 + lock-scroll，wot 里唯一的全屏遮罩；
        · wd-loading：SVG 转圈（type=ring），size 走 addUnit（数字按 px）。
      层级 200：按项目约定（自定义浮层 200），且**必须低于自绘 toast(9999) 与 Dialog(9990)** ——
      上传失败时 toast 要能盖在遮罩之上，否则提示被挡住看不见。
      duration=0：上传结束立刻撤掉，不留淡出尾帧挡提示。
    -->
    <wd-overlay :show="uploading" :z-index="200" :duration="0">
      <view class="edit-post__mask">
        <wd-loading type="ring" color="#ffffff" :size="24" />
        <text class="edit-post__mask-text">上传中…</text>
      </view>
    </wd-overlay>

    <view class="edit-post__divider" />
    <Flex horizontal :custom-style="{ padding: '20rpx 30rpx', gap: '12px' }">
      <wd-button
        v-if="id"
        block
        plain
        :round="false"
        :custom-style="'flex: 1; min-width: 0; color: ' + theme"
        @click="onDelete"
      >
        删除
      </wd-button>
      <wd-button
        block
        :round="false"
        :disabled="!checkForm"
        :custom-style="'flex: 1; min-width: 0; background-color: ' + theme"
        @click="onSave"
      >
        保存
      </wd-button>
    </Flex>

    <!-- 分类选择：底部弹窗（pkg-post/components/CategoryPicker.vue，原「选择分类」二级页已删） -->
    <CategoryPicker
      :show="categoryVisible"
      :list="categories"
      :loading="categoriesLoading"
      :active-id="form.categoryId"
      @close="categoryVisible = false"
      @pick="onCategoryPick"
      @refresh="loadCategories"
    />

    <!-- 图片/视频选择入口（uni 没有 RN 那种混合 mediaType 选择器，二选一） -->
    <wd-action-sheet
      v-model="mediaPickerVisible"
      :actions="[{name: '图片'}, {name: '视频'}]"
      :close-on-click-action="true"
      cancel-text="取消"
      @select="onMediaTypeSelect"
    />

    <!-- 标签输入 / 附件改名：共用通用输入弹窗 -->
    <InputDialog
      :show="tagInputVisible"
      title="提示"
      message="请填写标签"
      placeholder="请输入"
      confirm-text="确定"
      @close="tagInputVisible = false"
      @confirm="onTagAppend"
    />
    <InputDialog
      :show="renameVisible"
      title="请输入"
      message="请输入文件名称"
      :value="renameDraft"
      placeholder="请输入"
      confirm-text="确定"
      @close="renameVisible = false"
      @confirm="onRenameConfirm"
    />

    <DialogContainer />
  </view>
  <ToastContainer />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import dayjs from 'dayjs'
import {
  deletePost,
  mergePost,
  selectCategories,
  selectCategory,
  selectPost
} from '@/api'
import { deleteCosFile, uploadCloud } from '@/api/sdk'
import { Router } from '@/common/router'
import CategoryPicker from '../components/CategoryPicker.vue'
import DialogContainer from '@/components/DialogContainer.vue'
import ToastContainer from '@/components/ToastContainer.vue'
import Flex from '@/components/Flex.vue'
import InputDialog from '@/components/InputDialog.vue'
import MoreButton from '@/components/MoreButton.vue'
import DeleteableTags from '@/components/DeleteableTags.vue'
import { Dialog } from '@/components/Dialog'
import { useMediaStore } from '@/stores/media'
import { useUserStore } from '@/stores/user'
import { toast, getFile, mediaUrl, nanoid, openOfficeDocument, PicGoFileType } from '@/utils'
import {
  IMAGE_EXTS,
  VIDEO_EXTS,
  extOf,
  getFileSize,
  compressFile,
  pickDocument
} from '@/utils/file'
import type { Category, PicGoSrc, Post } from '@/types/media'
import { createPost } from '@/types/media'
import type { FormInstance, FormRules } from 'wot-design-uni/components/wd-form/types'
import { useThemeVars } from '@/composables/useThemeVars'

const themeVars = useThemeVars()


const formRef = ref<FormInstance>()

/** 分类、标题必填 */
const rules: FormRules = {
  categoryId: [{ required: true, message: '请选择分类' }],
  title: [{ required: true, message: '请填写标题' }]
}

/*
 * 底部按钮：直接用 wot 的 wd-button，尺寸/圆角全走 wot 的 size 默认值，
 * 这里只把「保存」的实底色和「删除」的镂空描边色换成本项目主题色。
 */
const userStore = useUserStore()
const theme = computed(() => userStore.theme)

/** z-paging 只当滚动容器：列表数据恒为空，不参与渲染 */
const pagingRef = ref<any>(null)
const list = ref<unknown[]>([])

const queryList = () => {
  pagingRef.value?.complete([])
}

const id = ref('')
const form = ref<Post>(createPost())

const checkForm = computed(
  () => !!form.value?.title?.trim() && !!form.value?.categoryId
)

/** 分类标题（回显用；分类 id 存在 form.categoryId 里） */
const categoryTitle = ref('')

/*
 * 分类：数据在本页持有（onShow 统一重拉），弹窗与交互全在 CategoryPicker 组件里。
 * - 列表一次拉 100 条（与 RN 的 pageSize 一致）。
 * - 打开弹窗只是一次显隐；进过「编辑 / 新增分类」页返回来，由 onShow 的重拉兜住，
 *   所以不再需要「按需刷新」的脏标记。
 */
const categoryVisible = ref(false)
const categories = ref<Category[]>([])
const categoriesLoading = ref(false)

const loadCategories = async () => {
  categoriesLoading.value = true
  try {
    const pageData = await selectCategories({ currentPage: 1, pageSize: 100 })
    categories.value = pageData.records || []
    // 当前选中的分类可能已在 EditCategory 页里被删掉 -> 清空，避免保存一个不存在的分类
    if (
      form.value.categoryId &&
      !categories.value.some(it => it.id === form.value.categoryId)
    ) {
      form.value.categoryId = ''
      categoryTitle.value = ''
    }
  } catch (error) {
    toast('分类加载失败')
  } finally {
    categoriesLoading.value = false
  }
}

/** 单击标签 = 选中并关闭（分类单选，选完直接回填表单） */
const onCategoryPick = (item: Category) => {
  form.value.categoryId = item.id
  categoryTitle.value = item.title
  categoryVisible.value = false
}

const loadPost = async () => {
  const draft = createPost()
  draft.updateAt = dayjs().format('YYYY-MM-DD HH:mm:ss')
  if (id.value) {
    try {
      const detail = await selectPost(id.value)
      form.value = detail
    } catch (error) {
      toast('加载失败，请返回重试')
      return
    }
    // 回显分类标题（RN 用 categoryQuery 查询）
    if (form.value.categoryId) {
      selectCategory(form.value.categoryId)
        .then(it => (categoryTitle.value = it.title))
        .catch(() => {})
    }
  } else {
    draft.id = nanoid()
    form.value = draft
  }
}

/* ---------- 标签 ---------- */
const tagInputVisible = ref(false)

const onTagAppend = (s: string) => {
  const tag = (s || '').trim()
  if (!tag) return
  form.value.tags = [...form.value.tags, tag]
  tagInputVisible.value = false
}

const onTagDelete = (index: number) => {
  const tags = [...form.value.tags]
  tags.splice(index, 1)
  form.value.tags = tags
}

/* ---------- 附件 ---------- */
const uploading = ref(false)
const mediaStore = useMediaStore()

const doUpload = async (filePath: string) => {
  uploading.value = true
  try {
    const picGo = await uploadCloud(filePath)
    if (picGo?.url) {
      form.value.images = [...form.value.images, picGo]
    } else {
      toast('上传失败，请重试')
    }
  } catch (error) {
    toast('上传失败，请重试')
  } finally {
    uploading.value = false
  }
}

/** 选择后的完整流程：文件信息(是否压缩) → 压缩 → 压缩完成(前后大小+压缩率，是否继续上传)，与 FileUploader 同款 */
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
    // 不压缩：上传确认后传原文件
    const noCompressConfirm = await Dialog.show({
      title: '上传确认',
      message: `文件名：${fileName}\n文件大小：${sizeInMB} MB\n\n是否直接上传原文件？`,
      positiveText: '是',
      negativeText: '否'
    })
    if (noCompressConfirm === 'confirm') {
      doUpload(filePath)
    }
    return
  }

  uni.showLoading({ title: '正在压缩', mask: true })
  let finalPath = filePath
  try {
    finalPath = await compressFile(filePath, isImage)
  } finally {
    uni.hideLoading()
  }

  // 第二步：压缩完成，**无条件**展示前后对比（绝不按「压完有没有变小」决定弹不弹，
  // 否则同类型 PNG 有的弹有的静默上传）。没压小时 compressFile 已回退原文件，
  // 这里「压缩后」就是实际要上传的文件，压缩率 0.0% 并标注「未变小」。
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
  if (secondConfirm === 'confirm') {
    doUpload(finalPath)
  }
}

/**
 * 图片/视频选择（一个入口，action sheet 二选一，对应 RN FileUploader 的
 * 选择图片按钮——RN 那边 launchImageLibrary 的 mediaType 是 mixed，图片视频都能选，
 * uni 没有对应的混合选择器，拆成 chooseImage / chooseVideo 两路）。
 */
const mediaPickerVisible = ref(false)

const onMediaTypeSelect = ({item}: {item: {name: string}}) => {
  if (item.name === '图片') {
    uni.chooseImage({
      count: 1,
      // 直接进系统相册，不走 uni 默认弹的「拍照/相册」原生来源选择框
      // （RN 的 launchImageLibrary 也是直接进相册）
      sourceType: ['album'],
      sizeType: ['original'],
      success: res => {
        const path = res.tempFilePaths?.[0]
        if (path) onPicked(path, true)
      }
    })
  } else {
    uni.chooseVideo({
      // 同上：只从相册选，不弹原生来源选择框
      sourceType: ['album'],
      compressed: false,
      success: res => {
        const path = (res as any).tempFilePath
        if (path) onPicked(path, false)
      }
    })
  }
}

/** 选择文件的确认流程：媒体文件走压缩两步弹窗，其余文档走文件信息 -> 是否上传 */
const onDocumentSelect = async () => {
  if (typeof plus === 'undefined' || plus.os.name !== 'Android') {
    toast('该设备暂不支持选择文件')
    return
  }
  try {
    const doc = await pickDocument()
    if (!doc) return
    const ext = extOf(doc.name || doc.path)
    // 选到的是图片/视频：和直接选媒体一样，先问是否压缩（两步确认流程）
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

const imageEntries = computed(() =>
  form.value.images
    .map((src, index) => ({src, index}))
    .filter(item => getFile(item.src).type === PicGoFileType.Image)
)

const otherEntries = computed(() =>
  form.value.images
    .map((src, index) => ({src, index}))
    .filter(item => getFile(item.src).type !== PicGoFileType.Image)
)

/** 预览：图片 uni.previewImage；视频跳通用播放页 PreviewVideo（对应 RN 的 PreviewVideo） */
const onPreviewFile = (file: PicGoSrc) => {
  const type = getFile(file).type
  if (type === PicGoFileType.Image) {
    const urls = imageEntries.value.map(it => it.src.url)
    uni.previewImage({urls, current: file.url})
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

/* 附件改名 */
const renameVisible = ref(false)
const renameDraft = ref('')
const renameIndex = ref(0)

const onEditName = (index: number) => {
  renameIndex.value = index
  renameDraft.value = form.value.images[index]?.name || ''
  renameVisible.value = true
}

const onRenameConfirm = (s: string) => {
  const images = [...form.value.images]
  if (images[renameIndex.value]) {
    images[renameIndex.value] = {...images[renameIndex.value], name: s}
    form.value.images = images
  }
  renameVisible.value = false
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
    form.value.images = form.value.images.filter(it => it.id !== file.id)
  } catch (error) {
    toast('删除失败')
  }
}

/* ---------- 保存 / 删除 ---------- */
const onSave = async () => {
  const check = await formRef.value?.validate()
  if (check && !check.valid) {
    Dialog.show({
      title: '提示',
      message: check.errors[0]?.message ?? '请检查表单',
      positiveText: '我知道了'
    })
    return
  }
  try {
    await mergePost(form.value)
    toast('操作成功')
    Router.back()
  } catch (error) {
    Dialog.show({
      title: '提示',
      message: '保存失败，请稍后重试',
      positiveText: '我知道了'
    })
  }
}

const onDelete = async () => {
  const result = await Dialog.show({
    title: '提示',
    message: '删除后不可恢复，请谨慎操作',
    positiveText: '确定',
    negativeText: '取消'
  })
  if (result !== 'confirm') return
  try {
    // 先删除所有 COS 附件，再删笔记（RN 同款顺序）
    if (form.value.images?.length) {
      await Promise.all(form.value.images.map(image => deleteCosFile(image.url)))
    }
    await deletePost(form.value.id)
    Router.back()
  } catch (error) {
    Dialog.show({
      title: '提示',
      message: '删除失败，请稍后重试',
      positiveText: '我知道了'
    })
  }
}

onLoad((options?: any) => {
  id.value = options?.id || ''
  uni.setNavigationBarTitle({title: id.value ? '编辑笔记' : '新增笔记'})
  loadPost()
})

/**
 * 每次进入 / 返回本页都重拉分类列表：分类的新增 / 编辑 / 删除都发生在本页之外
 * （编辑 / 新增分类跳 EditCategory，删除在弹窗里但只作用于别处），照项目约定统一走 onShow。
 */
onShow(() => {
  loadCategories()
})
</script>

<style lang="scss" scoped>
.edit-post {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fff;

  &__paging {
    flex: 1;
  }
  &__form {
    padding: 30rpx;
    /* wd-input/wd-textarea 的 cell 模式自带 10px 上下 + 15px 左右内边距，
       行距与左右留白仍由页面的 __form / __line 控制，这里清零 */
    --wot-input-cell-padding: 0;
    --wot-input-padding: 0;
    --wot-textarea-cell-padding: 0;
    --wot-textarea-padding: 0;
  }
  /* 自绘行 label：28rpx = 14px，跟 wd-input 自带 label（wot 默认
     $-cell-title-fs: 14px）对齐。同一个表单里两种字号并排会看着不齐。 */
  &__label {
    font-size: 28rpx;
    color: #333;
  }
  /* 长文本：label 在上、textarea 在下，整体占一栏 */
  &__stack {
    display: flex;
    flex-direction: column;
  }
  &__label--top {
    margin-bottom: 12rpx;
  }
  &__required {
    color: #ff5252;
  }
  &__static {
    font-size: 28rpx;
    color: #333;
  }
  &__line {
    /* 1px 绝对单位：rpx 在 webview / 小程序里会按屏宽换算，
       1rpx 实测只有 0.5px 左右几乎不可见，2rpx 又会随设备变粗。分割线一律用 1px。 */
    height: 1px;
    background-color: #eee;
    margin: 24rpx 0;
  }
  /* 可删除标签外层容器：DeleteableTags 内部已 flex 折行，这里只管整块与上方留白 */
  &__tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 16rpx;
    margin-top: 16rpx;
  }
  &__divider {
    /* 1px：理由见 __line 注释 */
    height: 1px;
    background-color: #eee;
  }

  &__upload-btns {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &__upload-gap {
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
  &__group {
    margin-top: 24rpx;
  }
  &__group-title {
    font-size: 28rpx;
    color: #999;
    font-weight: 500;
  }
  &__group-gap {
    height: 16rpx;
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
  /* 非图片附件：这一格放的是 wd-icon，居中撑满同一格（保持行高一致） */
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
    font-size: 24rpx;
    color: #666;
    margin-top: 8rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__file-del {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    background-color: #ffecec;
    flex-shrink: 0;
  }
}
</style>
