import { test, expect } from '@playwright/test';

test.describe('Jobs Page Tests - DOU.ua', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://jobs.dou.ua/vacancies/');
    });

  test('should display total jobs count', async ({ page }) => {
    // Find the h1 heading
    const heading = page.getByRole('heading', { level: 1 });

    // Verify it contains a number and "вакансій"
    await expect(heading).toContainText(/\d+\s+вакансі[йї]/);
  });


  test('should display vacancy with all required fields', async ({ page }) => {
    // Step 1: Find the first vacancy (use specific class to avoid filter list items)
    const firstVacancy = page.locator('.l-vacancy').first();

    // Step 2: Verify it's visible
    await expect(firstVacancy).toBeVisible();

    // Step 3: Within that vacancy, verify title exists
    // Hint: Use .locator() on the firstVacancy
    const titleLink = firstVacancy.locator('a.vt');
    await expect(titleLink).toBeVisible();

    // Step 4: Verify location exists
    const location = firstVacancy.locator('.cities');
    await expect(location).toBeVisible();

    // Step 5: Verify description exists
    const description = firstVacancy.locator('.sh-info');
    await expect(description).toBeVisible();
  });


  test('should filter jobs by city', async ({ page }) => {
    // Step 1: Get initial job count
    const heading = page.getByRole('heading', {level: 1});
    const initialText = await heading.textContent();

    // Step 2: Click "Львів" filter
    // HINT: It's a link with text "Львів"
    await page.getByRole('link', {name: 'Львів'}).click();

    // Step 3: Verify URL changed
    await expect(page).toHaveURL(/city=/);

    // Step 4: Verify heading changed (different job count)
    const newText = await page.getByRole('heading', { level: 1 }).textContent();
    expect(newText).not.toBe(initialText);
  });


  test('should open vacancy detail page when clicked', async ({ page }) => {
    // Step 1: Find first vacancy
    const firstVacancy = page.locator('.l-vacancy').first();

    // Step 2: Find the title link within it (class="vt")
    const titleLink = firstVacancy.locator('a.vt');

    // Step 3: Click the title link
    await titleLink.click();

    // Step 4: Verify URL changed to a detail page
    // HINT: Detail URLs look like "/vacancies/335909/"
    await expect(page).toHaveURL(/\/vacancies\/\d+/);

    // BONUS Step 5: Verify detail page has content
    // Check if page has a heading (job title on detail page)
    const heading = page.getByRole('heading');
    await expect(heading.first()).toBeVisible();
  });

});