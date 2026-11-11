<!--
  wot-design-uni@1.14.0 `wd-slider` 的本项目移植版（只保留单滑块——视频进度条用不到 range）。

  ★ 为什么不直接用 node_modules 里的 wd-slider：
    原版写的是 `const emit = defineEmits<SliderEmits>()`，而 SliderEmits 是 **import 进来** 的类型。
    @vue/compiler-sfc 3.2.47（本项目锁死 Vue 3.2.47）的 processDefineEmits 只会在
    **本文件内**找类型别名/接口，import 的直接编译报错：
      type argument passed to defineEmits() must be a function type, a literal type
      with call signatures, or a reference to the above types.
    实测（2026-10-25，用项目自带 compiler-sfc 编译原版文件）直接 throw——
    这和 2026-10-03 记下的「wd-slider 在本项目装不上」是同一个坑。
    （wd-video-preview 的 defineExpose<X>({...}) 能过，是因为它带运行时实参；
      defineEmits 只有类型实参、且类型在外部文件，3.2.47 解析不了。）

  ★ 与原版的差异（刻意为之，其余逻辑/样式/类名/事件语义完全一致）：
    1. defineEmits 改成 3.2 时代的「运行时对象」写法（编译期生成 emits 选项，类型照样推得出）；
    2. 砍掉 range 双滑块、min/max 文案、滑块上方气泡——播放器进度条都不需要；
    3. 各事件的 value 收敛为 number（单滑块不存在 number[]）；
    4. 触摸热区从「只有小圆钮」扩大到整条 wrapper（36px 高），交互改成「点哪到哪」
       （按落点 X 直接定位，而不是抓住圆钮做相对位移）——视频进度条需要这个；
    5. touchstart 时若几何量取失败会现场补量一次，避免整段拖动被静默吞掉。

  ★ 升级 Vue 到 3.3+ 之后：删掉本文件，模板里改回 <wd-slider> 即可（props/事件同名同义）。
    原版从 wot 的 common/util、composables/useTouch import 的小工具已全部内联，
    本文件不依赖 wot-design-uni 的任何内部模块，库升级也牵不走。
-->
<template>
  <view :class="rootClass" :style="customStyle">
    <!-- ★ 整条 wrapper 是热区（36px 高）：touch 绑在这里，点轨道任意位置都能定位/拖动。
         原版只把手能拖、轨道 3px 高几乎点不中——真机上表现为「拖不动」。 -->
    <view
      class="wd-slider__bar-wrapper"
      :id="sliderBarWrapperId"
      @touchstart="onSliderTouchStart"
      @touchmove.stop.prevent="onSliderTouchMove"
      @touchend="onSliderTouchEnd"
      @touchcancel="onSliderTouchEnd"
    >
      <!-- 底轨细线（inactive 色画在这层，wrapper 本身透明只做热区） -->
      <view class="wd-slider__track" :style="trackStyle" />
      <view class="wd-slider__bar" :style="barStyle">
        <view class="wd-slider__button-wrapper" :style="sliderButtonStyle">
          <view class="wd-slider__button" />
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
/** 与 wd-slider 原版保持一致的 options：virtualHost 让外层 class/style 透传到根节点，
 *  shared 让页面 scoped 样式能作用到组件内部（mp-weixin 下 :deep 是静默失效的） */
export default {
  name: 'wd-slider',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue'

const props = defineProps({
  /** 自定义根节点样式（组件内部色值走 CSS 变量，可从这里下发覆盖，如 --wot-slider-handle-bg） */
  customStyle: { type: String, default: '' },
  /** 自定义根节点样式类 */
  customClass: { type: String, default: '' },
  /** 滑块的值（单滑块为数字） */
  modelValue: { type: Number, default: 0 },
  /** 滑块的最大值 */
  max: { type: Number, default: 100 },
  /** 滑块的最小值 */
  min: { type: Number, default: 0 },
  /** 滑块的步进值 */
  step: { type: Number, default: 1 },
  /** 进度条未激活的背景颜色 */
  inactiveColor: { type: String, default: '#e5e5e5' },
  /** 进度条激活的背景颜色 */
  activeColor: { type: String, default: '' },
  /** 是否禁用滑块 */
  disabled: { type: Boolean, default: false }
})

/** 3.2 兼容写法：运行时对象（原版 defineEmits<SliderEmits>() 在 3.2.47 下编译不过，见文件头） */
const emit = defineEmits({
  'update:modelValue': (value: number) => true,
  dragstart: (value: number) => true,
  dragmove: (value: number) => true,
  dragend: (value: number) => true
})

/* ---------------- 小工具（原版从 wot 的 common/util  import，这里内联保证自包含：
   wot 内部模块路径随时可能调整，移植版不该被牵着走；且数值滑块用不到 deepClone/isEqual） ---------------- */

/** 模块级自增，给每个实例发一个唯一的轨道 id（原版用 uuid，这里没那个必要） */
let sliderSeq = 0

/** {background:'#fff'} -> 'background:#fff;'；空值跳过（与原版 objToStyle 一致） */
const objToStyle = (styles: Record<string, string>): string =>
  Object.keys(styles)
    .filter(key => styles[key] !== '' && styles[key] !== undefined && styles[key] !== null)
    .map(key => `${key}:${styles[key]}`)
    .join(';')

/** 量轨道几何（原版 getRect 支持 all/useFields，单滑块只需要 width/left） */
const { proxy } = getCurrentInstance() as any
const measureTrack = (selector: string): Promise<{ width: number; left: number }> =>
  new Promise(resolve => {
    uni
      .createSelectorQuery()
      .in(proxy)
      .select(selector)
      .boundingClientRect(rect => {
        // 类型是 NodeInfo | NodeInfo[]（select 理论上只回单个，这里兜底防数组）
        if (rect && !Array.isArray(rect)) {
          resolve({ width: Number(rect.width) || 0, left: Number(rect.left) || 0 })
        } else {
          resolve({ width: 0, left: 0 })
        }
      })
      .exec()
  })

// ----------- 基础状态 -----------
const sliderBarWrapperId = ref<string>(`sliderBarWrapper${++sliderSeq}`)

// ----------- 轨道尺寸状态 -----------
const trackWidth = ref<number>(0)
const trackLeft = ref<number>(0)

// ----------- 值相关状态 -----------
const minProp = computed(() => props.min)
const maxProp = computed(() => props.max)
const stepProp = computed(() => {
  if (props.step <= 0) {
    console.warn('[wot ui] warning(wd-slider): step must be greater than 0')
    return 1
  }
  return props.step
})

const modelValue = ref<number>(getInitValue())

// ----------- 计算属性 -----------
const rootClass = computed(() => {
  return `wd-slider ${props.disabled ? 'wd-slider--disabled' : ''} ${props.customClass}`
})

const scope = computed(() => maxProp.value - minProp.value)

const sliderButtonStyle = computed(() => {
  return objToStyle({
    visibility: props.disabled ? 'hidden' : 'visible'
  })
})

/** 底轨细线（inactive 色）；wrapper 本身透明，只做 36px 高的热区 */
const trackStyle = computed(() => {
  const style: Record<string, any> = {}
  if (props.inactiveColor) {
    style.background = props.inactiveColor
  }
  return objToStyle(style)
})

const barStyle = computed(() => {
  const style: Record<string, any> = {}
  if (scope.value === 0) return objToStyle(style)

  style.width = `${((modelValue.value - minProp.value) * 100) / scope.value}%`
  style.left = '0'

  if (props.activeColor) {
    style.background = props.activeColor
  }
  return objToStyle(style)
})

// ----------- 监听器 -----------
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== modelValue.value) {
      modelValue.value = getInitValue()
    }
  }
)

watch(modelValue, (newVal) => {
  emit('update:modelValue', newVal)
})

// ----------- 生命周期钩子 -----------
onMounted(() => {
  initSlider()
})

// ----------- 工具方法 -----------
function isDisabled(): boolean {
  return props.disabled
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function initSlider() {
  measureTrack(`#${sliderBarWrapperId.value}`)
    .then(({ width, left }) => {
      trackWidth.value = width
      trackLeft.value = left
    })
    .catch(() => {
      // 理论上不会 reject（measureTrack 内部已兜底成 0）；留着只是防御
    })
}

function getInitValue(): number {
  return clamp(props.modelValue, minProp.value, maxProp.value)
}

/** 将值对齐到最近的步长倍数 */
function snapValueToStep(value: number): number {
  value = clamp(value, minProp.value, maxProp.value)
  const steps = Math.round((value - minProp.value) / stepProp.value)
  return parseFloat((minProp.value + steps * stepProp.value).toFixed(10))
}

function updateValue(value: number) {
  const newValue = snapValueToStep(value)
  if (newValue !== modelValue.value) {
    modelValue.value = newValue
  }
}

/** 按落点 X 算值：点哪到哪（进度条的常规交互，而不是必须先抓到小圆钮） */
function updateByClientX(clientX: number) {
  if (!trackWidth.value) return
  const ratio = clamp((clientX - trackLeft.value) / trackWidth.value, 0, 1)
  updateValue(minProp.value + ratio * scope.value)
}

// ----------- 事件处理 -----------
function onSliderTouchStart(event: any) {
  if (isDisabled()) return

  const clientX = event.touches?.[0]?.clientX ?? event.changedTouches?.[0]?.clientX
  if (clientX === undefined) return

  // 量取失败/尚未量到时现场补量一次：否则整段拖动会被吞掉（真机「拖不动」的主因）
  if (!trackWidth.value) {
    measureTrack(`#${sliderBarWrapperId.value}`).then(({ width, left }) => {
      trackWidth.value = width
      trackLeft.value = left
      if (width) {
        updateByClientX(clientX)
        emit('dragstart', modelValue.value)
      }
    })
    return
  }

  updateByClientX(clientX)
  emit('dragstart', modelValue.value)
}

function onSliderTouchMove(event: any) {
  if (isDisabled()) return
  if (!trackWidth.value) return

  const clientX = event.touches?.[0]?.clientX ?? event.changedTouches?.[0]?.clientX
  if (clientX === undefined) return

  updateByClientX(clientX)
  emit('dragmove', modelValue.value)
}

function onSliderTouchEnd() {
  if (isDisabled()) return
  emit('dragend', modelValue.value)
}
</script>

<style lang="scss" scoped>
/**
 * 样式与 wd-slider/index.scss 编译产物逐条对应（去掉了 range/文案/暗黑主题用不到的部分）。
 * 色值全部保留 --wot-slider-* CSS 变量形式：外部通过 custom-style 下发变量即可覆盖，
 * 与 wot 官方「CSS 变量定制」的姿势一致。
 */
.wd-slider {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: calc(var(--wot-slider-handle-radius, 12px) * 3);
}

/* 热区：36px 高（原来只有细线 3px，margin 不算可点区域，真机上几乎点不中） */
.wd-slider__bar-wrapper {
  flex: 1;
  position: relative;
  height: 100%;
}

/* 底轨细线：垂直居中画在热区里，inactive 色由 trackStyle 下发 */
.wd-slider__track {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: var(--wot-slider-axie-height, 3px);
  border-radius: calc(var(--wot-slider-axie-height, 3px) / 2);
  background-color: #e5e5e5;
}

.wd-slider__bar {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  border-radius: calc(var(--wot-slider-axie-height, 3px) / 2);
  height: var(--wot-slider-axie-height, 3px);
  background: var(--wot-slider-line-color, linear-gradient(315deg, #517cf0 0%, #769ef5 100%));
}

.wd-slider__button-wrapper {
  width: calc(var(--wot-slider-handle-radius, 12px) * 2);
  /* 右侧滑块按钮定位：圆心压在细线右端点上（top:50% + translateY(-50%) 垂直居中） */
  transform: translate3d(50%, -50%, 0);
  position: absolute;
  right: 0;
  top: 50%;
}

.wd-slider__button {
  height: calc(var(--wot-slider-handle-radius, 12px) * 2);
  width: calc(var(--wot-slider-handle-radius, 12px) * 2);
  background: var(--wot-slider-handle-bg, linear-gradient(139deg, #ffffff 0%, #f7f7f7 100%));
  border-radius: 100%;
  border: 1px solid var(--wot-slider-axie-bg, #e5e5e5);
  box-sizing: border-box;
  box-shadow: 0 2px 4px 0 rgba(155, 155, 155, 0.5);
}

.wd-slider--disabled .wd-slider__bar {
  opacity: 0.25;
}
</style>
