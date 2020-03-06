/**
 * 二维度坐标矩阵乘法
 * @param {Number[6]} m1
 * @param {Number[6]} m2
 */
export function multiply (m1, m2) {
  const m = [0, 0, 0, 0, 0, 0]
  m[0] = m1[0] * m2[0] + m1[2] * m2[1]
  m[1] = m1[1] * m2[0] + m1[3] * m2[1]

  m[2] = m1[0] * m2[2] + m1[2] * m2[3]
  m[3] = m1[1] * m2[2] + m1[3] * m2[3]

  m[4] = m1[0] * m2[4] + m1[2] * m2[5] + m1[4]
  m[5] = m1[1] * m2[4] + m1[3] * m2[5] + m1[5]
  return m
}
