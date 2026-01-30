const { test, expect, beforeEach, afterEach, describe } = require('@playwright/test');

describe('More validations', () => {

    beforeEach(async ({ page }) => {
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    });

    test('Dialog test', async ({ page }) => {
        await expect(page.locator('#displayed-text')).toBeVisible();
        await page.locator('#hide-textbox').click();
        await expect(page.locator('#displayed-text')).toBeHidden();
        await page.pause();
        page.on('dialog', dialog => dialog.accept());
    });

    test('', async () => {

    });
});