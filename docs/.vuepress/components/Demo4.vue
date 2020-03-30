<template>
  <div class="demo4">
    <div>当前触发事件：{{ event }}</div>
    <div class="demo4-canvas" ref="canvas"></div>
  </div>
</template>

<script>
import GRender, { Rect, Line, Circle, Ellipse } from 'grender'

export default {
  name: 'Demo4',
  data() {
    return {
      event: undefined
    }
  },
  mounted() {
    this.grender = new GRender(this.$refs.canvas)
    const x = this.$refs.canvas.offsetWidth / 2 - 30
    const rect = new Rect({
      shape: {
        x,
        y: 40,
        width: 80,
        height: 40
      }
    })

    const line = new Line({
      brush: {
        lineWidth: 2
      },
      shape: {
        x1: x - 50,
        y1: 40,
        x2: x + 50,
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
    this.grender.add(circle)
    this.grender.add(ellipse)

    this.grender.shapes.forEach(shape => {
      shape.on('dragging', e => {
        shape.translate(e.x, e.y)
        this.event = 'dragging'
      })

      shape.on('mouseenter', e => {
        shape.brush.fillStyle = 'red'
        shape.brush.strokeStyle = 'blue'
        this.event = 'mouseenter'
        this.grender.refresh()
      })
      shape.on('mouseleave', e => {
        shape.brush.fillStyle = 'rgba(0,0,0,0)'
        shape.brush.strokeStyle = '#000'
        this.event = 'mouseleave'
        this.$refs.canvas.style.cursor = 'pointer'
        this.grender.refresh()
        console.log(e)
      })
    })
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
.demo4
  &-canvas
    height 240px
</style>
