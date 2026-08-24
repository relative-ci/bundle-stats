import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['src/**/*.test.ts', 'src/**/__tests__/**/*.[jt]s'],
    exclude: ['**/node_modules/**', '**/lib/**', '**/__fixtures__/**'],
  },
});
