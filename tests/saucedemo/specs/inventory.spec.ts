import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

  test.describe('Product Catalog', () => {
      let loginPage: LoginPage;
      let inventoryPage: InventoryPage;

      test.beforeEach(async ({ page }) => {
        inventoryPage = new InventoryPage(page);
        loginPage = new LoginPage(page);
        await loginPage.navigate('https://www.saucedemo.com/');
        await loginPage.login('standard_user', 'secret_sauce');
      });

      test('should sort products by name A-Z', async ({ page }) => {
        await inventoryPage.sortBy('az');
        const displayedNames = await inventoryPage.getProductNames();
        const expectedOrder = [...displayedNames].sort();
        expect(displayedNames).toEqual(expectedOrder);
      });

      test('should sort products by name Z-A', async ({ page }) => {
        await inventoryPage.sortBy('za');
        const displayedNames = await inventoryPage.getProductNames();
        const expectedOrder = [...displayedNames].sort().reverse();
        expect(displayedNames).toEqual(expectedOrder);
      });

      test('should sort products by price low-high', async ({ page }) => {
        await inventoryPage.sortBy('lohi');
        const prices = await inventoryPage.getProductPrices();
        const expectedOrder = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(expectedOrder);
      });

      test('should sort products by price high-low', async ({ page }) => {
        await inventoryPage.sortBy('hilo');
        const prices = await inventoryPage.getProductPrices();
        const expectedOrder = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(expectedOrder);
      });

      test('navigate to product details', async ({ page }) => {
        await inventoryPage.clickFirstTitle();
        await expect(page).toHaveURL(/inventory-item/);
        await expect(page.locator('[data-test="inventory-item-name"]')).toBeVisible();
        await expect(page.locator('[data-test="inventory-item-desc"]')).toBeVisible();
        await expect(page.locator('[data-test="inventory-item-price"]')).toBeVisible();
        await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
        //await expect(page.locator('[data-test="inventory-item-name"]')).toBeVisible();
      })
  });