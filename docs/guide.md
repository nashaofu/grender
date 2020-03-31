# 指南

## 基本示例

初始化画布，并添加图形

<Demo1 />

::: details 点击查看代码
<<< ./docs/.vuepress/components/Demo1.vue
:::

## 图形样式

默认情况下，图形添加到画布中后会有默认样式，我们可以在初始化时设置图形的样式

<Demo2 />

::: tip
图形在画布中的层级关系，默认是添加到画布中的顺序，后添加的层级更高，我们也可以在初始化化时指定`z`值，从而调整某个图形的层级。
上图中我们手动指定了矩形的层级为`1`，所以它会被绘制到最上层。图形默认`z`值为`0`
:::

::: details 点击查看代码
<<< ./docs/.vuepress/components/Demo2.vue
:::

## 图形变换

图形目前支持`translate(移动)`，`scale(缩放)`和`rotate(旋转)`三种变换

<Demo3 />

::: tip
图形变换的中心点为图形为变换前的原点坐标`(0,0)`，所以定义图形形状时，尽量把图形的左上角和`(0，0)`重合，保证图形变换时以图形左上角为中心，方便编码
:::

::: details 点击查看代码
<<< ./docs/.vuepress/components/Demo3.vue
:::

## 鼠标事件

图形目前支持`click`、`dblclick`、`wheel`、`mousedown`、`mousemove`、`mouseup`、`mouseover`、`mouseout`、`mouseenter`和与`mouseleave`事件。同时也支持`dragstart`、`dragging`和`dragend`等复合事件

<Demo4 />

::: details 点击查看代码
<<< ./docs/.vuepress/components/Demo4.vue
:::
