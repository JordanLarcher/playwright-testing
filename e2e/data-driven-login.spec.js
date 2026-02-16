import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import { loginTestData } from '../fixtures/loginData.js';

loginTestData.forEach(({ username, password, expectedSuccess, expectedError, expectedUrlPattern }) => {
  test(`Login with ${username || 'empty username'} - ${expectedSuccess ? 'should succeed' : 'should fail'}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(username, password);
    
    if (expectedSuccess) {
      // Wait a bit for the page to load after successful login
      await page.waitForTimeout(2000);
      // Check if we're redirected to the expected URL pattern
      if (expectedUrlPattern) {
        expect(page.url()).toContain(expectedUrlPattern);
      } else {
        expect(page.url()).not.toContain('loginpagePractise');
      }
    } else {
      // For failed login, check for error message or stay on login page
      const error = await loginPage.getErrorMessage();
      if (expectedError) {
        expect(error?.toLowerCase()).toContain(expectedError.toLowerCase().split('.')[0]);
      }
      // Should still be on login page for failed attempts
      expect(page.url()).toContain('loginpagePractise');
    }
  });
});