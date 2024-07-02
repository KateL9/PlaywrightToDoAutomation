import { APIRequestContext } from "@playwright/test";
import User from "../models/User";

export default class UserApi {
    async signUp ( request: APIRequestContext, user: User ) {
        return await request.post('api/v1/users/register', {
            data: {
                email: user.getEmail(),
                firstName: user.getFirstName(),
                lastName: user.getLastName(),
                password: user.getPassword(),
            }
        });
    }
    async login (request: APIRequestContext) {
        return await request.post('api/v1/users/login', {
            // const email = process.env.TEST_USER_EMAIL;
            // const password = process.env.TEST_USER_PASSWORD;
            data: {
                email: 'emailTest@email.com',
                password: 'Password1!',
            }
        });
    }
}