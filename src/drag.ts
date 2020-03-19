import ShapeSubclass from './shapes/shapeSubclass'

interface DragArgs {
  ox: number
  oy: number
  x: number
  y: number
}

interface DragEventHandler {
  (e: MouseEvent): void
}

const mousemoveHandlers: DragEventHandler[] = []
const mouseupHandlers: DragEventHandler[] = []

window.addEventListener('mousemove', (e: MouseEvent) => {
  mousemoveHandlers.forEach(fn => fn(e))
})

window.addEventListener('mouseup', (e: MouseEvent) => {
  mouseupHandlers.forEach(fn => fn(e))
})

export default function drag<T> (shape: ShapeSubclass<T>): () => void {
  let dragArgs: DragArgs | null = null

  shape.on('mousedown', e => {
    const [x, y] = shape.T
    const { clientX, clientY } = <MouseEvent>e
    dragArgs = {
      ox: clientX - x,
      oy: clientY - y,
      x,
      y
    }
    shape.emit('dragstart', dragArgs, e)
  })

  const mousemove = (e: MouseEvent): void => {
    if (!dragArgs) return
    dragArgs.x = e.x - dragArgs.ox
    dragArgs.y = e.y - dragArgs.oy
    shape.emit('dragging', dragArgs, e)
  }

  const mouseup = (e: MouseEvent): void => {
    if (!dragArgs) return
    dragArgs.x = e.x - dragArgs.ox
    dragArgs.y = e.y - dragArgs.oy
    shape.emit('dragend', dragArgs, e)
    dragArgs = null
  }

  mousemoveHandlers.push(mousemove)
  mouseupHandlers.push(mouseup)
  return (): void => {
    const moveIndex = mousemoveHandlers.findIndex(fn => fn === mousemove)
    const upIndex = mouseupHandlers.findIndex(fn => fn === mouseup)
    if (moveIndex !== -1) {
      mousemoveHandlers.splice(moveIndex, 1)
    }
    if (upIndex !== -1) {
      mouseupHandlers.splice(upIndex, 1)
    }
  }
}
