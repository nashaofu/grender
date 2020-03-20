const EVENTS = Symbol('Events')

export interface Handler {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any[]): any
}

export interface EventsHandler {
  once: boolean
  handler: Handler
}

export interface EventsHandlers {
  [key: string]: EventsHandler[]
}

export default class Events {
  readonly [EVENTS]: EventsHandlers = {}

  /**
   * 绑定事件
   * @param event
   * @param handler
   */
  on (event: string, handler: Handler): this | never {
    if (!this[EVENTS][event]) {
      this[EVENTS][event] = []
    }

    if (typeof handler !== 'function') {
      throw new TypeError('argument is not function')
    }

    this[EVENTS][event].push({
      once: false,
      handler
    })
    return this
  }

  /**
   * 绑定事件只触发一次
   * @param event
   * @param handler
   */
  once (event: string, handler: Handler): this | never {
    if (!this[EVENTS][event]) {
      this[EVENTS][event] = []
    }

    if (typeof handler !== 'function') {
      throw new TypeError('argument is not function')
    }

    this[EVENTS][event].push({
      once: true,
      handler
    })
    return this
  }

  /**
   * 移除事件
   * event不存在时移除所有事件
   * handler不存在时移除该事件的所有绑定
   * @param event
   * @param handler
   */
  off (event?: string, handler?: Handler): this | never {
    if (!event) {
      Object.keys(this[EVENTS]).forEach(key => {
        delete this[EVENTS][key]
      })
    } else {
      const handlers = this[EVENTS][event] || []

      // handler不存在，则移除该事件的所有监听
      if (!handler) {
        this[EVENTS][event] = []
      } else {
        const index = handlers.findIndex((h: EventsHandler) => h.handler === handler)
        if (index > -1) {
          handlers.splice(index, 1)
        }
      }
    }
    return this
  }

  /**
   * 触发事件
   * @param event
   * @param args
   */
  emit (event: string, ...args: unknown[]): this {
    const handlers = this[EVENTS][event] || []

    handlers.forEach((h: EventsHandler) => {
      if (h.once) {
        this.off(event, h.handler)
      }
      h.handler.call(this, ...args)
    })
    return this
  }
}
