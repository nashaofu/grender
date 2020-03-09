/**
 * 二维坐标矩阵乘法([3×3]*[3×3])
 * @param {number[]} m1
 * @param {number[]} m2
 */
export function multiply (m1: number[], m2: number[]): number[] {
  return [
    m1[0] * m2[0] + m1[2] * m2[1],
    m1[1] * m2[0] + m1[3] * m2[1],
    m1[0] * m2[2] + m1[2] * m2[3],
    m1[1] * m2[2] + m1[3] * m2[3],
    m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
    m1[1] * m2[4] + m1[3] * m2[5] + m1[5]
  ]
}

/**
 * 二维坐标矩阵乘法([3×3]*[3×1])
 * @param {number[]} m1
 * @param {number[]} m2
 */
export function invert (m1: number[], m2: number[]): number[] {
  return [m1[0] * m2[0] + m1[2] * m2[1] + m1[4], m1[1] * m2[0] + m1[3] * m2[1] + m1[5], 1]
}
