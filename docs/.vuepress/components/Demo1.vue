<template>
  <div class="demo1"></div>
</template>

<script>
import GRender, { Rect, Circle, Ellipse } from 'grender'

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
