import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    index: './src/index.js',
    webpack: './src/webpack/index.js',
    browsertime: './src/browsertime/index.js',
    lighthouse: './src/lighthouse/index.js',
  },
  outDir: 'lib',
  format: ['cjs', 'esm'],
  dts: false,
  sourcemap: true,
  hash: false,
  minify: false,
});
