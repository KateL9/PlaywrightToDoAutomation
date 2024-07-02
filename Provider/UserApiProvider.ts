export default class UserApiProvider {
    private userID: string;
    private accessToken: string;
    
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