import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

const PACKAGE_ROOT = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: PACKAGE_ROOT,
  plugins: [
    storybookTest({
      configDir: join(PACKAGE_ROOT, 'build/storybook'),
      storybookUrl: 'http://localhost:8080',
      storybookScript: 'npm start',
    }),
    // `storybookTest` assumes `configDir` sits one directory below the package root (the
    // conventional `.storybook` layout) and derives Vitest's `root` from `configDir`'s parent.
    // This repo nests Storybook config one level deeper (`build/storybook`), so it resolves to
    // the wrong directory (`build/`) and no story files are found. Force it back.
    {
      name: 'fix-storybook-vitest-root',
      enforce: 'post',
      config: () => ({ root: PACKAGE_ROOT }),
    },
  ],
  optimizeDeps: {
    // Vite's dependency scanner reads the story files from disk without running the JSX
    // transform, so the automatic runtime imports it injects are invisible to it. On a cold
    // cache (every CI run) they are only discovered once the browser requests a story, which
    // re-runs the optimizer mid-suite, changes the `browserHash` and reloads the page. The test
    // file then resolves a second copy of `@vitest/runner` whose collector was never
    // initialised, and collection dies with "Vitest failed to find the current suite".
    include: ['react/jsx-runtime', 'react/jsx-dev-runtime'],
  },
  test: {
    name: 'ui:storybook',
    setupFiles: ['./vitest.setup.ts'],
    retry: 2,
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
});
