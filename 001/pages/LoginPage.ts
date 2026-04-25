import { expect, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  
  // Locators
  private usernameInput = '#user-name';
  private passwordInput = '#password';
  private loginButton = '#login-button';
  private errorMessage = '[data-test="error"]';
  private inventoryList = '.inventory_list';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async fillUsername(username: string) {
    await this.page.fill(this.usernameInput, username);
  }

  async fillPassword(password: string) {
    await this.page.fill(this.passwordInput, password);
  }

  async clickLoginButton() {
    await this.page.click(this.loginButton);
  }

  async clearFields() {
    await this.page.fill(this.usernameInput, '');
    await this.page.fill(this.passwordInput, '');
  }

  async assertLoginSuccess() {
    await expect(this.page.locator(this.inventoryList)).toBeVisible();
  }

  async assertErrorMessage(expectedMessage: string) {
    const errorElement = this.page.locator(this.errorMessage);
    await expect(errorElement).toBeVisible();
    await expect(errorElement).toContainText(expectedMessage);
  }

  async getErrorMessage(): Promise<string> {
    return await this.page.locator(this.errorMessage).textContent() || '';
  }

  async isErrorDisplayed(): Promise<boolean> {
    return await this.page.locator(this.errorMessage).isVisible();
  }

  async assertLoginButtonEnabled() {
    await expect(this.page.locator(this.loginButton)).toBeEnabled();
  }

  async assertUsernameFieldEmpty() {
    await expect(this.page.locator(this.usernameInput)).toBeEmpty();
  }

  async assertPasswordFieldEmpty() {
    await expect(this.page.locator(this.passwordInput)).toBeEmpty();
  }
}
