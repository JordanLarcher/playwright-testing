const {test, expect} = require('@playwright/test');
const LoginPageClient = require('../pages/LoginPageClient');
const ClientHomePage = require('../pages/ClientHomePage');
const ClientCartPage = require('../pages/ClientCartPage');

test.describe('E2E Shopping Flow', () => {

    let loginPage, homePage, cartPage;
    test.beforeEach(async ({ page }) => {
        // These are fresh instances for each test
        loginPage = new LoginPageClient(page);
        homePage = new ClientHomePage(page);
        cartPage = new ClientCartPage(page);

        // Common setup: Login before each test
        await loginPage.navigate();
        await loginPage.login('erik.render@gmail.com', 'Alidarosa23');
        await page.locator('.card-body b').first().waitFor();
    });

    test('Client can login successfully', async ({page}) => {
        await page.locator('.card-body b').first().waitFor();
        await expect(page).toHaveURL('/dashboard/dash/');
    });


    test('Client can add product to the cart', async () => {
        const productName = 'ADIDAS ORIGINAL';
        // Add product to cart 
        await homePage.addProductByName(productName);
        await homePage.openCart();
        // Verify product is in cart 
        await expect(await cartPage.verifyProductInCart(productName)).toBeTruthy();
    });

    test('Client can remove product from the cart', async () => {
        const productName = 'ADIDAS ORIGINAL';
        // Add product to cart 
        await homePage.addProductByName(productName);
        await homePage.openCart();
        // Verify product is in the cart
        await expect(await cartPage.verifyProductInCart(productName)).toBeTruthy();
        // Remove product from cart
        await cartPage.removeProductFromCart(productName);
        // Verify product is removed from cart 
        await expect( await cartPage.verifyProductInCart(productName)).toBeTruthy();
    });


    test('Client can place an order', async () => {
        const productName = 'ADIDAS ORIGINAL';
        // Add product to cart 
        await homePage.addProductByName(productName);
        await homePage.openCart();
        // Verify product is in the cart
        await expect(await cartPage.verifyProductInCart(productName)).toBeTruthy();
        // Move to checkout page
        await cartPage.proceedToCheckout();
        // Fill in checkout details and place order
        await cartPage.fillCheckoutDetails('United States', '12345', '123 Main St', 'New York', 'NY', 'Credit Card');
        await cartPage.placeOrder();
        // Verify order confirmation
        const confirmationMessage = await cartPage.getOrderConfirmationMessage();
        expect(confirmationMessage).toContain('Thank you for your order');
    });
});