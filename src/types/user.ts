/**
 * 登录
 */
export interface Login {
  Request: {
    username: string;
    password: string;
    grant_type: string; // 授权模式 default: password_encrypt
  }
  Response: {
    access_token: string,
    token_type: string,
    refresh_token: string,
    expires_in: number,
    scope: string
  }
}

/**
 * 注册
 */
export interface Register {
  Request: {
    phone: string,
    code: string,
    password: string,
    confirmPassword: string,
    companyName: string,
  }
  Response: {}
}

/**
 * 修改密码
 */
export interface UpdatePassword {
  Request: {
    username: string;
    oldPassword: string;
    newPassword: string;
  }
  Response: {
    access_token: string,
    expires_in: number,
    refresh_token: string,
    scope: string,
    token_type: string
  }
}

/**
 * 获取用户类型
 */
export interface UserType {
  Request: {};
  Response: number; // 0:经销商;1:终端用户
}
