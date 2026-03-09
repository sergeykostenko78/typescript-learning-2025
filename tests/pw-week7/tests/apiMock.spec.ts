import { test, expect } from '../fixtures/apiMock.fixture';

test.describe('API Mock Fixture Tests', () => {

  test('Test 1: mockRoute returns custom data', async ({ page, mockAPI }) => {
    // Step 1: Mock a URL that the page will request
      await mockAPI.mockRoute('**/sauce-pullover*', { mocked: true });
      await page.goto('https://www.saucedemo.com/inventory.html');
      
      const requests = mockAPI.getInterceptedRequests('sauce-pullover');
      expect(requests.length).toBeGreaterThan(0);
  });

  test('Test 2: mockError returns 500', async ({ page, mockAPI }) => {
    // Step 1: Use mockError to intercept a URL with status 500
      await mockAPI.mockError('**/sauce-backpack*', 500);
      await page.goto('https://www.saucedemo.com/inventory.html');

      const requests = mockAPI.getInterceptedRequests('sauce-backpack');
      expect(requests.length).toBeGreaterThan(0);
      expect(requests[0].method).toBe('GET');
  });

  test('Test 3: getInterceptedRequests tracks requests', async ({ page, mockAPI }) => {
      await mockAPI.mockRoute('**/inventory.html', { mocked: true });
      await page.goto('https://www.saucedemo.com');
      await page.fill('#user-name', 'standard_user');
      await page.fill('#password', 'secret_sauce');
      await page.click('#login-button');

      const requests = mockAPI.getInterceptedRequests('inventory');
      expect(requests.length).toBeGreaterThan(0);
      expect(requests[0].method).toBe('GET');
      expect(requests[0].url).toContain('inventory');
  });

});