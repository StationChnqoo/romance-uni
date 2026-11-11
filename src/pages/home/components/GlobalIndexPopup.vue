<!--
  自选指数弹窗（首页「自选指数」入口，2026-10-20 由独立页 pkg-market/choose-global 改造而来）

  用户原话：「自选指数 也改成弹窗 分成两部分 已选和未选 已选的加一个删除icon 未选的加一个加号icon」。

  - **零请求**：候选集是 constants/config 的 GlobalIndexes（固定 6 个），选中集合是
    marketStore.global（`fi-` 形式 MSN id，persist）。原页面为了显示行情要打一次 MSN
    QuoteSummary，弹窗里**不再显示价格/涨跌幅** —— 首页「外围股市」看板已经显示了，
    picker 里留着它只会多一次往返 + 一行噪声。
  - 两段用 computed 切：已选按 marketStore.global 的顺序（行首序号 = 看板里的顺序），
    未选按 GlobalIndexes 原顺序；已选全部取消时未选区自然回到 6 条。
  - 已选行右侧 `delete`（红 #ff5252），未选行右侧 `add`（主题色），与编辑页附件删除图标同款。
  - wd-popup 必须挂**页面根**（fixed 会被 wd-floating-panel 的 transform 改包含块 → 跑偏 + 层级被困），
    由 home/index.vue 挂载；z-index 显式 200：默认 10 会被展开的面板（99）整个盖住。
  - 项目 Vue 3.2.47：没有 defineModel，v-model 用 props + emit 手写桥接。
-->
<template>
  <wd-popup
    :model-value="modelValue"
    position="bottom"
    :safe-area-inset-bottom="true"
    :z-index="200"
    root-portal
    closable
    transition="slide-up"
    @update:model-value="onVisibleChange"
    @close="onVisibleChange(false)">
    <view class="gip">
      <view class="gip__head">
        <text class="gip__title">自选指数</text>
        <text class="gip__hint">已选 {{ selected.length }} / {{ allItems.length }}</text>
      </view>

      <!-- 已选：小药丸（定高 + flex 居中，不靠上下 padding 撑高），右侧删除图标 -->
      <view class="gip__section">
        <text class="gip__section-title">已选</text>
        <view class="gip__tags">
          <view
            v-for="item in selected"
            :key="item.value"
            class="gip__tag"
            :style="{ borderColor: theme }">
            <text class="gip__tag-name" :style="{ color: theme }">{{ item.name }}</text>
            <view class="gip__tag-icon" @click="onRemove(item.value)">
              <wd-icon name="delete" size="12px" color="#ff5252" />
            </view>
          </view>
          <text v-if="!selected.length" class="gip__empty-text">还没有自选指数</text>
        </view>
      </view>

      <!-- 未选：小药丸 + 加号 -->
      <view class="gip__section">
        <text class="gip__section-title">未选</text>
        <view class="gip__tags">
          <view v-for="item in unselected" :key="item.value" class="gip__tag gip__tag--off">
            <text class="gip__tag-name">{{ item.name }}</text>
            <view class="gip__tag-icon" @click="onAdd(item.value)">
              <wd-icon name="add" size="12px" :color="theme" />
            </view>
          </view>
          <text v-if="!unselected.length" class="gip__empty-text">已全部选取</text>
        </view>
      </view>
    </view>
  </wd-popup>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { GlobalIndexes } from '@/constants/config'
import { useMarketStore } from '@/stores/market'
import { useUserStore } from '@/stores/user'

/* Vue 3.2.47 没有 defineModel：v-model 手写桥接 */
defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])
const onVisibleChange = (value: boolean) => {
  emit('update:modelValue', value)
}

const marketStore = useMarketStore()
const userStore = useUserStore()
const theme = computed(() => userStore.theme)

/** 候选全集（固定 6 项，顺序即默认顺序） */
const allItems = GlobalIndexes

/** 已选：按市场 store 里的顺序取，序号就是首页看板的展示顺序 */
const selected = computed(() =>
  marketStore.global
    .map(value => allItems.find(item => item.value === value))
    .filter((item): item is (typeof allItems)[number] => Boolean(item)),
)

/** 未选：保持候选集原顺序 */
const unselected = computed(() =>
  allItems.filter(item => !marketStore.global.includes(item.value)),
)

/** store 更新一律整体赋值（项目约定，见 stores/market.ts 文件头） */
const onRemove = (value: string) => {
  marketStore.global = marketStore.global.filter(it => it !== value)
}

const onAdd = (value: string) => {
  if (marketStore.global.includes(value)) return
  marketStore.global = [...marketStore.global, value]
}
</script>

<style lang="scss" scoped>
.gip {
  padding: 30rpx 0 10rpx;

  &__head {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
    /* 右侧留出 wd-popup 自带关闭按钮（absolute top:10px right:10px 的 45° 加号）的位置，
       否则「已选 N / M」会被那个 X 压住 */
    padding: 0 80rpx 10rpx 30rpx;
  }
  &__title {
    color: #333;
    font-size: 32rpx;
    font-weight: 500;
  }
  &__hint {
    color: #999;
    font-size: 24rpx;
  }
  &__section {
    padding: 0 30rpx;
    /* 两段之间留白，但最后一段不留（底部有 popup 自己的 padding） */
    margin-bottom: 10rpx;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &__section-title {
    /* <text> 行内元素，行盒高度靠字体算 —— 显式 block 才能吃到上下 padding，
       与小药丸那条约定同源（不给块级化就别指望 padding 撑出间距） */
    display: block;
    padding: 6rpx 0 4rpx;
    color: #999;
    font-size: 24rpx;
  }
  /* 标签容器：换行排版。不用 gap（项目口径：间距一律 margin），
     靠父级 -16rpx 负边距把每行最后一个标签的右间距抵掉，左右才不会一边空一边贴 */
  &__tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    margin-right: -16rpx;
  }
  /**
   * 小药丸：**定高 + flex 居中**，不许用上下 padding 撑高 ——
   * <text> 是行内元素，block 容器的高度靠行盒算，padding 撑出来的高度在各端不一致。
   */
  &__tag {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 56rpx;
    padding: 0 16rpx;
    margin: 0 16rpx 16rpx 0;
    border: 1rpx solid transparent;
    border-radius: 10rpx;
    background-color: #fff;
  }
  /* 未选：灰底不描边；已选白底 + 主题色描边（描边色与文字色在模板里内联） */
  &__tag--off {
    border-color: transparent;
    background-color: #f5f5f5;
  }
  &__tag-name {
    color: #666;
    font-size: 26rpx;
    line-height: 1;
    white-space: nowrap;
  }
  /* 药丸内的图标：36rpx 见方点击区，左间距 8rpx（不做 48rpx，否则药丸会被撑高） */
  &__tag-icon {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 36rpx;
    height: 36rpx;
    margin-left: 8rpx;
  }
  &__empty-text {
    padding: 8rpx 0;
    color: #bbb;
    font-size: 26rpx;
  }
}
</style>
