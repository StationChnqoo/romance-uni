<!--
  关于她 · 小事记 —— 列表
  记录女朋友喜欢 / 不喜欢、以及她说的每一件事。

  - 数据来自后端 /girl-notes：列表走真分页（筛选全部下推 SQL），tab 角标与待办提醒走 /stats。
  - ★ 整个页面由 z-paging 承载：:fixed="true" 铺满视口（项目口径，同 pkg-media/list /
    pkg-settings/settings），头部（态度 tab + 搜索）放 #top 插槽固定不随列表滚，
    列表内容放默认插槽。不再自己搭「根 flex column 100vh + 头部 + z-paging flex:1」的半页骨架。
  - 头部只剩两行：态度 tab → 搜索（右侧「更多」是筛选弹窗入口）。
    ★ 原「状态 / 排序 / 只看星标」整行收进「更多」弹窗；弹窗里原有的备份 / 清空类
      操作已删（用户要求）。弹窗内选择即时生效，点「完成」关闭。
    ★ 示例数据提示条改成「当前显示」筛选条件展示：筛选藏进弹窗后，列表里需要一条
      反馈当前生效条件的出口（含「重置」）。
    ★ 不放统计四格、不放「共 N 条」、不放主题筛选行、不按年月分组（分组没有意义）。
  - ★ tab 的 wd-badge 恒为 is-fixed 向上溢出半高，tabs-inner 必须留 padding-top，
    否则 scroll-view 的 overflow 会把角标上半切平。
  - ★ 不自画空态：空列表交给 z-paging 自带空视图（首屏不闪），只换 empty-view-text。
  - ★ 态度筛选自绘（scroll-view 横滚 + 透明下划线 + wd-badge），**不用 wd-tabs**：
    wd-tabs 的 useChildren.link() 在 App 端会递归重渲染导致卡死（项目血案）。
  - ★ 悬浮「+」内联 <view> + wd-icon（右下 96rpx 圆、主题色底），不预留列表高度。
  - ★ 单击整卡进编辑页（二级页）；长按卡片唤出操作菜单（生成点滴卡片 / 补充细节 /
    删除二次确认）。长按后系统可能补发 click，用 600ms 时间戳拦住误跳；星标 / 附件预览
    用 @click.stop 拦住，不误触发整卡跳转。
  - ★ 列表顶部「随手记一句」只填 content，其余用 createGirlNote() 默认值，落库后 reload。
  - ★ 日期放卡片右上角（星标左侧），下方 meta 行只留「当时的情境」；不再重复显示日期。
  - ★ 附件直接出缩略图：图片走 <image :src="mediaUrl(url)">（Android 原生层不认中文/空格），
    视频 / 文档用 getFile() 的类型图标占位；点哪块预览对应附件（图片 previewImage、
    视频 PreviewVideo、办公文档 openOfficeDocument），与 FileUploader / PostCard 同口径。
  - 回显：编辑页返回后 onShow 调 reload() 重拉列表，并重新拉 /stats（保存 / 删除已落库）。
  - 弹窗一律 wd-popup；按钮一律 wd-button + :custom-style 内联主题色；轻提示 toast()。
-->
<template>
  <view :style="themeVars" class="gf lv-page">
    <z-paging
      ref="pagingRef"
      v-model="list"
      class="gf__paging"
      :fixed="true"
      :auto="true"
      :empty-view-text="stats.total ? '没有符合条件的小事' : '还没有记下什么，点右下角 + 开始'"
      @query="queryList">

      <!-- #top：固定头部，不随列表滚（z-paging :fixed=true 的标准用法） -->
      <template #top>
        <view class="gf__head">
          <!-- 态度筛选：自绘横滚 tab，选中 = 主题色文字 + 主题色下划线，条数走 wd-badge。
               ★ wd-badge 的 content 恒为 is-fixed（top:0 + translateY(-50%)），会向上溢出半个自身高度；
                 scroll-view 自带 overflow 裁剪，所以 inner 必须留 padding-top，否则角标上半被切掉。 -->
          <scroll-view class="gf__tabs" scroll-x :show-scrollbar="false">
            <view class="gf__tabs-inner">
              <view
                v-for="tab in attitudeTabs"
                :key="tab.key"
                class="gf__tab"
                @click="onAttitudeTap(tab.key)">
                <wd-badge :model-value="tab.count">
                  <text class="gf__tab-text" :style="{ color: attitude === tab.key ? theme : 'var(--love-ink-3)' }">
                    {{ tab.label }}
                  </text>
                </wd-badge>
                <view
                  class="gf__tab-line"
                  :style="{ backgroundColor: attitude === tab.key ? theme : 'transparent' }" />
              </view>
            </view>
          </scroll-view>

          <!-- 搜索：★ 自定义组件当 flex 子项必须外面包一层页面自己的 cell 显式 flex:1 1 0;
               min-width:0，否则 App / 小程序端宽度由内容撑（placeholder 截断、右侧一大片空白）；
               组件根节点再走 :custom-style 内联（mp isolated 下页面 scoped 类跨不进组件内部）。 -->
          <view class="gf__search">
            <view class="gf__search-cell">
              <wd-input
                v-model="keyword"
                class="gf__search-input"
                :custom-style="'flex: 1; width: 100%; min-width: 0;'"
                prefix-icon="search"
                clearable
                no-border
                placeholder="搜她说过的话、备注、标签…" />
            </view>
            <view class="gf__more" @click="moreVisible = true">
              <wd-icon name="more" size="20px" />
            </view>
          </view>
        </view>
      </template>

      <view class="gf__body">
        <!-- 随手记一句：竞品的「心动瞬间 / 一键生成点滴」，不用进编辑页填一整张表单 -->
        <view class="gf__quick">
          <input
            v-model="quickText"
            class="gf__quick-input"
            :maxlength="200"
            confirm-type="done"
            placeholder="她刚说了什么？随口记一句…"
            placeholder-class="gf__quick-placeholder"
            @confirm="onQuickSave" />
          <view class="gf__quick-btn" @click="onQuickSave">记一句</view>
        </view>

        <!-- 当前显示：筛选都收进弹窗了，这里给一条反馈（原「当前是示例数据」提示条的位置） -->
        <view class="gf__active">
          <text class="gf__active-label">当前显示</text>
          <view class="gf__active-chips">
            <view
              v-for="(item, itemIndex) in activeFilters"
              :key="`${item.label}:${itemIndex}`"
              class="gf__active-chip"
              :style="chipStyle(item.on)">
              <text class="gf__active-chip-text" :style="{ color: item.on ? '#fff' : 'var(--love-ink-3)' }">
                {{ item.label }}
              </text>
            </view>
          </view>
          <text
            v-if="hasActiveFilter"
            class="gf__active-reset"
            :style="{ color: theme }"
            @click="onResetFilters">重置</text>
        </view>

        <!-- 待办提醒：记了要做，才算真的记住 -->
        <view v-if="stats.todoCount" class="gf__todo">
          <view class="gf__todo-head">
            <wd-icon name="clock" size="14px" color="#96682a" />
            <text class="gf__todo-title">还有 {{ stats.todoCount }} 件事等着你</text>
          </view>
          <view
            v-for="todo in stats.todoPreview"
            :key="todo.id"
            class="gf__todo-row"
            @click="onEdit(todo)">
            <view class="gf__todo-dot" :style="{ backgroundColor: theme }" />
            <text class="gf__todo-content" :number-of-lines="1">{{ todo.content }}</text>
          </view>
        </view>

        <!-- 卡片平铺：不再按年月分组 -->
        <view
          v-for="(record, recordIndex) in list"
          :key="`${record.id}:${recordIndex}`"
          class="gf__card"
          @click="onEdit(record)"
          @longpress="onCardMenu(record)">
          <view class="gf__card-bar" :style="{ backgroundColor: attitudeOf(record.attitude).color }" />
          <view class="gf__card-body">
            <view class="gf__card-top">
              <view class="gf__pill" :style="{ backgroundColor: attitudeOf(record.attitude).color }">
                <wd-icon :name="attitudeOf(record.attitude).icon" size="11px" color="#fff" />
                <text class="gf__pill-text gf__pill-text--light">{{ attitudeOf(record.attitude).label }}</text>
              </view>
              <view v-if="record.status !== 'record'" class="gf__pill" :style="{ backgroundColor: statusTone(record.status).background }">
                <text class="gf__pill-text" :style="{ color: statusTone(record.status).color }">
                  {{ statusLabel(record.status) }}
                </text>
              </view>
              <text class="gf__card-date">{{ record.saidAt }}</text>
              <view class="gf__star" @click.stop="onToggleStar(record)">
                <wd-icon name="star" size="18px" :color="record.starred ? '#c69540' : 'var(--love-line)'" />
              </view>
            </view>

            <text class="gf__card-content">{{ record.content }}</text>

            <view v-if="record.memo" class="gf__card-memo">
              <text class="gf__card-memo-label">我的备注 / 打算怎么做</text>
              <text class="gf__card-memo-text">{{ record.memo }}</text>
            </view>

            <view v-if="record.scene" class="gf__card-meta">
              <text class="gf__card-meta-text gf__card-meta-text--scene" :number-of-lines="1">
                {{ record.scene }}
              </text>
            </view>

            <!-- 标签也不再做成一排小药丸：卡片上只允许态度 + 状态两个药丸 -->
            <text v-if="record.tags.length" class="gf__card-tags-text">
              {{ tagsLine(record.tags) }}
            </text>

            <!-- 附件直接出缩略图：图片用 <image>（URL 过 mediaUrl，Android 原生层不认中文/空格），
                 视频 / 文档用 getFile() 的类型图标；点哪一块就预览对应那一个附件。 -->
            <view v-if="record.attachments.length" class="gf__card-attach">
              <view
                v-for="(file, fileIndex) in record.attachments"
                :key="file.id || fileIndex"
                class="gf__card-thumb"
                @click.stop="onAttachments(record, fileIndex)">
                <image
                  v-if="getFile(file).type === PicGoFileType.Image"
                  class="gf__card-thumb-img"
                  :src="mediaUrl(file.url)"
                  mode="aspectFill" />
                <view v-else class="gf__card-thumb-icon">
                  <wd-icon :name="getFile(file).icon" size="40rpx" :color="getFile(file).iconColor" />
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </z-paging>

    <!-- 右下角悬浮「+」：不预留列表高度，滚到底压住一角是预期 -->
    <view class="gf__fab" @click="onAdd">
      <wd-icon name="add" size="26px" color="#fff" />
    </view>

    <!-- 更多弹窗：只放筛选条件 -->
    <wd-popup
      v-model="moreVisible"
      position="bottom"
      :safe-area-inset-bottom="false"
      :close-on-click-modal="true"
      :z-index="200">
      <view class="gf__sheet">
        <view class="lv-handle" />
        <text class="gf__sheet-title">筛选与排序</text>

        <text class="gf__sheet-label">状态</text>
        <view class="gf__sheet-opts">
          <view
            v-for="opt in statusOptions"
            :key="opt.key"
            class="gf__sheet-opt"
            :style="chipStyle(status === opt.key)"
            @click="onStatusPick(opt.key)">
            <text class="gf__sheet-opt-text" :style="{ color: status === opt.key ? '#fff' : 'var(--love-ink-2)' }">
              {{ opt.label }}
            </text>
          </view>
        </view>

        <text class="gf__sheet-label">排序</text>
        <view class="gf__sheet-opts">
          <view
            v-for="opt in GIRL_SORTS"
            :key="opt.key"
            class="gf__sheet-opt"
            :style="chipStyle(sort === opt.key)"
            @click="onSortPick(opt.key)">
            <text class="gf__sheet-opt-text" :style="{ color: sort === opt.key ? '#fff' : 'var(--love-ink-2)' }">
              {{ opt.label }}
            </text>
          </view>
        </view>

        <view class="gf__sheet-switch">
          <text class="gf__sheet-label">只看星标</text>
          <wd-switch
            v-model="starOnly"
            size="20px"
            :active-color="theme"
            inactive-color="#eee" />
        </view>

        <view class="gf__sheet-btns">
          <wd-button
            block
            plain
            round
            :custom-style="resetBtnStyle"
            @click="onResetFilters">重置</wd-button>
          <wd-button
            block
            round
            :custom-style="doneBtnStyle"
            @click="moreVisible = false">完成</wd-button>
        </view>
      </view>
    </wd-popup>

    <!-- 长按卡片唤出操作菜单：竞品的「长按卡片管理」，删除要二次确认 -->
    <wd-popup
      v-model="menuVisible"
      position="bottom"
      :safe-area-inset-bottom="false"
      :close-on-click-modal="true"
      :root-portal="true"
      :z-index="200">
      <view class="gf__sheet">
        <view class="lv-handle" />
        <text class="gf__sheet-title">这句话要怎么处理</text>
        <text class="gf__menu-quote">{{ menuRecord?.content }}</text>
        <view class="gf__menu-grid">
          <view class="gf__menu-item" @click="onMakeCard">
            <text class="gf__menu-icon love-icon love-i-letter" />
            <text class="gf__menu-label">生成点滴卡片</text>
          </view>
          <view class="gf__menu-item" @click="onMenuEdit">
            <text class="gf__menu-icon love-icon love-i-quill" />
            <text class="gf__menu-label">补充细节</text>
          </view>
          <view class="gf__menu-item" @click="onMenuDelete">
            <text class="gf__menu-icon gf__menu-icon--danger love-icon love-i-close" />
            <text class="gf__menu-label">{{ deleteArmed ? '再点一次删除' : '删掉这句' }}</text>
          </view>
        </view>
        <text class="gf__menu-tip">长按任意卡片都能叫出这个菜单</text>
      </view>
    </wd-popup>

    <!-- 点滴卡片：一键把一句话排成可以截图保存的卡片 -->
    <wd-popup
      v-model="cardVisible"
      position="center"
      :close-on-click-modal="true"
      :root-portal="true"
      :z-index="220">
      <view class="gf__note-wrap">
        <view class="gf__note-card">
          <text class="gf__note-deco">“</text>
          <text class="gf__note-eyebrow">SHE SAID · {{ cardRecord?.saidAt }}</text>
          <text class="gf__note-content">{{ cardRecord?.content }}</text>
          <view class="gf__note-line" />
          <view class="gf__note-foot">
            <text>{{ cardRecord ? attitudeOf(cardRecord.attitude).label : '' }}</text>
            <text>记下来了 · only for us</text>
          </view>
        </view>
        <view class="gf__note-actions">
          <text class="gf__note-btn" @click="onCopyCard">复制这句话</text>
          <text class="gf__note-btn gf__note-btn--ghost" @click="cardVisible = false">收好</text>
        </view>
        <text class="gf__note-tip">也可以直接截图，把这张卡片发给她</text>
      </view>
    </wd-popup>
  </view>
  <ToastContainer />
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import ToastContainer from '@/components/ToastContainer.vue'
import { Router } from '@/common/router'
import { useUserStore } from '@/stores/user'
import { useThemeVars } from '@/composables/useThemeVars'
import { getFile, mediaUrl, openOfficeDocument, PicGoFileType, toast } from '@/utils'
import {
  deleteGirlNote,
  mergeGirlNote,
  selectGirlNotes,
  selectGirlNoteStats,
  toggleGirlNoteStar
} from '@/api'
import {
  GIRL_ATTITUDES,
  GIRL_SORTS,
  GIRL_STATUSES,
  attitudeOf,
  statusLabel,
  statusTone
} from '@/constants/girlfriend'
import type { GirlSort } from '@/constants/girlfriend'
import { createGirlNote, createGirlNoteStats } from '@/types/girlfriend'
import type { GirlAttitude, GirlNote, GirlNoteStats, GirlStatus } from '@/types/girlfriend'

const themeVars = useThemeVars()
const userStore = useUserStore()
const theme = computed(() => userStore.theme)
/** 全局统计：分页列表只给当前页，tab 角标与待办提醒必须由 /stats 单独返回 */
const stats = ref<GirlNoteStats>(createGirlNoteStats())

type AttitudeFilter = GirlAttitude | 'all'
type StatusFilter = GirlStatus | ''

/* ---------------- 筛选状态 ---------------- */
const attitude = ref<AttitudeFilter>('all')
const keyword = ref('')
const status = ref<StatusFilter>('')
const sort = ref<GirlSort>('new')
const starOnly = ref(false)
const moreVisible = ref(false)
/** 竞品交互：随手记一句 / 长按菜单 / 点滴卡片 */
const quickText = ref('')
const menuVisible = ref(false)
const menuRecord = ref<GirlNote | null>(null)
const deleteArmed = ref(false)
const cardVisible = ref(false)
const cardRecord = ref<GirlNote | null>(null)
/** 长按之后系统可能补发一次 click，600ms 内忽略，避免误跳编辑页 */
let lastLongPressAt = 0

/** 态度 tab 角标取 /stats 的全局分组计数（当前页数据算不出总数） */
const attitudeTabs = computed(() => [
  { key: 'all' as AttitudeFilter, label: '全部', count: stats.value.total },
  ...GIRL_ATTITUDES.map(item => ({
    key: item.key as AttitudeFilter,
    label: item.label,
    count: stats.value.attitudeCounts[item.key] || 0
  }))
])

/** 弹窗里的状态选项：比 GIRL_STATUSES 多一个「全部状态」 */
const statusOptions: { key: StatusFilter; label: string }[] = [
  { key: '', label: '全部状态' },
  ...GIRL_STATUSES.map(item => ({ key: item.key as StatusFilter, label: item.label }))
]

const attitudeLabel = computed(() =>
  GIRL_ATTITUDES.find(it => it.key === attitude.value)?.label || '全部小事'
)
const sortLabel = computed(() =>
  GIRL_SORTS.find(it => it.key === sort.value)?.label || '最新的在前'
)

/** 筛选条件展示条：默认两项低调，生效的条件用主题色高亮 */
const activeFilters = computed(() => {
  const items: { label: string; on: boolean }[] = [
    { label: attitudeLabel.value, on: attitude.value !== 'all' }
  ]
  if (status.value) items.push({ label: statusLabel(status.value), on: true })
  if (starOnly.value) items.push({ label: '只看星标', on: true })
  const kw = keyword.value.trim()
  if (kw) items.push({ label: `搜「${kw}」`, on: true })
  items.push({ label: sortLabel.value, on: sort.value !== 'new' })
  return items
})
const hasActiveFilter = computed(() =>
  attitude.value !== 'all' || !!status.value || starOnly.value ||
  !!keyword.value.trim() || sort.value !== 'new'
)

/** chip 选中态：主题色实底 + 白字；未选中统一浅底（不堆色类） */
const chipStyle = (active: boolean) => ({
  backgroundColor: active ? theme.value : 'var(--love-line)'
})

/** 卡片标签拼成一行文字（不放在模板表达式里写箭头函数，mp 编译器更稳） */
const tagsLine = (tags: string[]) => tags.map(tag => `# ${tag}`).join('   ')

/* ---------------- 列表数据（后端真分页） ---------------- */
const pagingRef = ref<any>(null)
/** z-paging 渲染的那份，由 completeByNoMore 跨页累加 */
const list = ref<GirlNote[]>([])

/** 全局统计：首屏拉一次，编辑页返回后再刷新 */
const loadStats = async () => {
  try {
    stats.value = await selectGirlNoteStats()
  } catch (e) {
    /* 统计失败不阻断列表，http 层已提示 */
  }
}
loadStats()

/**
 * z-paging 查询回调：筛选条件全部下推后端，pageNo / pageSize 由组件给。
 * completeByNoMore 第二参用后端 hasNextPage 反推，否则会一直露「加载更多」。
 */
const queryList = async (pageNo: number, pageSize: number) => {
  try {
    const pageData = await selectGirlNotes({
      currentPage: pageNo,
      pageSize,
      attitude: attitude.value === 'all' ? '' : attitude.value,
      status: status.value,
      starred: starOnly.value,
      keyword: keyword.value.trim(),
      sort: sort.value
    })
    pagingRef.value?.completeByNoMore(pageData.records || [], !pageData.hasNextPage)
  } catch (e) {
    pagingRef.value?.complete(false)
  }
}

/** 筛选变化统一 300ms 防抖后重载：搜索框逐字输入不会每敲一下就打一次接口 */
let filterTimer: ReturnType<typeof setTimeout> | null = null
watch([attitude, keyword, status, sort, starOnly], () => {
  if (filterTimer) clearTimeout(filterTimer)
  filterTimer = setTimeout(() => pagingRef.value?.reload(), 300)
})

/** 编辑页返回后重拉列表 + 统计（首次由 z-paging auto 与 loadStats 负责） */
let firstShow = true
onShow(() => {
  if (firstShow) {
    firstShow = false
    return
  }
  pagingRef.value?.reload()
  loadStats()
})

/* ---------------- 交互 ---------------- */
const onAttitudeTap = (key: AttitudeFilter) => {
  attitude.value = key
  status.value = ''
}
const onStatusPick = (key: StatusFilter) => {
  status.value = key
}
const onSortPick = (key: GirlSort) => {
  sort.value = key
}
/** 展示条与弹窗共用：一次清掉所有筛选，回到默认视图 */
const onResetFilters = () => {
  attitude.value = 'all'
  status.value = ''
  starOnly.value = false
  keyword.value = ''
  sort.value = 'new'
}

const onToggleStar = async (record: GirlNote) => {
  try {
    record.starred = await toggleGirlNoteStar(record.id)
    // 星标排序下顺序会变，就地改不够，需要整页重拉
    if (sort.value === 'star') pagingRef.value?.reload()
  } catch (e) {
    /* 失败保持原值，http 层已提示 */
  }
}
/** 列表卡片是完整 GirlNote，待办提醒只有 /stats 的精简条目，这里只需要 id */
const onEdit = (record: { id: string }) => {
  if (Date.now() - lastLongPressAt < 600) return
  Router.navigate('EditGirlfriendNote', { id: record.id })
}
const onAdd = () => {
  Router.navigate('EditGirlfriendNote', {})
}
/** 点缩略图预览对应附件：图片进 previewImage（可左右滑全部图片），视频跳 PreviewVideo，
 *  办公文档下载后交系统查看器；与 FileUploader / PostCard 的预览口径一致。 */
const onAttachments = (record: GirlNote, index = 0) => {
  const file = record.attachments[index]
  if (!file?.url) return
  const type = getFile(file).type
  if (type === PicGoFileType.Image) {
    const urls = record.attachments
      .filter(it => getFile(it).type === PicGoFileType.Image && it.url)
      .map(it => it.url)
    uni.previewImage({ urls, current: file.url })
    return
  }
  if (type === PicGoFileType.Video) {
    Router.navigate('PreviewVideo', { url: mediaUrl(file.url) })
    return
  }
  if (openOfficeDocument(file)) return
  toast('该文件类型暂不支持预览')
}

/* ---------------- 随手记 / 长按菜单 / 点滴卡片 ---------------- */

/** 只填 content，态度 / 状态 / 日期都用 createGirlNote() 的默认值 */
const onQuickSave = async () => {
  const text = quickText.value.trim()
  if (!text) {
    toast('先写一句她说的话吧')
    return
  }
  const note = createGirlNote()
  note.content = text
  try {
    await mergeGirlNote(note)
    quickText.value = ''
    toast('记下了')
    pagingRef.value?.reload()
    loadStats()
  } catch (e) {
    toast('没存上，稍后再试一次')
  }
}

const onCardMenu = (record: GirlNote) => {
  lastLongPressAt = Date.now()
  menuRecord.value = record
  deleteArmed.value = false
  menuVisible.value = true
}
const onMenuEdit = () => {
  const id = menuRecord.value?.id
  menuVisible.value = false
  if (id) Router.navigate('EditGirlfriendNote', { id })
}
const onMakeCard = () => {
  cardRecord.value = menuRecord.value
  menuVisible.value = false
  cardVisible.value = true
}
const onCopyCard = () => {
  const text = cardRecord.value?.content || ''
  if (!text) return
  uni.setClipboardData({
    data: text,
    success: () => toast('已复制，可以发给她了'),
    fail: () => toast('复制失败，截图保存也可以')
  })
}
const onMenuDelete = async () => {
  if (!deleteArmed.value) {
    deleteArmed.value = true
    return
  }
  const id = menuRecord.value?.id
  if (!id) return
  try {
    await deleteGirlNote(id)
    menuVisible.value = false
    deleteArmed.value = false
    toast('已删掉')
    pagingRef.value?.reload()
    loadStats()
  } catch (e) {
    toast('删除失败，稍后再试')
  }
}

/* ---------------- 弹窗按钮：主题色内联（wot 变量跨不过 mp isolated） ---------------- */
const resetBtnStyle =
  'flex: 1; min-width: 0; margin-right: 16rpx; background-color: #fff; color: var(--love-ink-2); border: 2rpx solid var(--love-line); border-radius: 999rpx;'
const doneBtnStyle = computed(() =>
  `flex: 1; min-width: 0; background-image: linear-gradient(100deg, #ff92b4, #ee5a92); background-color: ${theme.value}; color: #fff; border: none; border-radius: 999rpx;`
)
</script>

<style lang="scss" scoped>
.gf {
  background-color: var(--love-bg);

  /* ---------------- #top 固定头部 ---------------- */
  &__head {
    background-image: linear-gradient(180deg, #fff2f7, #fff);
    border-bottom: 1rpx solid var(--love-line);
    /* 上留白交给 tabs-inner（badge 要向上溢出半个高度），这里只留底部呼吸 */
    padding-bottom: 12rpx;
  }
  &__search {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 24rpx;
    height: 72rpx;
  }
  /* 自定义组件撑满剩余宽度：外层 cell 是页面自己的节点，flex 一定生效 */
  &__search-cell {
    flex: 1 1 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }
  /* 组件根节点同名兜底（mp 端另有 :custom-style 内联，双通道） */
  &__search-input {
    flex: 1;
    width: 100%;
  }
  &__more {
    width: 56rpx;
    height: 56rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: none;
    color: var(--love-ink-2);
  }

  &__tabs {
    width: 100%;
    white-space: nowrap;
  }
  &__tabs-inner {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    /* 上 24rpx 专供 wd-badge 的 translateY(-50%) 溢出，scroll-view 才不会把角标切平；
       下 12rpx 是 tab 与搜索行之间的呼吸 */
    padding: 16rpx 20rpx 8rpx;
  }
  &__tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 68rpx;
    margin-right: 32rpx;
    flex: none;
  }
  &__tab-text {
    font-size: 26rpx;
  }
  &__tab-line {
    width: 100%;
    height: 4rpx;
    border-radius: 2rpx;
    margin-top: 6rpx;
  }

  /* ---------------- 列表 ---------------- */
  &__paging {
    background-color: transparent;
  }
  &__body {
    padding: 16rpx 24rpx 32rpx;
  }
  /* 当前筛选条件展示条（原「当前是示例数据」提示） */
  &__active {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    padding: 14rpx 20rpx;
    border-radius: 24rpx;
    background-color: #fff;
    border: 1rpx solid var(--love-line);
    margin-bottom: 20rpx;
  }
  &__active-label {
    font-size: 24rpx;
    color: var(--love-ink-3);
    margin-right: 12rpx;
    flex: none;
  }
  &__active-chips {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  &__active-chip {
    display: flex;
    align-items: center;
    justify-content: center;
    /* 上下 12rpx + 左右 20rpx，四个方向都有留白；配 line-height:1 让高度由 padding 稳定决定 */
    padding: 12rpx 20rpx;
    border-radius: 999rpx;
    margin-right: 8rpx;
    margin-bottom: 4rpx;
    flex: none;
  }
  &__active-chip-text {
    font-size: 24rpx;
    line-height: 1;
  }
  /* 与 label / chip 同行：同字号同字重，不再单独给「重置」加粗 */
  &__active-reset {
    font-size: 24rpx;
    margin-left: auto;
    flex: none;
  }
  &__todo {
    padding: 16rpx;
    border-radius: 26rpx;
    background-image: linear-gradient(120deg, #fff6f9, #ffeaf2);
    border: 1rpx solid #fff;
    margin-bottom: 20rpx;
  }
  &__todo-head {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &__todo-title {
    font-size: 24rpx;
    font-weight: 500;
    color: #96682a;
    margin-left: 8rpx;
  }
  &__todo-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 48rpx;
  }
  &__todo-dot {
    width: 10rpx;
    height: 10rpx;
    border-radius: 5rpx;
    margin-right: 12rpx;
    flex: none;
  }
  &__todo-content {
    flex: 1;
    min-width: 0;
    font-size: 24rpx;
    color: var(--love-ink-2);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__card {
    display: flex;
    flex-direction: row;
    background-color: #fff;
    border: 1rpx solid rgba(255, 255, 255, 0.9);
    border-radius: 28rpx;
    margin-bottom: 20rpx;
    overflow: hidden;
  }
  &__card-bar {
    width: 6rpx;
    flex: none;
  }
  &__card-body {
    flex: 1;
    min-width: 0;
    padding: 16rpx;
  }
  &__card-top {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
  &__pill {
    height: 36rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 12rpx;
    border-radius: 999rpx;
    margin-right: 8rpx;
    margin-bottom: 8rpx;
    background-color: var(--love-line);
    flex: none;
  }
  &__pill-text {
    font-size: 20rpx;
    color: var(--love-ink-2);
    margin-left: 4rpx;
  }
  &__pill-text--light {
    color: #fff;
  }
  /* 日期靠右上角，星标紧随其后；auto 给日期，星标只留固定间距 */
  &__card-date {
    margin-left: auto;
    font-size: 22rpx;
    color: var(--love-ink-3);
    flex: none;
  }
  &__star {
    margin-left: 8rpx;
    width: 48rpx;
    height: 48rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: none;
  }
  &__card-content {
    display: block;
    font-size: 28rpx;
    font-weight: 500;
    color: var(--love-ink);
    line-height: 1.55;
    margin-top: 8rpx;
  }
  &__card-memo {
    display: flex;
    flex-direction: column;
    padding: 18rpx;
    border-radius: 20rpx;
    background-color: var(--love-bg);
    margin-top: 16rpx;
  }
  &__card-memo-label {
    font-size: 20rpx;
    color: var(--love-ink-3);
    margin-bottom: 4rpx;
  }
  &__card-memo-text {
    font-size: 24rpx;
    color: var(--love-ink-2);
    line-height: 1.55;
  }
  &__card-meta {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 16rpx;
  }
  &__card-meta-text {
    font-size: 22rpx;
    color: var(--love-ink-3);
    margin-left: 8rpx;
  }
  &__card-meta-text--scene {
    flex: 1;
    min-width: 0;
    margin-left: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__card-tags-text {
    display: block;
    font-size: 20rpx;
    color: var(--love-ink-3);
    margin-top: 12rpx;
  }
  /* 附件缩略图：定宽高 rpx（禁 aspect-ratio，Android 不认），间距用 margin 不用 gap */
  &__card-attach {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 12rpx;
  }
  &__card-thumb {
    width: 160rpx;
    height: 160rpx;
    border-radius: 20rpx;
    overflow: hidden;
    background-color: var(--love-line);
    margin-right: 12rpx;
    margin-bottom: 12rpx;
  }
  &__card-thumb-img {
    width: 100%;
    height: 100%;
  }
  &__card-thumb-icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* ---------------- 悬浮按钮 ---------------- */
  &__fab {
    position: fixed;
    z-index: 100;
    right: 32rpx;
    bottom: 64rpx;
    width: 96rpx;
    height: 96rpx;
    border-radius: 52rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(140deg, #ff9dbb, #ee5a92);
    border: 3rpx solid rgba(255, 255, 255, 0.85);
  }
  &__fab:active {
    transform: scale(0.94);
  }

  /* ---------------- 筛选弹窗 ---------------- */
  &__sheet {
    padding: 16rpx 24rpx 32rpx;
    border-radius: 40rpx 40rpx 0 0;
    background-color: #fff;
  }
  &__sheet-title {
    display: block;
    font-size: 28rpx;
    font-weight: 500;
    color: var(--love-ink);
    margin-bottom: 8rpx;
  }
  &__sheet-label {
    display: block;
    font-size: 24rpx;
    color: var(--love-ink-3);
    margin-top: 24rpx;
    margin-bottom: 12rpx;
  }
  &__sheet-opts {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  &__sheet-opt {
    height: 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 24rpx;
    border-radius: 999rpx;
    margin-right: 12rpx;
    margin-bottom: 12rpx;
    flex: none;
  }
  &__sheet-opt-text {
    font-size: 24rpx;
  }
  &__sheet-switch {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-top: 1rpx solid var(--love-line);
    margin-top: 12rpx;
  }
  &__sheet-btns {
    display: flex;
    flex-direction: row;
    margin-top: 24rpx;
  }
}

/* ---------------- 竞品交互：随手记 / 长按菜单 / 点滴卡片 ---------------- */
.gf__quick {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
  padding: 8rpx 8rpx 8rpx 20rpx;
  border-radius: 999rpx;
  background-color: #fff;
  border: 1rpx solid var(--love-line);
}

.gf__quick-input {
  flex: 1 1 0;
  min-width: 0;
  height: 64rpx;
  font-size: 24rpx;
  color: var(--love-ink);
}

.gf__quick-placeholder {
  color: var(--love-ink-3);
}

.gf__quick-btn {
  flex-shrink: 0;
  padding: 14rpx 28rpx;
  border-radius: 999rpx;
  font-size: 22rpx;
  color: #fff;
  background-image: linear-gradient(100deg, #ff92b4, #ee5a92);
}

.gf__menu-quote {
  display: block;
  margin: 8rpx 4rpx 26rpx;
  padding: 16rpx 20rpx;
  border-radius: 24rpx;
  background-color: var(--love-bg);
  font-size: 24rpx;
  line-height: 1.6;
  color: var(--love-ink);
}

.gf__menu-grid {
  display: flex;
  gap: 14rpx;
}

.gf__menu-item {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16rpx 8rpx;
  border-radius: 24rpx;
  background-color: var(--love-bg);
  border: 1rpx solid var(--love-line);
}

.gf__menu-icon {
  width: 64rpx;
  height: 64rpx;
  border-radius: 22rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  color: #fff;
  background-image: linear-gradient(140deg, #ff9dbb, #ee5a92);
}

.gf__menu-icon--danger {
  background-image: linear-gradient(140deg, #f4a6b6, #d96b84);
}

.gf__menu-label {
  font-size: 22rpx;
  color: var(--love-ink-2);
  margin-top: 14rpx;
  text-align: center;
}

.gf__menu-tip {
  display: block;
  text-align: center;
  font-size: 20rpx;
  color: var(--love-ink-3);
  margin-top: 24rpx;
}

.gf__note-wrap {
  width: 620rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gf__note-card {
  position: relative;
  width: 100%;
  padding: 24rpx 24rpx 20rpx;
  border-radius: 40rpx;
  background-image: linear-gradient(155deg, #fff4f8, #ffe1ec 60%, #ffd6e5);
  border: 2rpx solid #fff;
  box-sizing: border-box;
  overflow: hidden;
}

.gf__note-deco {
  position: absolute;
  left: 26rpx;
  top: -18rpx;
  font-size: 170rpx;
  line-height: 1;
  color: rgba(238, 90, 146, 0.14);
}

.gf__note-eyebrow {
  display: block;
  position: relative;
  font-size: 20rpx;
  letter-spacing: 3rpx;
  color: #c2739a;
}

.gf__note-content {
  display: block;
  position: relative;
  font-size: 32rpx;
  line-height: 1.75;
  color: #6d4355;
  margin-top: 30rpx;
  font-weight: 500;
}

.gf__note-line {
  height: 1rpx;
  background-color: rgba(238, 90, 146, 0.2);
  margin: 44rpx 0 20rpx;
}

.gf__note-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20rpx;
  color: #b07e95;
}

.gf__note-actions {
  display: flex;
  gap: 16rpx;
  width: 100%;
  margin-top: 28rpx;
}

.gf__note-btn {
  flex: 1 1 0;
  text-align: center;
  padding: 20rpx 0;
  border-radius: 999rpx;
  font-size: 24rpx;
  color: #fff;
  background-image: linear-gradient(100deg, #ff92b4, #ee5a92);
}

.gf__note-btn--ghost {
  color: #b14077;
  background-image: none;
  background-color: #fff;
  border: 1rpx solid #ffd7e6;
}

.gf__note-tip {
  font-size: 20rpx;
  color: #9b6b82;
  opacity: 0.9;
  margin-top: 20rpx;
}

</style>
