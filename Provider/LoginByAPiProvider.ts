import { APIRequestContext, BrowserContext } from "@playwright/test";
import UserApi from "../apis/UserAPI";
import SetCookies from "../Helper/SetCookies";
import UserApiProvider from "./userApiProvider";

export default class LoginByApiProvider {
    async loginByApi(request: APIRequestContext, context: BrowserContext) {
        const response = await new UserApi().login(request);
        
        const responseBody = await response.json();
        const access_token = responseBody.access_token;
        const userID = responseBody.userID;
        const firstName = responseBody.firstName;

        const user = new UserApiProvider();
        user.setAccessToken(access_token);
        user.setUserId(userID);

        const cookies = new SetCookies();
        await cookies.setCookies(context, access_token, userID, firstName);
    }
}