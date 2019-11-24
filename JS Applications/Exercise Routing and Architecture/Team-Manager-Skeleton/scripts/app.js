import {
    get,
    post,
    put,
    del
} from "./requester.js"

(() => {
    const partials = {
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
    }

    const app = Sammy("#main", function () {
        this.use("Handlebars", "hbs");

        this.get("#/", loadHome);
        this.get("#/home", loadHome);

        this.get("#/about", function (ctx) {
            getSessionInfo(ctx);

            this.loadPartials(partials)
                .then(function () {
                    this.partial("./templates/about/about.hbs")
                })
        })

        this.get("#/login", function (ctx) {
            getSessionInfo(ctx);

            partials["loginForm"] = "./templates/login/loginForm.hbs";

            this.loadPartials(partials)
                .then(function () {
                    this.partial("./templates/login/loginPage.hbs")
                })
        })

        this.get("#/logout", function (ctx) {
            sessionStorage.clear();
            ctx.redirect("#/home");
        })

        this.post("#/login", function (ctx) {
            const {username, password} = ctx.params;
            
            post("user", "login", {username, password}, "Basic")
            .then(userInfo => {
                sessionStorage.setItem("authtoken", userInfo._kmd.authtoken);
                sessionStorage.setItem("username", userInfo.username);
                ctx.redirect("#/home");
            })
            .catch(console.error);

            
        })

        this.get("#/register", function (ctx) {
            getSessionInfo(ctx);

            partials["registerForm"] = "./templates/register/registerForm.hbs";

            this.loadPartials(partials)
                .then(function () {
                    this.partial("./templates/register/registerPage.hbs")
                })
        })

        this.post("#/register", function (ctx) {
            const {
                username,
                password,
                repeatPassword
            } = ctx.params;

            post("user", "", {username, password}, "Basic")
                .then(data => {
                    console.log(data);
                    ctx.redirect("#/login");
                })
                .catch(console.error)

            
        });

        function loadHome(ctx) {
            getSessionInfo(ctx);
    
            this.loadPartials(partials)
                .then(function () {
                    this.partial("./templates/home/home.hbs")
                });
        }

        function getSessionInfo(ctx) {
            ctx.loggedIn = sessionStorage.getItem("authtoken") !== null;
            ctx.username = sessionStorage.getItem("username");
        }
    });

    app.run();
})()