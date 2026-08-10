module.exports = {
  // Babel 8: declared at the top level so that `@babel/preset-env` and
  // `babel-plugin-polyfill-corejs3` resolve the same compilation targets.
  targets: {
    node: 'current',
  },
  presets: [
    [
      '@babel/preset-env',
      {
        // Babel 8: `modules: 'auto'` now assumes the caller supports ESM unless it opts
        // out (`@babel/cli` does not), but `lib/` is published as CommonJS.
        modules: 'commonjs',
      },
    ],
  ],
  plugins: [
    // Babel 8: replaces `@babel/preset-env`'s removed `useBuiltIns`/`corejs` options.
    // Keep `version` in sync with the `core-js` range declared in `package.json`.
    ['babel-plugin-polyfill-corejs3', { method: 'usage-global', version: '3.50' }],
  ],
};
