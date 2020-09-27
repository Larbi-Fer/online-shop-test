"use strict";

var productsModel = require('../models/products.model');

exports.getAdd = function (req, res, next) {
  res.render('add-product', {
    validationErrors: req.flash("validationErrors"),
    isUser: true,
    isAdmin: true
  });
};

exports.postAdd = function (req, res, next) {
  productsModel.addProduct(req.body, req.file.filename).then(function () {
    req.flash("added", true);
    res.refirect('/admin/add');
  })["catch"](function (err) {
    res.redirect('/error');
  });
};