import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  testMatch: "capture.spec.ts",
  timeout: 120_000,
  workers: 1,
  retries: 0,
  reporter: "list",
  // Headed: a headless Chrome on this seat falls back to a software adapter, so the gate
  // captures what the seat's own session renders (measured 2026-09-08).
  use: { headless: false },
});
