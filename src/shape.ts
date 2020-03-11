import Events from './events'
import GRender from './grender'

export interface ShapeOpts {
  t?: number[]
  s?: number[]
  r?: number
  z?: number
}

export default class Shape extends Events {
  // 渲染层级
  z = 0

  // 父级元素
  parent?: GRender

  // shape自身的变换矩阵
  m = [1, 0, 0, 1, 0, 0]

  constructor ({ t, s, r, z }: ShapeOpts) {
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
      this.z = z
    }
  }

  /**
   * 当前变换位置
   */
  get t (): number[] {
    const [, , , , e, f] = this.m

    return [e, f]
  }

  /**
   * 当前缩放比例
   */
  get s (): number[] {
    const [a, b, c, d] = this.m
    return [Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)), Math.sqrt(Math.pow(c, 2) + Math.pow(d, 2))]
  }

  /**
   * 当前旋转角度
   */
  get r (): number {
    const [a, b] = this.m

    return -(Math.atan2(b, a) / Math.PI) * 180
  }

  /**
   * 全局变换矩阵
   */
  get gm (): number[] {
    return this.m
  }

  /**
   * 相对位移
   * @param {number[]} param0
   */
  translate ([tx, ty]: number[]): this {
    this.m[4] += tx
    this.m[5] += ty

    this.refresh()
    return this
  }

  /**
   * 绝对位移
   * @param {number[]} param0
   */
  translateTo ([tx, ty]: number[]): this {
    const [x, y] = this.t

    this.translate([tx - x, ty - y])

    this.refresh()
    return this
  }

  /**
   * 相对缩放
   * @param {number[]} param0
   */
  scale ([sx, sy]: number[]): this {
    const [a, b, c, d] = this.m

    this.m[0] = a * sx
    this.m[1] = b * sx
    this.m[2] = c * sy
    this.m[3] = d * sy

    this.refresh()
    return this
  }

  /**
   * 绝对缩放
   * @param {number[]} param0
   */
  scaleTo ([sx, sy]: number[]): this {
    const [scaleX, scaleY] = this.s

    this.scale([sx / scaleX, sy / scaleY])

    this.refresh()
    return this
  }

  /**
   * 相对旋转
   * @param {number} r
   */
  rotate (r: number): this {
    const radian = (r / 180) * Math.PI
    const sin = Math.sin(radian)
    const cos = Math.cos(radian)
    const [a, b, c, d] = this.m

    /**
     * 相当于[cos, -sin, sin, cos, 0, 0] 乘 this.m
     * x,y坐标不影响
     */
    this.m[0] = a * cos + b * sin
    this.m[1] = -a * sin + b * cos
    this.m[2] = c * cos + d * sin
    this.m[3] = -c * sin + cos * d

    this.refresh()
    return this
  }

  /**
   * 绝对旋转
   * @param {number} r
   */
  rotateTo (r: number): this {
    this.rotate(r - this.r)

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
}
