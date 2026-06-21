const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('the user is authenticated and on the dashboard', async function () {
  await this.page.goto('http://localhost:5173/login');
  await this.page.fill('[data-testid="login-email-input"]', 'test_qa@example.com');
  await this.page.fill('[data-testid="login-password-input"]', 'Systems123!');
  await this.page.check('[data-testid="login-agree-checkbox"]');
  
  await Promise.all([
    this.page.waitForResponse(res => res.url().includes('/api/auth/login') && res.status() === 200),
    this.page.click('[data-testid="login-submit-btn"]')
  ]);

  await this.page.waitForURL('**/dashboard');
  
  // Important Wait: Wait for initial active tasks to be fetched from DB!
  await this.page.waitForResponse(res => res.url().includes('/api/tasks') && res.request().method() === 'GET');
});

When('the user types {string} into the new task input', async function (taskName) {
  await this.page.fill('[data-testid="new-task-input"]', taskName);
});

When('the user clicks the Add task button', async function () {
  await Promise.all([
    this.page.waitForResponse(res => res.url().includes('/api/tasks') && res.request().method() === 'POST' && res.status() === 200),
    this.page.click('[data-testid="add-task-submit-btn"]')
  ]);
});

Then('the task {string} should appear in the task list', async function (taskName) {
  const taskLocator = this.page.locator(`text="${taskName}"`);
  await expect(taskLocator).toBeVisible();
});

Given('the user has an existing task {string}', async function (taskName) {
  await this.page.fill('[data-testid="new-task-input"]', taskName);
  
  const [response] = await Promise.all([
    this.page.waitForResponse(res => res.url().includes('/api/tasks') && res.request().method() === 'POST'),
    this.page.click('[data-testid="add-task-submit-btn"]')
  ]);
  
  const responseData = await response.json();
  this.taskIdToDelete = responseData._id; 
});

When('the user clicks the delete button for {string}', async function (taskName) {
  await Promise.all([
    this.page.waitForResponse(res => res.url().includes(`/api/tasks/${this.taskIdToDelete}`) && res.request().method() === 'DELETE' && res.status() === 200),
    this.page.click(`[data-testid="delete-task-btn-${this.taskIdToDelete}"]`)
  ]);
});

Then('the task {string} should be removed from the list', async function (taskName) {
  const taskLocator = this.page.locator(`text="${taskName}"`);
  await expect(taskLocator).toHaveCount(0); 
});