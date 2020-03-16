import Shape, { ShapeOpts } from '../shape'
import ShapeSubclass, { Bounds } from './shapeSubclass'
import { transform } from '../matrix'

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

  get bounds (): Bounds {
    const { x, y, width, height } = this.shape
    const [x1, y1] = transform([x, y], this.m)
    const [x2, y2] = transform([x + width, y], this.m)
    const [x3, y3] = transform([x + width, y + height], this.m)
    const [x4, y4] = transform([x, y + height], this.m)

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
    const { x, y, width, height } = this.shape
    const { fillStyle, lineWidth } = this.brush
    ctx.rect(x, y, width, height)
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
