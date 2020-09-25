"use strict";

var router = require('express').Router();

var bodyParser = require('body-parser');

var authG = require('./guards/auth.guard');

var cartControler = require('../controllers/catr.controller');

router.post('/', authG.isAuth, bodyParser.urlencoded({
  "extends": true
}), cartControler.postCart);
module.exports = router;