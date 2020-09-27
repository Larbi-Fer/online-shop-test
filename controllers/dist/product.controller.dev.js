"use strict";

var productsModel = require('../models/products.model');

exports.getProduct = function (req, res, next) {
  // get id
  // get product
  // render
  productsModel.getFirstProduct().then(function (product) {
    res.render('product', {
      product: product,
      isUser: req.session.userId,
      isAdmin: req.session.isAdmin,
      pageTitle: "Product: " + product.name
    });
  });
};

exports.getProductById = function (req, res, next) {
  // get id
  // get product
  // render
  var id = req.params.id;
  productsModel.getProductById(id).then(function (product) {
    res.render('product', {
      product: product,
      isUser: req.session.userId,
      isAdmin: req.session.isAdmin,
      pageTitle: "Product: " + product.name
    });
  });
};