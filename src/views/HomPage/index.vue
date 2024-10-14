<script setup lang="ts">
import empty from '@/assets/images/empty.png'
import { t } from '@/lang'
</script>

<template>
  <div class="home-page">
    <van-empty
      :image="empty"
      image-size="60"
      :description="t('common.emptyData')"
    />
  </div>
</template>

<style scoped lang="scss">
.home-page {
  height: 60vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
