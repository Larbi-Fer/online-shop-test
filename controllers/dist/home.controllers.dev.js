"use strict";

var productsModel = require('../models/products.model');

exports.getHome = function (req, res, next) {
  // get category
  // if category && category != all
  //      fillter
  // else
  //      render all
  var promctsPromise;
  var validCategories = ['clothes', 'phones', 'computers'];
  var category = req.query.category;
  if (category && validCategories.includes(category)) promctsPromise = productsModel.getProductsByCategory(category);else promctsPromise = productsModel.getAllProducts();
  promctsPromise.then(function (products) {
    res.render('index', {
      products: products,
      isUser: req.session.userId,
      isAdmin: req.session.isAdmin,
      validationError: req.flash('validationError')[0],
      pageTitle: 'Home'
    });
  });
};