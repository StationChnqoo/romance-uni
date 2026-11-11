<!--
  保皇记牌器 - 单个玩家卡片
  由 cn.xiaopacai.duole/src/screens/Baohuang/components/Person.tsx 迁移。

  一张卡片就是一位玩家的全部牌面：
    名字 / 未出牌面 / 进贡 / 吃贡 / 出牌记录 / 剩余张数。
  点击卡片任意位置 = 把录入位切到「出牌记录」（槽位 2）；
  点进贡、吃贡的**标签框**则切到槽位 0 / 1（值框只展示，原 RN 里也没接点击）。
-->
<template>
  <view
    class="person"
    :style="{backgroundColor: active ? hexToRgba(theme, 0.08) : '#fff'}"
    @click="onPress(2)">
    <text class="person__name">{{ player.name }}</text>
    <text class="person__ranks">{{ remainingRanks }}</text>

    <view class="person__row">
      <view
        class="person__slot"
        :style="{borderColor: borderColor(0)}"
        @click.stop="onPress(0)">
        <text class="person__slot-text person__slot-text--give">进贡：</text>
      </view>
      <view class="person__slot" :style="{borderColor: borderColor(0)}">
        <text class="person__slot-text person__slot-text--give">{{ player.cards[0] || '--' }}</text>
      </view>
    </view>

    <view class="person__row">
      <view
        class="person__slot"
        :style="{borderColor: borderColor(1)}"
        @click.stop="onPress(1)">
        <text class="person__slot-text person__slot-text--take">吃贡：</text>
      </view>
      <view class="person__slot" :style="{borderColor: borderColor(1)}">
        <text class="person__slot-text person__slot-text--take">{{ player.cards[1] || '--' }}</text>
      </view>
    </view>

    <view class="person__played" :style="{borderColor: borderColor(2)}">
      <text class="person__played-text">{{ player.cards[2] || '暂无出牌记录 ~' }}</text>
    </view>

    <text class="person__count" :style="{color: theme}">{{ remainingCount }}张</text>
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { PropType } from 'vue'
import type { BaohuangPlayer } from '../../types'
import { calcRemainingRanks, hexToRgba, parseCard3Groups } from '../../utils'
import { THEME_COLOR } from '@/stores/user'

const props = defineProps({
  player: { type: Object as PropType<BaohuangPlayer>, required: true },
  /** 当前正在录入的玩家 id，用来高亮整卡与对应的录入框 */
  currentPlayerIndex: { type: Number, default: 0 },
  /** 总牌数：潍坊保皇 40 / 疯狂保皇 30 */
  sum: { type: Number, default: 40 },
  theme: { type: String, default: THEME_COLOR }
})

const emit = defineEmits(['press'])

/** 是不是当前正在录入的那家 */
const active = computed(() => props.player.id === props.currentPlayerIndex)

/** 还没出过的牌面 */
const remainingRanks = computed(() => calcRemainingRanks(props.player.cards[2]))

/**
 * 剩余张数 = 总数 - 进贡 + 吃贡 - 已出
 * （进贡是给出去的，吃贡是收回来的，出牌记录要按真实张数展开，故先过 parseCard3Groups）
 */
const remainingCount = computed(() => {
  const cards = props.player.cards
  return (
    props.sum -
    cards[0].length +
    cards[1].length -
    parseCard3Groups(cards[2]).length
  )
})

/** 高亮框：当前玩家 + 当前录入位才用主题色，其余灰边 */
const borderColor = (index: number) => {
  return props.player.id === props.currentPlayerIndex &&
    props.player.currentCardIndex === index
    ? props.theme
    : '#ccc'
}

const onPress = (index: number) => {
  emit('press', props.player, index)
}
</script>

<style lang="scss" scoped>
/*
  卡片高度由内容撑开（不再靠父级 flex:1 分高）。
  ★ 宽度不在这里决定：本组件外层被页面包了一层 .baohuang__cell（display:flex; flex-direction:column），
    <person> 节点是它的交叉轴子项 → 被 align-items: stretch 拉满，这里只负责 100% 填满。
    （自定义组件节点才是行里的 flex item，写在 .person 上的 flex / 宽度都够不着那一层。）
  ⚠️ 别给外层 row / table 加 flex:1 —— 会把卡片拉伸成「每行等分剩余高度」，
     iOS / Android / 小程序 量到的视口不一样，卡片就会一大一小、中间空一大截。
*/
.person {
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-width: 0;
  padding: 20rpx;
  background-color: #fff;
  border: 2rpx solid #ddd;
  border-radius: 20rpx;

  &__name {
    font-size: 32rpx;
    color: #333;
  }

  &__ranks {
    margin-top: 8rpx;
    font-size: 28rpx;
    color: #666;
  }

  &__row {
    display: flex;
    flex-direction: row;
    margin-top: 8rpx;
  }

  &__slot {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48rpx;
    padding: 0 8rpx;
    border: 2rpx solid #333;
    border-radius: 10rpx;
  }

  &__slot + &__slot {
    margin-left: 10rpx;
  }

  &__slot-text {
    font-size: 24rpx;

    &--give {
      color: green;
    }

    &--take {
      color: red;
    }
  }

  /* 出牌记录：固定高（原 RN fs(16)*4），最多三行，超了裁掉 */
  &__played {
    box-sizing: border-box;
    height: 128rpx;
    margin-top: 20rpx;
    padding: 6rpx 8rpx;
    overflow: hidden;
    border: 2rpx solid #999;
    border-radius: 10rpx;
  }

  &__played-text {
    display: -webkit-box;
    overflow: hidden;
    font-size: 28rpx;
    color: #666;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  &__count {
    position: absolute;
    top: 24rpx;
    right: 24rpx;
    font-size: 32rpx;
  }
}
</style>
