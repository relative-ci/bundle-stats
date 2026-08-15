import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const CONFIG_DIR = dirname(fileURLToPath(import.meta.url));
// Stories read the shared fixtures from the monorepo root, outside of the package directory
const ROOT_DIR = join(CONFIG_DIR, '../../../..');

const pkg = JSON.parse(readFileSync(join(CONFIG_DIR, '../../package.json'), 'utf8'));

const isProduction = process.env.NODE_ENV === 'production';

export default {
  framework: '@storybook/react-vite',
  stories: ['../../src/**/*.stories.@(jsx|tsx|mdx)'],
  addons: ['@storybook/addon-vitest'],

  docs: {
    autodocs: true,
  },

  typescript: {
    // The package has no TypeScript sources
    reactDocgen: 'react-docgen',
  },

  viteFinal: (config) =>
    mergeConfig(config, {
      plugins: [svgr()],
      resolve: {
        // Render with preact, the same as the production build (see build/webpack/resolve.js).
        // No @vitejs/plugin-react here: its React Refresh runtime is not supported by preact/compat.
        alias: {
          react: 'preact/compat',
          'react-dom': 'preact/compat',
          'react-dom/test-utils': 'preact/test-utils',
          'react/jsx-runtime': 'preact/jsx-runtime',
          Fixtures: join(ROOT_DIR, 'fixtures'),
        },
      },
      esbuild: {
        jsx: 'automatic',
      },
      // Mirrors build/webpack/define.js
      define: {
        __VERSION__: JSON.stringify(pkg.version),
        __PRODUCTION__: JSON.stringify(isProduction),
        __DEVELOPMENT__: JSON.stringify(!isProduction),
      },
    }),
};
