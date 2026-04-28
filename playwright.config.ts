import { defineConfig, devices } from "playwright/test";

const port = Number(process.env.PLAYWRIGHT_PORT || 4199);
const baseURL = process.env.PLAYWRIGHT_BASE_URL || `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./tests/smoke",
  fullyParallel: true,
  reporter: process.env.CI ? "dot" : "list",
  retries: process.env.CI ? 2 : 0,
  timeout: 30_000,
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: `HOST=127.0.0.1 PORT=${port} node scripts/serve-dist.mjs`,
        reuseExistingServer: false,
        timeout: 60_000,
        url: baseURL,
      },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 1100 },
      },
    },
    {
      name: "mobile",
      use: {
        ...devices["Pixel 7"],
      },
    },
  ],
});
