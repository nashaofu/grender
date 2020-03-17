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
 * 点经过矩阵变换后新的位置
 * @param {number[]} p
 * @param {number} m
 */
export function transform (p: number[], m: number[]): number[] {
  return [m[0] * p[0] + m[2] * p[1] + m[4], m[1] * p[0] + m[3] * p[1] + m[5]]
}

/**
 * 求逆矩阵
 * @param {number[]} m
 */
export function invert (m: number[]): number[] | null {
  let det = m[0] * m[3] - m[1] * m[2]

  if (!det) return null

  det = 1.0 / det

  return [
    m[3] * det,
    -m[1] * det,
    -m[2] * det,
    m[0] * det,
    (m[2] * m[5] - m[3] * m[4]) * det,
    (m[1] * m[4] - m[0] * m[5]) * det
  ]
}
