/**
 * 报警分类
 */
export interface AlarmCategory {
  Request: {
    deviceId: string;
  }
  Response: Alarm[]
}

export interface Alarm {
  id: string;
  name: string;
  nameEn: string;
}

/**
 * 报警列表
 */
export interface AlarmList {
  Request: {
    categoryId: string;
  }
  Response: {
    id: string;
    alarmDetail: string;
    alarmTime: string;
  }[]
}
