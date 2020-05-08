# API

## GRender

### 初始化

```js
const grender = new GRender((el: HTMLElement))
```

### 方法

- `resize(): this`: 重新调整画布大小

- `clear(): this`: 移除画布上的所有元素

- `destroy(): this`: 销毁画布

- `add<T>(shape: Shape<T>): this`: 添加图形到画布上

- `remove<T>(shape: Shape<T>): this`: 移除画布上的图形

- `refresh(): this`: 浏览器下一帧刷新画布，异步执行

- `render(): this`: 立即刷新画布，同步执行

### 鼠标事件

- 事件对象

```ts
interface ProxyMouseEvent {
  event: Event // 浏览器原生事件
  type: string // 事件类型名称
  target: Shape<unknown> | null // 触发事件的最上层图形
  stop: () => void // 停止事件传播
  prevent: () => void // 阻止默认事件
  x: number // 转换后的坐标
  y: number // 转换后的坐标
}
```

#### 支持事件列表

- click
- dblclick
- wheel
- mousedown
- mousemove
- mouseup
- contextmenu
- mouseover
- mouseout
- mouseenter

## Shape

grender渲染的图形都必须继承自`Shape`类。子类必须实现`shape`、`name`属性，和`contains`、`render`方法

```ts
abstract class Shape<S> extends Events {
  abstract shape: S
  abstract name: string

  abstract contains(x: number, y: number): boolean
  abstract render(ctx: CanvasRenderingContext2D): this

  static uid = 0

  // shape的uid
  uid: number

  // 渲染层级
  z = 0

  // 画笔
  brush: ShapeBrush = {}

  // 父级元素
  parent?: GRender

  // shape自身的变换矩阵
  M = [1, 0, 0, 1, 0, 0]

  /**
   * 局部逆矩阵
   */
  get IM (): number[] | null

  /**
   * 当前变换位置
   */
  get T (): number[]

  /**
   * 当前缩放比例
   */
  get S (): number[]

  /**
   * 当前旋转角度
   */
  get R (): number

  /**
   * 全局变换矩阵
   */
  get GM (): number[]

  /**
   * 全局逆矩阵
   */
  get GIM (): number[] | null

  /**
   * 当前全局变换位置
   */
  get GT (): number[]

  /**
   * 当前全局缩放比例
   */
  get GS (): number[]

  /**
   * 当前全局旋转角度
   */
  get GR (): number

  /**
   * 位移
   * @param {number} tx
   * @param {number} ty
   */
  translate (tx: number, ty: number): this

  /**
   * 缩放
   * @param {number} sx
   * @param {number} sy
   */
  scale (sx: number, sy: number): this

  /**
   * 旋转
   * @param {number} r
   */
  rotate (r: number): this

  /**
   * 刷新shape
   */
  refresh (): this
}
```
