import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: './src/index.js',
  outDir: 'lib',
  format: ['esm'],
  platform: 'browser',
  target: 'esnext',
  dts: true,
  sourcemap: true,
  hash: false,
  minify: false,
  unbundle: true,
  css: {
    // Keep the `import './x.css'` statements in the emitted modules, so consumers
    // pull each component's styles in through the JS graph (as before this migration).
    // Safe now that the output is ESM-only — it was invalid CommonJS in a CJS bundle.
    inject: true,
    modules: {
      generateScopedName: 'ui-[hash]-[local]',
    },
  },
  // `to` is the destination *directory* — the `from` basename is appended to it.
  copy: [
    { from: 'src/css', to: 'lib' },
    { from: 'src/assets/icons.svg', to: 'lib/assets' },
  ],
});
