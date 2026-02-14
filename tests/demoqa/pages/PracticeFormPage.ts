import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

  export class PracticeFormPage extends BasePage {
      private readonly firstNameInput = this.page.locator('#firstName');
      private readonly lastNameInput = this.page.locator('#lastName');
      private readonly genderMale = this.page.locator('label[for="gender-radio-1"]');
      private readonly genderFemale = this.page.locator('label[for="gender-radio-2"]');
      private readonly genderOther = this.page.locator('label[for="gender-radio-3"]');
      private readonly mobileNumberInput = this.page.locator('#userNumber');
      private readonly submitBtn = this.page.locator('#submit');
      private readonly modalBody = this.page.locator('.modal-body');

      constructor(page: Page) {
          super(page);
      }

      async navigateToPracticeForm(): Promise<void> {
        await this.navigateTo('/automation-practice-form');
      }

      async fillName(firstName: string, lastName: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
      }
  
      async selectGender(gender: 'Male' | 'Female' | 'Other'): Promise<void> {
        const genderMap = {
          'Male': this.genderMale,
          'Female': this.genderFemale,
          'Other': this.genderOther
        };
        await genderMap[gender].click();
      }

      async fillMobile(mobile: string): Promise<void> {
        await this.mobileNumberInput.fill(mobile);
      }

      async submitForm(): Promise<void> {
        await this.submitBtn.click();
      }

      async getModalText(): Promise<string> {
        return await this.modalBody.innerText();
      }
      
  }