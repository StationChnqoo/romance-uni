<!--
  情侣空间 · 设置：在一起的日子 + 双方昵称。
  保存后首页恋爱天数、天数里程碑与周年倒数都由 love store 自动重算，不需要额外刷新逻辑。
-->
<template>
  <view :style="themeVars" class="settings lv-page">
    <view class="settings__hero lv-hero">
      <view class="lv-orb lv-orb--tr" />
      <view class="lv-orb lv-orb--bl" />
      <text class="lv-heart lv-heart--a">♥</text>
      <text class="lv-heart lv-heart--b">♥</text>
      <view class="lv-spark lv-spark--a" />
      <view class="lv-spark lv-spark--c" />
      <view class="lv-hero-in">
        <text class="lv-eyebrow">JUST THE TWO OF US</text>
        <text class="settings__hero-label">我们已经在一起</text>
        <view class="settings__hero-days">
          <text class="lv-display">{{ love.daysTogetherCount }}</text>
          <text class="settings__hero-unit">天</text>
        </view>
        <text class="settings__hero-tip">从 {{ love.startDate }} 开始，每一天都算数 ♡</text>
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
        <view class="settings__row-icon">💗</view>
        <text class="settings__label">在一起的那天</text>
        <picker mode="date" :value="form.startDate" @change="onStartDateChange">
          <view class="settings__value">{{ form.startDate }} ›</view>
        </picker>
      </view>

      <view class="settings__row">
        <view class="settings__row-icon">🙋</view>
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
        <view class="settings__row-icon">🌷</view>
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
    </view>

    <view class="settings__note">
      <text>♡ 改了开始日期，所有纪念日倒数会跟着变</text>
    </view>

    <view class="settings__footer">
      <wd-button block round :custom-style="LOVE_PRIMARY_BTN" @click="onSave">
        保存我们的设置
      </wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useThemeVars } from '@/composables/useThemeVars'
import { useLoveStore } from '@/stores/love'
import { LOVE_PRIMARY_BTN } from '@/constants/love'
import { Router } from '@/common/router'
import { toast } from '@/utils'

const themeVars = useThemeVars()
const love = useLoveStore()

const form = reactive({
  startDate: love.startDate,
  myName: love.myName,
  partnerName: love.partnerName
})

const onStartDateChange = (e: { detail: { value: string } }) => {
  form.startDate = e.detail.value
}

const onSave = () => {
  love.setProfile({
    startDate: form.startDate,
    myName: form.myName,
    partnerName: form.partnerName
  })
  toast('已保存，回到首页看看我们的天数')
  Router.back()
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
  padding: 44rpx 40rpx 46rpx;
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

/* ---------------- 表单 ---------------- */
.settings__card {
  padding: 6rpx 28rpx;
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

.settings__note {
  padding: 24rpx 10rpx 0;
  font-size: 21rpx;
  color: var(--love-ink-3);
  text-align: center;
}

.settings__footer {
  margin-top: 48rpx;
}
</style>
