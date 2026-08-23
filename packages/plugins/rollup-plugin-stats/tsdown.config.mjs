import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    index: './src/index.ts',
    extract: './src/extract.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  unbundle: true,
  hash: false,
  minify: false,
  sourcemap: true,
});
