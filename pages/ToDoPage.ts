import { Page } from "@playwright/test";
import User from "../models/User";

export default class ToDoPage {
    private get welcomeMessage() {
        return 'welcome'
    }
    private get deleteIcon() {
        return 'delete'
    }
    private get noTodos() {
        return 'no-todos'
    }
    private get toDoText() {
        return 'todo-text'
    }
    getWelcomeMessageElement(page: Page) {
        return page.getByTestId(this.welcomeMessage)
    }
    async navigateToDoPage(page: Page) {
        await page.goto('/todo')
    }
    async deleteToDo(page: Page) {
        await page.getByTestId(this.deleteIcon).click();
    }
    async getNoToDoMessage(page: Page) {
        return page.getByTestId(this.noTodos)
    }
    getToDoInput(page: Page) {
        return page.getByTestId(this.toDoText)
    }

}