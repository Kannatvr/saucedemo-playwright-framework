// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { testData } from '../data/testData.js';

test.describe('Login Scenarios', () => {
  
  test('Login with Valid Credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const loginSuccess = await loginPage.login(testData.validUser.username, testData.validUser.password);
    expect(loginSuccess).toBe(true);
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('Login with Invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const loginSuccess = await loginPage.login(testData.invalidUser.username, testData.invalidUser.password);
    expect(loginSuccess).toBe(false);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
  });

 
});
