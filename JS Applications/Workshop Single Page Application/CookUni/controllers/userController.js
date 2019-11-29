import {
    getSessionInfo,
    loadAllPartials,
    setSessionInfo,
    displayError,
    displaySuccess
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
            firstName,
            lastName,
            username,
            password,
            repeatPassword
        } = ctx.params;

        if (firstName && lastName && username && password === repeatPassword) {
            post("user", "", {
                    firstName,
                    lastName,
                    username,
                    password
                }, "Basic")
                .then(userInfo => {
                    setSessionInfo(userInfo);
                    displaySuccess("Success");
                    ctx.redirect("/");
                })
                .catch(() => {
                    displayError("Something went wrong!")
                })
        }
    },

    renderLogin: function (ctx) {
        getSessionInfo(ctx);
        const partials = loadAllPartials({});

        this.loadPartials(partials).then(function () {
            this.partial('../views/auth/login.hbs');
        });
    },

    login: function (ctx) {
        const {
            username,
            password
        } = ctx.params;

        if (username && password) {
            post("user", "login", {
                    username,
                    password
                }, "Basic")
                .then(userInfo => {
                    setSessionInfo(userInfo);
                    displaySuccess("Success");
                    ctx.redirect("/");
                })
                .catch(() => {
                    displayError("Something went wrong!")
                })
        }
    },

    logout: function (ctx) {
        post("user", "_logout", {}, "Kinvey")
            .then(() => {
                sessionStorage.clear();
                displaySuccess("Success");
                ctx.redirect("/");
            })
            .catch(() => {
                displayError("Something went wrong!")
            })
    },
};