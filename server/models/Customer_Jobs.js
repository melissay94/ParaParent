const mongoose = require('mongoose');
const _ = require('underscore');

mongoose.Promise = global.Promise;

let CustomerJobsModel = {};

const convertId = mongoose.Types.ObjectId;

// Sets for all the strings
const setString = strVal => _.escape(strVal).trim();

const CustomerJobsSchema = new mongoose.Schema({

  service: {
    type: String,
    required: true,
    trim: true,
    set: setString,
  },
  time: {
    type: String,
    required: true,
    trim: true,
    set: setString,
  },
  address: {
    type: String,
    required: true,
    trim: true,
    set: setString,
  },
  payment: {
    type: String,
    required: true,
    trim: true,
    set: setString,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

CustomerJobsSchema.statics.toAPI = doc => ({
  service: doc.service,
  time: doc.time,
  address: doc.address,
  payment: doc.payment,
});

CustomerJobsSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return CustomerJobsModel.find(search).select('service worker review paid status').exec(callback);
};

CustomerJobsModel = mongoose.model('CustomerJobs', CustomerJobsSchema);

module.exports.CustomerJobsModel = CustomerJobsModel;
module.exports.CustomerJobsSchema = CustomerJobsSchema;
