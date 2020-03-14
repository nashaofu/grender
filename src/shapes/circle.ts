import Shape, { ShapeOpts } from '../shape'
import ShapeSubclass, { Bounds } from './shapeSubclass'

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

  get bounds (): Bounds {
    return {
      x: 9,
      y: 0,
      width: 0,
      height: 0
    }
  }

  render (ctx: CanvasRenderingContext2D): this {
    const { x, y, r } = this.shape
    const { fillStyle, lineWidth } = this.brush
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.closePath()
    if (fillStyle) {
      ctx.fill()
    }
    if (lineWidth !== 0) {
      ctx.stroke()
    }
    return this
  }
}
