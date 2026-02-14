import { test as base, Page } from '@playwright/test';

    type AuthFixtures = {
        authenticatedPage: Page;
    };

    export const test = base.extend<AuthFixtures>({
        authenticatedPage: async ({ page }, use) => {
            // Setup: navigate to site
            await page.goto('https://demoqa.com');

            // Could add login logic here if needed
            // await page.fill('#username', 'user');
            // await page.fill('#password', 'pass');
            // await page.click('#login');

            // Provide page to test
            await use(page);

            // Teardown: runs after test (optional cleanup)
        }
    });

    export { expect } from '@playwright/test';
    