var express = require('express');
var router = express.Router();
var userController = require('../controller/userlogin');


router.post('/login', userController.loginUser);

module.exports = router;
