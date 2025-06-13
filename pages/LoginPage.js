export class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('#user-name');
    this.password = page.locator('#password');
    this.loginBtn = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async login(user, pass) {
    await this.goto();
    
    // Wait for elements to be visible
    await this.username.waitFor({ state: 'visible', timeout: 10000 });
    await this.password.waitFor({ state: 'visible', timeout: 10000 });
    await this.loginBtn.waitFor({ state: 'visible', timeout: 10000 });

    // Fill in credentials
    await this.username.fill(user);
    await this.password.fill(pass);
    
    // Click login button
    await this.loginBtn.click();

    try {
      // Try to wait for inventory page (successful login)
      await this.page.waitForURL('**/inventory.html', { timeout: 5000 });
      await this.page.waitForLoadState('domcontentloaded');
      return true;
    } catch (error) {
      // If timeout, we're still on login page (failed login)
      await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
      return false;
    }
  }

  async getErrorMessage() {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 10000 });
    return this.errorMessage.textContent();
  }
}
