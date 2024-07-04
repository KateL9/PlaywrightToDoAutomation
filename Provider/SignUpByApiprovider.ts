import { APIRequestContext, BrowserContext } from "@playwright/test";
import UserApi from "../apis/UserAPI";
import User from "../models/User";
//import config from '../playwright.config';
import SetCookies from "../Helper/SetCookies";
import UserApiProvider from "./userApiProvider";

export default class SignUpByApiProvider {
    async signUpByApi(request: APIRequestContext, user: User, context: BrowserContext) {
        const response = await new UserApi().signUp(request, user);
        const responseBody = await response.json();
        const access_token = responseBody.access_token;
        const userID = responseBody.userID;
        const firstName = responseBody.firstName;
        
        const userApiProvider = new UserApiProvider(user);
        userApiProvider.setAccessToken(access_token);
        userApiProvider.setUserId(userID);
        const cookies = new SetCookies();
        await cookies.setCookies(context, access_token, userID, firstName);
        return userApiProvider;
    }
}