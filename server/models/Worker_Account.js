const crypto = require('crypto');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let WorkerAccountModel = {};
const iterations = 10000;
const saltLength = 64;
const keyLength = 64;

const WorkerAccountSchema = new mongoose.Schema({

  firstname: {
    type: String,
    required: true,
    trim: true,
    match: /^[A-Za-z]{1,25}$/,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    match: /^[A-Za-z]{1,25}$/,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[A-Za-z0-9_\-.@]{1,254}$/,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: /^[0-9_\-.]{1,16}$/,
  },
  password: {
    type: String,
    required: true,
  },
  inviteCode: {
    type: String,
    trim: true,
    match: /^[A-Za-z0-9_\-.]{1,8}$/,
  },
  salt: {
    type: Buffer,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const validatePassword = (doc, password, callback) => {
  const pass = doc.password;

  return crypto.pbkdf2(password, doc.salt, iterations, keyLength, 'RSA-SHA512', (err, hash) => {
    if (hash.toString('hex') !== pass) {
      return callback(false);
    }
    return callback(true);
  });
};

WorkerAccountSchema.statics.toAPI = doc => ({
  firstname: doc.firstname,
  lastname: doc.lastname,
  email: doc.email,
  phone: doc.phone,
  _id: doc._id,
});

WorkerAccountSchema.statics.findByEmail = (email, callback) => {
  const search = {
    email,
  };

  return WorkerAccountModel.findOne(search, callback);
};

WorkerAccountSchema.statics.generateHash = (password, callback) => {
  const salt = crypto.randomBytes(saltLength);

  crypto.pbkdf2(password, salt, iterations, keyLength, 'RSA-SHA512', (err, hash) => callback(salt, hash.toString('hex')));
};

WorkerAccountSchema.statics.authenticate = (email, password, callback) =>
WorkerAccountModel.findByEmail(email, (err, doc) => {
  if (err) {
    return callback(err);
  }

  if (!doc) {
    return callback();
  }

  return validatePassword(doc, password, (result) => {
    if (result === true) {
      return callback(null, doc);
    }

    return callback();
  });
});

WorkerAccountModel = mongoose.model('WorkerAccount', WorkerAccountSchema);

module.exports.WorkerAccountModel = WorkerAccountModel;
module.exports.WorkerAccountSchema = WorkerAccountSchema;
