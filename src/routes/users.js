const express = require('express');
const usersController = require('../controller/usersController');
const router = express.Router();

/* /users */
router.get('/login', usersController.login);
router.get('/register', usersController.register)

module.exports = router;
