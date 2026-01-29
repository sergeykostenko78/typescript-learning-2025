import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TEST_USERS } from '../fixtures/testData';

  type MyFixtures = {
      authenticatedPage: Page;
  };

  export const test = base.extend<MyFixtures>({
      authenticatedPage: async ({ page }, use) => {
            const loginPage = new LoginPage(page);
            await loginPage.navigate('https://www.saucedemo.com/');
            await loginPage.login(TEST_USERS.standard.username, TEST_USERS.standard.password);
            await use(page);
      },
  });

  export { expect } from '@playwright/test';