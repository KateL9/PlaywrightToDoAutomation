import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'

test.describe('User', () => {
    test('Register new user', async ({ page }) => {
        await page.goto("/signup");
        await page.getByTestId('first-name').fill(faker.person.firstName());
        await page.getByTestId('last-name').fill(faker.person.lastName());
        await page.getByTestId('email').fill(faker.internet.email());
        await page.getByTestId('password').fill('Password1!');
        await page.getByTestId('confirm-password').fill('Password1!');
        await page.click('[data-testid=submit]')
        //await page.getByTestId('submit').click();

        await expect(page.getByTestId('welcome')).toBeVisible()
    })
})
