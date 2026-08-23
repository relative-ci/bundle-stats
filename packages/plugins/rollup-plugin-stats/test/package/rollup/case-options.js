import { defineConfig } from 'rollup';
import stats from 'rollup-plugin-stats';

export default defineConfig({
  input: 'src/index.js',
  output: {
    dir: 'dist',
  },
  plugins: [stats()],
});

export const dynamicOptions = defineConfig({
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'commonjs',
  },
  plugins: [
    stats((options) => ({
      fileName: `stats.${options.format}.json`,
    })),
  ],
});

export const relativeFileNameConfig = defineConfig({
  input: 'src/index.js',
  output: {
    dir: 'dist',
  },
  plugins: [
    stats({
      fileName: '../artifacts/stats.json',
    }),
  ],
});

export const absoluteFileNameConfig = defineConfig({
  input: 'src/index.js',
  output: {
    dir: 'dist',
  },
  plugins: [
    stats({
      fileName: '/tmp/custom-stats.json',
    }),
  ],
});
