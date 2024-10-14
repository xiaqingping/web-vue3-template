<script setup lang="ts">

import { onMounted, reactive, ref } from 'vue'
import { type FieldType, showToast } from 'vant'
import { t } from '@/lang'
import { useConfigStore } from '@/stores/user'
import { routerTo } from '@/util'
import { getUserType, login } from '@/api/user'
import VAES from '@/util/ase'
import useRequest from '@/hooks/useRequest'
import type { Login } from '@/types/user'

const config = useConfigStore()

// 登陆表单
const form = reactive({
  username: '',
  password: '',
  // username: 'pengda',
  // password: 'Pengda0914',
})

const eyeType = ref<FieldType>('password')

const { send: loginSend } = useRequest<Login['Request'], Login['Response']>(login)

/**
 * 提交表单
 */
const onSubmit = () => {
  config.setToken('')
  if (config.checkAgree?.length) {
    loginSend({
      username: form.username,
      password: VAES.encrypt(form.password),
      grant_type: 'password_encrypt',
    }, { loading: true, errorMsg: true }).then((res) => {
      config.setToken(res.access_token)
      getUserType().then(type => {
        config.setUserType(type)
        config.setUserInfo({
          userName: form.username,
        })
        routerTo('/index/homePage')
      })
    })
  } else {
    showToast(t('common.chirp'));
  }
}

</script>

<template>
  <div class="logo-content">
    <div class="logo-box">
      <div class="logo">
        <img src="@/assets/images/LOGO.png" style="width: 100%; height: 100%;">
      </div>
      <div class="login-text">{{ t('components.login.welcome') }}</div>
    </div>
  </div>
  <div style="padding: 20px" class="login-form">
    <van-form @submit="onSubmit">
      <van-cell-group>
        <van-field
          v-model="form.username"
          name="username"
          :label="t('components.login.username')"
          label-width="20px"
          :placeholder="t('components.login.userNamePlaceholder')"
        >
          <template #label>
            <i class="iconfont icon-path-5" style="color: rgb(128, 136, 151);"></i>
          </template>
        </van-field>
        <van-field
          v-model="form.password"
          :type="eyeType"
          name="password"
          :label="t('components.login.password')"
          label-width="20px"
          :placeholder="t('components.login.passwordPlaceholder')"
        >
          <template #label>
            <i class="iconfont icon-suo" style="color: rgb(128, 136, 151);"></i>
          </template>
          <template #right-icon>
            <i style="font-size: 19px;color: #F03C2E" v-if="eyeType === 'password'" class="iconfont icon-eye-close"
               @click="eyeType = 'text'"></i>
            <i style="font-size: 19px;color: #F03C2E" v-else class="iconfont icon-eye-open"
               @click="eyeType = 'password'"></i>
          </template>
        </van-field>
      </van-cell-group>

      <div class="flbc" style="margin-bottom: 30px">
        <div class="login-text register-user" @click="() => routerTo('/register', true)">
          {{ t('components.login.RegisterNewUser') }}
        </div>
        <div class="login-text forget">
          {{ t('components.login.forgetPassword') }}?
        </div>
      </div>

      <div style="">
        <van-button class="submit-btn" round block type="primary" native-type="submit">
          {{ t('common.submit') }}
        </van-button>
      </div>
    </van-form>
    <div class="language" @click="() => config.setLang(config.lang === 'zh' ? 'en' : 'zh')">
      <i class="iconfont icon-path-2" style="font-size: 18px;padding-right: 10px"></i>{{ t(`common.${config.lang}`)
      }}
    </div>
    <div>
      <van-divider>
        {{ t('components.login.loginTips') }}
      </van-divider>
    </div>
    <div class="footer">
      <van-checkbox-group v-model="config.checkAgree" shape="square">
        <van-checkbox name="1" icon-size="14px" style="margin-right: 10px;font-size: 12px;">
          <span style="color: #7F8796">
            {{ t('components.login.read') }}
            <span class="xy">
              {{ t('components.login.userAgreement') }}
            </span>
            {{ t('components.login.and') }}
            <span class="xy">
              {{ t('components.login.privacyPolicy') }}
            </span>
          </span>
        </van-checkbox>
      </van-checkbox-group>
    </div>
  </div>
</template>

<style scoped lang="scss">
.submit-btn {
  box-sizing: border-box;
  border: 1px solid rgba(48, 49, 58, 0.39);
  border-radius: 8px;
  background: linear-gradient(180.00deg, rgb(245, 92, 80), rgb(233, 17, 0) 98.473%);
}

.logo-content {
  height: 240px;
  background-image: url('@/assets/images/login-header-bg.png');
  background-repeat: no-repeat;
  background-size: 300% 200%;
  background-position: 50% -110px;
  padding-top: 100px;

  .logo-box {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    .logo {
      width: 71px;
      height: 71px;
      border-radius: 12px;
      box-shadow: 0 4px 10px 0 rgba(128, 136, 151, 0.13);
      background: rgb(255, 255, 255);
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .login-text {
      width: 100%;
      text-align: center;
      color: rgb(34, 33, 44);
      font-size: 20px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0;
    }
  }
}

.login-form {
  .van-cell {
    margin-bottom: 20px;
    border-radius: 8px;
    background: rgb(247, 247, 247);
    border: none;
    outline: none;
  }

  .van-hairline--top-bottom:after {
    border: none;
  }

  .login-text {
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0;
    text-align: left;
  }

  .register-user {
    color: rgb(240, 60, 46);
  }

  .forget {
    color: rgb(127, 135, 150);
  }

  .language {
    color: rgb(127, 135, 150);
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: 0;
    text-align: left;
    margin-top: 20px;
    display: flex;
    align-items: center;
  }

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: 0;
    text-align: center;

    .xy {
      color: #1D1D27;
    }
  }
}

</style>

<style>
body {
  background: #fff;
  position: relative;
}
</style>
