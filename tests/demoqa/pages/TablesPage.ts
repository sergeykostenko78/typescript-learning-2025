import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { TableRow } from '../interfaces/TableRow';

    export class TablesPage extends BasePage {
    
        private readonly enabledBtn = this.page.locator('#enableAfter');
        private readonly columnHeader = this.page.locator('.rt-th');
        private readonly columnItem = this.page.locator('.rt-td');

        private readonly addBtn = this.page.locator('#addNewRecordButton');
        private readonly inputFirstName = this.page.locator('#firstName');
        private readonly inputLastName = this.page.locator('#lastName');
        private readonly inputEmail = this.page.locator('#userEmail');
        private readonly inputAge = this.page.locator('#age');
        private readonly inputSalary = this.page.locator('#salary');
        private readonly inputDepartment = this.page.locator('#department');
        private readonly submitBtn = this.page.locator('#submit');

        constructor(page: Page) {
            super(page);
        }

        async navigateToDynamicProperties(): Promise<void> {
            await this.navigateTo('/dynamic-properties');
        }

        async waitForButtonEnabled(): Promise<void> {
            await expect(this.enabledBtn).toBeEnabled({ timeout: 10000 });
        }
        
        async isButtonEnabled(): Promise<boolean> {
            return await this.enabledBtn.isEnabled();
        }

        async navigateToWebTables(): Promise<void> {
            await this.navigateTo('/webtables');
        }

        async clickColumnHeader(columnName: string): Promise<void> {
            await this.columnHeader.filter({ hasText: columnName }).click();
        }

        async getColumnValues(columnIndex: number): Promise<string[]> {
            const cells = this.page.locator(`.rt-tbody .rt-td:nth-child(${columnIndex})`);
            return await cells.allInnerTexts();
        }

        async clickAddButton(): Promise<void> {
            await this.addBtn.click();
        }

        async fillRowForm(data: TableRow): Promise<void> {
            await this.inputFirstName.fill(data.firstName);
            await this.inputLastName.fill(data.lastName);
            await this.inputEmail.fill(data.email);
            await this.inputAge.fill(String(data.age));
            await this.inputSalary.fill(String(data.salary));
            await this.inputDepartment.fill(data.department);
        }

        async submitForm(): Promise<void> {
            await this.submitBtn.click();
        }

        async clickEditButton(rowIndex: number): Promise<void> {
            await this.page.locator(`#edit-record-${rowIndex}`).click();
        }

        async clickDeleteButton(rowIndex: number): Promise<void> {
            await this.page.locator(`#delete-record-${rowIndex}`).click();
        }

        async getRowData(firstName: string): Promise<string[]> {
            const row = this.page.locator('.rt-tr-group').filter({ hasText: firstName });
            return await row.locator('.rt-td').allInnerTexts();
        }

        async navigateToBroken(): Promise<void> {
            await this.navigateTo('/broken');
        }

        async getBrokenImages(): Promise<number> {
            const images = this.page.locator('img');
            const count = await images.count();
            let brokenCount = 0;

            for (let i = 0; i < count; i++) {
                const isBroken = await images.nth(i).evaluate((el) => {
                    return (el as HTMLImageElement).naturalWidth === 0;
                });
                if (isBroken) brokenCount++;
            }

            return brokenCount;
        }
    }