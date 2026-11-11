<!--
  情侣空间 · 100 件小事
  交互口径参考恋爱记 / 小恩爱：列表只负责「看」，点开才是解锁卡片 ——
  上传一张合照、写一句当天的心情，确认后才算完成，并有解锁仪式；
  已完成的内容进「已完成」时间轴回看，撤销必须二次确认。
  预置的 100 件不可删（竞品只允许替换），自己加的才可移除。
-->
<template>
  <view :style="themeVars" class="ck lv-page">
    <view class="ck__hero lv-hero">
      <view class="lv-orb lv-orb--tr" />
      <view class="lv-orb lv-orb--bl" />
      <text class="lv-heart lv-heart--a love-icon love-i-heart" />
      <text class="lv-heart lv-heart--b love-icon love-i-heart" />
      <view class="lv-spark lv-spark--a" />
      <view class="lv-spark lv-spark--c" />
      <view class="lv-hero-in">
        <text class="lv-eyebrow">OUR 100 LITTLE THINGS</text>
        <view class="ck__hero-row">
          <text class="lv-display lv-display--sm">{{ love.checklistDoneCount }}</text>
          <text class="ck__hero-total">/ {{ love.checklist.length }}</text>
        </view>
        <text class="ck__hero-label">件小事，已经一起完成啦</text>
        <view class="ck__bar">
          <view class="ck__bar-fill" :style="{ width: love.checklistProgress + '%' }">
            <text class="ck__bar-heart love-icon love-i-heart" />
          </view>
        </view>
        <text class="ck__hero-tip">点开一件，用一张合照和一句话解锁它</text>
      </view>
    </view>

    <scroll-view class="ck__tabs" scroll-x :show-scrollbar="false">
      <view class="ck__tabs-inner">
        <view
          v-for="tab in tabs"
          :key="tab"
          class="ck__tab"
          :class="{ 'ck__tab--on': activeTab === tab }"
          @click="onTab(tab)">
          {{ tab }}
        </view>
      </view>
    </scroll-view>

    <view v-if="shown.length" class="ck__list">
      <view
        v-for="(item, index) in shown"
        :key="item.id"
        class="ck__item lv-card"
        :class="{ 'ck__item--done': item.done }"
        @click="openDetail(item)">
        <view class="ck__check" :class="{ 'ck__check--on': item.done }">
          <text v-if="item.done" class="ck__check-heart love-icon love-i-heart" />
        </view>
        <view class="ck__body">
          <text class="ck__title" :class="{ 'ck__title--done': item.done }">{{ item.title }}</text>
          <view class="ck__meta-row">
            <text class="ck__cat">{{ item.category }}</text>
            <text v-if="item.doneAt" class="ck__date">{{ item.doneAt }} 解锁</text>
            <text v-else class="ck__todo">去解锁 ›</text>
          </view>
          <text v-if="item.done && item.note" class="ck__note">「{{ item.note }}」</text>
        </view>
        <image v-if="item.done && item.image" class="ck__thumb" :src="item.image" mode="aspectFill" />
        <text class="ck__index">{{ ('0' + (index + 1)).slice(-2) }}</text>
        <text
          v-if="item.custom"
          class="ck__remove"
          @click.stop="onRemoveCustom(item.id)">{{ confirmRemoveId === item.id ? '确认?' : '删除' }}</text>
      </view>
    </view>
    <view v-else class="lv-empty">
      <view class="lv-empty__orb love-icon" :class="activeTab === '已完成' ? 'love-i-heart' : 'love-i-todo'" />
      <text class="lv-empty__text">{{ emptyText }}</text>
    </view>

    <view class="lv-fab" @click="addVisible = true">
      <wd-icon name="add" size="24px" color="#fff" />
    </view>

    <!-- 解锁 / 回忆弹层 -->
    <wd-popup
      :model-value="detailVisible"
      position="bottom"
      :safe-area-inset-bottom="false"
      :close-on-click-modal="true"
      :root-portal="true"
      :z-index="200"
      @update:model-value="onDetailUpdate">
      <view class="lv-sheet ck__sheet">
        <view class="lv-handle" />
        <view v-if="active" class="ck__detail">
          <view class="ck__detail-head">
            <text class="ck__detail-no">NO. {{ activeIndex }}</text>
            <text class="ck__detail-title">{{ active.title }}</text>
            <text class="ck__detail-cat">{{ active.category }} · {{ active.done ? '已解锁' : '还没一起做' }}</text>
          </view>

          <!-- 未完成：留一张合照 + 一句心情，确认才解锁 -->
          <view v-if="!active.done" class="ck__unlock">
            <view class="ck__photo" @click="onChoosePhoto">
              <image v-if="photo" class="ck__photo-img" :src="photo" mode="aspectFill" />
              <view v-else class="ck__photo-empty">
                <text class="ck__photo-icon love-icon love-i-camera" />
                <text class="ck__photo-tip">加一张那天的合照</text>
                <text class="ck__photo-sub">留个画面，以后翻到会笑出来</text>
              </view>
              <text v-if="photo" class="ck__photo-change">换一张</text>
            </view>
            <view class="ck__note-box">
              <text class="ck__field-label">那天的心情</text>
              <textarea
                v-model="note"
                class="ck__textarea"
                :maxlength="80"
                placeholder="写一句就好，比如「那天的风特别软」…"
                placeholder-class="ck__placeholder" />
            </view>
            <text class="ck__unlock-hint">解锁后自动记下今天的日期，存进「已完成」</text>
            <wd-button block round :custom-style="LOVE_PRIMARY_BTN" @click="onComplete">
              解锁这件小事
            </wd-button>
          </view>

          <!-- 已完成：回看留念，撤销需要二次确认 -->
          <view v-else class="ck__recall">
            <image v-if="active.image" class="ck__recall-photo" :src="active.image" mode="aspectFill" />
            <view class="ck__recall-note">
              <text class="ck__recall-deco">“</text>
              <text class="ck__recall-text">{{ active.note || '那一天，我们把它完成了。' }}</text>
            </view>
            <view class="ck__recall-date">
              <text class="love-icon love-i-calendar" />
              <text>{{ active.doneAt }} 解锁 · 已收好 {{ love.checklistDoneCount }} 件</text>
            </view>
            <text class="ck__undo" @click="onUndo">{{ undoConfirm ? '确定撤销？再点一次' : '撤销这次打卡' }}</text>
          </view>
        </view>
      </view>
    </wd-popup>

    <!-- 加一件小事 -->
    <wd-popup
      :model-value="addVisible"
      position="bottom"
      :safe-area-inset-bottom="false"
      :close-on-click-modal="true"
      :root-portal="true"
      :z-index="200"
      @update:model-value="onAddUpdate">
      <view class="lv-sheet">
        <view class="lv-handle" />
        <text class="lv-sheet__title">加一件只属于我们的小事</text>
        <view class="ck__sheet-cell">
          <wd-input
            v-model="newTitle"
            :custom-style="'flex: 1; width: 100%; min-width: 0;'"
            no-border
            :maxlength="30"
            placeholder="比如：一起去看一次海边日出" />
        </view>
        <wd-button block round :custom-style="LOVE_PRIMARY_BTN" @click="onAdd">
          加进清单
        </wd-button>
      </view>
    </wd-popup>

    <!-- 解锁仪式 -->
    <view v-if="celebrate" class="ck__celebrate" @click="closeCelebrate">
      <view class="ck__celebrate-in">
        <view class="ck__celebrate-ring">
          <text class="love-icon love-i-heart" />
        </view>
        <text class="ck__celebrate-title">解锁啦</text>
        <text class="ck__celebrate-sub">第 {{ celebrate.count }} 件小事，收好了</text>
        <text class="ck__celebrate-date">{{ celebrate.date }}</text>
        <text class="ck__celebrate-tip">点一下继续</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useThemeVars } from '@/composables/useThemeVars'
import { useLoveStore } from '@/stores/love'
import { LOVE_CATEGORIES, LOVE_PRIMARY_BTN, todayStr } from '@/constants/love'
import { chooseLocalImage } from '@/utils/chooseImage'
import { toast } from '@/utils'
import type { LoveChecklistItem } from '@/types/love'

const themeVars = useThemeVars()
const love = useLoveStore()

const tabs = ['全部', ...LOVE_CATEGORIES, '我们加的', '已完成']
const activeTab = ref('全部')
const shown = computed(() => {
  if (activeTab.value === '已完成') return love.completedChecklist
  return love.checklist.filter(item => {
    if (activeTab.value === '全部') return true
    if (activeTab.value === '我们加的') return item.custom
    return item.category === activeTab.value
  })
})
const emptyText = computed(() =>
  activeTab.value === '已完成'
    ? '还没有解锁的小事，从清单里挑一件吧'
    : '这个分类还没有小事，点右下角加一件'
)

const confirmRemoveId = ref('')
const onTab = (tab: string) => {
  activeTab.value = tab
  confirmRemoveId.value = ''
}
const onRemoveCustom = (id: string) => {
  if (confirmRemoveId.value !== id) {
    confirmRemoveId.value = id
    toast('再点一次删除')
    return
  }
  love.removeChecklistItem(id)
  confirmRemoveId.value = ''
  toast('已移除')
}

/* ---------------- 解锁 / 回忆详情 ---------------- */

const detailVisible = ref(false)
const active = ref<LoveChecklistItem | null>(null)
const note = ref('')
const photo = ref('')
const undoConfirm = ref(false)

/** 序号按清单里的真实位置算，不随分类筛选变化 */
const activeIndex = computed(() => {
  if (!active.value) return 0
  const id = active.value.id
  const i = love.checklist.findIndex(x => x.id === id)
  return i < 0 ? 0 : i + 1
})

const openDetail = (item: LoveChecklistItem) => {
  active.value = item
  note.value = ''
  photo.value = ''
  undoConfirm.value = false
  confirmRemoveId.value = ''
  detailVisible.value = true
}
const onDetailUpdate = (v: boolean) => {
  detailVisible.value = v
  if (!v) undoConfirm.value = false
}

const onChoosePhoto = async () => {
  const path = await chooseLocalImage()
  if (path) photo.value = path
}

const celebrate = ref<{ count: number; date: string } | null>(null)
let celebrateTimer: ReturnType<typeof setTimeout> | null = null
const closeCelebrate = () => {
  if (celebrateTimer) clearTimeout(celebrateTimer)
  celebrate.value = null
}

const onComplete = () => {
  if (!active.value) return
  if (!photo.value && !note.value.trim()) {
    toast('留一张合照，或者写一句那天的心情')
    return
  }
  love.completeChecklistItem(active.value.id, note.value, photo.value)
  detailVisible.value = false
  celebrate.value = { count: love.checklistDoneCount, date: todayStr() }
  if (celebrateTimer) clearTimeout(celebrateTimer)
  celebrateTimer = setTimeout(() => {
    celebrate.value = null
  }, 2400)
}

const onUndo = () => {
  if (!active.value) return
  if (!undoConfirm.value) {
    undoConfirm.value = true
    return
  }
  love.undoChecklistItem(active.value.id)
  detailVisible.value = false
  toast('已撤销，可以重新打卡')
}

/* ---------------- 新增小事 ---------------- */

const addVisible = ref(false)
const newTitle = ref('')
const onAddUpdate = (v: boolean) => {
  addVisible.value = v
}
const onAdd = () => {
  if (!newTitle.value.trim()) {
    toast('先写下想一起做的事')
    return
  }
  love.addChecklistItem(newTitle.value)
  newTitle.value = ''
  addVisible.value = false
  activeTab.value = '我们加的'
  confirmRemoveId.value = ''
  toast('加好了')
}
</script>

<style lang="scss" scoped>
.ck {
  min-height: 100vh;
  padding: 30rpx 30rpx 180rpx;
  box-sizing: border-box;
}

/* ---------------- 进度主视觉 ---------------- */
.ck__hero {
  padding: 28rpx 24rpx 28rpx;
}

.ck__hero-row {
  display: flex;
  align-items: baseline;
  margin-top: 24rpx;
}

.ck__hero-total {
  font-size: 34rpx;
  font-weight: 300;
  margin-left: 16rpx;
  opacity: 0.85;
}

.ck__hero-label {
  display: block;
  font-size: 24rpx;
  opacity: 0.92;
  margin-top: 14rpx;
}

.ck__bar {
  height: 18rpx;
  border-radius: 999rpx;
  background-color: rgba(255, 255, 255, 0.28);
  margin-top: 30rpx;
}

.ck__bar-fill {
  min-width: 28rpx;
  height: 100%;
  border-radius: 999rpx;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 4rpx;
  box-sizing: border-box;
  background-image: linear-gradient(90deg, rgba(255, 255, 255, 0.85), #fff);
}

.ck__bar-heart {
  font-size: 18rpx;
  color: #ee5a92;
  line-height: 1;
}

.ck__hero-tip {
  display: block;
  font-size: 21rpx;
  opacity: 0.85;
  margin-top: 18rpx;
  letter-spacing: 1rpx;
}

/* ---------------- 分类胶囊 ---------------- */
.ck__tabs {
  margin: 34rpx -30rpx 26rpx;
  white-space: nowrap;
}

.ck__tabs-inner {
  display: inline-flex;
  padding: 0 30rpx;
  gap: 14rpx;
}

.ck__tab {
  padding: 14rpx 30rpx;
  border-radius: 999rpx;
  font-size: 24rpx;
  color: var(--love-ink-2);
  background-color: #fff;
  border: 1rpx solid var(--love-line);
  flex-shrink: 0;
}

.ck__tab--on {
  color: #fff;
  border-color: transparent;
  background-image: linear-gradient(100deg, #ff92b4, #ee5a92);
}

/* ---------------- 清单条目 ---------------- */
.ck__list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.ck__item {
  display: flex;
  align-items: center;
  padding: 16rpx 20rpx;
}

.ck__item--done {
  background-image: linear-gradient(100deg, #fff, #fff3f7);
}

.ck__check {
  width: 48rpx;
  height: 48rpx;
  border: 2rpx solid #f3d2df;
  border-radius: 50%;
  margin-right: 22rpx;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}

.ck__check--on {
  border-color: transparent;
  background-image: linear-gradient(140deg, #ff9dbb, #ee5a92);
}

.ck__check-heart {
  color: #fff;
  font-size: 24rpx;
  line-height: 1;
}

.ck__body {
  flex: 1 1 0;
  min-width: 0;
}

.ck__title {
  display: block;
  font-size: 27rpx;
  color: var(--love-ink);
  line-height: 1.5;
}

/* 已完成不划掉：这是一段回忆，不是待办 */
.ck__title--done {
  color: var(--love-ink-2);
}

.ck__meta-row {
  display: flex;
  align-items: center;
  margin-top: 10rpx;
}

.ck__cat {
  font-size: 19rpx;
  color: #d2598c;
  padding: 4rpx 14rpx;
  border-radius: 999rpx;
  background-color: var(--love-soft);
}

.ck__date {
  font-size: 19rpx;
  color: var(--love-ink-3);
  margin-left: 12rpx;
}

.ck__todo {
  font-size: 19rpx;
  color: #d2598c;
  margin-left: 12rpx;
}

.ck__note {
  display: block;
  font-size: 21rpx;
  color: var(--love-ink-2);
  margin-top: 10rpx;
  line-height: 1.6;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ck__thumb {
  width: 88rpx;
  height: 88rpx;
  border-radius: 18rpx;
  margin-left: 12rpx;
  flex-shrink: 0;
  background-color: var(--love-soft);
}

.ck__index {
  font-size: 22rpx;
  font-weight: 300;
  color: #e6c6d3;
  margin-left: 12rpx;
  flex-shrink: 0;
}

.ck__remove {
  font-size: 20rpx;
  color: var(--love-ink-3);
  padding: 6rpx 14rpx;
  border-radius: 999rpx;
  background-color: var(--love-bg);
  margin-left: 10rpx;
  flex-shrink: 0;
}

/* ---------------- 解锁 / 回忆弹层 ---------------- */
.ck__sheet {
  padding: 16rpx 24rpx 32rpx;
}

.ck__detail-head {
  padding: 8rpx 4rpx 20rpx;
  border-bottom: 1rpx solid var(--love-line);
}

.ck__detail-no {
  display: block;
  font-size: 20rpx;
  letter-spacing: 3rpx;
  color: #d07ca0;
}

.ck__detail-title {
  display: block;
  font-size: 36rpx;
  font-weight: 600;
  line-height: 1.5;
  color: var(--love-ink);
  margin-top: 12rpx;
}

.ck__detail-cat {
  display: block;
  font-size: 21rpx;
  color: var(--love-ink-3);
  margin-top: 8rpx;
}

.ck__photo {
  position: relative;
  width: 100%;
  height: 240rpx;
  border-radius: 28rpx;
  overflow: hidden;
  margin-top: 28rpx;
  background-image: linear-gradient(140deg, #fff4f8, #ffe4ee);
  border: 2rpx dashed #f0b6ce;
  box-sizing: border-box;
}

.ck__photo-img {
  width: 100%;
  height: 100%;
}

.ck__photo-empty {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.ck__photo-icon {
  font-size: 56rpx;
  color: #e59ab9;
  line-height: 1;
}

.ck__photo-tip {
  font-size: 25rpx;
  color: #c96b98;
  margin-top: 18rpx;
}

.ck__photo-sub {
  font-size: 20rpx;
  color: var(--love-ink-3);
  margin-top: 8rpx;
}

.ck__photo-change {
  position: absolute;
  right: 18rpx;
  bottom: 18rpx;
  padding: 8rpx 20rpx;
  border-radius: 999rpx;
  background-color: rgba(61, 43, 51, 0.55);
  color: #fff;
  font-size: 19rpx;
}

.ck__note-box {
  margin-top: 26rpx;
}

.ck__field-label {
  display: block;
  font-size: 23rpx;
  color: var(--love-ink-2);
  margin-bottom: 14rpx;
}

.ck__textarea {
  width: 100%;
  height: 132rpx;
  padding: 16rpx 20rpx;
  border-radius: 22rpx;
  background-color: var(--love-bg);
  border: 1rpx solid var(--love-line);
  font-size: 26rpx;
  color: var(--love-ink);
  line-height: 1.7;
  box-sizing: border-box;
}

.ck__placeholder {
  color: var(--love-ink-3);
}

.ck__unlock-hint {
  display: block;
  font-size: 20rpx;
  color: var(--love-ink-3);
  text-align: center;
  margin: 22rpx 0 24rpx;
}

.ck__recall-photo {
  width: 100%;
  height: 300rpx;
  border-radius: 28rpx;
  margin-top: 28rpx;
  background-color: var(--love-soft);
}

.ck__recall-note {
  position: relative;
  margin-top: 26rpx;
  padding: 20rpx 24rpx;
  border-radius: 26rpx;
  background-image: linear-gradient(140deg, #fff7fa, #ffeef5);
  border-left: 4rpx solid #f7bcd2;
  overflow: hidden;
}

.ck__recall-deco {
  position: absolute;
  right: 18rpx;
  top: -30rpx;
  font-size: 110rpx;
  line-height: 1;
  color: rgba(238, 90, 146, 0.1);
}

.ck__recall-text {
  position: relative;
  display: block;
  font-size: 27rpx;
  color: var(--love-ink);
  line-height: 1.8;
}

.ck__recall-date {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 26rpx;
  font-size: 21rpx;
  color: var(--love-ink-3);
}

.ck__recall-date .love-icon {
  font-size: 24rpx;
  color: #e0518c;
  margin-right: 10rpx;
}

.ck__undo {
  display: block;
  text-align: center;
  font-size: 22rpx;
  color: var(--love-ink-3);
  padding: 24rpx 0 4rpx;
}

/* ---------------- 新增小事 ---------------- */
.ck__sheet-cell {
  display: flex;
  min-width: 0;
  padding: 16rpx 20rpx;
  margin-bottom: 32rpx;
  border-radius: 22rpx;
  background-color: var(--love-bg);
  border: 1rpx solid var(--love-line);
}

/* ---------------- 解锁仪式 ---------------- */
.ck__celebrate {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(160deg, rgba(255, 214, 231, 0.97), rgba(238, 90, 146, 0.94));
}

.ck__celebrate-in {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx;
}

.ck__celebrate-ring {
  width: 190rpx;
  height: 190rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.92);
  animation: ck-pop 0.5s ease-out both;
}

.ck__celebrate-ring .love-icon {
  font-size: 88rpx;
  color: #ee5a92;
  line-height: 1;
  animation: ck-beat 1.2s ease-in-out infinite;
}

.ck__celebrate-title {
  font-size: 48rpx;
  font-weight: 300;
  letter-spacing: 6rpx;
  color: #fff;
  margin-top: 56rpx;
}

.ck__celebrate-sub {
  font-size: 25rpx;
  color: rgba(255, 255, 255, 0.95);
  margin-top: 18rpx;
}

.ck__celebrate-date {
  font-size: 21rpx;
  letter-spacing: 2rpx;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 12rpx;
}

.ck__celebrate-tip {
  font-size: 19rpx;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 80rpx;
}

@keyframes ck-pop {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  70% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes ck-beat {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.14);
  }
}
</style>
