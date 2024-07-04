import { Page } from "@playwright/test";
import User from "../models/User";

export default class SignUpPage {
    private get firstNameInput() {
        return 'first-name'
    };
    private get lastNameInput() {
        return 'last-name'
    };
    private get emailInput() {
        return 'email'
    };
    private get passwordInput() {
        return 'password'
    };
    private get confirmPasswordInput() {
        return 'confirm-password'
    };
    private get submitButton() {
        return '[data-testid=submit]'
    };
    async navigateToSignUp(page: Page) {
        await page.goto('/signup')
    };
    async signUp(page:Page, user: User) {
        await page.getByTestId(this.firstNameInput).fill(user.getFirstName());
        await page.getByTestId(this.lastNameInput).fill(user.getLastName());
        await page.getByTestId(this.emailInput).fill(user.getEmail());
        await page.getByTestId(this.passwordInput).fill(user.getPassword());
        await page.getByTestId(this.confirmPasswordInput).fill(user.getPassword());
        await page.click(this.submitButton);
    }
}