const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');


test('Browser Context-Validating Error Login', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('rahulshettyacademy', 'asdasd');

    const errorMessage = await loginPage.getErrorMessage();
    console.log(errorMessage);
    expect(errorMessage).toBe('Incorrect username/password.');

});


test('Validating Empty Error message at Login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('', '');

    const errorMessage = await loginPage.getErrorMessage();
    console.log(errorMessage);
    expect(errorMessage).toBe('Empty username/password.');

});



test('Validating Successful Login and taking first element', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('rahulshettyacademy', 'learning');

    await page.locator('.card-title').first().waitFor();
    const firstElementText = await page.getByText('iphone X').textContent();
    console.log(firstElementText);
    await expect(firstElementText).toBe('iphone X');
});


test('@Child windows handling test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    const documentLink = page.locator('a').getByText('Free Access to InterviewQues/ResumeAssistance/Material');
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ]);
});

//iphone X