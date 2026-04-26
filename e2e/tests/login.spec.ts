import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { waitForElement } from '../utils/waitUtils';

test.describe('Login Feature', () => {
  test.describe('Positive Login Tests', () => {
    test('should login successfully with standard user @SMOKE', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');
      await waitForElement(page, '.inventory_list');
      await loginPage.assertLoginSuccess();
    });

    test('should login successfully with problem user', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login('problem_user', 'secret_sauce');
      await waitForElement(page, '.inventory_list');
      await loginPage.assertLoginSuccess();
    });

    test('should login successfully with performance glitch user', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login('performance_glitch_user', 'secret_sauce');
      await waitForElement(page, '.inventory_list');
      await loginPage.assertLoginSuccess();
    });
  });

  test.describe('Negative Login Tests - Invalid Credentials', () => {
    test('should show error with invalid username @SMOKE', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login('invalid_user', 'secret_sauce');
      await loginPage.assertErrorMessage('Epic sadface: Username and password do not match any user in this service');
    });

    test('should show error with invalid password', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login('standard_user', 'wrong_password');
      await loginPage.assertErrorMessage('Epic sadface: Username and password do not match any user in this service');
    });

    test('should show error with both username and password invalid', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login('invalid_user', 'wrong_password');
      await loginPage.assertErrorMessage('Epic sadface: Username and password do not match any user in this service');
    });

    test('should show error for locked out user', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login('locked_out_user', 'secret_sauce');
      await loginPage.assertErrorMessage('Epic sadface: Sorry, this user has been locked out.');
    });
  });

  test.describe('Negative Login Tests - Empty Fields', () => {
    test('should show error when username is empty', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.fillPassword('secret_sauce');
      await loginPage.clickLoginButton();
      await loginPage.assertErrorMessage('Epic sadface: Username is required');
    });

    test('should show error when password is empty', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.fillUsername('standard_user');
      await loginPage.clickLoginButton();
      await loginPage.assertErrorMessage('Epic sadface: Password is required');
    });

    test('should show error when both fields are empty', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.clickLoginButton();
      await loginPage.assertErrorMessage('Epic sadface: Username is required');
    });
  });

  test.describe('Login UI Tests', () => {
    test('should have login button enabled by default @SMOKE', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.assertLoginButtonEnabled();
    });

    test('should allow clearing fields after filling', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.fillUsername('standard_user');
      await loginPage.fillPassword('secret_sauce');
      await loginPage.clearFields();
      await loginPage.assertUsernameFieldEmpty();
      await loginPage.assertPasswordFieldEmpty();
    });

    test('should display error message when login fails', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login('invalid_user', 'wrong_pass');
      const isErrorVisible = await loginPage.isErrorDisplayed();
      expect(isErrorVisible).toBeTruthy();
    });
  });

  test.describe('Special Characters Tests', () => {
    test('should handle special characters in username', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login('user@#$%', 'secret_sauce');
      await loginPage.assertErrorMessage('Epic sadface: Username and password do not match any user in this service');
    });

    test('should handle special characters in password', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login('standard_user', 'pass@#$%');
      await loginPage.assertErrorMessage('Epic sadface: Username and password do not match any user in this service');
    });
  });
});
