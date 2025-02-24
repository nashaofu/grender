import Bounds from "../bounds";
import Shape, { ShapeOpts } from "../shape";
import { transform } from "../matrix";

export interface PolygonShape {
  points: [number, number][]; // 多边形顶点数组
}

export interface PolygonOpts extends ShapeOpts {
  shape: PolygonShape;
}

export default class Polygon extends Shape<PolygonShape> {
  name = "Polygon";
  shape: PolygonShape;

  constructor(opts: PolygonOpts) {
    super(opts);
    this.shape = opts.shape;
  }

  get bounds(): Bounds {
    const { points } = this.shape;
    let { lineWidth } = this.brush;
    lineWidth = typeof lineWidth === "number" ? lineWidth : 0;
    lineWidth = lineWidth <= 0 ? 0 : lineWidth / 2;

    // 计算边界框
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    points.forEach(([x, y]) => {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    });

    // 考虑线宽
    minX -= lineWidth;
    minY -= lineWidth;
    maxX += lineWidth;
    maxY += lineWidth;

    return new Bounds(this, minX, minY, maxX - minX, maxY - minY);
  }

  contains(px: number, py: number): boolean {
    if (!this.bounds.contains(px, py)) {
      return false;
    }

    // 应用全局变换矩阵
    if (this.GIM) {
      const p = transform([px, py], this.GIM);
      px = p[0];
      py = p[1];
    }

    const { points } = this.shape;
    let inside = false;

    // 射线法判断点是否在多边形内部
    // https://zh.wikipedia.org/wiki/%E5%A4%9A%E8%BE%B9%E5%BD%A2%E5%86%85%E7%9A%84%E7%82%B9
    // 射线通常是水平向右的，以简化计算，但是也可以是任意方向
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      const [xi, yi] = points[i];
      const [xj, yj] = points[j];

      // 因为是水平向右射线，所以交点y坐标必须在yi和yj之间
      if (py >= Math.min(yi, yj) && py <= Math.max(yi, yj)) {
        if (yi === yj) {
          inside = !inside;
        } else {
          // 计算交点x坐标
          const x = ((py - yi) * (xj - xi)) / (yj - yi) + xi;
          if (px <= x) {
            inside = !inside;
          }
        }
      }
    }

    // 如果不在内部，检查是否在边上
    if (!inside) {
      const { lineWidth } = this.brush;
      const lw = typeof lineWidth === "number" ? lineWidth / 2 : 0.5;

      for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        const [xi, yi] = points[i];
        const [xj, yj] = points[j];

        // 检查点是否在线段附近
        if (isPointOnLine(px, py, xi, yi, xj, yj, lw)) {
          return true;
        }
      }
    }

    return inside;
  }

  render(ctx: CanvasRenderingContext2D): this {
    const { points } = this.shape;
    const { lineWidth, fillStyle } = this.brush;

    if (points.length < 3) return this;

    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i][0], points[i][1]);
    }
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

// 辅助函数：判断点是否在线段上
function isPointOnLine(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  width: number
): boolean {
  const A = px - x1;
  const B = py - y1;
  const C = x2 - x1;
  const D = y2 - y1;

  const dot = A * C + B * D;
  const len_sq = C * C + D * D;
  let param = -1;

  if (len_sq !== 0) {
    param = dot / len_sq;
  }

  let xx, yy;

  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  const dx = px - xx;
  const dy = py - yy;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance <= width;
}
