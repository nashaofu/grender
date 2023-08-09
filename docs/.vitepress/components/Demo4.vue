<script setup lang="ts">
import GRender, { Rect, Line, Arrow, Circle, Ellipse } from "grender";
import { ref, onMounted, onUnmounted } from "vue";

let grender: GRender | undefined;

const $canvas = ref();
const event = ref();

const resize = () => {
  grender.resize();
};

onMounted(() => {
  grender = new GRender($canvas.value);
  const x = $canvas.value.offsetWidth / 2 - 30;
  const rect = new Rect({
    shape: {
      x,
      y: 40,
      width: 80,
      height: 40,
    },
  });

  const line = new Line({
    brush: {
      lineWidth: 2,
    },
    shape: {
      x1: x - 50,
      y1: 40,
      x2: x + 50,
      y2: 160,
    },
  });

  const arrow = new Arrow({
    brush: {
      lineWidth: 10,
    },
    shape: {
      x1: x - 30,
      y1: 40,
      x2: x - 40,
      y2: 160,
    },
  });

  const circle = new Circle({
    shape: {
      x,
      y: 100,
      r: 40,
    },
  });

  const ellipse = new Ellipse({
    shape: {
      x: x + 60,
      y: 120,
      rx: 60,
      ry: 30,
    },
  });

  grender.add(rect);
  grender.add(line);
  grender.add(arrow);
  grender.add(circle);
  grender.add(ellipse);

  grender.shapes.forEach((shape) => {
    shape.on("dragging", (e) => {
      shape.translate(e.x, e.y);
      event.value = "dragging";
    });

    shape.on("mouseenter", (e) => {
      shape.brush.fillStyle = "red";
      shape.brush.strokeStyle = "blue";
      event.value = "mouseenter";
      $canvas.value.style.cursor = "pointer";
      grender.refresh();
    });
    shape.on("mouseleave", (e) => {
      shape.brush.fillStyle = "rgba(0,0,0,0)";
      shape.brush.strokeStyle = "#000";
      event.value = "mouseleave";
      $canvas.value.style.cursor = "default";
      grender.refresh();
    });
  });
  window.addEventListener("resize", resize);
});

onUnmounted(() => {
  window.removeEventListener("resize", resize);
  grender.destroy();
});
</script>

<template>
  <div class="demo4">
    <div>当前触发事件：{{ event }}</div>
    <div class="demo4-canvas" ref="$canvas"></div>
  </div>
</template>

<style>
.demo4 {
  border: 2px solid #000;
}

.demo4-canvas {
  height: 240px;
  background-color: #fff;
}
</style>
