import wx from 'weixin-js-sdk'
import router from '@/router'
import { useConfigStore } from '@/stores/user'

export function isWeChatMiniProgram(): boolean {
  const userAgent = navigator.userAgent.toLowerCase()
  return userAgent.includes('miniprogram')
}

/**
 * 路由跳转
 * @param path
 * @param navigateTo 是否使用微信跳转
 * @param urls
 */
export const routerTo = (path: string, navigateTo?: boolean, urls?: string) => {
  if (!urls) urls = '/pages/webview/webview?v='
  if (isWeChatMiniProgram() && navigateTo) {
    wx.miniProgram.navigateTo({
      url: urls + path,
      success: function() {
        console.log('success')
      },
      fail: function() {
        console.log('fail')
      }
    })
  } else {
    router.push(path)
  }
}

/**
 * 解析url参数
 * @param url
 */
export const getUrlQuery = (url = location.href) => {
  try {
    const queryString = url.split('?')[1]
    const queryItemStringArr = queryString.split('&')
    const querys: { [key: string]: string } = {}
    queryItemStringArr.forEach(item => {
      const arr = item.split('=')
      querys[arr[0]] = arr[1]
    })
    return querys
  } catch (e) {
    return false
  }
}

/**
 * 检查是否登录
 */
export const isLogin = () => {
  const { AccessToken } = useConfigStore()
  return !!AccessToken
}

/**
 * 生成 guid
 */
export const guid = () => {
  function S4 () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}

/**
 * 防抖函数
 * @param func
 * @param wait
 * @param immediate
 */
export function debounce(func, wait, immediate) {
  let timeout; // 定义一个计时器变量，用于延迟执行函数
  return function (...args) { // 返回一个包装后的函数
    const context = this; // 保存函数执行上下文对象
    const later = function () { // 定义延迟执行的函数
      timeout = null; // 清空计时器变量
      if (!immediate) func.apply(context, args); // 若非立即执行，则调用待防抖函数
    };
    const callNow = immediate && !timeout; // 是否立即调用函数的条件
    clearTimeout(timeout); // 清空计时器
    timeout = setTimeout(later, wait); // 创建新的计时器，延迟执行函数
    if (callNow) func.apply(context, args); // 如果满足立即调用条件，则立即执行函数
  };
}
