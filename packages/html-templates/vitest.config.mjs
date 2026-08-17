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
      storybookUrl: 'http://localhost:8090',
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
    // See the equivalent comment in `packages/ui/vitest.config.ts`. The JSX runtime is missed by
    // Vite's dependency scanner and, on a cold cache, its late discovery reloads the page
    // mid-suite. Listed under the aliased ids (`react` -> `preact/compat`, see
    // `build/storybook/main.mjs`) because that is what the browser ends up requesting.
    include: ['preact/compat/jsx-runtime', 'preact/compat/jsx-dev-runtime'],
  },
  test: {
    name: 'html-templates:storybook',
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
