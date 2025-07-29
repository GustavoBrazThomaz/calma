import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: [
      "./src/app/config/setup-test.ts",
      "./src/app/config/vitest-cleanup-after-each.ts",
      "./src/app/config/watch-media.ts",
    ],
    exclude: [
      "**/*.spec.ignore.ts",
      "**/*.spec.ignore.tsx",
      "node_modules",
      "dist",
    ],
  },
});
