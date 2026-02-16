class ClientCheckOutPage {
    constructor(page) {
        this.page = page;
        this.formPersonalInformation = page.locator('.form__cc');
        this.cvvCode = page.locator('//div[contains(text(), "CVV Code")]/following::input[1]');
        this.creditCardInput = page.locator('//div[contains(text(), "Credit Card")]/following::input[1]');
        this.cardName = page.locator('//div[contains(text(), "Name on Card")]/following::input[1]');
        this.expirationDate = page.locator();
        this.placeOrderButton = page.locator('a:has-text("PLACE ORDER")');
        this.orderConfirmationMessage = page.getByRole('heading', { name: 'Thankyou for the order.'})
        this.applyCouponButton = page.getByRole('button', { name: 'Apply Coupon' });
        this.errorMessage = page.locator('.error-message');
        this.shippingInformationCountrySelectionBox = page.getByRole('textbox', { name: 'Select Country' });
        // this.shippingInformationCountrySelectionBox = page.locator('//input[@placeholder="Select Country"]');
        // this.shippingInformationCountrySelectionBox = page.getByPlaceholder('Select Country', { exact: true });
        this.dropdownCountryOptions = page.locator('.ta-results');
    }

    async fillPersonalInformation(cardName, cvvCode, creditCardInput) {
        await this.cardName.fill(cardName);
        await this.cvvCode.fill(cvvCode);
        await this.creditCardInput.clear();
        await this.creditCardInput.fill(creditCardInput);
    }


    async fillShippingDetails(countryName) {
        await this.shippingInformationCountrySelectionBox.pressSequentially(countryName, { delay: 150 });
        await this.dropdownCountryOptions.waitFor();
        await this.dropdownCountryOptions.locator(`text=${countryName}`).first().click();
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