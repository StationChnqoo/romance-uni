<!--
  情侣空间 · 纪念日倒数（小恩爱 / 恋爱记同款「纪念日」）。
  列表 = 自动里程碑（在一起 100 天 / 520 天 / 周年，由开始日期算）+ 自己加的日子。
  自动项不可删除，改开始日期会自动重算，不落库、不会产生脏数据。
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
          <text class="ann__hero-date">{{ next.date }}</text>
        </template>
        <text v-else class="ann__hero-empty">先去设置里填「在一起的那天」吧</text>
      </view>
    </view>

    <view class="lv-section">
      <view class="lv-section__left">
        <view class="lv-section__bar" />
        <text class="lv-section__title">全部倒数</text>
      </view>
      <text class="lv-section__more">共 {{ list.length }} 个日子</text>
    </view>
    <text class="ann__hint">带「自动」的是按我们在一起的天数算出来的</text>

    <view v-if="list.length" class="ann__list">
      <view v-for="item in list" :key="item.id" class="ann__card lv-card">
        <view class="ann__stripe" />
        <view class="lv-icon ann__icon love-icon" :class="'love-i-' + item.icon" />
        <view class="ann__body">
          <text class="ann__title">{{ item.title }}</text>
          <text class="ann__date">{{ item.date }}{{ item.years ? ` · 第 ${item.years} 年` : '' }}</text>
          <text v-if="item.auto" class="ann__tag">自动算出</text>
        </view>
        <view class="ann__right">
          <text class="ann__days">{{ item.daysLeft === 0 ? '今天' : item.daysLeft }}</text>
          <text v-if="item.daysLeft !== 0" class="ann__unit">天后</text>
          <text v-if="!item.auto" class="ann__remove" @click="onRemove(item.id)">删除</text>
        </view>
      </view>
    </view>
    <view v-else class="lv-empty">
      <view class="lv-empty__orb love-icon love-i-sparkle" />
      <text class="lv-empty__text">还没有记下特别的日子，点右下角加一个</text>
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
        <text class="lv-sheet__title">加一个纪念日</text>

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

        <view class="ann__field ann__field--stack">
          <text class="ann__field-label">重复</text>
          <view class="ann__chips">
            <view
              class="ann__chip"
              :class="{ 'ann__chip--on': form.repeat === 'yearly' }"
              @click="form.repeat = 'yearly'">每年</view>
            <view
              class="ann__chip"
              :class="{ 'ann__chip--on': form.repeat === 'once' }"
              @click="form.repeat = 'once'">仅一次</view>
          </view>
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

        <wd-button block round :custom-style="LOVE_PRIMARY_BTN" @click="onSave">
          记下来
        </wd-button>
      </view>
    </wd-popup>
  </view>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { useThemeVars } from '@/composables/useThemeVars'
import { useLoveStore } from '@/stores/love'
import { ANNIVERSARY_ICONS, LOVE_PRIMARY_BTN, todayStr } from '@/constants/love'
import { toast } from '@/utils'

const themeVars = useThemeVars()
const love = useLoveStore()

const list = computed(() => love.upcoming)
const next = computed(() => love.upcoming[0])

const addVisible = ref(false)
const form = reactive({
  title: '',
  date: todayStr(),
  repeat: 'yearly' as 'yearly' | 'once',
  icon: 'heart'
})

const onPopupUpdate = (v: boolean) => {
  addVisible.value = v
}
const onDateChange = (e: { detail: { value: string } }) => {
  form.date = e.detail.value
}
const onSave = () => {
  if (!form.title.trim()) {
    toast('先给它起个名字吧')
    return
  }
  love.addAnniversary({
    title: form.title.trim(),
    date: form.date,
    repeat: form.repeat,
    icon: form.icon
  })
  form.title = ''
  addVisible.value = false
  toast('记下了，到时候一起过')
}
const onRemove = (id: string) => {
  love.removeAnniversary(id)
  toast('已删除')
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
  padding: 40rpx 40rpx 44rpx;
}

.ann__hero-main {
  display: flex;
  align-items: center;
  margin-top: 30rpx;
}

.ann__hero-icon {
  background-image: linear-gradient(140deg, rgba(255, 255, 255, 0.42), rgba(255, 255, 255, 0.2));
  box-shadow: inset 0 1rpx 0 rgba(255, 255, 255, 0.4);
  margin-right: 20rpx;
  color: #fff;
}

.ann__hero-title {
  flex: 1 1 0;
  min-width: 0;
  font-size: 38rpx;
  font-weight: 600;
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
  font-size: 23rpx;
  letter-spacing: 2rpx;
  opacity: 0.9;
  margin-top: 18rpx;
}

.ann__hint {
  display: block;
  font-size: 21rpx;
  color: var(--love-ink-3);
  margin: -8rpx 6rpx 22rpx;
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
  padding: 26rpx 26rpx 26rpx 32rpx;
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

.ann__title {
  display: block;
  font-size: 28rpx;
  font-weight: 600;
  color: var(--love-ink);
}

.ann__date {
  display: block;
  font-size: 21rpx;
  color: var(--love-ink-3);
  margin-top: 8rpx;
  letter-spacing: 1rpx;
}

.ann__tag {
  display: inline-flex;
  margin-top: 12rpx;
  padding: 4rpx 14rpx;
  border-radius: 999rpx;
  background-color: var(--love-soft);
  font-size: 19rpx;
  color: #d2598c;
}

.ann__right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
  margin-left: 12rpx;
}

.ann__days {
  font-size: 44rpx;
  font-weight: 300;
  line-height: 1;
  color: #e0518c;
}

.ann__unit {
  font-size: 19rpx;
  color: var(--love-ink-3);
  margin-top: 6rpx;
}

.ann__remove {
  font-size: 20rpx;
  color: var(--love-ink-3);
  margin-top: 14rpx;
  padding: 4rpx 12rpx;
  border-radius: 999rpx;
  background-color: var(--love-bg);
}

/* ---------------- 底部弹层 ---------------- */
.ann__field {
  display: flex;
  align-items: center;
  min-height: 96rpx;
  border-bottom: 1rpx solid var(--love-line);
}

.ann__field--stack {
  flex-direction: column;
  align-items: flex-start;
  padding: 24rpx 0 12rpx;
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

.ann__chips {
  display: flex;
  gap: 16rpx;
}

.ann__chip {
  padding: 14rpx 40rpx;
  border-radius: 999rpx;
  font-size: 24rpx;
  background-color: var(--love-bg);
  color: var(--love-ink-2);
  border: 1rpx solid var(--love-line);
}

.ann__chip--on {
  color: #fff;
  border-color: transparent;
  background-image: linear-gradient(100deg, #ff92b4, #ee5a92);
  box-shadow: 0 8rpx 18rpx rgba(226, 92, 148, 0.22);
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
  font-size: 34rpx;
  border: 2rpx solid transparent;
  border-radius: 22rpx;
  background-color: var(--love-bg);
  color: #e0518c;
}

.ann__emoji--on {
  background-color: var(--love-soft);
  border-color: #f4a2c1;
  box-shadow: 0 4rpx 12rpx rgba(226, 92, 148, 0.12);
}
</style>
