<script setup lang="ts">
import GRender, { Rect, Circle, Ellipse } from "grender";
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
    brush: {
      fillStyle: "green",
      strokeStyle: "green",
      globalAlpha: 0.9,
    },
    shape: {
      x,
      y: 40,
      width: 80,
      height: 40,
    },
    z: 1,
  });

  const circle = new Circle({
    brush: {
      lineWidth: 4,
      strokeStyle: "blue",
    },
    shape: {
      x,
      y: 100,
      r: 40,
    },
  });

  const ellipse = new Ellipse({
    brush: {
      lineWidth: 0,
      fillStyle: "red",
      globalAlpha: 0.9,
    },
    shape: {
      x: x + 60,
      y: 120,
      rx: 60,
      ry: 30,
    },
  });

  grender.add(rect);
  grender.add(circle);
  grender.add(ellipse);
  window.addEventListener("resize", resize);
});

onUnmounted(() => {
  window.removeEventListener("resize", resize);
  grender.destroy();
});
</script>

<template>
  <div class="demo2" ref="$canvas"></div>
</template>

<style>
.demo2 {
  height: 180px;
  background-color: #fff;
}
</style>
