"use strict";

var router = require('express').Router();

var bodyParser = require('body-parser');

var authController = require("../controllers/auth.controller");

router.get("/singup", authController.getSingup);
router.post("/singup", bodyParser.urlencoded({
  extended: true
}), authController.postSingup);
router.get("/login", authController.getLogin);
router.post("/login", bodyParser.urlencoded({
  extended: true
}), authController.postLogin);
router.all('/logout', authController.logout);
module.exports = router;