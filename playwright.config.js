// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Test Configuration
 * Docs: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests', // Directory containing test files
  fullyParallel: true, // Run tests in parallel
  forbidOnly: !!process.env.CI, // Fail if test.only is left in CI
  retries: process.env.CI ? 2 : 0, // Retry only on CI
  workers: process.env.CI ? 1 : undefined, // Limit workers on CI
  reporter: 'html', // Use HTML reporter

  use: {
    headless: true, // Run in headless mode
    trace: 'on-first-retry', // Capture trace on first retry
  },

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
