var Order = require('../model/order.js');

exports.createOrder = function(req, res, next) {
  // var orderVo = req.body.order;
  // validate order data
  // create Order object
  var oredrNo = Order.generateOrderNumber();
  var orderDao = {
    created_by: 'test', // get userId from session code
    order_number: oredrNo,
    amount: 10.5,
    status: 0,
    fromAddress: {
      geoLocation: {
        lat: 1.279580,
        long: 103.786245
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
    recipientName: 'Mr.Jason',
    recipientContact: '88888888',
    comments: 'A very short comment',
  };

  var newOrder = new Order(orderDao);

  newOrder.save(function(err) {
    if (err) {
      next(err);
    }
    console.log('Success');
    res.status(200).end();
  });
};

exports.getOrders = function(req, res) {
  Order.find({}, function(err, orders) {
    res.send(orders);
  });
};

exports.getOrder = function(req, res) {
  var orderNo = req.params.orderNo;
  Order.find({
    'order_number': orderNo
  }, function(err, order) {
    res.send(order);
  });
};

exports.updateOrder = function(req, res, next) {
  var orderNo = req.params.orderNo;
  var updateCondition = {};
  // set update condition
  Order.where({
    'order_number': orderNo
  }).update(updateCondition, function(err) {
    if (err) {
      next(new Error('Error when updating order ' + orderNo));
    }
  });
};

exports.removeOrder = function(req, res, next) {
  var orderNo = req.params.orderNo;
  console.log(orderNo);
  Order.remove({
    'order_number': orderNo
  }, function(err, data) {
    if (err) {
      next(new Error('Error when deleting order ' + orderNo));
    }
    res.status(200).end();
  });
};
