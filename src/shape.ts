import Events from './events'
import GRender from './grender'
import { invert } from './matrix'
import { ShapeBrush } from './shapeBrush'

export interface ShapeOpts {
  t?: number[]
  s?: number[]
  r?: number
  z?: number
  brush?: ShapeBrush
}

export default abstract class Shape<S> extends Events {
  static uid = 0

  // shape的uid
  uid: number

  // 渲染层级
  z = 0

  abstract shape: S
  abstract name: string

  // 画笔
  brush: ShapeBrush = {}

  // 父级元素
  parent?: GRender

  // shape自身的变换矩阵
  M = [1, 0, 0, 1, 0, 0]
  // 逆矩阵
  IM: number[] | null = [1, 0, 0, 1, 0, 0]

  constructor ({ t, s, r, z, brush }: ShapeOpts) {
    super()
    this.uid = Shape.uid++
    if (Array.isArray(t)) {
      this.translate(t[0], t[1])
    }
    if (Array.isArray(s)) {
      this.scale(s[0], s[1])
    }
    if (typeof r === 'number') {
      this.rotate(r)
    }
    if (typeof z === 'number') {
      this.z = z
    }
    if (brush != null) {
      this.brush = brush
    }
  }

  /**
   * 当前变换位置
   */
  get T (): number[] {
    const [, , , , e, f] = this.M

    return [e, f]
  }

  /**
   * 当前缩放比例
   */
  get S (): number[] {
    const [a, b, c, d] = this.M
    return [Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)), Math.sqrt(Math.pow(c, 2) + Math.pow(d, 2))]
  }

  /**
   * 当前旋转角度
   */
  get R (): number {
    const [a, b] = this.M

    return -(Math.atan2(b, a) / Math.PI) * 180
  }

  /**
   * 全局变换矩阵
   */
  get GM (): number[] {
    return this.M
  }

  /**
   * 当前全局变换位置
   */
  get GT (): number[] {
    const [, , , , e, f] = this.GM

    return [e, f]
  }

  /**
   * 当前全局缩放比例
   */
  get GS (): number[] {
    const [a, b, c, d] = this.GM
    return [Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)), Math.sqrt(Math.pow(c, 2) + Math.pow(d, 2))]
  }

  /**
   * 当前全局旋转角度
   */
  get GR (): number {
    const [a, b] = this.GM

    return -(Math.atan2(b, a) / Math.PI) * 180
  }

  /**
   * 位移
   * @param {number} tx
   * @param {number} ty
   */
  translate (tx: number, ty: number): this {
    const [x, y] = this.T

    this.M[4] += tx - x
    this.M[5] += ty - y

    this.IM = invert(this.M)

    this.refresh()
    return this
  }

  /**
   * 缩放
   * @param {number} sx
   * @param {number} sy
   */
  scale (sx: number, sy: number): this {
    const [scaleX, scaleY] = this.S
    const [a, b, c, d] = this.M

    sx /= scaleX
    sy /= scaleY

    this.M[0] = a * sx
    this.M[1] = b * sx
    this.M[2] = c * sy
    this.M[3] = d * sy

    this.IM = invert(this.M)

    this.refresh()
    return this
  }

  /**
   * 旋转
   * @param {number} r
   */
  rotate (r: number): this {
    const radian = ((r - this.R) / 180) * Math.PI
    const sin = Math.sin(radian)
    const cos = Math.cos(radian)
    const [a, b, c, d] = this.M

    /**
     * 相当于[cos, -sin, sin, cos, 0, 0] 乘 this.m
     * x,y坐标不影响
     */
    this.M[0] = a * cos + b * sin
    this.M[1] = -a * sin + b * cos
    this.M[2] = c * cos + d * sin
    this.M[3] = -c * sin + cos * d

    this.IM = invert(this.M)

    this.refresh()
    return this
  }

  /**
   * 刷新shape
   */
  refresh (): this {
    if (this.parent) {
      this.parent.refresh()
    }
    return this
  }

  abstract contains(x: number, y: number): boolean
  abstract render(ctx: CanvasRenderingContext2D): this
}
