export interface ShapeBrush {
  fillStyle?: string
  font?: string
  globalAlpha?: number
  lineCap?: 'butt' | 'round' | 'square'
  lineDashOffset?: number
  lineJoin?: 'round' | 'bevel' | 'miter'
  lineWidth?: number
  miterLimit?: number
  shadowBlur?: number
  shadowColor?: string
  shadowOffsetX?: number
  shadowOffsetY?: number
  strokeStyle?: string
  textAlign?: 'left' | 'right' | 'center' | 'start' | 'end'
  textBaseline?: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom'
}

// 支持的样式
export const defaultShapeBrushs = {
  fillStyle: '#000000',
  font: '10px sans-serif',
  globalAlpha: 1,
  lineCap: 'butt',
  lineDashOffset: 0,
  lineJoin: 'miter',
  lineWidth: 1,
  miterLimit: 10,
  shadowBlur: 0,
  shadowColor: 'rgba(0, 0, 0, 0)',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  strokeStyle: '#000000',
  textAlign: 'center',
  textBaseline: 'middle'
}
