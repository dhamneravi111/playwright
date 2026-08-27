import { test, expect } from '@playwright/test';
import { YahooPage } from '../pages/yahooPage';

test('should open Yahoo homepage', async ({ page }) => {
  const yahooPage = new YahooPage(page);

  // Navigate to Yahoo
  await yahooPage.navigateToYahoo();

  // Verify page title contains 'Yahoo'
  const title = await yahooPage.getPageTitle();
  expect(title).toContain('Yahoo');

  // Verify search box is visible
  const isVisible = await yahooPage.isSearchBoxVisible();
  expect(isVisible).toBe(true);
});