import Shape from './shape'
import GRender from './grender'
import { createProxyMouseEvent, ProxyMouseEvent } from './utils'

interface Handlers {
  shape: Shape<unknown>
  handler: (e: ProxyMouseEvent) => void
}

const MousemoveHandlers: Handlers[] = []

export function addMouseOverOut<T> (shape: Shape<T>, grender: GRender): void {
  let isOver = false
  let isEnter = false
  const handler = (e: ProxyMouseEvent): void => {
    if (shape.contains(e.x, e.y)) {
      if (!isOver) {
        shape.emit('mouseover', createProxyMouseEvent('mouseover', e.event, shape, grender))
        isOver = true
      }
    } else {
      if (isOver) {
        shape.emit('mouseout', createProxyMouseEvent('mouseout', e.event, shape, grender))
        isOver = false
      }
    }
    if (e.target === shape) {
      if (!isEnter && isOver) {
        shape.emit('mouseenter', createProxyMouseEvent('mouseenter', e.event, shape, grender))
        isEnter = true
      }
    } else {
      if (isEnter) {
        shape.emit('mouseleave', createProxyMouseEvent('mouseleave', e.event, shape, grender))
        isEnter = false
      }
    }
  }
  MousemoveHandlers.push({
    shape,
    handler
  })
  grender.on('mousemove', handler)
}

export function removeMouseOverOut<T> (shape: Shape<T>, grender: GRender): void {
  const index = MousemoveHandlers.findIndex(item => item.shape === shape)
  if (index !== -1) {
    grender.off('mousemove', MousemoveHandlers[index].handler)
    MousemoveHandlers.splice(index, 1)
  }
}
