import Shape, { ShapeOpts } from '../shape'
import ShapeSubclass, { Bounds } from './shapeSubclass'

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

  get bounds (): Bounds {
    return {
      x: 9,
      y: 0,
      width: 0,
      height: 0
    }
  }

  render (ctx: CanvasRenderingContext2D): this {
    const { x, y, rx, ry } = this.shape
    const { fillStyle, lineWidth } = this.brush

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
    if (fillStyle) {
      ctx.fill()
    }
    if (lineWidth !== 0) {
      ctx.stroke()
    }
    return this
  }
}
