import Router from '../scripts/Router.js';

const app = Sammy('#rooter', function () {

    this.use('Handlebars', 'hbs');

    Router(this);
    
});


app.run();