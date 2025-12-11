class ClientCheckOutPage {
    constructor(page) {
        this.page = page;
        this.formPersonalInformation = page.locator('.form__cc');
        this.creditCardInput = page.locator
        this.cvvCode = page.locator
        this.cardName = page.locator
        this.expirationDate = page.locator
        this.billingAddressInput = page.locator
        this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
        this.orderConfirmationMessage = page.locator('.order-confirmation');
        this.applyCouponInput = page.locator
        this.applyCouponButton = page.getByRole('button', { name: 'Apply Coupon' });
        this.errorMessage = page.locator('.error-message');
    }

    async fillCheckoutDetails(){

    }

    async fillShippingDetails(){

    }

    async applyCoupon(code) {

    }

    async placeOrder() {

    }
    async validateErrorMessage(){

    }
}