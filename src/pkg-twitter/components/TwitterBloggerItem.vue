<!--
  Twitter 博主 - 列表卡片
  由 DatingItem 的布局范式迁移（头像左 + 信息右 + 描述 + 标签）。

  - 整卡点击外跳系统默认浏览器（列表页 @press 处理）。
  - 编辑 / 删除走名字行右侧「更多」icon 的 popover（wd-popover menu），本组件 emit edit/delete 给列表页。
  - 头像缺省走 https://cctv3.net/i.jpg；昵称下方展示 @handle。
-->
<template>
  <view class="item" hover-class="item--hover" @click="onPress">
    <view class="item__avatar">
      <image
        class="item__avatar-img"
        :src="mediaUrl(item.avatar || 'https://cctv3.net/i.jpg')"
        mode="aspectFill" />
    </view>

    <view class="item__body">
      <view class="item__head">
        <view class="item__head-left">
          <text class="item__name">{{ item.name || '未命名' }}</text>
          <text v-if="item.handle" class="item__handle">{{ item.handle }}</text>
          <text v-if="metaText" class="item__meta">{{ metaText }}</text>
        </view>
        <!-- 更多 icon：名字行右侧，点击向下弹出 popover 菜单（编辑/删除） -->
        <wd-popover
          mode="menu"
          placement="bottom-end"
          :content="moreMenu"
          @menuclick="onMenuClick">
          <view class="item__more">
            <wd-icon name="more" size="16px" color="#999" />
          </view>
        </wd-popover>
      </view>

      <text v-if="item.description" class="item__desc">{{ item.description }}</text>

      <view v-if="item.tags?.length" class="item__tags">
        <Tag v-for="(t, i) in item.tags" :key="`${t}-${i}`" :text="String(t)" />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import Tag from '@/components/Tag.vue'
import { mediaUrl } from '@/utils'
import type { TwitterBlogger } from '@/types/twitter'

const props = defineProps<{ item: TwitterBlogger }>()
const emit = defineEmits<{ (e: 'press'): void; (e: 'edit'): void; (e: 'delete'): void }>()

const onPress = () => emit('press')

/** 更多菜单：编辑 / 删除（iconClass 走 wot 图标字体） */
const moreMenu = [
  { content: '编辑', iconClass: 'edit' },
  { content: '删除', iconClass: 'delete' }
]

/** popover 菜单点击：index 0=编辑，1=删除，冒泡给列表页处理 */
const onMenuClick = (e: { item: Record<string, any>; index: number }) => {
  if (e.index === 0) emit('edit')
  else if (e.index === 1) emit('delete')
}

/** 资料摘要行：标签数量 · 备注有无（简单信息，不喧宾夺主） */
const metaText = computed(() => {
  const it = props.item
  const parts: string[] = []
  if (it.tags?.length) parts.push(`${it.tags.length} 个标签`)
  if (it.remark) parts.push('有备注')
  return parts.join(' · ')
})
</script>

<style lang="scss" scoped>
.item {
  &--hover {
    background-color: #f7f7f7;
  }

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 24rpx 30rpx;
  background-color: #fff;

  &__avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 88rpx;
    height: 88rpx;
    border-radius: 50%;
    overflow: hidden;
    background-color: #fafafa;
    flex-shrink: 0;
  }
  &__avatar-img {
    width: 100%;
    height: 100%;
  }
  /* 右侧主体：头部 + 简介 + 标签整体缩进，自然把左边头像位置空出来 */
  &__body {
    flex: 1;
    min-width: 0;
    margin-left: 20rpx;
  }
  &__head {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
  /* 名字 / handle / meta 竖向堆叠（flex column 让每个 <text> 各占一行，
     否则 <text> 是行内元素会在块容器里横向流排、短的时候名和 @handle 挤到同一行） */
  &__head-left {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }
  /* 更多 icon 按钮：圆形点击区，固定宽高不挤压名字行 */
  &__more {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 56rpx;
    height: 56rpx;
    margin-left: 16rpx;
    border-radius: 50%;

    &:active {
      background-color: #f0f0f0;
    }
  }
  &__name {
    min-width: 0;
    font-size: 32rpx;
    font-weight: 500;
    color: #1a1a1a;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__handle {
    margin-top: 4rpx;
    min-width: 0;
    font-size: 24rpx;
    color: #1d9bf0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__meta {
    display: block;
    margin-top: 4rpx;
    font-size: 24rpx;
    color: #888;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__desc {
    display: -webkit-box;
    margin-top: 12rpx;
    font-size: 28rpx;
    color: #444;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  &__tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 10rpx;
    margin-top: 10rpx;
  }
}
</style>
