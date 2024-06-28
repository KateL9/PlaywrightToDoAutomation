import { APIRequestContext, BrowserContext, Page } from "@playwright/test";
import User from "../models/User";
import UserApi from "../apis/UserAPI";
import config from '../playwright.config';


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
    async navigateToSignUp(page:Page) {
        await page.goto("/signup")
    };

    async signUp(page:Page, user: User) {
        await page.getByTestId(this.firstNameInput).fill(user.getFirstName());
        await page.getByTestId(this.lastNameInput).fill(user.getLastName());
        await page.getByTestId(this.emailInput).fill(user.getEmail());
        await page.getByTestId(this.passwordInput).fill(user.getPassword());
        await page.getByTestId(this.confirmPasswordInput).fill(user.getPassword());
        await page.click(this.submitButton)
    }
    async signUpByApi(request: APIRequestContext, user: User, context: BrowserContext) {
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
                url: config.use?.baseURL,
            },
            {
                name: 'userID',
                value: userID,
                url: config.use?.baseURL
            },
            {
                name: 'firstName',
                value: firstName,
                url: config.use?.baseURL
            },
        ])
    }
}