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
  deps: {
    // `serialize-query-params` only exposes its ESM build via the bundler-only
    // `module` field, so Node's native ESM resolver falls back to the CJS `main`
    // and cannot detect its named exports. Inline it so the ESM output of this
    // package is loadable by Node directly (not just by bundlers).
    alwaysBundle: ['serialize-query-params'],
  },
  dts: false,
  sourcemap: true,
  hash: false,
  minify: false,
});
