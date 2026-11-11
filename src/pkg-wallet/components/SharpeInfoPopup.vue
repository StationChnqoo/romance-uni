<template>
  <!--
    夏普比率说明弹层：点四宫格「夏普比率」那一格或右上角的问号打开。
    - wd-popup 用 :model-value 接 props.show（与 ImportModal / InputDialog 同款），
      点遮罩时由 @update:model-value 通知父级收起。
    - root-portal 传送到文档根：弹层脱离 z-paging 子树，避免被滚动容器 / 悬浮层改掉包含块。
    - 弹窗按钮主题色走 :custom-style 内联（wot 变量跨不过小程序 isolated 样式隔离）。
  -->
  <wd-popup
    :model-value="props.show"
    position="center"
    :z-index="200"
    :close-on-click-modal="true"
    root-portal
    @update:model-value="onModelUpdate"
  >
    <view class="sharpe-info">
      <text class="sharpe-info__title">夏普比率 Sharpe Ratio</text>

      <scroll-view scroll-y class="sharpe-info__scroll">
        <view class="sharpe-info__section">
          <text class="sharpe-info__label">它衡量什么</text>
          <text class="sharpe-info__text">每承担一单位风险，能多赚多少「超额收益」。数值越高说明风险调整后的收益越好；一般大于 1 算不错，小于 0 表示连无风险收益都没跑赢。</text>
        </view>

        <view class="sharpe-info__section">
          <text class="sharpe-info__label">怎么算</text>
          <text class="sharpe-info__text">夏普 = （平均收益 − 无风险利率）÷ 收益波动率。本页用周收益：记了「本周圈外进出」明细的周（F 为逐笔自动合计），r =（本周末总资产 − 上周末总资产 − F）÷ 上周末总资产，把工资、消费、圈外转账从收益里扣掉；没记录的老周不进这条序列。减去 rf/52 后取均值、除以样本标准差，再乘 √52 年化。数值下方的「上证 x.xx」是同期上证指数按同一算法算出的基准。</text>
        </view>

        <view class="sharpe-info__section">
          <text class="sharpe-info__label">当前口径：{{ props.cleanMode ? '净值口径（TWR）' : '近似口径（含出入金）' }}</text>
          <text class="sharpe-info__text">{{ modeText }}</text>
          <view v-if="props.coveredWeeks > 0" class="sharpe-info__split">
            <view class="sharpe-info__split-row">
              <text class="sharpe-info__split-label">累计净投入</text>
              <text class="sharpe-info__split-value">{{ props.inflowText }}</text>
            </view>
            <view class="sharpe-info__split-row">
              <text class="sharpe-info__split-label">累计投资收益</text>
              <text class="sharpe-info__split-value">{{ props.profitText }}</text>
            </view>
            <text class="sharpe-info__split-note">只统计已记录净流入的 {{ props.coveredWeeks }} 周，不含早期未记录的历史；钱是存出来的还是赚出来的，看这两个数。</text>
          </view>
        </view>

        <view class="sharpe-info__section">
          <text class="sharpe-info__label">本页口径</text>
          <text class="sharpe-info__text">无风险利率取 0（项目没有利率数据源，不编一个国债收益率）；有效周不足 10 期、或周收益完全没有波动时显示「—」，避免短样本算出失真的大数。</text>
        </view>

        <view class="sharpe-info__section">
          <text class="sharpe-info__label">请注意局限</text>
          <text class="sharpe-info__text">净值口径已剔除出入金，但把本周现金流当作期末一次性发生（严格 Modified Dietz 还需要每笔发生时点）；现金、公积金等低波动科目仍会压小分母，数字容易偏高。近似口径下工资、消费更是全被算成收益。所以这里只是参考，不是严格意义的投资业绩。</text>
        </view>
      </scroll-view>

      <wd-button block :round="false" :custom-style="buttonStyle" @click="emit('close')">
        知道了
      </wd-button>
    </view>
  </wd-popup>
</template>

<script lang="ts" setup>
/**
 * 夏普比率说明（口径与免责说明从「四宫格下方一行灰字」搬进这里）
 * 只被钱包列表用，按分包约定放在 pkg-wallet/components/。
 * 数值与算法都在 WalletList.vue 里：这里展示当前生效的口径，并把覆盖周的
 * 「本金净投入 / 投资收益」拆解出来 —— 让用户看清钱是存出来的还是赚出来的。
 */
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

const props = defineProps<{
  show: boolean
  /** true = 已记录圈外进出的周够 10 期，走 TWR 净值口径；false = 退回总资产环比近似口径 */
  cleanMode: boolean
  /** 覆盖周数（填了净流入、且相邻两期总资产有效的周） */
  coveredWeeks: number
  /** 覆盖周累计净投入（k → 万元文本，带符号） */
  inflowText: string
  /** 覆盖周累计投资收益（k → 万元文本，带符号） */
  profitText: string
}>()
const emit = defineEmits<{ (e: 'close'): void }>()

/** 口径切换是自动的：这里把「为什么现在是这个数」讲清楚，并给出补齐路径 */
const modeText = computed(() =>
  props.cleanMode
    ? `已按「本周圈外进出」明细剔除出入金，覆盖 ${props.coveredWeeks} 周。`
    : '已记录圈外进出的周不足 10 期，夏普暂时仍按「总资产环比」计算，工资入账、消费都会被当成收益。继续每周记录圈外进出，攒够 10 周后自动切到净值口径。'
)

const userStore = useUserStore()
/** 弹层内 wot 的 --wot-color-theme 取不到，按钮底色必须内联 */
const buttonStyle = computed(
  () => `background-color: ${userStore.theme}; border-color: ${userStore.theme}; color: #fff;`
)

/** 点遮罩关闭时 wd-popup 把 modelValue 置 false，这里同步回父级 */
const onModelUpdate = (val: boolean) => {
  if (!val) emit('close')
}
</script>

<style lang="scss" scoped>
.sharpe-info {
  box-sizing: border-box;
  width: 620rpx;
  padding: 36rpx 36rpx 32rpx;
  border-radius: 28rpx;
  background-color: #fff;
  display: flex;
  flex-direction: column;

  &__title {
    /* <text> 是行内元素，display:block 才能按容器宽度排布；居中设在外层 view 上 */
    display: block;
    font-size: 30rpx;
    font-weight: 600;
    color: #1f2d3d;
    text-align: center;
  }

  &__scroll {
    max-height: 620rpx;
    margin-top: 24rpx;
  }

  &__section {
    display: flex;
    flex-direction: column;

    & + & {
      margin-top: 24rpx;
    }
  }

  &__label {
    display: block;
    font-size: 26rpx;
    font-weight: 600;
    color: #333;
  }

  &__text {
    display: block;
    margin-top: 8rpx;
    font-size: 24rpx;
    line-height: 1.6;
    color: #666;
  }

  /* 本金 vs 收益拆解：浅底块，两行左右两端对齐 */
  &__split {
    margin-top: 16rpx;
    padding: 16rpx 20rpx;
    border-radius: 12rpx;
    background-color: #f7f8fa;
  }
  &__split-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & + & {
      margin-top: 8rpx;
    }
  }
  &__split-label {
    font-size: 24rpx;
    color: #666;
  }
  &__split-value {
    font-size: 24rpx;
    font-weight: 600;
    color: #333;
  }
  &__split-note {
    /* <text> 是行内元素，display:block 才能按容器宽度换行 */
    display: block;
    margin-top: 12rpx;
    font-size: 22rpx;
    line-height: 1.5;
    color: #999;
  }
}
</style>
