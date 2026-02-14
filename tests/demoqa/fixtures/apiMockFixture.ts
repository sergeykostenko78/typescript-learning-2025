import { test as base, Page } from '@playwright/test';

    type ApiMockFixtures = {
        mockApi: {
            success: (url: string, data: object) => Promise<void>;
            error: (url: string, status: number) => Promise<void>;
      };
    };

    export const test = base.extend<ApiMockFixtures>({
        mockApi: async ({ page }, use) => {
            const mockHelpers = {
              success: async (url: string, data: object) => {
                  await page.route(url, route => {
                      route.fulfill({
                          status: 200,
                          contentType: 'application/json',
                          body: JSON.stringify(data)
                      });
                  });
              },
              error: async (url: string, status: number) => {
                  await page.route(url, route => {
                      route.fulfill({
                          status: status,
                          contentType: 'application/json',
                          body: JSON.stringify({ error: 'Mocked error' })
                      });
                  });
              }
          };

          await use (mockHelpers);

        }
    });

    export { expect } from '@playwright/test';