import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';

export default defineConfig([
  {
    input: './src/index.ts',
    output: {
      dir: 'lib-esm',
      format: 'esm',
      entryFileNames: '[name].mjs',
      sourcemap: true,
    },
    plugins: [typescript({ declarationDir: 'lib-esm' })],
  },
  {
    input: './src/index.ts',
    output: {
      dir: 'lib',
      format: 'commonjs',
      entryFileNames: '[name].cjs',
      sourcemap: true,
    },
    plugins: [typescript({ declarationDir: 'lib' })],
  },
]);
