const { describe, test, expect, beforeEach, afterEach } = require('@playwright/test');
const LoginPageClient = require('../pages/LoginPageClient');
const ClientHomePage = require('../pages/ClientHomePage');
const ClientCartPage = require('../pages/ClientCartPage');
const ClientOrderPage = require('../pages/ClientOrderPage');
const ClientCheckOutPage = require('../pages/ClientCheckOutPage');

describe('E2E Shopping Flow', () => {

    let loginPage, homePage, cartPage, ordersPage, checkoutPage;
    
    beforeEach(async ({ page }) => {
        // These are fresh instances for each test
        loginPage = new LoginPageClient(page);
        homePage = new ClientHomePage(page);
        cartPage = new ClientCartPage(page);
        ordersPage = new ClientOrderPage(page);
        checkoutPage = new ClientCheckOutPage(page);

        // Common setup: Login before each test
        await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');
        await page.locator('.card-body b').first().waitFor();
    });

    test('Client can login successfully', async ({ page }) => {
        //await page.locator('.card-body b').first().waitFor();
        await expect(page).toHaveURL(/.*dashboard\/dash/);
    });

    test.only('Client can check if the cart is empty', async ({ page }) => {
        const cart = await homePage.openCart();
        const message = await cart.getEmptyOrdersMessage();
        expect(message).toBe('No Products in Your Cart !')
    });


    test('Client can add product to the cart', async ({ page }) => {
        const productName = 'ADIDAS ORIGINAL';
        // Add product to cart 
        await homePage.addProductByName(productName);
        await homePage.openCart();
        // Verify product is in cart 
        await expect(await cartPage.verifyProductInCart(productName)).toBeTruthy();
    });

    test('Client can remove product from the cart', async ({ page }) => {
        const productName = 'ADIDAS ORIGINAL';
        // Add product to cart 
        await homePage.addProductByName(productName);
        await homePage.openCart();
        // Verify product is in the cart
        await expect(await cartPage.verifyProductInCart(productName)).toBeTruthy();
        // Remove product from cart
        await cartPage.removeProductFromCart(productName);
        // Verify product is removed from cart 
        await expect(await cartPage.verifyProductInCart(productName)).toBeFalsy();
    });


    test('Client can place an order', async ({ page }) => {
        const productName = 'ADIDAS ORIGINAL';
        // Add product to cart 
        await homePage.addProductByName(productName);
        await homePage.openCart();
        // Verify product is in the cart
        await expect(await cartPage.verifyProductInCart(productName)).toBeTruthy();
        // Move to checkout page
        await cartPage.checkout();
        // Fill in checkout details and place order
        await checkoutPage.fillPersonalInformation('test', '123', '4542 9931 9292 2293');
        await checkoutPage.fillShippingDetails('United States');
        await checkoutPage.placeOrder();
        // Verify order confirmation
        const confirmationMessage = await checkoutPage.getOrderConfirmationMessage();
        await expect(confirmationMessage).toContain(' Thankyou for the order. ');
    });

    test('Client can check the order placed', async ({ page }) => {
        await homePage.goToOrders();
        await expect(page).toHaveURL(/.*orders/);

        // assert that at least one order row is visible
        const orderRows = page.locator('tbody tr');
        await expect(orderRows.first()).toBeVisible();

    });
});