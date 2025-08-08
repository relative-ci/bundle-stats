import path from 'node:path';
import { defineConfig } from 'rollup';
import commonjsPlugin from '@rollup/plugin-commonjs';
import nodeResolvePlugin from '@rollup/plugin-node-resolve';
import typescriptPlugin from '@rollup/plugin-typescript';

const CONTEXT_DIR = path.join(process.cwd(), './src');
const OUTPUT_DIR = 'lib';

export default defineConfig([
  {
    context: CONTEXT_DIR,
    input: './src/index.ts',
    output: {
      dir: OUTPUT_DIR,
      format: 'cjs',
      entryFileNames: 'cjs/[name].js',
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: CONTEXT_DIR,
      interop: 'auto',
    },
    external: /node_modules/,
    plugins: [
      nodeResolvePlugin({
        extensions: ['.js', '.cjs', '.json'],
      }),
      commonjsPlugin({
        defaultIsModuleExports: 'auto',
      }),
      typescriptPlugin({
        tsconfig: './tsconfig.cjs.json',
        exclude: /\.test.ts/,
      }),
    ],
  },
  {
    context: CONTEXT_DIR,
    input: './src/index.ts',
    output: {
      dir: OUTPUT_DIR,
      format: 'esm',
      entryFileNames: 'esm/[name].js',
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: CONTEXT_DIR,
      interop: 'auto',
    },
    external: /node_modules/,
    plugins: [
      nodeResolvePlugin({
        extensions: ['.js', '.mjs', '.cjs', '.json'],
      }),
      commonjsPlugin(),
      typescriptPlugin({
        tsconfig: './tsconfig.esm.json',
        exclude: /\.test.ts/,
      }),
    ],
  },
]);
