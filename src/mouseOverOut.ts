import Shape from './shape'
import GRender from './grender'
import { createProxyEvent, ProxyEvent } from './utils'

interface Handlers {
  shape: Shape<unknown>
  handler: (e: ProxyEvent) => void
}

const MousemoveHandlers: Handlers[] = []

export function addMouseOverOut<T> (shape: Shape<T>, grender: GRender): void {
  let isOver = false
  let isEnter = false
  const handler = (e: ProxyEvent): void => {
    const { offsetX, offsetY } = <MouseEvent>e.event
    if (shape.contains(offsetX, offsetY)) {
      if (!isOver) {
        shape.emit('mouseover', createProxyEvent('mouseover', e.event, shape))
        isOver = true
      }
    } else {
      if (isOver) {
        shape.emit('mouseout', createProxyEvent('mouseout', e.event, shape))
        isOver = false
      }
    }
    if (e.target === shape) {
      if (!isEnter && isOver) {
        shape.emit('mouseenter', createProxyEvent('mouseenter', e.event, shape))
        isEnter = true
      }
    } else {
      if (isEnter) {
        shape.emit('mouseleave', createProxyEvent('mouseleave', e.event, shape))
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
