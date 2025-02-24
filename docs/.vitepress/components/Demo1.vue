<script setup lang="ts">
import GRender, { Rect, Line, Arrow, Circle, Ellipse, Polygon } from "grender";
import { ref, onMounted, onUnmounted } from "vue";

let grender: GRender | undefined;

const $canvas = ref();

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
    shape: {
      x1: x - 50,
      y1: 40,
      x2: x + 50,
      y2: 160,
    },
  });

  const arrow = new Arrow({
    shape: {
      x1: x - 30,
      y1: 40,
      x2: x + 10,
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

  const polygon = new Polygon({
    shape: {
      points: [
        [x - 130, 40],
        [x - 110, 10],
        [x - 80, 10],
        [x - 60, 40],
        [x - 80, 70],
        [x - 110, 70],
      ],
    },
  });

  grender.add(rect);
  grender.add(line);
  grender.add(arrow);
  grender.add(circle);
  grender.add(ellipse);
  grender.add(polygon);
  window.addEventListener("resize", resize);
});

onUnmounted(() => {
  window.removeEventListener("resize", resize);
  grender.destroy();
});
</script>

<template>
  <div class="demo1" ref="$canvas"></div>
</template>

<style>
.demo1 {
  height: 180px;
  background-color: #fff;
}
</style>
