/* eslint-disable @typescript-eslint/no-require-imports */
const { defineConfig } = require('rollup');
const statsPlugin = require('rollup-plugin-stats');

module.exports = defineConfig({
  input: 'src/index.js',
  output: {
    dir: 'dist-cjs',
  },
  plugins: [statsPlugin({})],
});
