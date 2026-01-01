import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('🔍 Navigating to DOU.ua...');
  await page.goto('https://dou.ua');

  // Wait a bit for the page to load
  await page.waitForLoadState('networkidle');

  console.log('\n📋 Checking for navigation elements:');

  // Check for nav element
  const navCount = await page.locator('nav').count();
  console.log(`- <nav> elements found: ${navCount}`);

  // Check for header
  const headerCount = await page.locator('header').count();
  console.log(`- <header> elements found: ${headerCount}`);

  // Check for common navigation classes/IDs
  const commonSelectors = [
    '.header',
    '.navigation',
    '.menu',
    '.nav',
    '#header',
    '#navigation',
    '[class*="nav"]',
    '[class*="header"]',
    '[role="navigation"]'
  ];

  console.log('\n🔎 Checking common navigation selectors:');
  for (const selector of commonSelectors) {
    try {
      const count = await page.locator(selector).count();
      if (count > 0) {
        console.log(`✅ Found ${count} element(s) with: ${selector}`);

        // Get more details about the first matching element
        const element = page.locator(selector).first();
        const tagName = await element.evaluate(el => el.tagName.toLowerCase());
        const className = await element.evaluate(el => el.className);
        const id = await element.evaluate(el => el.id);

        console.log(`   Tag: <${tagName}>, Class: "${className}", ID: "${id}"`);
      }
    } catch (e) {
      // Skip invalid selectors
    }
  }

  // Get the page structure
  console.log('\n🌳 Top-level body children:');
  const bodyChildren = await page.evaluate(() => {
    const children = Array.from(document.body.children);
    return children.map(el => ({
      tag: el.tagName.toLowerCase(),
      id: el.id,
      className: el.className,
      text: el.textContent?.substring(0, 50) || ''
    }));
  });

  bodyChildren.forEach(child => {
    console.log(`- <${child.tag}> ${child.id ? `id="${child.id}"` : ''} ${child.className ? `class="${child.className}"` : ''}`);
  });

  console.log('\n⏸️  Browser will stay open for 30 seconds for manual inspection...');
  await page.waitForTimeout(30000);

  await browser.close();
})();
