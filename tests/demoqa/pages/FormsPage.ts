import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { FormData } from '../interfaces/FormData';

  export class FormsPage extends BasePage {
      // locators as readonly properties
      private readonly fullNameInput = this.page.locator('#userName');
      private readonly emailInput = this.page.locator('#userEmail');
      private readonly currentAddress = this.page.locator('#currentAddress');
      private readonly permanentAddress = this.page.locator('#permanentAddress');
      private readonly submitBtn = this.page.locator('#submit');
      private readonly outputField = this.page.locator('#output');

      constructor(page: Page) {
          super(page);
      }

      async navigateToTextBox(): Promise<void> {
        await this.navigateTo('/text-box');
      }

      async fillForm(data: FormData): Promise<void> {
        await this.fullNameInput.fill(data.fullName);
        await this.emailInput.fill(data.email);
        await this.currentAddress.fill(data.currentAddress);
        await this.permanentAddress.fill(data.permanentAddress);
      }

      async submitForm(): Promise<void> {
        await this.submitBtn.click();
      }

      async getOutput(): Promise<string> {
        return await this.outputField.innerText();
      }
  }