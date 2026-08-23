import { defineConfig } from 'rollup';
import statsPlugin from 'rollup-plugin-stats';

export default defineConfig({
  input: 'src/index.js',
  output: {
    dir: 'dist-mjs',
  },
  plugins: [statsPlugin({})],
});
