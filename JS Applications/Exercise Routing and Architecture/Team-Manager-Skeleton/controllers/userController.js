import { passwordCheck, loadAllPartials, setSessionInfo } from '../scripts/helpers.js';
import { post } from '../scripts/requester.js';

export const userController = {
    renderRegister: function (ctx) {
        const partials = loadAllPartials({ registerForm: '../templates/register/registerForm.hbs' });

        this.loadPartials(partials)
            .then(function (){
                this.partial('../templates/register/registerPage.hbs');
            });
    },

    postRegister: function (ctx){
        const { username, password, repeatPassword } = ctx.params;

        if (passwordCheck(password, repeatPassword)){
            post('user', '', { username, password }, 'Basic')
                .then(userInfo => {
                    setSessionInfo(userInfo);
                    ctx.redirect('#/home');
                })
                .catch(console.error);
        }
    },

    renderLogin: function (ctx){
        const partials = loadAllPartials({ loginForm: '../templates/login/loginForm.hbs' });
 
        this.loadPartials(partials)
            .then(function () {
                this.partial('../templates/login/loginPage.hbs');
            });
    },

    postLogin: function (ctx) {
        const { username, password } = ctx.params;

        post('user','login', { username, password }, 'Basic')
            .then(userInfo =>{
                setSessionInfo(userInfo);
                ctx.redirect('#/home'); 
            })
            .catch(err => {
                alert('Wrong username or password! Pleas try again.');
                console.error(err); 
            });
    },
    
    logout: function (ctx){
        post('user', '_logout', {}, 'Kinvey')
            .then(res => {
                sessionStorage.clear();
                ctx.redirect('#/home');
            })
            .catch(err => {
                console.error(err);
            });
    },
};

