var User = require('../model/user.js');
var token = require('../config/token.js');

exports.loginUser = function(req, res, next) {
  var userEmail = req.body.email;
  var password = req.body.password;

  User.findOne({
    email: userEmail
  }, function(err, user) {
    if (err) {
      return next(new Error('Error creating user'));
    }
    if (!user) {
      res.json({
        success: false,
        message: 'User not found.'
      });
    } else if (user) {
      if (user.password !== password) {
        res.json({
          success: false,
          message: 'Wrong password.'
        });
      } else {
        // if user is found and password is right
        // create a token
        var weloToken = token.generateToken(user);
        var weloUser = {};
        if (user.isDriver) {
          weloUser = {
            email: user.email,
            name: user.name,
            phone: user.phone,
            isDriver: user.isDriver,
            userid: user._id
          };
        } else {
          weloUser = {
            email: user.email,
            name: user.name,
            phone: user.phone,
            isDriver: user.isDriver,
            creditCard: user.creditCard,
            userid: user._id
          };
        }

        // return the information including token as JSON
        return res.status(200).send({
          status: 'success',
          welo_token: weloToken,
          user: weloUser
        });
      }
    }
  });
};

exports.createUser = function(req, res, next) {
  var newUser = new User(req.body.user);

  newUser.save(function(err) {
    if (err) {
      return next(new Error('Error creating user'));
    }

    var weloToken = token.generateToken(newUser);
    var weloUser = {};
    if (newUser.isDriver) {
      weloUser = {
        email: newUser.email,
        name: newUser.name,
        phone: newUser.phone,
        isDriver: newUser.isDriver,
        userid: newUser._id
      };
    } else {
      weloUser = {
        email: newUser.email,
        name: newUser.name,
        phone: newUser.phone,
        isDriver: newUser.isDriver,
        creditCard: newUser.creditCard,
        userid: newUser._id
      };
    }

    console.log('User saved successfully');
    // return the information including token as JSON
    return res.status(200).send({
      status: 'success',
      welo_token: weloToken,
      user: weloUser
    });
  });
};

exports.requireAuthentication = function(req, res, next) {
  if (req.authentication.isAuthenticated) {
    return next();
  } else {
    return res.status(403).send({
      error: req.authentication.message
    });
  }
};

exports.findUser = function(req, res, next) {
  var userid = req.params.userid;
  User.find({
    _id: userid
  }, function(err, users) {
    res.json(users);
  });
};
