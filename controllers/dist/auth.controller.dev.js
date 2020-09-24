"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var authModel = require('../models/auth.model');

var error = "";

var checkInp = require('../models/checkValue');

exports.getSingup = function (req, res, next) {
  res.render('singup', {
    authError: error
  });
  error = "";
};

exports.postSingup = function (req, res, next) {
  var _checkInp$checkVal;

  var resl = checkInp.checkVal((_checkInp$checkVal = {
    notEmpty: {
      value: req.body.username,
      msg: "username is empty !"
    }
  }, _defineProperty(_checkInp$checkVal, "notEmpty", {
    value: req.body.email,
    msg: "email is empty !"
  }), _defineProperty(_checkInp$checkVal, "v", [req.body.password, {
    min: {
      min: 6,
      msg: "password min is 6 !"
    },
    max: {
      max: 15,
      msg: "password max is 15"
    },
    custum: {
      value: req.body.confirmPassword,
      msg: "confirm password is incorrect"
    }
  }]), _checkInp$checkVal));
  console.log(resl);
  return resl;

  if (resl.length != 0) {
    authModel.createNewUser(req.body.username, req.body.email, req.body.password).then(function () {
      return res.redirect('/login');
    })["catch"](function (err) {
      return res.redirect('/singup');
    });
  }
};

exports.getLogin = function (req, res, next) {
  res.render('login', {
    authError: error
  });
  error = "";
};

exports.postLogin = function (req, res, next) {
  authModel.login(req.body.email, req.body.password).then(function (id) {
    req.session.userId = id;
    res.redirect('/');
  })["catch"](function (err) {
    //req.flash('authEroor', err)
    error = err;
    res.redirect('/login');
  });
};

exports.logout = function (res, req, next) {
  req.session.destroy(function () {
    res.redirect('/');
  });
};