import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: [{ find: /\.css$/, replacement: 'identity-obj-proxy' }],
  },
  test: {
    name: 'ui:unit',
    environment: 'jsdom',
    globals: true,
    clearMocks: true,
    passWithNoTests: true,
    setupFiles: ['core-js', 'jest-date-mock'],
    include: ['src/**/*.test.{ts,tsx,js,jsx}', 'src/**/__tests__/**/*.{ts,tsx,js,jsx}'],
    exclude: ['**/node_modules/**', '**/lib/**', '**/*.stories.*'],
  },
});
