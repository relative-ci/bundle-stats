// Babel 8 removed `@babel/preset-env`'s `loose` option in favour of granular assumptions.
// This is the documented equivalent of `loose: true` (together with the
// `transform-typeof-symbol` exclusion below).
// https://babeljs.io/docs/assumptions#migrating-from-babelpreset-envs-loose-and-spec-modes
const LOOSE_ASSUMPTIONS = {
  arrayLikeIsIterable: true,
  constantReexports: true,
  ignoreFunctionLength: true,
  ignoreToPrimitiveHint: true,
  mutableTemplateObject: true,
  noClassCalls: true,
  noDocumentAll: true,
  objectRestNoSymbols: true,
  privateFieldsAsProperties: true,
  pureGetters: true,
  setClassMethods: true,
  setComputedProperties: true,
  setPublicClassFields: true,
  setSpreadProperties: true,
  skipForOfIteratorClosing: true,
  superIsCallableConstructor: true,
};

const LOOSE_EXCLUDE = ['transform-typeof-symbol'];

// Babel 8: replaces `@babel/preset-env`'s removed `useBuiltIns`/`corejs` options.
// Keep `version` in sync with the `core-js` version declared in `package.json`.
const POLYFILL_COREJS3 = [
  'babel-plugin-polyfill-corejs3',
  { method: 'usage-global', version: '3.50' },
];

// Babel 8 defaults `@babel/preset-react` to the automatic runtime, which injects the
// JSX factory import itself. This replaces both the `pragma: 'h'` + `babel-plugin-preact-require`
// setup and `babel-plugin-react-require` in the development/test environments.
// `developmentSourceSelf` keeps the `__source`/`__self` arguments that React 18 and
// Preact use to report source locations; Babel 8 dropped them for React >= 19.2.
const presetReact = (importSource) => [
  '@babel/preset-react',
  { runtime: 'automatic', developmentSourceSelf: true, ...(importSource && { importSource }) },
];

module.exports = {
  // Babel 8: declared at the top level so that `@babel/preset-env` and
  // `babel-plugin-polyfill-corejs3` resolve the same compilation targets.
  targets: 'supports es6-module and last 2 versions',
  assumptions: LOOSE_ASSUMPTIONS,
  presets: [
    ['@babel/preset-env', { modules: false, exclude: LOOSE_EXCLUDE }],
    presetReact('preact'),
  ],
  plugins: [POLYFILL_COREJS3],
  env: {
    // Storybook and the dev server run against React (aliased to `preact/compat` by webpack).
    development: {
      presets: [['@babel/preset-env', { modules: false, exclude: LOOSE_EXCLUDE }], presetReact()],
    },
    test: {
      targets: { node: 'current' },
      presets: [
        ['@babel/preset-env', { modules: 'commonjs', exclude: LOOSE_EXCLUDE }],
        presetReact(),
      ],
      plugins: ['babel-plugin-require-context-hook'],
    },
  },
};
