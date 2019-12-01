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
        displayLoading();
        if (username && password === rePassword) {
            post("user", "", {
                    username,
                    password
                }, "Basic")
                .then(userInfo => {
                    setSessionInfo(userInfo);
                    
                    displaySuccess("Registered successfully");
                    ctx.redirect("/");
                })
                .catch(() => {
                    displayError("Something went wrong with register!")
                })
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
        displayLoading();
        if (username && password) {
            post("user", "login", {
                    username,
                    password
                }, "Basic")
                .then(userInfo => {
                    setSessionInfo(userInfo);
                    
                    ctx.redirect("/");
                    displaySuccess("Signed in successfully");
                })
                .catch(() => {
                    displayError("Something went wrong with login!")
                })
        }
    },

    logout: function (ctx) {
        displayLoading();
        post("user", "_logout", {}, "Kinvey")
            .then(() => {
                sessionStorage.clear();
                displaySuccess("Log out successfully");
                ctx.redirect("/");
            })
            .catch(() => {
                displayError("Something went wrong with logout!")
            })
    },

    profile: function(ctx) {
        const id = ctx.params.id;
        getSessionInfo(ctx);
        setHeaderInfo(ctx);
        const partials = loadAllPartials({});

        get("appdata", `events?query={"_acl.creator":"${id}"}`, "Kinvey")
            .then(events => {
                ctx.events = events;
                ctx.eventsCount = events.length;

                this.loadPartials(partials)
                    .partial("../views/user/profile.hbs")
            })
            .catch(() => {
                displayError("Something went wrong with profile view!")
            })
    }
};