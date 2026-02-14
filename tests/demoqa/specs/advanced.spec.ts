import { test, expect } from '../fixtures/apiMockFixture';

test.describe('API mocks', () => {

    test('test with mocked API', async ({ page, mockApi }) => {
      await mockApi.success('**/BookStore/v1/Books', { books: [{ title: 'Test' }] });
      await page.goto('https://demoqa.com/books');
      // API returns mocked data
    });

    test('test with API error', async ({ page, mockApi }) => {
        await mockApi.error('**/BookStore/v1/Books', 500);
        await page.goto('https://demoqa.com/books');
        // API returns 500 error
    });

    test('should display mocked API data', async ({ page }) => {
        await page.route('**/BookStore/v1/Books', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    books: [
                    { title: 'Fake Book 1', author: 'Me' },
                    { title: 'Fake Book 2', author: 'You' }
                    ]
                })
            })
        });

        await page.goto('https://demoqa.com/books');
        await expect(page.locator('.rt-tbody')).toContainText('Fake Book 2');

    });

    test('should show error when API fails', async ({ page }) => {
      await page.route('**/BookStore/v1/Books', route => {
          route.fulfill({
              status: 500,
              contentType: 'application/json',
              body: JSON.stringify({ message: 'Internal Server Error' })
          });
      });

      await page.goto('https://demoqa.com/books');
      await expect(page.locator('.rt-tbody .rt-tr-group')).toHaveCount(0);

    });

});