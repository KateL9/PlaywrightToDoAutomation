import { test, expect } from '@playwright/test';
import LogoutPage from '../pages/LogoutPage';
import LoginByApiProvider from '../Provider/LoginByAPiProvider';
import LoginPage from '../pages/LoginPage'
import LogoutByApiProvider from '../Provider/LogoutByAPiProvider';

test.describe('Logout test', () => {
    test('Logout by Graphical User Interface', async ({ page, request, context }) => {
        const loginByApi = new LoginByApiProvider();
        await loginByApi.loginByApi(request, context);

        const loginPage = new LoginPage();
        await loginPage.navigateToLoginPage(page);

        const logout = new LogoutPage();
        const logoutButton = logout.getlogoutButton(page);
        await expect(logoutButton).toBeVisible();

        await logout.logout(page);
        await expect(page).toHaveURL(/.*login/);
    });
    
    test('Logout by API', async ({ page, request, context }) => {
        const loginByApi = new LoginByApiProvider();
        await loginByApi.loginByApi(request, context);

        const loginPage = new LoginPage();
        await loginPage.navigateToLoginPage(page);

        const logoutByApi = new LogoutByApiProvider();
        await logoutByApi.logoutByApi(context);

        const cookies = await context.cookies();
        expect(cookies.length).toBe(0);

        await page.reload();
        await expect(page).toHaveURL(/.*login/);
    })
    
})
