"use strict";

var mongoose = require('mongoose');

var bcrypt = require('bcrypt');

var DB_URL = "mongodb://localhost/online-shop";
var userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String
});
var User = mongoose.model('user', userSchema);

exports.createNewUser = function (username, email, password) {
  // check if email exists
  // yes → → error
  // no → → create new acount
  return new Promise(function (resolve, reject) {
    mongoose.connect(DB_URL).then(function () {
      return User.findOne({
        email: email
      });
    }).then(function (user) {
      if (user) {
        mongoose.disconnect();
        reject('email is used');
      } else {
        return bcrypt.hash(password, 10);
      }
    }).then(function (hashedPassword) {
      var user = new User({
        username: username,
        email: email,
        password: hashedPassword
      });
      return user.save();
    }).then(function () {
      resolve('user Created');
      mongoose.disconnect();
    })["catch"](function (err) {
      mongoose.disconnect();
      reject(err);
    });
  });
};