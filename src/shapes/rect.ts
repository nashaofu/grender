import Shape, { ShapeOpts } from '../shape'
import ShapeSubclass, { Bounds } from './shapeSubclass'
import { multiply } from '../matrix'

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
    const m1 = multiply([1, 0, 0, 1, x, y], this.m)
    const m2 = multiply([1, 0, 0, 1, x + width, y + height], this.m)
    return {
      x: m1[4],
      y: m1[5],
      width: m2[4] - m1[4],
      height: m2[5] - m1[5]
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
