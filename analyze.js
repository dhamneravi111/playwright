const { chromium } = require('playwright');

async function analyzePage() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.yahoo.com');

  // Get page title
  const title = await page.title();
  console.log('Page Title:', title);

  // Get all links
  const links = await page.locator('a').count();
  console.log('Number of links:', links);

  // Get all buttons
  const buttons = await page.locator('button').count();
  console.log('Number of buttons:', buttons);

  // Get all inputs
  const inputs = await page.locator('input').count();
  console.log('Number of inputs:', inputs);

  // Get forms
  const forms = await page.locator('form').count();
  console.log('Number of forms:', forms);

  // Get navigation elements (assuming nav tag or common classes)
  const navElements = await page.locator('nav').count();
  console.log('Number of nav elements:', navElements);

  // Get search box (common on yahoo)
  const searchBox = page.locator('input[name="p"]');
  const searchVisible = await searchBox.isVisible();
  console.log('Search box visible:', searchVisible);

  // Get some dynamic content - headlines
  const headlines = await page.locator('h1, h2, h3').count();
  console.log('Number of headlines:', headlines);

  await browser.close();
}

analyzePage();