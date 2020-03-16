import Shape, { ShapeOpts } from '../shape'
import ShapeSubclass, { Bounds } from './shapeSubclass'
import { transform } from '../matrix'

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
    const { x, y, r } = this.shape
    const [x1, y1] = transform([x - r, y - r], this.m)
    const [x2, y2] = transform([x + r, y - r], this.m)
    const [x3, y3] = transform([x + r, y + r], this.m)
    const [x4, y4] = transform([x - r, y + r], this.m)

    const bX = Math.min(x1, x2, x3, x4)
    const bY = Math.min(y1, y2, y3, y4)
    const bWidth = Math.max(x1, x2, x3, x4) - bX
    const bHeight = Math.max(y1, y2, y3, y4) - bY

    return {
      x: bX,
      y: bY,
      width: bWidth,
      height: bHeight
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
