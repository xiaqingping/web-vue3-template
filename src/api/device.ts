import service from '@/util/request'
import type {
  BindDevice,
  DeviceImg,
  DeviceIo,
  DeviceList, DeviceParamCategorys,
  DeviceStatusInfo, HistoryList,
  ProjectStatus,
  Properties, VariantsByCategoryList
} from '@/types/device'

/**
 * 绑定设备
 */
export function bindDevice(params: BindDevice['Request']): Promise<BindDevice['Response']> {
  const data = new FormData();
  Object.keys(params).forEach(key => {
    // @ts-ignore
    data.append(key, params[key])
  })
  return service.post('/user/bindDevice', data)
}

/**
 * 设备列表
 */
export function deviceList(data: DeviceList['Request']): Promise<DeviceList['Response']> {
  return service.post('/device/list', data)
}

/**
 * 查询项目状态列表
 */
export function getStatuses(data: ProjectStatus['Request']): Promise<ProjectStatus['Response']> {
  return service.post('/device/statuses', data)
}

/**
 * 设备状态列表
 */
export function getDeviceStatusInfoList(data: DeviceStatusInfo['Request']): Promise<DeviceStatusInfo['Response']> {
  return service.post('/device/getDeviceStatusInfoList', data)
}

/**
 * 获取设备图片
 */
export function getDeviceImg(data: DeviceImg['Request']): Promise<DeviceImg['Response']> {
  return service.post('/device/img', data)
}

/**
 * 设备信息
 */
export function getProperties(data: Properties['Request']): Promise<Properties['Response']> {
  return service.post('/device/properties', data)
}

/**
 * io点位
 */
export function getDeviceIo(data: DeviceIo['Request']): Promise<DeviceIo['Response']> {
  return service.post('/device/io', data)
}

/**
 * 设备参数分类列表
 */
export function getDeviceParamCategorys(data: DeviceParamCategorys['Request']): Promise<DeviceParamCategorys['Response']> {
  return service.post('/variant/getDeviceParamCategorys', data)
}

/**
 * 获取参数分组的变量
 */
export function getVariantsByCategory(data: VariantsByCategoryList['Request']): Promise<VariantsByCategoryList['Response']> {
  return service.post('/variant/getVariantsByCategory', data)
}

/**
 * 获取参数分组的变量
 */
export function getHistoryData(data: HistoryList['Request']): Promise<HistoryList['Response']> {
  return service.post('/variant/historyData', data)
}

