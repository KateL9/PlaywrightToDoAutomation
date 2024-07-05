import { APIRequestContext, BrowserContext } from "@playwright/test";
import UserApi from "../apis/UserAPI";
import Cookies from "../Helper/Cookies";
import UserApiProvider from "./UserApiProvider";
import User from "../models/User";

export default class LoginByApiProvider {
    async loginByApi(request: APIRequestContext, context: BrowserContext) {
        const email = process.env.TEST_USER_EMAIL;
        const password = process.env.TEST_USER_PASSWORD;
        if (!email || !password) {
            throw new Error('Environment variables TEST_USER_EMAIL and TEST_USER_PASSWORD must be set')
        }
        const response = await new UserApi().login(request, email, password);
        const responseBody = await response.json();
        const access_token = responseBody.access_token;
        const userID = responseBody.userID;
        const firstName = responseBody.firstName;

        const user = new User();
        const userApiProvider = new UserApiProvider(user);
        userApiProvider.setAccessToken(access_token);
        userApiProvider.setUserId(userID);
        const cookies = new Cookies();
        await cookies.setCookies(context, access_token, userID, firstName);
    }
}