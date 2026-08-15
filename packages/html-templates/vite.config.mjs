import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import svgr from 'vite-plugin-svgr';
import webpackStatsPlugin from 'rollup-plugin-webpack-stats';

const PACKAGE_ROOT = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(PACKAGE_ROOT, 'package.json'), 'utf8'));
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  root: join(PACKAGE_ROOT, 'src'),
  base: './',
  resolve: {
    // Render with preact, the same as the Storybook build (see build/storybook/main.mjs).
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
  esbuild: {
    jsx: 'automatic',
  },
  define: {
    __VERSION__: JSON.stringify(pkg.version),
    __PRODUCTION__: JSON.stringify(isProduction),
    __DEVELOPMENT__: JSON.stringify(!isProduction),
  },
  plugins: [
    svgr(),
    // Inline all built JS/CSS into index.html, producing a single self-contained
    // file: the package's `main` export reads dist/index.html as a raw string.
    viteSingleFile(),
    webpackStatsPlugin({ fileName: '../artifacts/webpack-stats.json' }),
  ],
  build: {
    outDir: resolve(PACKAGE_ROOT, 'dist'),
    emptyOutDir: true,
  },
});
