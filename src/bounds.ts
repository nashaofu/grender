import Shape from './shape'
import { transform } from './matrix'

export default class Bounds {
  shape: Shape<unknown>
  x: number
  y: number
  width: number
  height: number

  constructor (shape: Shape<unknown>, x: number, y: number, width: number, height: number) {
    this.shape = shape
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  toPoint (): Array<number[]> {
    const GM = this.shape.GM
    const [x1, y1] = transform([this.x, this.y], GM)
    const [x2, y2] = transform([this.x + this.width, this.y], GM)
    const [x3, y3] = transform([this.x + this.width, this.y + this.height], GM)
    const [x4, y4] = transform([this.x, this.y + this.height], GM)

    return [
      [x1, y1],
      [x2, y2],
      [x3, y3],
      [x4, y4]
    ]
  }

  contains (x: number, y: number): boolean {
    const GIM = this.shape.GIM

    if (GIM) {
      [x, y] = transform([x, y], GIM)
    }

    // 判断是否在矩形区域内
    return this.x <= x && this.x + this.width >= x && this.y <= y && this.y + this.height >= y
  }
}
