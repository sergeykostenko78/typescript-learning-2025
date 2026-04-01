import { test, expect } from '../src/fixtures/authFixture';
import { InventoryPage } from '../src/pages/InventoryPage';
import { CartPage } from '../src/pages/CartPage';
import { PRODUCTS } from '../src/fixtures/testData';
import { allure } from 'allure-playwright';

  test.describe('Shopping Cart', () => {
      
      let inventoryPage: InventoryPage;
      let cartPage: CartPage;

      test.beforeEach(async ({ authenticatedPage }) => {
        cartPage = new CartPage(authenticatedPage);
        inventoryPage = new InventoryPage(authenticatedPage);
        
      });

      test('@smoke add 1 product to cart', async ({ }) => {
        allure.severity('critical');
        allure.feature('Authentication');
        allure.story('Valid login');
        await inventoryPage.addToCart(PRODUCTS.backpack);
        const count = await inventoryPage.getCartBadgeCount();
        expect(count).toEqual(1);
      });

      test('@regression add 3 products to cart', async ({ }) => {
        await inventoryPage.addToCart(PRODUCTS.backpack);
        await inventoryPage.addToCart(PRODUCTS.bikeLight);
        await inventoryPage.addToCart(PRODUCTS.shirt);
        expect(await inventoryPage.getCartBadgeCount()).toBe(3);
      });

      test('@regression remove from cart', async ({ }) => {
        await inventoryPage.addToCart(PRODUCTS.onesie);
        const count = await inventoryPage.getCartBadgeCount();
        expect(count).toEqual(1);
        await inventoryPage.removeFromCart(PRODUCTS.onesie);
        const countRemove = await inventoryPage.getCartBadgeCount();
        expect(countRemove).toBe(0);
      });

      test('@regression cart badge after page reload', async ({ authenticatedPage }) => {
        await inventoryPage.addToCart(PRODUCTS.onesie);
        await authenticatedPage.reload();
        const count = await inventoryPage.getCartBadgeCount();
        expect(count).toEqual(1);
      });

      test('@regression navigate to cart page', async ({ }) => {
        await inventoryPage.addToCart(PRODUCTS.backpack);
        await inventoryPage.addToCart(PRODUCTS.bikeLight);
        await inventoryPage.addToCart(PRODUCTS.onesie);
        await inventoryPage.navigateToCart();

        const cartItems = await cartPage.getCartProductTitles();
        expect(cartItems).toHaveLength(3);
        expect(cartItems).toContain('Sauce Labs Backpack');
        expect(cartItems).toContain('Sauce Labs Bike Light');
        expect(cartItems).toContain('Sauce Labs Onesie');
      });

  });