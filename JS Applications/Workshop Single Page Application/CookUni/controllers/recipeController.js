import {
    getSessionInfo,
    loadAllPartials,
    setHeaderInfo,
    displayError,
    displaySuccess
} from '../scripts/helpers.js';
import {
    get,
    post,
    put,
    del
} from '../scripts/requester.js';

export const recipeController = {
    getShare: function (ctx) {
        getSessionInfo(ctx);
        setHeaderInfo(ctx);
        const partials = loadAllPartials({});

        this.loadPartials(partials).then(function () {
            this.partial('../views/recipe/share.hbs');
        });
    },

    postShare: function (ctx) {
        const {meal, ingredients, prepMethod, description, foodImageURL, category } = ctx.params;

        const categories = {
            'Vegetables and legumes/beans': "https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg",
            'Grain Food': 'https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg',
            'Fruits': 'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg',
            'Milk, cheese, eggs and alternatives': 'https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg',
            'Lean meats and poultry, fish and alternatives': 'https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg'
        }

        if (meal && ingredients && prepMethod && description && foodImageURL && category) {
            post("appdata", "recipes", {
                meal, 
                ingredients: ingredients.split(" "), 
                prepMethod, 
                description, 
                foodImageURL, 
                category,
                likesCounter: 0,
                categoryImageURL: categories[category]
            }, "Kinvey")
                .then(recipeInfo => {
                    displaySuccess("Success");
                    ctx.redirect("/");
                })
                .catch(() => {
                    displayError("Something went wrong!")
                })
        }
    },

    getDetails: function (ctx) {
        const id = ctx.params.id;
        getSessionInfo(ctx);
        setHeaderInfo(ctx);
        const partials = loadAllPartials({});


        get("appdata", `recipes/${id}`, "Kinvey")
            .then(recipe => {
                recipe.isCreator = sessionStorage.getItem("userId") === recipe._acl.creator;

                ctx.recipe = recipe;
                this.loadPartials(partials)
                    .partial("../views/recipe/details.hbs")
            })
            .catch(() => {
                displayError("Something went wrong!")
            })
    },

    getEdit: function (ctx) {
        const id = ctx.params.id;
        getSessionInfo(ctx);
        setHeaderInfo(ctx);
        const partials = loadAllPartials({});


        get("appdata", `recipes/${id}`, "Kinvey")
            .then(recipe => {
                recipe.ingredients = recipe.ingredients.join(" ");
                ctx.recipe = recipe;

                this.loadPartials(partials)
                    .partial("../views/recipe/edit.hbs")
            })
            .catch(() => {
                displayError("Something went wrong!")
            })
    },

    postEdit: function (ctx) {
        const id = ctx.params.id;
        const {meal, ingredients, prepMethod, description, foodImageURL, category } = ctx.params;

        const categories = {
            'Vegetables and legumes/beans': "https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg",
            'Grain Food': 'https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg',
            'Fruits': 'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg',
            'Milk, cheese, eggs and alternatives': 'https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg',
            'Lean meats and poultry, fish and alternatives': 'https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg'
        }

        if (meal && ingredients && prepMethod && description && foodImageURL && category) {
            put("appdata", `recipes/${id}`, {
                meal, 
                ingredients: ingredients.split(" "), 
                prepMethod, 
                description, 
                foodImageURL, 
                category,
                categoryImageURL: categories[category],
                likesCounter: 0
            }, "Kinvey")
                .then(recipeInfo => {
                    displaySuccess("Success");
                    ctx.redirect("/");
                })
                .catch(() => {
                    displayError("Something went wrong!")
                })
        }
    },

    postDelete: function (ctx) {
        const id = ctx.params.id;

        if (id) {
            del("appdata", `recipes/${id}`, "Kinvey")
                .then(x => {
                    displaySuccess("Success");
                    ctx.redirect("/");
                })
                .catch(() => {
                    displayError("Something went wrong!")
                })
        }
    },

    
}