// 用于中文的语言包
export default {
  route: {
    Login: '登录',
    Register: '注册',
    HomePage: '首页',
    Devices: '设备',
    WorkBenches: '工作台',
    Messages: '消息',
    My: '我的',
    DeviceDetail: '设备详情',
    RunStatus: '运行状态',
    RunStatusChart: '运行状态图表',
    AlarmInfo: '告警信息',
    PlcPoint: 'PLC IO 点位',
    DeviceBinding: '设备绑定',
    MySharing: '我的分享',
    ShareMe: '分享给我的',
    GroupManage: '分组管理',
    DeviceInfo: '设备信息',
  },
  components: {
    tabBar: {
      homePage: '首页',
      devices: '设备',
      workBenches: '工作台',
      messages: '消息',
      my: '我的'
    },
    login: {
      welcome: '您好，欢迎登录',
      userName: '用户名',
      userNamePlaceholder: '手机号码/账号',
      phonePlaceholder: '请输入手机号',
      password: '密码',
      confirmPassword: '确认密码',
      passwordPlaceholder: '登录密码',
      confirmPasswordPlaceholder: '再次输入密码',
      code: '验证码',
      codePlaceholder: '请输入验证码',
      codeSend: '发送验证码',
      codeResSend: '重新发送',
      RegisterNewUser: '注册新用户',
      forgetPassword: '忘记密码',
      loginTips: '其他方式暂不支持登录',
      read: '已阅读并同意',
      and: '和',
      userAgreement: '用户协议',
      privacyPolicy: '隐私政策',
      registerAccount: '注册账号',
      companyName: '公司名称',
      companyNamePlaceholder: '请输入公司名称',
      registerText1: '已有账号',
      registerText2: '去登录',
    },
    messages: {
      placeholder: '请输入关键字查询',
      selectTime: '选择时间',
      placeSelectStartTime: '请选择开始时间',
      placeSelectEndTime: '请选择结束时间',
      read: '已读',
      notRead: '未读',
      alarm: '告警',
      maintenance: '维保',
      service: '服务',
    },
    WorkBenches: {
      work1: '我分享的',
      work2: '分享给我的',
      work3: '我授权的',
      work4: '授权给我的',
      work5: '模板配置',
      work6: '设备分组'
    },
    // 0：降温中，1：待机，2：离线，3：运行中
    devices: {
      deviceType0: '降温中',
      deviceType1: '待机',
      deviceType2: '离线',
      deviceType3: '运行中',
      deviceType4: '未知',
      manuallyAdd: '手动添加',
      scanCode: '扫码添加',
      Temperature: '温度',
      Speed: '速度',
      inputDeviceId: '请输入设备ID',
      inputDeviceName: '请输入设备名称',
      inputDeviceRemark: '请输入设备备注信息',
      agreementText: '我已阅读并同意',
      equipmentServiceAgreement: '设备服务协议',
    },
    devicesDetail: {
      OperationStatus: '运行状态',
      BusinessData: '业务数据',
      AlarmInformation: '告警信息',
      RemoteControl: '远程控制',
      DeviceInformation: '设备信息'
    },
    my: {
      ChangePassword: '修改密码',
      SwitchUser: '切换用户',
      SwitchLanguage: '切换语言',
      SwitchTheme: '切换主题',
      MySettings: '我的设置',
      Biography: '个人简介',
    },
    scan: {
      scan:'扫一扫',
      pictures:'从相册选取',
      closeLight:'关闭闪光灯',
      openLight:'关闭闪光灯',
      unidentifiable:'该图片无法识别为二维码或图片不清晰',
      deficiencyEnvironment:'此app缺少原生h5的拍照环境!',
      lowVersion:'微信版本过低！',
    }
  },
  common: {
    zh: 'English',
    en: 'Chinese',
    submit: '提交',
    cancel: '取消',
    confirm: '确定',
    status: '状态',
    rest: '重置',
    type: '类型',
    time: '时间',
    emptyData: '暂无数据',
    serverException: '服务端异常',
    loading: '加载中',
    chirp: '请阅读并勾选协议！', // 提示
    on: '开',
    off: '关',
  }
}
