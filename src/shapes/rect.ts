import Shape from '../shape'
import { invert } from '../matrix'

interface RectShape {
  x: number
  y: number
  width: number
  height: number
}

export default class Rect extends Shape {
  name = 'Rect'

  render (ctx: CanvasRenderingContext2D, shape: RectShape): this {
    const { x, y, width, height } = shape
    const [x1, y1] = invert(this.matrix, [x, y, 1])
    const [x2, y2] = invert(this.matrix, [x + width, y + height, 1])
    ctx.rect(x1, y1, Math.abs(x2 - x1), Math.abs(y2 - y1))
    ctx.stroke()
    return this
  }
}
