<template>
  <view class="tags" :class="{ 'tags--end': align === 'end' }">
    <view v-for="(it, i) in datas" :key="i" class="tags__item">
      <text class="tags__label">{{ String(it) }}</text>
      <view
        class="tags__delete"
        hover-class="tags__delete--hover"
        @click="onDelete(i)"
      >
        <wd-icon name="close" :size="12" color="#999" />
      </view>
    </view>
    <!-- 尾部插槽：让「加号钮」之类跟着标签同处一条 flex 流内换行，
         而不是被当成兄弟块挤到下一行最右侧（否则换行时加号会孤零零飞走） -->
    <slot name="append" />
  </view>
</template>

<script lang="ts" setup>
/**
 * 可删除标签组（公共组件）
 *
 * 由 ~/cn.xiaopacai.cloud/src/components/DeleteableTags 迁移（RN -> uni）。
 *
 * ⚠️ 为什么不用 wot 的 `wd-tag closable`：
 *    wot 的 close 分支在 wd-tag.vue 里**写死** `<wd-icon name="error-fill" />`，
 *    即「深灰(#585858) 实心圆 + 白叉」，且 `.wd-tag__close` 还带 `margin-left:24px`
 *    把 × 推到最右飘着 —— 这就是截图里那个丑东西，调色只是遮丑。
 *    这里老老实实照 RN 原设计自绘：描边药丸 + 紧贴文字的浅灰 ×。
 *
 * 用法：`<DeleteableTags :datas="(string|number)[]" @delete="idx => 删除数组第 idx 项" />`
 * 组件只负责展示与点击，删除逻辑交给父级（RN 的 onDelete 同理）。
 *
 * 可选：
 * - `align="end"`：标签整组靠右（每行都右对齐），用于表单右对齐场景；
 *   不传则默认靠左，不影响既有调用方。
 * - `#append` 插槽：渲染在所有标签之后、同处一条 flex 流内（例如「加号钮」），
 *   随标签一起换行，不会单独被挤到下一行。
 */
defineProps<{ datas: Array<string | number>; align?: 'end' }>()

const emit = defineEmits<{ (e: 'delete', index: number): void }>()

const onDelete = (index: number) => emit('delete', index)
</script>

<style lang="scss" scoped>
.tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 12rpx;

  /* 整组靠右：flex 的 justify-content 是逐行生效的，换行后每行都贴右 */
  &--end {
    justify-content: flex-end;
  }

  &__item {
    /* 定高 + flex 居中（不用上下 padding 撑高，避免行盒墨迹不受控）：
       与输入行 28rpx 的 label 同一量级，不再傻大。 */
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 52rpx;
    padding: 0 6rpx 0 14rpx;
    border: 2rpx solid #e5e5e5;
    border-radius: 12rpx;
  }
  &__label {
    color: #333;
    font-size: 26rpx;
    /* text 行内元素：line-height:1 保证定高容器里垂直居中 */
    line-height: 1;
  }
  &__delete {
    display: flex;
    align-items: center;
    justify-content: center;
    /* 放大点击热区（RN 的 hitSlop:{top:5,bottom:5,left:5,right:5}） */
    width: 36rpx;
    height: 36rpx;
    margin-left: 4rpx;
  }
  &__delete--hover {
    /* RN 的 TouchableOpacity activeOpacity={0.8} */
    opacity: 0.6;
  }
}
</style>
