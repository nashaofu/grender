import { transform } from '../matrix'
import Shape, { ShapeOpts } from '../shape'

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

  contains (px: number, py: number): boolean {
    let { x, y, width, height } = this.shape
    const { lineWidth } = this.brush

    if (this.GIM) {
      const p = transform([px, py], this.GIM)
      px = p[0]
      py = p[1]
    }

    if (typeof lineWidth === 'number') {
      const lw = lineWidth / 2
      x -= lw
      y -= lw
      width += lineWidth
      height += lineWidth
    }

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
