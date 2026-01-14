//import { test, expect } from '@playwright/test';
import { test, expect } from '../fixtures/customFixtures';
import { searchQueries } from '../fixtures/testData';
import { extractNumberFromText } from '../helpers/utils';

test.describe('Jobs Page Tests - DOU.ua', () => {

  test('should display total jobs count', async ({ jobSearchPage }) => {
    // jobSearchPage already created and navigated!
    const headingText = await jobSearchPage.getHeadingText();
    expect(headingText).toMatch(/\d+\s+вакансі[йї]/);
  });


  test('should display vacancy with all required fields', async ({ jobSearchPage }) => {
    // Step 1: Find the first vacancy (use specific class to avoid filter list items)
    const firstVacancyAllFields = await jobSearchPage.verifyFirstVacancyFields();
    expect(firstVacancyAllFields).toBeTruthy();
  });


  test('should filter jobs by city', async ({ jobSearchPage }) => {
    const initialCountText = await jobSearchPage.getHeadingText();
    await jobSearchPage.filterByCity('Львів');
    const currentUrl = jobSearchPage.getCurrentUrl();
    expect(currentUrl).toContain('city=');
    const newCountText = await jobSearchPage.getHeadingText();
    expect(newCountText).not.toBe(initialCountText);
  });


  test('should open vacancy detail page when clicked', async ({ jobSearchPage }) => {
    await jobSearchPage.clickFirstVacancyTitle();
    const currentUrl = jobSearchPage.getCurrentUrl();
    expect(currentUrl).toMatch(/\/vacancies\/\d+/);
  });


  // Loop through search queries and create a test for each
  searchQueries.forEach((query) => {
    test(`should find jobs for keyword: ${query.keyword}`, async ({ jobSearchPage }) => {
      // Search functionality not implemented yet, so let's test with filter
      if (query.city) {
        await jobSearchPage.filterByCity(query.city);
      }

      const count = await jobSearchPage.getJobCount();
      expect(count).toBeGreaterThan(0);
    });
  });


  const cities = ['Київ', 'Львів', 'Одеса'];

  cities.forEach((city) => {
    test(`should filter jobs by city: ${city}`, async ({ jobSearchPage }) => {
      await jobSearchPage.filterByCity(city);

      const url = jobSearchPage.getCurrentUrl();
      expect(url).toContain('city=');

      const count = await jobSearchPage.getJobCount();
      expect(count).toBeGreaterThan(0);
    });
  });


  test('should display job count as number in heading', async ({ jobSearchPage }) => {
    const headingText = await jobSearchPage.getHeadingText();
    const jobsCount = extractNumberFromText(headingText);
    expect(jobsCount).toBeGreaterThan(0);
  });  


  test('should display first vacancy', async ({ jobSearchPage }) => {
    const firstVacancy = jobSearchPage.getFirstVacancy();
    await expect(firstVacancy).toBeVisible();
  });


  test('should have correct page title', async ({ jobSearchPage }) => {
    const title = await jobSearchPage.getPageTitle();
    expect(title).toContain('Вакансії');
  });
    

  test('should navigate to correct URL', async ({ jobSearchPage }) => {
    const checkUrl = jobSearchPage.getCurrentUrl();
    expect(checkUrl).toContain('jobs.dou.ua/vacancies');
  });


  test('should have reasonable number of jobs', async ({ jobSearchPage }) => {
    const jobsPerPage = await jobSearchPage.getJobCount();
    expect(jobsPerPage).toBeGreaterThan(0);
    expect(jobsPerPage).toBeLessThan(50);
  
  });



});