"use strict";

var router = require('express').Router();

var check = require('../models/checkValue'); //const multer = require('multer')


var admineController = require('../controllers/admine.Controller');

var adminGuard = require('./guards/admin.guard');

router.get('/add', adminGuard, admineController.getAdd);
/* router.post('/add', adminGuard, multer({
    storage: multer.diskStorage({
        destination: (req, file, cd) => {
            cd(null, 'images')
        },
        filename: (req, file, cd) => {
            cd(null, Date.now() + '-' + file.originalname)
        }
    })
}).single("image"), admineController.postAdd) */

router.post('/add', admineController.postAdd);
module.exports = router;