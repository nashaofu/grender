import { defineConfig } from 'rollup';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/grender.js',
      name: 'GRender',
      format: 'umd',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: 'dist/grender.min.js',
      name: 'GRender',
      format: 'umd',
      exports: 'named',
      sourcemap: true,
      plugins: [terser()],
    },
  ],
  plugins: [typescript()],
});
