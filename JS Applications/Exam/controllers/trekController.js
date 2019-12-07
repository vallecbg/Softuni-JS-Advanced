import {
    getSessionInfo,
    loadAllPartials,
    setHeaderInfo,
    displayError,
    displaySuccess,
    displayLoading,
    getTrek
} from '../scripts/helpers.js';
import {
    get,
    post,
    put,
    del
} from '../scripts/requester.js';

export const trekController = {
    getRequest: function (ctx) {
        getSessionInfo(ctx);
        setHeaderInfo(ctx);
        const partials = loadAllPartials({});

        this.loadPartials(partials).then(function () {
            this.partial('../views/trek/request.hbs');
        });
    },

    postRequest: function (ctx) {
        const {
            location,
            dateTime,
            description,
            imageURL
        } = ctx.params;


        if (location.length >= 6 && description.length >= 10 && dateTime && imageURL) {
            displayLoading();
            post("appdata", "treks", {
                    location,
                    dateTime,
                    description,
                    imageURL,
                    organizer: localStorage.getItem("username"),
                    likes: 0
                }, "Kinvey")
                .then(() => {
                    displaySuccess("Trek created successfully");
                    ctx.redirect("/");
                })
                .catch(() => {
                    displayError("Invalid input!")
                })
        } else {
            displayError("Invalid input!")
        }
    },

    getDetails: function (ctx) {
        const id = ctx.params.id;
        getSessionInfo(ctx);
        setHeaderInfo(ctx);
        const partials = loadAllPartials({});

        get("appdata", `treks/${id}`, "Kinvey")
            .then(trek => {
                trek.isCreator = localStorage.getItem("userId") === trek._acl.creator;
                console.log(trek);

                ctx.trek = trek;
                this.loadPartials(partials)
                    .partial("../views/trek/details.hbs")
            })
            .catch(() => {
                displayError("Something went wrong with details!")
            })
    },

    like: function (ctx) {
        const id = ctx.params.id;
        displayLoading();
        getTrek(id)
            .then(trek => {
                trek.isCreator = localStorage.getItem("userId") === trek._acl.creator;
                trek.likes++;
                put("appdata", `treks/${id}`, {
                        location: trek.location,
                        dateTime: trek.dateTime,
                        description: trek.description,
                        imageURL: trek.imageURL,
                        likes: trek.likes,
                        organizer: trek.organizer
                    }, "Kinvey")
                    .then(() => {
                        displaySuccess("Successfully liked the trek!")
                        ctx.redirect(`/details/${id}`);
                    })
                    .catch(() => {
                        displayError("Something went wrong with trek like!")
                    })
            })
    },

    getEdit: function (ctx) {
        const id = ctx.params.id;
        getSessionInfo(ctx);
        setHeaderInfo(ctx);
        const partials = loadAllPartials({});


        get("appdata", `treks/${id}`, "Kinvey")
            .then(trek => {
                ctx.trek = trek;

                this.loadPartials(partials)
                    .partial("../views/trek/edit.hbs")
            })
            .catch(() => {
                displayError("Something went wrong with edit!")
            })
    },

    postEdit: function (ctx) {
        const id = ctx.params.id;
        const {
            location,
            dateTime,
            description,
            imageURL,
            organizer,
            likes
        } = ctx.params;


        if (location.length >= 6 && description.length >= 10 && dateTime && imageURL && organizer && likes) {
            displayLoading();
            put("appdata", `treks/${id}`, {
                    location,
                    dateTime,
                    description,
                    imageURL,
                    organizer,
                    likes
                }, "Kinvey")
                .then(() => {
                    displaySuccess("Successfully edited trek.");
                    ctx.redirect(`/`);
                })
                .catch(() => {
                    displayError("Invalid input!")
                })
        } else {
            displayError("Invalid input!")
        }
    },

    delete: function (ctx) {
        const id = ctx.params.id;

        if (id) {
            displayLoading();
            del("appdata", `treks/${id}`, "Kinvey")
                .then(() => {
                    displaySuccess("Successfully deleted trek!");
                    ctx.redirect("/");
                })
                .catch(() => {
                    displayError("Something went wrong with trek delete!")
                })
        } else {
            displayError("Something went wrong with trek delete!")
        }
    },
}