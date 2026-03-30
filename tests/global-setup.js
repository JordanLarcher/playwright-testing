const { chromium } = require('@playwright/test');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '.env') });

module.exports = async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill(process.env.USER_EMAIL);
    await page.locator('#userPassword').fill(process.env.USER_PASS);
    await page.locator('#login').click();
    await page.locator('.card-body b').first().waitFor();

    // save the auth state once
    await page.context().storageState({ path: 'tests/.auth/user.json' });
    await browser.close();
    
}