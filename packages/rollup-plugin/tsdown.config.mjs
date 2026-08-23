import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: './src/index.ts',
  outDir: 'lib',
  format: ['cjs', 'esm'],
  platform: 'node',
  dts: true,
  sourcemap: true,
  hash: false,
  minify: false,
});
