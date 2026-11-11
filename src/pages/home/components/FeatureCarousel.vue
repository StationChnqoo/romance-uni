<template>
  <view class="feature" v-if="vmList.length">
    <wd-swiper
      class="feature__swiper"
      :list="swiperList"
      :autoplay="true"
      :loop="true"
      :interval="3000"
      height="280rpx"
      @click="onSwiperClick">
      <template #default="{ index }">
        <view class="feature__slide" @click="onPress(slideAt(index).item)">
          <image
            class="feature__img"
            :src="slideAt(index).url"
            mode="aspectFill" />
          <!-- 底部渐隐蒙层：保证白字在任意图上都可读（与截图同款） -->
          <view class="feature__mask" />
          <view class="feature__info">
            <!-- 标题只给一行：小程序端靠 number-of-lines，H5/App 端靠下面 .feature__title
                 的 -webkit-line-clamp。两处必须一致，改行数要一起改。 -->
            <text class="feature__title" :number-of-lines="1">{{ slideAt(index).title }}</text>
            <view class="feature__meta">
              <image
                v-if="slideAt(index).logoUrl"
                class="feature__logo"
                :src="slideAt(index).logoUrl"
                mode="aspectFit" />
              <text class="feature__source">{{ slideAt(index).source }}</text>
              <text class="feature__sep">·</text>
              <text class="feature__time">{{ slideAt(index).time }}</text>
            </view>
          </view>
        </view>
      </template>
      <template #indicator="{ current, total }">
        <view class="feature__dots">
          <view
            v-for="i in total"
            :key="i"
            class="feature__dot"
            :style="{ backgroundColor: i - 1 === current ? '#fff' : 'rgba(255,255,255,.45)' }" />
        </view>
      </template>
    </wd-swiper>
  </view>
</template>

<script lang="ts" setup>
/**
 * 头条轮播（MSN 7x24 财经流卡片，大图自动轮播）
 *
 * 数据源：api/third/msn.ts 的 selectMsnFinanceNews，走 assets.msn.cn 的 /service/MSN/Feed/me，
 * query=finance_trending，运行时请求、无需 token，列表在返回体的 subCards。
 * 本组件把其中带封面图的卡片抽出来做大图轮播，最多 10 张。下方首页的新闻列表走的是另一个 query，
 * 即 selectMsnHomeNews 的 query=news，与这里不同源。本组件自身不写死、不发请求，
 * 数据由 home/index.vue 的 loadAll 实时拉取后传入。
 *
 * 注意：MSN 首页 SSR 注入的 window.ssrWpoData 是 WPO 实验分流数据（AB 测试 flights），
 * 并非卡片 feed；卡片来自上面的 Feed 服务。
 *
 * - 每张幻灯片：大图（aspectFill 铺满）+ 底部黑色半透明渐隐蒙层 + 标题（1 行省略）+ 来源/时间。
 * - 字段在 vmList 里展平成确定值，避免严格索引检查下 images[0] 报 possibly-undefined。
 * - 指示点自绘（白色系，落在图片右下角）。
 * - 点击走 openNews（与 News 列表共用），跳原文链接。
 * - 外层 .feature 白底到屏幕边（左右全白），内部左右各 30rpx 内边距，与主页卡片内容对齐；
 *   不用 margin 以免两侧露出 z-paging 的灰底；保留 wd-swiper 默认圆角。
 */
import { computed } from 'vue'
import { relativeTime } from '@/utils'
import type { MsnNewsItem } from '@/types/stock'

interface FeatureVM {
  item: MsnNewsItem;
  title: string;
  url: string;
  logoUrl: string;
  source: string;
  time: string;
}

const props = defineProps<{
  datas: MsnNewsItem[]
}>()

const emit = defineEmits<{
  (e: 'press', item: MsnNewsItem): void
}>()

/** 只取带封面图的卡片，最多 10 张进轮播；可选字段在这里展平成确定值 */
const vmList = computed<FeatureVM[]>(() =>
  props.datas
    .filter(it => it.images && it.images[0] && it.images[0].url)
    .slice(0, 10)
    .map(it => ({
      item: it,
      title: it.title,
      url: it.images![0]!.url,
      logoUrl: it.provider?.logoUrl ?? '',
      source: it.provider?.name ?? 'MSN',
      time: relativeTime(it.publishedDateTime),
    })),
)

/** 严格索引检查下 vmList[index] 可能为 undefined，这里用 ! 收敛（index 始终合法） */
const slideAt = (index: number) => vmList.value[index]!

/**
 * 传给 wd-swiper 的列表。
 *
 * wot 把 list 声明成 string[]，这里传的是对象数组，所以在脚本层收敛成 any[]。
 * ★ 不写成模板里的 :list="vmList as any"：模板表达式由 @vue/compiler-dom 交给 babel 解析，
 *   TS 断言只有在显式开启 typescript 表达式插件时才成立（Volar / Vite 都开了，所以能跑），
 *   未开启该插件的解析器（部分编辑器的高亮引擎）会直接解析失败、从那一行起整片跑偏。
 *   类型收敛放脚本层，任何编辑器都不会读歪。
 */
const swiperList = computed<any[]>(() => vmList.value)

const onPress = (item: MsnNewsItem) => {
  if (item) emit('press', item)
}

/** wd-swiper 自带的 click 在自定义插槽下不触发，这里用内层 view 的 @click 兜底 */
const onSwiperClick = (payload: { index: number }) => {
  const vm = vmList.value[payload.index]
  if (vm) emit('press', vm.item)
}
</script>

<style lang="scss" scoped>
.feature {
  background-color: #fff;
  /* 外层白底到屏幕边（左右全白），内部左右各 30rpx 内边距，与主页卡片内容对齐；
     不用 margin 以免两侧露出 z-paging 的灰底(#f0f0f0)。
     下方 2rpx 灰缝与卡片分隔同款。wd-swiper 默认圆角保留，圆角处露出白底即白色。
     ★ box-sizing: border-box 必须显式写：项目没有全局 border-box（默认 content-box），
       一旦本块被 flex 拉伸或带显式宽度，content-box 的 padding 会溢出、内缩失效（就是「保不住」的根因）。 */
  box-sizing: border-box;
  padding: 0 30rpx;
  margin-bottom: 2rpx;

  &__swiper {
    width: 100%;
  }
  &__slide {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  &__img {
    width: 100%;
    height: 100%;
  }
  /* 底部渐隐：纯装饰，必须 pointer-events:none，否则会挡住点击跳详情 */
  &__mask {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 180rpx;
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.55));
    pointer-events: none;
  }
  &__info {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 20rpx 24rpx 24rpx;
  }
  &__title {
    color: #fff;
    font-size: 30rpx;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  &__meta {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 12rpx;
  }
  &__logo {
    flex: none;
    width: 28rpx;
    height: 28rpx;
    margin-right: 8rpx;
    border-radius: 4rpx;
  }
  &__source {
    flex: none;
    color: rgba(255, 255, 255, 0.9);
    font-size: 22rpx;
  }
  &__sep {
    margin: 0 8rpx;
    color: rgba(255, 255, 255, 0.6);
    font-size: 22rpx;
  }
  &__time {
    flex: none;
    color: rgba(255, 255, 255, 0.6);
    font-size: 22rpx;
  }
  /** 指示点：落在图片右下角，白色系（与截图同款） */
  &__dots {
    position: absolute;
    right: 24rpx;
    bottom: 20rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &__dot {
    width: 12rpx;
    height: 12rpx;
    margin-left: 10rpx;
    border-radius: 50%;
  }
}
</style>
