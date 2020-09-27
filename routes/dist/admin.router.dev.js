"use strict";

var router = require('express').Router();

var check = require('../models/checkValue');

var multer = require('multer');

var admineController = require('../controllers/admine.Controller');

var adminGuard = require('./guards/admin.guard');

router.get('/add', adminGuard, admineController.getAdd);
router.post('/add', adminGuard, multer({
  storage: multer.diskStorage({
    destination: function destination(req, file, cd) {
      cd(null, 'images');
    },
    filename: function filename(req, file, cd) {
      cd(null, Date.now() + '-' + file.originalname);
    }
  })
}).single("image"), admineController.postAdd);
module.exports = router;