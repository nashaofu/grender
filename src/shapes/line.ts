import { transform } from '../matrix'
import Shape, { ShapeOpts } from '../shape'

export interface LineShape {
  x1: number
  y1: number
  x2: number
  y2: number
}

export interface LineOpts extends ShapeOpts {
  shape: LineShape
}

export default class Rect extends Shape<LineShape> {
  name = 'Line'
  shape: LineShape

  constructor (opts: LineOpts) {
    super(opts)
    this.shape = opts.shape
  }

  contains (px: number, py: number): boolean {
    const { x1, y1, x2, y2 } = this.shape
    const { lineWidth } = this.brush

    if (this.IM) {
      const p = transform([px, py], this.IM)
      px = p[0]
      py = p[1]
    }

    const lw = typeof lineWidth === 'number' ? lineWidth / 2 : 0

    /**
     * 直线的方程为
     * Ax + By + C = 0 其中(A、B不同时为0)
     * 点到直线的距离|Ax+By+C|/√(A^2+B^2)
     */
    const A = y2 - y1
    const B = x1 - x2
    const C = x2 * y1 - x1 * y2

    // 直线没有长度，缩为一个点
    if (A === 0 && B === 0) {
      return Math.sqrt((px - x1) ** 2 + (py - y1) ** 2) <= lw
    } else {
      /**
       * 判断是否在直线上
       * 同时限制不能超出线段长度范围
       * TODO: 判断不准确，后续修改
       */
      return (
        Math.abs(A * px + B * py + C) / Math.sqrt(A ** 2 + B ** 2) <= lw &&
        px >= Math.min(x1, x2) &&
        py >= Math.min(y1, y2) &&
        px <= Math.max(x1, x2) &&
        py <= Math.max(y1, y2)
      )
    }
  }

  render (ctx: CanvasRenderingContext2D): this {
    const { x1, y1, x2, y2 } = this.shape
    const { lineWidth } = this.brush
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)

    if (lineWidth !== 0) {
      ctx.stroke()
    }
    return this
  }
}
