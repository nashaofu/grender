# 图形

## 接口

```ts
// 画笔
interface ShapeBrush {
  fillStyle?: string
  font?: string
  globalAlpha?: number
  lineCap?: 'butt' | 'round' | 'square'
  lineDashOffset?: number
  lineJoin?: 'round' | 'bevel' | 'miter'
  lineWidth?: number
  miterLimit?: number
  shadowBlur?: number
  shadowColor?: string
  shadowOffsetX?: number
  shadowOffsetY?: number
  strokeStyle?: string
  textAlign?: 'left' | 'right' | 'center' | 'start' | 'end'
  textBaseline?: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom'
}

// 形状
interface ShapeOpts {
  // 矩阵变换中心,默认为[0,0]
  origin?: number[]
  t?: number[]
  s?: number[]
  r?: number
  z?: number
  brush?: ShapeBrush
}
```

## Rect

矩形

```ts
interface RectShape {
  x: number
  y: number
  width: number
  height: number
}

interface RectOpts extends ShapeOpts {
  shape: RectShape // 形状
}
new Rect(opts: RectOpts)
```

## Circle

圆形

```ts
interface CircleShape {
  x: number
  y: number
  r: number
}

interface CircleOpts extends ShapeOpts {
  shape: CircleShape
}
new Circle(opts: CircleOpts)
```

## Ellipse

椭圆

```ts
interface EllipseShape {
  x: number
  y: number
  rx: number
  ry: number
}

interface EllipseOpts extends ShapeOpts {
  shape: EllipseShape
}

new Ellipse(opts: EllipseOpts)
```

## Line

直线

```ts
interface LineShape {
  x1: number
  y1: number
  x2: number
  y2: number
}

interface LineOpts extends ShapeOpts {
  shape: LineShape
}

new Line(opts: LineOpts)
```

## Arrow

箭头

```ts
interface ArrowShape {
  x1: number
  y1: number
  x2: number
  y2: number
}

interface ArrowOpts extends ShapeOpts {
  shape: ArrowShape
}

new Arrow(opts: ArrowOpts)
```
