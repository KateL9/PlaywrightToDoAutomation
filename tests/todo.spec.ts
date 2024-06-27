import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker';
import User from '../models/User';
import UserApi from '../apis/UserAPI';
import ToDoApi from '../apis/ToDoAPI';

test.describe('ToDo list', () => {
    test('Add a new item to ToDo list', async ({ page, request, context }) => {
        // register user via API
        const user = new User();

        const response = await new UserApi().signUp(request, user);

        const responseBody = await response.json();
        const access_token = responseBody.access_token;
        const userID = responseBody.userID;
        const firstName = responseBody.firstName;
        
        user.setAccessToken(access_token);
        user.setUserId(userID);

        // Set cookies
        await context.addCookies([
            {
                name: 'access_token',
                value: access_token,
                url: 'https://todo.qacart.com'
            },
            {
                name: 'userID',
                value: userID,
                url: 'https://todo.qacart.com'
            },
            {
                name: 'firstName',
                value: firstName,
                url: 'https://todo.qacart.com'
            },
        ])

        // add a new To Do item via UI
        await page.goto('/todo');
        await page.locator('button [data-testid ="add"]').click();
        await page.getByTestId('new-todo').fill('Learn Playwright');
        await page.getByTestId('submit-newTask').click();
        await expect(page.getByTestId('todo-text')).toContainText('Learn Playwright')
    })

    test('Delete a ToDo list item', async ({ page, request, context }) => {
        // register user via API
        const user = new User();

        const response = await new UserApi().signUp(request, user);

        const responseBody = await response.json();
        const access_token = responseBody.access_token;
        const userID = responseBody.userID;
        const firstName = responseBody.firstName;

        user.setAccessToken(access_token);
        user.setUserId(userID);

        // Set cookies
        await context.addCookies([
            {
                name: 'access_token',
                value: access_token,
                url: 'https://todo.qacart.com'
            },
            {
                name: 'userID',
                value: userID,
                url: 'https://todo.qacart.com'
            },
            {
                name: 'firstName',
                value: firstName,
                url: 'https://todo.qacart.com'
            },
        ])

        // add new element via API
        await new ToDoApi().addToDoItem(request, user)
 

        // Delete ToDo item via UI
        await page.goto('/todo');
        await page.getByTestId('delete').click();
        await expect(page.getByTestId('no-todos')).toBeVisible();
    })
})
