import GRender from "./grender";
import Shape from "./shape";
import Line from "./shapes/line";
import Rect from "./shapes/rect";
import Arrow from "./shapes/arrow";
import Circle from "./shapes/circle";
import Ellipse from "./shapes/ellipse";
import Polygon from "./shapes/polygon";

import type { ShapeOpts } from "./shape";
import type { LineOpts, LineShape } from "./shapes/line";
import type { RectOpts, RectShape } from "./shapes/rect";
import type { ArrowOpts, ArrowShape } from "./shapes/arrow";
import type { CircleOpts, CircleShape } from "./shapes/circle";
import type { EllipseOpts, EllipseShape } from "./shapes/ellipse";

export {
  Shape,
  Line,
  LineShape,
  Arrow,
  ArrowShape,
  Rect,
  RectShape,
  Circle,
  CircleShape,
  Ellipse,
  EllipseShape,
  Polygon,
  GRender,
  GRender as default,
};

export type {
  ShapeOpts,
  LineOpts,
  ArrowOpts,
  RectOpts,
  CircleOpts,
  EllipseOpts,
};
