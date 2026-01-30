const { describe, test, expect, beforeEach, afterEach } = require('@playwright/test');
const { request } = require('@playwright/test');
const LoginPageClient = require('../pages/LoginPageClient');
const ClientHomePage = require('../pages/ClientHomePage');
const ClientCartPage = require('../pages/ClientCartPage');
const ClientOrderPage = require('../pages/ClientOrderPage');
const ClientCheckOutPage = require('../pages/ClientCheckOutPage');
let token;
let loginPage, homePage, cartPage, ordersPage, checkoutPage;

beforeAll( async() => {
    
});



test.describe('Api testing', () => {

    test('Client can login successfully', async ({ page }) => {
        await page.locator('.card-body b').first().waitFor();
        await expect(page).toHaveURL(/.*dashboard\/dash/);
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
        await expect(await cartPage.verifyProductInCart(productName)).toBeTruthy();
    });


    test('Client can place an order', async () => {
        const productName = 'ADIDAS ORIGINAL';
        // Add product to cart 
        await homePage.addProductByName(productName);
        await homePage.openCart();
        // Verify product is in the cart
        await expect(await cartPage.verifyProductInCart(productName)).toBeTruthy();
        // Move to checkout page
        await cartPage.checkout();
        // Fill in checkout details and place order
        await checkoutPage.fillShippingDetails('United States');
        await checkoutPage.placeOrder();
        // Verify order confirmation
        const confirmationMessage = await checkoutPage.getOrderConfirmationMessage();
        expect(confirmationMessage).toContain('Thank you for your order');
    });

    test('Client can check the order placed', async () => {
        await homePage.goToOrders();

    });

});