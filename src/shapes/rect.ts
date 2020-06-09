import Bounds from '../bounds'
import Shape, { ShapeOpts } from '../shape'

export interface RectShape {
  x: number
  y: number
  width: number
  height: number
}

export interface RectOpts extends ShapeOpts {
  shape: RectShape
}

export default class Rect extends Shape<RectShape> {
  name = 'Rect'
  shape: RectShape

  constructor (opts: RectOpts) {
    super(opts)
    this.shape = opts.shape
  }

  get bounds (): Bounds {
    let { x, y, width, height } = this.shape
    let { lineWidth } = this.brush
    lineWidth = typeof lineWidth === 'number' ? lineWidth : 0
    lineWidth = lineWidth <= 0 ? 0 : lineWidth / 2

    x = x - lineWidth
    y = y - lineWidth
    width = width + lineWidth * 2
    height = height + lineWidth * 2

    return new Bounds(this, x, y, width, height)
  }

  contains (x: number, y: number): boolean {
    return this.bounds.contains(x, y)
  }

  render (ctx: CanvasRenderingContext2D): this {
    const { x, y, width, height } = this.shape
    const { lineWidth, fillStyle } = this.brush

    ctx.rect(x, y, width, height)
    ctx.closePath()

    if (lineWidth !== 0) {
      ctx.stroke()
    }

    if (fillStyle) {
      ctx.fill()
    }

    return this
  }
}
