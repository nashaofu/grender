<template>
  <div class="demo3">
    <h5>矩形变换</h5>
    <button @click="translateX(rect)">x + 10</button>
    <button @click="translateY(rect)">y + 10</button>
    <button @click="rotate(rect)">旋转30°</button>
    <button @click="scale(rect, 1.2)">放大1.2倍</button>
    <button @click="scale(rect, 1 / 1.2)">缩小1.2倍</button>
    <div class="demo3-canvas" ref="rect"></div>
    <h5>椭圆变换</h5>
    <button @click="translateX(ellipse)">x + 10</button>
    <button @click="translateY(ellipse)">y + 10</button>
    <button @click="rotate(ellipse)">旋转30°</button>
    <button @click="scale(ellipse, 1.2)">放大1.2倍</button>
    <button @click="scale(ellipse, 1 / 1.2)">缩小1.2倍</button>
    <div class="demo3-canvas" ref="ellipse"></div>
  </div>
</template>

<script>
import GRender, { Rect, Ellipse } from 'grender'

export default {
  name: 'Demo3',
  mounted() {
    this.grender1 = new GRender(this.$refs.rect)
    this.rect = new Rect({
      origin: [40, 20],
      brush: {
        fillStyle: 'red',
        strokeStyle: 'red'
      },
      shape: {
        x: 0,
        y: 0,
        width: 80,
        height: 40
      }
    })

    this.grender1.add(this.rect)

    this.grender2 = new GRender(this.$refs.ellipse)

    this.ellipse = new Ellipse({
      origin: [100, 100],
      brush: {
        fillStyle: 'red',
        strokeStyle: 'red'
      },
      shape: {
        x: 100,
        y: 100,
        rx: 60,
        ry: 30
      }
    })
    this.grender2.add(this.ellipse)
    window.addEventListener('resize', this.resize)
  },
  destroyed() {
    window.removeEventListener('resize', this.resize)
    this.grender1.destroy()
    this.grender2.destroy()
  },
  methods: {
    resize() {
      this.grender1.resize()
      this.grender2.resize()
    },
    translateX(shape) {
      const [x, y] = shape.T
      shape.translate(x + 10, y)
    },
    translateY(shape) {
      const [x, y] = shape.T
      shape.translate(x, y + 10)
    },
    rotate(shape) {
      const r = shape.R
      shape.rotate(r + 30)
    },
    scale(shape, val) {
      const [x, y] = shape.S
      shape.scale(x * val, y * val)
    }
  }
}
</script>

<style lang="stylus">
.demo3-canvas
  height 300px
</style>
