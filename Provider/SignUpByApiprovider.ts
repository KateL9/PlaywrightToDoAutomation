import { APIRequestContext, BrowserContext } from "@playwright/test";
import UserApi from "../apis/UserAPI";
import User from "../models/User";
//import config from '../playwright.config';
import SetCookies from "../Helper/SetCookies";

export default class SignUpByApiProvider {
    async signUpByApi(request: APIRequestContext, user: User, context: BrowserContext) {
        const response = await new UserApi().signUp(request, user);

        const responseBody = await response.json();
        const access_token = responseBody.access_token;
        const userID = responseBody.userID;
        const firstName = responseBody.firstName;
        
        user.setAccessToken(access_token);
        user.setUserId(userID);

        const cookies = new SetCookies();
        await cookies.setCookies(context, access_token, userID, firstName);
        // Set cookies
        // await context.addCookies([
        //     {
        //         name: 'access_token',
        //         value: access_token,
        //         url: config.use?.baseURL,
        //     },
        //     {
        //         name: 'userID',
        //         value: userID,
        //         url: config.use?.baseURL
        //     },
        //     {
        //         name: 'firstName',
        //         value: firstName,
        //         url: config.use?.baseURL
        //     },
        // ])
    }
}