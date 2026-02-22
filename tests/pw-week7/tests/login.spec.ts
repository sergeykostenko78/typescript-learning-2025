import { test, expect } from '../fixtures/authFixture';

    test.describe('standard user', () => {
        test.use({ userType: 'standard' });
        test('sees inventory', async ({ authenticatedPage }) => {
            await expect(authenticatedPage.locator('.inventory_item_price')).toHaveCount(6);
        });
    });

    test.describe('problem user', () => {
        test.use({ userType: 'problem' });
        test('sees broken images', async ({ authenticatedPage }) => {
            const images = authenticatedPage.locator('img.inventory_item_img');
            const allSrcs = await images.evaluateAll(imgs => imgs.map(img => img.getAttribute('src') || ''));
            expect(allSrcs.some(src => src.includes('sl-404'))).toBe(true);
        });
    });

    test.describe('locked user', () => {
        test.use({ userType: 'locked' });
        test('sees error message', async ({ page }) => {
            await page.goto('https://www.saucedemo.com/');
            await page.fill('input#user-name', 'locked_out_user');
            await page.fill('input#password', 'secret_sauce');
            await page.click('input#login-button');
            
            await expect(page.locator('[data-test="error"]')).toContainText('Sorry, this user has been locked out');
        });
    });


    