const router = require('express').Router()
const check = require('../models/checkValue')

const admineController = require('../controllers/admine.Controller')
const adminGuard = require('./guards/admin.guard')


router.get('/add', adminGuard, admineController.getAdd)

module.exports = router