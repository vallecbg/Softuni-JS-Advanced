import {
    getSessionInfo,
    loadAllPartials,
    setSessionInfo,
    displayError,
    displaySuccess,
    displayLoading,
    setHeaderInfo
} from '../scripts/helpers.js';
import {
    get,
    post,
    put,
    del
} from '../scripts/requester.js';


export const userController = {
    renderRegister: function (ctx) {
        getSessionInfo(ctx);
        const partials = loadAllPartials({});

        this.loadPartials(partials).then(function () {
            this.partial('../views/auth/register.hbs');
        });
    },

    register: function (ctx) {
        const {
            username,
            password,
            rePassword
        } = ctx.params;
        
        if (username.length >= 3 && password.length >= 6 && password === rePassword) {
            displayLoading();
            post("user", "", {
                    username,
                    password
                }, "Basic")
                .then(userInfo => {
                    setSessionInfo(userInfo);
                    
                    displaySuccess("Successfully registered user.");
                    ctx.redirect("/");
                })
                .catch(() => {
                    displayError("Invalid credentials. Please retry your request with correct credentials!")
                })
        } else {
            displayError("Invalid credentials. Please retry your request with correct credentials!")
        }
    },

    renderLogin: function (ctx) {
        getSessionInfo(ctx);
        const partials = loadAllPartials({});

        this.loadPartials(partials).then(function () {
            this.partial('../../views/auth/login.hbs');
        });
    },

    login: function (ctx) {
        const {
            username,
            password
        } = ctx.params;
        if (username.length >= 3 && password.length >= 6) {
            displayLoading();
            post("user", "login", {
                    username,
                    password
                }, "Basic")
                .then(userInfo => {
                    setSessionInfo(userInfo);
                    
                    ctx.redirect("/");
                    displaySuccess("Successfully logged user.");
                })
                .catch(() => {
                    displayError("Invalid credentials. Please retry your request with correct credentials!")
                })
        } else {
            displayError("Invalid credentials. Please retry your request with correct credentials!")
        }
    },

    logout: function (ctx) {
        displayLoading();
        post("user", "_logout", {}, "Kinvey")
            .then(() => {
                localStorage.clear();
                displaySuccess("Logout successful.");
                ctx.redirect("/");
            })
            .catch(() => {
                displayError("Invalid credentials. Please retry your request with correct credentials!")
            })
    },

    profile: function(ctx) {
        const id = ctx.params.id;
        getSessionInfo(ctx);
        setHeaderInfo(ctx);
        const partials = loadAllPartials({});

        get("appdata", `treks?query={"_acl.creator":"${id}"}`, "Kinvey")
            .then(treks => {
                ctx.treks = treks;
                ctx.treksCount = treks.length;

                this.loadPartials(partials)
                    .partial("../views/user/profile.hbs")
            })
            .catch(() => {
                displayError("Something went wrong with profile view!")
            })
    }
};