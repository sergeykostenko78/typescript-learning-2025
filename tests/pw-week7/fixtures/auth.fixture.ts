import { test as base, Page, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

    type authFixture = {
        authenticatedPage: Page;
        userType: 'standard' | 'problem' | 'locked';
    }

    const testData = {
        standard: { username: 'standard_user', password: 'secret_sauce' },
        problem: { username: 'problem_user', password: 'secret_sauce' },
        locked: { username: 'locked_out_user', password: 'secret_sauce' },
    }


    export const test = base.extend<authFixture>({
        userType: ['standard', { option: true }],

        authenticatedPage: async ({ page, userType }, use) => {
            const loginPage = new LoginPage(page);
            await page.goto('https://www.saucedemo.com/');
            await loginPage.login(testData[userType].username, testData[userType].password);
            
            if (userType !== 'locked') {
                await expect(page).toHaveURL(/inventory/);
                await use(page);
                await loginPage.logout();
            }
            
            else if (userType === 'locked') {
                const error = await loginPage.getErrorMessage();
                throw new Error(`Login failed for locked_out_user: ${error}`);
            }
        }
    });

    export { expect } from '@playwright/test';