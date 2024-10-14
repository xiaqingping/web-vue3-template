import service from '@/util/request'
import type { Messages } from '@/types/messages'

/**
 * 报警列表
 * @param data
 */
export function getMessages(data: Messages['Request']): Promise<Messages['Response']> {
  return service.post('/message/messages', data)
}
