// 微信jssdk注册
import wx from 'weixin-js-sdk'
import axios from 'axios'
import { useConfigStore } from '@/stores/user'

export const getJSAPIInfo = () => {
  const { wxConfig } = useConfigStore()

  axios({
    url: '/api-organization/wechat/getJSAPIInfo',
    method: 'post',
    // @ts-ignore
    baseURL: window.VITE_API,
    data: {
      appId: wxConfig.publicAppId,
      // @ts-ignore
      address: window.VITE_API
    }
  }).then(res => {
    if (res.data.code === '000000') {
      let objs = res.data.data
      wx.config({
        debug: false, // 开启调试模式,调用的所有 api 的返回值会在客户端 alert 出来，若要查看传入的参数，可以在 pc 端打开，参数信息会通过 log 打出，仅在 pc 端时才会打印。
        appId: objs.appId, // 必填，公众号的唯一标识
        timestamp: objs.timestamp, // 必填，生成签名的时间戳
        nonceStr: objs.noncestr, // 必填，生成签名的随机串
        signature: objs.signature, // 必填，签名
        jsApiList: [
          'scanQRCode',
          'openLocation',
          'getLocation',
          'onMenuShareTimeline',
          'chooseWXPay',
          'chooseImage',
        ]
      })
    }
  })
}
