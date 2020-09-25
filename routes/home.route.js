const router = require("express").Router()
const authGuard = require('./guards/auth.guard')

const homeControler = require('../controllers/home.controllers')

router.get('/', homeControler.getHome)
module.exports = router