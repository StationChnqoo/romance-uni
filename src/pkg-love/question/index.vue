<!--
  情侣空间 · 每日一问。
  一天一题，双方先各自私下写，都写完才一起揭晓（Amorno Connection Cards 口径）。

  刻意不做连续天数 / 断签提醒 / 成就勋章：没有真双人绑定与奖励时，
  每日签到只剩「每天点一下」的空壳，反而把记录变成任务。
  这里只保留异步、跳过一天也不损失的一问一答。
-->
<template>
  <view :style="themeVars" class="q lv-page">
    <view class="q__hero lv-hero">
      <view class="lv-orb lv-orb--tr" />
      <view class="lv-orb lv-orb--bl" />
      <text class="lv-heart lv-heart--a love-icon love-i-heart" />
      <text class="lv-heart lv-heart--b love-icon love-i-heart" />
      <view class="lv-spark lv-spark--a" />
      <view class="lv-spark lv-spark--b" />
      <view class="lv-spark lv-spark--c" />
      <view class="lv-hero-in">
        <text class="lv-eyebrow">ONE QUESTION A DAY</text>
        <text class="q__hero-title">今天想问你</text>
        <text class="q__hero-q">{{ love.todayQuestion }}</text>
        <text class="q__hero-sub">先各自悄悄写，两个人都写好，答案才一起亮出来</text>
      </view>
    </view>

    <view class="q__card lv-card">
      <view class="q__head">
        <view class="lv-section__left">
          <view class="lv-section__bar" />
          <text class="lv-section__title">写下我们的回答</text>
        </view>
        <text class="q__state">{{ stateText }}</text>
      </view>

      <!-- 揭晓前 / 主动重写时：只看到自己的编辑入口，对方已写也只显示「已封存」 -->
      <template v-if="!love.answerRevealed || reeditMode">
        <view class="q__answer q__answer--me">
          <view class="q__answer-head">
            <view class="q__avatar q__avatar--me">{{ love.myName.slice(0, 1) }}</view>
            <text class="q__answer-label">{{ love.myName }} 的回答</text>
          </view>
          <view v-if="mineAnswered && !editingMine && !reeditMode" class="q__sealed">
            <text class="love-icon love-i-letter" />
            <text>已经封存，等两个人都写完再一起看</text>
            <text class="q__edit-link" @click="editingMine = true">修改</text>
          </view>
          <template v-else>
            <textarea
              v-model="mine"
              class="q__textarea"
              :maxlength="200"
              placeholder="写一句就好…"
              placeholder-class="q__placeholder" />
            <view class="q__save" @click="onSaveMine">封存我的回答</view>
          </template>
        </view>

        <view class="q__answer q__answer--ta">
          <view class="q__answer-head">
            <view class="q__avatar q__avatar--ta">{{ love.partnerName.slice(0, 1) }}</view>
            <text class="q__answer-label">{{ love.partnerName }} 的回答</text>
          </view>
          <view v-if="partnerAnswered && !editingPartner && !reeditMode" class="q__sealed">
            <text class="love-icon love-i-letter" />
            <text>已经封存，等两个人都写完再一起看</text>
            <text class="q__edit-link" @click="editingPartner = true">修改</text>
          </view>
          <template v-else>
            <textarea
              v-model="partner"
              class="q__textarea"
              :maxlength="200"
              placeholder="TA 说了什么…"
              placeholder-class="q__placeholder" />
            <view class="q__save q__save--ta" @click="onSavePartner">封存 TA 的回答</view>
          </template>
        </view>
        <text class="q__lock-hint">两个人都封存好，答案才会一起亮出来</text>
        <text v-if="reeditMode" class="q__edit-link q__edit-link--center" @click="onFinishReedit">写好了，收起</text>
      </template>

      <!-- 揭晓后：对答气泡 + 今晚可以聊的话题 -->
      <template v-else>
        <view class="q__bubble q__bubble--me">
          <text class="q__bubble-name">{{ love.myName }}</text>
          <text class="q__bubble-text">{{ love.todayAnswer?.mine }}</text>
        </view>
        <view class="q__bubble q__bubble--ta">
          <text class="q__bubble-name">{{ love.partnerName }}</text>
          <text class="q__bubble-text">{{ love.todayAnswer?.partner }}</text>
        </view>
        <view class="q__reveal">
          <text class="love-icon love-i-sparkle" />
          <view class="q__reveal-body">
            <text class="q__reveal-title">答案揭晓啦</text>
            <text class="q__reveal-text">今晚就着这道题聊聊吧，别急着划走。</text>
          </view>
        </view>
        <text class="q__edit-link q__edit-link--center" @click="onReedit">重新写今天的回答</text>
      </template>
    </view>

    <!-- 历史问答：只收双方都答完的 -->
    <view v-if="history.length" class="q__history">
      <view class="lv-section">
        <view class="lv-section__left">
          <view class="lv-section__bar" />
          <text class="lv-section__title">以前问过的</text>
        </view>
      </view>
      <view class="lv-timeline">
        <view class="lv-timeline__line" />
        <view v-for="item in history" :key="item.date" class="q__history-item">
          <view class="lv-timeline__dot" />
          <view class="q__history-card lv-card lv-card--tight">
            <text class="q__history-date">{{ item.date }}</text>
            <text class="q__history-q">{{ item.question }}</text>
            <text class="q__history-a">{{ love.myName }}：{{ item.mine }}</text>
            <text class="q__history-a">{{ love.partnerName }}：{{ item.partner }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useThemeVars } from '@/composables/useThemeVars'
import { useLoveStore } from '@/stores/love'
import { todayStr } from '@/constants/love'
import { toast } from '@/utils'

const themeVars = useThemeVars()
const love = useLoveStore()

const mine = ref(love.todayAnswer?.mine || '')
const partner = ref(love.todayAnswer?.partner || '')
const editingMine = ref(false)
const editingPartner = ref(false)
/** 揭晓后「重新写」：只切回编辑视图，不清空已落库的答案 */
const reeditMode = ref(false)
const mineAnswered = computed(() => !!love.todayAnswer?.mine)
const partnerAnswered = computed(() => !!love.todayAnswer?.partner)

const stateText = computed(() => {
  if (reeditMode.value) return '正在重写'
  if (love.answerRevealed) return '已揭晓'
  if (mineAnswered.value || partnerAnswered.value) return '还差一个人'
  return '还没开始'
})

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
.q {
  min-height: 100vh;
  padding: 30rpx 30rpx 90rpx;
  box-sizing: border-box;
}

/* ---------------- 今日一问主视觉 ---------------- */
.q__hero {
  padding: 28rpx 24rpx 32rpx;
}

.q__hero-title {
  display: block;
  font-size: 42rpx;
  font-weight: 600;
  letter-spacing: 2rpx;
  margin-top: 22rpx;
}

.q__hero-q {
  display: block;
  font-size: 30rpx;
  font-weight: 600;
  line-height: 1.65;
  margin-top: 26rpx;
}

.q__hero-sub {
  display: block;
  font-size: 22rpx;
  opacity: 0.9;
  margin-top: 16rpx;
  letter-spacing: 1rpx;
}

/* ---------------- 答题卡 ---------------- */
.q__card {
  margin-top: 28rpx;
  padding: 20rpx 20rpx 24rpx;
}

.q__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.q__state {
  font-size: 20rpx;
  color: #d2598c;
  padding: 6rpx 16rpx;
  border-radius: 999rpx;
  background-color: var(--love-soft);
}

.q__answer {
  width: 92%;
  padding: 16rpx 20rpx;
  border-radius: 28rpx 28rpx 28rpx 8rpx;
  display: flex;
  flex-direction: column;
  background-color: var(--love-bg);
  border: 1rpx solid var(--love-line);
  margin: 24rpx 0 20rpx;
  box-sizing: border-box;
}

.q__answer--ta {
  margin-left: auto;
  border-radius: 28rpx 28rpx 8rpx 28rpx;
  background-image: linear-gradient(120deg, #f8f2ff, #f1e9ff);
  border-color: #eadcff;
}

.q__answer-head {
  display: flex;
  align-items: center;
}

.q__avatar {
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

.q__avatar--ta {
  background-color: #e5d5ff;
  color: #8a63bd;
}

.q__answer-label {
  font-size: 23rpx;
  color: var(--love-ink-2);
}

.q__textarea {
  width: 100%;
  min-height: 116rpx;
  margin: 16rpx 0 10rpx;
  font-size: 26rpx;
  color: var(--love-ink);
  line-height: 1.6;
  box-sizing: border-box;
}

.q__placeholder {
  color: var(--love-ink-3);
}

.q__save {
  align-self: flex-end;
  display: inline-flex;
  padding: 10rpx 26rpx;
  border-radius: 999rpx;
  font-size: 22rpx;
  color: #fff;
  background-image: linear-gradient(100deg, #ff92b4, #ee5a92);
  width: fit-content;
}

.q__save--ta {
  background-image: linear-gradient(100deg, #b99ae8, #9a74d6);
}

/* 封存态：绝不把对方已写的答案露出来 */
.q__sealed {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20rpx 4rpx 8rpx;
  font-size: 22rpx;
  line-height: 1.6;
  color: var(--love-ink-2);
}

.q__sealed .love-icon {
  font-size: 34rpx;
  color: #d2598c;
  margin-bottom: 10rpx;
}

.q__edit-link {
  align-self: flex-end;
  margin-top: 10rpx;
  padding: 6rpx 18rpx;
  border-radius: 999rpx;
  font-size: 20rpx;
  color: #d2598c;
  background-color: #fff;
  border: 1rpx solid var(--love-line);
}

.q__edit-link--center {
  display: block;
  width: fit-content;
  margin: 24rpx auto 0;
}

.q__lock-hint {
  display: block;
  text-align: center;
  font-size: 20rpx;
  color: var(--love-ink-3);
  margin-top: 6rpx;
}

/* 揭晓后的对答气泡 */
.q__bubble {
  width: 92%;
  padding: 16rpx 20rpx;
  border-radius: 28rpx 28rpx 28rpx 8rpx;
  background-color: var(--love-bg);
  border: 1rpx solid var(--love-line);
  margin: 24rpx 0 18rpx;
  box-sizing: border-box;
}

.q__bubble--ta {
  margin-left: auto;
  border-radius: 28rpx 28rpx 8rpx 28rpx;
  background-image: linear-gradient(120deg, #f8f2ff, #f1e9ff);
  border-color: #eadcff;
}

.q__bubble-name {
  display: block;
  font-size: 20rpx;
  color: var(--love-ink-3);
}

.q__bubble-text {
  display: block;
  font-size: 26rpx;
  line-height: 1.65;
  color: var(--love-ink);
  margin-top: 10rpx;
}

.q__reveal {
  display: flex;
  align-items: center;
  margin-top: 8rpx;
  padding: 16rpx 20rpx;
  border-radius: 24rpx;
  background-image: linear-gradient(110deg, #fff1f7, #ffe4ee);
  border: 1rpx solid #ffd9e7;
}

.q__reveal .love-icon {
  font-size: 40rpx;
  color: #e0518c;
  margin-right: 18rpx;
}

.q__reveal-body {
  flex: 1 1 0;
  min-width: 0;
}

.q__reveal-title {
  display: block;
  font-size: 24rpx;
  font-weight: 600;
  color: #b14077;
}

.q__reveal-text {
  display: block;
  font-size: 21rpx;
  color: var(--love-ink-2);
  margin-top: 6rpx;
}

/* ---------------- 历史时间轴 ---------------- */
.q__history {
  margin-top: 10rpx;
}

.q__history-item {
  position: relative;
  padding-bottom: 18rpx;
}

.q__history-item .lv-timeline__dot {
  top: 44rpx;
  width: 16rpx;
  height: 16rpx;
}

.q__history-card {
  margin-left: 18rpx;
  padding: 16rpx 20rpx;
}

.q__history-date {
  font-size: 20rpx;
  color: var(--love-ink-3);
  letter-spacing: 1rpx;
}

.q__history-q {
  display: block;
  font-size: 26rpx;
  font-weight: 600;
  color: var(--love-ink);
  margin-top: 10rpx;
}

.q__history-a {
  display: block;
  font-size: 23rpx;
  line-height: 1.6;
  color: var(--love-ink-2);
  margin-top: 8rpx;
}
</style>
