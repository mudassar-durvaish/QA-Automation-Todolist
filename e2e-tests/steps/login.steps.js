const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('the user navigates to the login page', async function () {
  await this.page.goto('http://localhost:5173/login');
});

When('the user enters the email {string}', async function (email) {
  await this.page.fill('[data-testid="login-email-input"]', email);
});

When('the user enters the password {string}', async function (password) {
  await this.page.fill('[data-testid="login-password-input"]', password);
});

When('the user checks the agreement checkbox', async function () {
  // If the checkbox needs to be specifically handled by label click or native check:
  await this.page.check('[data-testid="login-agree-checkbox"]');
});

When('the user clicks the Sign in button', async function () {
  // Wait for the API network call to finish AND the click
  const [response] = await Promise.all([
    this.page.waitForResponse(res => res.url().includes('/api/auth/login') && res.status() === 200),
    this.page.click('[data-testid="login-submit-btn"]')
  ]);
  
  // Extra layer of QA assertion to ensure the token actually returned!
  const body = await response.json();
  expect(body.token).toBeTruthy();
});

Then('the system should process the login and redirect to the dashboard', async function () {
  await this.page.waitForURL('**/dashboard');
  
  // Verify dashboard actually loaded the UI
  const title = this.page.locator('[data-testid="dashboard-title"]');
  await expect(title).toBeVisible();
});