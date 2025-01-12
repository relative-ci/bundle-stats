import { defineConfig } from 'rollup';
import { nodeResolve as nodeResolvePlugin } from '@rollup/plugin-node-resolve';
import commonjsPlugin from '@rollup/plugin-commonjs';
import typescriptPlugin from '@rollup/plugin-typescript';

const OUTPUT_DIR = './lib';
const CONTEXT_DIR = './src';

export default defineConfig([
  {
    input: './src/index.ts',
    output: [
      {
        dir: OUTPUT_DIR,
        format: 'cjs',
        entryFileNames: '[name].js',
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: CONTEXT_DIR,
      },
    ],
    external: [/node_modules/],
    plugins: [
      nodeResolvePlugin(),
      commonjsPlugin(),
      typescriptPlugin({
        tsconfig: './tsconfig.base.json',
      }),
    ],
  },
]);
