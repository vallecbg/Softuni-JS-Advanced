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
        this.loadPartials(partials).then(function () {
            this.partial('../views/home/home.hbs');
        });
    },
};