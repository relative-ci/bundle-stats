import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: './src/index.ts',
  outDir: 'lib',
  format: ['cjs', 'esm'],
  deps: {
    // CJS-only packages: Node's native ESM resolver cannot detect their named
    // exports, so inline them to keep the ESM output loadable by Node directly.
    alwaysBundle: ['stream-json', 'stream-chain'],
  },
  dts: true,
  sourcemap: true,
  hash: false,
  minify: false,
});
