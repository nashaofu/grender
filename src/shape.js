import Events from './events'

export default class Shape extends Events {
  matrix = [0, 0, 0, 0, 0, 0]
  constructor () {
    super(
      'click',
      'dbclick',
      'mouseenter',
      'mousemove',
      'mouseleave',
      'mousedown',
      'mouseup',
      'mouseover',
      'contextmenu'
    )
  }

  get translate () {
    return [this.matrix[4], this.matrix[5]]
  }

  get scale () {
    return [this.matrix[0], this.matrix[3]]
  }

  get rotate () {
    return [this.matrix[0], this.matrix[3]]
  }

  translate ([translateX, translateY]) {}

  scale ([scaleX, scaleY]) {}

  rotate () {}
}
