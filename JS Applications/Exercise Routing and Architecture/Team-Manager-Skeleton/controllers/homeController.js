import { getSessionInfo, loadAllPartials } from '../scripts/helpers.js';


export const homeController ={
    renderHome: function (ctx) {
        getSessionInfo(ctx);
        const partials = loadAllPartials({});

        ctx.hasTeam = sessionStorage.getItem("teamId") !== null;

        this.loadPartials(partials).then(function (){
            this.partial('../templates/home/home.hbs');
        });
    },
    renderAbout: function (ctx) {
        getSessionInfo(ctx);
        const partials = loadAllPartials({});
        
        this.loadPartials(partials).then(function (){
            this.partial('../templates/about/about.hbs');
        });
    },
};
