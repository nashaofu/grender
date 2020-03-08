const EVENTS = Symbol('Events')

export interface Handler {
  type: 'on' | 'once'
  handler: (...args: unknown[]) => unknown
}

export interface Handlers {
  [key: string]: Handler[]
}

export default class Events {
  readonly [EVENTS]: Handlers = {}

  constructor (...args: string[]) {
    args.forEach(event => {
      this[EVENTS][event] = []
    })
  }

  /**
   * 绑定事件
   * @param event
   * @param handler
   */
  on (event: string, handler: (...args: unknown[]) => unknown): this | never {
    if (!this[EVENTS][event]) {
      throw new Error(`unknown event: ${event}`)
    }

    if (typeof handler !== 'function') {
      throw new TypeError('argument is not function')
    }

    this[EVENTS][event].push({
      type: 'on',
      handler
    })
    return this
  }

  /**
   * 绑定事件只触发一次
   * @param event
   * @param handler
   */
  once (event: string, handler: (...args: unknown[]) => unknown): this | never {
    if (!this[EVENTS][event]) {
      throw new Error(`unknown event: ${event}`)
    }

    if (typeof handler !== 'function') {
      throw new TypeError('argument is not function')
    }

    this[EVENTS][event].push({
      type: 'once',
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
  off (event?: string, handler?: (...args: unknown[]) => unknown): this | never {
    if (!event) {
      Object.keys(this[EVENTS]).forEach(key => {
        this[EVENTS][key] = []
      })
    } else {
      const handlers = this[EVENTS][event]
      if (!handlers) {
        throw new Error(`unknown event: ${event}`)
      }
      // handler不存在，则移除该事件的所有监听
      if (!handler) {
        this[EVENTS][event] = []
      } else {
        const index = handlers.findIndex((f: Handler) => f.handler === handler)
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
    const handlers = this[EVENTS][event]
    if (!handlers) {
      throw new Error(`unknown event: ${event}`)
    }

    handlers.forEach((f: Handler) => {
      if (f.type === 'once') {
        this.off(event, f.handler)
      }
      f.handler.call(this, ...args)
    })
    return this
  }
}
