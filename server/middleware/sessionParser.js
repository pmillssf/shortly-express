var Sessions = require('../models/session');
var utils = require('../lib/utility');

var createSession = function(req, res, next) {
  res.cookies = {};
  req.session = {};

  var appCookie = req.cookies['shortlyid'];
  console.log('appcookie', appCookie);
  if (!appCookie) {
    var agent = req.get('User-Agent');
    Sessions.createSession(agent, function (err, hash) {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log(hash, 'hash');
        res.cookies['shortlyid'] = hash;
        console.log('res cookie', res.cookies['shortlyid']);
        res.redirect('/login');
        next();
      }
    });
    // create cookie with session hash (no need to be logged in to use cookie)
    // add session to session table
    // redirect to login
  } else {
    console.log('ac', appCookie);
    req.session['hash'] = req.cookies['shortlyid'];
    Sessions.fetchUser(req.session['hash'], function (err, results) {
      if (err) {
        console.log(err);
        return;
      } else {
        req.session['username'] = results.username;
        req.session['user_id'] = results.user_id;
        res.cookies['shortlyid'] = {value: req.cookies['shortlyid']};
        next(); 
      }
    });
    // Check appCookie in Sessions table
      // check if sessions.user_id exists
        // if no: redirect to login
        // else
          // if exists put username and user_id  into req.session obj
          // redirect to '/'
    // if no: DESTROY THE COOKIE!!!!!!!!! :(
  }


  // if (req.cookies['shortlyid']) {
  //   req.session['hash'] = req.cookies['shortlyid'];
  //   Sessions.fetchUser(req.session['hash'], function (err, results) {
  //     if (err) {
  //       console.log(err);
  //       return;
  //     } else {
  //       req.session['username'] = results.username;
  //       req.session['user_id'] = results.user_id;
  //       res.cookies['shortlyid'] = {value: req.cookies['shortlyid']};
  //       next(); 
  //     }
  //   });
  // } else {
  //   utils.hash(Math.random(0, 100).toString(), function (err, key) {
  //     if (err) {
  //       console.log('wtf', err);
  //     } else {
  //       req.session['hash'] = key;
  //       res.cookies['shortlyid'] = {value: key};
  //     }
  //     next();
  //   });
  // }
};

module.exports = createSession;
