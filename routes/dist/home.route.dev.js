"use strict";

var router = require("express").Router();

var authGuard = require('./guards/auth.guard');

var homeControler = require('../controllers/home.controllers');

router.get('/', homeControler.getHome);
module.exports = router;