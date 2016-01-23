var express = require('express');
var expressValidator = require('express-validator');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// require routes
var index = require('./routes/index');
var orders = require('./routes/orders');
var users = require('./routes/users');

var app = express();

// Save io instance
var io = require('socket.io')();
app.io = io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./config/cors').allowCrossDomain);
app.use(require('./config/caching').removeNotModified);

// Routes
app.use('/', index);
app.use(require('./config/tokenauth').authenticate);
app.use('/orders', orders);
app.use('/users', users);
app.use(require('./routes/errors').errorHandler); // error handler

module.exports = app;
