const express = require('express');
const router = express.Router();
const userController = require('./controller');

router.post('/login', userController.login);
router.post('/createuser', userController.createUser);
module.exports = router;
