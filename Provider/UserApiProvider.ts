import User from "../models/User";

export default class UserApiProvider {
    private userID: string;
    private accessToken: string;
    private user: User;

    constructor(user: User) {
        this.user = user
    }
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
    getUser() {
        return this.user
    }
}