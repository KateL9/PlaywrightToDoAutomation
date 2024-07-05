import { APIRequestContext, Page } from "@playwright/test";
import ToDoApi from "../apis/ToDoAPI";
import UserApiProvider from "../Provider/UserApiProvider";

export default class NewToDoPage {
    private get newTodoField() {
        return 'new-todo'
    }
    private get submitButon() {
        return 'submit-newTask'
    }
    async navigateNewToDoPage(page: Page) {
        await page.goto('/todo/new')
    }
    async enterNewToDo(page: Page, text: string) {
        await page.getByTestId(this.newTodoField).fill(text)
    }
    async submitNewToDo(page: Page) {
        await page.getByTestId(this.submitButon).click();
    }
    async addToDoByApi(request: APIRequestContext, userApiProvider: UserApiProvider) {
        await new ToDoApi().addToDoItem(request, userApiProvider);
    }
}