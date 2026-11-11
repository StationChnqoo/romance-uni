<template>
  <!-- wd-popup：用 v-model（:model-value 接外部 props.show）控制显隐，
       点遮罩关闭时走 @update:model-value 把状态同步回父级（emit close）。
       safe-area-inset-bottom 关掉（默认就是 false）：底部安全区由 manifest 在原生层统一避让。 -->
  <wd-popup
    :model-value="props.show"
    position="bottom"
    :safe-area-inset-bottom="false"
    :close-on-click-modal="true"
    @update:model-value="onModelUpdate"
    @after-enter="onPopupEnter"
  >
    <view class="import-modal">
      <view class="import-modal__header">
        <text class="import-modal__title">快速导入历史数据</text>
      </view>

      <view class="import-modal__section">
        <text class="import-modal__section-label">时间范围</text>
        <wd-segmented
          ref="segPeriodRef"
          v-model:value="periodLabel"
          :options="PERIOD_OPTIONS.map(it => it.label)"
        />
      </view>

      <scroll-view scroll-y class="import-modal__list-scroll">
        <view class="import-modal__list">
          <view v-for="(config, index) in msnConfig" :key="config.title + index" class="import-modal__row">
            <text class="import-modal__row-name">{{ config.title }}</text>
            <wd-loading v-if="loading" :size="16" color="#1890ff" />
            <text
              v-else-if="getReturn(index) !== null"
              class="import-modal__row-val"
              :style="{ color: renderUpOrDown(returnValue(index)).color }"
            >
              {{ renderUpOrDown(returnValue(index)).operator }}{{ Math.abs(returnValue(index)).toFixed(2) }}%
            </text>
            <text v-else class="import-modal__row-val-empty">-</text>
          </view>
        </view>
      </scroll-view>

      <view class="import-modal__footer">
        <view class="import-modal__btn-wrap">
          <wd-button block type="info" :round="false" @click="onClose">
            取消
          </wd-button>
        </view>
        <view class="import-modal__btn-wrap">
          <wd-button
            block
            :round="false"
            :custom-style="'background-color: ' + theme"
            @click="handleImport"
          >
            {{ loading ? '加载中...' : '导入' }}
          </wd-button>
        </view>
      </view>
    </view>
  </wd-popup>
</template>

<script lang="ts" setup>
/**
 * 快速导入历史数据弹窗
 * 由 cloud-react-native/src/screens/ValuationCalculator/components/ImportModal.tsx 迁移。
 *
 * - 选时间范围（1周/1月/半年/1年/3年/5年），
 *   逐个标的拉区间涨跌；短周期取 quote[period]，长周期取 chart.series.prices 首尾算涨幅。
 * - 点「导入」把 {title: 涨跌} 回传，父页面按 title 填进涨跌% 列。
 * - 底部弹层用 wot 的 wd-popup；safe-area 由 manifest 系统级避让，不手动加。
 */
import { computed, ref, watch } from 'vue'
import { selectMsnStocks, selectMsnStocksInMoreGap } from '@/api'
import { useUserStore } from '@/stores/user'
import type { MsnConfigItem } from '@/types/msn'
import { renderUpOrDown } from '@/utils'

type ShortPeriod = 'return1Week' | 'return1Month' | 'return6Month' | 'return1Year'
type LongPeriod = '1Y' | '3Y' | '5Y'
type Period = ShortPeriod | LongPeriod

const props = defineProps<{
  show: boolean
  msnConfig: MsnConfigItem[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'import', changes: Record<string, number>): void
}>()

const PERIOD_OPTIONS: Array<{ key: Period; label: string; type: 'short' | 'long' }> = [
  { key: 'return1Week', label: '1周', type: 'short' },
  { key: 'return1Month', label: '1月', type: 'short' },
  { key: 'return6Month', label: '半年', type: 'short' },
  { key: 'return1Year', label: '1年', type: 'short' },
  { key: '3Y', label: '3年', type: 'long' },
  { key: '5Y', label: '5年', type: 'long' }
]

const userStore = useUserStore()
const theme = computed(() => userStore.theme)

/** wd-segmented 实例：popup 完全展开后需要重算滑动高亮块的位置（见 onPopupEnter） */
const segPeriodRef = ref<any>(null)

/**
 * wd-popup 点遮罩关闭时把 modelValue 置 false 并回传。这里上报父级。
 * 父级把 props.show 置 false 来关时不回传 update，无需再 emit close（重复 emit 对父级幂等，
 * 但这里不主动发，避免和 handleImport 里的 emit('close') 叠在一起）。
 */
function onModelUpdate(val: boolean) {
  if (!val) emit('close')
}

/**
 * popup 完全展开后，两个 segmented 的滑动高亮块（wd-segmented 用 getRect 量宽度定位）在
 * 内容还是 display:none 时量到 0，展开后不会自动重算 → 看着像「没选中默认项」。
 * 这里在 after-enter 里手动补一次 updateActiveStyle（组件暴露的方法），让高亮块归位。
 */
function onPopupEnter() {
  segPeriodRef.value?.updateActiveStyle?.()
}

const periodLabel = ref('1年') // 默认 return1Year

const period = computed<Period>(
  () => PERIOD_OPTIONS.find(it => it.label === periodLabel.value)?.key ?? 'return1Year'
)
const datas = ref<any[]>([])
const loading = ref(false)

const periodType = computed(
  () => PERIOD_OPTIONS.find(it => it.label === periodLabel.value)?.type || 'short'
)

const loadDatas = async () => {
  loading.value = true
  try {
    const results = await Promise.all(
      props.msnConfig.map(config => {
        const code = config.etfMsnId
        if (!code) return Promise.resolve(null)
        if (periodType.value === 'short') {
          return selectMsnStocks(code).catch(() => null)
        }
        return selectMsnStocksInMoreGap({
          msnCodes: code,
          type: period.value as LongPeriod
        }).catch(() => null)
      })
    )
    datas.value = results as any[]
  } finally {
    loading.value = false
  }
}

watch(
  () => props.show,
  val => {
    if (val) {
      loadDatas()
    } else {
      // 关闭时重置选择（对齐 RN 每次打开都是新查询）
      periodLabel.value = '1年'
      datas.value = []
    }
  }
)

// 切时间范围都重拉（对齐 RN 的 queryKey 变化失效语义）
watch(periodLabel, () => {
  if (props.show) {
    loadDatas()
  }
})

const getReturn = (index: number): number | null => {
  const data = datas.value[index]
  if (!data?.[0]) return null

  if (periodType.value === 'short') {
    const value = data[0].quote?.[period.value as ShortPeriod]
    return typeof value === 'number' ? value : null
  }
  const prices = data[0].chart?.series?.prices as number[] | undefined
  if (!prices || prices.length <= 2) return null
  const first = prices[0]
  const last = prices[prices.length - 1]
  if (!first || !last) return null
  return ((last - first) / first) * 100
}

/**
 * 模板专用取值：getReturn 可能返回 null，这里收敛成 number（渲染那一行时已用 v-else-if 保证非 null）。
 *
 * ★ 不写成模板里的 getReturn(index) as number：模板表达式由 @vue/compiler-dom 交给 babel 解析，
 *   TS 断言只有在显式开启 typescript 表达式插件时才成立（Volar / Vite 都开了，所以能跑），
 *   未开启该插件的解析器（部分编辑器的高亮引擎）会直接解析失败、从那一行起整片跑偏。
 */
const returnValue = (index: number) => getReturn(index) ?? 0

const handleImport = () => {
  if (loading.value) return
  const changes: Record<string, number> = {}
  props.msnConfig.forEach((config, index) => {
    const ret = getReturn(index)
    if (ret !== null) {
      changes[config.title] = ret
    }
  })
  emit('import', changes)
  emit('close')
}

const onClose = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
.import-modal {
  background-color: #fff;
  padding-top: 24rpx;
  border-radius: 24rpx 24rpx 0 0;

  &__header {
    padding: 0 30rpx;
    margin-bottom: 20rpx;
  }
  &__title {
    color: #333;
    font-weight: 500;
    font-size: 32rpx;
  }
  &__section {
    padding: 0 30rpx;
    margin-bottom: 24rpx;
  }
  &__section-label {
    display: block;
    color: #999;
    font-size: 24rpx;
    margin-bottom: 16rpx;
  }
  &__list-scroll {
    max-height: 30vh;
  }
  &__list {
    padding: 0 30rpx;
  }
  &__row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx 0;
    border-bottom: 1rpx solid #f0f0f0;
  }
  &__row-name {
    color: #333;
    font-size: 28rpx;
    /* numberOfLines={1} */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__row-val {
    flex-shrink: 0;
    margin-left: 16rpx;
    font-weight: 500;
    font-size: 28rpx;
  }
  &__row-val-empty {
    flex-shrink: 0;
    margin-left: 16rpx;
    color: #ddd;
    font-size: 28rpx;
  }
  &__footer {
    display: flex;
    flex-direction: row;
    gap: 24rpx;
    padding: 24rpx 30rpx;
  }
  &__btn-wrap {
    /* 只负责平分宽度，按钮尺寸用 wd-button 默认预设（不再用 large） */
    flex: 1;
    min-width: 0;
  }
}
</style>
