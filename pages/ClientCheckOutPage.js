class ClientCheckOutPage {
    constructor(page) {
        this.page = page;
        this.formPersonalInformation = page.locator('.form__cc');
        this.creditCardInput = page.locator();
        this.cvvCode = page.locator();
        this.cardName = page.locator();
        this.expirationDate = page.locator();
        this.billingAddressInput = page.locator();
        this.placeOrderButton = page.locator('a:has-text("PLACE ORDER)');
        this.orderConfirmationMessage = page.locator('.order-confirmation');
        this.applyCouponInput = page.locator
        this.applyCouponButton = page.getByRole('button', { name: 'Apply Coupon' });
        this.errorMessage = page.locator('.error-message');
        this.shippingInformationCountrySelectionBox = page.getByRole('textbox', { name: 'Select Country' });
        // this.shippingInformationCountrySelectionBox = page.locator('//input[@placeholder="Select Country"]');
        // this.shippingInformationCountrySelectionBox = page.getByPlaceholder('Select Country', { exact: true });
        this.dropdownCountryOptions = page.locator('.ta-results');
    }

    async fillPersonalInformation() {

    }


    async fillShippingDetails(countryName) {
        await this.shippingInformationCountrySelectionBox.pressSequentially(countryName, { delay: 150 });
        await this.dropdownCountryOptions.waitFor();
        await this.dropdownCountryOptions.locator(`text=${countryName}`).click();
    }

    async applyCoupon(code) {

    }

    async placeOrder() {
        await this.placeOrderButton.click();
    }
    async validateErrorMessage() {
        return await this.emptyOrdersMessage.textContent();
    }
    async getOrderConfirmationMessage() {
        return await this.orderConfirmationMessage.textContent();
    }
}

module.exports = ClientCheckOutPage;