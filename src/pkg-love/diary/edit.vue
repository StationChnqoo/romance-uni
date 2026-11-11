<!--
  情侣空间 · 写日记（新增 / 编辑同一页）。
  图片走 uni.chooseImage + uni.saveFile：App 端存成永久本地路径，
  不支持 saveFile 的端退回临时路径（本次会话内可见）——纯本地方案的既定边界。
-->
<template>
  <view :style="themeVars" class="edit lv-page">
    <view class="edit__head">
      <text class="edit__eyebrow">A LITTLE NOTE FOR US</text>
      <text class="edit__title">{{ form.id ? '改一改这篇日记' : '写下今天的一点点' }}</text>
      <text class="edit__sub">以后回头翻，都是我们 ♡</text>
    </view>

    <view class="edit__card lv-card">
      <view class="edit__date-row">
        <view class="edit__date-icon">🗓</view>
        <text class="edit__label">哪一天</text>
        <picker mode="date" :value="form.date" @change="onDateChange">
          <view class="edit__value">{{ form.date }} ›</view>
        </picker>
      </view>

      <view class="edit__moods">
        <text class="edit__label">今天的心情</text>
        <view class="edit__mood-list">
          <view
            v-for="m in MOODS"
            :key="m.key"
            class="edit__mood"
            :class="{ 'edit__mood--on': form.mood === m.key }"
            @click="form.mood = m.key">
            <text class="edit__mood-emoji">{{ m.emoji }}</text>
            <text class="edit__mood-label">{{ m.label }}</text>
          </view>
        </view>
      </view>

      <view class="edit__paper">
        <text class="edit__paper-deco">“</text>
        <textarea
          v-model="form.content"
          class="edit__textarea"
          :maxlength="1000"
          placeholder="今天发生了什么？写一句也好…"
          placeholder-class="edit__placeholder" />
      </view>

      <view class="edit__images">
        <view v-for="(src, index) in form.images" :key="src" class="edit__image-wrap">
          <image class="edit__image" :src="src" mode="aspectFill" @click="onRemoveImage(index)" />
          <text class="edit__image-x" @click="onRemoveImage(index)">×</text>
        </view>
        <view v-if="form.images.length < 3" class="edit__image-add" @click="onChooseImage">
          <text class="edit__image-plus">＋</text>
          <text class="edit__image-tip">加张照片</text>
        </view>
      </view>
    </view>

    <view class="edit__footer">
      <wd-button
        v-if="form.id"
        block
        round
        :custom-style="'flex: 1; min-width: 0; ' + LOVE_GHOST_BTN"
        @click="onRemove">
        删除
      </wd-button>
      <wd-button
        block
        round
        :custom-style="'flex: 1; min-width: 0; ' + LOVE_PRIMARY_BTN"
        @click="onSave">
        保存
      </wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import dayjs from 'dayjs'
import { useThemeVars } from '@/composables/useThemeVars'
import { useLoveStore } from '@/stores/love'
import { LOVE_GHOST_BTN, LOVE_PRIMARY_BTN, MOODS, todayStr } from '@/constants/love'
import { Router } from '@/common/router'
import { toast } from '@/utils'
import type { LoveDiary } from '@/types/love'

const themeVars = useThemeVars()
const love = useLoveStore()

const form = reactive<LoveDiary>({
  id: '',
  date: todayStr(),
  content: '',
  mood: 'sweet',
  images: [],
  createAt: ''
})

onLoad(options => {
  const id = options?.id || ''
  if (!id) return
  const found = love.sortedDiaries.find(d => d.id === id)
  if (found) {
    Object.assign(form, { ...found, images: [...found.images] })
  }
})

const onDateChange = (e: { detail: { value: string } }) => {
  form.date = e.detail.value
}

const onChooseImage = () => {
  uni.chooseImage({
    count: 3,
    success: res => {
      const temps = res.tempFilePaths as string[]
      Promise.all(
        temps.map(
          path =>
            new Promise<string>(resolve => {
              uni.saveFile({
                tempFilePath: path,
                success: r => resolve(r.savedFilePath),
                fail: () => resolve(path)
              })
            })
        )
      ).then(paths => {
        form.images = [...form.images, ...paths].slice(0, 3)
      })
    }
  })
}

const onRemoveImage = (index: number) => {
  form.images.splice(index, 1)
}

const onSave = () => {
  if (!form.content.trim()) {
    toast('至少写一句吧')
    return
  }
  love.saveDiary({ ...form, content: form.content.trim(), createAt: dayjs().format('YYYY-MM-DD HH:mm:ss') })
  toast('记下来了')
  Router.back()
}

const onRemove = () => {
  love.removeDiary(form.id)
  toast('已删除')
  Router.back()
}
</script>

<style lang="scss" scoped>
.edit {
  min-height: 100vh;
  padding: 44rpx 30rpx 60rpx;
  box-sizing: border-box;
}

/* ---------------- 页头 ---------------- */
.edit__head {
  padding: 0 8rpx 34rpx;
}

.edit__eyebrow {
  display: block;
  font-size: 20rpx;
  letter-spacing: 3rpx;
  color: #d07ca0;
}

.edit__title {
  display: block;
  font-size: 40rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
  color: var(--love-ink);
  margin-top: 14rpx;
}

.edit__sub {
  display: block;
  font-size: 23rpx;
  color: var(--love-ink-3);
  margin-top: 10rpx;
}

/* ---------------- 信纸卡 ---------------- */
.edit__card {
  padding: 12rpx 30rpx 30rpx;
}

.edit__date-row {
  display: flex;
  align-items: center;
  min-height: 100rpx;
  border-bottom: 1rpx solid var(--love-line);
}

.edit__date-icon {
  width: 56rpx;
  height: 56rpx;
  border-radius: 18rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(140deg, #fff2f7, #ffe0ec);
  font-size: 28rpx;
  margin-right: 18rpx;
  flex-shrink: 0;
}

.edit__label {
  font-size: 26rpx;
  color: var(--love-ink-2);
  flex-shrink: 0;
}

.edit__value {
  flex: 1 1 0;
  min-width: 0;
  text-align: right;
  font-size: 26rpx;
  color: var(--love-ink);
  letter-spacing: 1rpx;
}

.edit__date-row picker {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  justify-content: flex-end;
}

/* ---------------- 心情 ---------------- */
.edit__moods {
  padding: 28rpx 0 6rpx;
}

.edit__mood-list {
  display: flex;
  flex-wrap: wrap;
  gap: 14rpx;
  margin-top: 20rpx;
}

.edit__mood {
  display: flex;
  align-items: center;
  padding: 12rpx 20rpx;
  border: 2rpx solid var(--love-line);
  border-radius: 999rpx;
  background-color: #fff;
}

.edit__mood--on {
  border-color: #f4a2c1;
  background-image: linear-gradient(120deg, #fff4f8, #ffe4ee);
  box-shadow: 0 6rpx 16rpx rgba(226, 92, 148, 0.14);
}

.edit__mood-emoji {
  font-size: 30rpx;
  margin-right: 10rpx;
}

.edit__mood-label {
  font-size: 23rpx;
  color: var(--love-ink-2);
}

/* ---------------- 正文区 ---------------- */
.edit__paper {
  position: relative;
  margin-top: 30rpx;
  border-radius: 24rpx;
  background-image: linear-gradient(140deg, #fff7fa, #fff0f6);
  border-left: 4rpx solid #f7bcd2;
  overflow: hidden;
}

.edit__paper-deco {
  position: absolute;
  right: 18rpx;
  top: -34rpx;
  font-size: 130rpx;
  line-height: 1;
  color: rgba(238, 90, 146, 0.1);
}

.edit__textarea {
  position: relative;
  width: 100%;
  min-height: 280rpx;
  padding: 26rpx;
  font-size: 28rpx;
  color: var(--love-ink);
  line-height: 1.8;
  box-sizing: border-box;
}

.edit__placeholder {
  color: var(--love-ink-3);
}

/* ---------------- 图片 ---------------- */
.edit__images {
  display: flex;
  flex-wrap: wrap;
  gap: 14rpx;
  margin-top: 24rpx;
}

.edit__image-wrap {
  position: relative;
}

.edit__image,
.edit__image-add {
  width: 164rpx;
  height: 164rpx;
  border-radius: 22rpx;
  background-color: var(--love-soft);
}

.edit__image {
  box-shadow: 0 6rpx 16rpx rgba(226, 100, 148, 0.12);
}

.edit__image-x {
  position: absolute;
  right: -8rpx;
  top: -8rpx;
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(61, 43, 51, 0.6);
  color: #fff;
  font-size: 26rpx;
  line-height: 1;
}

.edit__image-add {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2rpx dashed #f0b6ce;
  background-color: var(--love-bg);
  box-sizing: border-box;
}

.edit__image-plus {
  font-size: 48rpx;
  color: #e59ab9;
  line-height: 1;
}

.edit__image-tip {
  font-size: 20rpx;
  color: var(--love-ink-3);
  margin-top: 10rpx;
}

/* ---------------- 底部 ---------------- */
.edit__footer {
  display: flex;
  gap: 20rpx;
  margin-top: 40rpx;
}
</style>
