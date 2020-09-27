"use strict";

var mongoose = require('mongoose');

var DB_URL = "mongodb://localhost:27017/online-shop";
var productSchema = mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  description: String,
  category: String
});
var Product = mongoose.model('product', productSchema);

exports.getAllProducts = function () {
  // connect to db
  // get Products
  // disconnect
  return new Promise(function (resolve, reject) {
    mongoose.connect(DB_URL).then(function () {
      return Product.find({});
    }).then(function (products) {
      mongoose.disconnect();
      resolve(products);
    })["catch"](function (err) {
      return reject(err);
    });
  });
};

exports.getProductsByCategory = function (category) {
  return new Promise(function (resolve, reject) {
    mongoose.connect(DB_URL).then(function () {
      return Product.find({
        category: category
      });
    }).then(function (prosucts) {
      mongoose.disconnect();
      resolve(prosucts);
    })["catch"](function (err) {
      return reject(err);
    });
  });
};

exports.getProductById = function (id) {
  return new Promise(function (resolve, reject) {
    mongoose.connect(DB_URL).then(function () {
      return Product.findById(id);
    }).then(function (product) {
      mongoose.disconnect();
      resolve(product);
    })["catch"](function (err) {
      return reject(err);
    });
  });
};

exports.getFirstProduct = function () {
  return new Promise(function (resolve, reject) {
    mongoose.connect(DB_URL).then(function () {
      return Product.findOne({});
    }).then(function (product) {
      mongoose.disconnect();
      resolve(product);
    })["catch"](function (err) {
      return reject(err);
    });
  });
};

exports.addProduct = function (object, imgName) {
  return new Promise(function (resolve, reject) {
    mongoose.connect(DB_URL).then(function () {
      var product = new product({
        name: object.name,
        image: imgName,
        price: object.price,
        description: object.description,
        category: object.category
      });
    }).then(function (prosucts) {
      mongoose.disconnect();
      resolve(prosucts);
    })["catch"](function (err) {
      return reject(err);
    });
  });
};