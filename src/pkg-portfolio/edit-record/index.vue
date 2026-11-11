<!--
  新增 / 编辑投资记录（每周结算记录）
  由 cloud-react-native/src/screens/EditPortfolioRecord/index.tsx 迁移。

  2026-10-15：组合（Portfolio）这层已下线，记录不再归属某个组合，
  「投资记录列表 → 本页」两级直连，表单里没有 portfolioId 了。

  排版约定（与其它编辑页统一）：
  - 短文本输入（日期选择、名称、权重）：用 wd-input cell 模式，
    label 在左、value 在右（align-right），整行 48rpx 高。
    金额行是自绘的（tag 组 + 圆形加号钮），value 区同样右对齐（text-align:right +
    justify-content:flex-end），跟 wd-input 的右对齐保持一条线。
    ⚠️ wot 的 cell 默认 text-align:center，wd-tag 会继承它 → 必须显式写 left/right。
  - 长文本输入（备注）：label 在上、textarea 在下、高度自适应，
    与单行 input 挤在同一行右侧难看，单独占一栏。
  - 表单顶层的行间分隔用页面 __line（1px 浅灰，1rpx 在 webview 里只有 0.5px 不可见），
    所有 wd-input/wd-textarea 都传 no-border（关掉 wot cell 自带的 ::after 下划线），
    避免同位置画两条线显得粗。
  - 资产明细：每个资产一张 wd-card，**默认样式直接用，页面不覆盖**
    （自带 margin: 0 15px / margin-bottom: 12px / padding: 0 15px / shadow / 圆角，
    组间距与卡内留白它全有了）。标题「第 N 项 + 删除钮」走 #title 插槽。
    卡**内部**的行分隔用 __gap（纯留白 24rpx），不画线 —— 卡面上再叠浅灰线只会更乱。
    层级：卡片边界分资产组，__gap 分组内的行。
-->
<template>
  <view :style="themeVars" class="record">
    <z-paging
      v-model="list"
      class="record__paging"
      :fixed="false"
      :auto="false"
      :refresher-enabled="false"
      :loading-more-enabled="false"
    >
      <view class="record__form">
        <wd-form ref="formRef" :model="form">
          <!-- 顶层表单行（结算日期 / 总资产 / 备注 / 资产明细）不在 wd-card 里，
               靠这层的 padding 提供左右留白（宽度与 wd-card 自带的 margin 15px 对齐）。 -->
          <view class="record__rows">
            <Flex horizontal justify="space-between">
              <text class="record__label">结算日期</text>
              <wd-datetime-picker
                :model-value="settleOnValue"
                type="date"
                :root-portal="true"
                :z-index="999"
                @confirm="onDateConfirm"
              >
                <MoreButton :label="form.settleOn || '请选择'" />
              </wd-datetime-picker>
            </Flex>
            <view class="record__line" />

            <wd-input
              :model-value="`${form.totalAsset || ''}`"
              label="总资产"
              prop="totalAsset"
              type="digit"
              clearable
              align-right
              no-border
              placeholder="0"
              @update:model-value="value => onRecordInput('totalAsset', value)"
            />
            <view class="record__line" />

            <!-- 备注是长文本，label 在上、textarea 在下、高度自适应 -->
            <view class="record__stack">
              <text class="record__label record__label--top">备注</text>
              <wd-textarea
                :model-value="form.remark"
                placeholder="记录本次结算说明"
                :maxlength="-1"
                auto-height
                no-border
                @update:model-value="value => onRecordInput('remark', value)"
              />
            </view>
            <view class="record__line" />

            <!-- 持仓扇形图（原「持仓分析」页的饼图，分析页删除后移入本页）：随表单实时联动 -->
            <RecordPieChart :assets="form.assets" />
            <view class="record__line" />

            <Flex horizontal justify="space-between">
              <text class="record__section-title">资产明细</text>
              <MoreButton label="新增资产" @press="appendAsset" />
            </Flex>
          </view>
          <view class="record__line" />

          <!-- 资产块：每个资产一张 wd-card，默认样式直接用（自带 margin / padding /
               shadow / 组间距），页面不覆盖。标题「第 N 项 + 删除钮」走 #title 插槽。
               卡内行分隔用 __gap（纯留白），不画线。 -->
          <wd-card
            v-for="(asset, index) in form.assets"
            :key="index"
          >
            <template #title>
              <Flex horizontal justify="space-between">
                <text class="record__asset-title">第 {{ index + 1 }} 项</text>
                <view class="record__asset-del" @click="removeAsset(index)">
                  <wd-icon name="delete-thin" color="#999" size="20px" />
                </view>
              </Flex>
            </template>

            <view class="record__gap" />

            <wd-input
              :model-value="asset.name"
              label="名称"
              :prop="`assets.${index}.name`"
              align-right
              no-border
              placeholder="请输入投资标的名称"
              @update:model-value="value => onAssetInput(index, 'name', value)"
            >
              <!-- 不用 wd-input 自带 clearable（内置 error-fill 深灰实心圆，太重且与金额标签的细 × 不统一），
                   改走 #suffix 插槽自绘浅灰细 ×，点一下清空 -->
              <template #suffix>
                <view
                  v-if="asset.name"
                  class="record__clear"
                  hover-class="record__clear--hover"
                  @click="onAssetInput(index, 'name', '')"
                >
                  <wd-icon name="close" :size="14" color="#999" />
                </view>
              </template>
            </wd-input>
            <view class="record__gap" />

            <!-- 金额行：自定义 label + 标签组，整行与 wd-input label 对齐。
                 加号钮放进 DeleteableTags 的 #append 插槽 —— 与标签同处一条 flex 流，
                 换行时跟着标签走、整组右对齐，不再被挤到下一行最右侧当孤儿按钮。 -->
            <view class="record__field">
              <text class="record__field-label">金额</text>
              <view class="record__field-value record__amount-box">
                <!-- 可删除标签：公共组件 DeleteableTags（wot 的 wd-tag closable 关闭图标写死深灰实心圆，有 bug） -->
                <DeleteableTags
                  :datas="asset.amount"
                  align="end"
                  @delete="idx => removeAssetAmount(index, idx)"
                >
                  <template #append>
                    <view
                      class="record__amount-add"
                      :style="{ backgroundColor: theme + '1f' }"
                      @click="openAssetAmountDialog(index)"
                    >
                      <wd-icon name="add" :color="theme" size="16px" />
                    </view>
                  </template>
                </DeleteableTags>
              </view>
            </view>
            <view class="record__gap" />

            <wd-input
              :model-value="assetWeightText(asset)"
              label="权重(%)"
              :prop="`assets.${index}.weight`"
              type="digit"
              align-right
              no-border
              placeholder="0"
              @update:model-value="value => onAssetInput(index, 'weight', value)"
            >
              <!-- 同名称行：自绘浅灰细 × 替代 wot 的 error-fill 深灰实心圆 -->
              <template #suffix>
                <view
                  v-if="assetWeightText(asset)"
                  class="record__clear"
                  hover-class="record__clear--hover"
                  @click="onAssetInput(index, 'weight', '')"
                >
                  <wd-icon name="close" :size="14" color="#999" />
                </view>
              </template>
            </wd-input>
            <view class="record__gap" />

            <view class="record__stack">
              <text class="record__label record__label--top">备注</text>
              <wd-textarea
                :model-value="asset.note"
                placeholder="可选"
                :maxlength="-1"
                auto-height
                no-border
                @update:model-value="value => onAssetInput(index, 'note', value)"
              />
            </view>
          </wd-card>
        </wd-form>
      </view>

      <!-- ★表单结束与底部按钮之间的组件级分隔（最后一张卡片后不画 __line，由它接） -->
      <view class="record__divider" />

      <template #bottom>
        <Flex horizontal justify="space-between" :custom-style="footerStyle">
          <wd-button
            block
            plain
            :round="false"
            :custom-style="'flex: 1; min-width: 0; color: ' + theme"
            @click="onDelete"
          >
            删除记录
          </wd-button>
          <wd-button
            block
            :round="false"
            :custom-style="'flex: 1; min-width: 0; background-color: ' + theme"
            @click="onSave"
          >
            保存记录
          </wd-button>
        </Flex>
      </template>
    </z-paging>

    <InputDialog
      :show="amountDialog.show"
      title="新增金额"
      message="请输入该资产的一条金额"
      @close="closeAssetAmountDialog"
      @confirm="onAmountConfirm"
    />
    <DialogContainer />
  </view>
  <ToastContainer />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import dayjs from 'dayjs'
import {
  createPortfolioWeeklyRecord,
  deletePortfolioWeeklyRecord,
  selectPortfolioWeeklyRecord,
  updatePortfolioWeeklyRecord
} from '@/api'
import { Router } from '@/common/router'
import Flex from '@/components/Flex.vue'
import InputDialog from '@/components/InputDialog.vue'
import MoreButton from '@/components/MoreButton.vue'
import DeleteableTags from '@/components/DeleteableTags.vue'
import RecordPieChart from './components/RecordPieChart.vue'
import { Dialog } from '@/components/Dialog'
import DialogContainer from '@/components/DialogContainer.vue'
import ToastContainer from '@/components/ToastContainer.vue'
import { useMarketStore } from '@/stores/market'
import { useUserStore } from '@/stores/user'
/** 与 @/api 的 createPortfolioWeeklyRecord（接口）同名，这里起别名区分 */
import {
  createPortfolioAssetItem,
  createPortfolioWeeklyRecord as createWeeklyRecordDraft
} from '@/types/portfolio'
import type { PortfolioAssetItem, PortfolioWeeklyRecord } from '@/types/portfolio'
import type { MsnConfigItem } from '@/types/msn'
import type { FormInstance } from 'wot-design-uni/components/wd-form/types'
import { useThemeVars } from '@/composables/useThemeVars'

const themeVars = useThemeVars()


const formRef = ref<FormInstance>()

/**
 * 底部操作区容器：只负责外边框间距与按钮间距。
 * 按钮自身用 wot 的 wd-button，尺寸/圆角全部由 wot 的 size 默认值提供，
 * 页面只把实底色/镂空描边色换成本项目主题色。
 */
const footerStyle = { padding: '10px 15px', gap: '12px' }

const marketStore = useMarketStore()
const userStore = useUserStore()
const theme = computed(() => userStore.theme)

/** 本页不是列表，z-paging 只用来承接容器滚动与 #bottom 固定操作区 */
const list = ref<unknown[]>([])
const recordId = ref('')

const form = ref<PortfolioWeeklyRecord>(createWeeklyRecordDraft())
const amountDialog = ref({ show: false, assetIndex: -1 })

const createDraftRecord = (): PortfolioWeeklyRecord =>
  createWeeklyRecordDraft({
    settleOn: dayjs().format('YYYY-MM-DD')
  })

/** 新增记录时的默认资产：取 caches 里 enabled 的 MSN 配置项（名称 + 权重） */
const createDefaultAssets = (msnConfig: MsnConfigItem[]) =>
  msnConfig
    .filter(item => item.enabled)
    .map(item =>
      createPortfolioAssetItem({
        name: item.title,
        weight: item.weight
      })
    )

const updateRecordForm = (key: keyof PortfolioWeeklyRecord, value: any) => {
  form.value = { ...form.value, [key]: value }
}

/** wd-input 的 update:model-value 直接收字符串 */
const onRecordInput = (key: keyof PortfolioWeeklyRecord, value: string) => {
  updateRecordForm(key, value)
}

const updateAsset = (index: number, key: keyof PortfolioAssetItem, value: any) => {
  form.value = {
    ...form.value,
    assets: form.value.assets.map((asset, i) =>
      i === index ? { ...asset, [key]: value } : asset
    )
  }
}

const onAssetInput = (index: number, key: keyof PortfolioAssetItem, value: string) => {
  updateAsset(index, key, value)
}

/** 权重展示值：weight 可能是数字 0，统一成字符串再回显/判空（决定自绘 × 是否出现） */
const assetWeightText = (asset: PortfolioAssetItem) => `${asset.weight || ''}`

const appendAsset = () => {
  form.value = {
    ...form.value,
    assets: [...form.value.assets, createPortfolioAssetItem()]
  }
}

const removeAsset = (index: number) => {
  form.value = {
    ...form.value,
    assets: form.value.assets.filter((_, i) => i !== index)
  }
}

const openAssetAmountDialog = (assetIndex: number) => {
  amountDialog.value = { show: true, assetIndex }
}

const closeAssetAmountDialog = () => {
  amountDialog.value = { show: false, assetIndex: -1 }
}

const addAssetAmount = (assetIndex: number, value: string) => {
  const nextValue = value.trim()
  if (nextValue && assetIndex >= 0) {
    form.value = {
      ...form.value,
      assets: form.value.assets.map((asset, i) =>
        i === assetIndex ? { ...asset, amount: [...asset.amount, nextValue] } : asset
      )
    }
  }
  closeAssetAmountDialog()
}

const onAmountConfirm = (value: string) => {
  addAssetAmount(amountDialog.value.assetIndex, value)
}

const removeAssetAmount = (assetIndex: number, amountIndex: number) => {
  form.value = {
    ...form.value,
    assets: form.value.assets.map((asset, i) =>
      i === assetIndex
        ? { ...asset, amount: asset.amount.filter((_, j) => j !== amountIndex) }
        : asset
    )
  }
}

/**
 * wd-datetime-picker（type=date）的入参按时间戳传：
 * 组件内部是 `new Date(value)`，字符串会被当 UTC 解析，时间戳最稳。
 */
const settleOnValue = computed(() => {
  const date = form.value?.settleOn
  return date ? dayjs(date).valueOf() : Date.now()
})

/** confirm 抛回来的 value 是时间戳（见 datetime-picker-view 的 updateInnerValue） */
const onDateConfirm = ({ value }: { value: number | string }) => {
  updateRecordForm('settleOn', dayjs(value).format('YYYY-MM-DD'))
}

const loadRecord = async () => {
  if (!recordId.value) {
    const draft = createDraftRecord()
    draft.assets = createDefaultAssets(marketStore.msnConfig)
    form.value = draft
    return
  }
  const result = await selectPortfolioWeeklyRecord(recordId.value)
  form.value = createWeeklyRecordDraft(result)
}

const onSave = async () => {
  const payload: PortfolioWeeklyRecord = {
    ...form.value,
    settleOn: form.value.settleOn || dayjs().format('YYYY-MM-DD'),
    updateAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
  }

  if (payload.id) {
    await updatePortfolioWeeklyRecord(payload.id, payload)
  } else {
    await createPortfolioWeeklyRecord(payload)
  }
  Router.back()
}

const onDelete = async () => {
  if (!form.value.id) {
    Router.back()
    return
  }
  const result = await Dialog.show({
    title: '提示',
    message: '删除后不可恢复，请谨慎操作',
    positiveText: '确定',
    negativeText: '取消'
  })
  if (result !== 'confirm') return
  await deletePortfolioWeeklyRecord(form.value.id)
  Router.back()
}

onLoad((options?: any) => {
  recordId.value = options?.id || ''
  uni.setNavigationBarTitle({ title: recordId.value ? '编辑记录资产' : '新增记录资产' })
  loadRecord()
})
</script>

<style lang="scss" scoped>
.record {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fff;

  /* :fixed="false" 时 z-paging 高度 100%，父容器必须给出确定高度 */
  &__paging {
    flex: 1;
  }
  &__form {
    /* 不加 padding：wd-card 自带 margin: 0 15px，叠加页面的 30rpx 会让卡片
       离屏幕边 45rpx，太宽。顶层表单行（结算日期 / 总资产 / 备注 / 资产明细）
       靠 wd-card 的 margin 对齐即可。 */
    /* wd-input / wd-textarea 的 cell 模式自带 10px 上下 + 15px 左右内边距，
       行距与左右留白仍由页面的 __line / __gap 控制，这里清零。
       别再去碰 textarea 的 cell-padding：auto-height 时它撑文本 */
    --wot-input-cell-padding: 0;
    --wot-input-padding: 0;
    --wot-textarea-cell-padding: 0;
    --wot-textarea-padding: 0;
    /* 备注的 textarea 落在 wd-card 里，它自带底色会在卡面上再叠一块灰，
       变成「卡中卡」，跟卡片阴影一起显得特别乱。 */
    --wot-textarea-bg: transparent;
  }
  /* 自绘行 label：28rpx = 14px，跟 wd-input 自带 label（wot 默认
     $-cell-title-fs: 14px）对齐。同一个表单里两种字号并排会看着不齐。 */
  &__label {
    color: #333;
    font-size: 28rpx;
  }
  /* 长文本：label 在上、textarea 在下，整体占一栏 */
  &__stack {
    display: flex;
    flex-direction: column;
  }
  &__label--top {
    margin-bottom: 12rpx;
  }
  &__section-title {
    color: #333;
    font-size: 32rpx;
    font-weight: 500;
  }
  /* 输入行尾部自绘清空 ×（替代 wot clearable 的深灰实心圆）：
     与金额标签里的细 × 同款视觉，40rpx 热区、图标本身 14px 细线 */
  &__clear {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40rpx;
    height: 40rpx;
    margin-left: 8rpx;
    flex-shrink: 0;
  }
  &__clear--hover {
    opacity: 0.6;
  }
  &__line {
    /* 1px 绝对单位：rpx 在 webview / 小程序里会按屏宽换算，
       1rpx 实测只有 0.5px 左右几乎不可见，2rpx 又会随设备变粗。分割线一律用 1px。 */
    height: 1px;
    margin: 24rpx 0;
    background-color: #eee;
  }
  /* 表单结束与底部按钮之间的组件级分隔（与 __line 同色，但不带 margin） */
  &__divider {
    /* 1px：理由见 __line 注释 */
    height: 1px;
    background-color: #eee;
  }

  /* 顶层表单行的左右留白：与 wd-card 自带的 `margin: 0 15px` 对齐，
     两类内容（顶层行 / 卡片）左右边缘齐平。
     顶部补 24rpx：结算日期是表单首行，它上面没有 __line 分隔，
     若不补 padding 会贴着表单顶部、上下不对称（看起来像「上半部分空间被吃掉」）。
     这里补的间距与下方 __line 的 24rpx 一致，整块上下呼吸感对齐。 */
  &__rows {
    padding: 24rpx 30rpx 0;
  }

  /* 资产卡片：wot 默认阴影是 rgba(0,0,0,0.02)，几乎看不见。
     显式加重，让每张卡明显浮起（仍为透底柔阴影，不抢内容）。 */
  :deep(.wd-card) {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
  /* 块内行间留白（不用线）。卡片本身用 wd-card 默认样式，不覆盖。
     16rpx：wot 输入行自带行高，24rpx 在 App 端看着过松。 */
  &__gap {
    height: 16rpx;
  }
  &__asset-title {
    color: #333;
    font-size: 30rpx;
    font-weight: 500;
  }
  /* 删除按钮：圆形 + 灰底，与笔记附件 / 加号钮同款范式 */
  &__asset-del {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    background-color: #f5f5f5;
    flex-shrink: 0;
  }

  /* 金额行：与 wd-input cell 同节奏 —— label 33% + value flex 1，
     自然和 wd-input 的 label 上下基线对齐 */
  &__field {
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 48rpx;
    text-align: left;
  }
  /* 金额行的自绘 label：要跟同页 wd-input 的「名称 / 权重(%)」label 上下对齐，
     字号也跟它一致（28rpx = 14px） */
  &__field-label {
    width: 33%;
    margin-right: 15px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 28rpx;
    flex-shrink: 0;
  }
  &__field-value {
    flex: 1;
    min-width: 0;
    /* 金额区整组靠右，跟上面「名称 / 权重(%)」的右对齐保持一条线 */
    text-align: right;
  }
  /* 金额区整组贴右。真正的「标签 + 加号」折行与右对齐由 DeleteableTags
     内部的 .tags（align="end"）负责，这里只负责把整块推到 value 区右侧。 */
  &__amount-box {
    display: flex;
    justify-content: flex-end;
  }
  /* 圆形加号钮：52rpx 与标签同高（不再是 60rpx 的突兀大圆），底色由模板给 */
  &__amount-add {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 52rpx;
    height: 52rpx;
    border-radius: 50%;
    flex-shrink: 0;
  }
}
</style>
