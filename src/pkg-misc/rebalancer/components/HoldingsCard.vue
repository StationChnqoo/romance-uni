<!--
  持仓输入卡：每个资产类别挂多个标的，市值单位 K
  数据与变更全走 store（useRebalanceCalc），本组件无 props

  ⚠️ v-for 项名必须多字母（cls / hold），禁用单字母（2026-10-16 踩坑）：
  uni-app mp 编译器会把「循环无关的 props 对象」提升到渲染作用域顶层，并用
  单字母键命名（a/b/c…）。循环项若叫 c，wxml 里 {{c}} 被循环项遮蔽，按钮的
  type/size/custom-style 全丢，wd-button 退化成原生按钮（纯黑 18px）。
  详见 wot-components.md「mp-weixin 编译坑」节。
-->
<template>
  <RbCard title="持仓输入" sub="每个类别可添加多个标的，市值单位 K">
    <view v-for="(cls, ci) in store.classes" :key="ci" class="rb-cls">
      <view class="rb-cls__head">
        <RbInput v-model="cls.name" bold placeholder="类别名称" placeholder-style="color:#bbb" />
        <view class="rb-cls__target">
          <text>目标</text>
          <RbInput
            v-model="cls.targetRaw"
            type="digit"
            align="center"
            width="pct"
            placeholder="0"
            placeholder-style="color:#ddd" />
          <text>%</text>
        </view>
      </view>
      <view v-for="(hold, hi) in cls.holdings" :key="hi" class="rb-hold">
        <RbInput v-model="hold.name" width="grow" placeholder="标的名称" placeholder-style="color:#bbb" />
        <RbInput
          v-model="hold.valueRaw"
          type="digit"
          align="right"
          width="val"
          placeholder="0"
          placeholder-style="color:#ddd" />
        <text class="rb-hold__unit">K</text>
        <view class="rb-hold__del" @click="delHolding(ci, hi)">
          <wd-icon name="close" size="14px" color="#ccc" />
        </view>
      </view>
      <view class="rb-cls__add">
        <!-- 文字按钮范式（wot-components.md）：type="text" 纯文字，不带 block——
             block = display:block 会拉成通栏，文字居中浮在空条里 -->
        <wd-button
          type="text"
          size="small"
          :custom-style="'color: ' + theme"
          @click="addHolding(ci)">
          ＋ 添加标的
        </wd-button>
      </view>
      <view class="rb-cls__foot">
        小计 <text class="rb-b">{{ money(classTotal(cls)) }}</text>
        <text class="rb-dot">·</text>
        当前权重 <text class="rb-b">{{ pct(classWeight(cls)) }}</text>
      </view>
    </view>
    <view class="rb-reset">
      <wd-button size="small" :custom-style="'color:#fff;border:none;'" @click="resetSkeleton">
        恢复全天候类别
      </wd-button>
    </view>
  </RbCard>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { money, pct, useRebalanceCalc } from '../useRebalanceCalc'
import RbCard from './RbCard.vue'
import RbInput from './RbInput.vue'

const userStore = useUserStore()
const theme = computed(() => userStore.theme)

const { store, classTotal, classWeight, addHolding, delHolding, resetSkeleton } =
  useRebalanceCalc()
</script>

<style lang="scss" scoped>
/* 类别输入块 */
.rb-cls {
  border: 1rpx solid #eee;
  border-radius: 12rpx;
  padding: 16rpx 20rpx;
  margin-bottom: 16rpx;
}
.rb-cls__head {
  display: flex;
  flex-direction: row;
  align-items: center;
  /* 标题左 + 目标块右：名称输入框是内容宽度（RbInput 默认档），space-between 才显出间隔 */
  justify-content: space-between;
  gap: 16rpx;
  margin-bottom: 6rpx;
}
.rb-cls__target {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8rpx;
  flex: none;
  font-size: 24rpx;
  color: #888;
}
.rb-hold {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10rpx;
  padding: 10rpx 0;
}
.rb-hold__unit {
  font-size: 22rpx;
  color: #999;
  flex: none;
}
.rb-hold__del {
  display: flex;
  align-items: center;
  justify-content: center;
  /* 盒子收紧到贴住 14px 图标（=28rpx + 2rpx 余量） */
  width: 32rpx;
  height: 32rpx;
  flex: none;
}
.rb-cls__add {
  margin-top: 2rpx;
  /* 添加按钮水平居中（wd-button 是 inline-block，flex+center 比 text-align 稳） */
  display: flex;
  justify-content: center;
}
.rb-cls__foot {
  font-size: 22rpx;
  color: #888;
  margin-top: 10rpx;
  padding-top: 10rpx;
  border-top: 1rpx dashed #eee;
}
.rb-reset {
  margin-top: 8rpx;
  text-align: right;
}

.rb-b {
  color: #333;
  font-weight: 500;
}
.rb-dot {
  margin: 0 8rpx;
  color: #bbb;
}
</style>
