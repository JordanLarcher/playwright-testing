class ClientHomePage {
    constructor(page) {
        this.page = page;
        this.productCards = page.locator('div b');
        this.cartIcon = page.locator('button[routerlink="/dashboard/cart"]');
        this.ordersLink = page.getByRole('button', { name: 'ORDERS' });
        this.searchBox = page.getByPlaceholder('search');
        this.signOutButton = page.getByRole('button', { name: 'Sign Out' });
        this.emptyOrdersMessage = page.getByText('You have No Orders to show at this time. Please Visit Back Us', { exact: true })
    }

    async goto() {
            await this.page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');
    }

    async searchProduct(name) {
        if(await this.searchBox.isVisible()) {
            await this.searchBox.fill(name);
            await this.searchBox.press('Enter');
            await this.productCards.first().waitFor();
        }
    }

    async addProductByName(productName) {
        // Find the product card containing the product name
        const productLocator = this.page.locator('.card-body').filter({ hasText: productName });
        await productLocator.locator('button:has-text("Add To Cart")').click();
    }

    async openCart() {
        await this.cartIcon.click();
    }

    async goToOrders(){
        await this.ordersLink.click();
    }

    async signOut(){
        await this.signOutButton.click();
    }


    async getEmptyOrdersMessage() {
        return await this.emptyOrdersMessage.textContent();
    }



}

module.exports = ClientHomePage;
