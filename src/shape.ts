import Events from './events'
import { multiply } from './matrix'
import GRender from './grender'

export interface ShapeOpts {
  t?: number[]
  s?: number[]
  r?: number
  z?: number
  shape: ShapeOptsShape
  [key: string]: unknown
}

export interface ShapeOptsShape {
  [key: string]: unknown
}

export default class Shape extends Events {
  z = 0
  parent?: GRender
  matrix = [1, 0, 0, 1, 0, 0]
  shape: ShapeOptsShape

  constructor ({ t, s, r, z, shape }: ShapeOpts) {
    super(
      'click',
      'dbclick',
      'mouseenter',
      'mousemove',
      'mouseleave',
      'mousedown',
      'mouseup',
      'mouseover',
      'contextmenu'
    )
    if (t != null) {
      this.translate(t)
    }
    if (s != null) {
      this.scale(s)
    }
    if (r != null) {
      this.rotate(r)
    }
    if (z != null) {
      this.setZ(z)
    }
    this.shape = shape
  }

  get t (): number[] {
    return [this.matrix[4], this.matrix[5]]
  }

  get s (): number[] {
    return [this.matrix[0], this.matrix[3]]
  }

  get r (): number[] {
    return [this.matrix[0], this.matrix[3]]
  }

  translate ([translateX, translateY]: number[]): this {
    this.matrix = multiply(this.matrix, [1, 0, 0, 1, translateX, translateY])
    if (this.parent) {
      this.parent.render()
    }
    return this
  }

  scale ([scaleX, scaleY]: number[]): this {
    this.matrix = multiply(this.matrix, [scaleX, 0, 0, scaleY, 0, 0])
    if (this.parent) {
      this.parent.render()
    }
    return this
  }

  rotate (rotate: number): this {
    if (this.parent) {
      this.parent.render()
    }
    return this
  }

  setZ (z: number): this {
    this.z = z
    return this
  }

  render (ctx: CanvasRenderingContext2D, shape: unknown): this {
    return this
  }
}
