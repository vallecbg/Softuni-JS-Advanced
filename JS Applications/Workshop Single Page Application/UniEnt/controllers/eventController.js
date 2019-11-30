import {
    getSessionInfo,
    loadAllPartials,
    setHeaderInfo,
    displayError,
    displaySuccess,
    displayLoading
} from '../scripts/helpers.js';
import {
    get,
    post,
    put,
    del
} from '../scripts/requester.js';

export const eventController = {
    getOrganize: function (ctx) {
        getSessionInfo(ctx);
        setHeaderInfo(ctx);
        const partials = loadAllPartials({});

        this.loadPartials(partials).then(function () {
            this.partial('../views/event/organize.hbs');
        });
    },

    postOrganize: function (ctx) {
        const {name, dateTime, description, imageURL} = ctx.params;

        displayLoading();

        if (name && dateTime && description && imageURL) {
            post("appdata", "events", {
                name, 
                dateTime, 
                description, 
                imageURL,
                organizer: sessionStorage.getItem("username"),
                peopleInterestedIn: 0
            }, "Kinvey")
                .then(() => {
                    displaySuccess("Success");
                    ctx.redirect("/");
                })
                .catch(() => {
                    displayError("Something went wrong with event creating!")
                })
        }
    },

    getDetails: function (ctx) {
        const id = ctx.params.id;
        getSessionInfo(ctx);
        setHeaderInfo(ctx);
        const partials = loadAllPartials({});

        get("appdata", `events/${id}`, "Kinvey")
            .then(event => {
                event.isCreator = sessionStorage.getItem("userId") === event._acl.creator;

                ctx.event = event;
                this.loadPartials(partials)
                    .partial("../views/event/details.hbs")
            })
            .catch(() => {
                displayError("Something went wrong with details!")
            })
    },

    
}