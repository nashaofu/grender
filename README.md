# grender

A lightweight canvas library for 2D.

## TODOS

- [ ] ctx 编写一个代理层，方便控制 API 权限，同时也有利于 ts 编译
- [ ] ctx 的画笔也要抽取与归纳，不要直接使用原生的，所以需要提取一个 style 对象
- [x] 鼠标事件支持：支持`click`、`dblclick`、`wheel`、`mousedown`、`mousemove`、`mouseup`、`mouseover`、`mouseout`.`mouseenter`行为与`mouseover`类似，`mouseleave`行为与`mouseout`类似，目前只考虑实现其中一个
- [ ] 事件系统完善，drag 事件只出发上层元素
