import { homeController } from '../controllers/homeController.js';
import { userController } from '../controllers/userController.js';
import { catalogController } from '../controllers/catalogController.js';
import{ teamController } from '../controllers/teamController.js';

export default function Router(app){
    // Home Controller
    app.get('/', homeController.renderHome);
    app.get('#/home', homeController.renderHome);
    app.get('#/about', homeController.renderAbout);

    // User Controller
    app.get('#/register', userController.renderRegister);
    app.post('#/register', userController.postRegister);

    app.get('#/login', userController.renderLogin);
    app.post('#/login', userController.postLogin);

    app.get('#/logout', userController.logout);

    // Catalog Controller
    app.get('#/catalog', catalogController.renderCatalog);
    
    // Team Controller
    app.get('#/create', teamController.renderCreateTeam);
    app.post('#/create', teamController.postCreateTeam);
    
    app.get('#/edit/:teamId', teamController.renderEditTeam);
    app.post('#/edit/:teamId', teamController.postEditTeam);

    app.get('#/catalog/:id',teamController.renderTeamInfo);

    app.get('#/join/:teamId', teamController.joinToTeam);

    app.get('#/leave/:teamId', teamController.leaveTeam);
}
