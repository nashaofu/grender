const EVENTS =
  typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
    ? Symbol('Events')
    : `Symbol('Events.${Math.random()
      .toString(16)
      .slice(2)}')`

export default class Events {
  [EVENTS] = {}

  constructor (...args) {
    args.forEach(event => {
      this[EVENTS][event] = []
    })
  }

  /**
   * 绑定事件
   * @param event
   * @param handler
   */
  on (event, handler) {
    if (!this[EVENTS][event]) {
      throw new Error(`unknown event: ${event}`)
    }
    this[EVENTS][event].push(handler)
    return this
  }

  /**
   * 绑定事件只触发一次
   * @param event
   * @param handler
   */
  once (event, handler) {
    const f = (...args) => {
      this.off(event, f)
      handler.call(this, ...args)
    }
    f.handler = handler
    this.on(event, f)
    return this
  }

  /**
   * 移除事件
   * event不存在时移除所有事件
   * handler不存在时移除该事件的所有绑定
   * @param event
   * @param handler
   */
  off (event, handler) {
    if (!event) {
      this[EVENTS] = {}
    } else {
      const handlers = this[EVENTS][event]
      if (!handlers) {
        throw new Error(`unknown event: ${event}`)
      }
      if (!handler) {
        this[EVENTS][event] = []
      } else {
        const index = handlers.findIndex(f => f === handler || f.handler === handler)
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
  emit (event, ...args) {
    const handlers = this[EVENTS][event]
    if (!handlers) {
      throw new Error(`unknown event: ${event}`)
    }
    handlers.forEach(f => f.call(this, ...args))
    return this
  }
}
