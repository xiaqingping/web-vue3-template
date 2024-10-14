<script setup lang="ts">

import { useConfigStore } from '@/stores/user'
import { t } from '@/lang'
import { routerTo } from '@/util'

const config = useConfigStore()

const changeLang = () => {
  config.setLang(config.lang === 'zh' ? 'en' : 'zh')
}

</script>

<template>
  <div class="page">
    <div class="card">
      <div class="avatar">
        <i class="iconfont icon-morentouxiang4" style="font-size: 65px; color: #ffffff"></i>
      </div>
      <div class="info">
        <div class="name">
          {{ config?.userInfo?.userName }}
        </div>
        <div class="desc line-3">
          {{ t('components.my.Biography') }}
          <!--  个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介-->
        </div>
      </div>
    </div>

    <div class="list">
      <div class="item flbc">
        <div class="item-left flc">
          <img src="@/assets/svg/device5.svg">
          {{t('components.my.ChangePassword')}}
        </div>
        <div class="item-right">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="item flbc" @click="() => {
        routerTo('/login')
      }">
        <div class="item-left flc">
          <img src="@/assets/svg/device5.svg">
          {{t('components.my.SwitchUser')}}
        </div>
        <div class="item-right">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="item flbc" @click="changeLang">
        <div class="item-left flc">
          <img src="@/assets/svg/device5.svg">
          {{t('components.my.SwitchLanguage')}}
        </div>
        <div class="item-right" style="color: rgb(127, 135, 150);">
          <i class="iconfont icon-path-2"></i>
          {{ t('common.' + config.lang) }}
        </div>
      </div>
      <div class="item flbc">
        <div class="item-left flc">
          <img src="@/assets/svg/device5.svg">
          {{t('components.my.SwitchTheme')}}
        </div>
        <div class="item-right">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="item flbc">
        <div class="item-left flc">
          <img src="@/assets/svg/device5.svg">
          {{t('components.my.MySettings')}}
        </div>
        <div class="item-right">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.card {
  height: 150px;
  background-color: #fff;
  background-image: url('@/assets/images/my-bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center -84px;
  padding-top: 50px;
  display: flex;

  .avatar {
    width: 65px;
    height: 65px;
    background-color: #d2d3d5;
    margin-left: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .info {
    padding: 0 16px;
    flex: 1;

    .name {
      color: rgb(34, 33, 44);
      font-size: 16px;
      font-weight: 600;
    }

    .desc {
      padding-top: 4px;
      line-height: 20px;
      color: rgb(128, 136, 151);
    }
  }
}

.list {
  margin: 16px;
  min-height: 400px;
  background-color: #fff;
  border-radius: 8px;

  .item {
    height: 60px;
    border-bottom: 1px solid rgb(242, 242, 242);
    padding: 4px 20px;

    .item-left {
      font-size: 15px;
      font-weight: 600;

      > img {
        margin-right: 10px;
      }
    }
  }
}
</style>
