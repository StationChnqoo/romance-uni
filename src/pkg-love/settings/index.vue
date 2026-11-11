<!--
  情侣空间 · 设置。
  竞品口径（恋爱记 / 小恩爱）：资料不只有昵称 —— 双方生日会自动变成倒数日、
  恋爱宣言显示在首页、头像让两个人真的「在场」；还有一块关系数据统计，
  以及清空记录这种危险操作的二次确认。
  改开始日期后首页天数、里程碑与周年倒数都由 love store 自动重算。
-->
<template>
  <view :style="themeVars" class="settings lv-page">
    <view class="settings__hero lv-hero">
      <view class="lv-orb lv-orb--tr" />
      <view class="lv-orb lv-orb--bl" />
      <text class="lv-heart lv-heart--a love-icon love-i-heart" />
      <text class="lv-heart lv-heart--b love-icon love-i-heart" />
      <view class="lv-spark lv-spark--a" />
      <view class="lv-spark lv-spark--c" />
      <view class="lv-hero-in">
        <text class="lv-eyebrow">JUST THE TWO OF US</text>
        <text class="settings__hero-label">我们已经在一起</text>
        <view class="settings__hero-days">
          <text class="lv-display">{{ love.daysTogetherCount }}</text>
          <text class="settings__hero-unit">天</text>
        </view>
        <text class="settings__hero-tip">从 {{ love.startDate }} 开始，每一天都算数</text>
      </view>
    </view>

    <!-- 双人头像：资料里最有人味的一块，点一下换照片 -->
    <view class="settings__avatars">
      <view class="settings__avatar-wrap" @click="onPickAvatar('mine')">
        <image v-if="form.myAvatar" class="settings__avatar-img" :src="form.myAvatar" mode="aspectFill" />
        <view v-else class="settings__avatar"><text>{{ form.myName.slice(0, 1) }}</text></view>
        <text class="settings__avatar-name">{{ form.myName }}</text>
        <text class="settings__avatar-edit">换照片</text>
      </view>
      <view class="settings__link love-icon love-i-heart" />
      <view class="settings__avatar-wrap" @click="onPickAvatar('partner')">
        <image v-if="form.partnerAvatar" class="settings__avatar-img" :src="form.partnerAvatar" mode="aspectFill" />
        <view v-else class="settings__avatar settings__avatar--ta"><text>{{ form.partnerName.slice(0, 1) }}</text></view>
        <text class="settings__avatar-name">{{ form.partnerName }}</text>
        <text class="settings__avatar-edit">换照片</text>
      </view>
    </view>

    <view class="lv-section">
      <view class="lv-section__left">
        <view class="lv-section__bar" />
        <text class="lv-section__title">关于我们</text>
      </view>
    </view>

    <view class="settings__card lv-card">
      <view class="settings__row">
        <view class="settings__row-icon love-icon love-i-heart" />
        <text class="settings__label">在一起的那天</text>
        <picker mode="date" :value="form.startDate" @change="onStartDateChange">
          <view class="settings__value">{{ form.startDate }} ›</view>
        </picker>
      </view>

      <view class="settings__row">
        <view class="settings__row-icon love-icon love-i-user" />
        <text class="settings__label">我的昵称</text>
        <view class="settings__input-cell">
          <wd-input
            v-model="form.myName"
            :custom-style="'flex: 1; width: 100%; min-width: 0; text-align: right;'"
            no-border
            :maxlength="12"
            placeholder="我" />
        </view>
      </view>

      <view class="settings__row">
        <view class="settings__row-icon love-icon love-i-flower" />
        <text class="settings__label">TA 的昵称</text>
        <view class="settings__input-cell">
          <wd-input
            v-model="form.partnerName"
            :custom-style="'flex: 1; width: 100%; min-width: 0; text-align: right;'"
            no-border
            :maxlength="12"
            placeholder="亲爱的" />
        </view>
      </view>

      <view class="settings__row">
        <view class="settings__row-icon love-icon love-i-gift" />
        <text class="settings__label">我的生日</text>
        <picker mode="date" :value="form.myBirthday || form.startDate" @change="onMyBirthdayChange">
          <view class="settings__value">{{ form.myBirthday || '去设置' }} ›</view>
        </picker>
        <text v-if="form.myBirthday" class="settings__clear-mini" @click="form.myBirthday = ''">清除</text>
      </view>

      <view class="settings__row">
        <view class="settings__row-icon love-icon love-i-cake" />
        <text class="settings__label">TA 的生日</text>
        <picker mode="date" :value="form.partnerBirthday || form.startDate" @change="onPartnerBirthdayChange">
          <view class="settings__value">{{ form.partnerBirthday || '去设置' }} ›</view>
        </picker>
        <text v-if="form.partnerBirthday" class="settings__clear-mini" @click="form.partnerBirthday = ''">清除</text>
      </view>
    </view>

    <view class="lv-section">
      <view class="lv-section__left">
        <view class="lv-section__bar" />
        <text class="lv-section__title">我们的恋爱宣言</text>
      </view>
    </view>
    <view class="settings__vow lv-card">
      <textarea
        v-model="form.vow"
        class="settings__vow-input"
        :maxlength="60"
        placeholder="写一句只属于我们的话，会显示在首页"
        placeholder-class="settings__placeholder" />
      <text class="settings__vow-count">{{ form.vow.length }} / 60</text>
    </view>

    <!-- 关系数据：竞品的「数据统计 / 爱情指数」轻量版 -->
    <view class="lv-section">
      <view class="lv-section__left">
        <view class="lv-section__bar" />
        <text class="lv-section__title">一起攒下的</text>
      </view>
    </view>
    <view class="settings__stats lv-card">
      <view class="settings__stat">
        <text class="settings__stat-num">{{ love.spaceStats.diaries }}</text>
        <text class="settings__stat-label">恋爱日记</text>
      </view>
      <view class="settings__stat">
        <text class="settings__stat-num">{{ love.spaceStats.checklist }}</text>
        <text class="settings__stat-label">解锁小事</text>
      </view>
      <view class="settings__stat">
        <text class="settings__stat-num">{{ love.spaceStats.answers }}</text>
        <text class="settings__stat-label">一起答过</text>
      </view>
    </view>

    <view class="settings__info">
      <text>生日会自动出现在纪念日倒数里。这里的情侣记录只存在这台设备上，换设备不会同步；「关于她」走云端账号，可跨设备查看。</text>
    </view>

    <view class="settings__footer">
      <wd-button block round :custom-style="LOVE_PRIMARY_BTN" @click="onSave">
        保存我们的设置
      </wd-button>
      <text class="settings__danger" @click="onClear">
        {{ clearArmed ? '再点一次，确认清空全部记录' : '清空全部记录' }}
      </text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useThemeVars } from '@/composables/useThemeVars'
import { useLoveStore } from '@/stores/love'
import { LOVE_PRIMARY_BTN } from '@/constants/love'
import { chooseLocalImage } from '@/utils/chooseImage'
import { Router } from '@/common/router'
import { toast } from '@/utils'

const themeVars = useThemeVars()
const love = useLoveStore()

const form = reactive({
  startDate: love.startDate,
  myName: love.myName,
  partnerName: love.partnerName,
  vow: love.vow || '',
  myBirthday: love.myBirthday || '',
  partnerBirthday: love.partnerBirthday || '',
  myAvatar: love.myAvatar || '',
  partnerAvatar: love.partnerAvatar || ''
})
const clearArmed = ref(false)

const onStartDateChange = (e: { detail: { value: string } }) => {
  form.startDate = e.detail.value
}
const onMyBirthdayChange = (e: { detail: { value: string } }) => {
  form.myBirthday = e.detail.value
}
const onPartnerBirthdayChange = (e: { detail: { value: string } }) => {
  form.partnerBirthday = e.detail.value
}
const onPickAvatar = async (role: 'mine' | 'partner') => {
  const path = await chooseLocalImage()
  if (!path) return
  if (role === 'mine') form.myAvatar = path
  else form.partnerAvatar = path
}

const onSave = () => {
  love.setProfile({ ...form })
  toast('已保存，回到首页看看我们的天数')
  Router.back()
}
const onClear = () => {
  if (!clearArmed.value) {
    clearArmed.value = true
    return
  }
  love.clearAll()
  clearArmed.value = false
  toast('记录已清空，资料还在')
}
</script>

<style lang="scss" scoped>
.settings {
  min-height: 100vh;
  padding: 30rpx 30rpx 80rpx;
  box-sizing: border-box;
}

/* ---------------- 主视觉 ---------------- */
.settings__hero {
  padding: 28rpx 24rpx 28rpx;
}

.settings__hero-label {
  display: block;
  font-size: 26rpx;
  opacity: 0.92;
  margin-top: 26rpx;
}

.settings__hero-days {
  display: flex;
  align-items: baseline;
  margin-top: 12rpx;
}

.settings__hero-unit {
  font-size: 30rpx;
  font-weight: 300;
  margin-left: 16rpx;
  opacity: 0.92;
}

.settings__hero-tip {
  display: block;
  font-size: 22rpx;
  opacity: 0.88;
  margin-top: 26rpx;
  letter-spacing: 1rpx;
}

/* ---------------- 双人头像 ---------------- */
.settings__avatars {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24rpx;
  margin: 28rpx 0 8rpx;
  padding: 20rpx 16rpx;
  border-radius: 32rpx;
  background-color: #fff;
}

.settings__avatar-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.settings__avatar,
.settings__avatar-img {
  width: 108rpx;
  height: 108rpx;
  border-radius: 50%;
  border: 4rpx solid #ffe0ec;
  background-color: #ffe0ec;
}

.settings__avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 42rpx;
  color: #d8437c;
}

.settings__avatar--ta {
  background-color: #e5d5ff;
  border-color: #e5d5ff;
  color: #8a63bd;
}

.settings__link {
  font-size: 40rpx;
  color: #e0518c;
}

.settings__avatar-name {
  font-size: 22rpx;
  color: var(--love-ink);
  margin-top: 12rpx;
}

.settings__avatar-edit {
  font-size: 19rpx;
  color: var(--love-ink-3);
  margin-top: 6rpx;
}

/* ---------------- 表单 ---------------- */
.settings__card {
  padding: 4rpx 20rpx;
  overflow: hidden;
}

.settings__row {
  display: flex;
  align-items: center;
  min-height: 108rpx;
  border-bottom: 1rpx solid var(--love-line);
}

.settings__row:last-child {
  border-bottom: none;
}

.settings__row-icon {
  width: 60rpx;
  height: 60rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(140deg, #fff2f7, #ffe0ec);
  font-size: 28rpx;
  margin-right: 18rpx;
  flex-shrink: 0;
  color: #e0518c;
}

.settings__label {
  font-size: 27rpx;
  color: var(--love-ink);
  flex-shrink: 0;
}

.settings__value {
  font-size: 26rpx;
  color: var(--love-ink-2);
  text-align: right;
  letter-spacing: 1rpx;
}

.settings__input-cell {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  justify-content: flex-end;
}

.settings__row picker {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  justify-content: flex-end;
}

.settings__clear-mini {
  font-size: 19rpx;
  color: var(--love-ink-3);
  margin-left: 14rpx;
  padding: 4rpx 12rpx;
  border-radius: 999rpx;
  background-color: var(--love-bg);
}

/* ---------------- 宣言 ---------------- */
.settings__vow {
  padding: 20rpx 20rpx 16rpx;
  background-image: linear-gradient(120deg, #fff6f9, #ffeaf2);
}

.settings__vow-input {
  width: 100%;
  min-height: 110rpx;
  font-size: 26rpx;
  line-height: 1.7;
  color: var(--love-ink);
  box-sizing: border-box;
}

.settings__placeholder {
  color: var(--love-ink-3);
}

.settings__vow-count {
  display: block;
  text-align: right;
  font-size: 19rpx;
  color: var(--love-ink-3);
}

/* ---------------- 数据统计 ---------------- */
.settings__stats {
  display: flex;
  padding: 16rpx 10rpx;
}

.settings__stat {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1rpx solid var(--love-line);
}

.settings__stat:last-child {
  border-right: none;
}

.settings__stat-num {
  font-size: 40rpx;
  font-weight: 300;
  line-height: 1.1;
  color: #e0518c;
}

.settings__stat-label {
  font-size: 19rpx;
  color: var(--love-ink-3);
  margin-top: 10rpx;
}

.settings__info {
  padding: 16rpx 10rpx 0;
  font-size: 21rpx;
  line-height: 1.7;
  color: var(--love-ink-3);
  text-align: center;
}

.settings__footer {
  margin-top: 48rpx;
}

.settings__danger {
  display: block;
  text-align: center;
  margin-top: 30rpx;
  font-size: 21rpx;
  color: #c58a9b;
}
</style>
