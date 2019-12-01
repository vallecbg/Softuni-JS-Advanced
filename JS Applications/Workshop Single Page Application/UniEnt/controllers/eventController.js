import {
    getSessionInfo,
    loadAllPartials,
    setHeaderInfo,
    displayError,
    displaySuccess,
    displayLoading,
    getEvent
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
        const {
            name,
            dateTime,
            description,
            imageURL
        } = ctx.params;

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
                    displaySuccess("Organize posted successfully");
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

    getEdit: function (ctx) {
        const id = ctx.params.id;
        getSessionInfo(ctx);
        setHeaderInfo(ctx);
        const partials = loadAllPartials({});


        get("appdata", `events/${id}`, "Kinvey")
            .then(event => {
                ctx.event = event;

                this.loadPartials(partials)
                    .partial("../views/event/edit.hbs")
            })
            .catch(() => {
                displayError("Something went wrong with edit!")
            })
    },

    postEdit: function (ctx) {
        const id = ctx.params.id;
        const {
            name,
            dateTime,
            description,
            imageURL,
            organizer,
            peopleInterestedIn
        } = ctx.params;

        displayLoading();

        if (name && dateTime && description && imageURL && organizer && peopleInterestedIn) {
            put("appdata", `events/${id}`, {
                    name,
                    dateTime,
                    description,
                    imageURL,
                    organizer,
                    peopleInterestedIn
                }, "Kinvey")
                .then(() => {
                    displaySuccess("Successfully edited event.");
                    ctx.redirect("/");
                })
                .catch(() => {
                    displayError("Something went wrong with event editing!")
                })
        }
    },

    join: function (ctx) {
        const id = ctx.params.id;
        displayLoading();
        getEvent(id)
            .then(event => {
                event.isCreator = sessionStorage.getItem("userId") === event._acl.creator;
                event.peopleInterestedIn++;
                put("appdata", `events/${id}`, {
                    name: event.name,
                    dateTime: event.dateTime,
                    description: event.description,
                    imageURL: event.imageURL,
                    peopleInterestedIn: event.peopleInterestedIn,
                    organizer: event.organizer
                    }, "Kinvey")
                    .then(() => {
                        displaySuccess("Successfully joined event!")
                        ctx.redirect(`/details/${id}`);
                    })
                    .catch(() => {
                        displayError("Something went wrong with event joining!")
                    })
            })
    },
    delete: function (ctx) {
        const id = ctx.params.id;

        if (id) {
            del("appdata", `events/${id}`, "Kinvey")
                .then(() => {
                    displaySuccess("Successfully deleted event!");
                    ctx.redirect("/");
                })
                .catch(() => {
                    displayError("Something went wrong with event delete!")
                })
        }
    },


}