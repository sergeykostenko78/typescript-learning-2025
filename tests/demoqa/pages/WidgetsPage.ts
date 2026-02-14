import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

  export class WidgetsPage extends BasePage {
      private readonly multiColorInput = this.page.locator('#autoCompleteMultipleInput');
      private readonly fieldResult = this.page.locator('.auto-complete__multi-value__label');

      private readonly datePicker = this.page.locator('#datePickerMonthYearInput');
      private readonly calendarDate = this.page.locator('.react-datepicker__day');
      private readonly selectedDate = this.page.locator('#datePickerMonthYearInput');

      private readonly sliderPointer = this.page.locator('input[type="range"]');
      private readonly sliderBox = this.page.locator('#sliderValue');

      private readonly progressBar = this.page.locator('[role="progressbar"]');
      private readonly startBtn = this.page.locator('#startStopButton');

      constructor(page: Page) {
          super(page);
      }

      async navigateToAutocomplete(): Promise<void> {
        await this.navigateTo('/auto-complete');
      }

      async inputText(color: string): Promise<void> {
        await this.multiColorInput.pressSequentially(color);
      }

      async clickDropdownValue(text: string): Promise<void> {
        await this.page.locator('.auto-complete__option').filter({ hasText: text }).click();
      }

      async getSelectedValue(): Promise<string> {
        return await this.fieldResult.innerText();
      }

      async navigateToDatePicker(): Promise<void> {
        await this.navigateTo('/date-picker');
      }
      
      async selectDate(day: number): Promise<void> {
        await this.datePicker.click();
        await this.calendarDate
          .filter({ hasText: new RegExp(`^${day}$`) })
          .first()
          .click();
      }
      
      async getSelectedDate(): Promise<string> {
        return await this.datePicker.inputValue();
      }

      async navigateToSlider(): Promise<void> {
        await this.navigateTo('/slider');
      }

      async setSliderValue(value: number): Promise<void> {
        await this.sliderPointer.fill(String(value));
      }

      async getSliderValue(): Promise<string>{
        return await this.sliderBox.inputValue();
      }

      async navigateToProgressBar(): Promise<void> {
        await this.navigateTo('/progress-bar');
      }

      async clickStart(): Promise<void> {
        await this.startBtn.click();
      }

      async waitForComplete(): Promise<void> {
      await expect(this.progressBar).toHaveText('100%', { timeout: 15000 });
      }

      async getProgressValue(): Promise<string> {
        return await this.progressBar.innerText();
      }
  }