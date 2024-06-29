import { test, expect } from '@playwright/test'
import User from '../models/User';
import SignUpPage from '../pages/SignUpPage';
import ToDoPage from '../pages/ToDoPage';
import NewToDoPage from '../pages/NewToDoPage';

test.describe('ToDo list', () => {
    test('Add a new item to ToDo list', async ({ page, request, context }) => {

        const user = new User();
        const signUpPage = new SignUpPage;
        await signUpPage.signUpByApi(request, user, context);

        const newToDoPage = new NewToDoPage();
        newToDoPage.navigateNewToDoPage(page);
        newToDoPage.enterNewToDo(page, 'Learn Playwright');
        newToDoPage.submitNewToDo(page);
        
        const toDoPage = new ToDoPage();
        const toDoText = toDoPage.getToDoInput(page);
        await expect(toDoText).toContainText('Learn Playwright');
    })

    test('Delete a ToDo list item', async ({ page, request, context }) => {

        const user = new User();
        const signUpPage = new SignUpPage;
        await signUpPage.signUpByApi(request, user, context);

        const newToDoPage = new NewToDoPage();
        newToDoPage.addToDoByApi(request, user);

        const toDoPage = new ToDoPage();
        toDoPage.navigateToDoPage(page);
        toDoPage.deleteToDo(page);
        const noToDoMessage = await toDoPage.getNoToDoMessage(page);
        await expect(noToDoMessage).toBeVisible();
    })
})
