import { onMounted, type Ref, ref } from 'vue'
import { closeToast, showLoadingToast, showToast } from 'vant'
import { t } from '@/lang'

export interface SendConfig {
  loading?: boolean, // 是否显示loading
  errorMsg?: boolean, // 是否显示错误信息
}

export interface ConfigType {
  manual?: boolean; // 是否自动触发
  params?: any; // 默认参数
  formatResult?: (res: any) => any; // 格式化返回结果
}

/**
 * 异步处理器
 * @param {*} service
 * @param configRequest
 */
const useRequest = <T, U>(service: any, configRequest: ConfigType = {}): {
  state: Ref<U>
  error: Ref<any>
  loading: Ref<boolean>
  send: (params: T, config?: SendConfig) => Promise<U>
} => {
  const requestConfig = { manual: true, ...configRequest }
  const state = ref()
  const error = ref<any>()
  const loading = ref(false)

  onMounted(() => {
    if (!requestConfig.manual) {
      send(requestConfig.params)
    }
  })

  const send = async (params: T, config?: SendConfig) => {
    let timer: any
    if (config?.loading) {
      timer = setTimeout(() => {
        showLoadingToast({
          message: t('common.loading') + '...',
          forbidClick: true,
          duration: 0
        })
      }, 200)
    }

    return new Promise((resolve: (params: U) => void, reject: any) => {
      service(params).then((res: U) => {
        if (configRequest?.formatResult) {
          state.value = configRequest.formatResult(res)
        } else {
          state.value = res
        }
        loading.value = false
        resolve(res)
        if (config?.loading) {
          clearTimeout(timer)
          closeToast()
        }
      }).catch((err: any) => {
        error.value = err.response?.data
        loading.value = false
        reject(err)
        if (config?.loading) {
          clearTimeout(timer)
          closeToast()
        }
        if (config?.errorMsg) {
          if (err.response?.data?.msg) {
            showToast(err.response?.data.msg)
          } else {
            showToast(t('common.serverException'))
          }
        }
      })
    })
  }

  return { state, error, loading, send }
}

export default useRequest
