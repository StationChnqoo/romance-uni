<!--
  情侣空间 · 纪念日。
  竞品口径（恋爱记 / 恋爱纪念日 / 小恩爱）：
  - 点卡片进详情而不是直接删；编辑 / 置顶 / 提前提醒都在详情里，删除要二次确认。
  - 倒数日 + 正数日双模式：过去的一次性日子在「已经历」里显示「已经过去 N 天」。
  - 可把重要的日子置顶，按临近或按添加时间排序；临近 7 天的卡片视觉加重。
  - 自动里程碑与双方生日由开始日期 / 资料算出，只读，改资料会自动重算。
-->
<template>
  <view :style="themeVars" class="ann lv-page">
    <view class="ann__hero lv-hero">
      <view class="lv-orb lv-orb--tr" />
      <view class="lv-orb lv-orb--bl" />
      <text class="lv-heart lv-heart--a love-icon love-i-heart" />
      <text class="lv-heart lv-heart--b love-icon love-i-heart" />
      <view class="lv-spark lv-spark--a" />
      <view class="lv-spark lv-spark--b" />
      <view class="lv-hero-in">
        <text class="lv-eyebrow">NEXT SPECIAL DAY</text>
        <template v-if="next">
          <view class="ann__hero-main">
            <view class="lv-icon ann__hero-icon love-icon" :class="'love-i-' + next.icon" />
            <text class="ann__hero-title">{{ next.title }}</text>
          </view>
          <view class="ann__hero-count">
            <text v-if="next.daysLeft === 0" class="lv-display lv-display--sm love-icon love-i-heart" />
            <text v-else class="lv-display lv-display--sm">{{ next.daysLeft }}</text>
            <text class="ann__hero-unit">{{ next.daysLeft === 0 ? '就是今天' : '天后见' }}</text>
          </view>
          <text class="ann__hero-date">{{ next.date }}{{ next.pinned ? ' · 已置顶' : '' }}</text>
        </template>
        <text v-else class="ann__hero-empty">先去设置里填「在一起的那天」吧</text>
      </view>
    </view>

    <!-- 倒数日 / 正数日 -->
    <view class="ann__tabs">
      <view class="ann__tab" :class="{ 'ann__tab--on': tab === 'soon' }" @click="tab = 'soon'">
        即将到来
      </view>
      <view class="ann__tab" :class="{ 'ann__tab--on': tab === 'past' }" @click="tab = 'past'">
        已经历 {{ love.pastAnniversaries.length ? love.pastAnniversaries.length : '' }}
      </view>
    </view>

    <view v-if="tab === 'soon'" class="ann__sort">
      <text class="ann__sort-hint">共 {{ list.length }} 个日子</text>
      <view class="ann__sort-chips">
        <text class="ann__sort-chip" :class="{ 'ann__sort-chip--on': sortBy === 'soon' }" @click="sortBy = 'soon'">按临近</text>
        <text class="ann__sort-chip" :class="{ 'ann__sort-chip--on': sortBy === 'created' }" @click="sortBy = 'created'">按添加</text>
      </view>
    </view>
    <text v-if="tab === 'soon'" class="ann__hint">带「自动」的是按我们的资料算出来的；点卡片看详情</text>

    <view v-if="tab === 'soon' && list.length" class="ann__list">
      <view
        v-for="item in list"
        :key="item.id"
        class="ann__card lv-card"
        :class="{ 'ann__card--soon': item.daysLeft <= 7 }"
        @click="onOpenDetail(item.id)">
        <view class="ann__stripe" />
        <view class="lv-icon ann__icon love-icon" :class="'love-i-' + item.icon" />
        <view class="ann__body">
          <view class="ann__title-row">
            <text class="ann__title">{{ item.title }}</text>
            <text v-if="item.pinned" class="ann__pin love-icon love-i-star" />
          </view>
          <text class="ann__date">{{ item.date }}{{ item.years ? ` · 第 ${item.years} 年` : '' }}</text>
          <view class="ann__tags">
            <text v-if="item.auto" class="ann__tag">自动算出</text>
            <text v-if="item.remind > 0" class="ann__tag ann__tag--remind">提前 {{ item.remind }} 天提醒</text>
            <text v-if="item.remind > 0 && item.daysLeft <= item.remind" class="ann__tag ann__tag--now">该准备啦</text>
          </view>
        </view>
        <view class="ann__right">
          <text class="ann__days">{{ item.daysLeft === 0 ? '今天' : item.daysLeft }}</text>
          <text v-if="item.daysLeft !== 0" class="ann__unit">天后</text>
          <text class="ann__go">详情 ›</text>
        </view>
      </view>
    </view>

    <!-- 正数日：竞品的「已经一起走过」 -->
    <view v-if="tab === 'past' && love.pastAnniversaries.length" class="ann__list">
      <view v-for="item in love.pastAnniversaries" :key="item.id" class="ann__card lv-card ann__card--past">
        <view class="ann__stripe" />
        <view class="lv-icon ann__icon love-icon" :class="'love-i-' + item.icon" />
        <view class="ann__body">
          <text class="ann__title">{{ item.title }}</text>
          <text class="ann__date">{{ item.date }} · 已经过去</text>
          <text v-if="item.note" class="ann__note">{{ item.note }}</text>
        </view>
        <view class="ann__right">
          <text class="ann__days">{{ item.daysPassed }}</text>
          <text class="ann__unit">天了</text>
        </view>
      </view>
    </view>

    <view v-if="(tab === 'soon' && !list.length) || (tab === 'past' && !love.pastAnniversaries.length)" class="lv-empty">
      <view class="lv-empty__orb love-icon love-i-sparkle" />
      <text class="lv-empty__text">{{ tab === 'soon' ? '还没有记下特别的日子，点右下角加一个' : '还没有过去的日子，等我们慢慢攒' }}</text>
    </view>

    <view class="lv-fab" @click="onOpenAdd">
      <wd-icon name="add" size="24px" color="#fff" />
    </view>

    <wd-popup
      :model-value="sheetVisible"
      position="bottom"
      :safe-area-inset-bottom="false"
      :close-on-click-modal="true"
      :root-portal="true"
      :z-index="200"
      @update:model-value="onPopupUpdate">
      <view class="lv-sheet">
        <view class="lv-handle" />

        <!-- 详情：只读展示 + 编辑 / 置顶 / 删除 -->
        <template v-if="mode === 'detail' && detail">
          <text class="lv-sheet__title">{{ detail.title }}</text>
          <view class="ann__detail">
            <view class="ann__detail-icon lv-icon love-icon" :class="'love-i-' + detail.icon" />
            <view class="ann__detail-main">
              <text class="ann__detail-count">{{ detail.daysLeft === 0 ? '就是今天' : `还有 ${detail.daysLeft} 天` }}</text>
              <text class="ann__detail-date">{{ detail.date }} · {{ detail.years ? `第 ${detail.years} 年` : (detail.auto ? '自动算出' : '只此一次') }}</text>
            </view>
          </view>
          <view class="ann__detail-lines">
            <view class="ann__detail-line">
              <text class="ann__detail-label">{{ detail.auto ? '我们已经一起走过' : '从那天到今天' }}</text>
              <text class="ann__detail-value">{{ detail.auto ? love.daysTogetherCount : detail.daysPassed }} 天</text>
            </view>
            <view class="ann__detail-line">
              <text class="ann__detail-label">提前提醒</text>
              <text class="ann__detail-value">{{ detail.remind ? `提前 ${detail.remind} 天` : '当天' }}</text>
            </view>
            <view v-if="detail.note" class="ann__detail-line">
              <text class="ann__detail-label">那天想做</text>
              <text class="ann__detail-value">{{ detail.note }}</text>
            </view>
          </view>
          <text v-if="detail.auto" class="ann__detail-tip">这是按我们的资料自动算出来的，改资料就会跟着变</text>

          <view v-if="!detail.auto" class="ann__detail-actions">
            <wd-button block round :custom-style="LOVE_PRIMARY_BTN" @click="onStartEdit">编辑这个日子</wd-button>
            <view class="ann__detail-minor">
              <text class="ann__minor-btn" @click="onTogglePin">{{ detail.pinned ? '取消置顶' : '置顶这个日子' }}</text>
              <text class="ann__minor-btn ann__minor-btn--danger" @click="onDelete">
                {{ deleteArmed ? '再点一次确认删除' : '删除' }}
              </text>
            </view>
          </view>
        </template>

        <!-- 新增 / 编辑表单 -->
        <template v-else>
          <text class="lv-sheet__title">{{ mode === 'edit' ? '改一改这个日子' : '加一个纪念日' }}</text>

          <view class="ann__field">
            <text class="ann__field-label">叫什么</text>
            <view class="ann__field-cell ann__input">
              <wd-input
                v-model="form.title"
                :custom-style="'flex: 1; width: 100%; min-width: 0;'"
                no-border
                :maxlength="20"
                placeholder="比如：她的生日 / 第一次旅行" />
            </view>
          </view>

          <view class="ann__field">
            <text class="ann__field-label">哪一天</text>
            <picker mode="date" :value="form.date" @change="onDateChange">
              <view class="ann__field-value">{{ form.date }} ›</view>
            </picker>
          </view>

          <view class="ann__field">
            <text class="ann__field-label">想记一句</text>
            <view class="ann__field-cell ann__input">
              <wd-input
                v-model="form.note"
                :custom-style="'flex: 1; width: 100%; min-width: 0;'"
                no-border
                :maxlength="40"
                placeholder="那天要准备什么（可不填）" />
            </view>
          </view>

          <view class="ann__field ann__field--stack">
            <text class="ann__field-label">重复</text>
            <view class="ann__chips">
              <view class="ann__chip" :class="{ 'ann__chip--on': form.repeat === 'yearly' }" @click="form.repeat = 'yearly'">每年</view>
              <view class="ann__chip" :class="{ 'ann__chip--on': form.repeat === 'once' }" @click="form.repeat = 'once'">仅一次</view>
            </view>
          </view>

          <view class="ann__field ann__field--stack">
            <text class="ann__field-label">提前提醒</text>
            <view class="ann__chips ann__chips--wrap">
              <view
                v-for="option in REMIND_OPTIONS"
                :key="option.value"
                class="ann__chip ann__chip--sm"
                :class="{ 'ann__chip--on': form.remind === option.value }"
                @click="form.remind = option.value">{{ option.label }}</view>
            </view>
            <text class="ann__field-tip">临近时会在首页 / 本页提示，不发系统通知</text>
          </view>

          <view class="ann__field ann__field--stack">
            <text class="ann__field-label">挑个图标</text>
            <view class="ann__icons">
              <text
                v-for="name in ANNIVERSARY_ICONS"
                :key="name"
                class="ann__emoji love-icon"
                :class="'love-i-' + name + (form.icon === name ? ' ann__emoji--on' : '')"
                @click="form.icon = name" />
            </view>
          </view>

          <view class="ann__form-actions">
            <wd-button v-if="mode === 'edit'" round :custom-style="LOVE_GHOST_BTN" @click="onCancelEdit">取消</wd-button>
            <wd-button block round :custom-style="LOVE_PRIMARY_BTN" @click="onSave">
              {{ mode === 'edit' ? '保存修改' : '记下来' }}
            </wd-button>
          </view>
        </template>
      </view>
    </wd-popup>
  </view>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { useThemeVars } from '@/composables/useThemeVars'
import { useLoveStore } from '@/stores/love'
import {
  ANNIVERSARY_ICONS,
  LOVE_GHOST_BTN,
  LOVE_PRIMARY_BTN,
  REMIND_OPTIONS,
  todayStr
} from '@/constants/love'
import type { LoveUpcoming } from '@/types/love'
import { toast } from '@/utils'

const themeVars = useThemeVars()
const love = useLoveStore()

type Mode = 'add' | 'detail' | 'edit'
const tab = ref<'soon' | 'past'>('soon')
const sortBy = ref<'soon' | 'created'>('soon')
const sheetVisible = ref(false)
const mode = ref<Mode>('add')
const activeId = ref('')
const deleteArmed = ref(false)

const list = computed(() => {
  const arr = [...love.upcoming]
  if (sortBy.value === 'created') {
    return arr.sort(
      (a, b) =>
        Number(b.pinned) - Number(a.pinned) ||
        (b.createdAt || '').localeCompare(a.createdAt || '') ||
        a.daysLeft - b.daysLeft
    )
  }
  return arr
})
const next = computed(() => list.value[0])
const detail = computed<LoveUpcoming | undefined>(() =>
  list.value.find(item => item.id === activeId.value)
)

const form = reactive({
  title: '',
  date: todayStr(),
  repeat: 'yearly' as 'yearly' | 'once',
  icon: 'heart',
  remind: 0,
  note: ''
})

const resetForm = () => {
  form.title = ''
  form.date = todayStr()
  form.repeat = 'yearly'
  form.icon = 'heart'
  form.remind = 0
  form.note = ''
}
const onOpenAdd = () => {
  resetForm()
  mode.value = 'add'
  deleteArmed.value = false
  sheetVisible.value = true
}
const onOpenDetail = (id: string) => {
  activeId.value = id
  mode.value = 'detail'
  deleteArmed.value = false
  sheetVisible.value = true
}
const onPopupUpdate = (v: boolean) => {
  sheetVisible.value = v
  if (!v) deleteArmed.value = false
}
const onDateChange = (e: { detail: { value: string } }) => {
  form.date = e.detail.value
}

const onStartEdit = () => {
  const raw = love.anniversaries.find(a => a.id === activeId.value)
  if (!raw) return
  form.title = raw.title
  form.date = raw.date
  form.repeat = raw.repeat
  form.icon = raw.icon
  form.remind = raw.remind || 0
  form.note = raw.note || ''
  mode.value = 'edit'
}
const onCancelEdit = () => {
  mode.value = 'detail'
}
const onTogglePin = () => {
  love.toggleAnniversaryPin(activeId.value)
  toast(detail.value?.pinned ? '已置顶' : '已取消置顶')
  sheetVisible.value = false
}
const onDelete = () => {
  if (!deleteArmed.value) {
    deleteArmed.value = true
    return
  }
  love.removeAnniversary(activeId.value)
  sheetVisible.value = false
  deleteArmed.value = false
  toast('已删除')
}
const onSave = () => {
  if (!form.title.trim()) {
    toast('先给它起个名字吧')
    return
  }
  const patch = {
    title: form.title.trim(),
    date: form.date,
    repeat: form.repeat,
    icon: form.icon,
    remind: form.remind,
    note: form.note.trim()
  }
  if (mode.value === 'edit') {
    love.updateAnniversary(activeId.value, patch)
    toast('改好啦')
  } else {
    love.addAnniversary(patch)
    toast('记下了，到时候一起过')
  }
  sheetVisible.value = false
}
</script>

<style lang="scss" scoped>
.ann {
  min-height: 100vh;
  padding: 30rpx 30rpx 180rpx;
  box-sizing: border-box;
}

/* ---------------- 主视觉 ---------------- */
.ann__hero {
  padding: 28rpx 24rpx 28rpx;
}

.ann__hero-main {
  display: flex;
  align-items: center;
  margin-top: 30rpx;
}

.ann__hero-icon {
  background-image: linear-gradient(140deg, rgba(255, 255, 255, 0.42), rgba(255, 255, 255, 0.2));
  margin-right: 20rpx;
  color: #fff;
}

.ann__hero-title {
  flex: 1 1 0;
  min-width: 0;
  font-size: 36rpx;
  font-weight: 500;
  letter-spacing: 1rpx;
}

.ann__hero-count {
  display: flex;
  align-items: baseline;
  margin-top: 22rpx;
}

.ann__hero-unit {
  font-size: 28rpx;
  font-weight: 300;
  margin-left: 18rpx;
  opacity: 0.92;
}

.ann__hero-date,
.ann__hero-empty {
  display: block;
  font-size: 24rpx;
  letter-spacing: 2rpx;
  opacity: 0.9;
  margin-top: 18rpx;
}

/* ---------------- 倒数 / 正数切换 ---------------- */
.ann__tabs {
  display: flex;
  gap: 12rpx;
  margin: 28rpx 4rpx 0;
  padding: 6rpx;
  border-radius: 999rpx;
  background-color: #fff;
}

.ann__tab {
  flex: 1 1 0;
  text-align: center;
  padding: 16rpx 0;
  border-radius: 999rpx;
  font-size: 24rpx;
  color: var(--love-ink-2);
}

.ann__tab--on {
  color: #fff;
  background-image: linear-gradient(100deg, #ff92b4, #ee5a92);
}

.ann__sort {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 28rpx 4rpx 0;
}

.ann__sort-hint {
  font-size: 22rpx;
  color: var(--love-ink-3);
}

.ann__sort-chips {
  display: flex;
  gap: 12rpx;
}

.ann__sort-chip {
  padding: 8rpx 20rpx;
  border-radius: 999rpx;
  font-size: 20rpx;
  color: var(--love-ink-2);
  background-color: #fff;
  border: 1rpx solid var(--love-line);
}

.ann__sort-chip--on {
  color: #d2598c;
  background-color: var(--love-soft);
  border-color: #ffd0e0;
}

.ann__hint {
  display: block;
  font-size: 22rpx;
  color: var(--love-ink-3);
  margin: 14rpx 6rpx 22rpx;
}

/* ---------------- 倒数卡片 ---------------- */
.ann__list {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
}

.ann__card {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 16rpx 20rpx;
}

.ann__card--soon {
  border-color: #ffc9dd;
}

.ann__card--past {
  opacity: 0.86;
}

.ann__stripe {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 6rpx;
  background-image: linear-gradient(180deg, #ffb3cb, #ee5a92);
}

.ann__icon {
  width: 84rpx;
  height: 84rpx;
  border-radius: 28rpx;
  margin-right: 22rpx;
  font-size: 40rpx;
  color: #e0518c;
}

.ann__body {
  flex: 1 1 0;
  min-width: 0;
}

.ann__title-row {
  display: flex;
  align-items: center;
}

.ann__title {
  font-size: 28rpx;
  font-weight: 500;
  color: var(--love-ink);
}

.ann__pin {
  font-size: 22rpx;
  color: #d2598c;
  margin-left: 10rpx;
}

.ann__date {
  display: block;
  font-size: 22rpx;
  color: var(--love-ink-3);
  margin-top: 8rpx;
  letter-spacing: 1rpx;
}

.ann__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx;
  margin-top: 10rpx;
}

.ann__tag {
  display: inline-flex;
  padding: 4rpx 14rpx;
  border-radius: 999rpx;
  background-color: var(--love-soft);
  font-size: 20rpx;
  color: #d2598c;
}

.ann__tag--remind {
  background-color: #f2edff;
  color: #8a63bd;
}

.ann__tag--now {
  background-image: linear-gradient(100deg, #ff92b4, #ee5a92);
  color: #fff;
}

.ann__note {
  display: block;
  font-size: 20rpx;
  color: var(--love-ink-3);
  margin-top: 8rpx;
}

.ann__right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
  margin-left: 12rpx;
}

.ann__days {
  font-size: 40rpx;
  font-weight: 300;
  line-height: 1;
  color: #e0518c;
}

.ann__unit,
.ann__go {
  font-size: 20rpx;
  color: var(--love-ink-3);
  margin-top: 6rpx;
}

.ann__go {
  margin-top: 14rpx;
  color: #d2598c;
}

/* ---------------- 详情弹层 ---------------- */
.ann__detail {
  display: flex;
  align-items: center;
  margin: 24rpx 0;
  padding: 16rpx;
  border-radius: 28rpx;
  background-image: linear-gradient(120deg, #fff3f8, #ffe7f0);
}

.ann__detail-icon {
  width: 88rpx;
  height: 88rpx;
  border-radius: 28rpx;
  background-color: #fff;
  color: #e0518c;
  font-size: 40rpx;
  margin-right: 22rpx;
}

.ann__detail-main {
  flex: 1 1 0;
  min-width: 0;
}

.ann__detail-count {
  display: block;
  font-size: 36rpx;
  font-weight: 500;
  color: #b14077;
}

.ann__detail-date {
  display: block;
  font-size: 22rpx;
  color: var(--love-ink-2);
  margin-top: 8rpx;
}

.ann__detail-lines {
  margin-bottom: 20rpx;
}

.ann__detail-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14rpx 4rpx;
  border-bottom: 1rpx solid var(--love-line);
}

.ann__detail-label {
  font-size: 24rpx;
  color: var(--love-ink-3);
}

.ann__detail-value {
  font-size: 24rpx;
  color: var(--love-ink);
  max-width: 60%;
  text-align: right;
}

.ann__detail-tip {
  display: block;
  font-size: 20rpx;
  color: var(--love-ink-3);
  line-height: 1.6;
  margin-bottom: 20rpx;
}

.ann__detail-minor {
  display: flex;
  gap: 16rpx;
  margin-top: 20rpx;
}

.ann__minor-btn {
  flex: 1 1 0;
  text-align: center;
  padding: 18rpx 0;
  border-radius: 999rpx;
  font-size: 24rpx;
  color: #d2598c;
  background-color: var(--love-bg);
  border: 1rpx solid var(--love-line);
}

.ann__minor-btn--danger {
  color: #c2526c;
  background-color: #fff2f4;
  border-color: #ffd9df;
}

/* ---------------- 表单 ---------------- */
.ann__field {
  display: flex;
  align-items: center;
  min-height: 96rpx;
  border-bottom: 1rpx solid var(--love-line);
}

.ann__field--stack {
  flex-direction: column;
  align-items: flex-start;
  padding: 16rpx 0 8rpx;
}

.ann__field-label {
  width: 150rpx;
  flex-shrink: 0;
  font-size: 26rpx;
  color: var(--love-ink-2);
}

.ann__field--stack .ann__field-label {
  width: auto;
  margin-bottom: 18rpx;
}

.ann__field-cell {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
}

.ann__input {
  padding: 10rpx 20rpx;
  border-radius: 20rpx;
  background-color: var(--love-bg);
}

.ann__field-value {
  flex: 1 1 0;
  min-width: 0;
  text-align: right;
  font-size: 26rpx;
  color: var(--love-ink);
}

.ann__field picker {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  justify-content: flex-end;
}

.ann__field-tip {
  font-size: 20rpx;
  color: var(--love-ink-3);
  margin-top: 12rpx;
}

.ann__chips {
  display: flex;
  gap: 16rpx;
}

.ann__chips--wrap {
  flex-wrap: wrap;
  gap: 12rpx;
}

.ann__chip {
  padding: 14rpx 40rpx;
  border-radius: 999rpx;
  font-size: 24rpx;
  background-color: var(--love-bg);
  color: var(--love-ink-2);
  border: 1rpx solid var(--love-line);
}

.ann__chip--sm {
  padding: 12rpx 24rpx;
  font-size: 22rpx;
}

.ann__chip--on {
  color: #fff;
  border-color: transparent;
  background-image: linear-gradient(100deg, #ff92b4, #ee5a92);
}

.ann__icons {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
}

.ann__emoji {
  width: 66rpx;
  height: 66rpx;
  line-height: 64rpx;
  text-align: center;
  font-size: 32rpx;
  border: 2rpx solid transparent;
  border-radius: 22rpx;
  background-color: var(--love-bg);
  color: #e0518c;
}

.ann__emoji--on {
  background-color: var(--love-soft);
  border-color: #f4a2c1;
}

.ann__form-actions {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-top: 30rpx;
}
</style>
