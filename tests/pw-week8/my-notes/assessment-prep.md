# check

QUESTION 1: "What is Page Object Model and why do you use it?"
  Your answer: POM is one of the architectural approaches to create PW tests.
    POM generally consists of page target class which includes selectors definition and methods that can be used
    on this page. This approach allows to separate test logic from page structure.
    If a selector changes, you fix it in one place — the page object — not in every test that uses it.

QUESTION 2: "What are fixtures in Playwright and how do they differ from
  beforeEach/afterEach?"
  Your answer: fixtures are 'a package of functionality' which commonly covers one specific flow, e.g. authFixture, apiMockFixture. Plus fixture has teardown mechanism which means when test is finished a fixture stops executing.
  beforeEach/afterEach they are hooks that are declared with actions will be done before/after each test.
  On contrary with this approach, fixture is executed only if it is called in test.

QUESTION 3: "How do you handle test data in your framework?"
  Your answer: i used data-driven approach in my learnig project which means the following
  
  1. test data are set in .json files as [] of objects
  2. i declare interfaces in ts file to set explicitly types of further used test data
  3. finally tests themselves, JSON is cast to the interface type, giving full autocomplete and type safety. The loop then iterates over typed objects — e.g. checking login state per user or verifying product prices.

QUESTION 4: "How do you run tests in CI/CD?"
  Pipelines are triggered manually in Azure DevOps.
  Both pipelines in my project run the same tests in the same Playwright Docker image, but differ in reporting. The basic pipeline is a single job that publishes a Cucumber HTML report and JUnit XML, failing the task if tests fail. The Allure pipeline splits into two jobs — the first runs tests and uploads raw allure-results as an artifact, the second picks that up in
   a dedicated allure-docker-service container and generates the Allure report — with no explicit fail-on-test-failure
  and a missing HEADLESS parameter compared to basic.

QUESTION 5: "What's the difference between parallel and serial execution?
  When would you use each?"
  Your answer: Parallel — tests run at the same time across multiple workers. Each test gets its own browser context, no shared state. Faster execution.
  Serial — tests run one by one in strict order within a describe block. If one fails, the rest are skipped. Use it when tests depend on each other's outcome.
  i use parallel execution by default and serial in specifica cases where it is really necessary.

QUESTION 6: "How do you handle flaky tests?"
  Your answer: several ways to handle it in complex

  1. triage - check run info, errors, screen shots to allocate a failed piece of code;
  2. investigation, fix, rerun - check data from #1 and make proper code changes if needed, rerun test several times 
  to make sure it becomes stable. In rare case of infra specific instability - to add 2 tries in pileline, 0 on local;
  3. prevention - stick to common rules - no shared states between tests, independent runs, serial run only if needed.

QUESTION 7: "What TypeScript features do you use in test automation?"
  Your answer: the commonly used ts features are the following:
    - interfaces to set data shape;
    - types to handle primitives, unions, aliases;
    - generics to work properly with data types;
    - enums to store and call more usefully similar data;
    - async/await are used by default since each pw interaction is async and we need to use await to pause
    test execution to wait until promise resolves.

QUESTION 8: "What is API testing and how do you do it in Playwright?"
  Your answer: API tests use Playwright's request context — no browser, no UI, just HTTP calls.
  I test CRUD operations (create, read, update, delete), validate response status codes and body structure, test error scenarios (404, 401, 422), and verify data consistency (create then read should match).

QUESTION 9: "How do you manage different test environments?"
  Your answer: i use .env files per environment: .env.stg for staging, .env.prod for production. Each file defines BASE_URL, API endpoints, and credentials for that environment.
Playwright config loads the appropriate .env file using dotenv. The baseURL and other settings come from process.env variables, so the same test code runs against any environment without code changes.

QUESTION 10: "What test reporting tools have you used?"
  Your answer: I use both reporters which are available for me: Playwright HTML for daily development and debugging individual failures (on my local). Allure for team-level visibility, sprint reporting, and tracking suite health over time.
  Allure report is generated as build artefacts after each run in pipeline.
