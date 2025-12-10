class ClientOrderPage {
    constructor(page) {
        this.page = page;
        this.cartIcon = page.locator('button[routerlink="/dashboard/cart"]');
        this.ordersLink = page.getByRole('button', { name: 'ORDERS' });
        this.signOutButton = page.getByRole('button', { name: 'Sign Out' });
        this.backToShopButton = page.getByRole('button', { name: 'Go Back to Shop' });
        this.backToCartButton = page.getByRole('button', { name: 'Go Back to Cart' });
        this.viewItemButton = page.getByRole('button', { name: 'View'});
        this.deleteItemButton = page.getByRole('button', { name: 'Delete'});

    }

    async goto() {
            await this.page.goto('https://rahulshettyacademy.com/client/#/dashboard/myorders');
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

    async backToShop() {
        await this.backToShopButton.click();
    }

    async backToCart(){
        await this.backToCartButton.click();
    }

    async viewItem(){
        await this.viewItemButton.click();
    }

    async deleteItem(){
        await this.deleteItemButton.click();
    }


}

module.exports = ClientHomePage;
