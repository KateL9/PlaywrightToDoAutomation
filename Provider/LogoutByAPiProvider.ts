import { BrowserContext } from "@playwright/test";
import Cookies from "../Helper/Cookies";

export default class LogoutByApiProvider {
    async logoutByApi (context: BrowserContext) {
        const cookies = new Cookies();
        await cookies.clearCookies(context);
    }
}