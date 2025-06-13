// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { testData } from '../data/testData.js';

test.describe('Login Scenarios', () => {
  test('Valid login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const loginSuccess = await loginPage.login(testData.validUser.username, testData.validUser.password);
    expect(loginSuccess).toBe(true);
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('Invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const loginSuccess = await loginPage.login(testData.validUser.username, 'wrong_password');
    expect(loginSuccess).toBe(false);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
  });

  test('Invalid username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const loginSuccess = await loginPage.login('wrong_username', testData.validUser.password);
    expect(loginSuccess).toBe(false);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
  });

  test('Locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const loginSuccess = await loginPage.login(testData.lockedUser.username, testData.lockedUser.password);
    expect(loginSuccess).toBe(false);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('locked out');
  });
});
