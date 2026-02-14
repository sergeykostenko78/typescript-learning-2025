import { Page } from "@playwright/test";

export class BasePage {
    protected page: Page;
    protected readonly baseUrl = 'https://demoqa.com';

    constructor (page: Page) {
        this.page = page;
    }

    async navigateTo(path: string): Promise<void> {
        await this.page.goto(`${this.baseUrl}${path}`);
    }

    async waitForElement(selector: string): Promise<void> {
         await this.page.locator(selector).waitFor(); 
    }

    async getText(selector: string): Promise<string> {
        return await this.page.locator(selector).innerText();
    }

    async clickElement(selector: string): Promise<void> {
        await this.page.locator(selector).click();
    }
}