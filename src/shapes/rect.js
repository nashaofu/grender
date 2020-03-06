import Shape from '../shape'

export default class Rect extends Shape {
  name='Rect'
  shape = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }

  render (ctx, shape) {
    const { x, y, width, height } = shape
    ctx.rect(x, y, width, height)
  }
}
