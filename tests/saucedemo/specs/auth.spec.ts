import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TEST_USERS, PRODUCTS } from '../fixtures/testData';

  test.describe('Authentication', () => {

    let loginPage : LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate('https://www.saucedemo.com/');
    });

    test('should login with valid credentials', async ({ page }) => {
        await loginPage.login(TEST_USERS.standard.username, TEST_USERS.standard.password);
        await expect(page).toHaveURL(/inventory/);
    });

    test('check invalid password', async ({ page }) => {
        await loginPage.login(TEST_USERS.invalid.username, TEST_USERS.invalid.password);
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Username and password do not match');
    });

    test('check locked user', async ({ page }) => {
        await loginPage.login(TEST_USERS.locked.username, TEST_USERS.locked.password);
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Sorry, this user has been locked out');
    });

    test('check logout', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.logout();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    });
 
  });