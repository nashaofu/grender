<template>
  <div class="demo2"></div>
</template>

<script>
import GRender, { Rect, Circle, Ellipse } from 'grender'

export default {
  name: 'Demo2',
  mounted() {
    this.grender = new GRender(this.$el)
    const x = this.$el.offsetWidth / 2 - 30
    const rect = new Rect({
      brush: {
        fillStyle: 'green',
        strokeStyle: 'green',
        globalAlpha: 0.9
      },
      shape: {
        x,
        y: 40,
        width: 80,
        height: 40
      },
      z: 1
    })
    
    const circle = new Circle({
      brush: {
        lineWidth: 4,
        strokeStyle: 'blue'
      },
      shape: {
        x,
        y: 100,
        r: 40
      }
    })

    const ellipse = new Ellipse({
      brush: {
        lineWidth: 0,
        fillStyle: 'red',
        globalAlpha: 0.9
      },
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
.demo2
  height 180px
</style>
