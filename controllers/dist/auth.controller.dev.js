"use strict";

var authModel = require('../models/auth.model');

var error = "";

exports.getSingup = function (req, res, next) {
  res.render('singup', {
    authError: error
  });
  error = "";
};

exports.postSingup = function (req, res, next) {
  authModel.createNewUser(req.body.username, req.body.email, req.body.password).then(function () {
    return res.redirect('/login');
  })["catch"](function (err) {
    return res.redirect('/singup');
  });
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