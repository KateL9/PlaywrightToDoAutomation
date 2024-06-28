import { test, expect } from '@playwright/test'
import User from '../models/User';
import SignUpPage from '../pages/SignUpPage';
import ToDoPage from '../pages/ToDoPage';

test.describe('User', () => {
    test('Register new user', async ({ page }) => {

        const user = new User();

        const signUp = new SignUpPage();
        await signUp.navigateToSignUp(page);
        await signUp.signUp(page,user);

        // await expect(page.getByTestId('welcome')).toBeVisible()
        
        const toDoPage = new ToDoPage();
        const welcomeMessage = toDoPage.getWelcomeMessageElement(page)
        await expect(welcomeMessage).toBeVisible()
        
    })
})
