import Shape from './shape'
import GRender from './grender'
import { transform } from './matrix'

export interface ProxyMouseEvent {
  event: MouseEvent
  type: string
  target: Shape<unknown> | null
  stop: () => void
  prevent: () => void
  x: number
  y: number
}

export function createProxyMouseEvent (
  type: string,
  event: MouseEvent,
  target: Shape<unknown> | null,
  grender: GRender
): ProxyMouseEvent {
  const [x, y] = transform([event.offsetX, event.offsetY], grender.GM)

  const proxyEvent = {
    event,
    type,
    target,
    stop (): void {
      event.stopPropagation()
      event.cancelBubble = true
    },
    prevent (): void {
      event.preventDefault()
      event.returnValue = false
    },
    x,
    y
  }
  return proxyEvent
}
