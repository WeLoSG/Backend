var jwt = require('jsonwebtoken');
var config = require('./config');

exports.generateToken = function(user) {
  var unencryptedToken = {
    email: user.email,
    name: user.name,
    phone: user.phone,
    isDriver: user.isDriver,
    creditCard: user.creditCard,
    userid: user._id,
    expires: Date.now() + 604800000
  };

  return jwt.sign(unencryptedToken, config.secret);
};

// decrypts the token provided with the key
exports.decryptToken = function(encryptedToken) {
  return jwt.verify(encryptedToken, config.secret);
};
