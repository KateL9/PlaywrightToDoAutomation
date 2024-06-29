import { test, expect } from '@playwright/test';
import ToDoPage from '../pages/ToDoPage';
import LoginPage from '../pages/LoginPage';

test.describe('Login to ToDoQaCart', () => {
    test('Login', async ({ page }) => {
        const email = process.env.TEST_USER_EMAIL;
        const password = process.env.TEST_USER_PASSWORD;
        
        if (!email || !password) {
            throw new Error('Environment variables TEST_USER_EMAIL and TEST_USER_PASSWORD must be set');
        }

        const loginPage = new LoginPage();
        await loginPage.navigateToLoginPage(page);
        await loginPage.login(page, email, password);

        const toDoPage = new ToDoPage();
        const welcomeMessage = toDoPage.getWelcomeMessageElement(page)
        await expect(welcomeMessage).toBeVisible()
    })
})
