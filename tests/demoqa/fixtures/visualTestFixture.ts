import { test as base, Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

  type VisualFixtures = {
      visual: {
          compareFullPage: (name: string) => Promise<void>;
          compareElement: (locator: Locator, name: string) => Promise<void>;
      };
  };

  export const test = base.extend<VisualFixtures>({
      visual: async ({ page }, use) => {
          const helpers = {
              compareFullPage: async (name: string) => {
                await expect(page).toHaveScreenshot(name, {
                    maxDiffPixelRatio: 0.05  // allow small differences
                });
              },
              compareElement: async (locator: Locator, name: string) => {
                await expect(locator).toHaveScreenshot(name, {
                    maxDiffPixelRatio: 0.05
                });
              }
          };

          await use(helpers);
      }
  });

  export { expect } from '@playwright/test';