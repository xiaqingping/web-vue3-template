// i18n国际化初始化
import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

// 程序默认语言
const getLang = () => {
  const user = localStorage.getItem('user')
  if (user && JSON.parse(user)) {
    return JSON.parse(user)?.lang || 'zh'
  }
}
const I18n = createI18n({
  locale: getLang(),
  globalInjection: true,
  messages: {
    zh,
    en
  }
})

export const t: any = I18n.global.t

export default I18n

