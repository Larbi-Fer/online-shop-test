"use strict";

var mongoose = require('mongoose');

var DB_URL = "mongodb://localhost:27017/online-shop";
var cartSchema = mongoose.Schema({
  name: String,
  price: Number,
  amount: Number,
  userId: String,
  productId: String,
  timestamp: Number
});
var CartItem = mongoose.model("cart", cartSchema);

exports.addNewItem = function (data) {
  return new Promise(function (resolve, reject) {
    mongoose.connect(DB_URL).then(function () {
      var item = new CartItem(data);
      return item.save();
    }).then(function () {
      mongoose.disconnect();
      resolve();
    })["catch"](function (err) {
      mongoose.disconnect();
      reject(err);
    });
  });
};

exports.getItemsByUser = function (userId) {
  return new Promise(function (resolve, reject) {
    mongoose.connect(DB_URL).then(function () {
      return CartItem.find({
        userId: userId
      }, {}, {
        sort: {
          timestamp: -1
        }
      });
    }).then(function (items) {
      mongoose.disconnect();
      resolve(items);
    })["catch"](function (err) {
      mongoose.disconnect();
      reject(err);
    });
  });
};

exports.editItem = function (id, newData) {
  return new Promise(function (resolve, reject) {
    mongoose.connect(DB_URL).then(function () {
      return CartItem.updateOne({
        _id: id
      }, newData);
    }).then(function (items) {
      mongoose.disconnect();
      resolve(items);
    })["catch"](function (err) {
      mongoose.disconnect();
      reject(err);
    });
  });
};

exports.deleteItem = function (id, newData) {
  return new Promise(function (resolve, reject) {
    mongoose.connect(DB_URL).then(function () {
      return CartItem.findByIdAndDelete(id);
    });
  }).then(function (items) {
    mongoose.disconnect();
    resolve(items);
  })["catch"](function (err) {
    mongoose.disconnect();
    reject(err);
  });
};