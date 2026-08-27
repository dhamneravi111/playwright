import { Page } from '@playwright/test';

export class YahooPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToYahoo() {
    await this.page.goto('https://www.yahoo.com');
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async isSearchBoxVisible() {
    const searchBox = this.page.locator('input[name="p"]');
    return await searchBox.isVisible();
  }
}