import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

  export class JobSearchPage extends BasePage {
    // LOCATORS (private - implementation details)
    private readonly heading: Locator;
    private readonly jobListings: Locator;

    constructor(page: Page) {
      super(page, 'https://jobs.dou.ua/vacancies/');  // ← Calls BasePage constructor

      // Initialize locators
      this.heading = this.page.getByRole('heading', { level: 1 });
      this.jobListings = this.page.locator('.l-vacancy');
    }

    // PUBLIC METHODS (what tests use)
    async getJobCount(): Promise<number> {
      return await this.jobListings.count();
    }

    async filterByCity(city: string): Promise<void> {
      await this.page.getByRole('link', { name: city }).click();
    }

    async getHeadingText(): Promise<string | null> {
      return await this.heading.textContent();
    }

    //1. Get First Vacancy Locator
    getFirstVacancy(): Locator {
    return this.jobListings.first();
    }

    //2. Click First Vacancy Title
    async clickFirstVacancyTitle(): Promise<void> {
        const firstVacancy = this.getFirstVacancy();
        const titleLink = firstVacancy.locator('a.vt');
        await titleLink.click();
    }

    //3. Verify First Vacancy Has Fields

  async verifyFirstVacancyFields(): Promise<boolean> {
    const firstVacancy = this.getFirstVacancy();

    const title = firstVacancy.locator('a.vt');
    const location = firstVacancy.locator('.cities');
    const description = firstVacancy.locator('.sh-info');

    // Check all are visible
    const titleVisible = await title.isVisible();
    const locationVisible = await location.isVisible();
    const descriptionVisible = await description.isVisible();

    return titleVisible && locationVisible && descriptionVisible;
  }

   async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  }