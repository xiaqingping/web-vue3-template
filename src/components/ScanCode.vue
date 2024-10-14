<template>
  <van-popup
    z-index="99999"
    :show="domShow"
    :style="{ height: '100vh', width: '100%',background:'#000000', 'overflow': 'hidden' }"
    position="right"
  >
    <div class="container-title">
      <Title
        titleText="扫码"
        :rightText="t('components.scan.pictures')"
        leftArrow
        :clickLeft="onClickLeft"
        :clickRight="openAlbum"
        titleColor="#fff"
        rightColor="#fff"
      ></Title>
    </div>
    <div class="container-center">
      <div class="container-scan-footer">
        <span @click.stop="toggleFlashlight">
          <span v-if="flashlightOn">
            {{ t('components.scan.closeLight') }}
          </span>
          <span v-else>
            {{ t('components.scan.openLight') }}
          </span>
        </span>
      </div>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import wx from 'weixin-js-sdk'
import { showToast } from 'vant'
import { onMounted, onUnmounted, ref } from 'vue'
import { isWeChatMiniProgram } from '@/util'
import I18n from '@/lang'
import Title from '@/components/Title.vue'

const t = I18n.global.t
const weChat = isWeChatMiniProgram()
const domShow = ref(false)
let scan: any = null
let timer: any = null
const flashlightOn = ref(false)
const scanType = ref('')
let appPlus: any = null

const emits = defineEmits(['close'])

onMounted(() => {
  // @ts-ignore
  if (window.plus) {
    // @ts-ignore
    appPlus = plus
  } else {
    document.addEventListener('plusready', () => {
      // @ts-ignore
      appPlus = plus
    }, false)
  }
})

const onClickLeft = () => {
  close(null, true)
}

const startScan = async () => {
  if (!scan && appPlus) {
    scan = appPlus?.barcode.create('barcode', [appPlus?.barcode.QR], {
      top: '10%',
      left: '0px',
      bottom: '10%',
      width: '100%',
      height: '80%',
      position: 'static',
      frameColor: '#1989fa',
      scanbarColor: '#1989fa'
    })
    scan.onmarked = (type: any, result: any) => {
      close(result)
    }

    scan.onerror = (error: any) => {
      showToast(t('components.scan.unidentifiable'))
      close()
    }
    appPlus.webview.currentWebview().append(scan)
    scan?.start({
      vibrate: true
    })
  } else {
    showToast(t('components.scan.unidentifiable'))
  }
}

// 打开闪光灯
const toggleFlashlight = () => {
  if (appPlus) {
    flashlightOn.value = !flashlightOn.value
    scan.setFlash(flashlightOn.value)
  }
}

// 关闭扫码
const close = (data?: any, noEmit?: boolean) => {
  domShow.value = false
  if (scan) {
    scan.close()
    scan = null
  }
  if (!noEmit) {
    if (scanType.value == 'lookWorkOrder') {
      emits('close', data, 'lookWorkOrder')
    } else {
      emits('close', data)
      domShow.value = false
    }
  }
}
const openAlbum = () => {
  if (appPlus) {
    appPlus?.gallery.pick((path: any) => {
      if (path) {
        appPlus?.barcode.scan(path, scan.onmarked, scan.onerror)
      } else {
        close()
      }
    })
  } else {
    showToast(t('components.scan.deficiencyEnvironment'))
  }
}
//   获得扫码结果
const getResult = async (type: string) => {
  scanType.value = type
  if (weChat) {
    wx.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ['qrCode', 'barCode'],
      success: function(res: any) {
        let result = res.resultStr
        if (result) {
          close(result)
        }
      },
      fail(res) {
        // 失败回调
        close()
        showToast(res.errMsg)
      }
    })
  } else {
    domShow.value = true
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      startScan()
    }, 300)
  }
}
onUnmounted(() => {
  close(null, true)
})

defineExpose({
  getResult
})

</script>

<style scoped lang="scss">
.container-title {
  :deep(.van-nav-bar) {
    background: transparent !important;
    width: 100%;
    border: none;
    color: #fff;
    --van-nav-bar-icon-color: #fff;
    --van-nav-bar-title-text-color: #fff;
    --van-border-color: transparent;
  }
}

.container-center {
  background: #000000;
  overflow: auto;
  position: relative;
  height: 100%;
  box-sizing: border-box;

  .container-scan-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 100px;

    > span {
      color: #f0f0f0;
    }
  }
}
</style>
