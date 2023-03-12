module.exports = {
  root: true,
  extends: ['airbnb', 'plugin:prettier/recommended'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  env: {
    node: true,
    browser: true,
    'jest/globals': true,
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
    ],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': ['error', { peerDependencies: true }],
    'react/static-property-placement': 'off',
    'react/jsx-props-no-spreading': 'off',
    'prettier/prettier': 'warn',
    'no-unused-vars': ['warn', { varsIgnorePattern: '^[_]{1,}$' }],
    'implicit-arrow-linebreak': 'warn',
    'react/function-component-definition': [
      'warn',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
  },
  plugins: ['jest'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      extends: ['airbnb-typescript'],
      plugins: ['@typescript-eslint'],
      rules: {
        'import/prefer-default-export': 'off',
        'implicit-arrow-linebreak': 'warn',
        'react/require-default-props': 'off',
        '@typescript-eslint/comma-dangle': 'warn',
        '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^[_]{1,}$' }],
        'react/prop-types': 'off',
        // '@typescript-eslint/implicit-arrow-linebreak': 'warn',
      },
    },
  ],
};
