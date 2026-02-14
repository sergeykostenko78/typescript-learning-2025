import { test, expect } from '../fixtures/visualTestFixture';

test.describe('visual comparison', () => {

    test('should match homepage visual baseline', async ({ page, visual }) => {
        await page.goto('https://demoqa.com');
        await visual.compareFullPage('homepage.png');
    });

    test('should match form page visual baseline', async ({ page, visual }) => {
        await page.goto('https://demoqa.com/text-box');
        await visual.compareElement(page.locator('#userForm'), 'textbox-form.png');
    });

});
