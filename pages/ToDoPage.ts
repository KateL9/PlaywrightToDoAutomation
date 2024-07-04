import { Page } from "@playwright/test";

export default class ToDoPage {
    private get welcomeMessage() {
        return `[data-testid=welcome]`
    }
    private get deleteIcon() {
        return '[data-testid=delete]'
    }
    private get noTodos() {
        return 'no-todos'
    }
    private get toDoText() {
        return 'todo-text'
    }
    getWelcomeMessageElement(page: Page) {
        return page.locator(this.welcomeMessage);
    }
    async navigateToDoPage(page: Page) {
        await page.goto('/todo');
    }
    async deleteToDo(page: Page) {
        await page.click(this.deleteIcon);
    }
    async getNoToDoMessage(page: Page) {
        return page.getByTestId(this.noTodos)
    }
    getToDoInput(page: Page) {
        return page.getByTestId(this.toDoText)
    }
}