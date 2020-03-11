import Events from './events'
import ShapeSubclass from './shapes/shapeSubclass'

export default class GRender extends Events {
  el: HTMLElement
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D | null
  shapes: ShapeSubclass<unknown>[] = []

  constructor (el: HTMLElement) {
    super()
    this.el = el
    this.canvas = document.createElement('canvas')
    this.canvas.width = this.el.offsetWidth
    this.canvas.height = this.el.offsetHeight
    this.el.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d')
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
    if (this.ctx !== null) {
      this.ctx.clearRect(0, 0, this.width, this.height)
      for (let i = 0; i < this.shapes.length; i++) {
        const shape = this.shapes[i]
        const [a, b, c, d, e, f] = shape.gm

        // 设置Transform
        this.ctx.setTransform(a, b, c, d, e, f)

        this.ctx.beginPath()
        shape.render(this.ctx)

        // 恢复Transform
        this.ctx.setTransform(1, 0, 0, 1, 0, 0)
      }
    }
    return this
  }
}
