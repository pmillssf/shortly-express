var parseCookies = function(req, res, next) {
  var cookies = req.get('Cookie');
  if (cookies) {
    cookies = cookies.split(' ');
    req.cookies = {};
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].split('=');
      if (cookie[1].includes(';')) {
        req.cookies[cookie[0]] = cookie[1].slice(0, -1);
      } else {
        req.cookies[cookie[0]] = cookie[1];
      }
    }
    next();
  } else {
    req.cookies = {};
    next();
  }
  //res.redirect('/signin');
};

module.exports = parseCookies;