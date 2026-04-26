import { Page } from '@playwright/test';

export async function waitForElement(page: Page, selector: string, timeout = 5000) {
  try {
    await page.waitForSelector(selector, { timeout });
  } catch (error) {
    throw new Error(`Element ${selector} not found within ${timeout}ms`);
  }
}

export async function waitForUrl(page: Page, urlPart: string, timeout = 5000) {
  try {
    await page.waitForURL(`**${urlPart}**`, { timeout });
  } catch (error) {
    throw new Error(`URL containing ${urlPart} not loaded within ${timeout}ms`);
  }
}
