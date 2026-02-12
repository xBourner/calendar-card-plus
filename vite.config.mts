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
          // Home Assistant provides these (usually), but often we bundle them to be safe or because they aren't guaranteed.
          // For standalone cards, it's safer to bundle lit if we don't know the environment.
          // However, standard practice often excludes them.
          // Let's bundle everything to be safe and "standalone".
      ],
    },
  },
});
