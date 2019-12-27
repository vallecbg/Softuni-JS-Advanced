import {
    getSessionInfo,
    loadAllPartials,
    setHeaderInfo,
    displayError,
    displaySuccess,
    displayLoading,
    getIdea
} from '../scripts/helpers.js';
import {
    get,
    post,
    put,
    del
} from '../scripts/requester.js';

export const ideaController = {
    getRequest: function (ctx) {
        getSessionInfo(ctx);
        setHeaderInfo(ctx);
        const partials = loadAllPartials({});

        this.loadPartials(partials).then(function () {
            this.partial('../views/idea/create.hbs');
        });
    },

    postRequest: function (ctx) {
        const {
            title,
            description,
            imageURL
        } = ctx.params;


        if (title.length >= 6 && description.length >= 10 && imageURL.startsWith("http://") || imageURL.startsWith("https://")) {
            displayLoading();
            post("appdata", "ideas", {
                    title,
                    description,
                    imageURL,
                    creator: localStorage.getItem("username"),
                    likes: 0,
                    comments: []
                }, "Kinvey")
                .then(() => {
                    displaySuccess("Idea created successfully");
                    ctx.redirect("/dashboard");
                })
                .catch(() => {
                    displayError("Something went wrong!")
                })
        } else {
            displayError("Something went wrong!")
        }
    },

    getDetails: function (ctx) {
        const id = ctx.params.id;
        getSessionInfo(ctx);
        setHeaderInfo(ctx);
        const partials = loadAllPartials({});

        get("appdata", `ideas/${id}`, "Kinvey")
            .then(idea => {
                idea.isCreator = localStorage.getItem("userId") === idea._acl.creator;

                ctx.idea = idea;
                this.loadPartials(partials)
                    .partial("../views/idea/details.hbs")
            })
            .catch(() => {
                displayError("Something went wrong with details!")
            })
    },

    like: function (ctx) {
        const id = ctx.params.id;
        
        getIdea(id)
            .then(idea => {
                displayLoading();
                idea.isCreator = localStorage.getItem("userId") === idea._acl.creator;
                idea.likes++;
                put("appdata", `ideas/${id}`, {
                        title: idea.title,
                        description: idea.description,
                        imageURL: idea.imageURL,
                        creator: idea.creator,
                        likes: idea.likes,
                        comments: idea.comments
                    }, "Kinvey")
                    .then(() => {
                        displaySuccess("Successfully liked the idea!")
                        ctx.redirect(`/details/${id}`);
                    })
                    .catch(() => {
                        displayError("Something went wrong with idea like!")
                    })
        })
    },

    comment: function (ctx) {
        const id = ctx.params.id;
        const newComment = ctx.params.newComment;
        const username = localStorage.getItem("username");

        if(newComment !== ""){
        getIdea(id)
            .then(idea => {
                displayLoading();
                idea.isCreator = localStorage.getItem("userId") === idea._acl.creator;
                idea.comments.push(`${username} : ${newComment}`);
                put("appdata", `ideas/${id}`, {
                        title: idea.title,
                        description: idea.description,
                        imageURL: idea.imageURL,
                        creator: idea.creator,
                        likes: idea.likes,
                        comments: idea.comments
                    }, "Kinvey")
                    .then(() => {
                        displaySuccess("Successfully commented the idea!")
                        ctx.redirect(`/details/${id}`);
                    })
                    .catch(() => {
                        displayError("Something went wrong with idea comment!")
                    })
        })
        } else {
            displayError("You cannot add an empty comment!")
        }
    },

    delete: function (ctx) {
        const id = ctx.params.id;

        if (id) {
            displayLoading();
            del("appdata", `ideas/${id}`, "Kinvey")
                .then(() => {
                    displaySuccess("Idea deleted successfully!");
                    ctx.redirect("/dashboard");
                })
                .catch(() => {
                    displayError("Something went wrong with idea delete!")
                })
        } else {
            displayError("Something went wrong with idea delete!")
        }
    },
}