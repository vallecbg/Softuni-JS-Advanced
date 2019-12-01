import { homeController } from '../controllers/homeController.js';
import { userController } from '../controllers/userController.js';
import { eventController } from '../controllers/eventController.js';

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

    //Events Controller
    app.get("/organize", eventController.getOrganize);
    app.post("/organize", eventController.postOrganize);
    app.get("/details/:id", eventController.getDetails);
    app.get("/edit/:id", eventController.getEdit);
    app.post("/edit/:id", eventController.postEdit);
    app.get("/join/:id", eventController.join);
    app.get("/delete/:id", eventController.delete);
}
