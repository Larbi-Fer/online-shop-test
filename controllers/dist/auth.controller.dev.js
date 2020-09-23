"use strict";

var authModel = require('../models/auth.model');

exports.getSingup = function (req, res, next) {
  res.render('singup');
};

exports.postSingup = function (req, res, next) {
  authModel.createNewUser(req.body.username, req.body.email, req.body.password).then(function () {
    return res.redirect('/login');
  })["catch"](function (err) {
    return res.redirect('/singup');
  });
};

exports.getLogin = function (req, res, next) {
  res.render('login');
};