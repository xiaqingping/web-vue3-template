<script setup lang="ts">
import { onMounted, ref } from 'vue'
// import { RouterView } from 'vue-router'
import Title from '@/components/Title.vue'
import { t } from '@/lang'
// import { getUrlQuery, isLogin, isWeChatMiniProgram, routerTo } from '@/util'
// import { useConfigStore } from '@/stores/user'
// import { agentToken } from '@/api/user'
//
// const { setWxConfig, setAgentToken } = useConfigStore()
//
const active = ref('0')

</script>

<template>
  <div class="tab-bar-content">
    <Title></Title>
    <div class="content">
      <RouterView />
    </div>
  </div>
  <van-tabbar v-model="active" route :safe-area-inset-bottom="true">
    <van-tabbar-item replace to="/index/homePage">
      {{ t('components.tabBar.homePage') }}
      <template #icon>
        <i class="iconfont icon-homePage"></i>
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/index/devices">
      {{ t('components.tabBar.devices') }}
      <template #icon>
        <i class="iconfont icon-phone"></i>
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/index/workBenches">
      {{ t('components.tabBar.workBenches') }}
      <template #icon>
        <i class="iconfont icon-work"></i>
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/index/messages">
      {{ t('components.tabBar.messages') }}
      <template #icon>
        <i class="iconfont icon-alarm"></i>
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/index/my">
      {{ t('components.tabBar.my') }}
      <template #icon>
        <i class="iconfont icon-my"></i>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>
<style scoped lang="scss">
.tab-bar-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  background: #F7F7F7;

  .content {
    flex: 1;
    padding: 0px 0px 50px 0px;
    height: 100vh;
  }
}
</style>
