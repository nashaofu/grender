import Shape, { ShapeOpts } from '../shape'
import { transform, rotate, invert } from '../matrix'

export interface ArrowShape {
  x1: number
  y1: number
  x2: number
  y2: number
}

export interface ArrowOpts extends ShapeOpts {
  shape: ArrowShape
}

export default class Arrow extends Shape<ArrowShape> {
  name = 'Arrow'
  shape: ArrowShape

  constructor (opts: ArrowOpts) {
    super(opts)
    this.shape = opts.shape
  }

  contains (px: number, py: number): boolean {
    const { x1, y1, x2, y2 } = this.shape
    const { lineWidth } = this.brush

    const lw = typeof lineWidth === 'number' ? lineWidth / 2 : 0.5

    if (lw <= 0) {
      return false
    }

    if (this.GIM) {
      const p = transform([px, py], this.GIM)
      px = p[0]
      py = p[1]
    }

    if (
      px < Math.min(x1 - lw, x2 - lw) ||
      py < Math.min(y1 - lw, y2 - lw) ||
      px > Math.max(x1 + lw, x2 + lw) ||
      py > Math.max(y1 + lw, y2 + lw)
    ) {
      return false
    }

    // 直线与x轴的夹角
    const radian = -Math.atan2(y2 - y1, x2 - x1)

    const m = invert(rotate(radian, this.M))
    /**
     * 把直线转换为矩形
     */
    if (m) {
      const p1 = transform([x1, y1], m)
      const p2 = transform([x2, y2], m)
      const p = transform([px, py], m)
      const x = Math.min(p1[0], p2[0])
      const y = Math.min(p1[1], p2[1]) - lw
      const width = Math.abs(p2[0] - p1[0])
      const height = Math.abs(p2[1] - p1[1]) + lw * 2
      // 判断是否在矩形内
      return x <= p[0] && x + width >= p[0] && y <= p[1] && y + height >= p[1]
    } else {
      return false
    }
  }

  render (ctx: CanvasRenderingContext2D): this {
    const { x1, y1, x2, y2 } = this.shape
    const { lineWidth } = this.brush

    const lw = typeof lineWidth === 'number' ? lineWidth : 1

    const shouldStroke = lw !== 0

    const radian = Math.atan2(y2 - y1, x2 - x1)
    const sin = Math.sin(radian)
    const cos = Math.cos(radian)

    const h = lw * 2
    const a = lw * 0.8
    const x3 = x2 - h * cos
    const y3 = y2 - h * sin
    const x4 = x3 - a * sin
    const y4 = y3 + a * cos
    const x5 = x3 + a * sin
    const y5 = y3 - a * cos

    ctx.fillStyle = ctx.strokeStyle

    ctx.moveTo(x1, y1)
    ctx.lineTo(x3, y3)
    ctx.moveTo(x3, y3)
    ctx.lineTo(x4, y4)
    ctx.lineTo(x2, y2)
    ctx.lineTo(x5, y5)
    ctx.lineTo(x4, y4)
    ctx.closePath()

    if (shouldStroke) {
      ctx.stroke()
      ctx.fill()
    }

    return this
  }
}
