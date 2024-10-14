import type { AlarmCategory, AlarmList } from '@/types/alarm'
import service from '@/util/request'

/**
 * 报警分类
 */
export function alarmCategory(data: AlarmCategory['Request']): Promise<AlarmCategory['Response']> {
  return service.post('/device/alarmCategory', data)
}

/**
 * 报警列表
 * @param data
 */
export function getAlarmList(data: AlarmList['Request']): Promise<AlarmList['Response']> {
  return service.post('/alarm/alarmList', data)
}
