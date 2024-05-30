const express = require('express');
const productsController = require('../controller/productsController');
const { upload } = require('../middleware/upload');
const router = express.Router();

/* /produtcs */
router
    .get('/cart', productsController.cart)
    .get('/details/:id', productsController.details)
    .get('/add', productsController.add)

/* Edit */
router
    .get('/edit/:id', productsController.edit)
    .put('/edit/:id', upload.fields([
        { name: "image", maxCount: 1 },
        { name: "images" },
    ]), productsController.modify);

/* Delete */

router
    .delete('/delete/:id', productsController.destroy)

module.exports = router;