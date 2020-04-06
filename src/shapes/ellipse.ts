import { transform } from '../matrix'
import Shape, { ShapeOpts } from '../shape'

export interface EllipseShape {
  x: number
  y: number
  rx: number
  ry: number
}

export interface EllipseOpts extends ShapeOpts {
  shape: EllipseShape
}

export default class Ellipse extends Shape<EllipseShape> {
  name = 'Ellipse'
  shape: EllipseShape

  constructor (opts: EllipseOpts) {
    super(opts)
    this.shape = opts.shape
  }

  contains (px: number, py: number): boolean {
    let { x, y, rx, ry } = this.shape
    const { lineWidth } = this.brush

    if (this.IM) {
      const p = transform([px, py], this.IM)
      px = p[0]
      py = p[1]
    }

    if (typeof lineWidth === 'number') {
      const lw = lineWidth / 2
      rx += lw
      ry += lw
    }

    /**
     * 判断是否在椭圆内
     * 椭圆曲线方程为(cx,cy为椭圆中心点)
     * (x-cx)^2/a^2 + (y-cy)^2/b^2 = 1
     */
    return (px - x) ** 2 / rx ** 2 + (py - y) ** 2 / ry ** 2 <= 1
  }

  render (ctx: CanvasRenderingContext2D): this {
    const { x, y, rx, ry } = this.shape
    const { lineWidth, fillStyle } = this.brush

    const k = 0.5522848
    const ox = rx * k // 水平控制点偏移量
    const oy = ry * k // 垂直控制点偏移量
    // 从椭圆的左端点开始顺时针绘制四条三次贝塞尔曲线
    ctx.moveTo(x - rx, y)
    ctx.bezierCurveTo(x - rx, y - oy, x - ox, y - ry, x, y - ry)
    ctx.bezierCurveTo(x + ox, y - ry, x + rx, y - oy, x + rx, y)
    ctx.bezierCurveTo(x + rx, y + oy, x + ox, y + ry, x, y + ry)
    ctx.bezierCurveTo(x - ox, y + ry, x - rx, y + oy, x - rx, y)
    ctx.closePath()

    if (lineWidth !== 0) {
      ctx.stroke()
    }

    if (fillStyle) {
      ctx.fill()
    }

    return this
  }
}
