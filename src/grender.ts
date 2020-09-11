import Events from './events'
import Shape from './shape'
import { addDrag, removeDrag } from './drag'
import { createProxyMouseEvent } from './utils'
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

    window.addEventListener('mousemove', this.onWindowMousemove)
    window.addEventListener('mouseup', this.onWindowMouseup)

    this.resize()
  }

  get dpr (): number {
    return window.devicePixelRatio || 1
  }

  get GM (): number[] {
    return [this.dpr, 0, 0, this.dpr, 0, 0]
  }

  get width (): number {
    return this.canvas.width
  }

  get height (): number {
    return this.canvas.height
  }

  resize (): this {
    this.canvas.width = this.el.offsetWidth * this.dpr
    this.canvas.height = this.el.offsetHeight * this.dpr
    this.canvas.style.setProperty('width', `${this.el.offsetWidth}px`)
    this.canvas.style.setProperty('height', `${this.el.offsetHeight}px`)
    this.refresh()
    return this
  }

  clear (): this {
    this.shapes.forEach(shape => {
      shape.off()
      removeDrag(shape, this)
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
      removeDrag(shape, this)
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

    window.removeEventListener('mousemove', this.onWindowMousemove)
    window.removeEventListener('mouseup', this.onWindowMouseup)

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

    addDrag(shape, this)
    addMouseOverOut(shape, this)

    this.refresh()
    return this
  }

  remove<T> (shape: Shape<T>): this {
    const index = this.shapes.findIndex(item => item === shape)
    if (index !== -1) {
      this.shapes.splice(index, 1)
    }

    removeDrag(shape, this)
    removeMouseOverOut(shape, this)

    this.refresh()
    return this
  }

  refresh (): this {
    if (this.raf != null) {
      cancelAnimationFrame(this.raf)
    }

    this.raf = requestAnimationFrame(() => this.render())
    return this
  }

  render (): this {
    const [ga, gb, gc, gd, ge, gf] = this.GM

    this.ctx.clearRect(0, 0, this.width, this.height)

    this.shapes.forEach(shape => {
      const [a, b, c, d, e, f] = shape.GM

      // 设置Transform
      this.ctx.setTransform(a, b, c, d, e, f)
      ;(Object.keys(defaultShapeBrushs) as Array<keyof ShapeBrush>).forEach(key => {
        const shapeBrush = shape.brush[key]
        const defaultValue = defaultShapeBrushs[key]
        this.ctx[key] = (shapeBrush == null ? defaultValue : shapeBrush) as never
      })

      this.ctx.beginPath()
      shape.render(this.ctx)
    })

    // 恢复Transform
    this.ctx.setTransform(ga, gb, gc, gd, ge, gf)

    return this
  }

  private onClick = (e: MouseEvent): this => {
    const event = createProxyMouseEvent('click', e, null, this)

    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i]
      if (shape.contains(event.x, event.y)) {
        if (!event.target) {
          event.target = shape
        }
        shape.emit('click', event)
      }
    }
    this.emit('click', event)
    return this
  }

  private onDblclick = (e: MouseEvent): this => {
    const event = createProxyMouseEvent('dblclick', e, null, this)

    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i]
      if (shape.contains(event.x, event.y)) {
        if (!event.target) {
          event.target = shape
        }
        shape.emit('dblclick', event)
      }
    }
    this.emit('dblclick', event)
    return this
  }

  private onWheel = (e: WheelEvent): this => {
    const event = createProxyMouseEvent('wheel', e, null, this)

    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i]
      if (shape.contains(event.x, event.y)) {
        if (!event.target) {
          event.target = shape
        }
        shape.emit('wheel', event)
      }
    }
    this.emit('wheel', event)
    return this
  }

  private onMousedown = (e: MouseEvent): this => {
    const event = createProxyMouseEvent('mousedown', e, null, this)
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i]
      if (shape.contains(event.x, event.y)) {
        if (!event.target) {
          event.target = shape
        }
        shape.emit('mousedown', event)
      }
    }
    this.emit('mousedown', event)
    return this
  }

  private onMousemove = (e: MouseEvent): this => {
    const event = createProxyMouseEvent('mousemove', e, null, this)

    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i]
      if (shape.contains(event.x, event.y)) {
        if (!event.target) {
          event.target = shape
        }
        shape.emit('mousemove', event)
      }
    }
    this.emit('mousemove', event)
    return this
  }

  private onMouseup = (e: MouseEvent): this => {
    const event = createProxyMouseEvent('mouseup', e, null, this)

    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i]
      if (shape.contains(event.x, event.y)) {
        if (!event.target) {
          event.target = shape
        }
        shape.emit('mouseup', event)
      }
    }
    this.emit('mouseup', event)
    return this
  }

  private onContextMenu = (e: MouseEvent): this => {
    const event = createProxyMouseEvent('contextmenu', e, null, this)

    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i]
      if (shape.contains(event.x, event.y)) {
        if (!event.target) {
          event.target = shape
        }
        shape.emit('contextmenu', event)
      }
    }
    this.emit('contextmenu', event)
    return this
  }

  private onWindowMousemove = (e: MouseEvent): this => {
    this.emit('windowMousemove', e)
    return this
  }

  private onWindowMouseup = (e: MouseEvent): this => {
    this.emit('windowMouseup', e)
    return this
  }
}
