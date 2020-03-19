import ShapeSubclass from './shapes/shapeSubclass'

interface HoverArgs {
  ox: number
  oy: number
  x: number
  y: number
}

interface HoverEventHandler {
  (e: MouseEvent): void
}

const mousemoveHandlers: HoverEventHandler[] = []
const mouseupHandlers: HoverEventHandler[] = []

window.addEventListener('mousemove', (e: MouseEvent) => {
  mousemoveHandlers.forEach(fn => fn(e))
})

window.addEventListener('mouseup', (e: MouseEvent) => {
  mouseupHandlers.forEach(fn => fn(e))
})

export default function hover <T> (shape: ShapeSubclass<T>): () => void {
  let isInner = false

  const mousemove = (e: MouseEvent): void => {
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
  window.addEventListener('mousemove', mousemove)

  return (): void => {
    window.removeEventListener('mousemove', mousemove)
  }
}
