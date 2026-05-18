import { defineConfig } from 'tsdown';

export default defineConfig({
  outDir: 'lib',
  entry: './src/index.ts',
  format: 'cjs',
  outputOptions: {
    entryFileNames: '[name].js',
  },
  dts: false,
  unbundle: false,
  hash: false,
  minify: false,
  sourcemap: false,
});
