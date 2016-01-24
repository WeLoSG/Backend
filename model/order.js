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
  extra: <optional like unit, blk, building xxx>
}
*/
var orderSchema = new Schema({
  created_by: { // user id
    type: String,
    required: true,
    index: true
  },
  deliver_by: { // deliver id
    type: String,
    default: null,
    index: true
  },
  contactName: { // user name
    type: String,
    required: true
  },
  contactNumber: { // user name
    type: String,
    required: true
  },
  orderId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  orderType: { // 0: document, 1: small parcel 2: medium parcel 3: large parcel
    type: Number,
    default: 0
  },
  amount: Number,
  status: {
    type: Number,
    default: 0
  },
  fromAddress: Schema.Types.Mixed, // should be an address object
  toAddress: Schema.Types.Mixed, // should be an address object
  location: {
    type: Schema.Types.Mixed, // represent the geoLocation displayed in the map
    index: '2dsphere' // create geo index
  },
  // [<longitude>, <latitude>] longitute first, then latitude
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

// generate orderId using timestamp
orderSchema.statics.generateOrderNumber = function() {
  return 'W' + (new Date()).getTime(); // might be improved later, not a good design here
};

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;
