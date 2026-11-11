<template>
  <view
    class="flex"
    :style="{
      justifyContent: justify,
      alignItems: align,
      flexDirection: horizontal ? 'row' : 'column',
      ...customStyle
    }"
  >
    <slot />
  </view>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    align?: string
    justify?: string
    horizontal?: boolean
    customStyle?: Record<string, any>
  }>(),
  {
    align: 'center',
    justify: 'center',
    horizontal: false,
    customStyle: () => ({})
  }
)
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  min-width: 0;
}
</style>
