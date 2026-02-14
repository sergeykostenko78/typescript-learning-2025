import { test, expect } from '@playwright/test';
import { WidgetsPage } from '../pages/WidgetsPage';

test.describe('Widgets', () => {

    test('should assert value selected from dropdown', async ({ page }) => {
      const widgetsPage = new WidgetsPage(page);

      await widgetsPage.navigateToAutocomplete();
      await widgetsPage.inputText('Blue');
      await widgetsPage.clickDropdownValue('Blue');
      expect(await widgetsPage.getSelectedValue()).toContain('Blue');

    });

    test('should assert value from calendar', async ({ page }) => {
      const widgetsPage = new WidgetsPage(page);
      const day = 23;

      await widgetsPage.navigateToDatePicker();
      await widgetsPage.selectDate(day);
      expect(await widgetsPage.getSelectedDate()).toContain(String(day));

    });

    test('should assert slider values', async ({ page }) => {
        const widgetPage = new WidgetsPage(page);
        const sliderValue = 88;

        await widgetPage.navigateToSlider();
        await widgetPage.setSliderValue(sliderValue);
        expect(await widgetPage.getSliderValue()).toContain(String(sliderValue));
    });

    test('should assert value progress bar', async ({ page }) => {
      const widgetsPage = new WidgetsPage(page);

      await widgetsPage.navigateToProgressBar();
      await widgetsPage.clickStart();
      await widgetsPage.waitForComplete();
      expect(await widgetsPage.getProgressValue()).toBe('100%');

    });
    
});