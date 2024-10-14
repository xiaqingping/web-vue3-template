import useRequest from '@/hooks/useRequest'
import type { DeviceIo } from '@/types/device'
import { getDeviceIo } from '@/api/device'
import { onUnmounted, ref } from 'vue'
import { WebsocketClient } from '@/util/WebSocket'

let plcTimer: any = null

const usePLC = (cb?) => {

  const statuses = ref<{ [key in string]: any }>({})

  const { state: deviceIo, send: getIo } = useRequest<DeviceIo['Request'], DeviceIo['Response']>(getDeviceIo)

  const query = (deviceId) => {
    getIo({ deviceId }).then(() => initWs())
  }

  const initWs = () => {
    clearInterval(plcTimer)

    const websocket: any = new WebsocketClient()

    websocket.setConnectedHandler(() => query())

    websocket.addMessageHandler('/rangeDataItem', (strMap: any) => {
      statuses.value = strMap
      if (cb) cb(strMap)
    })

    // 执行websocket
    websocket.start()

    const query = () => {
      // 整理id
      let keyObj: any = {}
      const list: any[] = []

      Object.values(deviceIo.value).forEach(item => list.push(...item))

      list.forEach((element: any) => {
        if (keyObj[element.boxId]) {
          keyObj[element.boxId].push(String(element.variantId))
        } else {
          keyObj[element.boxId] = [String(element.variantId)]
        }
      })
      websocket.send('/rangeDataItem', keyObj)
    }

    plcTimer = setInterval(() => {
      query()
    }, 1000)
  }

  // 在组件销毁时执行清理工作
  onUnmounted(() => {
    clearInterval(plcTimer)
  })

  return { query, statuses, deviceIo }
}

export default usePLC
