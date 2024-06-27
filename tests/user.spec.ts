import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import User from '../models/User';

test.describe('User', () => {
    test('Register new user', async ({ page }) => {

        const user = new User();

        await page.goto("/signup");
        await page.getByTestId('first-name').fill(user.getFirstName());
        await page.getByTestId('last-name').fill(user.getLastName());
        await page.getByTestId('email').fill(user.getEmail());
        await page.getByTestId('password').fill(user.getPassword());
        await page.getByTestId('confirm-password').fill(user.getPassword());
        await page.click('[data-testid=submit]')
        //await page.getByTestId('submit').click();

        await expect(page.getByTestId('welcome')).toBeVisible()
    })
})
