class LoginPage {
    constructor(page) {
        this.page = page;
        this.userEmail = page.locator('#userEmail');
        this.password = page.locator("#userPassword");
        this.signInButton = page.locator('#login');
        this.errorMessage = page.locator("[style*='block']");
        this.token ='';
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

    async loginWithToken(token) {
        // Set token directly to localStorage
        await this.page.evaluate((authToken) => {
            localStorage.setItem('token', authToken);
            localStorage.setItem('userEmail', 'erik.render@gmail.com');
        }, token);
        
        // Navigate to dashboard directly
        await this.page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');
    }

    async generateAndStoreToken() {
        // You would typically call your API to generate a token
        // For demonstration, use a placeholder - replace with actual token
        const validToken = 'your_valid_token_here';
        await this.loginWithToken(validToken);
        return validToken;
    }

    async loginAndExtractToken(userEmail, password) {
        // Perform normal login and capture the token
        await this.userEmail.fill(userEmail);
        await this.password.fill(password);
        await this.signInButton.click();
        
        // Wait for login to complete
        await this.page.waitForURL(/.*dashboard\/dash/);
        
        // Extract token from localStorage
        const token = await this.page.evaluate(() => {
            return localStorage.getItem('token');
        });
        
        this.token = token;
        return token;
    }

    async getTokenViaAPI(userEmail, password) {
        const response = await this.page.request.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
            data: {
                userEmail: userEmail,
                userPassword: password
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        const responseData = await response.json();
        const token = responseData.token;
        
        this.token = token;
        return token;
    }

    async loginWithAPIToken(userEmail, password) {
        // Get token via API
        const token = await this.getTokenViaAPI(userEmail, password);
        
        // Set token to localStorage and navigate
        await this.loginWithToken(token);
        
        return token;
    }
}

module.exports = LoginPage;
