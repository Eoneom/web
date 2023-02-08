interface AppEvent {
  code: string
  payload: Record<string, unknown>
}

class Socket {
  private websocket: WebSocket
  private live: boolean

  constructor(url: string) {
    this.websocket = new WebSocket(url)
    this.live = false

    this.websocket.onopen = () => {
      console.log('websocket connected')
      this.live = true
    }

    this.websocket.onerror = () => {
      console.log('websocket error occured')
      this.live = false
    }
  }

  send(event: AppEvent): void {
    if (!this.live) {
      console.warn('cannot send event, websocket is not live')
      return
    }

    this.websocket.send(JSON.stringify(event))
  }
}

let socket: Socket

export const useSocket = () => {
  if (!socket) {
    socket = new Socket('ws://localhost:3000')
  }

  return socket
}
