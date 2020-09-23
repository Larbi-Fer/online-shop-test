"use strict";

var authModel = require('../models/auth.model');

exports.getSingup = function (req, res, next) {
  res.render('singup');
};

exports.postSingup = function (req, res, next) {};

exports.getLogin = function (req, res, next) {
  res.render('login');
};