import { Page } from "@playwright/test";

export default class Logout {
    private get logoutButton() {
        return 'span.MuiButton-label'
    }
    getlogoutButton(page: Page) {
        return page.locator(this.logoutButton);
    }
    async logout(page: Page) {
        await page.click(this.logoutButton);
    }
}