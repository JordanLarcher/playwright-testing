class ClientCartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('div.cart ul li');
        this.deleteButtons = page.locator('//button[@class="btn btn-danger"]');
        this.checkoutButton = page.getByRole('button', { name: 'Checkout'});
        this.continueShoppingButton = page.getByRole('button', { name: ' Continue Shopping'});
        this.buyNowButtons = page.getByRole('button', { name: 'Buy Now'});
        this.cartIcon = page.locator('button[routerlink="/dashboard/cart"]');
        this.ordersLink = page.getByRole('button', { name: 'ORDERS' });
        this.signOutButton = page.getByRole('button', { name: 'Sign Out' });
    }


    async verifyProductInCart(productName){
        const productLocator = this.cartItems.filter({ hasText: productName});
        try{
            await productLocator.waitFor({ state: 'visible', timeout: 2000});
            return false;
        } catch(e) {
            return false;
        }
    }

    async removeProductFromCart(productName){
        const productToBeRemoved = this.cartItems.filter( { hasText: productName } );

        // In that same locator row we look for the delete button 
        const deleteBtn = this.productToBeRemoved.locator('button.btn-danger');

        await deleteBtn.click();

        await productToBeRemoved.waitFor( { state: 'detached' } );
    }

    async checkout() {
        await this.checkoutButton.click();
    }

    async continueShopping(){
        await this.continueShoppingButton.click();
    }
}

module.exports = ClientCartPage;