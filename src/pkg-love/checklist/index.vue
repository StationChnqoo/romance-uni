<!--
  情侣空间 · 100 件小事（竞品「恋人清单 / 恋爱清单」）。
  预置 100 条按 5 类分组，勾选状态、自定义条目都存在 love store 里。
-->
<template>
  <view :style="themeVars" class="ck lv-page">
    <view class="ck__hero lv-hero">
      <view class="lv-orb lv-orb--tr" />
      <view class="lv-orb lv-orb--bl" />
      <text class="lv-heart lv-heart--a">♥</text>
      <text class="lv-heart lv-heart--b">♥</text>
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
            <text class="ck__bar-heart">♥</text>
          </view>
        </view>
        <text class="ck__hero-tip">一件一件慢慢做，不赶进度 ♡</text>
      </view>
    </view>

    <scroll-view class="ck__tabs" scroll-x :show-scrollbar="false">
      <view class="ck__tabs-inner">
        <view
          v-for="tab in tabs"
          :key="tab"
          class="ck__tab"
          :class="{ 'ck__tab--on': activeTab === tab }"
          @click="activeTab = tab">
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
        @click="love.toggleChecklistItem(item.id)">
        <view class="ck__check" :class="{ 'ck__check--on': item.done }">
          <text v-if="item.done" class="ck__check-heart">♥</text>
        </view>
        <view class="ck__body">
          <text class="ck__title" :class="{ 'ck__title--done': item.done }">{{ item.title }}</text>
          <view class="ck__meta-row">
            <text class="ck__cat">{{ item.category }}</text>
            <text v-if="item.doneAt" class="ck__date">{{ item.doneAt }} 完成</text>
          </view>
        </view>
        <text class="ck__index">{{ ('0' + (index + 1)).slice(-2) }}</text>
        <text v-if="item.custom" class="ck__remove" @click.stop="love.removeChecklistItem(item.id)">删除</text>
      </view>
    </view>
    <view v-else class="lv-empty">
      <view class="lv-empty__orb">🧺</view>
      <text class="lv-empty__text">这个分类还没有小事，点右下角加一件</text>
    </view>

    <view class="lv-fab" @click="addVisible = true">
      <wd-icon name="add" size="24px" color="#fff" />
    </view>

    <wd-popup
      :model-value="addVisible"
      position="bottom"
      :safe-area-inset-bottom="false"
      :close-on-click-modal="true"
      :root-portal="true"
      :z-index="200"
      @update:model-value="onPopupUpdate">
      <view class="lv-sheet">
        <view class="lv-handle" />
        <text class="lv-sheet__title">加一件只属于我们的小事 ♡</text>
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
  </view>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useThemeVars } from '@/composables/useThemeVars'
import { useLoveStore } from '@/stores/love'
import { LOVE_CATEGORIES, LOVE_PRIMARY_BTN } from '@/constants/love'
import { toast } from '@/utils'

const themeVars = useThemeVars()
const love = useLoveStore()

const tabs = ['全部', ...LOVE_CATEGORIES, '我们加的']
const activeTab = ref('全部')
const shown = computed(() =>
  love.checklist.filter(item => {
    if (activeTab.value === '全部') return true
    if (activeTab.value === '我们加的') return item.custom
    return item.category === activeTab.value
  })
)

const addVisible = ref(false)
const newTitle = ref('')

const onPopupUpdate = (v: boolean) => {
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
  padding: 40rpx 40rpx 44rpx;
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
  box-shadow: inset 0 2rpx 6rpx rgba(180, 60, 110, 0.12);
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
  box-shadow: 0 2rpx 12rpx rgba(255, 255, 255, 0.4);
}

.ck__bar-heart {
  font-size: 12rpx;
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
  box-shadow: 0 4rpx 12rpx rgba(226, 100, 148, 0.05);
}

.ck__tab--on {
  color: #fff;
  border-color: transparent;
  background-image: linear-gradient(100deg, #ff92b4, #ee5a92);
  box-shadow: 0 8rpx 20rpx rgba(226, 92, 148, 0.24);
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
  padding: 26rpx 24rpx;
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
  box-shadow: 0 6rpx 16rpx rgba(226, 92, 148, 0.26);
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

.ck__title--done {
  color: var(--love-ink-3);
  text-decoration: line-through;
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

/* ---------------- 底部弹层 ---------------- */
.ck__sheet-cell {
  display: flex;
  min-width: 0;
  padding: 20rpx 24rpx;
  margin-bottom: 32rpx;
  border-radius: 22rpx;
  background-color: var(--love-bg);
  border: 1rpx solid var(--love-line);
}
</style>
