import Bounds from '../bounds';
import Shape, { ShapeOpts } from '../shape';
import { transform, rotate, invert } from '../matrix';

export interface LineShape {
  x1: number
  y1: number
  x2: number
  y2: number
}

export interface LineOpts extends ShapeOpts {
  shape: LineShape
}

export default class Line extends Shape<LineShape> {
  name = 'Line';

  shape: LineShape;

  constructor(opts: LineOpts) {
    super(opts);
    this.shape = opts.shape;
  }

  get bounds(): Bounds {
    const {
      x1, y1, x2, y2,
    } = this.shape;
    let { lineWidth } = this.brush;
    lineWidth = typeof lineWidth === 'number' ? lineWidth : 0;
    lineWidth = lineWidth <= 0 ? 0 : lineWidth / 2;

    const x = Math.min(x1, x2) - lineWidth;
    const y = Math.min(y1, y2) - lineWidth;
    const width = Math.abs(x1 - x2) + lineWidth * 2;
    const height = Math.abs(y1 - y2) + lineWidth * 2;

    return new Bounds(this, x, y, width, height);
  }

  contains(px: number, py: number): boolean {
    if (!this.bounds.contains(px, py)) {
      return false;
    }

    const {
      x1, y1, x2, y2,
    } = this.shape;
    const { lineWidth } = this.brush;

    const lw = typeof lineWidth === 'number' ? lineWidth / 2 : 0.5;

    if (lw <= 0) {
      return false;
    }

    if (this.GIM) {
      const p = transform([px, py], this.GIM);
      px = p[0];
      py = p[1];
    }

    if (
      px < Math.min(x1, x2) - lw
      || py < Math.min(y1, y2) - lw
      || px > Math.max(x1, x2) + lw
      || py > Math.max(y1, y2) + lw
    ) {
      return false;
    }

    // 直线与x轴的夹角
    const radian = -Math.atan2(y2 - y1, x2 - x1);

    const m = invert(rotate(radian, this.M));
    /**
     * 把直线转换为矩形
     */
    if (m) {
      const p1 = transform([x1, y1], m);
      const p2 = transform([x2, y2], m);
      const p = transform([px, py], m);
      const x = Math.min(p1[0], p2[0]);
      const y = Math.min(p1[1], p2[1]) - lw;
      const width = Math.abs(p2[0] - p1[0]);
      const height = Math.abs(p2[1] - p1[1]) + lw * 2;
      // 判断是否在矩形内
      return x <= p[0] && x + width >= p[0] && y <= p[1] && y + height >= p[1];
    }
    return false;
  }

  render(ctx: CanvasRenderingContext2D): this {
    const {
      x1, y1, x2, y2,
    } = this.shape;
    const { lineWidth } = this.brush;

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    if (lineWidth !== 0) {
      ctx.stroke();
    }

    return this;
  }
}
