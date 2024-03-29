# 指南

## 基本示例

初始化画布，并添加图形

<script setup>
import Demo1 from './.vitepress/components/Demo1.vue'
import Demo2 from './.vitepress/components/Demo2.vue'
import Demo3 from './.vitepress/components/Demo3.vue'
import Demo4 from './.vitepress/components/Demo4.vue'
</script>

<Demo1 />

::: details 点击查看代码
<<< ./.vitepress/components/Demo1.vue
:::

## 图形样式

默认情况下，图形添加到画布中后会有默认样式，我们可以在初始化时设置图形的样式

<Demo2 />

::: tip
图形在画布中的层级关系，默认是添加到画布中的顺序，后添加的层级更高，我们也可以在初始化化时指定`z`值，从而调整某个图形的层级。
上图中我们手动指定了矩形的层级为`1`，所以它会被绘制到最上层。图形默认`z`值为`0`
:::

::: details 点击查看代码
<<< ./.vitepress/components/Demo2.vue
:::

## 图形变换

图形目前支持`translate(移动)`，`scale(缩放)`和`rotate(旋转)`三种变换

<Demo3 />

::: tip
图形变换（rotate、scale）的中心点默认为图形为所在局部坐标的原点`(0,0)`，我们也可以通过`origin`参数指定变换中心
:::

::: details 点击查看代码
<<< ./.vitepress/components/Demo3.vue
:::

## 鼠标事件

图形目前支持`click`、`dblclick`、`wheel`、`mousedown`、`mousemove`、`mouseup`、`mouseover`、`mouseout`、`mouseenter`和与`mouseleave`事件。同时也支持`dragstart`、`dragging`和`dragend`等复合事件

<Demo4 />

::: details 点击查看代码
<<< ./.vitepress/components/Demo4.vue
:::
