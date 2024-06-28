import { APIRequestContext, Page } from "@playwright/test";
import User from "../models/User";
import ToDoApi from "../apis/ToDoAPI";

export default class NewToDoPage {
    private get newTodoField() {
        return 'new-todo'
    }
    private get submitButon() {
        return 'submit-newTask'
    }
    // private get toDoText() {
    //     return 'todo-text'
    // }
    async navigateNewToDoPage(page: Page) {
        await page.goto('/todo/new')
    }
    async enterNewToDo(page: Page, text: string) {
        await page.getByTestId(this.newTodoField).fill(text)
    }
    async submitNewToDo(page: Page) {
        await page.getByTestId(this.submitButon).click();
    }
    async addToDoByApi(request: APIRequestContext, user:User) {
        await new ToDoApi().addToDoItem(request, user)
    }
}