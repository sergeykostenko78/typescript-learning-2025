import { test, expect } from '@playwright/test';

  test('@smoke Flaky test demo', async ({ page }) => {
      const random = Math.random();
      console.log(`Random value: ${random}`);
      expect(random).toBeGreaterThan(0.3);
  });