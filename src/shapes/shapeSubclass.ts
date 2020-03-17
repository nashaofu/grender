import Shape from '../shape'

export default interface ShapeSubclass<ShapeOpts> extends Shape {
  shape: ShapeOpts
  contains(x: number, y: number): boolean
  render(ctx: CanvasRenderingContext2D): this
}
