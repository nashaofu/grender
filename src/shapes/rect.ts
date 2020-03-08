import Shape from '../shape'

interface RectShape {
  x: number
  y: number
  width: number
  height: number
}

export default class Rect extends Shape {
  name = 'Rect'
  // shape: RectShape = {
  //   x: 0,
  //   y: 0,
  //   width: 0,
  //   height: 0
  // }

  render (ctx: CanvasRenderingContext2D, shape: RectShape): this {
    const { x, y, width, height } = shape
    ctx.rect(x, y, width, height)
    return this
  }
}
