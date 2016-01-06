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

// generate order_number using timestamp
orderSchema.statics.generateOrderNumber = function() {
  return 'W' + (new Date()).getTime(); // might be improved later, not a good design here
};

// return some mock data for testing
orderSchema.statics.generateMockData = function() {
  var data = [];
  data.push({
    created_by: 'test', // get userId from session code
    order_number: 'W1452097030368',
    amount: 10.5,
    status: 0,
    fromAddress: {
      geoLocation: {
        lat: 1.2796715,
        long: 103.78585431
      },
      postal: 118136,
      street: 'xxxxx',
      placeName: 'xxxxxx',
      extra: ''
    },
    toAddress: {
      geoLocation: {
        lat: 1.383762,
        long: 103.845894
      },
      postal: 569780,
      street: 'A very interesting street',
      placeName: 'A very big building',
      extra: '#03-29'
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
    created_by: 'test', // get userId from session code
    order_number: 'W1452097030369',
    amount: 20.5,
    status: 0,
    fromAddress: {
      geoLocation: {
        lat: 1.2914217,
        long: 103.7809664
      },
      postal: 118420,
      street: 'xxxxx',
      placeName: 'xxxxxx',
      extra: ''
    },
    toAddress: {
      geoLocation: {
        lat: 1.383762,
        long: 103.845894
      },
      postal: 569780,
      street: 'A very interesting street',
      placeName: 'A very big building',
      extra: '#03-29'
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
    created_by: 'test', // get userId from session code
    order_number: 'W1452097030370',
    amount: 10.5,
    status: 0,
    fromAddress: {
      geoLocation: {
        lat: 1.2879893,
        long: 103.7784129
      },
      postal: 118222,
      street: 'xxxxx',
      placeName: 'xxxxxx',
      extra: ''
    },
    toAddress: {
      geoLocation: {
        lat: 1.383762,
        long: 103.845894
      },
      postal: 569780,
      street: 'A very interesting street',
      placeName: 'A very big building',
      extra: '#03-29'
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
    created_by: 'test', // get userId from session code
    order_number: 'W1452097030371',
    amount: 120.5,
    status: 0,
    fromAddress: {
      geoLocation: {
        lat: 1.2772202,
        long: 103.7911588
      },
      postal: 118136,
      street: 'xxxxx',
      placeName: 'xxxxxx',
      extra: ''
    },
    toAddress: {
      geoLocation: {
        lat: 1.383762,
        long: 103.845894
      },
      postal: 569780,
      street: 'A very interesting street',
      placeName: 'A very big building',
      extra: '#03-29'
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
    created_by: 'test', // get userId from session code
    order_number: 'W1452097030372',
    amount: 102.5,
    status: 0,
    fromAddress: {
      geoLocation: {
        lat: 1.2994448,
        long: 103.7862665
      },
      postal: 118136,
      street: 'xxxxx',
      placeName: 'xxxxxx',
      extra: ''
    },
    toAddress: {
      geoLocation: {
        lat: 1.383762,
        long: 103.845894
      },
      postal: 569780,
      street: 'A very interesting street',
      placeName: 'A very big building',
      extra: '#03-29'
    },
    location: {
      type: 'Point',
      coordinates: [103.7862665, 1.2994448] // [lng, lat]
    },
    recipientName: 'Mr.Jason',
    recipientContact: '88888888',
    comments: 'A very short comment',
  });
  return data;
};

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;
