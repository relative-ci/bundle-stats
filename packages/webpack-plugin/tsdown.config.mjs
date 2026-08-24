import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: './src/index.js',
  outDir: 'lib',
  format: ['cjs', 'esm'],
  platform: 'node',
  // `typings.d.ts` is hand-written — it uses declaration merging that TypeScript
  // cannot infer from the plain-JS source.
  dts: false,
  sourcemap: true,
  hash: false,
  minify: false,
});
