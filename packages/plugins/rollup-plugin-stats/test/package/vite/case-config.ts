import { defineConfig } from 'vite';
import statsPlugin from 'rollup-plugin-stats';

export default defineConfig({
  build: {
    outDir: 'dist-ts',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]',
        chunkFileNames: 'assets/[name].js',
        entryFileNames: 'assets/[name].js',
      },
    },
  },
  plugins: [statsPlugin()],
});
