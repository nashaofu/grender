<template>
  <div class="demo1"></div>
</template>

<script>
import GRender, { Rect, Line, Arrow, Circle, Ellipse } from 'grender'

export default {
  name: 'Demo1',
  mounted() {
    this.grender = new GRender(this.$el)
    const x = this.$el.offsetWidth / 2 - 30
    const rect = new Rect({
      shape: {
        x,
        y: 40,
        width: 80,
        height: 40
      }
    })

    const line = new Line({
      shape: {
        x1: x - 50,
        y1: 40,
        x2: x + 50,
        y2: 160
      }
    })

    const arrow = new Arrow({
      shape: {
        x1: x - 30,
        y1: 40,
        x2: x + 10,
        y2: 160
      }
    })

    const circle = new Circle({
      shape: {
        x,
        y: 100,
        r: 40
      }
    })

    const ellipse = new Ellipse({
      shape: {
        x: x + 60,
        y: 120,
        rx: 60,
        ry: 30
      }
    })

    this.grender.add(rect)
    this.grender.add(line)
    this.grender.add(arrow)
    this.grender.add(circle)
    this.grender.add(ellipse)
    window.addEventListener('resize', this.resize)
  },
  destroyed() {
    window.removeEventListener('resize', this.resize)
    this.grender.destroy()
  },
  methods: {
    resize() {
      this.grender.resize()
    }
  }
}
</script>

<style lang="stylus">
.demo1
  height 180px
</style>
