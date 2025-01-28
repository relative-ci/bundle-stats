import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';

export default defineConfig([
  {
    input: './src/index.ts',
    output: {
      dir: './dist',
      format: 'esm',
      entryFileNames: '[name].mjs',
      chunkFileNames: 'chunks/[name].mjs',
      sourcemap: true,
      preserveModules: true,
    },
    external: [/node_modules/],
    plugins: [typescript({ tsconfig: './tsconfig.json' })],
  },
  {
    input: './src/index.ts',
    output: {
      dir: './dist',
      format: 'commonjs',
      entryFileNames: '[name].cjs',
      chunkFileNames: 'chunks/[name].cjs',
      sourcemap: true,
      preserveModules: true,
    },
    external: [/node_modules/],
    plugins: [typescript({ tsconfig: './tsconfig.json' })],
  },
]);
