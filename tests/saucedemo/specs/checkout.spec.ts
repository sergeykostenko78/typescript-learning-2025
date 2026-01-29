import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

  test.describe('Checkout flow', () => {
      let loginPage: LoginPage;
      let inventoryPage: InventoryPage;
      let cartPage: CartPage;
      let checkoutPage: CheckoutPage;

      test.beforeEach(async ({ page }) => {
        checkoutPage = new CheckoutPage(page);
        cartPage = new CartPage(page);
        inventoryPage = new InventoryPage(page);
        loginPage = new LoginPage(page);
        await loginPage.navigate('https://www.saucedemo.com/');
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addToCart('Sauce Labs Bolt T-Shirt');
        await inventoryPage.navigateToCart();
        await cartPage.navigateToCheckout();
      });

      test('checkout happy path', async ({ page }) => {
        await checkoutPage.submitStepOne('se', 'ko', '61204');
        await checkoutPage.submitStepTwo();
        await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
      });

      test('back home after order complete', async ({ page }) => {
        await checkoutPage.submitStepOne('se', 'ko', '61204');
        await checkoutPage.submitStepTwo();
        await checkoutPage.backHome();
        await expect(page).toHaveURL(/inventory/);
      });

      test('cancel checkout', async ({ page }) => {
        await checkoutPage.cancel();
        await expect(page).toHaveURL(/cart/);
      });

      test('form fields validation', async ({ page }) => {
        await checkoutPage.submitStepOne('', '', '');
        const errorFirstName = await checkoutPage.getErrorMessage();
        expect(errorFirstName).toContain('First Name is required');
        await checkoutPage.submitStepOne('se', '', '');
        const errorLastName = await checkoutPage.getErrorMessage();
        expect(errorLastName).toContain('Last Name is required');
        await checkoutPage.submitStepOne('se', 'ko', '');
        const errorPostal = await checkoutPage.getErrorMessage();
        expect(errorPostal).toContain('Postal Code is required');
    });

  });