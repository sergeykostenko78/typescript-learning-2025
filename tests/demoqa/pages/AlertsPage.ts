import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

  export class AlertsPage extends BasePage {
      private readonly alertBtn = this.page.locator('#alertButton');
      private readonly timerAlertBtn = this.page.locator('#timerAlertButton');
      private readonly confirmBtn = this.page.locator('#confirmButton');
      private readonly promptBtn = this.page.locator('#promtButton');
      private readonly confirmResult = this.page.locator('#confirmResult');
      private readonly promptResult = this.page.locator('#promptResult');

      constructor(page: Page) {
          super(page);
      }

      async navigateToAlerts(): Promise<void> {
        await this.navigateTo('/alerts');
      }

      async clickAlertButton(): Promise<void> {
        await this.alertBtn.click();
      }

      async clickConfirmButton(): Promise<void> {
        await this.confirmBtn.click();
      }

      async clickPromptButton(): Promise<void> {
        await this.promptBtn.click();
      }

      async getConfirmResult(): Promise<string> {
        return await this.confirmResult.innerText();
      }

      async getPromptResult(): Promise<string> {
        return await this.promptResult.innerText();
      }
  }