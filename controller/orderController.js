var Order = require('../model/order.js');

exports.createOrder = function(req, res, next) {
  // var orderVo = req.body.order;
  // validate order data
  // create Order object
  var mockData = Order.generateMockData();

  var count = 0;
  mockData.forEach(function(doc) {
    var newOrder = new Order(doc);
    newOrder.save(function(err) {
      if (err) {
        next(err);
      }
      count++;
      if (count === mockData.length) {
        res.status(200).end();
      }
    });
  });
};

exports.getAllOrders = function(req, res) {
  Order.find({}, function(err, orders) {
    res.send(orders);
  });
};

// Retrieve order within 5km of requester's location
exports.getOrdersWithinRange = function(req, res) {
  req.checkQuery('lat', 'Invalid data for: lat').notEmpty().isFloat();
  req.checkQuery('lng', 'Invalid data for: lng').notEmpty().isFloat();

  var errors = req.validationErrors();
  if (errors) {
    var msg = {
      'error': {
        'code': 400,
        'message': 'Invalid request parameters.'
      }
    };
    res.send(msg, 400);
    return;
  }

  // find 5km orders around current locations
  Order.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        $maxDistance: 5000
      }
    },
    status: {
      $eq: 0
    } // find only undelivered orders
  }, function(err, orders) {
    res.send(orders);
  });
};

exports.getOrderById = function(req, res) {
  var orderNo = req.params.orderNo;
  Order.find({
    'order_number': orderNo
  }, function(err, order) {
    res.send(order);
  });
};

exports.updateOrder = function(req, res, next) {
  var orderNo = req.params.orderNo;
  var queryCondition = {
    'order_number': orderNo
  };
  var updateCondition = {};
  var operation = req.body.op;

  if (operation === 'deliver') {
    if (req.body.action === 'confirm') {
      queryCondition.status = 0; // confirm an status 0 order for starting deliver
      updateCondition.status = 1;
    } else if (req.body.action === 'revert') {
      queryCondition.status = 1; // confirm an status 0 order for starting deliver
      updateCondition.status = 0;
    }
  }

  // set update condition
  Order.findOneAndUpdate(queryCondition, updateCondition, function(err, order) {
    if (err || order === null) {
      return next(new Error('Error when updating order ' + orderNo));
    }
    res.send(order);
  });
};

exports.removeOrder = function(req, res, next) {
  var orderNo = req.params.orderNo;
  Order.remove({
    'order_number': orderNo
  }, function(err, data) {
    if (err) {
      next(new Error('Error when deleting order ' + orderNo));
    }
    res.status(200).end();
  });
};
