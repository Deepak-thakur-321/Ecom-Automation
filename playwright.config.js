const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",

  timeout: 60 * 1000,

  expect: {
    timeout: 10000,
  },

  retries: process.env.CI ? 2 : 1,

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  reporter: [
    ["html"],
    ["list"]
  ],

  use: {
    baseURL: "https://fashion-commerce-nine.vercel.app",

    actionTimeout: 15000,
    navigationTimeout: 30000,

    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});