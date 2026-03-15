import { test, expect } from '@playwright/test';
import products from '../../src/data/products.json';
import { LoginPage } from '../../src/pages/LoginPage';
import { InventoryPage } from '../../src/pages/InventoryPage';

    test.describe('Product data-driven', () => {
    
        let loginPage: LoginPage;
        let inventoryPage: InventoryPage;

        test.beforeEach(async ({ page }) => {
            loginPage = new LoginPage(page);
            inventoryPage = new InventoryPage(page);
            await loginPage.navigate('https://www.saucedemo.com/');
            await loginPage.login('standard_user', 'secret_sauce');
        });

        for (const product of products) {
        test(`@regression Product price: ${product.name}`, async ({ page }) => {

            const price = await inventoryPage.getProductPrice(product.name);
            expect(price).toBe(product.expectedPrice);

        });
        }
    });