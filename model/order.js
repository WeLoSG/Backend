// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
// address object:
/*
var addr = {
  geoLocation: {
    lat: xxx,
    long: xxx
  },
  postal: 118xxx,
  street: 'xxxxx',
  placeName: 'xxxxxx',
  extra: <optional like unit, blk, building xxx>
}
*/
var orderSchema = new Schema({
  created_by: { // user id
    type: String,
    required: true,
    index: true
  },
  order_number: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  amount: Number,
  status: {
    type: Number,
    default: 0
  },
  fromAddress: Schema.Types.Mixed, // should be an address object
  toAddress: Schema.Types.Mixed, // should be an address object
  recipientName: {
    type: String,
    required: true
  },
  recipientContact: {
    type: Number,
    required: true
  },
  comments: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// generate order_number using timestamp
orderSchema.statics.generateOrderNumber = function() {
  return 'W' + (new Date()).getTime(); // might be improved later, not a good design here
};

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;
