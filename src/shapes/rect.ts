import { invert } from '../matrix'
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

  render (ctx: CanvasRenderingContext2D, shape: RectShape): this {
    const { x, y, width, height } = shape
    const [x1, y1] = invert(this.matrix, [x, y, 1])
    const [x2, y2] = invert(this.matrix, [x + width, y + height, 1])
    ctx.rect(x1, y1, Math.abs(x2 - x1), Math.abs(y2 - y1))
    ctx.stroke()
    return this
  }
}
