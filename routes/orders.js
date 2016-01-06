var express = require('express');
var router = express.Router();

var orderController = require('../controller/orderController');

// Get order
router.get('/', orderController.getOrdersWithinRange);
router.get('/:orderNo', orderController.getOrderById);

// Create order
router.post('/', orderController.createOrder);

// Update order
router.put('/:orderNo', orderController.updateOrder);

// Delete order
router.delete('/:orderNo', orderController.removeOrder);

module.exports = router;
