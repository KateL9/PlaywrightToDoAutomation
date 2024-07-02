import { faker } from "@faker-js/faker";

export default class User {
    private email: string;
    private firstName: string;
    private lastName: string;
    private password: string;
    private accessToken: string;
    private userID: string;

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
    // Duplicated code ????
    getUserId() {
        return this.userID
    }
    setUserId(userID: string) {
        this.userID = userID
    }
    getAccessToken() {
        return this.accessToken
    }
    setAccessToken(accessToken: string) {
        this.accessToken = accessToken
    }
}