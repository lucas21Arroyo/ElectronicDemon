const express = require('express');
const productsController = require('../controller/productsController')
const router = express.Router();

/* /produtcs */
router.get('/cart', productsController.cart);
router.get('/details', productsController.details);
router.get('/add', productsController.add);
router.get('/edit', productsController.edit);

module.exports = router;