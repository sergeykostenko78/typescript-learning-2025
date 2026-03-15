import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { CheckoutPage } from '../../src/pages/CheckoutPage';

    test.describe('Checkout flow (serial)', () => {
        test.describe.configure({ mode: 'serial' });

        test('Step 1: Add item to cart', async ({ page }) => {
            const loginPage = new LoginPage(page);
            const inventoryPage = new InventoryPage(page);

            await loginPage.navigate('https://www.saucedemo.com/');
            await loginPage.login('standard_user', 'secret_sauce');
            await inventoryPage.addToCart('Sauce Labs Bolt T-Shirt');

            const count = await inventoryPage.getCartBadgeCount();
            expect(count).toEqual(1);
        });

        test('Step 2: Fill checkout info', async ({ page }) => {
            const loginPage = new LoginPage(page);
            const inventoryPage = new InventoryPage(page);
            const checkoutPage = new CheckoutPage(page);

            await loginPage.navigate('https://www.saucedemo.com/');
            await loginPage.login('standard_user', 'secret_sauce');
            await inventoryPage.addToCart('Sauce Labs Bolt T-Shirt');
            await inventoryPage.navigateToCart();
            await page.locator('[data-test="checkout"]').click();
            await checkoutPage.submitStepOne('se', 'ko', '61204');

            await expect(page).toHaveURL(/checkout-step-two/);
        });

        test('Step 3: Complete purchase', async ({ page }) => {
            const loginPage = new LoginPage(page);
            const inventoryPage = new InventoryPage(page);
            const checkoutPage = new CheckoutPage(page);

            await loginPage.navigate('https://www.saucedemo.com/');
            await loginPage.login('standard_user', 'secret_sauce');
            await inventoryPage.addToCart('Sauce Labs Bolt T-Shirt');
            await inventoryPage.navigateToCart();
            await page.locator('[data-test="checkout"]').click();
            await checkoutPage.submitStepOne('se', 'ko', '61204');
            await checkoutPage.submitStepTwo();

            await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
        });
    });