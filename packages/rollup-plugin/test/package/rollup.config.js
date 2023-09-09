const path = require('path');
const { defineConfig } = require('rollup');
const { bundleStats } = require('rollup-plugin-bundle-stats');

module.exports = (bundleStatsOptions = {}) =>
  defineConfig({
  input: './src/index.js',
  output: {
    dir: './dist',
  },
  plugins: [bundleStats(bundleStatsOptions)],
});
