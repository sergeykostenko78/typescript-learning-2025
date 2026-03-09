import { test, expect } from '../fixtures/fixtures';

    test.describe('Composite fixture tests', () => {
        //test.use({ userType: 'standard' });
        test('Test 1: authenticated user with mocked route', async ({ authenticatedPage, mockAPI }) => {
            await mockAPI.mockRoute('**/sauce-backpack*', { mocked: true });
            await authenticatedPage.reload(); // reload triggers image requests again
            const requests = mockAPI.getInterceptedRequests('sauce-backpack');
            expect(requests.length).toBeGreaterThan(0);
        });

        test('Test 2: checkout with generated test data', async ({ authenticatedPage, testData }) => {
            // click "Add to cart" on any item
            await authenticatedPage.click('[data-test="add-to-cart-sauce-labs-backpack"]');
            // go to cart
            await authenticatedPage.click('.shopping_cart_link');
            // click checkout
            await authenticatedPage.click('[data-test="checkout"]');
            // fill the form with random data
            await authenticatedPage.fill('[data-test="firstName"]', testData.randomName());
            await authenticatedPage.fill('[data-test="postalCode"]', testData.randomZip());
            await authenticatedPage.fill('[data-test="lastName"]', testData.randomName());
            // continue
            await authenticatedPage.click('[data-test="continue"]');
            // finish
            await authenticatedPage.click('[data-test="finish"]');
            // verify success
            await expect(authenticatedPage.locator('.complete-header')).toContainText('Thank you');
        });

        test('Test 3: page loads within acceptable time', async ({ authenticatedPage, performance }) => {
            performance.markStart();
            await authenticatedPage.goto('https://www.saucedemo.com/inventory.html');
            performance.assertLoadTime(3000);
        });

        test('Test 4: full E2E with all fixtures', async ({ authenticatedPage, mockAPI, testData, performance }) => {
            performance.markStart();
            await mockAPI.mockRoute('**/sauce-backpack*', { mocked: true });
            await authenticatedPage.click('[data-test="add-to-cart-sauce-labs-onesie"]');
            await authenticatedPage.click('.shopping_cart_link');
            await authenticatedPage.click('[data-test="checkout"]');
            await authenticatedPage.fill('[data-test="firstName"]', testData.randomName());
            await authenticatedPage.fill('[data-test="lastName"]', testData.randomName());
            await authenticatedPage.fill('[data-test="postalCode"]', testData.randomZip());
            await authenticatedPage.click('[data-test="continue"]');
            await authenticatedPage.click('[data-test="finish"]');
            await expect(authenticatedPage.locator('.complete-header')).toContainText('Thank you');
            performance.assertLoadTime(10000);
        });

    });