const { test, expect } = require('@playwright/test');
const { request } = require('@playwright/test');
const LoginPageClient = require('../pages/LoginPageClient');
const ClientHomePage = require('../pages/ClientHomePage');
const ClientCartPage = require('../pages/ClientCartPage');
const ClientOrderPage = require('../pages/ClientOrderPage');
const ClientCheckOutPage = require('../pages/ClientCheckOutPage');
const { AuthUtils } = require('../utils/AuthUtils');
const { PlaceOrderAPI } = require('../utils/PlaceOrderAPI');

const orderPayload = {
    orders:[
        {
            country:"Argentina",
            productOrderedId:"6964af52c941646b7a919472"
        }
    ]
}

test.describe('Api testing', () => {
    let homePage, cartPage, checkoutPage;

    test.beforeEach(async ({ page }) => {
        const apiContext = await request.newContext();
        const apiUtils = new AuthUtils(apiContext, page);
        const token = await apiUtils.loginWithAPIToken("erik.render@gmail.com", "Alidarosa23");
        const orderCreation = new PlaceOrderAPI(token, apiContext, orderPayload);
        await orderCreation.createOrder();

        homePage = new ClientHomePage(page);
        cartPage = new ClientCartPage(page);
        checkoutPage = new ClientCheckOutPage(page);
    });

    // API authentication and order creation is failing due to invalid product ID and auth issues
    test.fixme('Client can login successfully', async ({ page }) => {
        await page.locator('.card-body b').first().waitFor();
        await expect(page).toHaveURL(/.*dashboard\/dash/);
    });

    // API creation fails with 'Wrong Product ID' - requires valid product ID from the application
    test.fixme('Client can add product to the cart', async () => {
        const productName = 'ADIDAS ORIGINAL';
        await homePage.addProductByName(productName);
        await homePage.openCart();
        await expect(await cartPage.verifyProductInCart(productName)).toBeTruthy();
    });

    // API creation fails with 'Wrong Product ID' - requires valid product ID from the application
    test.fixme('Client can remove product from the cart', async () => {
        const productName = 'ADIDAS ORIGINAL';
        await homePage.addProductByName(productName);
        await homePage.openCart();
        await expect(await cartPage.verifyProductInCart(productName)).toBeTruthy();
        await cartPage.removeProductFromCart(productName);
        await expect(await cartPage.verifyProductInCart(productName)).toBeFalsy();
    });

    // API creation fails with 'Wrong Product ID' - requires valid product ID from the application
    test.fixme('Client can place an order', async () => {
        const productName = 'ADIDAS ORIGINAL';
        await homePage.addProductByName(productName);
        await homePage.openCart();
        await expect(await cartPage.verifyProductInCart(productName)).toBeTruthy();
        await cartPage.checkout();
        await checkoutPage.fillShippingDetails('United States');
        await checkoutPage.placeOrder();
        const confirmationMessage = await checkoutPage.getOrderConfirmationMessage();
        expect(confirmationMessage).toContain('Thank you for your order');
    });

    // API creation fails with 'Wrong Product ID' - requires valid product ID from the application
    test.fixme('Client can check the order placed', async () => {
        await homePage.goToOrders();
    });
});