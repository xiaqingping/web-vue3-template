<script setup lang="ts">
import { useRoute } from 'vue-router'
import { t } from '@/lang'
import { isWeChatMiniProgram, routerTo } from '@/util'
import router from '@/router'
import { onMounted, ref } from 'vue'

interface Props {
  titleText?: string;
  titleColor?: string;
  leftText?: string;
  leftColor?: string;
  rightText?: string;
  rightColor?: string;
  leftArrow?: boolean;
  path?: string;
  background?: string;
  clickLeftDispose?: () => void;
  clickLeft?: () => void;
  clickRight?: () => void;
}

const props = defineProps<Props>()

const route = useRoute()
const isWx = isWeChatMiniProgram()

const safeAreaInsetTop = ref(0)

const titleStyle = ref()

onMounted(() => {
  safeAreaInsetTop.value = 0
  // @ts-ignore
  if (window.plus) {
    plusReady()
  } else {
    document.addEventListener('plusready', plusReady, false)
  }
})

function plusReady() {
  // 获取系统状态栏高度
  // @ts-ignore
  const height = plus.navigator.getStatusbarHeight()
  if (height) {
    titleStyle.value = {
      height: 80 + 'px',
      '--height': 80 + 'px',
      '--translateY': 19 + 'px'
    }
  } else {
    titleStyle.value = {
      height: 50 + 'px',
      '--height': 0 + 'px',
      '--translateY': 0 + 'px'
    }
  }
}

// 返回
const onClickLeft = () => {
  if (props.clickLeft) {
    return props.clickLeft()
  }

  if (props.path) {
    routerTo(props.path)
  } else {
    router.back()
  }
}

</script>

<template>
  <div v-if="!isWx" :class="{ 'page-title': titleStyle }">
    <van-nav-bar
      fixed
      placeholder
      @click-left.stop="onClickLeft"
      :safe-area-inset-top="true"
      :left-arrow="props.leftArrow"
      :style="titleStyle"
    >
      <template #title>
        <span :style="{ color: props?.titleColor || '#000' }">
          {{ props.titleText || t(`route.${route.name?.toString()}`) }}
        </span>
      </template>
      <template #right>
        <span :style="{ color: props?.rightColor || '#000' }" @click.stop="props?.clickRight">
          {{ props.rightText }}
        </span>
      </template>

    </van-nav-bar>
  </div>
</template>

<style scoped lang="scss">
.page-title {
  :deep(.van-nav-bar__title) {
    transform: translateY(var(--translateY));
  }

  :deep(.van-nav-bar__content) {
    height: var(--height);
  }
  :deep(.van-nav-bar__left) {
    transform: translateY(var(--translateY));
  }
  :deep(.van-nav-bar__right) {
    transform: translateY(var(--translateY));
  }
}

</style>
