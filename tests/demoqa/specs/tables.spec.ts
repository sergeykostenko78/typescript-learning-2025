import { test, expect } from '@playwright/test';
import { TablesPage } from '../pages/TablesPage';
import { TableRow } from '../interfaces/TableRow';

test.describe('Tables', () => {

    test('should assert button enabled after 5s', async ({ page }) => {
      const tablesPage = new TablesPage(page);

      await tablesPage.navigateToDynamicProperties();
      await tablesPage.waitForButtonEnabled();
      expect (await tablesPage.isButtonEnabled()).toBe(true);

    });

    test('should assert column sorting', async ({ page }) => {
      const tablesPage = new TablesPage(page);

      await tablesPage.navigateToWebTables();
      const columnBeforeSort = await tablesPage.getColumnValues(1);
      const expectedOrder = [...columnBeforeSort].sort();
      await tablesPage.clickColumnHeader('First Name');
      const columnAfterSort = await tablesPage.getColumnValues(1);
      expect(expectedOrder).toEqual(columnAfterSort);

    });

    test('should assert row crud', async ({ page }) => {

        const testData: TableRow = {
              firstName: 'John',
              lastName: 'Doe',
              email: 'john.doe@gmail.com',
              age: 57,
              salary: 1230000,
              department: 'Oak Ave',
        };
      
        const tablesPage = new TablesPage(page);

        await tablesPage.navigateToWebTables();
        await tablesPage.clickAddButton();
        await tablesPage.fillRowForm(testData);
        await tablesPage.submitForm();
        expect(await tablesPage.getRowData('John')).toContain('Doe');

        const editData: TableRow = {
              firstName: 'Johnny',
              lastName: 'Walker',
              email: 'johnnybegood@gmail.com',
              age: 23,
              salary: 12300,
              department: 'UA',
        };

        await tablesPage.clickEditButton(2);
        await tablesPage.fillRowForm(editData);
        await tablesPage.submitForm();
        expect(await tablesPage.getRowData('Johnny')).toContain('12300');

        await tablesPage.clickDeleteButton(2);
        const rowData = await tablesPage.getColumnValues(1);  // get all first names
        expect(rowData).not.toContain('Johnny');

    });

    test('should detect broken images', async ({ page }) => {
        const tablesPage = new TablesPage(page);

        await tablesPage.navigateToBroken();
        const brokenCount = await tablesPage.getBrokenImages();

        expect(brokenCount).toBeGreaterThan(0);  // page has broken images
    });
 
});