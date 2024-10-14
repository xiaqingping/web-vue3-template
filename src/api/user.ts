import service from '@/util/request'
import type { Login, Register, UpdatePassword, UserType } from '@/types/user'


/**
 * 登录
 * @param params
 */
export function login(params: Login['Request']): Promise<Login['Response']> {
  const data = new FormData();
  for(const key in params) {
    // @ts-ignore
    data.append(key, params[key]);
  }
  return service.post('/oauth/token', data)
}

/**
 * 注册
 * @param params
 */
export function register(params: Register['Request']): Promise<Register['Response']> {
  const data = new FormData();
  for(const key in params) {
    // @ts-ignore
    data.append(key, params[key]);
  }
  return service.post('/oauth/token', data)
}

/**
 * 修改密码
 * @param params
 */
export function updatePassword(params: UpdatePassword['Request']): Promise<UpdatePassword['Response']> {
  const data = new FormData();
  for(const key in params) {
    // @ts-ignore
    data.append(key, params[key]);
  }
  return service.post('/user/updatePassword', data)
}

/**
 * 获取用户类型
 */
export function getUserType(): Promise<UserType['Response']> {
  return service.post('/user/type')
}

/**
 * 获取代理商 token
 */
export function agentToken() {
  return service.post('/user/agentToken')
}
