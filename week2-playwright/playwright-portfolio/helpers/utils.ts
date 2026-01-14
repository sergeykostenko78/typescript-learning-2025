import { Page, Locator } from '@playwright/test';

  export async function waitForElement(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  };

  export function getTimestamp(): string {
    const now = new Date();
    const year = now.getFullYear();

    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');    

    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  };

  export function extractNumberFromText(text: string | null): number {
    if (text === null) {
      return 0;
    }
    const cleanText = text.replace(/[,\s]/g, '');
    const matchResult = cleanText.match(/\d+/);
    if (matchResult === null) {
      return 0;
    }
    const number = parseInt(matchResult[0]);
    return number;
  };

  export async function takeScreenshot(page: Page, name: string): Promise<void> {
    // Step 1: Get timestamp using the function you wrote
    const timestamp = getTimestamp();

    // Step 2: Create filename: {name}-{timestamp}.png
    const filename = `${name}-${timestamp}.png`;

    // Step 3: Create full path: screenshots/{filename}
    const filepath = `screenshots/${filename}`;

    // Step 4: Take screenshot using Playwright
    // Hint: await page.screenshot({ path: filepath })
    await page.screenshot({ path: filepath });
  };
  