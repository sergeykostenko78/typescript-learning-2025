import { test, expect } from '@playwright/test';
import { AlertsPage } from '../pages/AlertsPage';

test.describe('Alerts', () => {

    test('should handle simple alert and verify text', async ({ page }) => {
      
      const alertsPage = new AlertsPage(page);
      let alertMessage = '';

      page.on('dialog', async dialog => {
      alertMessage = dialog.message();  // get alert text
      await dialog.accept();           // click OK
      });

      await alertsPage.navigateToAlerts();
      await alertsPage.clickAlertButton();
      expect(alertMessage).toContain('You clicked a button');

    });

    test('should accept confirm box and verify result', async ({ page }) => {
        const alertsPage = new AlertsPage(page);

        page.on('dialog', async dialog => {
        console.log(dialog.message());  // get alert text
        await dialog.accept();           // click OK
        });

        await alertsPage.navigateToAlerts();
        await alertsPage.clickConfirmButton();
        expect( await alertsPage.getConfirmResult()).toContain('You selected Ok');
    });

    test('should enter text in prompt and verify result', async ({ page }) => {
        const alertsPage = new AlertsPage(page);
        const myInput = 'QA text';

        page.on('dialog', async dialog => {
        await dialog.accept(myInput);
        });

        await alertsPage.navigateToAlerts();
        await alertsPage.clickPromptButton();
        const result = await alertsPage.getPromptResult();
        expect(result).toContain(`You entered ${myInput}`);

    });

    test('should switch between nested frames and extract text', async ({ page }) => {
        await page.goto('https://demoqa.com/nestedframes');
        const parentFrame = page.frameLocator('#frame1');
        const parentText = await parentFrame.locator('body').innerText();
        const childFrame = parentFrame.frameLocator('iframe');
        const childText = await childFrame.locator('body').innerText();
        expect(parentText).toContain('Parent frame');
        expect(childText).toContain('Child Iframe');

    });

});