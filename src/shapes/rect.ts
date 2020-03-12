import Shape, { ShapeOpts } from '../shape'
import ShapeSubclass from './shapeSubclass'

export interface RectShape {
  x: number
  y: number
  width: number
  height: number
}

export interface RectOpts extends ShapeOpts {
  shape: RectShape
}

export default class Rect extends Shape implements ShapeSubclass<RectShape> {
  name = 'Rect'
  shape: RectShape

  constructor (opts: RectOpts) {
    super(opts)
    this.shape = opts.shape
  }

  render (ctx: CanvasRenderingContext2D): this {
    const { x, y, width, height } = this.shape
    const { fillStyle } = this.brush
    ctx.rect(x, y, width, height)
    ctx.closePath()
    if (fillStyle) {
      ctx.fill()
    }
    ctx.stroke()
    return this
  }
}
