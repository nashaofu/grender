import Events from './events'
import ShapeSubclass from './shapes/shapeSubclass'
import { defaultShapeBrushs, ShapeBrush } from './shapeBrush'
import { addDrag, removeDrag } from './drag'
import { addMouseOverAndOut, removeMouseOverAndOut } from './mouseOverAndOut'

export default class GRender extends Events {
  el: HTMLElement
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  raf?: number
  shapes: ShapeSubclass<unknown>[] = []

  constructor (el: HTMLElement) {
    super()
    this.el = el
    this.canvas = document.createElement('canvas')
    this.canvas.width = this.el.offsetWidth
    this.canvas.height = this.el.offsetHeight
    this.el.appendChild(this.canvas)
    this.ctx = <CanvasRenderingContext2D> this.canvas.getContext('2d')

    this.canvas.addEventListener('click', this.onClick)
    this.canvas.addEventListener('dblclick', this.onDblclick)
    this.canvas.addEventListener('wheel', this.onWheel)
    this.canvas.addEventListener('mousedown', this.onMousedown)
    this.canvas.addEventListener('mousemove', this.onMousemove)
    this.canvas.addEventListener('mouseup', this.onMouseup)
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
      removeMouseOverAndOut(shape)
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
      removeMouseOverAndOut(shape)
    })
    this.off()
    this.shapes = []
    this.canvas.removeEventListener('click', this.onClick)
    this.canvas.removeEventListener('wheel', this.onWheel)
    this.canvas.removeEventListener('mousedown', this.onMousedown)
    this.canvas.removeEventListener('mousemove', this.onMousemove)
    this.canvas.removeEventListener('mouseup', this.onMouseup)

    this.el.removeChild(this.canvas)

    return this
  }

  add<T> (shape: ShapeSubclass<T>): this {
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
    addMouseOverAndOut(shape)

    this.refresh()
    return this
  }

  remove<T> (shape: ShapeSubclass<T>): this {
    const index = this.shapes.findIndex(item => item === shape)
    if (index !== -1) {
      this.shapes.splice(index, 1)
    }

    removeDrag(shape)
    removeMouseOverAndOut(shape)

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
    this.shapes.forEach(shape => {
      if (shape.contains(e.offsetX, e.offsetY)) {
        shape.emit('click', e)
      }
    })
    this.emit('click', e)
    return this
  }

  onDblclick = (e: MouseEvent): this => {
    this.shapes.forEach(shape => {
      if (shape.contains(e.offsetX, e.offsetY)) {
        shape.emit('dblclick', e)
      }
    })
    this.emit('dblclick', e)
    return this
  }

  onWheel = (e: WheelEvent): this => {
    this.shapes.forEach(shape => {
      if (shape.contains(e.offsetX, e.offsetY)) {
        shape.emit('wheel', e)
      }
    })
    this.emit('wheel', e)
    return this
  }

  onMousedown = (e: MouseEvent): this => {
    this.shapes.forEach(shape => {
      if (shape.contains(e.offsetX, e.offsetY)) {
        shape.emit('mousedown', e)
      }
    })
    this.emit('mousedown', e)
    return this
  }

  onMousemove = (e: MouseEvent): this => {
    this.shapes.forEach(shape => {
      if (shape.contains(e.offsetX, e.offsetY)) {
        shape.emit('mousemove', e)
      }
    })
    this.emit('mousemove', e)
    return this
  }

  onMouseup = (e: MouseEvent): this => {
    this.shapes.forEach(shape => {
      if (shape.contains(e.offsetX, e.offsetY)) {
        shape.emit('mouseup', e)
      }
    })
    this.emit('mouseup', e)
    return this
  }
}
