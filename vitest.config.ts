import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: [
      "./src/app/config/setup-test.ts",
      "./src/app/config/vitest-cleanup-after-each.ts",
    ],
  },
});
