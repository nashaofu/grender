import Shape from '../shape'

interface CircleShape {
  x: number
  y: number
  r: number
}

export default class Circle extends Shape {
  name = 'Circle'

  render (ctx: CanvasRenderingContext2D, shape: CircleShape): this {
    const { x, y, r } = shape
    ctx.fillStyle = 'red'
    ctx.strokeStyle = 'red'
    console.log(shape)
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.stroke()
    return this
  }
}
