var db = require('../db');
var utils = require('../lib/utility');

// Write you user database model methods here

var post = function(username, password, callback) {
  utils.hash(password, function(err, results) {
    if (err) {
      console.log(err);
      return;
    } else {
      db.query('insert into users (username, password) values (?, ?)', [username, results], function (err, results) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, results);
        }
      });
    }
  });
};

var getUserByUsername = function (username, callback) {
  return db.query('select * from users where users.username = ? limit 1', [username], function (err, results) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results[0]);
    }
  });
};
module.exports = {
  post: post,
  getUserByUsername: getUserByUsername
};
