<!--
  5/25 阈值监测卡：总 banner（未输入 / 已触发 / 区间内）+ 每类别一行监测
  数据全走 store（useRebalanceCalc），本组件无 props
-->
<template>
  <RbCard title="5/25 阈值监测" sub="实际触发阈值取更严（更窄）者">
    <RbBanner v-if="total <= 0" type="info">请先输入各标的市值（单位 K）</RbBanner>
    <RbBanner v-else-if="triggeredCount > 0" type="warn">已触发：{{ triggerText }}</RbBanner>
    <RbBanner v-else type="ok">所有类别均在生效区间内，无需再平衡</RbBanner>
    <RbBand v-for="(s, i) in stats" :key="i" :stat="s" :empty="total <= 0" :bar-pos="barPos" />
  </RbCard>
</template>

<script lang="ts" setup>
import { useRebalanceCalc } from '../useRebalanceCalc'
import RbCard from './RbCard.vue'
import RbBanner from './RbBanner.vue'
import RbBand from './RbBand.vue'

const { total, triggeredCount, triggerText, stats, barPos } = useRebalanceCalc()
</script>
