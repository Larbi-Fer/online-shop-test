const router = require('express').Router()
const bodyParser = require('body-parser');

const authG = require('./guards/auth.guard')

const cartControler = require('../controllers/catr.controller')

router.post('/', authG.isAuth, bodyParser.urlencoded({ extends: true }), cartControler.postCart)

module.exports = router