const router = require("express").Router()

const homeControler = require('../controllers/home.controllers')

router.get('/', homeControler.getHome)
module.exports = router