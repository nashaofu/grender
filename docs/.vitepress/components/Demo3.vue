<script setup lang="ts">
import GRender, { Rect, Ellipse } from "grender";
import { ref, onMounted, onUnmounted } from "vue";

let grender1: GRender | undefined;
let grender2: GRender | undefined;

const $rect = ref();
const $ellipse = ref();
let rect;
let ellipse;

const resize = () => {
  grender1.resize();
  grender2.resize();
};

const translateX = (shape) => {
  const [x, y] = shape.T;
  shape.translate(x + 10, y);
};
const translateY = (shape) => {
  const [x, y] = shape.T;
  shape.translate(x, y + 10);
};
const rotate = (shape) => {
  const r = shape.R;
  shape.rotate(r + 30);
};
const scale = (shape, val) => {
  const [x, y] = shape.S;
  shape.scale(x * val, y * val);
};

onMounted(() => {
  grender1 = new GRender($rect.value);
  rect = new Rect({
    origin: [40, 20],
    brush: {
      fillStyle: "red",
      strokeStyle: "red",
    },
    shape: {
      x: 0,
      y: 0,
      width: 80,
      height: 40,
    },
  });

  grender1.add(rect);

  grender2 = new GRender($ellipse.value);

  ellipse = new Ellipse({
    origin: [100, 100],
    brush: {
      fillStyle: "red",
      strokeStyle: "red",
    },
    shape: {
      x: 100,
      y: 100,
      rx: 60,
      ry: 30,
    },
  });
  grender2.add(ellipse);
  window.addEventListener("resize", resize);
});

onUnmounted(() => {
  window.removeEventListener("resize", resize);
  grender1.destroy();
  grender2.destroy();
});
</script>

<template>
  <div class="demo3">
    <h5>矩形变换</h5>
    <div class="demo3-btns">
      <button @click="translateX(rect)">x + 10</button>
      <button @click="translateY(rect)">y + 10</button>
      <button @click="rotate(rect)">旋转30°</button>
      <button @click="scale(rect, 1.2)">放大1.2倍</button>
      <button @click="scale(rect, 1 / 1.2)">缩小1.2倍</button>
    </div>
    <div class="demo3-canvas" ref="$rect"></div>
    <h5>椭圆变换</h5>
    <div class="demo3-btns">
      <button @click="translateX(ellipse)">x + 10</button>
      <button @click="translateY(ellipse)">y + 10</button>
      <button @click="rotate(ellipse)">旋转30°</button>
      <button @click="scale(ellipse, 1.2)">放大1.2倍</button>
      <button @click="scale(ellipse, 1 / 1.2)">缩小1.2倍</button>
    </div>
    <div class="demo3-canvas" ref="$ellipse"></div>
  </div>
</template>

<style>
.demo3-btns {
  margin: 10px 0;
}

.demo3 button {
  background-color: #08f;
  color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
}

.demo3 button:not(:last-child) {
  margin-right: 8px;
}

.demo3-canvas {
  height: 300px;
  background-color: #fff;
}
</style>
