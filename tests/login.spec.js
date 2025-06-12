// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import users from '../data/users.json' assert { type: 'json' };

test.describe('Login Scenarios', () => {
  const assertLoginFailure = async (page) => {
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Username and password do not match');
  };

  test('Valid login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.valid.username, users.valid.password);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('Invalid password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.invalidPassword.username, users.invalidPassword.password);

    await assertLoginFailure(page);
  });

  test('Invalid username', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.invalidUsername.username, users.invalidUsername.password);

    await assertLoginFailure(page);
  });
});
