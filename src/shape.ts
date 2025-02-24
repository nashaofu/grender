import Events from './events';
import type Bounds from './bounds';
import type GRender from './grender';
import { ShapeBrush } from './shapeBrush';
import { invert, multiply } from './matrix';

export interface ShapeOpts {
  origin?: number[];
  t?: number[];
  s?: number[];
  r?: number;
  z?: number;
  brush?: ShapeBrush;
}

export default abstract class Shape<S> extends Events {
  static uid = 0;

  // shape的uid
  uid: number;

  // 渲染层级
  z = 0;

  abstract shape: S;

  abstract name: string;

  abstract bounds: Bounds;

  // 画笔
  brush: ShapeBrush = {};

  // 父级元素
  parent?: GRender;

  // shape自身的变换矩阵
  M = [1, 0, 0, 1, 0, 0];

  // 矩阵变换中心
  origin = [0, 0];

  constructor({
 origin, t, s, r, z, brush 
}: ShapeOpts) {
    super();
    this.uid = Shape.uid++;
    if (Array.isArray(origin)) {
      this.origin = origin;
    }
    if (Array.isArray(t)) {
      this.translate(t[0], t[1]);
    }
    if (Array.isArray(s)) {
      this.scale(s[0], s[1]);
    }
    if (typeof r === 'number') {
      this.rotate(r);
    }
    if (typeof z === 'number') {
      this.z = z;
    }
    if (brush != null) {
      this.brush = brush;
    }
  }

  /**
   * 局部逆矩阵
   */
  get IM(): number[] | null {
    return invert(this.M);
  }

  /**
   * 当前变换位置
   */
  get T(): number[] {
    const [, , , , e, f] = this.M;

    return [e, f];
  }

  /**
   * 当前缩放比例
   */
  get S(): number[] {
    const [a, b, c, d] = this.M;
    return [Math.sqrt(a ** 2 + b ** 2), Math.sqrt(c ** 2 + d ** 2)];
  }

  /**
   * 当前旋转角度
   */
  get R(): number {
    const [a, b] = this.M;

    return -(Math.atan2(b, a) / Math.PI) * 180;
  }

  /**
   * 全局变换矩阵
   */
  get GM(): number[] {
    const m1 = this.parent?.GM;
    const m2 = this.M;

    if (!m1) {
      return m2;
    }
    return multiply(m1, m2);
  }

  /**
   * 全局逆矩阵
   */
  get GIM(): number[] | null {
    return invert(this.GM);
  }

  /**
   * 当前全局变换位置
   */
  get GT(): number[] {
    const [, , , , e, f] = this.GM;

    return [e, f];
  }

  /**
   * 当前全局缩放比例
   */
  get GS(): number[] {
    const [a, b, c, d] = this.GM;
    return [Math.sqrt(a ** 2 + b ** 2), Math.sqrt(c ** 2 + d ** 2)];
  }

  /**
   * 当前全局旋转角度
   */
  get GR(): number {
    const [a, b] = this.GM;

    return -(Math.atan2(b, a) / Math.PI) * 180;
  }

  /**
   * 位移
   * @param {number} tx
   * @param {number} ty
   */
  translate(tx: number, ty: number): this {
    const [x, y] = this.T;

    this.M[4] += tx - x;
    this.M[5] += ty - y;

    this.refresh();
    return this;
  }

  /**
   * 缩放
   * @param {number} sx
   * @param {number} sy
   */
  scale(sx: number, sy: number): this {
    const [x, y] = this.origin;
    const [scaleX, scaleY] = this.S;
    sx /= scaleX;
    sy /= scaleY;

    this.M = multiply(this.M, [sx, 0, 0, sy, (1 - sx) * x, (1 - sy) * y]);

    this.refresh();
    return this;
  }

  /**
   * 旋转
   * @param {number} r
   */
  rotate(r: number): this {
    const [x, y] = this.origin;
    const radian = ((r - this.R) / 180) * Math.PI;
    const sin = Math.sin(radian);
    const cos = Math.cos(radian);

    this.M = multiply(this.M, [
      cos,
      sin,
      -sin,
      cos,
      (1 - cos) * x + sin * y,
      -sin * x + (1 - cos) * y,
    ]);

    this.refresh();
    return this;
  }

  /**
   * 刷新shape
   */
  refresh(): this {
    if (this.parent) {
      this.parent.refresh();
    }
    return this;
  }

  abstract contains(x: number, y: number): boolean;
  abstract render(ctx: CanvasRenderingContext2D): this;
}
