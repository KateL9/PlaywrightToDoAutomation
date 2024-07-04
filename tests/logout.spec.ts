import { test, expect } from '@playwright/test';
import LogoutPage from '../pages/LogoutPage';
//import LoginByApiProvider from '../Provider/LoginbyAPiProvider';
import LoginByApiProvider from '../Provider/LoginByAPiProvider';
import LoginPage from '../pages/LoginPage'

test.describe('Logout test', () => {
    test('Logout by Graphical User Interface', async ({ page, request, context }) => {
        // Login first
        const loginByApi = new LoginByApiProvider();
        await loginByApi.loginByApi(request, context);

        const loginPage = new LoginPage();
        loginPage.navigateToLoginPage(page);
        
        const logout = new LogoutPage();
        const logoutButton = logout.getlogoutButton(page);
        await expect(logoutButton).toBeVisible();

        await logout.logout(page);
        await expect(page).toHaveURL(/.*login/);
    })
})
