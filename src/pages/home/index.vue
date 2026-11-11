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
          <text class="home__sub">今天也要好好相爱呀</text>
        </view>
        <view class="home__seal">
          <text class="home__seal-heart love-icon love-i-heart" />
          <text class="home__seal-text">since {{ love.startDate.slice(0, 4) }}</text>
        </view>
      </view>

      <!-- 首次引导：竞品第一次进来都会让你先把「两个人」建起来 -->
      <view v-if="!love.profileDone" class="onboard lv-card" @click="onFeatureTap('LoveSettings')">
        <view class="onboard__icon love-icon love-i-heart" />
        <view class="onboard__body">
          <text class="onboard__title">先把我们的故事起点填上</text>
          <text class="onboard__sub">在一起的那天、两个人的昵称，一分钟就好</text>
        </view>
        <text class="onboard__go">去设置 ›</text>
      </view>

      <!-- 恋爱天数主视觉：点进设置改开始日期 -->
      <view class="hero lv-hero" @click="onFeatureTap('LoveSettings')">
        <view class="lv-orb lv-orb--tr" />
        <view class="lv-orb lv-orb--bl" />
        <text class="lv-heart lv-heart--a love-icon love-i-heart" />
        <text class="lv-heart lv-heart--b love-icon love-i-heart" />
        <view class="lv-spark lv-spark--a" />
        <view class="lv-spark lv-spark--b" />
        <view class="lv-spark lv-spark--c" />
        <view class="lv-hero-in">
          <text class="lv-eyebrow">我们在一起的第</text>
          <view class="hero__days">
            <text class="lv-display">{{ love.daysTogetherCount }}</text>
            <text class="hero__unit">天</text>
          </view>
          <view class="lv-rule hero__rule" />
          <view class="hero__foot">
            <view class="hero__pair">
              <text class="hero__avatar hero__avatar--me">{{ love.myName.slice(0, 1) }}</text>
              <text class="hero__avatar hero__avatar--ta">{{ love.partnerName.slice(0, 1) }}</text>
              <view class="hero__names">
                <text>{{ love.myName }}</text>
                <text class="love-icon love-i-heart" />
                <text>{{ love.partnerName }}</text>
              </view>
            </view>
            <text class="hero__edit">始于 {{ love.startDate }} ›</text>
          </view>
        </view>
      </view>

      <view v-if="love.vow" class="vow">
        <text class="vow__quote">“</text>
        <text class="vow__text">{{ love.vow }}</text>
      </view>

      <!-- 今日打卡条 -->
      <view class="checkin" @click="onFeatureTap('LoveCheckin')">
        <view class="checkin__icon" :class="{ 'checkin__icon--done': love.todayCheckinComplete }">
          <text class="love-icon love-i-heart" />
        </view>
        <view class="checkin__body">
          <text class="checkin__title">{{ checkinTitle }}</text>
          <text class="checkin__sub">连续 {{ love.checkinStreak }} 天 · 一起完成 {{ love.totalCheckins }} 次</text>
        </view>
        <view
          class="checkin__btn"
          :class="{ 'checkin__btn--done': love.mineCheckedToday }"
          @click.stop="onQuickCheckIn">
          <text>{{ love.mineCheckedToday ? '我说过啦' : '说一句' }}</text>
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
            <view class="lv-icon countdown__icon love-icon" :class="'love-i-' + item.icon" />
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
        <view v-if="!love.upcoming.length" class="lv-card block__empty">
          <text class="block__empty-orb love-icon love-i-flower" />
          <text class="block__empty-text">去设置里填「在一起的那天」，纪念日会自动算好</text>
        </view>
        <view v-if="reminder" class="remind">
          <text class="love-icon love-i-clock" />
          <text class="remind__text">别忘了：{{ reminder.daysLeft }} 天后是「{{ reminder.title }}」</text>
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
              <text class="grid__deco love-icon love-i-heart" />
              <view class="lv-tone__icon love-icon" :class="'love-i-' + item.icon" />
              <text class="grid__title">{{ item.title }}</text>
              <text class="grid__sub">{{ item.sub }}</text>
              <text v-if="item.badge" class="grid__badge">{{ item.badge }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 关系成长数据：竞品的「数据统计」轻量版 -->
      <view class="block">
        <view class="lv-section">
          <view class="lv-section__left">
            <view class="lv-section__bar" />
            <text class="lv-section__title">一起攒下的</text>
          </view>
        </view>
        <view class="stats lv-card">
          <view class="stats__item">
            <text class="stats__num">{{ love.spaceStats.checkins }}</text>
            <text class="stats__label">双人打卡</text>
          </view>
          <view class="stats__item">
            <text class="stats__num">{{ love.spaceStats.diaries }}</text>
            <text class="stats__label">恋爱日记</text>
          </view>
          <view class="stats__item">
            <text class="stats__num">{{ love.spaceStats.checklist }}</text>
            <text class="stats__label">解锁小事</text>
          </view>
          <view class="stats__item">
            <text class="stats__num">{{ love.spaceStats.answers }}</text>
            <text class="stats__label">一起答过</text>
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
          <view class="words__actions">
            <text class="words__quick" @click.stop="onQuickNote">＋ 记一句</text>
            <text class="lv-section__more">去记录 ›</text>
          </view>
        </view>
        <text class="words__quote">{{ latestNote ? latestNote.content : '把她说过的每一句都记下来，别让随口一提变成忘记。' }}</text>
        <view class="words__foot">
          <view class="words__line" />
          <text class="words__meta">
            {{ latestNote ? `${latestNote.saidAt} · ${attitudeOf(latestNote.attitude).label}` : '来自「关于她」· 喜欢 / 心愿 / 随口一提' }}
          </text>
          <text class="words__heart love-icon love-i-heart" />
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
            <view class="recent__mood">
              <text class="love-icon" :class="'love-i-' + moodOf(item.mood).icon" />
              <text>{{ moodOf(item.mood).label }}</text>
            </view>
            <text class="recent__text">{{ item.content }}</text>
          </view>
          <text class="recent__go">›</text>
        </view>
      </view>

      <view class="home__sign">
        <text>made with love · only for us</text>
      </view>
      <view class="home__bottom" />
    </scroll-view>

    <!-- 首页快捷「+」：竞品的快速发布，不用先找到对应板块 -->
    <view class="lv-fab" @click="quickVisible = true">
      <wd-icon name="add" size="24px" color="#fff" />
    </view>

    <wd-popup
      :model-value="quickVisible"
      position="bottom"
      :safe-area-inset-bottom="false"
      :close-on-click-modal="true"
      :root-portal="true"
      :z-index="200"
      @update:model-value="onQuickUpdate">
      <view class="lv-sheet">
        <view class="lv-handle" />
        <text class="lv-sheet__title">今天想记点什么</text>
        <view class="quick">
          <view class="quick__item" @click="onQuickNote">
            <view class="quick__icon love-icon love-i-letter" />
            <text class="quick__label">记一句她说的话</text>
            <text class="quick__sub">随口一提，别让它溜走</text>
          </view>
          <view class="quick__item" @click="onQuickGo('EditLoveDiary')">
            <view class="quick__icon love-icon love-i-book" />
            <text class="quick__label">写一篇恋爱日记</text>
            <text class="quick__sub">把今天存进时光轴</text>
          </view>
          <view class="quick__item" @click="onQuickGo('LoveAnniversaries')">
            <view class="quick__icon love-icon love-i-cake" />
            <text class="quick__label">加一个纪念日</text>
            <text class="quick__sub">下一个值得期待的日子</text>
          </view>
        </view>
      </view>
    </wd-popup>

    <!-- 一句话快记：只填内容，其余用默认值，避免进二级页填一堆字段 -->
    <wd-popup
      :model-value="noteVisible"
      position="bottom"
      :safe-area-inset-bottom="false"
      :close-on-click-modal="true"
      :root-portal="true"
      :z-index="210"
      @update:model-value="onNoteUpdate">
      <view class="lv-sheet">
        <view class="lv-handle" />
        <text class="lv-sheet__title">她今天说了什么</text>
        <view class="quick__input">
          <textarea
            v-model="quickText"
            class="quick__textarea"
            :maxlength="200"
            placeholder="她说：「…」"
            placeholder-class="quick__placeholder" />
        </view>
        <wd-button block round :custom-style="LOVE_PRIMARY_BTN" @click="onSaveQuickNote">
          记下来
        </wd-button>
      </view>
    </wd-popup>
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
import { LOVE_PRIMARY_BTN, moodOf } from '@/constants/love'
import { attitudeOf } from '@/constants/girlfriend'
import { mergeGirlNote, selectGirlNotes } from '@/api/girlfriend'
import { createGirlNote } from '@/types/girlfriend'
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

/** 双人打卡：首页只替「我」说一句，另一位在打卡页点，两个人都说才算完成 */
const checkinTitle = computed(() => {
  if (love.todayCheckinComplete) return '今天两个人都说过我爱你啦'
  if (love.mineCheckedToday) return `等 ${love.partnerName} 也来说一句`
  if (love.partnerCheckedToday) return `轮到 ${love.myName} 说一句啦`
  return '今天还没打卡哦'
})
/** 提前提醒生效：页内提示，不发系统通知（纯本地方案没有推送通道） */
const reminder = computed(() =>
  love.upcoming.find(item => item.remind > 0 && item.daysLeft > 0 && item.daysLeft <= item.remind)
)

/** tone 对应 styles/love-ui.scss 的 lv-tone--* 六色，让六张卡各有性格 */
const features = computed(() => [
  {
    icon: 'letter',
    title: '关于她',
    sub: '记下她说过的每句话',
    badge: '她的小事记 ›',
    tone: 'rose',
    onTap: () => Router.navigate('GirlfriendList')
  },
  {
    icon: 'cake',
    title: '纪念日',
    sub: '倒数每个重要日子',
    badge: love.upcoming.length ? `${love.upcoming.length} 个日子 ›` : '去添加 ›',
    tone: 'peach',
    onTap: () => Router.navigate('LoveAnniversaries')
  },
  {
    icon: 'todo',
    title: '100 件小事',
    sub: '解锁一件，留一张合照',
    badge: `已完成 ${love.checklistDoneCount} 件 ›`,
    tone: 'mint',
    onTap: () => Router.navigate('LoveChecklist')
  },
  {
    icon: 'book',
    title: '恋爱日记',
    sub: '把日常写成时光轴',
    badge: love.sortedDiaries.length ? `已写 ${love.sortedDiaries.length} 篇 ›` : '从今天开始 ›',
    tone: 'sky',
    onTap: () => Router.navigate('LoveDiaries')
  },
  {
    icon: 'hand-heart',
    title: '每日打卡',
    sub: '每天一句我爱你',
    badge: `连续 ${love.checkinStreak} 天 ›`,
    tone: 'lilac',
    onTap: () => Router.navigate('LoveCheckin')
  },
  {
    icon: 'settings',
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
const quickVisible = ref(false)
const noteVisible = ref(false)
const quickText = ref('')

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
  if (love.mineCheckedToday) {
    toast(love.todayCheckinComplete ? '今天两个人都在啦' : '等另一半也来说一句')
    return
  }
  love.checkInAs('mine')
  toast('记下了，去打卡页让 TA 也点一下')
}

/* ---------------- 首页快捷发布 ---------------- */

const onQuickUpdate = (v: boolean) => {
  quickVisible.value = v
}
const onNoteUpdate = (v: boolean) => {
  noteVisible.value = v
}
const onQuickGo = (key: 'EditLoveDiary' | 'LoveAnniversaries') => {
  quickVisible.value = false
  Router.navigate(key)
}
const onQuickNote = () => {
  quickVisible.value = false
  quickText.value = ''
  noteVisible.value = true
}
/** 一句话快记：只填 content，其余用 createGirlNote() 的默认态度 / 状态 / 今天 */
const onSaveQuickNote = async () => {
  const text = quickText.value.trim()
  if (!text) {
    toast('先写一句她说的话吧')
    return
  }
  const note = createGirlNote()
  note.content = text
  try {
    await mergeGirlNote(note)
    noteVisible.value = false
    quickText.value = ''
    toast('记下了')
    await loadLatestNote()
  } catch {
    toast('没存上，稍后再试一次')
  }
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
  padding: 24rpx 30rpx 16rpx;
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
  padding: 28rpx 24rpx 24rpx;
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
  display: flex;
  align-items: center;
  margin-left: 14rpx;
  opacity: 0.95;
  white-space: nowrap;
}
.hero__names .love-icon {
  margin: 0 8rpx;
  font-size: 20rpx;
  color: #fff;
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
  padding: 16rpx 20rpx;
  border-radius: 30rpx;
  background-image: linear-gradient(105deg, #fff, #fff0f5);
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
  color: #fff;
  font-size: 34rpx;
  margin-right: 20rpx;
  flex-shrink: 0;
}

.checkin__icon--done {
  background-image: linear-gradient(140deg, #ffd0df, #ffb0cb);
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
}

.checkin__btn--done {
  color: #c07b9b;
  background-image: linear-gradient(100deg, #fff2f7, #ffe4ee);
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
  padding: 16rpx 0;
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
  display: flex;
  align-items: center;
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
  padding: 20rpx;
}

.block__empty-orb {
  font-size: 46rpx;
  margin-right: 20rpx;
  color: #e0518c;
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
}

.grid__card {
  position: relative;
  overflow: hidden;
  min-height: 226rpx;
  margin: 6rpx;
  padding: 16rpx 16rpx;
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
  padding: 20rpx 20rpx 16rpx;
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
  padding: 16rpx 20rpx;
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
.recent__mood .love-icon {
  margin-right: 8rpx;
  font-size: 22rpx;
  color: #d2598c;
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

/* ---------------- 竞品交互新增：首次引导 / 宣言 / 提醒 / 统计 / 快捷发布 ---------------- */
.onboard {
  display: flex;
  align-items: center;
  margin: 0 30rpx 24rpx;
  padding: 16rpx 20rpx;
  background-image: linear-gradient(110deg, #fff4f8, #ffe8f1);
  border: 1rpx solid #ffd7e6;
}

.onboard__icon {
  width: 64rpx;
  height: 64rpx;
  border-radius: 22rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  color: #fff;
  background-image: linear-gradient(140deg, #ff9dbb, #ee5a92);
  margin-right: 20rpx;
  flex-shrink: 0;
}

.onboard__body {
  flex: 1 1 0;
  min-width: 0;
}

.onboard__title {
  display: block;
  font-size: 26rpx;
  font-weight: 600;
  color: var(--love-ink);
}

.onboard__sub {
  display: block;
  font-size: 20rpx;
  color: var(--love-ink-2);
  margin-top: 8rpx;
}

.onboard__go {
  font-size: 21rpx;
  color: #d2598c;
  flex-shrink: 0;
}

.vow {
  position: relative;
  margin: 20rpx 30rpx 0;
  padding: 16rpx 20rpx 16rpx 48rpx;
  border-radius: 24rpx;
  background-color: rgba(255, 255, 255, 0.7);
  border: 1rpx solid var(--love-line);
}

.vow__quote {
  position: absolute;
  left: 18rpx;
  top: 6rpx;
  font-size: 56rpx;
  line-height: 1;
  color: #f3b9d0;
}

.vow__text {
  font-size: 23rpx;
  line-height: 1.65;
  color: #9b5c78;
}

.remind {
  display: flex;
  align-items: center;
  margin-top: 16rpx;
  padding: 14rpx 20rpx;
  border-radius: 999rpx;
  background-image: linear-gradient(100deg, #fff1f7, #ffe3ee);
  border: 1rpx solid #ffd0e2;
}

.remind .love-icon {
  font-size: 26rpx;
  color: #e0518c;
  margin-right: 12rpx;
}

.remind__text {
  font-size: 21rpx;
  color: #b14077;
}

.stats {
  display: flex;
  padding: 16rpx 10rpx;
}

.stats__item {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1rpx solid var(--love-line);
}

.stats__item:last-child {
  border-right: none;
}

.stats__num {
  font-size: 38rpx;
  font-weight: 300;
  line-height: 1.1;
  color: #e0518c;
}

.stats__label {
  font-size: 19rpx;
  color: var(--love-ink-3);
  margin-top: 10rpx;
}

.words__actions {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.words__quick {
  padding: 8rpx 20rpx;
  border-radius: 999rpx;
  font-size: 20rpx;
  color: #b14077;
  background-color: rgba(255, 255, 255, 0.75);
  border: 1rpx solid #ffd7e6;
}

.quick {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  margin: 24rpx 0 8rpx;
}

.quick__item {
  position: relative;
  padding: 16rpx 20rpx 16rpx 92rpx;
  border-radius: 26rpx;
  background-color: var(--love-bg);
  border: 1rpx solid var(--love-line);
}

.quick__icon {
  position: absolute;
  left: 24rpx;
  top: 22rpx;
  width: 56rpx;
  height: 56rpx;
  border-radius: 18rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  color: #fff;
  background-image: linear-gradient(140deg, #ff9dbb, #ee5a92);
}

.quick__label {
  display: block;
  font-size: 26rpx;
  font-weight: 600;
  color: var(--love-ink);
}

.quick__sub {
  display: block;
  font-size: 20rpx;
  color: var(--love-ink-3);
  margin-top: 6rpx;
}

.quick__input {
  margin: 24rpx 0 28rpx;
  padding: 16rpx 20rpx;
  border-radius: 24rpx;
  background-color: var(--love-bg);
}

.quick__textarea {
  width: 100%;
  min-height: 140rpx;
  font-size: 26rpx;
  line-height: 1.65;
  color: var(--love-ink);
  box-sizing: border-box;
}

.quick__placeholder {
  color: var(--love-ink-3);
}

</style>
