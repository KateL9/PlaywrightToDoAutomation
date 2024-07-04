import { faker } from "@faker-js/faker";

export default class User {
    private email: string;
    private firstName: string;
    private lastName: string;
    private password: string;

    constructor() {
        this.email = faker.internet.email();
        this.firstName = faker.person.firstName();
        this.lastName =  faker.person.lastName();
        this.password = 'Password1!';
    }
    getEmail() {
        return this.email
    }
    getFirstName() {
        return this.firstName
    }
    getLastName() {
        return this.lastName
    }
    getPassword() {
        return this.password
    }
}