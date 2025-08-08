import path from 'node:path';
import { defineConfig } from 'rollup';
import { nodeResolve as nodeResolvePlugin } from '@rollup/plugin-node-resolve';
import commonjsPlugin from '@rollup/plugin-commonjs';
import typescriptPlugin from '@rollup/plugin-typescript';
import jsonPlugin from '@rollup/plugin-json';

const CONTEXT_DIR = path.join(process.cwd(), './src');
const OUTPUT_DIR = 'lib';

export default defineConfig([
  {
    context: CONTEXT_DIR,
    input: './src/index.ts',
    output: [
      {
        dir: OUTPUT_DIR,
        format: 'cjs',
        entryFileNames: 'cjs/[name].js',
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: CONTEXT_DIR,
        interop: 'auto',
      },
    ],
    external: [/node_modules/, /@bundle-stats/],
    plugins: [
      nodeResolvePlugin({
        extensions: ['.js', '.cjs', '.json'],
      }),
      commonjsPlugin({
        defaultIsModuleExports: 'auto',
      }),
      jsonPlugin(),
      typescriptPlugin({
        tsconfig: './tsconfig.cjs.json',
        exclude: /\.test.ts/,
      }),
    ],
  },
  {
    input: './src/index.ts',
    output: [
      {
        dir: OUTPUT_DIR,
        format: 'esm',
        entryFileNames: 'esm/[name].js',
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: CONTEXT_DIR,
        interop: 'auto',
      },
    ],
    external: [/node_modules/, /@bundle-stats/],
    plugins: [
      nodeResolvePlugin({
        extensions: ['.js', '.mjs', '.cjs', '.json'],
      }),
      commonjsPlugin(),
      jsonPlugin(),
      typescriptPlugin({
        tsconfig: './tsconfig.esm.json',
        exclude: /\.test.ts/,
      }),
    ],
  },
]);
