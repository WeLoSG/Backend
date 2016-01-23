var express = require('express');
var router = express.Router();

var userController = require('../controller/userController');
var orderController = require('../controller/orderController');

// Get order
router.get('/', userController.requireAuthentication, orderController.getOrdersWithinRange);
router.get('/deliver', userController.requireAuthentication, orderController.getOrdersByDeliver);
router.get('/client', userController.requireAuthentication, orderController.getOrdersByClient);
router.get('/:orderNo', userController.requireAuthentication, orderController.getOrderById);

// Create order
router.post('/', userController.requireAuthentication, orderController.createOrder);

// Update order
router.patch('/:orderNo', userController.requireAuthentication, orderController
  .updateOrder);

// Delete order
router.delete('/:orderNo', orderController.removeOrder);

module.exports = router;
