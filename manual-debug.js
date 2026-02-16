const { chromium } = require('playwright');
const LoginPageClient = require('./pages/LoginPageClient');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    try {
        const loginPage = new LoginPageClient(page);
        
        console.log('Navigating to login page...');
        await loginPage.navigate();
        
        console.log('Waiting for page to load...');
        await page.waitForLoadState('networkidle');
        
        console.log('Page URL:', page.url());
        
        // Take a screenshot to see what's on the page
        await page.screenshot({ path: 'debug-login.png' });
        
        console.log('Attempting login...');
        await loginPage.login('erik.render@gmail.com', 'Alidarosa23');
        
        console.log('Login completed, waiting for navigation...');
        await page.waitForLoadState('networkidle', { timeout: 10000 });
        
        console.log('Final URL:', page.url());
        
        // Wait a bit to see the result
        await page.waitForTimeout(5000);
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await browser.close();
    }
})();