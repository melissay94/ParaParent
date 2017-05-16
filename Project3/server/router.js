// Get the controllers and middleware
const mid = require('./middleware');
const controllers = require('./controllers');

// Set up all the routes for the app
const router = (app) => {
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.UserAccount.signupComp);
  app.get('/getToken', mid.requiresSecure, controllers.UserAccount.getToken);
  app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.UserAccount.signupComp);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.UserAccount.loginComp);
  app.get('/logout', mid.requiresLogin, controllers.UserAccount.logout);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.UserAccount.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.UserAccount.signup);
};

// Export the router
module.exports = router;

