<!--
  再平衡计算器（全天候组合 · 5/25 规则）
  新增工具页（非 RN 迁移），与估值计算器（pkg-misc/valuation）同属 pkg-misc 通用工具分包，
  入口在首页宫格末尾（icon=refresh）。页面带原生导航栏（pages.json：navigationStyle default）。

  - 5/25 规则：触发阈值 = 「绝对 5 个百分点」与「相对 25%」中更严格（更窄）者，
    生效区间 = [max(w−5pp, 0.75w), min(w+5pp, 1.25w)]，越出即触发，按「调回目标权重」计算。
  - 每个资产类别下可挂多个投资标的，类别权重 = 类别总市值 / 组合总市值。
  - 再平衡方式只保留「现有资金重分配」：总资产 T 不变，Δ_i = w_i·T − V_i，ΣΔ_i = 0，
    卖出超配类别的资金恰好买入低配类别，调整后各类别精确回到目标权重。
    （「新增资金」模式 2026-10-16 删除：再分配的买入行已能回答新资金该去哪，分母数学边际价值低。）
  - 数据源：stores/rebalancer（pinia + persist 整包）。类别与目标权重是工具定义，
    标的名称按实际持仓预填（对齐 DEFAULT_MSN_CONFIG 的 enabled 项）、市值留空，
    金额单位统一为 K（输入 210 = ¥210,000）。
  - z-paging 只当滚动容器（hide-empty-view）：无顶部固定内容，总览条放 #bottom。
  - 涨红跌绿：偏离 / 买入用红、卖出用绿（renderUpOrDown 同款色）；触发状态用琥珀 / 灰，不占红绿。
  - 千分位手写正则（App 端裸 V8 没有 Intl / toLocaleString）。

  结构（2026-10-16 拆分，原先 892 行全挤在本文件）：
  - 领域计算（格式化 / 派生 / 增删重置）→ ./useRebalanceCalc.ts
  - 公共组件（RbInput 封装 wd-input、RbCard 卡片壳、RbBanner 提示条）→ ./components/
  - 业务组件（HoldingsCard 持仓输入、ThresholdCard + RbBand 阈值监测、
    PlanSwap 再分配方案、RbOverview 总览、FormulaCard 公式说明）→ ./components/
  - 本文件只剩：z-paging 滚动骨架 + 卡片组合。
-->
<template>
  <view :style="themeVars" class="rb">
    <z-paging
      ref="pagingRef"
      v-model="list"
      class="rb__paging"
      :fixed="false"
      :auto="true"
      :refresher-enabled="false"
      :loading-more-enabled="false"
      :show-scrollbar="false"
      hide-empty-view
      @query="queryList"
    >
      <!-- 持仓输入：每个类别多标的，市值单位 K -->
      <HoldingsCard />

      <!-- 5/25 阈值监测 -->
      <ThresholdCard />

      <!-- 再平衡方案：现有资金重分配 -->
      <RbCard title="再平衡方案">
        <PlanSwap />
      </RbCard>

      <!-- 公式说明 -->
      <FormulaCard />

      <!-- 总览（固定不滚） -->
      <template #bottom>
        <RbOverview />
      </template>
    </z-paging>
  </view>
</template>

<script lang="ts" setup>
/**
 * 再平衡计算器页（薄壳）
 * 领域计算在 ./useRebalanceCalc.ts，UI 分段在 ./components/ 下各组件；
 * 本文件只留：z-paging 滚动容器骨架 + 卡片组合。
 */
import { ref } from 'vue'
import { useThemeVars } from '@/composables/useThemeVars'
import RbCard from './components/RbCard.vue'
import HoldingsCard from './components/HoldingsCard.vue'
import ThresholdCard from './components/ThresholdCard.vue'
import PlanSwap from './components/PlanSwap.vue'
import FormulaCard from './components/FormulaCard.vue'
import RbOverview from './components/RbOverview.vue'

const themeVars = useThemeVars()

/** z-paging 只当滚动容器：列表数据恒为空，不参与渲染 */
const pagingRef = ref<any>(null)
const list = ref<unknown[]>([])

const queryList = () => {
  pagingRef.value?.complete([])
}
</script>

<style lang="scss" scoped>
.rb {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f0f0;

  /* :fixed="false" 时 z-paging 高度 100%，父容器必须给出确定高度 */
  &__paging {
    flex: 1;
  }
}
</style>
