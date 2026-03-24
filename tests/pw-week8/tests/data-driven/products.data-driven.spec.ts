import { test, expect } from '@playwright/test';
import products from '../../src/data/products.json';
import { LoginPage } from '../../src/pages/LoginPage';
import { InventoryPage } from '../../src/pages/InventoryPage';
import type { ProductTestData } from '../../src/data/types';

    test.describe('Product data-driven', () => {
    
        let loginPage: LoginPage;
        let inventoryPage: InventoryPage;
        const typedProducts = products as ProductTestData[];

        test.beforeEach(async ({ page }) => {
            loginPage = new LoginPage(page);
            inventoryPage = new InventoryPage(page);
            await loginPage.navigate('https://www.saucedemo.com/');
            await loginPage.login('standard_user', 'secret_sauce');
        });

        for (const product of typedProducts) {
        test(`@regression Product price: ${product.name}`, async ({ page }) => {

            const price = await inventoryPage.getProductPrice(product.name);
            expect(price).toBe(product.expectedPrice);

        });
        }
    });