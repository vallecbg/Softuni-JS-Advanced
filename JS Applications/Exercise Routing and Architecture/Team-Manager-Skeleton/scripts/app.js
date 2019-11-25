import Router from '../scripts/Router.js';

const app = Sammy('#main', function () {

    this.use('Handlebars', 'hbs');

    Router(this);
    
});


app.run();


