// @ts-ignore
import SockJS from 'sockjs-client/dist/sockjs.min.js'
import Stomp from 'stompjs'
import { guid } from '@/util/index'
import { useConfigStore } from '@/stores/user'

const config = useConfigStore()

export class WebsocketClient {
  socket
  stompClient
  headers
  uuid = guid()
  /**
   * 连接成功后的回调
   */
  onConnectedCallback

  /**
   * 注册的url和回调
   */
  urlHandlers: any[]

  /**
   * 重连间隔
   */
  reconnectDelay = 1

  /**
   * 当前连接状态
   */
  isConnected = false

  baseUrl: string = import.meta.env.VITE_APP_WEBSOCKET_API

  constructor() {
    this.urlHandlers = []
    this.onConnectedCallback = () => {
    }
    this.headers = {
      Authorization: 'Bearer ' + config.AgentToken
    }
    // 建立连接对象
    this.socket = new SockJS(this.baseUrl + '/ws?access_token=' + config.AgentToken)
    // 获取STOMP子协议的客户端对象
    this.stompClient = Stomp.over(this.socket)
    //关闭stomp的debug
    this.stompClient.debug = () => {
    }
  }

  /**
   * 设置连接成功的回调方法
   * @param onConnectedCallback 连接成功的回调
   */
  setConnectedHandler(onConnectedCallback: any) {
    this.onConnectedCallback = onConnectedCallback
  }

  /**
   * 添加接口地址及回调方法
   * @param path 路径
   * @param handler 回调方法
   */
  addMessageHandler(path: string, handler: any) {
    this.urlHandlers.push({
      url: path,
      handler: handler
    })
  }

  /**
   * 启动连接
   */
  start() {
    let self = this
    this.stompClient.connect(
      this.headers,
      () => {
        self.onConnectedEvent()
      },
      () => {
        self.onDisconnectedEvent()
      }
    )
  }

  /**
   * 关闭连接
   */
  stop() {
    WS.disconnect(this.stompClient)
  }

  /**
   * 发送请求
   * @param path 路径
   * @param params 参数
   * @returns
   */
  send(path: string, params: any) {
    if (!this.isConnected) return

    this.stompClient.send(
      path,
      {
        uuid: this.uuid
      },
      JSON.stringify(params)
    )
  }

  onConnectedEvent() {
    this.isConnected = true
    this.reconnectDelay = 1

    this.urlHandlers.forEach((t) => {
      const customHeaders = {
        Authorization: 'Bearer ' + config.AgentToken,
        id: guid()
      }
      this.stompClient.subscribe(
        '/user/' + this.uuid + '/queue' + t.url,
        (msg: any) => {
          let data = msg.body
          // 判断是否属于实时数据，如诺属于实时数据则将其解码
          if (t.url.includes('rangeDataItem'))
            data = atob(msg.body)
          // 订阅服务端提供的某个topic
          t.handler(JSON.parse(data))
        },
        customHeaders
      )
    })

    this.onConnectedCallback()
  }

  onDisconnectedEvent() {
    this.isConnected = false
    this.reconnectDelay *= 1.2
    const time = Math.min(10000, 1000 * this.reconnectDelay)
    setTimeout(() => {
      // 建立连接对象
      this.socket = new SockJS(this.baseUrl + '?access_token=' + config.AgentToken)
      // 获取STOMP子协议的客户端对象
      this.stompClient = Stomp.over(this.socket)
      //关闭stomp的debug
      this.stompClient.debug = () => {
      }
      this.start()
    }, time)
  }
}

var WS = {
  connection(uuid: any, handler: any, url: any, callFuc: any) {
    let urlHandler = []
    urlHandler.push({ url, handler })
    return this.connectionBatch(uuid, urlHandler, callFuc)
  },
  connectionBatch(uuid: any, UrlHandlerList: any, callFuc: any) {
    const headers = {
      Authorization: 'Bearer ' + config.AgentToken
    }
    // 建立连接对象
    let socket = new SockJS(this?.baseUrl + '?access_token=' + config.AgentToken)
    // 获取STOMP子协议的客户端对象
    let stompClient = Stomp.over(socket)
    //关闭stomp的debug
    stompClient.debug = () => {
    }
    // 向服务器发起websocket连接
    stompClient.connect(
      headers,
      () => {
        UrlHandlerList.forEach((element: any) => {
          stompClient.subscribe(
            '/user/' + uuid + '/queue/' + element.url,
            (msg: any) => {
              let data = msg.body
              // 判断是否属于实时数据，如诺属于实时数据则将其解码
              if (element.url.includes('rangeDataItem'))
                data = atob(msg.body)
              // 订阅服务端提供的某个topic
              element.handler(data)
            },
            headers
          )
        })
        if (callFuc) {
          callFuc(stompClient)
        }
      },
      (err: any) => {
        // 连接发生错误时的处理函数
        console.log('socket connect is fail')
        console.log(err)
      }
    )
    return stompClient
  },
  disconnect(stomp: any) {
    if (stomp !== null && stomp !== undefined && stomp.connected) {
      stomp.disconnect()
    }
  }
}

export default { ...WS }
