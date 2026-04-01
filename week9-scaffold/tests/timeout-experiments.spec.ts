 import { test, expect } from '@playwright/test';

  test('@smoke Timeout demo - global', async ({ page }) => {
      await page.goto('https://www.saucedemo.com');
      await page.locator('#nonexistent-element').click();
  });

  test('@smoke Timeout demo - custom', async ({ page }) => {
      test.setTimeout(5_000);
      await page.goto('https://www.saucedemo.com');
      await page.locator('#nonexistent-element').click();
  });

  test('@smoke Expect timeout demo', async ({ page }) => {
      await page.goto('https://www.saucedemo.com');
      await expect(page.locator('#nonexistent')).toBeVisible();
  });