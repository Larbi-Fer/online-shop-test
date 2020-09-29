const router = require('express').Router()
const bodyParser = require('body-parser')
const cartControler = require('../controllers/order.controller')
const authG = require('./guards/auth.guard')

router.get('/', authG.isAuth, cartControler.getOrders)

router.post('/', bodyParser.urlencoded({ extends: true }), cartControler.postOrders)

router.post('/Cancel', bodyParser.urlencoded({ extended: true }), cartControler.postCancel)

module.exports = router