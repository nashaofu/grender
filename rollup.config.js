import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

const isProduction = process.env.MODE === 'production'

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/grender.js',
      name: 'GRender',
      format: 'umd',
      exports: 'named',
      sourcemap: true
    },
    isProduction && {
      file: 'dist/grender.min.js',
      name: 'GRender',
      format: 'umd',
      exports: 'named',
      sourcemap: true,
      plugins: [terser()]
    }
  ].filter(Boolean),
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: false
        }
      }
    })
  ]
}
