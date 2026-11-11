<!--
  保皇记牌器 - 软键盘
  由 cn.xiaopacai.duole/src/components/SoftKeyboard/index.tsx 迁移。

  三组按键，从左到右：动作（点/烧/闷/落/让）、牌面（0 J Q K A 鹰 小王 大王）、数字（7~1）。
  底部三个宽键：重置 / 下一轮 / 删除。

  排版为什么不沿用 RN 的 flex-wrap + row-gap：
   - row-gap 在 Android 老 webview（flex 布局的 row-gap 要 Chrome 84+）里不生效，
     一换行就会挤成一片 —— 这正是「兼容性」问题之一。
   - 改成「显式分行 + 行间距 margin」，任何端都一样，而且整块高度可以算准。
  高度账（父级 wd-floating-panel 的锚点直接按这个数算，改这里要同步改 index.vue）：
   上下内边距 0 + 24rpx
   键盘区 3 行 × 56rpx + 2 × 16rpx 行距 = 200rpx
   底部宽键 20rpx 间距 + 56rpx
   → 合计 300rpx

  顶部不再自带拖拽把手（灰色小圆条）：外层已经用 wd-floating-panel 包了，它有把手，
  这里再来一条就是两个把手打架。背景也交给面板（内容区本来就是白的，且带顶部圆角）。
  按键触发一次轻震动，受 stores/duole.ts 里「按键震动」开关控制（原 RN 的 isKeyboardFeedback，默认开）；
  唯独「下一轮」在原实现里就不震动，照搬。
-->
<template>
  <view class="kb">
    <view class="kb__groups">
      <view class="kb__group">
        <view v-for="(row, ri) in actions" :key="ri" class="kb__row">
          <view v-for="item in row" :key="item.value" class="kb__key" @click="onKey(item.value)">
            <text class="kb__key-text kb__key-text--sm">{{ item.label }}</text>
          </view>
        </view>
      </view>

      <view class="kb__split" />

      <view class="kb__group">
        <view v-for="(row, ri) in letters" :key="ri" class="kb__row">
          <view v-for="item in row" :key="item.value" class="kb__key" @click="onKey(item.value)">
            <text
              class="kb__key-text"
              :class="{'kb__key-text--sm': item.label.length > 1}">{{ item.label }}</text>
          </view>
        </view>
      </view>

      <view class="kb__split" />

      <view class="kb__group">
        <view v-for="(row, ri) in nums" :key="ri" class="kb__row">
          <view v-for="item in row" :key="item.value" class="kb__key" @click="onKey(item.value)">
            <text class="kb__key-text kb__key-text--lg">{{ item.label }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="kb__foot">
      <view class="kb__key kb__key--wide kb__key--reset" @click="onReset">
        <text class="kb__key-text kb__key-text--red">C.重置</text>
      </view>
      <view class="kb__key kb__key--wide kb__key--next" @click="onNext">
        <text class="kb__key-text kb__key-text--green">N.下一轮</text>
      </view>
      <view class="kb__key kb__key--wide kb__key--delete" @click="onDelete">
        <text class="kb__key-text kb__key-text--red">D.删除</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useDuoleStore } from '@/stores/duole'

interface Key {
  label: string
  value: string
}

/** '7','8' → [{label:'7',value:'7'}, ...] */
function keys(...labels: string[]): Key[] {
  return labels.map(label => ({ label, value: label }))
}

/**
 * 动作键：往当前槽位写**纯文字**（点 / 烧 / 闷 / 落 / 让）——回显即所按。
 * 标签里的字母（D. / S. / M. …）只是键盘上的老编码样式，不再写进牌面：
 * 曾经 value 直接取整个标签（'S.烧'），回显带字母小数点、删除一次删不干净、
 * 进贡 / 吃贡还被按 3 个字符算张数（见 stores/duole.ts 的旧档迁移）。
 */
const actions: Key[][] = [
  [
    { label: 'D.点', value: '点' },
    { label: 'S.烧', value: '烧' },
    { label: 'M.闷', value: '闷' }
  ],
  [
    { label: 'L.落', value: '落' },
    { label: 'R.让', value: '让' }
  ]
]

/**
 * 牌面键：数字与花牌直接写字符，鹰 / 小王 / 大王写**纯文字**（鹰 / 小 / 大），
 * 与动作键（点烧闷落让）同口径——存即所显，回显不再带 Y/X/D 编码。
 */
const letters: Key[][] = [
  keys('0', 'J', 'Q'),
  [...keys('K', 'A'), { label: '鹰', value: '鹰' }],
  [
    { label: '小王', value: '小' },
    { label: '大王', value: '大' }
  ]
]

/** 数字键：原实现的顺序是 789 / 456 / 123 */
const nums: Key[][] = [keys('7', '8', '9'), keys('4', '5', '6'), keys('1', '2', '3')]

const emit = defineEmits(['key-press', 'delete-press', 'clear-press'])

/** 多乐设置：只取「按键震动」这一项（默认开） */
const duoleStore = useDuoleStore()

/** 按键触感：关掉设置后静默，不再震动 */
function feedback() {
  if (!duoleStore.keyboardFeedback) return
  uni.vibrateShort({})
}

function onKey(value: string) {
  emit('key-press', value)
  feedback()
}

function onReset() {
  emit('clear-press')
  feedback()
}

/** 「下一轮」不打震动（原实现如此） */
function onNext() {
  emit('key-press', '#')
}

function onDelete() {
  emit('delete-press')
  feedback()
}
</script>

<style lang="scss" scoped>
.kb {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  /* 上边距交给面板的拖拽头，这里只留左右下 */
  padding: 0 24rpx 24rpx;
  /* 背景别自己刷白：面板内容区本来就是白的且带顶部圆角，
     这里再铺一层白会把面板的圆角糊成直角 */
  background-color: transparent;

  &__groups {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  /* 每组固定 3 列（64rpx 键 + 8rpx 间隙 = 208rpx），
     长短标签都按左对齐排进同一套列里，不会各排各的 */
  &__group {
    display: flex;
    flex-direction: column;
    width: 208rpx;
  }

  &__row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  &__row + &__row {
    margin-top: 16rpx;
  }

  /* 只管行内相邻键的间隙；底部三个宽键靠 space-between 排，不吃这条 */
  &__row &__key + &__key {
    margin-left: 8rpx;
  }

  &__split {
    align-self: stretch;
    width: 2rpx;
    background-color: #999;
  }

  &__key {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 64rpx;
    height: 56rpx;
    border: 2rpx solid #999;
    border-radius: 10rpx;
    background-color: #f5f5f5;
    /* 原 RN 用的 elevation / shadow，这里换个浅投影 */
    box-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.3);
  }

  &__key-text {
    font-size: 28rpx;
    color: #333;

    /* 动作键 / 长标签（小王、大王） */
    &--sm {
      font-size: 24rpx;
    }

    &--lg {
      font-size: 32rpx;
    }

    &--red {
      color: red;
    }

    &--green {
      color: green;
    }
  }

  &__foot {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    margin-top: 20rpx;
  }

  &__key--wide {
    width: 144rpx;
  }

  &__key--reset {
    border-color: red;
    background-color: #ffe6e6;
  }

  &__key--next {
    border-color: green;
    background-color: #e6ffe6;
  }

  &__key--delete {
    border-color: orange;
    background-color: #ffe6cc;
  }
}
</style>
