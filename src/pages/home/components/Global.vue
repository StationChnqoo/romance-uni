<template>
  <view class="global">
    <view v-if="!datas.length" class="global__loading">
      <wd-loading :color="theme" />
    </view>
    <template v-else>
      <!-- 这里是**横向**滚动（scroll-x），z-paging 只做纵向分页列表，
           没有横向模式，所以这是全项目唯一保留的 scroll-view。 -->
      <scroll-view class="global__scroll" scroll-x>
        <view class="global__list">
          <view v-for="item in datas" :key="item.id" class="global__item">
            <text class="global__name">{{ item.name }}</text>
            <view class="global__gap-xs" />
            <view class="global__price-row">
              <text class="global__price">{{ priceTextOf(item) }}</text>
              <text class="global__sep">|</text>
              <text class="global__change" :style="{ color: directionOf(item).color }">{{
                changeTextOf(item)
              }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
      <!-- 右缘渐隐：暗示「还能左滑」。纯装饰，必须 pointer-events:none，否则会挡住这一段的手势 -->
      <view class="global__fade" />
    </template>
  </view>
</template>

<script lang="ts" setup>
/**
 * 外围股市涨跌（自选全球指数）
 * 由 cloud-react-native/src/screens/Financing/components/Global.tsx 迁移。
 *
 * - **项间距**：RN 是 `ScrollView style={{gap: 12}}`，迁移时漏了 —— 这会让相邻两项贴在一起。
 *   现在 `.global__list` 给 24rpx 左边距、`.global__item` 给 24rpx 右间距。
 * - 名称在上、价格与涨跌幅一行在下（与自选指数页的行结构一致，横向看板同理）。
 *
 * ★ 数据源：2026-10 起改为 **MSN 财经（微软）**。
 *   原实现是东方财富的两套接口：行情走 `/api/qt/ulist/get`（字段 f2/f3/f12/f13/f14/f152），
 *   走势图走 `webquotepic.eastmoney.com/GetPic.aspx` 位图（固定 122×68）。
 *   换 MSN 后**走势图一并去掉**：`QuoteSummary` 的 `Quotes` 与 `Charts` 两个 intent
 *   不能同时传（一起传直接 400），要图得单独再发一次请求，首页不值得为它多花一次往返。
 *   所以现在每张卡片只留：名称 + 价格 + 涨跌幅。
 */
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { renderUpOrDown } from '@/utils'
import type { GlobalIndexQuote } from '@/types/stock'

const props = defineProps<{
  datas: GlobalIndexQuote[]
}>()

const userStore = useUserStore()
const theme = computed(() => userStore.theme)

/** 接口没回来时 price 是 0，显示占位而不是 0.00 */
const priceTextOf = (item: GlobalIndexQuote) =>
  typeof item.price === 'number' && item.price > 0 ? item.price.toFixed(2) : '--'

/** changePercent 已是百分数（与 MsnCard 同一口径），不要再 /100 */
const changeTextOf = (item: GlobalIndexQuote) => {
  const { operator } = renderUpOrDown(item.changePercent)
  return `${operator}${Math.abs(item.changePercent).toFixed(2)}%`
}

const directionOf = (item: GlobalIndexQuote) => renderUpOrDown(item.changePercent)
</script>

<style lang="scss" scoped>
.global {
  position: relative;
  background-color: #fff;
  /* 与轮播/卡片一致：外层白底到屏幕边，内部左右各 30rpx 内边距（不再用 24rpx 写死在列表里）；
     下方 2rpx 灰缝与相邻白块分隔同款。box-sizing 显式 border-box，padding 才不会溢出失效。 */
  box-sizing: border-box;
  padding: 0 30rpx;
  margin-bottom: 2rpx;

  &__loading {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 40rpx 0;
  }
  &__scroll {
    width: 100%;
    white-space: nowrap;
  }
  &__list {
    display: inline-flex;
    flex-direction: row;
    /* 左侧 30rpx 改由外层 .global 的 padding 统一提供，这里不再写死 24rpx */
    padding-left: 0;
  }
  &__item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 16rpx 24rpx 16rpx 0;
  }
  &__gap-xs {
    height: 8rpx;
  }
  &__name {
    color: #333;
    font-size: 28rpx;
    font-weight: 500;
    white-space: nowrap;
  }
  /**
   * 「价格 | 涨跌幅」三段共用一条基线。
   * 注意 &__sep 必须显式给字号：不给会继承页面默认的 16px，
   * 比左右两侧 12px 的数字大一圈，竖线上下都会戳出数字之外（RN 原版是 14px）。
   *
   * ★ 竖线左右的间距**不能靠文本里的空格**：`<text> | </text>` 的首尾空白会被各端
   *   （小程序 / H5 / App webview）统一 trim 掉，空格根本不渲染 —— 看到的紧贴就是这个原因。
   *   用 text 节点的 `space` 属性也只有小程序那几种，改用 CSS margin 精确控制、跨端一致。
   */
  &__price-row {
    display: flex;
    flex-direction: row;
    align-items: baseline;
  }
  &__price {
    color: #666;
    font-size: 24rpx;
  }
  &__sep {
    margin: 0 8rpx;
    color: #999;
    font-size: 24rpx;
  }
  &__change {
    font-size: 24rpx;
  }
  /** 右缘渐隐，提示列表还能左滑；不能挡住手势，所以 pointer-events: none */
  &__fade {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 48rpx;
    background-image: linear-gradient(90deg, rgba(255, 255, 255, 0), #fff);
    pointer-events: none;
  }
}
</style>
