import { test, expect } from '@playwright/test';
import ToDoPage from '../pages/ToDoPage';
import LoginPage from '../pages/LoginPage';


test.describe('Login to ToDoQaCart', () => {
    test('Login', async ({ page }) => {

        const loginPage = new LoginPage();
        await loginPage.navigateToLoginPage(page);
        await loginPage.login(page, 'emailTest@email.com', 'Password1!');

        const toDoPage = new ToDoPage();
        const welcomeMessage = toDoPage.getWelcomeMessageElement(page)
        await expect(welcomeMessage).toBeVisible()
    })
})
