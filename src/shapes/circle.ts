import Bounds from "../bounds";
import { transform } from "../matrix";
import Shape, { ShapeOpts } from "../shape";

export interface CircleShape {
  x: number;
  y: number;
  r: number;
}

export interface CircleOpts extends ShapeOpts {
  shape: CircleShape;
}

export default class Circle extends Shape<CircleShape> {
  name = "Circle";

  shape: CircleShape;

  constructor(opts: CircleOpts) {
    super(opts);
    this.shape = opts.shape;
  }

  get bounds(): Bounds {
    let { x, y } = this.shape;
    const { r } = this.shape;
    let { lineWidth } = this.brush;
    lineWidth = typeof lineWidth === "number" ? lineWidth : 0;
    lineWidth = lineWidth <= 0 ? 0 : lineWidth / 2;

    x = x - r - lineWidth;
    y = y - r - lineWidth;
    const width = 2 * r + lineWidth * 2;
    const height = 2 * r + lineWidth * 2;

    return new Bounds(this, x, y, width, height);
  }

  contains(px: number, py: number): boolean {
    if (!this.bounds.contains(px, py)) {
      return false;
    }

    const { x, y } = this.shape;
    let { r } = this.shape;

    const { lineWidth } = this.brush;
    if (this.GIM) {
      const p = transform([px, py], this.GIM);
      px = p[0];
      py = p[1];
    }

    if (typeof lineWidth === "number") {
      r += lineWidth / 2;
    }

    /**
     * 判断是否在圆内
     * 圆形曲线方程为(r为圆形半径)
     * x^2 + y^2 = r^2
     */
    return Math.sqrt((px - x) ** 2 + (py - y) ** 2) <= r;
  }

  render(ctx: CanvasRenderingContext2D): this {
    const { x, y, r } = this.shape;
    const { lineWidth, fillStyle } = this.brush;

    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.closePath();

    if (lineWidth !== 0) {
      ctx.stroke();
    }

    if (fillStyle) {
      ctx.fill();
    }

    return this;
  }
}
