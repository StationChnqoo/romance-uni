<template>
  <view :style="themeVars" class="edit-weights">
    <z-paging
      ref="pagingRef"
      v-model="list"
      class="edit-weights__paging"
      :fixed="false"
      :auto="true"
      :refresher-enabled="false"
      :loading-more-enabled="false"
      :show-scrollbar="false"
      hide-empty-view
      @query="queryList"
    >
      <view class="edit-weights__tips">
        <text class="edit-weights__tips-title">关于MsnId</text>
        <text class="edit-weights__tips-text">{{ tipsText }}</text>
      </view>

      <view
        v-for="(item, index) in items"
        :key="item.etfMsnId"
        class="edit-weights__row"
        :class="{ 'edit-weights__row--disabled': !item.enabled }"
      >
        <view class="edit-weights__top-row">
          <view class="edit-weights__left">
            <wd-switch
              v-model="item.enabled"
              size="20px"
              :active-color="theme"
              inactive-color="#eee"
            />
            <text
              class="edit-weights__label"
              :class="{ 'edit-weights__label--disabled': !item.enabled }"
            >
              {{ item.title }}
            </text>
          </view>
          <view class="edit-weights__input-wrap">
            <wd-input
              v-model="item.weightRaw"
              type="digit"
              :no-border="true"
              :disabled="!item.enabled"
              placeholder="0"
              custom-style="width: 70px; text-align: right; padding: 2px 0;"
            />
            <text
              class="edit-weights__unit"
              :class="{ 'edit-weights__label--disabled': !item.enabled }"
            >
              %
            </text>
          </view>
        </view>
        <wd-textarea
          v-model="item.note"
          placeholder="备注：说明 id 来源和用途"
          :auto-height="true"
          :no-border="true"
          :maxlength="-1"
          custom-style="background-color:#fcfcfc; border:1px solid #eee; border-radius:8px; padding:4px 10px; min-height:0;"
        />
      </view>

      <!-- 合计与操作按钮固定在底部：放 z-paging 的 #bottom 插槽，不随内容滚动 -->
      <template #bottom>
        <view class="edit-weights__total">
          <text class="edit-weights__total-label">
            已启用权重合计（共{{ enabledCount }}项）
          </text>
          <text
            class="edit-weights__total-value"
            :style="{ color: enabledTotalWeight === 100 ? '#2CA02C' : '#D62728' }"
          >
            {{ enabledTotalWeight.toFixed(2) }}%{{ enabledTotalWeight === 100 ? ' ✓' : ' (建议100%)' }}
          </text>
        </view>
        <view class="edit-weights__footer">
          <view class="edit-weights__btn-wrap">
            <wd-button block size="large" type="info" :round="false" @click="handleReset">
              恢复默认
            </wd-button>
          </view>
          <view class="edit-weights__btn-wrap">
            <wd-button
              block
              size="large"
              :round="false"
              :custom-style="'background-color: ' + theme"
              @click="handleSave"
            >
              保存
            </wd-button>
          </view>
        </view>
      </template>
    </z-paging>
    <DialogContainer />
  </view>
  <ToastContainer />
</template>

<script lang="ts" setup>
/**
 * 编辑权重（编辑持仓权重）
 * 由 cloud-react-native/src/screens/EditMsnWeights/index.tsx 迁移。
 *
 * - 数据源：编辑 marketStore.msnConfig（persist 持久化），首页持仓卡片按 weight 加权。
 * - weightRaw 是输入框的中间态字符串，保存时 parseWeight 归一成 number。
 * - z-paging 只当滚动容器（列表恒空，hide-empty-view 必须开），
 *   合计行 + 按钮放 #bottom 插槽固定底部。
 */
import { computed, ref } from 'vue'
import { DEFAULT_MSN_CONFIG } from '@/stores/market'
import { useMarketStore } from '@/stores/market'
import { useUserStore } from '@/stores/user'
import type { MsnConfigItem } from '@/types/msn'
import DialogContainer from '@/components/DialogContainer.vue'
import ToastContainer from '@/components/ToastContainer.vue'
import { Router } from '@/common/router'
import { useThemeVars } from '@/composables/useThemeVars'

const themeVars = useThemeVars()


type EditItem = MsnConfigItem & { weightRaw?: string }

const marketStore = useMarketStore()
const userStore = useUserStore()
const theme = computed(() => userStore.theme)

/** z-paging 只当滚动容器：列表数据恒为空，不参与渲染 */
const pagingRef = ref<any>(null)
const list = ref<unknown[]>([])

const queryList = () => {
  pagingRef.value?.complete([])
}

const configSource = marketStore.msnConfig
const items = ref<EditItem[]>(
  (configSource.length ? configSource : DEFAULT_MSN_CONFIG).map(it => ({
    ...it,
    weightRaw: String(it.weight)
  }))
)

const parseWeight = (raw?: string) => {
  if (!raw || raw === '') return 0
  const n = parseFloat(raw)
  return Number.isFinite(n) ? n : 0
}

const enabledCount = computed(() => items.value.filter(it => it.enabled).length)

const enabledTotalWeight = computed(() =>
  items.value
    .filter(it => it.enabled)
    .reduce((acc, it) => acc + parseWeight(it.weightRaw), 0)
)

const tipsText = computed(
  () => '追踪国内市场、港股市场使用国内东方财富指数Id\n国外市场，使用的桥水基金的全天候投资组合对应的美股的Id'
)

const handleSave = () => {
  const saved = items.value.map(it => ({
    ...it,
    weight: parseWeight(it.weightRaw)
  })) as MsnConfigItem[]
  marketStore.msnConfig = saved
  Router.back()
}

const handleReset = () => {
  items.value = DEFAULT_MSN_CONFIG.map(it => ({
    ...it,
    weightRaw: String(it.weight)
  }))
}
</script>

<style lang="scss" scoped>
.edit-weights {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f0f0;

  /* :fixed="false" 时 z-paging 高度 100%，父容器必须给出确定高度 */
  &__paging {
    flex: 1;
  }
  &__tips {
    display: flex;
    flex-direction: column;
    padding: 24rpx;
    background-color: #fff8e1;
    border-left: 8rpx solid #ffb300;
    border-radius: 10rpx;
  }
  &__tips-title {
    color: #795548;
    font-weight: 500;
    font-size: 28rpx;
  }
  &__tips-text {
    color: #795548;
    font-size: 24rpx;
  }
  &__row {
    display: flex;
    flex-direction: column;
    gap: 16rpx;
    padding: 24rpx 30rpx;
    background-color: #fff;
    border-bottom: 1rpx solid #eee;
  }
  &__row--disabled {
    background-color: #fafafa;
  }
  &__top-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 24rpx;
  }
  &__left {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20rpx;
    flex: 1;
    min-width: 0;
  }
  &__label {
    flex: 1;
    min-width: 0;
    color: #333;
    font-size: 30rpx;
  }
  &__label--disabled {
    color: #bbb;
  }
  &__input-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-shrink: 0;
  }
  &__unit {
    margin-left: 4rpx;
    color: #999;
    font-size: 26rpx;
  }
  &__total {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 24rpx 30rpx;
    background-color: #fff;
  }
  &__total-label {
    color: #333;
    font-weight: 500;
    font-size: 28rpx;
  }
  &__total-value {
    color: #d62728;
    font-weight: 500;
    font-size: 32rpx;
  }
  &__footer {
    display: flex;
    flex-direction: row;
    gap: 24rpx;
    padding: 24rpx 30rpx;
    background-color: #fff;
    border-top: 1rpx solid #eee;
  }
  /* 只负责平分宽度，按钮尺寸/圆角走 wd-button 的 large 预设 */
  &__btn-wrap {
    flex: 1;
    min-width: 0;
  }
  &__reset-text {
    color: #666;
    font-size: 32rpx;
  }
  &__save-text {
    color: #fff;
    font-weight: 500;
    font-size: 32rpx;
  }
}
</style>
