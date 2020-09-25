"use strict";

var router = require('express').Router();

var bodyParser = require('body-parser');

var authGuard = require('./guards/auth.guard');

var authController = require("../controllers/auth.controller");

router.get("/singup", authGuard.notAuth, authController.getSingup);
router.post("/singup", authGuard.notAuth, bodyParser.urlencoded({
  extended: true
}), authController.postSingup);
router.get("/login", authGuard.notAuth, authController.getLogin);
router.post("/login", authGuard.notAuth, bodyParser.urlencoded({
  extended: true
}), authController.postLogin);
router.all('/logout', authGuard.isAuth, authController.logout);
module.exports = router;