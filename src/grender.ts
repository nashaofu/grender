import Events from './events'
import Shape from './shape'

export default class GRender extends Events {
  el: HTMLElement
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D | null
  shapes: Shape[] = []
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

  add (shape: Shape): this {
    shape.parent = this
    this.shapes.push(shape)
    this.render()
    return this
  }

  remove (shape: Shape): this {
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
      this.shapes.forEach(shape => {
        shape.render(<CanvasRenderingContext2D> this.ctx, shape.shape)
      })
    }
    return this
  }
}
