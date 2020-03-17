import { transform } from '../matrix'
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

  contains (px: number, py: number): boolean {
    let { x, y, r } = this.shape
    const { lineWidth } = this.brush
    if (this.IM) {
      const p = transform([px, py], this.IM)
      px = p[0]
      py = p[1]
    }

    if (lineWidth > 0) {
      r += lineWidth / 2
    }

    // 判断是否在圆内
    return Math.sqrt((px - x) ** 2 + (py - y) ** 2) <= r
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
