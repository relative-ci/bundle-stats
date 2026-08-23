import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import configPrettier from 'eslint-config-prettier/flat';

/** @type {import('eslint').Linter.Config[]} */
const configs = [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
  },
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    ignores: ['config/', '**/dist/'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  configPrettier,
];

export default configs;
