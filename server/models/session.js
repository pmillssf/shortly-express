var db = require('../db');
var util = require('../lib/utility');
var crypto = require('crypto');

// Write you session database model methods here
var fetchUser = function (sessionHash, callback) {
  return db.query('select users.username, users.id from users, sessions where sessions.hash = ? and users.id = sessions.user_id', [sessionHash], function (err, results) {
    if (err) {
      console.log('err fetch', err);
      callback(err, null);
    } else {
      console.log(results);
      callback(null, results[0]);
    }
  });  
}; 

var createSession = function (agent, callback) {
  var sessionHash = crypto.createHash('sha1');
  var salt = Date.now;
  sessionHash.update(agent + salt);
  var hash = sessionHash.digest('hex');
  // console.log(hash);
  db.query('insert into sessions (hash) values (?)', [hash], function (err, results) {
    if (err) {
      // console.log('err create', err);
      callback(err, null);
    } else {
      console.log('hash', hash);
      callback(null, hash);
    }
  });
};

module.exports = {
  fetchUser: fetchUser,
  createSession: createSession
};

exports.createHash = function(data, salt) {
  var shasum = crypto.createHash('sha1');
  shasum.update(data + salt);
  return shasum.digest('hex');
};