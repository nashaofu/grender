# grender![workflow](https://github.com/nashaofu/grender/workflows/workflow/badge.svg)

A lightweight canvas library for 2D.

## TODOS

- [ ] ctx 编写一个代理层，方便控制 API 权限，同时也有利于 ts 编译
- [ ] ctx 的画笔也要抽取与归纳，不要直接使用原生的，所以需要提取一个 style 对象
- [x] 鼠标事件支持：支持`click`、`dblclick`、`wheel`、`mousedown`、`mousemove`、`mouseup`、`mouseover`、`mouseout`.`mouseenter`行为与`mouseover`类似，`mouseleave`行为与`mouseout`类似，目前只考虑实现其中一个
- [ ] 事件系统完善，drag 事件只出发上层元素

## Demo

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>GRender</title>
    <style>
      html,
      body,
      #app {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <div id="app"></div>
    <script src="../dist/grender.js"></script>
    <script>
      const grender = new GRender.default(document.querySelector('#app'))

      const rect1 = new GRender.Rect({
        shape: {
          x: 0,
          y: 0,
          width: 40,
          height: 80
        },
        z: 2
      })
      const circle1 = new GRender.Circle({
        shape: {
          x: 10,
          y: 20,
          r: 40
        },
        z: 1
      })
      circle1.translate(100, 200)

      const rect2 = new GRender.Rect({
        shape: {
          x: 0,
          y: 50,
          width: 40,
          height: 80
        },
        z: 1
      })

      rect1.rotate(30).translate(100, 20)
      rect2
        .rotate(30)
        .translate(200, 50)
        .scale(2, 1)

      const ellipse1 = new GRender.Ellipse({
        shape: {
          x: 100,
          y: 100,
          rx: 90,
          ry: 60
        },
        brush: {
          lineWidth: 20
        },
        z: 3
      })

      // ellipse1.translate(100, 20)

      console.log(rect1)

      grender.add(rect1)
      grender.add(rect2)
      grender.add(circle1)
      grender.add(ellipse1)

      grender.shapes.forEach(shape => {
        shape.on('dragging', e => {
          shape.brush.fillStyle = 'red'
          shape.translate(e.x, e.y)
          grender.refresh()
        })

        shape.on('mouseover', e => {
          shape.brush.fillStyle = 'red'
          grender.refresh()
        })
        shape.on('mouseout', e => {
          shape.brush.fillStyle = 'rgba(0,0,0,0)'
          grender.refresh()
        })

        grender.on('mouseup', () => {
          shape.brush.fillStyle = 'rgba(0,0,0,0)'
          grender.refresh()
        })
      })

      console.log(grender)
      window.addEventListener('resize', () => {
        grender.resize()
      })
    </script>
  </body>
</html>
```
