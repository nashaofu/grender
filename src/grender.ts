import Events from './events'
import Shape from './shape'
import { createProxyEvent } from './utils'
import { addDrag, removeDrag } from './drag'
import { defaultShapeBrushs, ShapeBrush } from './shapeBrush'
import { addMouseOverOut, removeMouseOverOut } from './mouseOverOut'

export default class GRender extends Events {
  el: HTMLElement
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  raf?: number
  shapes: Shape<unknown>[] = []

  constructor (el: HTMLElement) {
    super()
    this.el = el

    this.el.style.setProperty('overflow', 'hidden')
    this.el.style.setProperty('user-select', 'none')
    this.el.style.setProperty('position', 'relative')
    this.el.style.setProperty('touch-action', 'pan-y')
    this.el.style.setProperty('-webkit-user-drag', 'none')
    this.el.style.setProperty('-webkit-user-select', 'none')
    this.el.style.setProperty('-webkit-tap-highlight-color', 'transparent')

    this.canvas = document.createElement('canvas')
    this.canvas.width = this.el.offsetWidth
    this.canvas.height = this.el.offsetHeight
    this.canvas.style.setProperty('overflow', 'hidden')
    this.canvas.style.setProperty('user-select', 'none')
    this.canvas.style.setProperty('position', 'relative')
    this.canvas.style.setProperty('touch-action', 'none')
    this.canvas.style.setProperty('-webkit-user-drag', 'none')
    this.canvas.style.setProperty('-webkit-user-select', 'none')
    this.canvas.style.setProperty('-webkit-tap-highlight-color', 'transparent')

    this.el.appendChild(this.canvas)
    this.ctx = <CanvasRenderingContext2D> this.canvas.getContext('2d')

    this.canvas.addEventListener('click', this.onClick)
    this.canvas.addEventListener('dblclick', this.onDblclick)
    this.canvas.addEventListener('wheel', this.onWheel)
    this.canvas.addEventListener('mousedown', this.onMousedown)
    this.canvas.addEventListener('mousemove', this.onMousemove)
    this.canvas.addEventListener('mouseup', this.onMouseup)
    this.canvas.addEventListener('contextmenu', this.onContextMenu)
  }

  get width (): number {
    return this.canvas.width
  }

  get height (): number {
    return this.canvas.height
  }

  resize (): this {
    this.canvas.width = this.el.offsetWidth
    this.canvas.height = this.el.offsetHeight
    this.refresh()
    return this
  }

  clear (): this {
    this.shapes.forEach(shape => {
      shape.off()
      removeDrag(shape)
      removeMouseOverOut(shape, this)
    })
    this.shapes = []

    this.refresh()

    return this
  }

  destroy (): this {
    // 清理事件监听
    this.shapes.forEach(shape => {
      shape.off()
      removeDrag(shape)
      removeMouseOverOut(shape, this)
    })
    this.off()
    this.shapes = []
    this.canvas.removeEventListener('click', this.onClick)
    this.canvas.removeEventListener('wheel', this.onWheel)
    this.canvas.removeEventListener('mousedown', this.onMousedown)
    this.canvas.removeEventListener('mousemove', this.onMousemove)
    this.canvas.removeEventListener('mouseup', this.onMouseup)
    this.canvas.removeEventListener('contextmenu', this.onContextMenu)

    this.el.removeChild(this.canvas)

    return this
  }

  add<T> (shape: Shape<T>): this {
    shape.parent = this
    let i = this.shapes.length - 1

    // 按z值顺序插入
    for (; i >= 0; i--) {
      if (this.shapes[i].z <= shape.z) {
        i += 1
        break
      }
    }

    this.shapes.splice(i, 0, shape)

    addDrag(shape)
    addMouseOverOut(shape, this)

    this.refresh()
    return this
  }

  remove<T> (shape: Shape<T>): this {
    const index = this.shapes.findIndex(item => item === shape)
    if (index !== -1) {
      this.shapes.splice(index, 1)
    }

    removeDrag(shape)
    removeMouseOverOut(shape, this)

    this.refresh()
    return this
  }

  refresh (): this {
    this.render()
    return this
  }

  render (): this {
    if (this.raf != null) {
      cancelAnimationFrame(this.raf)
    }

    this.raf = requestAnimationFrame(() => {
      this.ctx.clearRect(0, 0, this.width, this.height)

      this.shapes.forEach(shape => {
        const [a, b, c, d, e, f] = shape.GM

        // 设置Transform
        this.ctx.setTransform(a, b, c, d, e, f)

        this.ctx.beginPath()
        ;(<Array<keyof ShapeBrush>>Object.keys(defaultShapeBrushs)).forEach(key => {
          const shapeBrush = shape.brush[key]
          const defaultValue = defaultShapeBrushs[key]
          this.ctx[key] = <never>(shapeBrush == null ? defaultValue : shapeBrush)
        })

        shape.render(this.ctx)

        // 恢复Transform
        this.ctx.setTransform(1, 0, 0, 1, 0, 0)
      })
    })

    return this
  }

  onClick = (e: MouseEvent): this => {
    const event = createProxyEvent('click', e, null)

    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i]
      if (shape.contains(e.offsetX, e.offsetY)) {
        if (!event.target) {
          event.target = shape
        }
        shape.emit('click', event)
      }
    }
    this.emit('click', event)
    return this
  }

  onDblclick = (e: MouseEvent): this => {
    const event = createProxyEvent('dblclick', e, null)

    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i]
      if (shape.contains(e.offsetX, e.offsetY)) {
        if (!event.target) {
          event.target = shape
        }
        shape.emit('dblclick', event)
      }
    }
    this.emit('dblclick', event)
    return this
  }

  onWheel = (e: WheelEvent): this => {
    const event = createProxyEvent('wheel', e, null)

    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i]
      if (shape.contains(e.offsetX, e.offsetY)) {
        if (!event.target) {
          event.target = shape
        }
        shape.emit('wheel', event)
      }
    }
    this.emit('wheel', event)
    return this
  }

  onMousedown = (e: MouseEvent): this => {
    const event = createProxyEvent('mousedown', e, null)
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i]
      if (shape.contains(e.offsetX, e.offsetY)) {
        if (!event.target) {
          event.target = shape
        }
        shape.emit('mousedown', event)
      }
    }
    this.emit('mousedown', event)
    return this
  }

  onMousemove = (e: MouseEvent): this => {
    const event = createProxyEvent('mousemove', e, null)

    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i]
      if (shape.contains(e.offsetX, e.offsetY)) {
        if (!event.target) {
          event.target = shape
        }
        shape.emit('mousemove', event)
      }
    }
    this.emit('mousemove', event)
    return this
  }

  onMouseup = (e: MouseEvent): this => {
    const event = createProxyEvent('mouseup', e, null)

    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i]
      if (shape.contains(e.offsetX, e.offsetY)) {
        if (!event.target) {
          event.target = shape
        }
        shape.emit('mouseup', event)
      }
    }
    this.emit('mouseup', event)
    return this
  }

  onContextMenu = (e: MouseEvent): this => {
    const event = createProxyEvent('contextmenu', e, null)

    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i]
      if (shape.contains(e.offsetX, e.offsetY)) {
        if (!event.target) {
          event.target = shape
        }
        shape.emit('contextmenu', event)
      }
    }
    this.emit('contextmenu', event)
    return this
  }
}
