import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 30000,
  expect: {
      timeout: 5_000,
  },
  reporter: [
    ['html',  { open: 'never', outputFolder: 'reports/html' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
    ['list'],

  ],

  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'smoke',
      testDir: './tests',
      grep: /@smoke/,
      use: { ...devices['Desktop Chrome'] },
    },
    
    {
      name: 'regression',
      testDir: './tests',
      grep: /@regression/,
      use: { ...devices['Desktop Chrome'] },
    },

  ],
});
