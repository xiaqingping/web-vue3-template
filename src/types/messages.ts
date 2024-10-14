
/**
 * 报警列表
 */
export interface Messages {
  Request: {
    keyword: string;
    readStatus: string; // 状态，0:未读，1:已读
    pageNo: string;
    pageSize: string;
    msgType: string; // 选项 alarmMsg
    startTime: string;
    endTime: string;
  }
  Response: {
    records: Alarm[];
    current: number;
    size: number;
    total: number;
  }
}

/**
 * 报警
 */
export interface Alarm {
  id: string;
  deviceId: string;
  time: string;
  content: string;
  deviceName: string;
}
