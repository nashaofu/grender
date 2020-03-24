import Shape from './shape'
import GRender from './grender'

interface Handlers {
  shape: Shape<unknown>
  handler: (e: MouseEvent) => void
}

const MousemoveHandlers: Handlers[] = []

export function addMouseOverOut<T> (shape: Shape<T>, grender: GRender): void {
  let isInner = false
  const handler = (e: MouseEvent): void => {
    if (shape.contains(e.offsetX, e.offsetY)) {
      if (!isInner) {
        shape.emit('mouseover', e)
        isInner = true
      }
    } else {
      if (isInner) {
        shape.emit('mouseout', e)
        isInner = false
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
