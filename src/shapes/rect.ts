import { transform } from '../matrix'
import Shape, { ShapeOpts, Bounds } from '../shape'

export interface RectShape {
  x: number
  y: number
  width: number
  height: number
}

export interface RectOpts extends ShapeOpts {
  shape: RectShape
}

export default class Rect extends Shape<RectShape> {
  name = 'Rect'
  shape: RectShape

  constructor (opts: RectOpts) {
    super(opts)
    this.shape = opts.shape
  }

  get bounds (): Bounds {
    let { x, y, width, height } = this.shape
    let { lineWidth } = this.brush
    lineWidth = typeof lineWidth === 'number' ? lineWidth : 0
    lineWidth = lineWidth <= 0 ? 0 : lineWidth / 2

    x = x - lineWidth
    y = y - lineWidth
    width = width + lineWidth * 2
    height = height + lineWidth * 2

    return { x, y, width, height }
  }

  contains (px: number, py: number): boolean {
    let { x, y, width, height } = this.shape
    let { lineWidth } = this.brush
    lineWidth = typeof lineWidth === 'number' ? lineWidth : 0
    lineWidth = lineWidth <= 0 ? 0 : lineWidth / 2

    if (this.GIM) {
      const p = transform([px, py], this.GIM)
      px = p[0]
      py = p[1]
    }

    x -= lineWidth
    y -= lineWidth
    width += lineWidth * 2
    height += lineWidth * 2

    // 判断是否在矩形内
    return x <= px && x + width >= px && y <= py && y + height >= py
  }

  render (ctx: CanvasRenderingContext2D): this {
    const { x, y, width, height } = this.shape
    const { lineWidth, fillStyle } = this.brush

    ctx.rect(x, y, width, height)
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
