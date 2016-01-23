var express = require('express');
var router = express.Router();

var userController = require('../controller/userController');

router.post('/login/', userController.loginUser);
router.post('/', userController.createUser);

router.get('/', userController.requireAuthentication, userController.findUser);


module.exports = router;
