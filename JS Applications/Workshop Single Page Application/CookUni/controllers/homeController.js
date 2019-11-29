import {
    getSessionInfo,
    loadAllPartials,
    setHeaderInfo
} from '../scripts/helpers.js';
import {
    get
} from '../scripts/requester.js';



export const homeController = {
    renderHome: function (ctx) {
        setHeaderInfo(ctx);
        const partials = loadAllPartials({});
        if (ctx.isAuth) {
            get("appdata", "recipes", "Kinvey")
                .then((recipes) => {
                    ctx.recipes = recipes;

                    this.loadPartials(partials).then(function () {
                        this.partial('../views/home/home.hbs');
                    });
                })
        } else {
            this.loadPartials(partials).then(function () {
                this.partial('../views/home/home.hbs');
            });
        }



    },
};