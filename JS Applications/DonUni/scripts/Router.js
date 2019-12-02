import { homeController } from '../controllers/homeController.js';
import { userController } from '../controllers/userController.js';
import { causeController } from '../controllers/causeController.js';

export default function Router(app){
    // Home Controller
    app.get('/', homeController.renderHome);

    //User Controller
    app.get("/register", userController.renderRegister);
    app.post("/register", userController.register);
    app.get("/login", userController.renderLogin);
    app.post("/login", userController.login);
    app.get("/logout", userController.logout);
    
    //Cause Controller
    app.get("/create", causeController.getCreate);
    app.post("/create", causeController.postCreate);
    app.get("/dashboard", causeController.getDashboard);
    app.get("/details/:id", causeController.getDetails);
    app.post("/donate/:id", causeController.donate);
    app.get("/close/:id", causeController.close);
}
