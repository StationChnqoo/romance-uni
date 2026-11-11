<!--
  情侣空间 · 每日打卡 + 每日一问。
  竞品口径（小恩爱 365 天双人签到 / Amorno Connection Cards）：
  - 打卡是「两个人都说了一句」才算当天完成，不是随手一点就勾上；已完成的日子不能反悔。
  - 每日一问双方先各自私下写，两个人都写完才一起揭晓，此前对方的答案是封存的。
  - 连续天数给成就徽章，打卡成功给一句当天固定的情话。
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
        <text class="ci__hero-title">{{ heroTitle }}</text>
        <text class="ci__hero-sub">{{ heroSub }}</text>

        <!-- 双人签到：各点各的，两个人都点过才亮起中间的心 -->
        <view class="ci__pair">
          <view
            class="ci__person"
            :class="{ 'ci__person--done': love.mineCheckedToday }"
            @click="onCheckInAs('mine')">
            <image v-if="love.myAvatar" class="ci__person-avatar" :src="love.myAvatar" mode="aspectFill" />
            <text v-else class="ci__person-avatar ci__person-avatar--text">{{ love.myName.slice(0, 1) }}</text>
            <text class="ci__person-state">{{ love.mineCheckedToday ? '说过啦' : '点一下说' }}</text>
          </view>

          <view class="ci__link" :class="{ 'ci__link--on': love.todayCheckinComplete }">
            <text class="love-icon love-i-heart" />
            <text class="ci__link-label">{{ love.todayCheckinComplete ? '今天' : '等你俩' }}</text>
          </view>

          <view
            class="ci__person"
            :class="{ 'ci__person--done': love.partnerCheckedToday }"
            @click="onCheckInAs('partner')">
            <image v-if="love.partnerAvatar" class="ci__person-avatar" :src="love.partnerAvatar" mode="aspectFill" />
            <text v-else class="ci__person-avatar ci__person-avatar--text ci__person-avatar--ta">{{ love.partnerName.slice(0, 1) }}</text>
            <text class="ci__person-state">{{ love.partnerCheckedToday ? '说过啦' : '点一下说' }}</text>
          </view>
        </view>

        <view v-if="love.todayCheckinComplete" class="ci__tip">
          <text class="love-icon love-i-sparkle" />
          <text>{{ todayTip }}</text>
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
            <text class="ci__stat-label">一起完成</text>
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
        <text class="lv-section__more">每一颗都是两个人的一句</text>
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

    <!-- 成就徽章：竞品的打卡勋章 -->
    <view class="ci__badges lv-card">
      <view class="ci__head">
        <view class="lv-section__left">
          <view class="lv-section__bar" />
          <text class="lv-section__title">一起攒下的勋章</text>
        </view>
        <text class="lv-section__more">已点亮 {{ love.unlockedBadges.length }} / {{ CHECKIN_BADGES.length }}</text>
      </view>
      <view class="ci__badge-row">
        <view
          v-for="badge in CHECKIN_BADGES"
          :key="badge.days"
          class="ci__badge"
          :class="{ 'ci__badge--on': love.checkinStreak >= badge.days }">
          <text class="love-icon" :class="'love-i-' + badge.icon" />
          <text class="ci__badge-label">{{ badge.label }}</text>
          <text class="ci__badge-days">{{ badge.days }} 天</text>
        </view>
      </view>
    </view>

    <!-- 每日一问：先各自封存，都写完才揭晓 -->
    <view class="ci__question lv-card">
      <view class="ci__head">
        <view class="lv-section__left">
          <view class="lv-section__bar" />
          <text class="lv-section__title">今天的每日一问</text>
        </view>
        <text class="ci__q-tag">连续回答 {{ love.answerStreak }} 天</text>
      </view>
      <view class="ci__q-body">
        <text class="ci__q-deco">“</text>
        <text class="ci__question-text">{{ love.todayQuestion }}</text>
      </view>

      <!-- 揭晓前 / 主动重写时：只看到自己的编辑入口，对方已写也只显示「已封存」 -->
      <template v-if="!love.answerRevealed || reeditMode">
        <view class="ci__answer ci__answer--me">
          <view class="ci__answer-head">
            <view class="ci__avatar ci__avatar--me">{{ love.myName.slice(0, 1) }}</view>
            <text class="ci__answer-label">{{ love.myName }} 的回答</text>
          </view>
          <view v-if="mineAnswered && !editingMine && !reeditMode" class="ci__sealed">
            <text class="love-icon love-i-letter" />
            <text>已经封存，等两个人都写完再一起看</text>
            <text class="ci__edit-link" @click="editingMine = true">修改</text>
          </view>
          <template v-else>
            <textarea
              v-model="mine"
              class="ci__textarea"
              :maxlength="200"
              placeholder="写一句就好…"
              placeholder-class="ci__placeholder" />
            <view class="ci__save" @click="onSaveMine">封存我的回答</view>
          </template>
        </view>

        <view class="ci__answer ci__answer--ta">
          <view class="ci__answer-head">
            <view class="ci__avatar ci__avatar--ta">{{ love.partnerName.slice(0, 1) }}</view>
            <text class="ci__answer-label">{{ love.partnerName }} 的回答</text>
          </view>
          <view v-if="partnerAnswered && !editingPartner && !reeditMode" class="ci__sealed">
            <text class="love-icon love-i-letter" />
            <text>已经封存，等两个人都写完再一起看</text>
            <text class="ci__edit-link" @click="editingPartner = true">修改</text>
          </view>
          <template v-else>
            <textarea
              v-model="partner"
              class="ci__textarea"
              :maxlength="200"
              placeholder="TA 说了什么…"
              placeholder-class="ci__placeholder" />
            <view class="ci__save ci__save--ta" @click="onSavePartner">封存 TA 的回答</view>
          </template>
        </view>
        <text class="ci__lock-hint">两个人都封存好，答案才会一起亮出来</text>
        <text v-if="reeditMode" class="ci__edit-link ci__edit-link--center" @click="onFinishReedit">写好了，收起</text>
      </template>

      <!-- 揭晓后：对答气泡 + 今晚可以聊的话题 -->
      <template v-else>
        <view class="ci__bubble ci__bubble--me">
          <text class="ci__bubble-name">{{ love.myName }}</text>
          <text class="ci__bubble-text">{{ love.todayAnswer?.mine }}</text>
        </view>
        <view class="ci__bubble ci__bubble--ta">
          <text class="ci__bubble-name">{{ love.partnerName }}</text>
          <text class="ci__bubble-text">{{ love.todayAnswer?.partner }}</text>
        </view>
        <view class="ci__reveal">
          <text class="love-icon love-i-sparkle" />
          <view class="ci__reveal-body">
            <text class="ci__reveal-title">答案揭晓啦</text>
            <text class="ci__reveal-text">今晚就着这道题聊聊吧，别急着划走。</text>
          </view>
        </view>
        <text class="ci__edit-link ci__edit-link--center" @click="onReedit">重新写今天的回答</text>
      </template>
    </view>

    <!-- 历史问答：只收双方都答完的 -->
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
            <text class="ci__history-a">{{ love.myName }}：{{ item.mine }}</text>
            <text class="ci__history-a">{{ love.partnerName }}：{{ item.partner }}</text>
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
import { CHECKIN_BADGES, checkinTipOfDay, todayStr } from '@/constants/love'
import { toast } from '@/utils'

const themeVars = useThemeVars()
const love = useLoveStore()

const todayTip = checkinTipOfDay()

const heroTitle = computed(() => {
  if (love.todayCheckinComplete) return '今天已经说啦'
  if (love.mineCheckedToday || love.partnerCheckedToday) return '还差一个人'
  return '说一句我爱你'
})
const heroSub = computed(() => {
  if (love.todayCheckinComplete) return '两个人都在，今天算数了'
  if (love.mineCheckedToday) return `等 ${love.partnerName} 也来说一句`
  if (love.partnerCheckedToday) return `等 ${love.myName} 也来说一句`
  return '两个人各点一次，今天才算完成'
})

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

const onCheckInAs = (role: 'mine' | 'partner') => {
  if (role === 'mine' ? love.mineCheckedToday : love.partnerCheckedToday) {
    toast('这一位今天已经说过啦')
    return
  }
  love.checkInAs(role)
  if (love.todayCheckinComplete) {
    toast(`两个人都说啦，已经连续 ${love.checkinStreak} 天`)
  } else {
    toast('记下了，等另一位也来说一句')
  }
}

/* ---------------- 每日一问 ---------------- */

const mine = ref(love.todayAnswer?.mine || '')
const partner = ref(love.todayAnswer?.partner || '')
const editingMine = ref(false)
const editingPartner = ref(false)
/** 揭晓后「重新写」：只切回编辑视图，不清空已落库的答案 */
const reeditMode = ref(false)
const mineAnswered = computed(() => !!love.todayAnswer?.mine)
const partnerAnswered = computed(() => !!love.todayAnswer?.partner)

const history = computed(() =>
  Object.values(love.answers)
    .filter(a => a.date !== todayStr() && a.mine && a.partner)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5)
)

const saveRole = (role: 'mine' | 'partner', text: string) => {
  if (!text.trim()) {
    toast('先写一句吧，哪怕只有几个字')
    return
  }
  love.saveAnswer(role, text)
  if (role === 'mine') editingMine.value = false
  else editingPartner.value = false
  toast(love.answerRevealed ? '两个人都写好啦，答案揭晓' : '封存好了，等另一半')
}
const onSaveMine = () => saveRole('mine', mine.value)
const onSavePartner = () => saveRole('partner', partner.value)
const onReedit = () => {
  reeditMode.value = true
  editingMine.value = true
  editingPartner.value = true
}
const onFinishReedit = () => {
  reeditMode.value = false
  editingMine.value = false
  editingPartner.value = false
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
  padding: 28rpx 24rpx 28rpx;
}

.ci__hero-title {
  display: block;
  font-size: 42rpx;
  font-weight: 600;
  letter-spacing: 2rpx;
  margin-top: 22rpx;
}

.ci__hero-sub {
  display: block;
  font-size: 22rpx;
  opacity: 0.9;
  margin-top: 10rpx;
  letter-spacing: 1rpx;
}

.ci__pair {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 34rpx 0 8rpx;
}

.ci__person {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16rpx 16rpx 14rpx;
  border-radius: 32rpx;
  background-color: rgba(255, 255, 255, 0.16);
  border: 1rpx solid rgba(255, 255, 255, 0.32);
}

.ci__person--done {
  background-color: rgba(255, 255, 255, 0.34);
  border-color: #fff;
}

.ci__person-avatar {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  background-color: #ffe0ec;
  border: 3rpx solid rgba(255, 255, 255, 0.9);
}

.ci__person-avatar--text {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 38rpx;
  color: #d8437c;
  line-height: 1;
}

.ci__person-avatar--ta {
  background-color: #e5d5ff;
  color: #8a63bd;
}

.ci__person-state {
  font-size: 20rpx;
  margin-top: 14rpx;
  letter-spacing: 1rpx;
  opacity: 0.95;
}

.ci__link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 110rpx;
  padding: 0 4rpx;
}

.ci__link .love-icon {
  font-size: 44rpx;
  color: rgba(255, 255, 255, 0.5);
}

.ci__link--on .love-icon {
  color: #fff;
  font-size: 56rpx;
}

.ci__link-label {
  font-size: 18rpx;
  opacity: 0.85;
  margin-top: 6rpx;
}

.ci__tip {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 22rpx;
  padding: 12rpx 20rpx;
  border-radius: 999rpx;
  background-color: rgba(255, 255, 255, 0.24);
  font-size: 22rpx;
  letter-spacing: 1rpx;
}

.ci__tip .love-icon {
  font-size: 24rpx;
  margin-right: 10rpx;
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
.ci__question,
.ci__badges {
  margin-top: 28rpx;
  padding: 20rpx 20rpx 24rpx;
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

/* ---------------- 成就徽章 ---------------- */
.ci__badge-row {
  display: flex;
  gap: 14rpx;
  margin-top: 28rpx;
}

.ci__badge {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx 6rpx;
  border-radius: 24rpx;
  background-color: var(--love-bg);
  border: 1rpx solid var(--love-line);
  color: var(--love-ink-3);
}

.ci__badge .love-icon {
  font-size: 40rpx;
  color: #e8c6d5;
}

.ci__badge--on {
  background-image: linear-gradient(150deg, #fff3f8, #ffe1ec);
  border-color: #ffd3e3;
}

.ci__badge--on .love-icon {
  color: #e0518c;
}

.ci__badge-label {
  font-size: 21rpx;
  margin-top: 12rpx;
  color: var(--love-ink-2);
}

.ci__badge-days {
  font-size: 18rpx;
  margin-top: 4rpx;
  color: var(--love-ink-3);
}

/* ---------------- 每日一问 ---------------- */
.ci__q-body {
  position: relative;
  padding: 20rpx 20rpx;
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

.ci__answer {
  width: 92%;
  padding: 16rpx 20rpx;
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
  width: fit-content;
}

.ci__save--ta {
  background-image: linear-gradient(100deg, #b99ae8, #9a74d6);
}

/* 封存态：绝不把对方已写的答案露出来 */
.ci__sealed {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20rpx 4rpx 8rpx;
  font-size: 22rpx;
  line-height: 1.6;
  color: var(--love-ink-2);
}

.ci__sealed .love-icon {
  font-size: 34rpx;
  color: #d2598c;
  margin-bottom: 10rpx;
}

.ci__edit-link {
  align-self: flex-end;
  margin-top: 10rpx;
  padding: 6rpx 18rpx;
  border-radius: 999rpx;
  font-size: 20rpx;
  color: #d2598c;
  background-color: #fff;
  border: 1rpx solid var(--love-line);
}

.ci__edit-link--center {
  display: block;
  width: fit-content;
  margin: 24rpx auto 0;
}

.ci__lock-hint {
  display: block;
  text-align: center;
  font-size: 20rpx;
  color: var(--love-ink-3);
  margin-top: 6rpx;
}

/* 揭晓后的对答气泡 */
.ci__bubble {
  width: 92%;
  padding: 16rpx 20rpx;
  border-radius: 28rpx 28rpx 28rpx 8rpx;
  background-color: var(--love-bg);
  border: 1rpx solid var(--love-line);
  margin-bottom: 18rpx;
  box-sizing: border-box;
}

.ci__bubble--ta {
  margin-left: auto;
  border-radius: 28rpx 28rpx 8rpx 28rpx;
  background-image: linear-gradient(120deg, #f8f2ff, #f1e9ff);
  border-color: #eadcff;
}

.ci__bubble-name {
  display: block;
  font-size: 20rpx;
  color: var(--love-ink-3);
}

.ci__bubble-text {
  display: block;
  font-size: 26rpx;
  line-height: 1.65;
  color: var(--love-ink);
  margin-top: 10rpx;
}

.ci__reveal {
  display: flex;
  align-items: center;
  margin-top: 8rpx;
  padding: 16rpx 20rpx;
  border-radius: 24rpx;
  background-image: linear-gradient(110deg, #fff1f7, #ffe4ee);
  border: 1rpx solid #ffd9e7;
}

.ci__reveal .love-icon {
  font-size: 40rpx;
  color: #e0518c;
  margin-right: 18rpx;
}

.ci__reveal-body {
  flex: 1 1 0;
  min-width: 0;
}

.ci__reveal-title {
  display: block;
  font-size: 24rpx;
  font-weight: 600;
  color: #b14077;
}

.ci__reveal-text {
  display: block;
  font-size: 21rpx;
  color: var(--love-ink-2);
  margin-top: 6rpx;
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
  padding: 16rpx 20rpx;
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
