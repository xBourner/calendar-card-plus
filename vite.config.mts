import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/card.ts',
      formats: ['es'],
      fileName: (format) => `calendar-card-plus.js`,
    },
    outDir: 'dist',
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
      external: [
      ],
    },
  },
});
