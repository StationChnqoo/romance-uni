<!--
  投资记录列表（原「投资组合 -> 每周记录」两层已砍掉组合层，记录直接平铺）

  - 接口 /portfolio-weekly-records 直接分页返回全部记录（不再按 portfolioId 过滤）。
  - 分页 / 下拉刷新 / 上拉加载交给 z-paging；底部固定按钮用 #bottom 插槽。
  - 登录守卫沿用原投资组合列表页的 checkLogin（onLoad + onShow 各一次）。
  - 返回本页（新增/编辑记录回来后）用 onShow 重拉，保证数据回显最新。
-->
<template>
  <view :style="themeVars" class="records">
    <z-paging
      ref="pagingRef"
      v-model="list"
      class="records__paging"
      :fixed="false"
      :auto="true"
      @query="queryList"
    >
      <view v-for="(item, index) in list" :key="`${item.id}:${index}`">
        <view
          class="records__item"
          hover-class="records__item_hover"
          @click="onItemPress(item)"
        >
          <!-- 第一行：结算日期（主标题，原来是原始 id，长串 uuid 截断很难看） + 总资产（万元，主题色突出） -->
          <Flex horizontal justify="space-between">
            <text class="records__date">{{ settleText(item) }}</text>
            <!-- 颜色挂在整组容器上（数字与「万」一起继承主题色，子节点别再写死 color） -->
            <view class="records__amount" :style="{ color: theme }">
              <text class="records__amount-value">{{ amountWan(item) }}</text>
              <text class="records__amount-unit">万</text>
            </view>
          </Flex>

          <!-- 第二行：备注（可选，不截断，多长都展开） -->
          <text v-if="item.remark" class="records__remark">{{ item.remark }}</text>

          <!-- 第三行：资产项数 + 更新时间（辅助信息，弱化到 22rpx） -->
          <view class="records__meta">
            <text class="records__meta-text">{{ assetCount(item) }}</text>
            <template v-if="item.updateAt">
              <text class="records__meta-dot">·</text>
              <text class="records__meta-text">{{ updatedText(item) }}</text>
            </template>
          </view>
        </view>
        <view v-if="index < list.length - 1" class="records__separator" />
      </view>

      <template #bottom>
        <view class="records__bottom">
          <wd-button
            block
            :round="false"
            :custom-style="'background-color: ' + theme"
            @click="onAddRecord"
          >
            新增记录
          </wd-button>
        </view>
      </template>
    </z-paging>
  </view>
  <ToastContainer />
</template>

<script lang="ts" setup>
import ToastContainer from '@/components/ToastContainer.vue'
import { computed, ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import dayjs from 'dayjs'
import { selectPortfolioWeeklyRecords } from '@/api'
import { Router } from '@/common/router'
import Flex from '@/components/Flex.vue'
import { useUserStore } from '@/stores/user'
import { toast, relativeTime, formatYearWeek } from '@/utils'
import type { PortfolioWeeklyRecord } from '@/types/portfolio'
import { useThemeVars } from '@/composables/useThemeVars'

const themeVars = useThemeVars()


const pagingRef = ref<any>(null)
const list = ref<PortfolioWeeklyRecord[]>([])

/*
 * 底部单按钮：直接用 wot 的 wd-button，尺寸/圆角全走 wot 的 size 默认值，
 * 这里的 custom-style 只把实底色换成本项目主题色。
 */
const userStore = useUserStore()
const theme = computed(() => userStore.theme)

/** 首次 onShow 与 z-paging 的 auto 加载重合，跳过以免重复请求 */
let inited = false

/**
 * 总资产：后端单位是 K（千元），页面统一按万元展示（÷10）+ 千分位。
 * 分隔符手写 —— App 端逻辑层是裸 V8，Intl.NumberFormat 不保证有（与钱包页同口径）。
 */
const amountWan = (item: PortfolioWeeklyRecord) => {
  const k = Number(item.totalAsset)
  if (!Number.isFinite(k)) return '--'
  return (k / 10)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 结算日期：周记录的主标题（YYYY-MM-DD）。
 * 原来是第一行左侧放原始 id —— 长串 uuid 被省略号截断，最重要的位置放了最没意义的信息。
 * settleOn 为空时退到 createAt 取日期段，再没有给占位。
 */
const settleText = (item: PortfolioWeeklyRecord) =>
  (item.settleOn || item.createAt || '').slice(0, 10) || '-'

/** 资产明细项数（没有明细时给个占位，避免第三行只剩右边的时间显得空） */
const assetCount = (item: PortfolioWeeklyRecord) =>
  item.assets?.length ? `共 ${item.assets.length} 项资产` : '暂无资产明细'

/**
 * 更新时间展示。
 * - 近期（<7天）：沿用相对时间 刚刚 / x分钟前 / x小时前 / x天前（见 utils/relativeTime）。
 * - 超过一周：投资记录按周结算，改用「哪年第几周」（utils/formatYearWeek，手写 ISO 周，
 *   App 裸 V8 无 Intl.WeekInfo），比「x周前 / x个月前」定位更准、风格更统一。
 * relativeTime 是共用 helper（资讯/首页仍走周档），不在这里改它。
 */
const updatedText = (item: PortfolioWeeklyRecord) => {
  const iso = item.updateAt
  if (!iso) return ''
  const diffDay = dayjs().diff(dayjs(iso), 'day')
  if (diffDay < 7) return `更新于 ${relativeTime(iso)}`
  return `更新于 ${formatYearWeek(iso)}`
}

const queryList = async (pageNo: number, pageSize: number) => {
  try {
    const pageData = await selectPortfolioWeeklyRecords({ currentPage: pageNo, pageSize })
    pagingRef.value?.completeByNoMore(pageData.records || [], !pageData.hasNextPage)
  } catch (e) {
    pagingRef.value?.complete(false)
  }
}

const onItemPress = (item: PortfolioWeeklyRecord) => {
  Router.navigate('EditPortfolioRecord', { id: item.id })
}

const onAddRecord = () => {
  Router.navigate('EditPortfolioRecord')
}

const checkLogin = () => {
  if (userStore.token) return
  toast('请登录后使用')
  Router.goLogin()
}

onShow(() => {
  checkLogin()
  if (inited) {
    pagingRef.value?.reload()
  }
  inited = true
})
</script>

<style lang="scss" scoped>
.records {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f1f2f3;

  /* :fixed="false" 时 z-paging 高度 100%，父容器必须给出确定高度 */
  &__paging {
    flex: 1;
  }
  &__item_hover {
    /* TouchableOpacity activeOpacity={0.8} */
    opacity: 0.8;
  }
  &__item {
    display: flex;
    flex-direction: column;
    padding: 28rpx 30rpx;
    background-color: #fff;
  }
  /* 结算日期：记录的主标题（替换原来的原始 id） */
  &__date {
    flex: 1;
    /* flex item 默认 min-width:auto，不写 0 的话省略号不生效 */
    min-width: 0;
    color: #333;
    font-size: 30rpx;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /* 金额整组：数字 + 单位小字后缀，baseline 对齐（基线对齐才不会一上一下错开） */
  &__amount {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    flex-shrink: 0;
    margin-left: 24rpx;
  }
  /* 金额的取值由模板内联下发到容器（:style），数字与「万」都继承它，
     子节点一律不再写死 color —— 写了会盖掉内联的主题色。 */
  &__amount-value {
    /* 钉钉进步体（子集化 + base64 内联，见 styles/fonts.scss）；
       符号 / 汉字（这里只有数字和小数点）子集内有，单位「万」会回退到 sans-serif。 */
    font-family: 'DingTalk-JinBuTi', 'PingFang SC', sans-serif;
    font-size: 32rpx;
  }
  &__amount-unit {
    margin-left: 6rpx;
    font-size: 24rpx;
  }
  &__remark {
    margin-top: 12rpx;
    color: #666;
    font-size: 28rpx;
    /* 不掐行数：备注多长都完整展开（用户明确要求） */
  }
  /* 辅助信息行：资产项数 + 更新时间，左对齐单行（原来右放时间与右侧大金额抢视觉），
     22rpx #999 弱化到最小，与主标题（30rpx #333）/ 备注（28rpx #666）拉开三级层级 */
  &__meta {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 16rpx;
  }
  &__meta-text {
    color: #999;
    font-size: 22rpx;
  }
  &__meta-dot {
    margin: 0 10rpx;
    color: #ccc;
    font-size: 22rpx;
  }
  &__separator {
    height: 2rpx;
    background-color: #f1f2f3;
  }
  &__bottom {
    padding: 20rpx 30rpx;
    background-color: #fff;
  }
}
</style>
