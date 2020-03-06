import Shape from '../shape'

export default class Circle extends Shape {
  name='Circle'
  shape = {
    x: 0,
    y: 0,
    r: 0
  }

  render (ctx, shape) {
    const { x, y, r } = shape
    ctx.arc(x, y, r, 0, 2 * Math.PI)
  }
}
