// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  creditCard: {
    type: String,
    default: null
  },
  isDriver: {
    type: Boolean,
    required: true
  }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
