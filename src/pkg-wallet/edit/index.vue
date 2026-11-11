<template>
  <view :style="themeVars" class="edit">
    <z-paging
      v-model="pagingList"
      class="edit__paging"
      :fixed="false"
      :auto="false"
      :refresher-enabled="false"
      :loading-more-enabled="false"
    >
      <view class="edit__form">
        <wd-form ref="formRef" :model="form" :rules="rules">
          <view v-for="key in walletKeys" :key="key">
            <template v-if="isArrayField(key)">
              <Flex horizontal justify="space-between">
                <text class="edit__label">{{ WalletMaps[key] }}</text>
                <MoreButton :label="arrayLabel(key)" @press="openInputer(key)" />
              </Flex>
              <view v-if="arrayValue(key).length" class="edit__tags">
                <!-- 可删除标签：公共组件 DeleteableTags（wot 的 wd-tag closable 关闭图标写死深灰实心圆，有 bug） -->
                <DeleteableTags :datas="arrayValue(key)" @delete="idx => deleteTag(key, idx)" />
              </view>
            </template>
            <wd-input
              v-else
              :model-value="stringValue(key)"
              :label="WalletMaps[key]"
              :prop="key"
              required
              clearable
              align-right
              no-border
              :placeholder="`${WalletMaps[key]} / k`"
              @update:model-value="value => onKeyInput(key, value)"
            />
            <view class="edit__line" />
          </view>

          <wd-input
            :model-value="form.indexSh000001 || ''"
            label="上证指数"
            prop="indexSh000001"
            required
            clearable
            align-right
            no-border
            placeholder="请输入"
            @update:model-value="value => onKeyInput('indexSh000001', value)"
          />
          <view class="edit__line" />

          <wd-input
            :model-value="form.indexSpx || ''"
            label="标普500"
            prop="indexSpx"
            required
            clearable
            align-right
            no-border
            placeholder="请输入"
            @update:model-value="value => onKeyInput('indexSpx', value)"
          />
          <view class="edit__line" />

          <!--
            本周圈外进出：逐笔金额数组（[14, -5]），解释项，不是第八项资产（绝不进 WalletMaps 求和）。
            沿用 fund/carpool 的 MoreButton + InputDialog + DeleteableTags：一笔只填金额，
            合计自动算，不用自己按计算器算完再填一个总数。
          -->
          <Flex horizontal justify="space-between">
            <text class="edit__label">本周圈外进出</text>
            <MoreButton :label="flowLabel" @press="openFlowInputer" />
          </Flex>
          <view v-if="flowTags.length" class="edit__tags">
            <DeleteableTags :datas="flowTags" @delete="deleteFlow" />
          </view>
          <text class="edit__tip">工资、外部转入填正数，消费、转出圈外填负数；圈内互转不记。留空 = 未记录</text>
          <Flex horizontal class="edit__flow-total" justify="space-between">
            <text class="edit__label">本周净流入（自动合计）</text>
            <text class="edit__static">{{ flowTotalText }}</text>
          </Flex>
          <view class="edit__line" />

          <Flex horizontal justify="space-between">
            <text class="edit__label">创建时间</text>
            <text class="edit__static">{{ form.createAt || '-' }}</text>
          </Flex>
          <view class="edit__line" />

          <Flex horizontal justify="space-between">
            <text class="edit__label">结算周期</text>
            <!-- 用 wot 的 wd-datetime-picker 替代 uni 原生 <picker>；
                 这里走它的默认插槽自己当触发器（不传则渲染成 wd-cell），
                 这样这一行的排版仍由外层 Flex 控制，不会被 wd-cell 自带的样式带偏 -->
            <wd-datetime-picker
              :model-value="settleOnValue"
              type="date"
              :display-format="displaySettleOn"
              :root-portal="true"
              :z-index="999"
              @confirm="onDateConfirm"
            >
              <MoreButton :label="settleLabel" />
            </wd-datetime-picker>
          </Flex>
          <view class="edit__line" />

          <Flex horizontal justify="space-between">
            <text class="edit__label">合计</text>
            <text class="edit__total">
              {{ totalSum }}
              <text class="edit__total-unit"> k</text>
            </text>
          </Flex>
          <!-- ★最后一行后不画 __line，整张表单的尾巴由表单外的 __divider 接 -->
        </wd-form>
      </view>

      <view class="edit__divider" />

      <template #bottom>
        <Flex horizontal justify="space-between" :custom-style="{ padding: '20rpx 30rpx', gap: '12px' }">
          <wd-button
            block
            plain
            :round="false"
            :custom-style="'flex: 1; min-width: 0; color: ' + theme"
            @click="onDelete"
          >
            删除
          </wd-button>
          <wd-button
            block
            :round="false"
            :disabled="!checkForm"
            :custom-style="'flex: 1; min-width: 0; background-color: ' + theme"
            @click="onSave"
          >
            保存
          </wd-button>
        </Flex>
      </template>
    </z-paging>

    <InputDialog
      :show="inputer.show"
      :title="inputer.title"
      :message="inputer.message"
      @close="inputer.show = false"
      @confirm="onAppend"
    />
    <DialogContainer />
  </view>
  <ToastContainer />
</template>

<script lang="ts" setup>
/**
 * 新增 / 编辑钱包
 * 由 cloud-react-native/src/screens/EditWallet/index.tsx 迁移。
 *
 * - 标题栏用 uni-app 原生导航栏，标题随「新增 / 编辑」切换，
 *   通过 uni.setNavigationBarTitle 写入；不再迁移 RN 版的自定义 ToolBar。
 * - RN 的 DateTimePicker 自定义组件 -> wot 的 wd-datetime-picker（type=date，展示口径仍是「YYYY年N周」）。
 * - KeyboardAvoidingView -> uni-app 输入框聚焦由系统自动顶起，未额外处理。
 * - @tanstack/react-query 的 useMutation -> 直接用 api 层的 mergeWallet / deleteWallet。
 * - 表单：wot 的 wd-form（非数组资产项全部填写 + 两个指数都填写，rules 校验）；
 *   可删除标签用公共组件 DeleteableTags（wot 的 wd-tag closable 有写死的样式 bug）。
 * - 「本周圈外进出」是选填的解释项（不进 WalletMaps 求和、不设 rules）：逐笔只填金额，
 *   存成 JSON 数字数组 [14, -5]，净流入由前端自动求和；无明细写 null = 未记录。
 *   沿用 fund/carpool 的 InputDialog + DeleteableTags 交互，单位与其它科目一致为 k。
 */
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import { deleteWallet, mergeWallet, selectMsnStocks, selectWallet } from '@/api'
import { Router } from '@/common/router'
import { GLOBAL_INDEX_ID, msnCodeOf } from '@/constants/config'
import {
  calculateWalletFormSum,
  netInflowTag,
  netInflowTotal,
  parseNetInflow,
  WalletMaps
} from '@/constants/wallet'
import Flex from '@/components/Flex.vue'
import InputDialog from '@/components/InputDialog.vue'
import MoreButton from '@/components/MoreButton.vue'
import DeleteableTags from '@/components/DeleteableTags.vue'
import { Dialog } from '@/components/Dialog'
import DialogContainer from '@/components/DialogContainer.vue'
import ToastContainer from '@/components/ToastContainer.vue'
import { useUserStore } from '@/stores/user'
import { cloneDeep, nanoid, toast } from '@/utils'
import type { TWallet } from '@/types/wallet'
import type { FormInstance, FormRules } from 'wot-design-uni/components/wd-form/types'
import { useThemeVars } from '@/composables/useThemeVars'

const themeVars = useThemeVars()


dayjs.extend(isoWeek)

const walletKeys = Object.keys(WalletMaps) as Array<keyof typeof WalletMaps>

const formRef = ref<FormInstance>()

/** 非数组资产项全部填写 + 两个指数都填写（数组项 fund/carpool 走标签录入，不校验） */
const rules: FormRules = {}
walletKeys.forEach(key => {
  rules[key] = [{ required: true, message: `请填写${WalletMaps[key]}` }]
})
rules.indexSh000001 = [{ required: true, message: '请填写上证指数' }]
rules.indexSpx = [{ required: true, message: '请填写标普500' }]

/*
 * 底部按钮：直接用 wot 的 wd-button，尺寸/圆角全走 wot 的 size 默认值，
 * 这里的 custom-style 只传颜色（「删除」镂空取主题色、「保存」实底用主题色）。
 */

const userStore = useUserStore()
const theme = computed(() => userStore.theme)

const id = ref('')
const pagingList = ref<unknown[]>([])
const form = ref<TWallet>({
  fund: [],
  carpool: [],
  settleOn: dayjs().format('YYYY-MM-DD')
} as unknown as TWallet)

const inputer = ref({ show: false, title: '提示', message: '', name: '' })

const arrayValue = (key: keyof typeof WalletMaps) => {
  const value = (form.value as unknown as Record<string, unknown>)[key]
  return Array.isArray(value) ? (value as string[]) : []
}

const isArrayField = (key: keyof typeof WalletMaps) =>
  Array.isArray((form.value as unknown as Record<string, unknown>)[key])

const stringValue = (key: keyof typeof WalletMaps) =>
  `${(form.value as unknown as Record<string, unknown>)[key] ?? ''}`

const updateForm = (key: string, value: any) => {
  const next = cloneDeep(form.value) as unknown as Record<string, unknown>
  next[key] = value
  form.value = next as unknown as TWallet
}

/** wd-input 的 update:model-value 直接收字符串 */
const onKeyInput = (key: string, value: string) => {
  updateForm(key, value)
}

const arrayLabel = (key: keyof typeof WalletMaps) => {
  const count = arrayValue(key).length
  return count > 0 ? `已填写${count}项` : '请填写'
}

const totalSum = computed(() => calculateWalletFormSum(form.value))

/**
 * 本周圈外进出：form.netInflow 是唯一数据源（数字数组 / null），
 * 标签与合计全由它派生，不另开 ref，避免编辑态和提交值不同步。
 */
const flowItems = computed(() => parseNetInflow(form.value.netInflow))
const flowTags = computed(() => flowItems.value.map(netInflowTag))
const flowLabel = computed(() =>
  flowItems.value.length ? `已记录${flowItems.value.length}笔` : '请填写'
)
const flowTotalText = computed(() => {
  const total = netInflowTotal(form.value.netInflow)
  return total === null ? '未记录' : netInflowTag(total)
})

const openFlowInputer = () => {
  inputer.value = {
    show: true,
    title: '添加一笔圈外进出',
    message: '只填金额，单位 k：存入填 14，取出填 -5',
    name: 'netInflow'
  }
}

const setFlowItems = (items: number[]) => {
  updateForm('netInflow', items.length ? items : null)
}

/** 删标签即删这一笔；删光写 null，表示「未记录」而不是合计 0 */
const deleteFlow = (index: number) => {
  const next = [...flowItems.value]
  next.splice(index, 1)
  setFlowItems(next)
}

const settleLabel = computed(() => {
  const date = form.value?.settleOn
  if (!date) return '请选择'
  return `${dayjs(date).format('YYYY年')}${dayjs(date).isoWeek()}周`
})

/**
 * wd-datetime-picker（type=date）的入参按时间戳传：
 * 组件内部是 `new Date(value)`，字符串会被当 UTC 解析，时间戳最稳。
 */
const settleOnValue = computed(() => dayjs(form.value?.settleOn).valueOf())

/**
 * 展示口径与原来完全一致（`2026年40周`，ISO 周）。
 * displayFormat 收到的是当前选中的列项 [{ value: 年 }, { value: 月 }, { value: 日 }]
 * （类型是 DatetimePickerDisplayFormat，参数签名固定为 Record<string, any>[]），
 * 用 dayjs 的 setter 组日期，避免自己拼字符串再解析。
 */
const displaySettleOn = (items: Record<string, any>[]) => {
  const [year, month, date] = items.map(it => Number(it.value))
  const value = dayjs()
    .year(year)
    .month(month - 1)
    .date(date)
  return `${value.format('YYYY年')}${value.isoWeek()}周`
}

/** confirm 抛回来的 value 是时间戳（见 datetime-picker-view 的 updateInnerValue） */
const onDateConfirm = ({ value }: { value: number | string }) => {
  updateForm('settleOn', dayjs(value).format('YYYY-MM-DD'))
}

/** 非数组资产项全部填写 + 两个指数都填写 */
const checkForm = computed(() => {
  const walletFilled = walletKeys
    .map(key => (form.value as unknown as Record<string, unknown>)[key])
    .filter(value => !Array.isArray(value))
    .every(value => !!value)
  const indexFilled = !!form.value?.indexSh000001 && !!form.value?.indexSpx
  return walletFilled && indexFilled
})

const openInputer = (key: keyof typeof WalletMaps) => {
  inputer.value = {
    show: true,
    title: '提示',
    message: `请输入${WalletMaps[key]}`,
    name: key as string
  }
}

const onAppend = (s: string) => {
  inputer.value.show = false
  if (!s) return
  const name = inputer.value.name
  /** 圈外进出：一笔只认一个金额，正数存入 / 负数取出，事由不记 */
  if (name === 'netInflow') {
    const amount = parseFloat(s)
    if (!Number.isFinite(amount)) {
      toast('请填写金额，如 14 或 -5')
      return
    }
    setFlowItems([...flowItems.value, amount])
    return
  }
  const next = cloneDeep(form.value) as unknown as Record<string, unknown>
  next[name] = [...arrayValue(name as keyof typeof WalletMaps), s]
  form.value = next as unknown as TWallet
}

const deleteTag = (key: keyof typeof WalletMaps, index: number) => {
  const next = cloneDeep(form.value) as unknown as Record<string, unknown>
  const list = [...arrayValue(key)]
  list.splice(index, 1)
  next[key] = list
  form.value = next as unknown as TWallet
}

/**
 * 新增时用 MSN 行情预填上证与标普500，失败则留空由用户手填。
 *
 * ★ id 不写死在页面里：统一取自选指数枚举（constants/config 的 GLOBAL_INDEX_ID），
 *   MSN 的 ids 又不认 `fi-` 前缀（带前缀只回空壳、无 quote），所以传参前 msnCodeOf() 剥掉。
 */
const loadIndexes = async () => {
  try {
    const [shResult, spxResult] = await Promise.all([
      selectMsnStocks(msnCodeOf(GLOBAL_INDEX_ID.SH)),
      selectMsnStocks(msnCodeOf(GLOBAL_INDEX_ID.SPX))
    ])
    const shPrice = (shResult as any)?.[0]?.quote?.price
    const spxPrice = (spxResult as any)?.[0]?.quote?.price
    if (typeof shPrice === 'number') {
      updateForm('indexSh000001', `${shPrice}`)
    }
    if (typeof spxPrice === 'number') {
      updateForm('indexSpx', `${spxPrice}`)
    }
  } catch (error) {
    console.log('loadIndexes msn error: ', error)
  }
}

const loadWallet = async () => {
  const next = cloneDeep(form.value) as unknown as Record<string, unknown>
  if (id.value) {
    form.value = await selectWallet(id.value)
  } else {
    next.id = nanoid()
    next.createAt = dayjs().format('YYYY-MM-DD HH:mm:ss')
    form.value = next as unknown as TWallet
    await loadIndexes()
  }
  const last = cloneDeep(form.value) as unknown as Record<string, unknown>
  last.updateAt = dayjs().format('YYYY-MM-DD HH:mm:ss')
  form.value = last as unknown as TWallet
}

const onDelete = async () => {
  const result = await Dialog.show({
    title: '提示',
    message: '删除后不可恢复，请谨慎操作',
    positiveText: '确定',
    negativeText: '取消'
  })
  if (result !== 'confirm') return
  await deleteWallet(form.value.id)
  Router.back()
}

const onSave = async () => {
  const check = await formRef.value?.validate()
  if (check && !check.valid) {
    toast(check.errors[0]?.message || '请检查表单后重试')
    return
  }
  /**
   * netInflow 统一写成 JSON 数字数组：老记录里的单个数字经 parseNetInflow 变成 [8]，
   * 无明细写 null = 未记录，绝不写 0（0 会把存进去的钱重新算成收益）。
   */
  const flows = flowItems.value
  const payload: TWallet = {
    ...form.value,
    netInflow: flows.length ? flows : null
  }
  await mergeWallet(payload)
  toast('操作成功')
  Router.back()
}

onLoad((options?: any) => {
  id.value = options?.id || ''
  uni.setNavigationBarTitle({
    title: id.value ? '编辑钱包' : '新增钱包'
  })
  loadWallet()
})
</script>

<style lang="scss" scoped>
.edit {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fff;

  &__paging {
    flex: 1;
  }
  &__form {
    padding: 30rpx;
    /* wd-input 的 cell 模式自带 10px 上下 + 15px 左右内边距，
       行距与左右留白仍由页面的 __form / __line 控制，这里清零 */
    --wot-input-cell-padding: 0;
    --wot-input-padding: 0;
    /* label 字号（wd-input 自带 label 跟自绘 __label 对齐）已在 App.vue 全局声明
       --wot-input-fs / --wot-cell-title-fs: 32rpx，页面不用再覆盖。 */
  }
  /* 可删除标签外层容器：DeleteableTags 内部已 flex 折行，这里只管整块与上方留白 */
  &__tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 16rpx;
    margin-top: 16rpx;
  }
  /* 自绘行 label：28rpx = 14px，跟 wd-input 自带 label（wot 默认
     $-cell-title-fs: 14px）对齐。同一个表单里两种字号并排会看着不齐。 */
  &__label {
    font-size: 28rpx;
    color: #333;
  }
  &__static {
    font-size: 28rpx;
    color: #333;
  }
  /* 圈外进出填写口径：<text> 是行内元素，display:block 才能按容器宽度换行 */
  &__tip {
    display: block;
    margin-top: 8rpx;
    color: #999;
    font-size: 22rpx;
    line-height: 1.5;
  }
  /* 自动合计行与上方说明拉开一点，不与标签挤在一起 */
  &__flow-total {
    margin-top: 12rpx;
  }
  &__total {
    color: #ff5252;
    font-size: 40rpx;
  }
  &__total-unit {
    font-size: 28rpx;
  }
  &__line {
    /* 1px 绝对单位：rpx 在 webview / 小程序里会按屏宽换算，
       1rpx 实测只有 0.5px 左右几乎不可见，2rpx 又会随设备变粗。分割线一律用 1px。 */
    height: 1px;
    background-color: #eee;
    margin: 24rpx 0;
  }
  /* 表单结束与底部按钮之间的组件级分隔（与 __line 同色，但不带 margin） */
  &__divider {
    /* 1px：理由见 __line 注释 */
    height: 1px;
    background-color: #eee;
  }
}
</style>
