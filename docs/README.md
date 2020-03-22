---
home: true
heroImage: /logo.svg
actionText: 快速上手 →
actionLink: /guide/
---

## 起步

安装：

```bash
npm i grender
# or
yarn add grender
```

上手

```js
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
```
