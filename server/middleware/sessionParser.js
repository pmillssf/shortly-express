var Sessions = require('../models/session');
var utils = require('../lib/utility');

var createSession = function(req, res, next) {
  res.cookies = {};
  req.session = {};
  if (req.cookies['shortlyid']) {
    req.session['hash'] = req.cookies['shortlyid'];
    res.cookies['shortlyid'] = {value: req.cookies['shortlyid']};
    next();
  } else {
    utils.hash(Math.random(0, 100).toString(), function (err, key) {
      if (err) {
        console.log('wtf', err);
      } else {
        req.session['hash'] = key;
        res.cookies['shortlyid'] = {value: key};
      }
      next();
    });
  }
};

module.exports = createSession;
