---
home: true
heroImage: /logo.svg
actionText: 快速上手 →
actionLink: /guide/
footer: MIT Licensed | Copyright © 2020 nashaofu
---

## 起步

安装：

```bash
npm i grender
# or
yarn add grender
```

示例

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
    <script>
      import 'core-js'
      import GRender, { Rect } from 'grender'

      const grender = new GRender(document.querySelector('#app'))
      const rect = new Rect({
        shape: {
          x: 0,
          y: 0,
          width: 40,
          height: 80
        },
        z: 2
      })

      grender.add(rect)
    </script>
  </body>
</html>
```
