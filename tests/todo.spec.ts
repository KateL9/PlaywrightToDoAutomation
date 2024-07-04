import { test, expect } from '@playwright/test'
import User from '../models/User';
import ToDoPage from '../pages/ToDoPage';
import NewToDoPage from '../pages/NewToDoPage';
import SignUpByApiProvider from '../Provider/SignUpByApiprovider';

test.describe('ToDo list', () => {
    test('Add a new item to ToDo list', async ({ page, request, context }) => {
        const user = new User();
        const signUpPage = new SignUpByApiProvider();
        await signUpPage.signUpByApi(request, user, context);

        const newToDoPage = new NewToDoPage();
        await newToDoPage.navigateNewToDoPage(page);
        await newToDoPage.enterNewToDo(page, 'Learn Playwright');
        await newToDoPage.submitNewToDo(page);
        
        const toDoPage = new ToDoPage();
        const toDoText = toDoPage.getToDoInput(page);
        await expect(toDoText).toContainText('Learn Playwright');
    })

    test('Delete a ToDo list item', async ({ page, request, context }) => {
        const user = new User();
        const signUpProvider = new SignUpByApiProvider();
        const userApiProvider = await signUpProvider.signUpByApi(request, user, context);
        
        const newToDoPage = new NewToDoPage();
        newToDoPage.addToDoByApi(request, userApiProvider);

        const toDoPage = new ToDoPage();
        await toDoPage.navigateToDoPage(page);
        const toDoText = toDoPage.getToDoInput(page);
        await expect(toDoText).toContainText('Learn Playwright');

        await toDoPage.deleteToDo(page);
        const noToDoMessage = await toDoPage.getNoToDoMessage(page);
        await expect(noToDoMessage).toBeVisible();
    })
})
