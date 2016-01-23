var User = require('../model/user.js');
var token = require('./token.js');

exports.authenticate = function(req, res, next) {
  var weloToken = req.query.welo_token;
  req.user = {};
  req.authentication = {
    isAuthenticated: false
  };
  if (weloToken) {
    var decoded = token.decryptToken(weloToken);
    if (decoded.expires > Date.now()) {
      User.findOne({
        _id: decoded.userid
      }, function(err, user) {
        if (user) {
          req.authentication.isAuthenticated = true;
          req.user = user;
        } else {
          req.authentication.message = 'no user found';
        }
        return next();
      });
    } else {
      req.authentication.message = 'token expired';
      return next();
    }
  } else {
    req.authentication.message = 'no token provided';
    return next();
  }
};
