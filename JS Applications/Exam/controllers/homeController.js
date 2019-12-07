import {
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
            get("appdata", "treks", "Kinvey")
                .then((treks) => {
                    ctx.treks = treks.sort(function compare(a, b) {
                        if (a.likes < b.likes) {
                            return 1;
                        }
                        if (a.likes > b.likes) {
                            return -1;
                        }
                        // a must be equal to b
                        return 0;
                    });;

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