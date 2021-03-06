// Set up Worker account controller
const models = require('../models');

const WorkerAccount = models.WorkerAccount;

// Set up login logic
const login = (request, response) => {
    // Reassign passed in params
  const req = request;
  const res = response;

    // Cast to string to help with security flaws
  const email = `${req.body.email}`;
  const password = `${req.body.pass}`;

  if (!email || !password) {
    return res.status(400).json({ error: 'All fields needed to make sure its you' });
  }

  return WorkerAccount.WorkerAccountModel.authenticate(email, password, (err, account) => {
    if (err || !account) {
      console.log(email, ' ', password);
      return res.status(401).json({ error: 'No record of that email and password combination' });
    }

    req.session.account = WorkerAccount.WorkerAccountModel.toAPI(account);

    return res.json({ redirect: '/workerprofile' });
  });
};

// Set up signup as a Worker logic
const signup = (request, response) => {
  // Reassigned passed in params
  const req = request;
  const res = response;

  // Cast to string to help with security flaws
  req.body.first = `${req.body.first}`;
  req.body.last = `${req.body.last}`;
  req.body.email = `${req.body.email}`;
  req.body.phone = `${req.body.phone}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;
  req.body.invite = `${req.body.invite}`;

    // Check for lack of fields
  if (!req.body.first || !req.body.last
    || !req.body.email || !req.body.phone
    || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'We need all fields filled to create a profile' });
  }

    // Check that the same password was entered in both fields
  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

    // Generate a new encrypted password hash and salt
    // They will be stored in the db and send a JSON response for success/failure
  return WorkerAccount.WorkerAccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      firstname: req.body.first,
      lastname: req.body.last,
      email: req.body.email,
      phone: req.body.phone,
      salt,
      password: hash,
    };

    const newAccount = new WorkerAccount.WorkerAccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = WorkerAccount.WorkerAccountModel.toAPI(newAccount);
      res.json({ redirect: '/workerprofile' });
    });

    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({ error: 'We already have an account associated with that email' });
      }

      return res.status(400).json({ error: 'We apologize, something has gone wrong' });
    });
  });
};

const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJson = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJson);
};

// Export all the functions
module.exports.login = login;
module.exports.signup = signup;
module.exports.getToken = getToken;
