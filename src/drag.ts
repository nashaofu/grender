import Shape from './shape'
import GRender from './grender'
import { ProxyMouseEvent } from './utils'

interface Handlers {
  mousedown: (e: ProxyMouseEvent) => void
  windowMousemove: (e: MouseEvent) => void
  windowMouseup: (e: MouseEvent) => void
}

interface EventHandler {
  shape: Shape<unknown>
  handlers: Handlers
}

interface DragArgs {
  ox: number
  oy: number
  x: number
  y: number
}

const eventHandlers: EventHandler[] = []

export function addDrag<T> (shape: Shape<T>, grender: GRender): void {
  let dragArgs: DragArgs | null = null

  const mousedown = (e: ProxyMouseEvent): void => {
    if (!shape.parent || e.target !== shape) return
    const [x, y] = shape.T
    const { clientX, clientY } = <MouseEvent>e.event
    dragArgs = {
      ox: clientX - x,
      oy: clientY - y,
      x,
      y
    }
    shape.emit('dragstart', dragArgs, e)
  }

  const windowMousemove = (e: MouseEvent): void => {
    if (!shape.parent || !dragArgs) return
    dragArgs.x = e.x - dragArgs.ox
    dragArgs.y = e.y - dragArgs.oy
    shape.emit('dragging', dragArgs, e)
  }

  const windowMouseup = (e: MouseEvent): void => {
    if (!shape.parent || !dragArgs) return
    dragArgs.x = e.x - dragArgs.ox
    dragArgs.y = e.y - dragArgs.oy
    shape.emit('dragend', dragArgs, e)
    dragArgs = null
  }

  shape.on('mousedown', mousedown)

  grender.on('windowMousemove', windowMousemove)

  grender.on('windowMouseup', windowMouseup)

  eventHandlers.push({
    shape,
    handlers: {
      mousedown,
      windowMousemove,
      windowMouseup
    }
  })
}

export function removeDrag<T> (shape: Shape<T>, grender: GRender): void {
  const index = eventHandlers.findIndex(handler => handler.shape === shape)
  if (index !== -1) {
    const eventHandler = eventHandlers[index]

    shape.off('mousedown', eventHandler.handlers.mousedown)
    grender.off('windowMousemove', eventHandler.handlers.windowMousemove)
    grender.off('windowMouseup', eventHandler.handlers.windowMouseup)

    eventHandlers.splice(index, 1)
  }
}
