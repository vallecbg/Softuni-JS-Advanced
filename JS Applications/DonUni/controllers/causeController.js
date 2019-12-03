import {
    getSessionInfo,
    loadAllPartials,
    setHeaderInfo,
    displayError,
    displaySuccess,
    displayLoading,
    getCause
} from '../scripts/helpers.js';
import {
    get,
    post,
    put,
    del
} from '../scripts/requester.js';

export const causeController = {
    getCreate: function (ctx) {
        getSessionInfo(ctx);
        setHeaderInfo(ctx);
        const partials = loadAllPartials({});

        this.loadPartials(partials).then(function () {
            this.partial('../views/cause/create.hbs');
        });
    },

    postCreate: function (ctx) {
        const {
            cause,
            pictureUrl,
            neededFunds,
            description
        } = ctx.params;

        displayLoading();

        if (cause && pictureUrl && neededFunds && description) {
            post("appdata", "causes", {
                    cause,
                    pictureUrl,
                    neededFunds: parseFloat(neededFunds),
                    description,
                    donors: [],
                    collectedFunds: 0
                }, "Kinvey")
                .then(() => {
                    displaySuccess("Cause posted successfully");
                    ctx.redirect("/");
                })
                .catch(() => {
                    displayError("Something went wrong with cause creating!")
                })
        }
    },

    getDashboard: function (ctx) {
        getSessionInfo(ctx);
        setHeaderInfo(ctx);
        const partials = loadAllPartials({});

        get("appdata", `causes`, "Kinvey")
            .then(causes => {

                ctx.causes = causes;
                this.loadPartials(partials)
                    .partial("../views/cause/dashboard.hbs")
            })
            .catch(() => {
                displayError("Something went wrong with details!")
            })
    },

    getDetails: function (ctx) {
        const id = ctx.params.id;
        getSessionInfo(ctx);
        setHeaderInfo(ctx);
        const partials = loadAllPartials({});

        get("appdata", `causes/${id}`, "Kinvey")
            .then(cause => {
                cause.isCreator = sessionStorage.getItem("userId") === cause._acl.creator;
                //cause.donors = cause.donors.join(" ");
                ctx.cause = cause;

                this.loadPartials(partials)
                    .partial("../views/cause/details.hbs")
            })
            .catch(() => {
                displayError("Something went wrong with details!")
            })
    },

    donate: function (ctx) {
        const id = ctx.params.id;
        getSessionInfo(ctx);
        setHeaderInfo(ctx);
        const partials = loadAllPartials({});
        const username = sessionStorage.getItem("username");
        const donation = parseFloat(ctx.params.currentDonation);
        displayLoading();

        if (donation) {
            getCause(id)
                .then(cause => {
                    if (!cause.donors.includes(username)) {
                        cause.donors.push(username);
                    }

                    cause.collectedFunds += donation;
                    put("appdata", `causes/${id}`, {
                            cause: cause.cause,
                            donors: cause.donors,
                            pictureUrl: cause.pictureUrl,
                            neededFunds: cause.neededFunds,
                            description: cause.description,
                            collectedFunds: cause.collectedFunds
                        }, "Kinvey")
                        .then(() => {
                            displaySuccess("Successfully donated!")
                            ctx.redirect(`/details/${id}`);
                        })
                        .catch(() => {
                            displayError("Something went wrong with donate!")
                        })
                })
        }
    },

    delete: function (ctx) {
        const id = ctx.params.id;
        getSessionInfo(ctx);
        setHeaderInfo(ctx);
        const partials = loadAllPartials({});
        displayLoading();

        del("appdata", `causes/${id}`, "Kinvey")
            .then(() => {
                displaySuccess("Successfully deleted!")
                ctx.redirect(`/`);
            })
            .catch(() => {
                displayError("Something went wrong with delete!")
            })
    }
}