import { test, expect } from '@playwright/test';

const linkedinUrl = 'https://www.linkedin.com';

function getHttpLinks(page: import('@playwright/test').Page) {
  return page.locator('a[href]').evaluateAll((anchors, baseUrl) => {
    const urls = new Set<string>();

    for (const anchor of anchors) {
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        continue;
      }

      try {
        const url = new URL(href, baseUrl);
        if (url.protocol === 'http:' || url.protocol === 'https:') {
          urls.add(url.href);
        }
      } catch {
        continue;
      }
    }

    return [...urls];
  }, linkedinUrl);
}

test('LinkedIn homepage loads successfully', async ({ page }) => {
  await page.goto(linkedinUrl, { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle(/LinkedIn/i);
  await expect(page.locator('body')).toBeVisible();
});

test('All LinkedIn homepage links return successful responses', async ({ page }) => {
  await page.goto(linkedinUrl, { waitUntil: 'domcontentloaded' });
  await expect(page.locator('body')).toBeVisible();

  const links = await getHttpLinks(page);
  expect(links.length).toBeGreaterThan(0);

  const brokenLinks: string[] = [];
  for (const link of links) {
    try {
      const response = await page.request.get(link, { timeout: 15000, failOnStatusCode: false });
      if (response.status() >= 400) {
        brokenLinks.push(`${response.status()} ${link}`);
      }
    } catch (error) {
      brokenLinks.push(`${(error as Error).message} ${link}`);
    }
  }

  expect(brokenLinks, `Broken LinkedIn links:\n${brokenLinks.join('\n')}`).toEqual([]);
});
