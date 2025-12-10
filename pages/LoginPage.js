class LoginPage {
    constructor(page) {
        this.page = page;
        this.username = page.locator('#username');
        this.password = page.locator("[type='password']");
        this.signInButton = page.locator('#signInBtn');
        this.errorMessage = page.locator("[style*='block']");
    }

    async navigate() {
        await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    }

    async login(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.signInButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }
}

module.exports = LoginPage;
