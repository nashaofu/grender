import Shape from '../shape'

export default interface ShapeSubclass<ShapeOpts> extends Shape {
  shape: ShapeOpts
  render(ctx: CanvasRenderingContext2D): this
}
