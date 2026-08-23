import { defineConfig } from 'rolldown';
import statsPlugin from 'rollup-plugin-stats';

export default defineConfig({
  input: 'src/index.js',
  output: {
    dir: 'dist',
  },
  plugins: [statsPlugin()],
});

export const dynamicOptions = defineConfig({
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'commonjs',
  },
  plugins: [
    statsPlugin((options) => ({
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
    statsPlugin({
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
    statsPlugin({
      fileName: '/tmp/custom-stats.json',
    }),
  ],
});
