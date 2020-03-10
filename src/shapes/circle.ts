import { invert } from '../matrix'
import Shape, { ShapeOpts } from '../shape'
import ShapeSubclass from './shapeSubclass'

export interface CircleShape {
  x: number
  y: number
  r: number
}

export interface CircleOpts extends ShapeOpts {
  shape: CircleShape
}

export default class Circle extends Shape implements ShapeSubclass<CircleShape> {
  name = 'Circle'
  shape: CircleShape

  constructor (opts: CircleOpts) {
    super(opts)
    this.shape = opts.shape
  }

  render (ctx: CanvasRenderingContext2D, shape: CircleShape): this {
    const { x, y, r } = shape
    const [x1, y1] = invert(this.matrix, [x, y, 1])
    ctx.arc(x1, y1, r, 0, 2 * Math.PI)
    ctx.stroke()
    return this
  }
}
