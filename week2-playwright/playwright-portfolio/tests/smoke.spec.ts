import { test, expect } from '@playwright/test';

test.describe('Smoke Tests - DOU.ua', () => {
  test('should load homepage', async ({ page }) => {
    // Navigate to homepage
    await page.goto('https://dou.ua');
    
    // Check title contains "DOU"
    await expect(page).toHaveTitle(/DOU/);
    
    // Check main navigation exists
    const header = page.locator('header').first();
    await expect(header).toBeVisible();
    
    console.log('✅ Homepage loaded successfully');
  });

  test('should navigate to Jobs section', async ({ page }) => {
    await page.goto('https://dou.ua');
    
    // Find and click "Робота" (Jobs) link
    await page.click('text=Робота');
    
    // Wait for navigation
    await page.waitForURL('**/jobs.dou.ua/**');
    
    // Verify we're on jobs page
    await expect(page).toHaveURL(/jobs\.dou\.ua/);
    
    console.log('✅ Navigated to Jobs section');
  });
});