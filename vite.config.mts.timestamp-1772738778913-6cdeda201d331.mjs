// vite.config.mts
import { defineConfig } from "file:///H:/www/dev/calendar-card-plus/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: "src/card.ts",
      formats: ["es"],
      fileName: (format) => `calendar-card-plus.js`
    },
    outDir: "dist",
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      },
      external: [
        // Home Assistant provides these (usually), but often we bundle them to be safe or because they aren't guaranteed.
        // For standalone cards, it's safer to bundle lit if we don't know the environment.
        // However, standard practice often excludes them.
        // Let's bundle everything to be safe and "standalone".
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiSDpcXFxcd3d3XFxcXGRldlxcXFxjYWxlbmRhci1jYXJkLXBsdXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkg6XFxcXHd3d1xcXFxkZXZcXFxcY2FsZW5kYXItY2FyZC1wbHVzXFxcXHZpdGUuY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vSDovd3d3L2Rldi9jYWxlbmRhci1jYXJkLXBsdXMvdml0ZS5jb25maWcubXRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIGJ1aWxkOiB7XHJcbiAgICBsaWI6IHtcclxuICAgICAgZW50cnk6ICdzcmMvY2FyZC50cycsXHJcbiAgICAgIGZvcm1hdHM6IFsnZXMnXSxcclxuICAgICAgZmlsZU5hbWU6IChmb3JtYXQpID0+IGBjYWxlbmRhci1jYXJkLXBsdXMuanNgLFxyXG4gICAgfSxcclxuICAgIG91dERpcjogJ2Rpc3QnLFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICBpbmxpbmVEeW5hbWljSW1wb3J0czogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgICAgZXh0ZXJuYWw6IFtcclxuICAgICAgICAgIC8vIEhvbWUgQXNzaXN0YW50IHByb3ZpZGVzIHRoZXNlICh1c3VhbGx5KSwgYnV0IG9mdGVuIHdlIGJ1bmRsZSB0aGVtIHRvIGJlIHNhZmUgb3IgYmVjYXVzZSB0aGV5IGFyZW4ndCBndWFyYW50ZWVkLlxyXG4gICAgICAgICAgLy8gRm9yIHN0YW5kYWxvbmUgY2FyZHMsIGl0J3Mgc2FmZXIgdG8gYnVuZGxlIGxpdCBpZiB3ZSBkb24ndCBrbm93IHRoZSBlbnZpcm9ubWVudC5cclxuICAgICAgICAgIC8vIEhvd2V2ZXIsIHN0YW5kYXJkIHByYWN0aWNlIG9mdGVuIGV4Y2x1ZGVzIHRoZW0uXHJcbiAgICAgICAgICAvLyBMZXQncyBidW5kbGUgZXZlcnl0aGluZyB0byBiZSBzYWZlIGFuZCBcInN0YW5kYWxvbmVcIi5cclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVIsU0FBUyxvQkFBb0I7QUFFaFQsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTztBQUFBLE1BQ1AsU0FBUyxDQUFDLElBQUk7QUFBQSxNQUNkLFVBQVUsQ0FBQyxXQUFXO0FBQUEsSUFDeEI7QUFBQSxJQUNBLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLHNCQUFzQjtBQUFBLE1BQ3hCO0FBQUEsTUFDQSxVQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUtWO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
