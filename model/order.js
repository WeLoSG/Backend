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

// return some mock data for testing
orderSchema.statics.generateMockData = function() {
  var data = [];
  data.push({
    created_by: 'test',
    deliver_by: null,
    contactName: 'Mr.test',
    orderId: 'W1452097030368',
    amount: 10.5,
    status: 0,
    orderType: 0,
    fromAddress: {
      geoLocation: {
        lat: 1.2796715,
        long: 103.78585431
      },
      postal: 118136,
      street: 'xxxxx',
      extra: 'test'
    },
    toAddress: {
      geoLocation: {
        lat: 1.383762,
        long: 103.845894
      },
      postal: 569780,
      street: 'A very interesting street',
      extra: 'Test building #027'
    },
    location: {
      type: 'Point',
      coordinates: [103.78585431, 1.2796715] // [lng, lat]
    },
    recipientName: 'Mr.Jason',
    recipientContact: '88888888',
    comments: 'A very short comment',
  });
  data.push({
    created_by: 'test',
    deliver_by: null,
    contactName: 'Mr.test',
    orderId: 'W1452097030369',
    amount: 20.5,
    status: 0,
    orderType: 1,
    fromAddress: {
      geoLocation: {
        lat: 1.2914217,
        long: 103.7809664
      },
      postal: 118420,
      street: 'xxxxx',
      extra: '#04-20'
    },
    toAddress: {
      geoLocation: {
        lat: 1.383762,
        long: 103.845894
      },
      postal: 569780,
      street: 'A very interesting street',
      extra: '#03-29 building 2'
    },
    location: {
      type: 'Point',
      coordinates: [103.7809664, 1.2914217] // [lng, lat]
    },
    recipientName: 'Mr.Jason',
    recipientContact: '88888888',
    comments: 'A very short comment',
  });
  data.push({
    created_by: 'test',
    deliver_by: null,
    contactName: 'Mr.test',
    orderId: 'W1452097030370',
    amount: 10.5,
    status: 0,
    orderType: 2,
    fromAddress: {
      geoLocation: {
        lat: 1.2879893,
        long: 103.7784129
      },
      postal: 118222,
      street: 'xxxxx',
      extra: 'Blk 27'
    },
    toAddress: {
      geoLocation: {
        lat: 1.383762,
        long: 103.845894
      },
      postal: 569780,
      street: 'A very interesting street',
      extra: '#04-20 Blk28'
    },
    location: {
      type: 'Point',
      coordinates: [103.7784129, 1.2879893] // [lng, lat]
    },
    recipientName: 'Mr.Jason',
    recipientContact: '88888888',
    comments: 'A very short comment',
  });
  data.push({
    created_by: 'test',
    deliver_by: null,
    contactName: 'Mr.test',
    orderId: 'W1452097030371',
    amount: 120.5,
    status: 0,
    orderType: 3,
    fromAddress: {
      geoLocation: {
        lat: 1.2772202,
        long: 103.7911588
      },
      postal: 118136,
      street: 'xxxxx',
      extra: '#0202 Blk71'
    },
    toAddress: {
      geoLocation: {
        lat: 1.383762,
        long: 103.845894
      },
      postal: 569780,
      street: 'A very interesting street',
      extra: '#03-29 Vava Va'
    },
    location: {
      type: 'Point',
      coordinates: [103.7911588, 1.2772202] // [lng, lat]
    },
    recipientName: 'Mr.Jason',
    recipientContact: '88888888',
    comments: 'A very short comment',
  });
  data.push({
    created_by: 'test',
    deliver_by: null,
    contactName: 'Mr.test',
    orderId: 'W1452097030372',
    amount: 102.5,
    orderType: 1,
    status: 0,
    fromAddress: {
      geoLocation: {
        lat: 1.2994448,
        long: 103.7862665
      },
      postal: 118136,
      street: 'xxxxx',
      extra: '8th floor'
    },
    toAddress: {
      geoLocation: {
        lat: 1.383762,
        long: 103.845894
      },
      postal: 569780,
      street: 'A very interesting street',
      extra: 'House 27'
    },
    location: {
      type: 'Point',
      coordinates: [103.7862665, 1.2994448] // [lng, lat]
    },
    recipientName: 'Mr.Jason',
    recipientContact: '88888888',
    comments: 'A very short comment',
  });
  data.push({
    created_by: 'test',
    deliver_by: null,
    contactName: 'Mr.test',
    orderId: 'W1452097030380',
    amount: 50.5,
    orderType: 1,
    status: 0,
    fromAddress: {
      geoLocation: {
        lat: 1.2994441,
        long: 103.7862657
      },
      postal: 118136,
      street: 'NUS Computing',
      extra: '8th floor'
    },
    toAddress: {
      geoLocation: {
        lat: 1.383762,
        long: 103.845894
      },
      postal: 569780,
      street: 'A very interesting street',
      extra: 'House 27'
    },
    location: {
      type: 'Point',
      coordinates: [103.7862657, 1.2994441] // [lng, lat]
    },
    recipientName: 'Mr.Jason',
    recipientContact: '88888888',
    comments: 'A very short comment',
  });
  return data;
};

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;
