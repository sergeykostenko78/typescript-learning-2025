# ANALYZE THE PROJECT STRUCTURE

## SECTION 1: Architecture

- What is the role of src/pageFixture.ts? How does it differ from POM?
the role of `src/pageFixture.ts` is a bit unusual in this project since it doesn't contain
fixture itself in a classical sense like auth handling fixture or api calls fixture
the pageFixture contains in fact one meaningful line `page: undefined as Page`
which means as far as I understood a type casting when variable is empty right now but will be used as PW Page object.
Plus the project doesn't have POM pages which provide selectors and common methods in classical PW projects.
- What do src/hooks/hooks.ts do? (Before/After hooks?)
This file sets up Cucumber/Playwright lifecycle hooks for the test suite. Before each scenario it launches a browser
  context (desktop or mobile based on tags), injects a dataLayer interceptor to capture analytics events pushed during
  the test, and logs each step's pass/fail status to stdout. After each scenario it takes a screenshot and attaches a
  video recording to Allure if the test failed, then cleans up the page and context.

- How is test data organized? (look at test_data/ folder structure)
Naming: directories use snake_case or camelCase matching the feature (e.g. breedPage/, in_page_navigation/,
  structuredData/)
  - Multi-locale structure: most JSON files use locale codes (us, fr, de, nl, uk, it, se) as top-level keys, so the same
   file serves all regions
  - Content types: UI params, analytics events (Algolia), SEO/structured data schemas, cookie banners, navigation,
  footer content, search results, breed/product data
  - 56 JSON files total — the heaviest areas are footer/ (5 files) and structuredData/ (4 files)

- What pattern do they use for page elements? (not POM — what then?)
They use a Selector Object pattern — plain TypeScript objects (and occasionally enums) that hold only CSS selectors,
  with no methods or page interaction logic.
  All selectors live in src/test/elements/ (33 files), exported and imported directly into step files. The actual
  Playwright interactions (locator(), click(), expect()) happen in the step definitions, not alongside the selectors.

## SECTION 2: Cucumber/BDD

- Open cucumber.js — what does it configure?
It configures the Cucumber test runner:
  - Feature files: scans src/test/features/**/*.feature
  - Step/hook loading: requires all step files, pages, hooks.ts, and playwright.config.ts at runtime via
  ts-node/register
  - Tag filtering: runs only scenarios matching TAGS env var (e.g. TAGS=@smoke)
  - Parallelism: number of workers controlled by PARALLEL env var (defaults to 1)
  - Output formats: JUnit XML, HTML report, JSON report (both browser-namespaced via BROWSER env var), Allure reporter,
  and a console summary
  - Snippets: async/await style for any auto-generated step stubs
  - dryRun: false — tests actually execute

- Find a .feature file — read the Gherkin syntax (Given/When/Then)
Given Sets up initial state, When Performs an action, Then Asserts an outcome, And Continues the previous keyword's role

- Find the corresponding step definitions — how do steps map to code?
Cucumber scans all files in src/test/steps/*.ts at startup and builds a global registry of step strings. When a
  scenario runs, each Gherkin line is matched against that registry by exact text (or regex). There's no explicit
  linking between a .feature file and a specific steps file — any step registered anywhere is available to any feature.

- How does Cucumber connect to Playwright? (through hooks? fixtures?)
Cucumber itself has no Playwright knowledge — it just runs async functions. The pageFixture singleton is the only
  connection point: hooks write to it, steps read from it.

## SECTION 3: Scripts

- What does scripts/collect_urls_from_sitemap.js do?
Its practical purpose is to generate a full list of live site URLs — likely used as input for crawling, smoke-testing
  coverage checks, or feeding into other test scripts.

- What does scripts/run-tests.ts do? Why not just `npx playwright test`?
It's a thin wrapper around cucumber-js that adds two things npx cucumber-js alone doesn't handle:

  1. Ensures test-results/ exists before running — the reporters (JUnit XML, HTML, JSON) write there and would fail if
  the directory is missing
  2. Separates test failure from report generation — if cucumber-js exits with a non-zero code (tests failed), a plain
  shell invocation would stop immediately. This script catches that, lets reporting finish, and only then fails the
  process — but only in CI (process.env.CI). Locally, it exits 0 even on failures so you can still open the report.

  Why not npx playwright test? — this project doesn't use Playwright's test runner at all. The runner is Cucumber
  (cucumber-js); Playwright is used purely as a browser automation library inside Cucumber step definitions. npx
  playwright test would look for *.spec.ts files and find nothing.

- What does scripts/open-report.ts do?
 Opens the Cucumber HTML report in the default browser after a test run. It:

  1. Resolves the report path to test-results/<BROWSER>/cucumber-report.html
  2. Exits cleanly (no error) if the report doesn't exist yet
  3. Opens it using the OS-appropriate command — start on Windows, open on macOS, xdg-open on Linux
  4. Falls back to printing the path manually if the auto-open fails

## SECTION 4: CI/CD Pipelines

- What triggers the basic pipeline?
it is never triggered automatically. It's a manually dispatched Azure DevOps pipeline only.

- What Node.js version do they use?
according to official documentation, the Playwright Docker image in azure-pipelines-basic.yml: playwright:v1.57.0-jammy bundles
  Node 20

- How do they install Playwright browsers in CI?
They don't install browsers — they sidestep the problem entirely by running inside the official Microsoft Playwright
  Docker image, which has browsers pre-installed

- How does the Allure pipeline differ from basic?
Both pipelines run the same tests in the same Playwright Docker image, but differ in reporting. The basic pipeline is
  a single job that publishes a Cucumber HTML report and JUnit XML, failing the task if tests fail. The Allure pipeline
  splits into two jobs — the first runs tests and uploads raw allure-results as an artifact, the second picks that up in
   a dedicated allure-docker-service container and generates the Allure report — with no explicit fail-on-test-failure
  and a missing HEADLESS parameter compared to basic.

- What schedule does the scheduled pipeline use? (cron syntax)
The schedule
   is not defined in code; it's configured directly in the Azure DevOps UI (Pipelines → Edit → Triggers). The file only
  defines what to run, not when.

- How do test results get published/visible?
  Cucumber HTML report (azure-pipelines-basic.yml)
  Generated at test-results/<BROWSER>/cucumber-report.html, published via the PublishHtmlReport task — visible as a tab
  on the pipeline run page in Azure DevOps.

  JUnit XML (azure-pipelines-basic.yml, azure-pipelines-scheduled.yml)
  Written to test-results/junit-report.xml by cucumber-js, published via PublishTestResults@2 — visible in the Tests tab
  of the pipeline run, with per-test pass/fail breakdown.

  Allure report (azure-pipelines.yml, azure-pipelines-allure.yml, azure-pipelines-scheduled.yml)
  - Test job writes artifacts to allure-results/ (screenshots, videos, raw JSON)
  - Published as a pipeline artifact
  - Second job (generate_report) downloads it, runs frankescobar/allure-docker-service, and publishes via
  PublishAllureReport@1 — visible as a separate Allure tab
