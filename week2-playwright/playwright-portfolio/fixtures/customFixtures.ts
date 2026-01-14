import { test as base } from '@playwright/test';
  import { JobSearchPage } from '../pages/JobSearchPage';

  // Extend base test with custom fixture
  export const test = base.extend<{ jobSearchPage: JobSearchPage }>({
    jobSearchPage: async ({ page }, use) => {
      // SETUP: Create and navigate
      const jobSearchPage = new JobSearchPage(page);
      await jobSearchPage.navigate();

      // PROVIDE to test
      await use(jobSearchPage);

      // TEARDOWN: (cleanup if needed - we don't need any here)
    },
  });

  export { expect } from '@playwright/test';