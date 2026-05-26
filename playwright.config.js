// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  
  // ─── Test Files Kahan Hain ───────────────────────────────────
  testDir: './tests',

  // ─── Ek Test Max Kitne Second Chalega ────────────────────────
  timeout: 30 * 1000,  // 30 seconds

  // ─── Expect Assertions Ka Timeout ────────────────────────────
  expect: {
    timeout: 5000  // 5 seconds
  },

  // ─── Test Fail Hone Pe Retry ──────────────────────────────────
  retries: 1,

  // ─── Parallel Tests ───────────────────────────────────────────
  fullyParallel: true,

  // ─── CI Environment Pe Fail Fast ─────────────────────────────
  forbidOnly: !!process.env.CI,

  // ─── Report Format ────────────────────────────────────────────
  reporter: 'html',

  // ─── Global Settings (Saare Tests Ke Liye) ───────────────────
  use: {
    baseURL: 'https://fashion-commerce-nine.vercel.app',

    // Fail Hone Pe Screenshot Lo
    screenshot: 'only-on-failure',

    // Fail Hone Pe Video Record Karo
    video: 'retain-on-failure',

    // Debug Ke Liye Trace (retry pe)
    trace: 'on-first-retry',
  },

  // ─── Browsers ─────────────────────────────────────────────────
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});