import Events from './events'
import ShapeSubclass from './shapes/shapeSubclass'
import { defaultShapeBrushs, ShapeBrush } from './shapeBrush'

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
    window.addEventListener('mousedown', this.mousedown)
    window.addEventListener('mousemove', this.mousemove)
    window.addEventListener('mouseup', this.mouseup)
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

  destroy (): this {
    this.shapes = []
    window.removeEventListener('mousedown', this.mousedown)
    window.removeEventListener('mousemove', this.mousemove)
    window.removeEventListener('mouseup', this.mouseup)
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

    this.refresh()
    return this
  }

  remove<T> (shape: ShapeSubclass<T>): this {
    const index = this.shapes.findIndex(item => item === shape)
    if (index !== -1) {
      this.shapes.splice(index, 1)
    }
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

  mousedown = (e: Event): this => {
    this.shapes.reverse().forEach(shape => {
      if (shape.contains(e.x, e.y)) {
        shape.emit('mousedown', e)
      }
    })
    return this
  }

  mousemove = (e: Event): this => {
    this.shapes.reverse().forEach(shape => {
      if (shape.contains(e.x, e.y)) {
        shape.emit('mousemove', e)
      }
    })
    return this
  }

  mouseup = (e: Event): this => {
    this.shapes.reverse().forEach(shape => {
      if (shape.contains(e.x, e.y)) {
        shape.emit('mouseup', e)
      }
    })
    return this
  }
}
