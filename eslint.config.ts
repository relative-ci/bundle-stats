import type { ESLint, Linter } from 'eslint';
import { FlatCompat } from '@eslint/eslintrc';
import { fixupConfigRules } from '@eslint/compat';
import js from '@eslint/js';
import globals from 'globals';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import pluginJest from 'eslint-plugin-jest';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import path from 'path';

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const config: Linter.Config[] = [
  // Global ignores — replaces all .eslintignore files
  {
    ignores: [
      '**/node_modules/**',
      // Build outputs
      'packages/*/lib/**',
      'packages/*/lib-esm/**',
      'packages/*/types/**',
      'packages/*/storybook-static/**',
      'packages/html-templates/dist/**',
      // Test packages embedded in the repo
      'packages/cli/test/**',
      'packages/webpack-plugin/test/**',
      'packages/rollup-plugin/test/**',
    ],
  },

  // Airbnb base config via FlatCompat with legacy API shims (applies to all matched files)
  ...fixupConfigRules(compat.extends('airbnb')),

  // Common configuration for all JS/JSX/TS/TSX files
  {
    files: ['**/*.{js,mjs,jsx,ts,tsx}'],
    plugins: {
      jest: pluginJest as ESLint.Plugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...pluginJest.environments.globals.globals,
      },
    },
    settings: {
      react: {
        version: '18',
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.mjs', '.jsx', '.ts', '.d.ts', '.tsx'],
        },
      },
    },
    rules: {
      'no-unused-vars': ['warn', { varsIgnorePattern: '^[_]{1,}$' }],
      'implicit-arrow-linebreak': 'warn',
      indent: 'warn',
      'prettier/prettier': 'warn',

      // import rules
      'import/extensions': [
        'error',
        'ignorePackages',
        { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
      ],
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        {
          peerDependencies: true,
          devDependencies: [
            '**/build/**/*.{js,mjs,jsx}',
            '**/*.config.{js,mjs}',
            '**/webpack.config.*.{js,mjs}',
            '**/*.stories.{jsx}',
            '**/__mocks__/**/*.{js,mjs}',
            '**/__tests__/*.{js,mjs}',
            '**/test/**/*.{js,mjs}',
            '**/storybook/*.{js,mjs}',
            '**/jest/*.{js,mjs}',
          ],
        },
      ],
      'import/no-unresolved': [
        'error',
        {
          ignore: ['bundle-stats', 'storybook/*', 'rollup-plugin-webpack-stats'],
        },
      ],

      // react rules
      'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
      'react/jsx-props-no-spreading': 'off',
      'react/function-component-definition': [
        'warn',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/static-property-placement': 'off',
    },
  },

  // JS/JSX: use espree (ESLint's built-in parser) with JSX support
  {
    files: ['**/*.{js,mjs,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  // TypeScript: use @typescript-eslint parser and plugin
  // (replaces eslint-config-airbnb-typescript which is incompatible with @typescript-eslint v8)
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: path.resolve(__dirname),
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin as unknown as ESLint.Plugin,
    },
    rules: {
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        {
          peerDependencies: true,
          devDependencies: [
            '**/build/**/*.{ts,tsx}',
            '**/*.config.ts',
            '**/*.stories.tsx',
            '**/__mocks__/**/*.ts',
            '**/__tests__/*.ts',
            '**/test/**/*.ts',
            '**/storybook/*.ts',
            '**/jest/*.ts',
          ],
        },
      ],
      'implicit-arrow-linebreak': 'warn',
      'react/require-default-props': 'off',
      'react/prop-types': 'off',
      // Turn off base rules — @typescript-eslint version handles TS files
      // (TypeScript compiler already catches these; no-undef causes false positives for TS types)
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^[_]{1,}$' }],
    },
  },

  // Per-package: plugin-webpack-filter, plugin-webpack-validate, rollup-plugin
  {
    files: [
      'packages/plugin-webpack-filter/**',
      'packages/plugin-webpack-validate/**',
      'packages/rollup-plugin/**',
    ],
    rules: {
      'import/no-cycle': ['warn', { maxDepth: 1 }],
      'object-curly-newline': 'off',
      'function-paren-newline': 'off',
    },
  },

  // Per-package: utils
  {
    files: ['packages/utils/**'],
    rules: {
      'import/no-cycle': [2, { maxDepth: 1 }],
    },
  },

  // Per-package: html-templates (root-level overrides)
  {
    files: ['packages/html-templates/**'],
    languageOptions: {
      globals: {
        __DEVELOPMENT__: true,
        __PRODUCTION__: true,
        __VERSION__: true,
      },
    },
    rules: {
      'operator-linebreak': ['error', 'before', { overrides: { '&&': 'ignore' } }],
      'import/extensions': [
        'error',
        'never',
        {
          svg: 'always',
          png: 'always',
          css: 'always',
          json: 'always',
        },
      ],
      'import/no-extraneous-dependencies': [
        'error',
        {
          peerDependencies: true,
          devDependencies: true,
        },
      ],
    },
  },

  // Per-package: html-templates src (webpack resolver for aliases)
  {
    files: ['packages/html-templates/src/**/*.{js,jsx}'],
    settings: {
      'import/resolver': {
        webpack: {
          config: {
            resolve: {
              extensions: ['.jsx', '.json', '.js'],
              alias: {
                react: 'preact/compat',
                'react-dom': 'preact/compat',
                Fixtures: path.resolve(__dirname, 'fixtures'),
              },
            },
          },
        },
        node: {
          extensions: ['.js', '.jsx'],
        },
      },
    },
    rules: {
      'import/extensions': [
        'error',
        'never',
        {
          svg: 'always',
          png: 'always',
          css: 'always',
          json: 'always',
        },
      ],
      'react/no-unknown-property': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/sort-comp': 'off',
      'react/destructuring-assignment': 'off',
      'react/function-component-definition': [
        'warn',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
    },
  },

  // Prettier must be last to override formatting rules
  prettierRecommended,
];

export default config;
