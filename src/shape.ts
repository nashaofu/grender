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
    super()
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
    const [, , , , e, f] = this.matrix

    const radian = -(this.r / 180) * Math.PI
    return [Math.cos(radian) * e - Math.sin(radian) * f, Math.sin(radian) * e + Math.cos(radian) * f]
  }

  get s (): number[] {
    const [a, b, c, d] = this.matrix
    return [Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)), Math.sqrt(Math.pow(c, 2) + Math.pow(d, 2))]
  }

  get r (): number {
    const [a, b] = this.matrix

    return (Math.atan2(b, a) / Math.PI) * 180
  }

  translate ([tx, ty]: number[]): this {
    this.matrix = multiply(this.matrix, [1, 0, 0, 1, tx, ty])
    if (this.parent) {
      this.parent.render()
    }
    return this
  }

  scale ([sx, sy]: number[]): this {
    this.matrix = multiply(this.matrix, [sx, 0, 0, sy, 0, 0])
    if (this.parent) {
      this.parent.render()
    }
    return this
  }

  rotate (r: number): this {
    const radian = (r / 180) * Math.PI
    this.matrix = multiply(this.matrix, [Math.cos(radian), Math.sin(radian), -Math.sin(radian), Math.cos(radian), 0, 0])
    if (this.parent) {
      this.parent.render()
    }
    return this
  }

  setZ (z: number): this {
    this.z = z
    return this
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render (ctx: CanvasRenderingContext2D, shape: unknown): this {
    return this
  }
}
