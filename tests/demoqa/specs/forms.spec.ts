import { test, expect } from '@playwright/test';
import { FormsPage } from '../pages/FormsPage';
import { FormData } from '../interfaces/FormData';
import { PracticeFormPage } from '../pages/PracticeFormPage';

test.describe('text box form', () => {

    const testData: FormData = {
      fullName: 'John Doe',
      email: 'john@example.com',
      currentAddress: '123 Main St',
      permanentAddress: '456 Oak Ave',
    };

    test('should submit form with valid data and show success output', async ({ page }) => {
        const formsPage = new FormsPage(page);
        await formsPage.navigateToTextBox();
        await formsPage.fillForm(testData);
        await formsPage.submitForm();
        
        const output = await formsPage.getOutput();
        expect(output).toContain(testData.fullName);
        expect(output).toContain(testData.email);
    });

    test('should not show output when form is empty', async ({ page }) => {
        const formsPage = new FormsPage(page);
        await formsPage.navigateToTextBox();
        await formsPage.submitForm();
      
        await expect(page.locator('#output')).not.toBeVisible();
    });

    test('should show error for invalid email format', async ({ page }) => {
      const invalidEmailData: FormData = {
          fullName: 'John Doe',
          email: 'invalid-email',
          currentAddress: '123 Main St',
          permanentAddress: '456 Oak Ave'
      };

      const formsPage = new FormsPage(page);
      await formsPage.navigateToTextBox();
      await formsPage.fillForm(invalidEmailData);
      await formsPage.submitForm();

      await expect(page.locator('#userEmail')).toHaveClass(/field-error/);
    });

    test('should fill practice form and verify confirmation modal', async ({ page }) => {
        const firstName = 'John';
        const lastName = 'Doe';
        const mobile = '1234567890';

        const practiceFormPage = new PracticeFormPage(page);
        await practiceFormPage.navigateToPracticeForm();
        await practiceFormPage.fillName(firstName, lastName);
        await practiceFormPage.selectGender('Female');
        await practiceFormPage.fillMobile(mobile);
        await practiceFormPage.submitForm();

        await expect(page.locator('.modal-content')).toBeVisible();
        const outputModal = await practiceFormPage.getModalText();
        expect(outputModal).toContain('John');
        expect(outputModal).toContain('Doe');
    });

});