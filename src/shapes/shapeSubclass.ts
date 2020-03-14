import Shape from '../shape'

export interface Bounds {
  x: number
  y: number
  width: number
  height: number
}

export default interface ShapeSubclass<ShapeOpts> extends Shape {
  shape: ShapeOpts
  render(ctx: CanvasRenderingContext2D): this
  bounds: Bounds
}
