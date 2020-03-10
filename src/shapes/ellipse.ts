import Shape, { ShapeOpts } from '../shape'
import ShapeSubclass from './shapeSubclass'

export interface EllipseShape {
  x: number
  y: number
  rx: number
  ry: number
}

export interface EllipseOpts extends ShapeOpts {
  shape: EllipseShape
}

export default class Ellipse extends Shape implements ShapeSubclass<EllipseShape> {
  name = 'Ellipse'

  shape: EllipseShape

  constructor (opts: EllipseOpts) {
    super(opts)
    this.shape = opts.shape
  }

  render (ctx: CanvasRenderingContext2D): this {
    const { x, y, rx, ry } = this.shape

    const k = 0.5522848
    const ox = rx * k // 水平控制点偏移量
    const oy = ry * k // 垂直控制点偏移量
    // 从椭圆的左端点开始顺时针绘制四条三次贝塞尔曲线
    ctx.moveTo(x - rx, y)
    ctx.bezierCurveTo(x - rx, y - oy, x - ox, y - ry, x, y - ry)
    ctx.bezierCurveTo(x + ox, y - ry, x + rx, y - oy, x + rx, y)
    ctx.bezierCurveTo(x + rx, y + oy, x + ox, y + ry, x, y + ry)
    ctx.bezierCurveTo(x - ox, y + ry, x - rx, y + oy, x - rx, y)
    ctx.stroke()
    return this
  }
}
