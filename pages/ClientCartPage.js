class ClientCartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('//ul[@class="cartWrap ng-star-inserted"]');
        this.deleteButtons = page.locator('//button[@class="btn btn-danger"]');
        this.checkoutButton = page.getByRole('button', { name: 'Checkout'});
        this.continueShoppingButton = page.getByRole('button', { name: ' Continue Shopping'});
        this.buyNowButtons = page.getByRole('button', { name: 'Buy Now'});
        this.cartIcon = page.locator('button[routerlink="/dashboard/cart"]');
        this.ordersLink = page.getByRole('button', { name: 'ORDERS' });
        this.signOutButton = page.getByRole('button', { name: 'Sign Out' });
    }


    async verifyProductInCart(productName){
        await this.cartItems.first().waitFor();
        const items = await this.cartItems.allTextContents();
        return items.some(item => item.includes(productName));
    }

    async removeProductFromCart(productName){
        const count = await this.cartItems.count();
        for(let i = 0; i < count ; i++){
            const itemText = await this.cartItems.nth(i).textContent();
            if(itemText.includes(productName)){
                await this.deleteButtons.nth(i).click();
                break;
            }
        }
    }
    async checkout() {
        await this.checkoutButton.click();
    }
}


module.exports = ClientCartPage;