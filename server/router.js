// Get the controllers and middleware
const mid = require('./middleware');
const controllers = require('./controllers');

// Set up all the routes for the app
const router = (app) => {
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupComp);
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupComp);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.LoginComp);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
};

// Export the router
module.exports = router;

