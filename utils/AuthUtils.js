class AuthUtils {

    constructor(apiContext, page) {
        this.apiContext = apiContext;
        this.page = page;
    }

    async loginWithToken(token) {
        // Set token directly to localStorage
        await this.page.evaluate((authToken) => {
            localStorage.setItem('token', authToken);
            localStorage.setItem('userEmail', 'erik.render@gmail.com');
        }, token);
    }       

    async generateAndStoreToken() {
        // You would typically call your API to generate a token
        // For demonstration, use a placeholder - replace with actual token
        const validToken = 'your_valid_token_here';
        await this.loginWithToken(validToken);
        return validToken;
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


module.exports = {AuthUtils};