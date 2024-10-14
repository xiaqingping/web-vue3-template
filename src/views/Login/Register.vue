<script setup lang="ts">

import { reactive, ref } from 'vue'
import { type FieldType, showToast } from 'vant'
import { t } from '@/lang'
import { register } from '@/api/user'
import VAES from '@/util/ase'
import useRequest from '@/hooks/useRequest'
import type { Register } from '@/types/user'
import Title from '@/components/Title.vue'
import { useConfigStore } from '@/stores/user'
import { routerTo } from '@/util'

// 注册表单
const form = reactive({
  phone: '',
  password: '',
  confirmPassword: '',
  code: '',
  companyName: ''
})

const config = useConfigStore()
const eyeType = ref<FieldType>('password')
const confirmEyeType = ref<FieldType>('password')

// 注册
const { send: registerSend } = useRequest<Register['Request'], any>(register)

// 验证码倒计时
const codeTime = ref(-1)

/**
 * 发送验证码
 */
const onSendCode = () => {
  if (codeTime.value <= 0) {
    codeTime.value = 10
    const timer = setInterval(() => {
      codeTime.value--

      if (codeTime.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)
  }
}

const onSubmit = () => {
  if (config.checkAgree?.length) {
    const params = Object.assign({}, form)

    params.password = VAES.encrypt(form.password)
    params.confirmPassword = VAES.encrypt(form.confirmPassword)

    registerSend(params, { loading: true, errorMsg: true }).then(() => {
      // routerTo('/')
    })
  } else {
    showToast(t('components.login.chirp'))
  }
}

</script>

<template>
  <Title leftArrow></Title>
  <div class="register-content">
  </div>
  <div style="padding: 20px" class="register-form">
    <van-form @submit="onSubmit">
      <van-cell-group>
        <van-field
          v-model="form.phone"
          name="phone"
          :label="t('components.login.phone')"
          label-width="20px"
          :placeholder="t('components.login.phonePlaceholder')"
        >
          <template #label>
            <i class="iconfont icon-path-5" style="color: rgb(128, 136, 151);"></i>
          </template>
        </van-field>
        <van-field
          v-model="form.code"
          name="code"
          :label="t('components.login.code')"
          label-width="20px"
          :placeholder="t('components.login.codePlaceholder')"
        >
          <template #label>
            <i class="iconfont icon-a-zuhe13" style="color: rgb(128, 136, 151);font-size: 12px"></i>
          </template>
          <template #right-icon>
            <span v-if="codeTime <= 0" style="color: #F03C2E" @click="onSendCode">
              {{
                codeTime === -1 ? t('components.login.codeSend') : t('components.login.codeResSend')
              }}
            </span>
            <span v-else style="color: #F03C2E">
              {{ codeTime }}s
            </span>
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
            <i
              v-if="eyeType === 'password'"
              class="iconfont icon-eye-close"
              style="font-size: 19px;color: #F03C2E"
              @click="eyeType = 'text'"
            ></i>
            <i
              v-else
              class="iconfont icon-eye-open"
              style="font-size: 19px;color: #F03C2E"
              @click="eyeType = 'password'"
            ></i>
          </template>
        </van-field>
        <van-field
          v-model="form.confirmPassword"
          label-width="20px"
          name="confirmPassword"
          :type="confirmEyeType"
          :label="t('components.login.confirmPassword')"
          :placeholder="t('components.login.confirmPasswordPlaceholder')"
        >
          <template #label>
            <i class="iconfont icon-suo" style="color: rgb(128, 136, 151);"></i>
          </template>
          <template #right-icon>
            <i
              v-if="confirmEyeType === 'password'"
              class="iconfont icon-eye-close"
              style="font-size: 19px;color: #F03C2E"
              @click="confirmEyeType = 'text'"
            ></i>
            <i
              v-else
              class="iconfont icon-eye-open"
              style="font-size: 19px;color: #F03C2E"
              @click="confirmEyeType = 'password'"
            ></i>
          </template>
        </van-field>
        <van-field
          v-model="form.companyName"
          name="companyName"
          label-width="20px"
          :label="t('components.login.companyName')"
          :placeholder="t('components.login.companyNamePlaceholder')"
        >
          <template #label>
            <i class="iconfont icon-path" style="color: rgb(128, 136, 151);"></i>
          </template>
        </van-field>
      </van-cell-group>

      <div style="">
        <van-button class="submit-btn" round block type="primary" native-type="submit">
          {{ t('common.submit') }}
        </van-button>
      </div>
    </van-form>
    <div>
      <van-divider>
        {{ t('components.login.registerText1') }}？
        <span style="color: #F03C2E" @click="() => routerTo('/login')">
          {{ t('components.login.registerText2') }}
        </span>
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

.register-content {
  height: 100px;
  background-image: url('@/assets/images/login-header-bg.png');
  background-repeat: no-repeat;
  background-size: 400% 300%;
  background-position: 50% -80px;

  .register-box {
    .register-text {
      width: 100%;
      padding-left: 20px;
      color: rgb(34, 33, 44);
      font-size: 24px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 0;
    }
  }
}

.register-form {
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

  .register-text {
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
