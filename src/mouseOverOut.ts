import Shape from './shape'

interface Handlers {
  shape: Shape<unknown>
  handler: (e: MouseEvent) => void
}

const MousemoveHandlers: Handlers[] = []

window.addEventListener('mousemove', (e: MouseEvent) => {
  MousemoveHandlers.forEach(({ handler }) => handler(e))
})

export function addMouseOverOut<T> (shape: Shape<T>): void {
  let isInner = false
  MousemoveHandlers.push({
    shape,
    handler: (e: MouseEvent): void => {
      if (!shape.parent) return
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
  })
}

export function removeMouseOverOut<T> (shape: Shape<T>): void {
  const index = MousemoveHandlers.findIndex(item => item.shape === shape)
  if (index !== -1) {
    MousemoveHandlers.splice(index, 1)
  }
}
