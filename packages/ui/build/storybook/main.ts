import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const STORYBOOK_DIR = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../../src/**/*.stories.@(jsx|tsx|mdx)'],
  addons: ['@storybook/addon-vitest'],

  docs: {
    autodocs: true,
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      // Paths are resolved from Vite root (set to PACKAGE_ROOT below).
      tsconfigPath: '../../tsconfig.json',
      include: ['../../src/**/*.tsx'],
      exclude: ['../../src/**/*.stories.tsx'],
    },
  },

  viteFinal: (viteConfig) =>
    mergeConfig(viteConfig, {
      // Keep Vite root at the Storybook config directory so docgen paths resolve deterministically.
      root: STORYBOOK_DIR,
      plugins: [svgr()],
      define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
};

export default config;
