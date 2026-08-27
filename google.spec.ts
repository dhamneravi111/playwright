import { test, expect } from '@playwright/test';

test('should open Google homepage', async ({ page }) => {
  // Navigate to Google
  await page.goto('https://www.google.com');
  
  // Verify page title contains 'Google'
  await expect(page).toHaveTitle(/Google/);
  
  // Verify search box is visible
  const searchBox = page.locator('input[name="q"]');
  await expect(searchBox).toBeVisible();
});
