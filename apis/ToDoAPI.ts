import { APIRequestContext } from "@playwright/test";
import UserApiProvider from "../Provider/userApiProvider";

export default class ToDoApi {
    async addToDoItem(request: APIRequestContext, userApiProvider: UserApiProvider) {
        await request.post('/api/v1/tasks', {
            data: {
                isCompleted: false,
                item: 'Learn Playwright'
            },
            headers: {
                Authorization: `Bearer ${userApiProvider.getAccessToken()}`
            }
        })
    }
}