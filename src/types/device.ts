/**
 * 该项目 projectId = deviceId
 * 概念相同
 */

/**
 * 绑定设备
 */
export interface BindDevice {
  Request: {
    deviceId: string;
    share_id: string;
    auth_id: string;
    name: string;
    remark: string;
  }
  Response: {}
}

/**
 * 设备列表
 */
export interface DeviceList {
  Request: {
    keyword: string;
    pageNo: number;
    pageSize: number;
  }
  Response: {
    records: Device[];
    current: number;
    size: number;
    total: number;
  }
}

// 项目状态显示优先级：报警 > 无设备 > 未绑定SN > 设备状态
// 有报警：红色 （alarmStatus：1）
// 无设备：红连接图片 （hasDevice： 0）
// (部分/全部)未绑定SN：红连接图片（bindSerialNumber：0）
// 部分设备离线：灰色 （deviceStatus： 0）
// 全部设备在线：绿色（deviceStatus：1）
export interface ProjectStatus {
  Request: {
    deviceId: string;
  }
  Response: DeviceStatus[]
}

export interface DeviceStatus {
  alarmStatus: number;
  bindSerialNumber: number;
  deviceStatus: number;
  hasDevice: number;
  plcStatus: number;
  projectId: number;
  statusInfo: Map<string, string>;
  synchronizationStatus: number;
}

/**
 * 设备信息
 */
export interface Device {
  projectId: string;
  projectName: string;
  v1Id: string;
  v2Id: string;
  v1Name: string;
  v2Name: string;
  v1Unit: string;
  v2Unit: string;
  relType: string;
  status: number;
  ztVariantId: string;
}

/**
 * 设备状态
 */
export interface DeviceStatusInfo {
  Request: {
    deviceIds: string[];
  }
  Response: {
    id: string;
    name: string;
    offLineCount: number;
    offLineDuration: number;
    onLineDuration: number;
    onLineTime: string;
    onlineStatus: boolean;
    plcList: PlcStatusVo[];
  }
}

/**
 * plc的状态信息
 */
export interface PlcStatusVo {
  deviceId: string;
  name: string;
  onlineStatus: boolean;
  plcId: number;
  time: number;
}

/**
 * 设备图片
 */
export interface DeviceImg {
  Request: {
    deviceId: string;
  }
  Response: {
    boxId: string;
    alarmId: string;
    variantId: string;
    name: string;
  }
}

/**
 * 设备信息
 */
export interface Properties {
  Request: {
    deviceId: string;
  }
  Response: {
    propertiesId: string;
    propertiesName: string;
    propertiesValue: string;
  }[]
}

/**
 * io点位
 */
export interface DeviceIo {
  Request: {
    deviceId: string;
  }
  Response: {
    '0CH': Plc[];
    '1CH': Plc[];
    '100CH': Plc[];
    '101CH': Plc[];
  }
}

/**
 * plc
 */
export interface Plc {
  boxId: string;
  dataType: string;
  unit: string;
  variantId: number;
  variantName: string;
}

/**
 * 设备参数分类列表
 */
export interface DeviceParamCategorys {
  Request: {
    deviceId: string;
  }
  Response: DeviceParamCategory[]
}

/**
 * 设备参数分类列表子项
 */
export interface DeviceParamCategory {
  id: string;
  name: string;
  nameEn: string;
  type: number;
  authType: string;
  sortNo: number;
}

/**
 * 参数分组的变量列表
 */
export interface VariantsByCategoryList {
  Request: {
    deviceId: string;
    categoryId: string;
  }
  Response: VariantsByCategory[]
}

/**
 * 参数分组的变量子项
 */
export interface VariantsByCategory {
  boxId: string;
  variantId: number;
  variantName: string;
  dataType: string;
  [key: string]: any
}

/**
 * 历史数据列表
 */
export interface HistoryList {
  Request: {
    boxId: string;
    variantId: string;
    startDate: string;
    endDate: string;
  }
  Response: History[]
}

/**
 * 历史数据
 */
export interface History {

}


