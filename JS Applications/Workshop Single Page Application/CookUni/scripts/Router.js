import { homeController } from '../controllers/homeController.js';
import { userController } from '../controllers/userController.js';
import { recipeController } from '../controllers/recipeController.js';

export default function Router(app){
    // Home Controller
    app.get('/', homeController.renderHome);

    //User Controller
    app.get("/register", userController.renderRegister);
    app.post("/register", userController.register);
    app.get("/login", userController.renderLogin);
    app.post("/login", userController.login);
    app.get("/logout", userController.logout)

    //Recepies
    app.get("/share", recipeController.getShare);
    app.post("/share", recipeController.postShare);

    app.get("/recipe/:id", recipeController.getDetails);
    app.get("edit/:id", recipeController.getEdit);
    app.post("edit/:id", recipeController.postEdit);
    app.get("archive/:id", recipeController.postDelete);
}
