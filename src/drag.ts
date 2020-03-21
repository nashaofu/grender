import Shape from './shape'

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

const MousemoveEventHandlers: EventHandler[] = []
const MouseupEventHandlers: EventHandler[] = []

window.addEventListener('mousemove', (e: MouseEvent) => {
  MousemoveEventHandlers.forEach(({ handler }) => handler(e))
})

window.addEventListener('mouseup', (e: MouseEvent) => {
  MouseupEventHandlers.forEach(({ handler }) => handler(e))
})

export function addDrag<T> (shape: Shape<T>): void {
  let dragArgs: DragArgs | null = null

  shape.on('mousedown', e => {
    if (!shape.parent) return
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
