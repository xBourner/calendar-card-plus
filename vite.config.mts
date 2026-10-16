import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/card.ts',
      formats: ['es'],
      fileName: () => 'calendar-card-plus.js',
    },
    outDir: 'dist',
    rolldownOptions: {
      output: {
        codeSplitting: false,
      },
    },
  },
});
