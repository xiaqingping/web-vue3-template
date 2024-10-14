import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import I18n, { t } from '@/lang'
import { Locale } from 'vant'
// 引入英文语言包
import enUS from 'vant/es/locale/lang/en-US'
import zhCN from 'vant/es/locale/lang/zh-CN'
import { useRoute } from 'vue-router'

export const useConfigStore = defineStore('user', () => {
  const route = useRoute()

  const lang = ref('zh') // zh, en 国际化

  const theme = ref('light') // light, dark 主题

  const checkAgree = ref() // 是否同意协议
  const checkDeviceAgree = ref() // 是否同意协议

  const wxConfig = ref<{ [key: string]: string }>({}) // 微信配置

  const AccessToken = ref<string>('') // token

  const AgentToken = ref<string>('') // 代理商token

  const UserType = ref<number>() // 用户类型 0：经销商，1：终端用户

  const userInfo = ref<{[key: string]: string}>({
    userName: '',
    userAvatar: '',
  })

  const langs: { [key: string]: any } = {
    en: enUS,
    zh: zhCN
  }

  onMounted(() => {
    setLang(lang.value || 'zh')
  })

  const switchLocale = (locale: string) => {
    Locale.use(locale, langs[locale])
  }

  const setLang = (type: string) => {
    document.title = t(`route.${route.name?.toString()}`)
    lang.value = type === 'en' ? 'en' : 'zh'
    I18n.global.locale = type
    switchLocale(type)
  }

  const setWxConfig = (configs: { [key: string]: string }) => {
    wxConfig.value = configs
  }

  const setTheme = (_theme: string) => {
    theme.value = _theme
    document.getElementById('app')?.setAttribute('class', _theme)
  }

  const setToken = (token: string) => {
    AccessToken.value = token
  }

  const setUserType = (type: number) => {
    UserType.value = type
  }

  const setUserInfo = (info: {[key: string]: string} = {}) => {
    userInfo.value = {
      ...(userInfo.value || {}),
      ...info
    }
  }

  const setAgentToken = (token: string) => {
    AgentToken.value = token
  }

  return {
    lang,
    setLang,
    wxConfig,
    setWxConfig,
    theme,
    setTheme,
    AccessToken,
    setToken,
    checkAgree,
    UserType,
    setUserType,
    checkDeviceAgree,
    userInfo,
    setUserInfo,
    AgentToken,
    setAgentToken
  }
}, {
  persist: true
})
