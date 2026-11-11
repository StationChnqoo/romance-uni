<template>
  <view class="intraday-page">
    <z-paging
      ref="pagingRef"
      v-model="list"
      class="intraday-page__paging"
      :fixed="false"
      :auto="true"
      :refresher-enabled="true"
      :loading-more-enabled="false"
      :hide-empty-view="true"
      @query="queryList">
      <IntradayChart :samples="samples" />
      <HoldingsTreemap :items="holdings" />
      <HoldingsWeightChart :items="holdings" />
      <HoldingsChangePie :items="holdings" />
      <view v-if="error" class="intraday-page__error">
        <text>{{ error }}</text>
      </view>
    </z-paging>
  </view>
</template>

<script lang="ts" setup>
import {computed, shallowRef, ref} from 'vue';
import {selectIntradayReturns, selectMsnStocks} from '@/api';
import {msnCodeOf} from '@/constants/config';
import type {IntradayReturnSample} from '@/types/intraday';
import IntradayChart from './components/IntradayChart.vue';
import HoldingsWeightChart from './components/HoldingsWeightChart.vue';
import HoldingsTreemap from './components/HoldingsTreemap.vue';
import HoldingsChangePie from './components/HoldingsChangePie.vue';
import {useMarketStore} from '@/stores/market';

const samples = shallowRef<IntradayReturnSample[]>([]);
const error = ref('');
const pagingRef = ref<any>(null);
const list = ref<unknown[]>([]);
const marketStore = useMarketStore();
const holdingConfigs = computed(() =>
  marketStore.msnConfig
    .filter(item => item.enabled && item.weight > 0)
    .slice()
    .sort((a, b) => b.weight - a.weight),
);
const holdings = shallowRef<
  Array<{
    title: string;
    weight: number;
    changePercent: number;
  }>
>([]);

const queryList = async () => {
  error.value = '';
  try {
    const configs = holdingConfigs.value;
    const codes = configs.map(item => msnCodeOf(item.etfMsnId)).join(',');
    const [intraday, quotes] = await Promise.all([
      selectIntradayReturns(),
      selectMsnStocks(codes) as Promise<any[]>,
    ]);
    const quoteMap = new Map<string, number>();
    (quotes || []).forEach(group => {
      const item = Array.isArray(group) ? group[0] : group;
      const change = Number(item?.quote?.priceChangePercent);
      if (item?.instrumentId && Number.isFinite(change)) {
        quoteMap.set(item.instrumentId, change);
      }
    });
    samples.value = intraday;
    holdings.value = configs.map(item => ({
      title: item.title,
      weight: item.weight,
      changePercent: quoteMap.get(msnCodeOf(item.etfMsnId)) ?? 0,
    }));
    pagingRef.value?.complete([]);
  } catch {
    error.value = '走势数据加载失败，请稍后重试';
    pagingRef.value?.complete(false);
  }
};
</script>

<style lang="scss" scoped>
.intraday-page {
  height: 100vh;
  background-color: #f0f0f0;

  &__paging {
    height: 100%;
  }

  &__error {
    padding: 32rpx;
    color: #999;
    font-size: 24rpx;
    text-align: center;
    background-color: #fff;
  }
}
</style>
