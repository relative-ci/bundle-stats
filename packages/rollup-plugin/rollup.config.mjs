import path from 'path';
import url from 'url';
import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default defineConfig({
  input: `${__dirname}/src/index.ts`,
  output: {
    dir: `${__dirname}/dist`,
    format: 'commonjs',
    sourcemap: true,
  },
  plugins: [typescript({ tsconfig: './tsconfig.json' }), json(), nodeResolve(), commonjs()],
});
