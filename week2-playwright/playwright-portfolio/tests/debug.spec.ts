import { test } from '@playwright/test';

test('Debug - Find navigation selectors', async ({ page }) => {
  await page.goto('https://jobs.dou.ua/vacancies/');
  await page.waitForTimeout(2000); // Wait 2 seconds for page to settle

  console.log('\n🔍 Inspecting DOU.ua navigation elements:\n');

  // Check for nav elements
  const navCount = await page.locator('nav').count();
  console.log(`📊 <nav> elements found: ${navCount}`);

  // Check for header
  const headerCount = await page.locator('header').count();
  console.log(`📊 <header> elements found: ${headerCount}`);

  if (headerCount > 0) {
    const header = page.locator('header').first();
    const isVisible = await header.isVisible();
    const innerText = await header.innerText();
    console.log(`   Header visible: ${isVisible}`);
    console.log(`   Header text (first 100 chars): ${innerText.substring(0, 100).replace(/\n/g, ' ')}`);
  }

  // Check common selectors
  const selectors = [
    '.header',
    '.navigation',
    '.menu',
    '[role="navigation"]',
    '[class*="nav"]',
    '[id*="nav"]'
  ];

  console.log('\n🔎 Checking common selectors:');
  for (const selector of selectors) {
    const count = await page.locator(selector).count();
    if (count > 0) {
      console.log(`✅ "${selector}" - Found ${count} element(s)`);

      // Get details of first match
      try {
        const first = page.locator(selector).first();
        const isVisible = await first.isVisible();
        console.log(`   Visible: ${isVisible}`);
      } catch (e) {
        // Skip if error
      }
    }
  }

  // Get page structure
  console.log('\n🌳 Body structure (first 5 children):');
  const structure = await page.evaluate(() => {
    const children = Array.from(document.body.children).slice(0, 10);
    return children.map(el => {
      const tag = el.tagName.toLowerCase();
      const id = el.id ? `#${el.id}` : '';
      const classes = el.className ? `.${el.className.split(' ').join('.')}` : '';
      return `<${tag}>${id}${classes}`;
    });
  });

  structure.forEach(el => console.log(`  ${el}`));

  // Screenshot for reference
  await page.screenshot({ path: 'debug-screenshot.png', fullPage: true });
  console.log('\n📸 Full page screenshot saved as: debug-screenshot.png');
});
