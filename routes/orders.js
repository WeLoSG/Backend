var express = require('express');
var router = express.Router();

var userController = require('../controller/userController');
var orderController = require('../controller/orderController');

// Get order
router.get('/', orderController.getOrdersWithinRange);
router.get('/deliver/:userId', orderController.getOrdersByDeliver);
router.get('/:orderNo', orderController.getOrderById);

// Create order
router.post('/', orderController.createOrder);

// Update order
router.patch('/:orderNo', orderController.updateOrder);

// Delete order
router.delete('/:orderNo', orderController.removeOrder);

module.exports = router;
