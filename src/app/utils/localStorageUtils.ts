export class LocalStorageUtils {

    public getUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    public saveLocalUserData(response: any) {
        this.saveToken(response.token);
        this.saveUser(response);
    }

    public cleanLocalUserData() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    public getToken(): string | null {
        return localStorage.getItem('token');
    }

    public saveToken(token: string) {
        localStorage.setItem('token', token);
    }

    public saveUser(user: string) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    public saveFilterData(filter:string) {
        localStorage.setItem('searchValue', filter);
    }

    public getFilterData() {
        return localStorage.getItem('searchValue');
    }

    public removeFilterData() {
        localStorage.removeItem('searchValue');
    }

}