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
 * 求逆矩阵
 * @param {number[]} m
 */
export function invert (m: number[]): number[] | null {
  const aa = m[0]
  const ac = m[2]
  const atx = m[4]
  const ab = m[1]
  const ad = m[3]
  const aty = m[5]

  let det = aa * ad - ab * ac
  if (!det) {
    return null
  }
  det = 1.0 / det

  return [ad * det, -ab * det, -ac * det, aa * det, (ac * aty - ad * atx) * det, (ab * atx - aa * aty) * det]
}
