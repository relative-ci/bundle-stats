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

const PRESET_REACT = [
  '@babel/preset-react',
  {
    // Babel 8 defaults to the automatic runtime, be explicit about it.
    runtime: 'automatic',
    // Babel 8 stopped emitting `__source`/`__self` because React >= 19.2 ignores them.
    // React 18 still uses them to report the source location in warnings.
    developmentSourceSelf: true,
  },
];

const PRESET_TYPESCRIPT = [
  '@babel/preset-typescript',
  {
    // Babel 8 defaults this to `true`, which keeps `import { SomeType } from './types'`
    // in the output. `src/types.d.ts` has no runtime counterpart, so those imports
    // must be elided.
    onlyRemoveTypeImports: false,
  },
];

module.exports = {
  // Babel 8: declared at the top level so that `@babel/preset-env` and
  // `babel-plugin-polyfill-corejs3` resolve the same compilation targets.
  targets: 'supports es6-module and last 2 versions',
  assumptions: LOOSE_ASSUMPTIONS,
  presets: [
    ['@babel/preset-env', { modules: false, exclude: LOOSE_EXCLUDE }],
    PRESET_REACT,
    PRESET_TYPESCRIPT,
  ],
  plugins: [POLYFILL_COREJS3],
  env: {
    test: {
      targets: { node: 'current' },
      presets: [
        ['@babel/preset-env', { modules: 'commonjs', exclude: LOOSE_EXCLUDE }],
        PRESET_REACT,
        PRESET_TYPESCRIPT,
      ],
      plugins: ['require-context-hook'],
    },
  },
};
