import { Page } from "@playwright/test";

export default class LoginPage {
    private get emailField() {
        return 'email'
    };
    private get passwordField() {
        return 'password'
    };
    private get loginButton() {
        return 'submit'
    };
    async navigateToLoginPage(page) {
        await page.goto('/login')
    };
    async login(page: Page, email: string, password: string) {
        await page.getByTestId(this.emailField).fill(email);
        await page.getByTestId(this.passwordField).fill(password);
        await page.getByTestId(this.loginButton).click();
    }
}