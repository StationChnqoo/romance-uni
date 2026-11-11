<!--
  情侣空间 · 每日打卡 + 每日一问（小恩爱「365 天说我爱你」/ 恋爱记「每日问答」同款）。
  打卡按日期去重，连续天数由 love store 计算；问答按当天固定一道题，双方各写一句。
-->
<template>
  <view :style="themeVars" class="ci lv-page">
    <view class="ci__hero lv-hero">
      <view class="lv-orb lv-orb--tr" />
      <view class="lv-orb lv-orb--bl" />
      <text class="lv-heart lv-heart--a love-icon love-i-heart" />
      <text class="lv-heart lv-heart--b love-icon love-i-heart" />
      <view class="lv-spark lv-spark--a" />
      <view class="lv-spark lv-spark--b" />
      <view class="lv-spark lv-spark--c" />
      <view class="lv-hero-in">
        <text class="lv-eyebrow">TODAY · 365 DAYS OF LOVE</text>
        <text class="ci__hero-title">{{ love.checkedInToday ? '今天已经说啦' : '说一句我爱你' }}</text>

        <!-- 圆形打卡按钮：比直角按钮更有仪式感 -->
        <view class="ci__press" @click="onCheckIn">
          <view class="ci__press-ring" :class="{ 'ci__press-ring--done': love.checkedInToday }">
            <text class="ci__press-heart love-icon love-i-heart" />
          </view>
          <text class="ci__press-text">{{ love.checkedInToday ? '已打卡 · 明天见' : '点一下打卡' }}</text>
        </view>

        <view class="lv-rule ci__rule" />
        <view class="ci__stats">
          <view class="ci__stat">
            <text class="ci__stat-num">{{ love.checkinStreak }}</text>
            <text class="ci__stat-label">连续天数</text>
          </view>
          <view class="ci__stat-divide" />
          <view class="ci__stat">
            <text class="ci__stat-num">{{ love.totalCheckins }}</text>
            <text class="ci__stat-label">累计打卡</text>
          </view>
          <view class="ci__stat-divide" />
          <view class="ci__stat">
            <text class="ci__stat-num">{{ love.daysTogetherCount }}</text>
            <text class="ci__stat-label">在一起</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 最近七天：心形珠 -->
    <view class="ci__week lv-card">
      <view class="ci__head">
        <view class="lv-section__left">
          <view class="lv-section__bar" />
          <text class="lv-section__title">最近七天</text>
        </view>
        <text class="lv-section__more">每一颗都是一句我爱你</text>
      </view>
      <view class="ci__dots">
        <view v-for="(day, index) in last7" :key="day.date" class="ci__dot-wrap">
          <view
            class="ci__dot"
            :class="{ 'ci__dot--on': day.done, 'ci__dot--today': index === 6 }">
            <text v-if="day.done" class="ci__dot-heart love-icon love-i-heart" />
            <text v-else class="ci__dot-hollow love-icon love-i-heart-line" />
          </view>
          <text class="ci__dot-label">{{ day.label }}</text>
        </view>
      </view>
    </view>

    <!-- 每日一问：引号卡 + 双人对话气泡 -->
    <view class="ci__question lv-card">
      <view class="ci__head">
        <view class="lv-section__left">
          <view class="lv-section__bar" />
          <text class="lv-section__title">今天的每日一问</text>
        </view>
        <text class="ci__q-tag">Q · {{ todayLabel }}</text>
      </view>
      <view class="ci__q-body">
        <text class="ci__q-deco">“</text>
        <text class="ci__question-text">{{ love.todayQuestion }}</text>
      </view>

      <view class="ci__answer ci__answer--me">
        <view class="ci__answer-head">
          <view class="ci__avatar ci__avatar--me">{{ love.myName.slice(0, 1) }}</view>
          <text class="ci__answer-label">{{ love.myName }} 的回答</text>
        </view>
        <textarea
          v-model="mine"
          class="ci__textarea"
          :maxlength="200"
          placeholder="写一句就好…"
          placeholder-class="ci__placeholder" />
        <view class="ci__save" @click="onSaveMine">保存</view>
      </view>

      <view class="ci__answer ci__answer--ta">
        <view class="ci__answer-head">
          <view class="ci__avatar ci__avatar--ta">{{ love.partnerName.slice(0, 1) }}</view>
          <text class="ci__answer-label">{{ love.partnerName }} 的回答</text>
        </view>
        <textarea
          v-model="partner"
          class="ci__textarea"
          :maxlength="200"
          placeholder="TA 说了什么…"
          placeholder-class="ci__placeholder" />
        <view class="ci__save ci__save--ta" @click="onSavePartner">保存</view>
      </view>
    </view>

    <!-- 历史问答：时间轴 -->
    <view v-if="history.length" class="ci__history">
      <view class="lv-section">
        <view class="lv-section__left">
          <view class="lv-section__bar" />
          <text class="lv-section__title">以前问过的</text>
        </view>
      </view>
      <view class="lv-timeline">
        <view class="lv-timeline__line" />
        <view v-for="item in history" :key="item.date" class="ci__history-item">
          <view class="lv-timeline__dot" />
          <view class="ci__history-card lv-card lv-card--tight">
            <text class="ci__history-date">{{ item.date }}</text>
            <text class="ci__history-q">{{ item.question }}</text>
            <text v-if="item.mine" class="ci__history-a">{{ love.myName }}：{{ item.mine }}</text>
            <text v-if="item.partner" class="ci__history-a">{{ love.partnerName }}：{{ item.partner }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import dayjs from 'dayjs'
import { useThemeVars } from '@/composables/useThemeVars'
import { useLoveStore } from '@/stores/love'
import { todayStr } from '@/constants/love'
import { toast } from '@/utils'

const themeVars = useThemeVars()
const love = useLoveStore()

const todayLabel = dayjs().format('M月D日')

const last7 = computed(() =>
  Array.from({ length: 7 }, (_, i) => {
    const date = dayjs().subtract(6 - i, 'day')
    const key = date.format('YYYY-MM-DD')
    return {
      date: key,
      label: date.format('MM/DD'),
      done: love.checkins.includes(key)
    }
  })
)

const mine = ref(love.todayAnswer?.mine || '')
const partner = ref(love.todayAnswer?.partner || '')

const history = computed(() =>
  Object.values(love.answers)
    .filter(a => a.date !== todayStr() && (a.mine || a.partner))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5)
)

const onCheckIn = () => {
  if (love.checkedInToday) {
    toast('今天已经打过卡啦，明天再来')
    return
  }
  love.checkIn()
  toast(`打卡成功，已经连续 ${love.checkinStreak} 天`)
}
const onSaveMine = () => {
  love.saveAnswer('mine', mine.value)
  toast('写好了')
}
const onSavePartner = () => {
  love.saveAnswer('partner', partner.value)
  toast('记下 TA 的话了')
}
</script>

<style lang="scss" scoped>
.ci {
  min-height: 100vh;
  padding: 30rpx 30rpx 90rpx;
  box-sizing: border-box;
}

/* ---------------- 打卡主视觉 ---------------- */
.ci__hero {
  padding: 40rpx 40rpx 36rpx;
}

.ci__hero-title {
  display: block;
  font-size: 42rpx;
  font-weight: 600;
  letter-spacing: 2rpx;
  margin-top: 22rpx;
}

.ci__press {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 32rpx 0 8rpx;
}

.ci__press-ring {
  width: 168rpx;
  height: 168rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(140deg, #fff, #ffeef4);
  box-shadow: 0 14rpx 34rpx rgba(150, 45, 95, 0.24), inset 0 3rpx 0 #fff, 0 0 0 12rpx rgba(255, 255, 255, 0.14);
}

.ci__press-ring--done {
  background-image: linear-gradient(140deg, #ffd6e5, #ffb3ce);
  box-shadow: 0 14rpx 34rpx rgba(150, 45, 95, 0.2), inset 0 3rpx 0 rgba(255, 255, 255, 0.7), 0 0 0 12rpx rgba(255, 255, 255, 0.2);
}

.ci__press-heart {
  font-size: 76rpx;
  line-height: 1;
  color: #ee5a92;
}

.ci__press-text {
  font-size: 22rpx;
  letter-spacing: 2rpx;
  opacity: 0.92;
  margin-top: 24rpx;
}

.ci__rule {
  margin: 30rpx 0 24rpx;
}

.ci__stats {
  display: flex;
  align-items: center;
}

.ci__stat {
  flex: 1 1 0;
  text-align: center;
}

.ci__stat-divide {
  width: 1rpx;
  height: 56rpx;
  background-color: rgba(255, 255, 255, 0.28);
}

.ci__stat-num {
  display: block;
  font-size: 46rpx;
  font-weight: 300;
  line-height: 1.1;
}

.ci__stat-label {
  display: block;
  font-size: 20rpx;
  opacity: 0.85;
  margin-top: 8rpx;
}

/* ---------------- 卡片通用头 ---------------- */
.ci__week,
.ci__question {
  margin-top: 28rpx;
  padding: 28rpx 28rpx 32rpx;
}

.ci__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ci__q-tag {
  font-size: 20rpx;
  color: #d2598c;
  padding: 6rpx 16rpx;
  border-radius: 999rpx;
  background-color: var(--love-soft);
}

/* ---------------- 七颗心形珠 ---------------- */
.ci__dots {
  display: flex;
  justify-content: space-between;
  margin-top: 34rpx;
}

.ci__dot-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ci__dot {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--love-bg);
  border: 1rpx solid var(--love-line);
}

.ci__dot--on {
  border-color: transparent;
  background-image: linear-gradient(140deg, #ff9dbb, #ee5a92);
  box-shadow: 0 8rpx 20rpx rgba(226, 92, 148, 0.28);
}

.ci__dot--today {
  border: 2rpx solid #f6a8c6;
  box-sizing: border-box;
}

.ci__dot-heart {
  color: #fff;
  font-size: 28rpx;
  line-height: 1;
}

.ci__dot-hollow {
  color: #e7bfd0;
  font-size: 30rpx;
  line-height: 1;
}

.ci__dot-label {
  font-size: 19rpx;
  color: var(--love-ink-3);
  margin-top: 12rpx;
}

/* ---------------- 每日一问 ---------------- */
.ci__q-body {
  position: relative;
  padding: 26rpx 24rpx 24rpx;
  margin: 24rpx 0 28rpx;
  border-radius: 24rpx;
  background-image: linear-gradient(120deg, #fff4f8, #ffeaf2);
  overflow: hidden;
}

.ci__q-deco {
  position: absolute;
  right: 16rpx;
  top: -30rpx;
  font-size: 130rpx;
  line-height: 1;
  color: rgba(238, 90, 146, 0.12);
}

.ci__question-text {
  display: block;
  position: relative;
  font-size: 30rpx;
  font-weight: 600;
  line-height: 1.65;
  color: #6d4355;
  padding-right: 40rpx;
}

/* 双人对答气泡 */
.ci__answer {
  width: 92%;
  padding: 22rpx 24rpx;
  border-radius: 28rpx 28rpx 28rpx 8rpx;
  display: flex;
  flex-direction: column;
  background-color: var(--love-bg);
  border: 1rpx solid var(--love-line);
  margin-bottom: 20rpx;
  box-sizing: border-box;
}

.ci__answer--ta {
  margin-left: auto;
  border-radius: 28rpx 28rpx 8rpx 28rpx;
  background-image: linear-gradient(120deg, #f8f2ff, #f1e9ff);
  border-color: #eadcff;
}

.ci__answer-head {
  display: flex;
  align-items: center;
}

.ci__avatar {
  width: 46rpx;
  height: 46rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 21rpx;
  color: #d8437c;
  background-color: #ffe0ec;
  margin-right: 14rpx;
  flex-shrink: 0;
}

.ci__avatar--ta {
  background-color: #e5d5ff;
  color: #8a63bd;
}

.ci__answer-label {
  font-size: 23rpx;
  color: var(--love-ink-2);
}

.ci__textarea {
  width: 100%;
  min-height: 116rpx;
  margin: 16rpx 0 10rpx;
  font-size: 26rpx;
  color: var(--love-ink);
  line-height: 1.6;
  box-sizing: border-box;
}

.ci__placeholder {
  color: var(--love-ink-3);
}

.ci__save {
  align-self: flex-end;
  display: inline-flex;
  padding: 10rpx 26rpx;
  border-radius: 999rpx;
  font-size: 22rpx;
  color: #fff;
  background-image: linear-gradient(100deg, #ff92b4, #ee5a92);
  box-shadow: 0 6rpx 16rpx rgba(226, 92, 148, 0.22);
  width: fit-content;
}

.ci__save--ta {
  background-image: linear-gradient(100deg, #b99ae8, #9a74d6);
  box-shadow: 0 6rpx 16rpx rgba(154, 116, 214, 0.22);
}

/* ---------------- 历史时间轴 ---------------- */
.ci__history {
  margin-top: 10rpx;
}

.ci__history-item {
  position: relative;
  padding-bottom: 18rpx;
}

.ci__history-item .lv-timeline__dot {
  top: 44rpx;
  width: 16rpx;
  height: 16rpx;
}

.ci__history-card {
  margin-left: 18rpx;
  padding: 24rpx 26rpx;
}

.ci__history-date {
  font-size: 20rpx;
  color: var(--love-ink-3);
  letter-spacing: 1rpx;
}

.ci__history-q {
  display: block;
  font-size: 26rpx;
  font-weight: 600;
  color: var(--love-ink);
  margin-top: 10rpx;
}

.ci__history-a {
  display: block;
  font-size: 23rpx;
  line-height: 1.6;
  color: var(--love-ink-2);
  margin-top: 8rpx;
}
</style>
