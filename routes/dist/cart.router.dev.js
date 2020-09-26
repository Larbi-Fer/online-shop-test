"use strict";

var router = require('express').Router();

var bodyParser = require('body-parser');

var authG = require('./guards/auth.guard');

var cartControler = require('../controllers/catr.controller');

router.get('/', authG.isAuth, cartControler.getCart);
router.post('/', authG.isAuth, bodyParser.urlencoded({
  "extends": true
}), cartControler.postCart);
router.post('/save', bodyParser.urlencoded({
  "extends": true
}), cartControler.postSave);
router.post('/delete', bodyParser.urlencoded({
  "extends": true
}), cartControler.postDelete);
module.exports = router;