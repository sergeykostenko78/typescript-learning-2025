import { defineConfig } from '@playwright/test';

  export default defineConfig({
      testDir: './specs',
      timeout: 30000,
      retries: 0,
      use: {
          baseURL: 'https://demoqa.com',
          headless: true,
          screenshot: 'only-on-failure',
          trace: 'on-first-retry',
      },
      reporter: [['html', { open: 'never' }]],
  });