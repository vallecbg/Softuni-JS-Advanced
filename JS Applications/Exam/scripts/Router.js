import { homeController } from '../controllers/homeController.js';
import { userController } from '../controllers/userController.js';
import { trekController } from '../controllers/trekController.js';

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

    //Trek Controller
    app.get("/request", trekController.getRequest);
    app.post("/request", trekController.postRequest);
    app.get("/details/:id", trekController.getDetails);
    app.get("/like/:id", trekController.like);
    app.get("/edit/:id", trekController.getEdit);
    app.post("/edit/:id", trekController.postEdit);
    app.get("/delete/:id", trekController.delete);
}
