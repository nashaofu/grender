import Shape from './shape'
import { ProxyMouseEvent } from './utils'

interface EventHandler {
  shape: Shape<unknown>
  handler(e: MouseEvent): void
}

interface DragArgs {
  ox: number
  oy: number
  x: number
  y: number
}

interface InitListener {
  (): void
  inited?: boolean
}

const MousemoveEventHandlers: EventHandler[] = []
const MouseupEventHandlers: EventHandler[] = []

/**
 * 便于SSR
 */
const initListener: InitListener = function (): void {
  initListener.inited = true
  window.addEventListener('mousemove', (e: MouseEvent) => {
    MousemoveEventHandlers.forEach(({ handler }) => handler(e))
  })

  window.addEventListener('mouseup', (e: MouseEvent) => {
    MouseupEventHandlers.forEach(({ handler }) => handler(e))
  })
}

export function addDrag<T> (shape: Shape<T>): void {
  if (!initListener.inited) {
    initListener()
  }
  let dragArgs: DragArgs | null = null

  shape.on('mousedown', (e: ProxyMouseEvent) => {
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
  })

  MousemoveEventHandlers.push({
    shape,
    handler: (e: MouseEvent): void => {
      if (!shape.parent || !dragArgs) return
      dragArgs.x = e.x - dragArgs.ox
      dragArgs.y = e.y - dragArgs.oy
      shape.emit('dragging', dragArgs, e)
    }
  })

  MouseupEventHandlers.push({
    shape,
    handler: (e: MouseEvent): void => {
      if (!shape.parent || !dragArgs) return
      dragArgs.x = e.x - dragArgs.ox
      dragArgs.y = e.y - dragArgs.oy
      shape.emit('dragend', dragArgs, e)
      dragArgs = null
    }
  })
}

export function removeDrag<T> (shape: Shape<T>): void {
  const mousemoveIndex = MousemoveEventHandlers.findIndex(handler => handler.shape === shape)
  const mouseupIndex = MouseupEventHandlers.findIndex(handler => handler.shape === shape)
  if (mousemoveIndex !== -1) {
    MousemoveEventHandlers.splice(mousemoveIndex, 1)
  }
  if (mouseupIndex !== -1) {
    MouseupEventHandlers.splice(mouseupIndex, 1)
  }
}
