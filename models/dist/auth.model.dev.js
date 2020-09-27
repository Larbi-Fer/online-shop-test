"use strict";

var mongoose = require('mongoose');

var bcrypt = require('bcrypt');

var DB_URL = "mongodb://localhost:27017/online-shop";
var userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  isAdmin: {
    type: Boolean,
    "default": false
  }
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
        // install bcrypt
        return bcrypt.hash(password, 10);
      }
    }).then(function (hashedPassword) {
      var user = new User({
        username: username,
        email: email,
        password: hashedPassword,
        isAdmin: false
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

exports.login = function (email, password) {
  // check for email                    ← 1
  // no → → error                     ← 1.1
  // yes → → check for password       ← 2.1
  //   no → → error                 ← 1.2.1
  //   yes → → set session          ← 2.2.1
  return new Promise(function (resolve, reject) {
    //  ↓ ↓  1
    mongoose.connect(DB_URL).then(function () {
      return User.findOne({
        email: email
      });
    }).then(function (user) {
      if (!user) {
        //                     ↓ ↓ 1.1
        mongoose.disconnect();
        reject('there is no user mathes this email');
      } else {
        //                         ↓ ↓ 2.1                
        bcrypt.compare(password, user.password).then(function (same) {
          if (!same) {
            //                   ↓ ↓  1.2.1
            mongoose.disconnect();
            reject('password is incorrect');
          } else {
            //                       ↓ ↓  2.2.1
            // install express-session  &  connect-mongodb-session
            mongoose.disconnect();
            resolve({
              id: user._id,
              isAdmin: user.isAdmin
            });
          }
        });
      }
    })["catch"](function (err) {
      mongoose.disconnect();
      reject(err);
    });
  });
};