import Events from './events'
import ShapeSubclass from './shapes/shapeSubclass'
import Shape from './shape'

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
    this.render()
    return this
  }

  add<T> (shape: ShapeSubclass<T>): this {
    shape.parent = this
    this.shapes.push(shape)
    this.render()
    return this
  }

  remove<T> (shape: ShapeSubclass<T>): this {
    const index = this.shapes.findIndex(item => item === shape)
    if (index !== -1) {
      this.shapes.splice(index, 1)
    }
    this.render()
    return this
  }

  render (): this {
    if (this.ctx !== null) {
      this.ctx.clearRect(0, 0, this.width, this.height)
      for (let i = 0; i < this.shapes.length; i++) {
        const shape = this.shapes[i]
        const [a, b, c, d, e, f] = shape.matrix

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
