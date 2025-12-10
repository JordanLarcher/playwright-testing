class LoginPage {
    constructor(page) {
        this.page = page;
        this.userEmail = page.locator('#userEmail');
        this.password = page.locator("#userPassword");
        this.signInButton = page.locator('#login');
        this.errorMessage = page.locator("[style*='block']");
    }

    async navigate() {
        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    }

    async login(userEmail, password) {
        await this.userEmail.fill(userEmail);
        await this.password.fill(password);
        await this.signInButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }
}

module.exports = LoginPage;
