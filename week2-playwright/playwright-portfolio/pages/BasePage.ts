import { Page } from '@playwright/test';
  import { takeScreenshot } from '../helpers/utils';

  export class BasePage {
    protected page: Page;  // ← All child pages get this
    protected url: string; // ← Each page has different URL

    constructor(page: Page, url: string) {
      this.page = page;
      this.url = url;
    }

    // Method 1: Navigate to page
    async navigate(): Promise<void> {
      await this.page.goto(this.url);
    }

    // Method 2: Take screenshot
    async screenshot(name: string): Promise<void> {
      await takeScreenshot(this.page, name);
    }

    // Method 3: Get current URL
    getCurrentUrl(): string {
      return this.page.url();
    }
  }