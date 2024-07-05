import { BrowserContext } from '@playwright/test';
import config from '../playwright.config';

export default class Cookies {
    async setCookies(context: BrowserContext, access_token: string, userID: string, firstName: string) {
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
    };
    async clearCookies( context: BrowserContext ) {
        await context.clearCookies();
    }
}