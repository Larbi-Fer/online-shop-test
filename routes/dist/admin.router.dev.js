"use strict";

var router = require('express').Router();

var check = require('../models/checkValue');

var admineController = require('../controllers/admine.Controller');

var adminGuard = require('./guards/admin.guard');

router.get('/add', adminGuard, admineController.getAdd);
module.exports = router;