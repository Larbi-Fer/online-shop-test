"use strict";

var productsModel = require('../models/products.model');

exports.getAdd = function (req, res, next) {
  res.render('add-product', {
    validationErrors: req.flash("validationErrors"),
    isUser: true,
    isAdmin: true
  });
};

exports.postAdd = function (req, res, next) {};