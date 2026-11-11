<!--
  情侣空间首页（Romance）。
  恋爱天数 / 今日打卡 / 纪念日倒数 / 功能宫格 / 「她说过的话」/ 最近日记。

  数据口径：恋爱相关全部走 love store（Pinia persist，返回页面自动是最新值），
  不做 onShow 重拉；「她说过的话」来自 cloud-uni 的 pkg-girlfriend /girl-notes，
  只在进首页和下拉刷新时取最新一条，接口失败就退回引导文案，不打断首页。

  视觉：统一用 styles/love-ui.scss 的 lv-* 全局类（卡片 / 主视觉 / 装饰 / 宫格配色），
  页面只负责自己的排布，不再散落渐变与阴影。
-->
<template>
  <view :style="themeVars" class="home lv-page">
    <view class="home__status" :style="{ height: `${statusBarHeight}px` }" />

    <scroll-view
      class="home__scroll"
      scroll-y
      :refresher-enabled="true"
      :refresher-triggered="refreshing"
      @refresherrefresh="onRefresh">
      <!-- 页头：日期眉标 + 问候 + 手账印章 -->
      <view class="home__top">
        <view class="home__top-left">
          <text class="home__eyebrow">OUR LITTLE WORLD · {{ dateLine }}</text>
          <text class="home__greeting">{{ greeting }}，{{ love.partnerName }}</text>
          <text class="home__sub">今天也要好好相爱呀 ♡</text>
        </view>
        <view class="home__seal">
          <text class="home__seal-heart">♥</text>
          <text class="home__seal-text">since {{ love.startDate.slice(0, 4) }}</text>
        </view>
      </view>

      <!-- 恋爱天数主视觉：点进设置改开始日期 -->
      <view class="hero lv-hero" @click="onFeatureTap('LoveSettings')">
        <view class="lv-orb lv-orb--tr" />
        <view class="lv-orb lv-orb--bl" />
        <text class="lv-heart lv-heart--a">♥</text>
        <text class="lv-heart lv-heart--b">♥</text>
        <view class="lv-spark lv-spark--a" />
        <view class="lv-spark lv-spark--b" />
        <view class="lv-spark lv-spark--c" />
        <view class="lv-hero-in">
          <text class="lv-eyebrow">♡ 我们在一起的第 ♡</text>
          <view class="hero__days">
            <text class="lv-display">{{ love.daysTogetherCount }}</text>
            <text class="hero__unit">天</text>
          </view>
          <view class="lv-rule hero__rule" />
          <view class="hero__foot">
            <view class="hero__pair">
              <text class="hero__avatar hero__avatar--me">{{ love.myName.slice(0, 1) }}</text>
              <text class="hero__avatar hero__avatar--ta">{{ love.partnerName.slice(0, 1) }}</text>
              <text class="hero__names">{{ love.myName }} ♥ {{ love.partnerName }}</text>
            </view>
            <text class="hero__edit">始于 {{ love.startDate }} ›</text>
          </view>
        </view>
      </view>

      <!-- 今日打卡条 -->
      <view class="checkin" @click="onFeatureTap('LoveCheckin')">
        <view class="checkin__icon" :class="{ 'checkin__icon--done': love.checkedInToday }">
          <text>♥</text>
        </view>
        <view class="checkin__body">
          <text class="checkin__title">{{ love.checkedInToday ? '今天已经说过我爱你啦' : '今天还没打卡哦' }}</text>
          <text class="checkin__sub">连续 {{ love.checkinStreak }} 天 · 累计 {{ love.totalCheckins }} 次</text>
        </view>
        <view
          class="checkin__btn"
          :class="{ 'checkin__btn--done': love.checkedInToday }"
          @click.stop="onQuickCheckIn">
          <text>{{ love.checkedInToday ? '已打卡' : '打卡 ♡' }}</text>
        </view>
      </view>

      <!-- 纪念日倒数 -->
      <view class="block">
        <view class="lv-section">
          <view class="lv-section__left">
            <view class="lv-section__bar" />
            <text class="lv-section__title">值得期待的日子</text>
          </view>
          <text class="lv-section__more" @click="onFeatureTap('LoveAnniversaries')">全部 ›</text>
        </view>
        <view v-if="love.upcoming.length" class="countdown lv-card">
          <view
            v-for="(item, index) in love.upcoming.slice(0, 2)"
            :key="item.id"
            class="countdown__item"
            :class="{ 'countdown__item--split': index > 0 }">
            <view class="lv-icon countdown__icon">{{ item.icon }}</view>
            <view class="countdown__body">
              <text class="countdown__title">{{ item.title }}</text>
              <text class="countdown__date">{{ item.date }}</text>
            </view>
            <view class="countdown__right">
              <text class="countdown__days">{{ item.daysLeft === 0 ? '今天' : item.daysLeft }}</text>
              <text class="countdown__unit">{{ item.daysLeft === 0 ? '就是这天' : '天后' }}</text>
            </view>
          </view>
        </view>
        <view v-else class="lv-card block__empty">
          <text class="block__empty-orb">🌷</text>
          <text class="block__empty-text">去设置里填「在一起的那天」，纪念日会自动算好</text>
        </view>
      </view>

      <!-- 功能宫格：六张不同色调的小卡 -->
      <view class="block">
        <view class="lv-section">
          <view class="lv-section__left">
            <view class="lv-section__bar" />
            <text class="lv-section__title">我们的小世界</text>
          </view>
          <text class="lv-section__more">六个只属于我们的角落</text>
        </view>
        <view class="grid">
          <view v-for="item in features" :key="item.title" class="grid__cell" @click="item.onTap">
            <view class="grid__card lv-card" :class="'lv-tone--' + item.tone">
              <text class="grid__deco">♥</text>
              <view class="lv-tone__icon">{{ item.emoji }}</view>
              <text class="grid__title">{{ item.title }}</text>
              <text class="grid__sub">{{ item.sub }}</text>
              <text v-if="item.badge" class="grid__badge">{{ item.badge }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 关于她：记录她说过的每一句话（cloud-uni pkg-girlfriend） -->
      <view class="block words" @click="onFeatureTap('GirlfriendList')">
        <text class="words__deco">“</text>
        <view class="words__head">
          <view class="lv-section__left">
            <view class="lv-section__bar" />
            <text class="lv-section__title">她说过的话</text>
          </view>
          <text class="lv-section__more">去记录 ›</text>
        </view>
        <text class="words__quote">{{ latestNote ? latestNote.content : '把她说过的每一句都记下来，别让随口一提变成忘记。' }}</text>
        <view class="words__foot">
          <view class="words__line" />
          <text class="words__meta">
            {{ latestNote ? `${latestNote.saidAt} · ${attitudeOf(latestNote.attitude).label}` : '来自「关于她」· 喜欢 / 心愿 / 随口一提' }}
          </text>
          <text class="words__heart">♥</text>
        </view>
      </view>

      <!-- 最近日记 -->
      <view v-if="love.sortedDiaries.length" class="block">
        <view class="lv-section">
          <view class="lv-section__left">
            <view class="lv-section__bar" />
            <text class="lv-section__title">最近写的日记</text>
          </view>
          <text class="lv-section__more" @click="onFeatureTap('LoveDiaries')">全部 ›</text>
        </view>
        <view
          v-for="item in love.sortedDiaries.slice(0, 2)"
          :key="item.id"
          class="recent lv-card"
          @click="onEditDiary(item.id)">
          <view class="recent__date">
            <text class="recent__day">{{ item.date.slice(8) }}</text>
            <text class="recent__mon">{{ item.date.slice(5, 7) }} 月</text>
          </view>
          <view class="recent__body">
            <text class="recent__mood">{{ moodOf(item.mood).emoji }} {{ moodOf(item.mood).label }}</text>
            <text class="recent__text">{{ item.content }}</text>
          </view>
          <text class="recent__go">›</text>
        </view>
      </view>

      <view class="home__sign">
        <text>made with ♥ · only for us</text>
      </view>
      <view class="home__bottom" />
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import dayjs from 'dayjs'
import { useThemeVars } from '@/composables/useThemeVars'
import { useLoveStore } from '@/stores/love'
import { Router } from '@/common/router'
import { getStatusBarHeight, toast } from '@/utils'
import { moodOf } from '@/constants/love'
import { attitudeOf } from '@/constants/girlfriend'
import { selectGirlNotes } from '@/api/girlfriend'
import type { GirlNote } from '@/types/girlfriend'

type FeatureKey =
  | 'GirlfriendList'
  | 'LoveAnniversaries'
  | 'LoveChecklist'
  | 'LoveDiaries'
  | 'LoveCheckin'
  | 'LoveSettings'

const themeVars = useThemeVars()
const love = useLoveStore()
const statusBarHeight = getStatusBarHeight()

const WEEKS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const dateLine = computed(() => {
  const now = dayjs()
  return `${now.month() + 1} 月 ${now.date()} 日 · ${WEEKS[now.day()]}`
})

const greeting = computed(() => {
  const h = dayjs().hour()
  if (h < 6) return '夜深了'
  if (h < 11) return '早上好'
  if (h < 14) return '中午好'
  if (h < 18) return '下午好'
  return '晚上好'
})

const onFeatureTap = (key: FeatureKey) => Router.navigate(key)
const onEditDiary = (id: string) => Router.navigate('EditLoveDiary', { id })

/** tone 对应 styles/love-ui.scss 的 lv-tone--* 六色，让六张卡各有性格 */
const features = computed(() => [
  {
    emoji: '💌',
    title: '关于她',
    sub: '记下她说过的每句话',
    badge: '她的小事记 ›',
    tone: 'rose',
    onTap: () => Router.navigate('GirlfriendList')
  },
  {
    emoji: '🎂',
    title: '纪念日',
    sub: '倒数每个重要日子',
    badge: love.upcoming.length ? `${love.upcoming.length} 个日子 ›` : '去添加 ›',
    tone: 'peach',
    onTap: () => Router.navigate('LoveAnniversaries')
  },
  {
    emoji: '✅',
    title: '100 件小事',
    sub: '一件一件一起完成',
    badge: `已完成 ${love.checklistDoneCount} 件 ›`,
    tone: 'mint',
    onTap: () => Router.navigate('LoveChecklist')
  },
  {
    emoji: '📖',
    title: '恋爱日记',
    sub: '把日常写成时光轴',
    badge: love.sortedDiaries.length ? `已写 ${love.sortedDiaries.length} 篇 ›` : '从今天开始 ›',
    tone: 'sky',
    onTap: () => Router.navigate('LoveDiaries')
  },
  {
    emoji: '💗',
    title: '每日打卡',
    sub: '每天一句我爱你',
    badge: `连续 ${love.checkinStreak} 天 ›`,
    tone: 'lilac',
    onTap: () => Router.navigate('LoveCheckin')
  },
  {
    emoji: '⚙️',
    title: '我们的设置',
    sub: '在一起的日子与昵称',
    badge: '去看看 ›',
    tone: 'cream',
    onTap: () => Router.navigate('LoveSettings')
  }
])

/* ---------------- 她说过的话 ---------------- */

const latestNote = ref<GirlNote | null>(null)
const refreshing = ref(false)

const loadLatestNote = async () => {
  try {
    const page = await selectGirlNotes({ currentPage: 1, pageSize: 1, sort: 'new' })
    latestNote.value = page.records?.[0] || null
  } catch {
    // 首页不因接口异常弹提示：卡片退回引导文案，列表页自己会处理报错
    latestNote.value = null
  }
}

onLoad(() => {
  loadLatestNote()
})

const onRefresh = async () => {
  refreshing.value = true
  await loadLatestNote()
  refreshing.value = false
}

const onQuickCheckIn = () => {
  if (love.checkedInToday) {
    toast('今天已经打过卡啦')
    return
  }
  love.checkIn()
  toast('打卡成功，明天见')
}
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.home__status {
  background-color: transparent;
}

.home__scroll {
  flex: 1 1 0;
  min-height: 0;
}

.home__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 34rpx 38rpx 22rpx;
}

.home__top-left {
  min-width: 0;
}

.home__eyebrow {
  display: block;
  font-size: 20rpx;
  letter-spacing: 3rpx;
  color: #d07ca0;
  margin-bottom: 12rpx;
}

.home__greeting {
  display: block;
  font-size: 40rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
  color: var(--love-ink);
}

.home__sub {
  display: block;
  font-size: 23rpx;
  color: var(--love-ink-3);
  margin-top: 8rpx;
}

/* 右上「手账印章」：微微倾斜的圆形渐变，压住页头空白 */
.home__seal {
  width: 116rpx;
  height: 116rpx;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(140deg, #fff, #ffe6ef);
  border: 2rpx dashed #f3a9c6;
  box-shadow: 0 8rpx 20rpx rgba(226, 100, 148, 0.12);
  transform: rotate(-9deg);
  flex-shrink: 0;
  margin-left: 16rpx;
}

.home__seal-heart {
  font-size: 34rpx;
  color: #ee5a92;
  line-height: 1;
}

.home__seal-text {
  font-size: 18rpx;
  color: #c78aa6;
  letter-spacing: 1rpx;
  margin-top: 8rpx;
}

/* ---------------- 恋爱天数主视觉 ---------------- */
.hero {
  margin: 8rpx 30rpx 0;
  padding: 42rpx 40rpx 34rpx;
}

.hero__days {
  display: flex;
  align-items: baseline;
  margin-top: 18rpx;
}

.hero__unit {
  font-size: 32rpx;
  font-weight: 300;
  margin-left: 16rpx;
  opacity: 0.92;
}

.hero__rule {
  margin: 30rpx 0 24rpx;
}

.hero__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero__pair {
  display: flex;
  align-items: center;
  min-width: 0;
}

.hero__avatar {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22rpx;
  color: #d8437c;
  background-color: #fff;
  border: 2rpx solid rgba(255, 255, 255, 0.8);
  box-sizing: border-box;
}

.hero__avatar--ta {
  margin-left: -14rpx;
  background-color: #ffe3ee;
  color: #c9588c;
}

.hero__names {
  font-size: 23rpx;
  margin-left: 14rpx;
  opacity: 0.95;
  white-space: nowrap;
}

.hero__edit {
  font-size: 21rpx;
  opacity: 0.85;
  flex-shrink: 0;
}

/* ---------------- 今日打卡 ---------------- */
.checkin {
  display: flex;
  align-items: center;
  margin: 24rpx 30rpx 0;
  padding: 24rpx 26rpx;
  border-radius: 30rpx;
  background-image: linear-gradient(105deg, #fff, #fff0f5);
  box-shadow: 0 12rpx 32rpx rgba(226, 100, 148, 0.09);
  border: 1rpx solid rgba(255, 255, 255, 0.9);
}

.checkin__icon {
  width: 76rpx;
  height: 76rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(140deg, #ff9dbb, #ee5a92);
  box-shadow: 0 8rpx 20rpx rgba(226, 92, 148, 0.3), inset 0 2rpx 0 rgba(255, 255, 255, 0.4);
  color: #fff;
  font-size: 34rpx;
  margin-right: 20rpx;
  flex-shrink: 0;
}

.checkin__icon--done {
  background-image: linear-gradient(140deg, #ffd0df, #ffb0cb);
  box-shadow: 0 6rpx 16rpx rgba(226, 92, 148, 0.16);
}

.checkin__body {
  flex: 1 1 0;
  min-width: 0;
}

.checkin__title {
  display: block;
  font-size: 28rpx;
  font-weight: 600;
  color: var(--love-ink);
}

.checkin__sub {
  display: block;
  font-size: 22rpx;
  color: var(--love-ink-3);
  margin-top: 8rpx;
}

.checkin__btn {
  flex-shrink: 0;
  padding: 16rpx 30rpx;
  border-radius: 999rpx;
  font-size: 24rpx;
  font-weight: 600;
  color: #fff;
  background-image: linear-gradient(100deg, #ff92b4, #ee5a92);
  box-shadow: 0 8rpx 20rpx rgba(226, 92, 148, 0.26);
}

.checkin__btn--done {
  color: #c07b9b;
  background-image: linear-gradient(100deg, #fff2f7, #ffe4ee);
  box-shadow: none;
}

/* ---------------- 区块 ---------------- */
.block {
  margin: 0 30rpx;
}

.countdown {
  padding: 8rpx 24rpx;
}

.countdown__item {
  display: flex;
  align-items: center;
  padding: 24rpx 0;
}

.countdown__item--split {
  border-top: 1rpx solid var(--love-line);
}

.countdown__icon {
  margin-right: 20rpx;
}

.countdown__body {
  flex: 1 1 0;
  min-width: 0;
}

.countdown__title {
  display: block;
  font-size: 27rpx;
  font-weight: 600;
  color: var(--love-ink);
}

.countdown__date {
  display: block;
  font-size: 21rpx;
  color: var(--love-ink-3);
  margin-top: 8rpx;
  letter-spacing: 1rpx;
}

.countdown__right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
}

.countdown__days {
  font-size: 42rpx;
  font-weight: 300;
  line-height: 1;
  color: #e0518c;
}

.countdown__unit {
  font-size: 19rpx;
  color: var(--love-ink-3);
  margin-top: 8rpx;
}

.block__empty {
  display: flex;
  align-items: center;
  padding: 30rpx;
}

.block__empty-orb {
  font-size: 46rpx;
  margin-right: 20rpx;
}

.block__empty-text {
  flex: 1 1 0;
  font-size: 23rpx;
  line-height: 1.6;
  color: var(--love-ink-3);
}

/* ---------------- 六色宫格 ---------------- */
.grid {
  display: flex;
  flex-wrap: wrap;
}

.grid__cell {
  width: 50%;
  box-sizing: border-box;
  padding: 8rpx;
}

.grid__card {
  position: relative;
  overflow: hidden;
  min-height: 226rpx;
  padding: 26rpx 24rpx 22rpx;
  box-sizing: border-box;
}

.grid__deco {
  position: absolute;
  right: -8rpx;
  top: -26rpx;
  font-size: 116rpx;
  line-height: 1;
  color: rgba(255, 255, 255, 0.55);
  transform: rotate(-16deg);
}

.grid__title {
  display: block;
  font-size: 29rpx;
  font-weight: 600;
  color: var(--love-ink);
  margin-top: 18rpx;
}

.grid__sub {
  display: block;
  font-size: 21rpx;
  color: var(--love-ink-2);
  margin-top: 6rpx;
}

.grid__badge {
  display: inline-flex;
  margin-top: 16rpx;
  padding: 6rpx 16rpx;
  border-radius: 999rpx;
  background-color: rgba(255, 255, 255, 0.75);
  font-size: 19rpx;
  color: #d2598c;
}

/* ---------------- 她说过的话（信笺） ---------------- */
.words {
  position: relative;
  overflow: hidden;
  padding: 30rpx 30rpx 26rpx;
  border-radius: 32rpx;
  background-image: linear-gradient(140deg, #fff6f9 0%, #ffeaf2 100%);
  border-left: 6rpx solid #f6a8c6;
}

.words__deco {
  position: absolute;
  right: 24rpx;
  top: -34rpx;
  font-size: 160rpx;
  line-height: 1;
  color: rgba(238, 90, 146, 0.12);
}

.words__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.words__quote {
  display: block;
  position: relative;
  font-size: 29rpx;
  line-height: 1.8;
  color: #6d4355;
  margin: 22rpx 0 24rpx;
  padding-left: 4rpx;
}

.words__foot {
  display: flex;
  align-items: center;
}

.words__line {
  width: 36rpx;
  height: 1rpx;
  background-color: #f0aecb;
  margin-right: 14rpx;
  flex-shrink: 0;
}

.words__meta {
  flex: 1 1 0;
  min-width: 0;
  font-size: 20rpx;
  color: #b4879b;
}

.words__heart {
  font-size: 24rpx;
  color: #ee5a92;
  flex-shrink: 0;
}

/* ---------------- 最近日记 ---------------- */
.recent {
  display: flex;
  align-items: center;
  padding: 22rpx 24rpx;
  margin-bottom: 14rpx;
}

.recent__date {
  width: 86rpx;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1rpx solid var(--love-line);
  margin-right: 22rpx;
}

.recent__day {
  font-size: 40rpx;
  font-weight: 300;
  line-height: 1;
  color: #e0518c;
}

.recent__mon {
  font-size: 19rpx;
  color: var(--love-ink-3);
  margin-top: 8rpx;
}

.recent__body {
  flex: 1 1 0;
  min-width: 0;
}

.recent__mood {
  display: block;
  font-size: 21rpx;
  color: var(--love-ink-2);
}

.recent__text {
  display: block;
  font-size: 25rpx;
  color: var(--love-ink);
  margin-top: 8rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recent__go {
  font-size: 34rpx;
  color: var(--love-ink-3);
  margin-left: 12rpx;
}

.home__sign {
  padding: 40rpx 0 6rpx;
  text-align: center;
  font-size: 20rpx;
  letter-spacing: 2rpx;
  color: #d9b3c4;
}

.home__bottom {
  height: 60rpx;
}
</style>
