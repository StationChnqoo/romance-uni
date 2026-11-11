<!--
  情侣空间 · 恋爱日记 / 时光轴（竞品「恋爱记录 / 二人世界」）。
  数据全部在 love store，按日期倒序；点卡片进编辑页，删除在编辑页里。
-->
<template>
  <view :style="themeVars" class="diary lv-page">
    <view class="diary__hero lv-hero" @click="onAdd">
      <view class="lv-orb lv-orb--tr" />
      <view class="lv-orb lv-orb--bl" />
      <text class="lv-heart lv-heart--a love-icon love-i-heart" />
      <view class="lv-spark lv-spark--a" />
      <view class="lv-hero-in diary__hero-in">
        <view class="diary__hero-body">
          <text class="lv-eyebrow">OUR LITTLE DIARY</text>
          <text class="diary__hero-title">写下今天的一点点</text>
          <text class="diary__hero-sub">以后回头翻，都是我们</text>
        </view>
        <view class="diary__hero-pen love-icon love-i-quill" />
      </view>
    </view>

    <view class="lv-section">
      <view class="lv-section__left">
        <view class="lv-section__bar" />
        <text class="lv-section__title">我们的时光轴</text>
      </view>
      <text class="lv-section__more">共 {{ love.sortedDiaries.length }} 篇</text>
    </view>

    <view v-if="love.sortedDiaries.length" class="diary__timeline lv-timeline">
      <view class="lv-timeline__line" />
      <view v-for="item in love.sortedDiaries" :key="item.id" class="diary__item">
        <view class="lv-timeline__dot" />
        <view class="diary__card lv-card" @click="onEdit(item.id)">
          <view class="diary__tape" />
          <view class="diary__card-head">
            <view class="diary__date">
              <text class="diary__date-day">{{ item.date.slice(8) }}</text>
              <text class="diary__date-month">{{ item.date.slice(0, 7) }}</text>
            </view>
            <view class="diary__head-right">
              <view class="diary__mood">
                <text class="love-icon" :class="'love-i-' + moodOf(item.mood).icon" />
                <text>{{ moodOf(item.mood).label }}</text>
              </view>
              <text class="diary__week">{{ weekOf(item.date) }}</text>
            </view>
          </view>
          <text class="diary__text">{{ item.content }}</text>
          <view v-if="item.images.length" class="diary__images">
            <image
              v-for="src in item.images"
              :key="src"
              class="diary__image"
              :src="src"
              mode="aspectFill" />
          </view>
        </view>
      </view>
    </view>
    <view v-else class="diary__empty lv-card">
      <view class="diary__empty-orb love-icon love-i-quill" />
      <text class="diary__empty-title">第一页还空着</text>
      <text class="diary__empty-sub">写一句今天的小事，以后翻回来都是我们</text>
      <view class="diary__empty-btn" @click="onAdd">
        <text class="love-icon love-i-quill" />
        <text>写第一篇日记</text>
      </view>
    </view>

    <view class="lv-fab" @click="onAdd">
      <wd-icon name="add" size="24px" color="#fff" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { useThemeVars } from '@/composables/useThemeVars'
import { useLoveStore } from '@/stores/love'
import { moodOf } from '@/constants/love'
import { Router } from '@/common/router'

const themeVars = useThemeVars()
const love = useLoveStore()

const WEEKS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const weekOf = (date: string) => WEEKS[dayjs(date).day()]

const onAdd = () => Router.navigate('EditLoveDiary')
const onEdit = (id: string) => Router.navigate('EditLoveDiary', { id })
</script>

<style lang="scss" scoped>
.diary {
  min-height: 100vh;
  padding: 30rpx 30rpx 180rpx;
  box-sizing: border-box;
}

/* ---------------- 写日记入口 ---------------- */
.diary__hero {
  padding: 28rpx 24rpx;
}

.diary__hero-in {
  display: flex;
  align-items: center;
}

.diary__hero-body {
  flex: 1 1 0;
  min-width: 0;
}

.diary__hero-title {
  display: block;
  font-size: 38rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
  margin-top: 26rpx;
}

.diary__hero-sub {
  display: block;
  font-size: 23rpx;
  opacity: 0.9;
  margin-top: 12rpx;
}

.diary__hero-pen {
  width: 104rpx;
  height: 104rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.22);
  border: 2rpx solid rgba(255, 255, 255, 0.4);
  color: #fff;
  font-size: 52rpx;
  flex-shrink: 0;
  margin-left: 20rpx;
}

/* ---------------- 时间轴 ---------------- */
.diary__timeline {
  padding-left: 36rpx;
}

.diary__item {
  position: relative;
  padding-bottom: 22rpx;
}

.diary__item .lv-timeline__dot {
  top: 42rpx;
}

.diary__card {
  position: relative;
  margin-left: 18rpx;
  padding: 20rpx 20rpx;
}

/* 顶部小胶带：手账感 */
.diary__tape {
  position: absolute;
  top: -12rpx;
  left: 50%;
  width: 92rpx;
  height: 26rpx;
  margin-left: -46rpx;
  border-radius: 4rpx;
  background-color: rgba(255, 205, 225, 0.75);
  transform: rotate(-3deg);
}

.diary__card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.diary__date {
  display: flex;
  align-items: baseline;
}

.diary__date-day {
  font-size: 52rpx;
  font-weight: 300;
  line-height: 1;
  color: #e0518c;
}

.diary__date-month {
  font-size: 20rpx;
  color: var(--love-ink-3);
  margin-left: 12rpx;
  letter-spacing: 1rpx;
}

.diary__head-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.diary__mood {
  display: flex;
  align-items: center;
  font-size: 22rpx;
  color: #d2598c;
  padding: 6rpx 16rpx;
  border-radius: 999rpx;
  background-color: var(--love-soft);
}
.diary__mood .love-icon {
  margin-right: 8rpx;
  font-size: 22rpx;
}

.diary__week {
  font-size: 20rpx;
  color: var(--love-ink-3);
  margin-top: 10rpx;
}

.diary__text {
  display: block;
  font-size: 27rpx;
  color: var(--love-ink);
  line-height: 1.75;
  margin-top: 22rpx;
  white-space: pre-wrap;
}

.diary__images {
  display: flex;
  gap: 12rpx;
  margin-top: 20rpx;
}

.diary__image {
  width: 156rpx;
  height: 156rpx;
  border-radius: 20rpx;
  background-color: var(--love-soft);
}
/* ---------------- 空态引导 ---------------- */
.diary__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx 24rpx 40rpx;
  margin-top: 10rpx;
}

.diary__empty-orb {
  font-size: 72rpx;
  color: #e0518c;
  line-height: 1;
}

.diary__empty-title {
  font-size: 30rpx;
  color: var(--love-ink);
  margin-top: 26rpx;
}

.diary__empty-sub {
  font-size: 22rpx;
  color: var(--love-ink-3);
  margin-top: 12rpx;
  text-align: center;
  line-height: 1.7;
}

.diary__empty-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 34rpx;
  padding: 18rpx 46rpx;
  border-radius: 999rpx;
  background-image: linear-gradient(100deg, #ff92b4, #ee5a92);
  color: #fff;
  font-size: 24rpx;
}

.diary__empty-btn .love-icon {
  font-size: 26rpx;
  margin-right: 12rpx;
  color: #fff;
}
</style>
