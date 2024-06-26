import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker';

test.describe('ToDo list', () => {
    test('Add a new item to ToDo list', async ({ page, request, context }) => {
        // register user via API
        const response = await request.post('api/v1/users/register', {
            data: {
                email: faker.internet.email(),
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                password: 'Password1!',
            }
        })

        const responseBody = await response.json();
        const access_token = responseBody.access_token;
        const userID = responseBody.userID;
        const firstName = responseBody.firstName;

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
        const response = await request.post('api/v1/users/register', {
            data: {
                email: faker.internet.email(),
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                password: 'Password1!',
            }
        })

        const responseBody = await response.json();
        const access_token = responseBody.access_token;
        const userID = responseBody.userID;
        const firstName = responseBody.firstName;

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
        await request.post('/api/v1/tasks', {
            data: {
                isCompleted: false,
                item: 'Learn Playwright'
            },
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        await page.goto('/todo');

        // await page.locator('button[aria-label="delete"]').click();
        // await page.getByTestId('new-todo').fill('Learn Playwright');
        // await page.getByTestId('submit-newTask').click();

        // await expect(page.getByTestId('todo-text')).toContainText('Learn Playwright'); 

        await page.getByTestId('delete').click();
        await expect(page.getByTestId('no-todos')).toBeVisible();
    })
})
