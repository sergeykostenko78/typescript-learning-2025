import { test, expect } from '@playwright/test';
import users from '../../src/data/users.json';
import { LoginPage } from '../../src/pages/LoginPage';
import type { UserTestData } from '../../src/data/types';

    test.describe('Login data-driven', () => {
    
        let loginPage: LoginPage;
        const typedUsers = users as UserTestData[];

        test.beforeEach(async ({ page }) => {
            loginPage = new LoginPage(page);
            await loginPage.navigate('https://www.saucedemo.com/');
        });

        for (const user of typedUsers) {
        test(`@smoke Login: ${user.description}`, async ({ page }) => {
            await loginPage.login(user.username, user.password);
            if (user.shouldLogin === true) {
                await expect(page).toHaveURL(/inventory/);
            } else {
                const error = await loginPage.getErrorMessage();
                expect(error).toContain('Epic sadface');
            }

        });
        }

        test('Slow operation with extended timeout', async ({ page }) => {
            test.setTimeout(60_000);
            await loginPage.navigate('https://www.saucedemo.com/');
            await page.waitForTimeout(3000); // simulates slow page/network
            await expect(page).toHaveURL('https://www.saucedemo.com/');
        });
    });
