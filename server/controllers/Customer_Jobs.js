const models = require('../models');

const CustomerJobs = models.CustomerJobs;

// Renders the page for services and past services listed
const portalPage = (req, res) => {
  CustomerJobs.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    return res.render('userprofile', { csrfToken: req.csrfToken(), jobs: docs });
  });
};

// Creates a new job request
const makeRequest = (req, res) => {
  if (!req.body.service || !req.body.time || !req.body.address || !req.body.payment) {
    return res.status(400).json({ error: 'All fields required' });
  }

  const jobData = {
    service: req.body.service,
    time: req.body.time,
    address: req.body.address,
    payment: req.body.payment,
    owner: req.session.account_id,
  };

  const newJob = new CustomerJobs.CustomerJobsModel(jobData);

  const jobPromise = newJob.save();

  jobPromise.then(() => res.json({
    redirect: '/userprofile',
  }));

  jobPromise.catch((err) => {
    console.log(err);
    return res.status(400).json({ error: 'Something went wrong. Damnit Paul' });
  });

  return jobPromise;
};

// Gets all the past jobs submitted
const getJobs = (request, response) => {
  const req = request;
  const res = response;

  return CustomerJobs.CustomerJobsModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'Something went wrong. Damnit Paul' });
    }

    return res.json({ comics: docs });
  });
};

// Export functions
module.exports.portalPage = portalPage;
module.exports.makeRequest = makeRequest;
module.exports.getJobs = getJobs;