var Order = require('../model/order.js');

exports.createOrder = function(req, res, next) {
  var order = req.body.order;
  order.orderId = Order.generateOrderNumber();

  var newOrder = new Order(order);
  newOrder.created_by = req.user._id;
  newOrder.save(function(err) {
    if (err) {
      next(err);
    }
    res.status(200).end();
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
    'orderId': orderNo
  }, function(err, order) {
    res.send(order);
  });
};

exports.getOrdersByClient = function(req, res) {
  var userId = req.user._id;
  Order.find({
    'created_by': userId
  }, function(err, orders) {
    res.send(orders);
  });
};

exports.getOrdersByDeliver = function(req, res) {
  var userId = req.user._id;
  Order.find({
    'deliver_by': userId
  }, function(err, orders) {
    res.send(orders);
  });
};

exports.updateOrder = function(req, res, next) {
  var orderNo = req.params.orderNo;
  var userId = req.user._id;
  var queryCondition = {
    'orderId': orderNo
  };
  var updateCondition = {};

  if (req.user.isDriver) { // a driver wants to update an order
    if (req.body.action === 'confirm') {
      queryCondition.status = 0; // confirm an status 0 order for starting deliver
      updateCondition.status = 1;
      updateCondition.deliver_by = userId; // assign deliver for this order
    } else if (req.body.action === 'revert') {
      queryCondition.status = 1; // confirm an status 0 order for starting deliver
      updateCondition.status = 0;
      updateCondition.deliver_by = null;
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
    'orderId': orderNo
  }, function(err, data) {
    if (err) {
      next(new Error('Error when deleting order ' + orderNo));
    }
    res.status(200).end();
  });
};
