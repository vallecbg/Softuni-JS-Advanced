import { homeController } from '../controllers/homeController.js';
import { userController } from '../controllers/userController.js';
import { ideaController } from '../controllers/ideaController.js';

export default function Router(app){
    // Home Controller
    app.get('/', homeController.renderHome);

    //Users Controller
    app.get("/register", userController.renderRegister);
    app.post("/register", userController.register);
    app.get("/login", userController.renderLogin);
    app.post("/login", userController.login);
    app.get("/logout", userController.logout);
    app.get("/profile/:id", userController.profile);

    app.get("/dashboard", homeController.renderDashboard);

    //Ideas Controller
    app.get("/create", ideaController.getRequest);
    app.post("/create", ideaController.postRequest);
    app.get("/details/:id", ideaController.getDetails);
    app.get("/like/:id", ideaController.like);
    app.post("/comment/:id", ideaController.comment);
    app.get("/delete/:id", ideaController.delete);
}
