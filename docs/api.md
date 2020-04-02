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

- `refresh(): this`: 浏览器下一帧刷新画布

### 事件

- 事件对象

```ts
interface ProxyEvent {
  event: Event // 浏览器原生事件
  type: string // 事件类型名称
  target: Shape<unknown> | null // 触发事件的最上层图形
  stop: () => void // 停止事件传播
  prevent: () => void // 阻止默认事件
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
