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

  render (ctx: CanvasRenderingContext2D): this {
    const { x, y, r } = this.shape
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.stroke()
    return this
  }
}
