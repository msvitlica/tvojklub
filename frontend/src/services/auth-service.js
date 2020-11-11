const authentication = JSON.parse(localStorage.getItem('authentication'));
class Auth {
    constructor() {
        this.authenticated = authentication ? authentication.isAuthenticated : false;
    }

    login(cb) {
        this.authenticated = true;
        cb();
        localStorage.setItem('authentication', JSON.stringify({ isAuthenticated: this.authenticated }));
    }

    logout(cb) {
        this.authenticated = false;
        cb();
        localStorage.setItem('authentication', JSON.stringify({ isAuthenticated: this.authenticated }));
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();