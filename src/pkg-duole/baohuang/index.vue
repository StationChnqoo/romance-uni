<!--
  保皇记牌器
  由 cn.xiaopacai.duole/src/screens/Baohuang/index.tsx + components/Person.tsx 迁移。
  分包 pkg-duole 的第一款游戏（多乐小游戏都收在这个分包里，一个游戏一个子目录）。

  牌桌 2×2 四家：第一行 上联 / 下联，第二行 上家 / 下家（与原 RN 的排布一致）。
  点某家的卡片把录入位切到「出牌记录」，点进贡 / 吃贡的标签框切到对应槽位，
  再用底部软键盘往当前槽位写字符：
    数字 / 花牌 = 牌面，鹰 / 小王 / 大王 = 文字（鹰 / 小 / 大），点 / 烧 / 闷 / 落 / 让 = 动作文字，
    「下一轮」写 '#' 分组，「删除」退格，「重置」清空整桌。

  ★ 布局（2026-10-05 重排，修掉跨端高度不一致）
  之前是 `height: 100vh` + 牌桌/两行都 `flex: 1`：
  各端拿到的视口高不一样（原生导航栏算不算进去、小程序 windowHeight 口径、
  Android webview 的 100vh），剩余高度被两行等分后卡片被拉伸，
  于是出现「卡片一大一小、每张下沿空一大截、行与行之间空一大条」。
  现在改成：
   - 上半部 z-paging 伪容器。它不是分页列表：list 恒空、关掉加载更多，
     只借它的滚动 + 原生导航栏避让（:fixed="true"，本页无顶部固定头，同 pkg-media/list）。
     内容高度完全由卡片撑开，高度不够时能滚，够时也不会有多余空白。
     ★ 下拉刷新留着：往下拉一下 = 重置整桌（先弹确认）。
   - 下半部软键盘交给 wd-floating-panel 包裹。面板自带拖拽把手，在
     「只留把手看牌桌」与「设置行 + 键盘整块展开」两档之间吸附；
     键盘自己那条把手已删掉，避免两个把手。面板顶部有投影（custom-style 内联），
     和灰底牌桌拉开层次。
   - 滚动区底部按面板当前高度动态留白，键盘展开时最后一行卡片也不会被盖住。

  与原 RN 的差异：
   - 顶部导航用原生导航栏（pages.json navigationStyle: default），不再自绘 ToolBar。
   - 主题色统一走 userStore.theme（RN 里是 useCaches.theme，可单独设置）。
   - 设置项（区域玩法 40/30 张、按键震动）从 RN 的「我的 → 游戏设置」搬到键盘正上方一行，
     存进 stores/duole.ts（整包 persist），与其它小游戏共用。
   - 牌局不落页面本地存储，而是直接存 stores/duole.ts 的 baohuangGame（整包 persist）：
     每次录入变化都会持久化，重新进页面 / 重启 App 会自动恢复上一次的局面
     （对应 RN 的 autoRevertGame，默认开；不再维护「历史牌局列表」）。
     页面里不许直接 uni.setStorageSync —— 项目口径：要缓存一律走 pinia store + persist。
   - 清空牌桌两个入口：键盘的「C.重置」与**下拉刷新**，都会先弹 Dialog 确认。
   - 原 RN 底部的 insets.bottom 占位去掉：iOS 安全区由 manifest 统一避让。
-->
<template>
  <view :style="themeVars" class="baohuang">
    <!-- 牌桌：z-paging 伪容器（list 恒空、插槽渲染，故 hide-empty-view） -->
    <!-- 下拉刷新 = 重置整桌：下拉会走一次 queryList，里面先弹确认再清 -->
    <z-paging
      ref="pagingRef"
      v-model="list"
      class="baohuang__paging"
      :fixed="true"
      :auto="true"
      :refresher-enabled="true"
      :loading-more-enabled="false"
      :hide-empty-view="true"
      @query="queryList">
      <!-- 底部留白跟着面板当前高度走，键盘收起后卡片自动补到底 -->
      <!--
        ★ 每张卡都包一层 .baohuang__cell 再放进行里。
        flex 行里真正的 flex item 是「自定义组件的节点」，不是组件内部的 .person：
        uni-app 会把 <Person> 渲染成 <person> 这样的自定义元素（小程序端是组件节点），
        它默认 flex: 0 1 auto / flex-grow: 0，宽度按内容收缩 —— 写在 .person 上的 flex 够不着这层，
        两列就会被「未出牌面 / 出牌记录」的长文本拽着走，右边留一大条空白。
        垫一层普通 <view> 当 flex item（等分只认它），.person 在里面 width: 100% 填满。
      -->
      <view class="baohuang__table" :style="{ paddingBottom: padBottom }">
        <view class="baohuang__row">
          <view class="baohuang__cell">
            <Person
              class="baohuang__card"
              :player="players[0]"
              :current-player-index="currentPlayerIndex"
              :sum="sum"
              :theme="theme"
              @press="onPlayerPress" />
          </view>
          <view class="baohuang__cell">
            <Person
              class="baohuang__card"
              :player="players[3]"
              :current-player-index="currentPlayerIndex"
              :sum="sum"
              :theme="theme"
              @press="onPlayerPress" />
          </view>
        </view>
        <view class="baohuang__row">
          <view class="baohuang__cell">
            <Person
              class="baohuang__card"
              :player="players[1]"
              :current-player-index="currentPlayerIndex"
              :sum="sum"
              :theme="theme"
              @press="onPlayerPress" />
          </view>
          <view class="baohuang__cell">
            <Person
              class="baohuang__card"
              :player="players[2]"
              :current-player-index="currentPlayerIndex"
              :sum="sum"
              :theme="theme"
              @press="onPlayerPress" />
          </view>
        </view>
      </view>
    </z-paging>

    <!--
      软键盘：浮动面板包裹，可拖拽收起 / 展开。
      顶部投影走 custom-style 内联（不写类名 + 页面样式）：内联到根节点的 style 上，
      各端都能命中，不依赖 wot 组件的样式穿透规则；用 px 不用 rpx，内联 rpx 的换算各端有差异。
      面板自身的圆角是 border-top-left/right-radius（SCSS 里），投影会跟着圆角走。
    -->
    <wd-floating-panel
      v-model:height="panelHeight"
      :anchors="panelAnchors"
      :duration="240"
      :show-scrollbar="false"
      custom-style="box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08)">
      <!--
        设置行：区域玩法（决定总牌数）+ 按键反馈（震动）。
        原 RN 在「我的 → 游戏设置」里，记牌器这里放到键盘正上方，
        玩到一半要换 40/30 张或关震动，抬手就能改。
      -->
      <view class="baohuang__setting">
        <view class="baohuang__seg">
          <view
            v-for="item in AREAS"
            :key="item.value"
            class="baohuang__seg-item"
            :style="segStyle(item.value)"
            @click="duoleStore.baohuangArea = item.value">
            <text class="baohuang__seg-text">{{ item.label }}</text>
          </view>
        </view>

        <view class="baohuang__feedback">
          <text class="baohuang__feedback-text">按键震动</text>
          <wd-switch
            v-model="duoleStore.keyboardFeedback"
            size="16px"
            :active-color="theme"
            inactive-color="#eaeaea" />
        </view>
      </view>

      <SoftKeyboard
        @key-press="onKeyBoardPress"
        @delete-press="onDeletePress"
        @clear-press="onClearPress" />
    </wd-floating-panel>

    <!-- Dialog.show 的渲染端：重置确认走它（wd-floating-panel 会盖住普通弹层，容器自带 root-portal） -->
    <DialogContainer />
  </view>
  <ToastContainer />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { BAOHUANG_SUM, useDuoleStore } from '@/stores/duole'
import type { BaohuangArea } from '@/stores/duole'
import type { BaohuangPlayer } from '../types'
import { Dialog } from '@/components/Dialog'
import DialogContainer from '@/components/DialogContainer.vue'
import ToastContainer from '@/components/ToastContainer.vue'
import {getWindowWidth, toast} from '@/utils'
import Person from './components/Person.vue'
import SoftKeyboard from './components/SoftKeyboard.vue'
import { useThemeVars } from '@/composables/useThemeVars'

const themeVars = useThemeVars()


const userStore = useUserStore()
const theme = computed(() => userStore.theme)

/** 多乐小游戏的设置（区域玩法 / 按键震动），持久化在 stores/duole.ts */
const duoleStore = useDuoleStore()

/** 区域玩法选项，标签直接带上张数——它决定整桌的「剩余张数」基数 */
const AREAS: { value: BaohuangArea; label: string }[] = [
  { value: 'wf', label: '潍坊40张' },
  { value: 'fk', label: '疯狂30张' }
]

/** 选中的区域 chip：底色 + 描边用主题色（文字色靠继承变白，见样式里的 color） */
const segStyle = (value: BaohuangArea) =>
  duoleStore.baohuangArea === value
    ? { backgroundColor: theme.value, borderColor: theme.value, color: '#fff' }
    : {}

/** 总牌数：潍坊保皇 40 张 / 疯狂保皇 30 张（原 RN 的 { wf: 40, fk: 30 }[gameArea]） */
const sum = computed(() => BAOHUANG_SUM[duoleStore.baohuangArea])

/* ---------------- 浮动键盘面板的高度档位 ---------------- */

/**
 * wd-floating-panel 的拖拽头高度（px）：
 * wot 的 --wot-floating-panel-header-height 默认 30px。
 * 它撑在面板内容之上，所以锚点要把这 30px 算进去，键盘才不会被裁一截。
 */
const PANEL_HEADER_PX = 30

/**
 * 软键盘自身高度（rpx）：数字与 SoftKeyboard.vue 的排版一一对应
 * （3 行 × 56rpx + 2 × 16rpx 行距 + 底部键 20 + 56 + 下内边距 24 = 300rpx）。
 * 改键盘的键高 / 行距 / 内边距，这个数要同步改。
 */
const KEYBOARD_HEIGHT_RPX = 300

/**
 * 键盘上方那行设置（区域玩法 / 按键震动）的高度（rpx）：
 * 48rpx 的 chip + 16rpx 下间距 = 64rpx，与 `.baohuang__setting` 的样式一一对应。
 */
const SETTING_HEIGHT_RPX = 64

const windowWidth = getWindowWidth()
/** rpx → px 换算比（750rpx 铺满屏宽） */
const pxPerRpx = windowWidth / 750

/** 展开档：拖拽头 + 设置行 + 整块键盘 */
const PANEL_MAX =
  Math.ceil((SETTING_HEIGHT_RPX + KEYBOARD_HEIGHT_RPX) * pxPerRpx) +
  PANEL_HEADER_PX
/** 收起档：只留拖拽头，把牌桌整个让出来 */
const PANEL_MIN = PANEL_HEADER_PX + 10

const panelAnchors = [PANEL_MIN, PANEL_MAX]
/** 当前面板露出高度（px），由 wd-floating-panel 拖拽时回写 */
const panelHeight = ref(PANEL_MAX)
/** 滚动区底部留白 = 面板当前高度，面板一收卡片就补到底 */
const padBottom = computed(() => `${panelHeight.value}px`)

/* ---------------- 牌局 ---------------- */

/**
 * 牌局直接以 store 为唯一数据源（页面里不再有本地 ref）：
 * 四个 <Person> 拿到的就是 store 里的对象，改一个字符都会 persist
 * → 重进页面 / 重启 App 自动恢复上一次的局面。
 * 座位名与空牌结构见 stores/duole.ts 的 createBaohuangGame()。
 */
const players = computed(() => duoleStore.baohuangGame.players)
const currentPlayerIndex = computed(() => duoleStore.baohuangGame.currentPlayerIndex)

/** z-paging 伪容器：本页不是列表，list 恒空，只借它的滚动 / 下拉刷新 */
const pagingRef = ref<any>(null)
const list = ref<unknown[]>([])

/** 进页时 z-paging 会先自动跑一次 query，那一次不算「下拉刷新」 */
let queryOnce = false

/**
 * 没有分页数据，撑一次就完事。
 * 用户下拉刷新时 z-paging 会再调一次 —— 那一下等于「重置整桌」。
 */
async function queryList() {
  if (queryOnce) {
    await confirmReset()
  } else {
    queryOnce = true
  }
  pagingRef.value?.complete([])
}

/** 切换录入位：整卡点「出牌记录」，进贡 / 吃贡点各自的标签框 */
const onPlayerPress = (player: BaohuangPlayer, index: number) => {
  const game = duoleStore.baohuangGame
  game.currentPlayerIndex = player.id
  game.players[player.id].currentCardIndex = index
  // 换人 / 换槽位时，给还没标记「下一轮」的出牌记录补上分隔符
  game.players.forEach(p => {
    if (p.cards[2] !== '' && !p.cards[2].endsWith('#')) {
      p.cards[2] += '#'
    }
  })
}

const onKeyBoardPress = (card: string) => {
  const game = duoleStore.baohuangGame
  const player = game.players[game.currentPlayerIndex]
  player.cards[player.currentCardIndex] += card
}

const onDeletePress = () => {
  const game = duoleStore.baohuangGame
  const player = game.players[game.currentPlayerIndex]
  const value = player.cards[player.currentCardIndex]
  if (value.length > 0) {
    player.cards[player.currentCardIndex] = value.slice(0, -1)
  }
}

/**
 * 重置整桌 —— 键盘的「C.重置」与下拉刷新共用这一个入口。
 * 清空是破坏性操作，先 Dialog 确认；取消就什么都不动（下拉刷新照常收尾回弹）。
 * @returns 是否真的重置了
 */
async function confirmReset(): Promise<boolean> {
  const result = await Dialog.show({
    title: '重置牌局',
    message: '确定要清空四家的进贡、吃贡和出牌记录吗？',
    positiveText: '重置',
    negativeText: '取消'
  })
  if (result !== 'confirm') return false
  duoleStore.resetBaohuangGame()
  toast('已重置')
  return true
}

/** 键盘的「C.重置」 */
const onClearPress = () => {
  confirmReset()
}
</script>

<style lang="scss" scoped>
/*
  根节点不设高度：z-paging 走 :fixed="true" 自己按视口贴满，
  浮动面板走 position: fixed 贴视口底部，两者都不需要父级给高。
  这里一旦写 height: 100vh，就又回到「各端 100vh 口径不一」的老坑。
*/
.baohuang {
  background-color: #f5f5f5;

  &__paging {
    background-color: #f5f5f5;
  }

  /*
    卡片高度全由内容撑开，这里绝不能给 flex: 1 / height：一旦分高，
    卡片就被拉成「每行等分剩余高度」，各端量出的视口不同 → 一大一小 + 大段空白。
    两行的等宽靠 .baohuang__cell 的 flex（见下）。
  */
  &__table {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    padding: 20rpx 20rpx 0;
  }

  /* 行距 / 列距都用 margin，不用 flex gap / row-gap：老 Android webview 不认（同键盘那边的坑） */
  &__row + &__row {
    margin-top: 12rpx;
  }

  &__row {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  /*
    ★ 屏幕宽度等分两列的唯一支点。
    这里是行里真正的 flex item（普通 <view>，各端都认），flex-basis 0 让宽度只由 flex 分配决定。
    ⚠️ flex-direction 必须是 column，不能是默认的 row：
      cell 里装的是「自定义组件节点」（<Person> → <person> 元素），它也是个 flex item。
      row 方向下宽度是主轴 → 由 flex-basis/grow 决定，它 grow: 0 → 按内容收缩，卡片照样窄；
      column 方向下宽度变成交叉轴 → align-items: stretch 直接把它拉满，这才是「撑满」。
    min-width: 0 必须有：否则单元格的自动最小尺寸会被内部长文本（出牌记录）顶大，两列又不相等。
  */
  &__cell {
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
    min-width: 0;
  }

  &__cell + &__cell {
    margin-left: 12rpx;
  }

  /*
    这一条作用在 <person>「自定义组件节点」上：页面里给组件写的 class 会透传到该节点，
    与 scoped 的 data-v 一起编成 `.baohuang__card.data-v-xxx`。
    宽度已经由 cell 的交叉轴 stretch 管住了，这里只管主轴 —— 让节点也撑满 cell 的高度，
    同行两张卡即使内容长短不同也不会一高一矮（.person 的 height: 100% 再接住）。
  */
  &__card {
    flex: 1;
    min-width: 0;
  }

  /* ---------------- 键盘上方的设置行 ---------------- */

  /* 上下留白见 index.vue 的 SETTING_HEIGHT_RPX（48 chip + 16 下间距） */
  &__setting {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 24rpx 16rpx;
  }

  &__seg {
    display: flex;
    flex-direction: row;
  }

  &__seg-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48rpx;
    padding: 0 16rpx;
    background-color: #f5f5f5;
    border: 2rpx solid #ddd;
    border-radius: 8rpx;
    /* 未选中时的文字色：<text> 是行内元素，color 会继承，所以只在这里给一次。
       选中态的底色 / 描边 / 白字由 segStyle() 内联覆写（主题色各端不一致，必须内联）。 */
    color: #666;
  }

  /* chip 间距别用 flex gap：老 Android webview 不认（同键盘那边的坑） */
  &__seg-item + &__seg-item {
    margin-left: 12rpx;
  }

  &__seg-text {
    font-size: 24rpx;
  }

  &__feedback {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &__feedback-text {
    margin-right: 12rpx;
    font-size: 24rpx;
    color: #666;
  }
}
</style>
