"use strict";

var router = require("express").Router();

var productController = require('../controllers/product.controller');

router.get("/", productController.getProduct);
router.get('/:id', productController.getProductById);
module.exports = router;