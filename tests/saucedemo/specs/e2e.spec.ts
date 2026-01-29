import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

  test.describe('e2e flow', () => {
      let loginPage: LoginPage;
      let inventoryPage: InventoryPage;
      let cartPage: CartPage;
      let checkoutPage: CheckoutPage;

      test('e2e happy path', async ({ page }) => {
        checkoutPage = new CheckoutPage(page);
        cartPage = new CartPage(page);
        inventoryPage = new InventoryPage(page);
        loginPage = new LoginPage(page);
        await loginPage.navigate('https://www.saucedemo.com/');
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await inventoryPage.addToCart('Sauce Labs Bike Light');
        await inventoryPage.addToCart('Sauce Labs Onesie');
        await inventoryPage.navigateToCart();
        await cartPage.navigateToCheckout();
        await checkoutPage.submitStepOne('se', 'ko', '61204');
        await checkoutPage.submitStepTwo();
        await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
      });

      test('e2e happy path on mobile', async ({ page }) => {
        checkoutPage = new CheckoutPage(page);
        cartPage = new CartPage(page);
        inventoryPage = new InventoryPage(page);
        loginPage = new LoginPage(page);

        // Set viewport to mobile
        await page.setViewportSize({ width: 375, height: 667 });
        await loginPage.navigate('https://www.saucedemo.com/');
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await inventoryPage.addToCart('Sauce Labs Bike Light');
        await inventoryPage.addToCart('Sauce Labs Onesie');
        await inventoryPage.navigateToCart();
        await cartPage.navigateToCheckout();
        await checkoutPage.submitStepOne('se', 'ko', '61204');
        await checkoutPage.submitStepTwo();
        await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
      });
});