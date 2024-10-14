import axios from 'axios'
import { useConfigStore } from '@/stores/user'

const ApiBaseUrl = import.meta.env.VITE_APP_API_URL

// 创建axios实例
const service = axios.create({
  baseURL: ApiBaseUrl, // api的base_url
  timeout: 1000 * 10 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    setHeader(config)
    return config
  },
  error => {
    // 请求错误处理
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做处理，例如只返回data部分
    const res = response.data
    // 如果返回的状态码为 000000，说明成功，可以直接返回数据
    if (res.code == '000000') {
      return res.data
    } else {
      // 其他状态码都当作错误处理
      return Promise.reject({
        message: res.message || 'Error',
        status: res.code,
        response
      })
    }
  },
  error => {
    // 对响应错误做处理
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

const others: string[] = []
const setHeader = (config: any) => {
  if (others.includes(config.url!)) {
    config.baseURL = import.meta.env.VITE_APP_OTHER_URL
  }

  const { AccessToken } = useConfigStore()
  // 可以在这里添加请求头等信息
  if (config.url?.includes('/oauth/token')) {
    config.headers['Authorization'] = 'Basic cGQtbW4tY2xpZW50OnBkLW1uLXNlY3JldA=='
  }
  if (AccessToken) {
    config.headers['Authorization'] = 'Bearer ' + AccessToken
  }
}

export default service
