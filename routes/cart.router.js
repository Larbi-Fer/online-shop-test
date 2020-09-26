const router = require('express').Router()
const bodyParser = require('body-parser');

const authG = require('./guards/auth.guard')

const cartControler = require('../controllers/catr.controller')

router.get('/', authG.isAuth, cartControler.getCart)

router.post('/', authG.isAuth, bodyParser.urlencoded({ extends: true }), cartControler.postCart)

router.post('/save', bodyParser.urlencoded({ extends: true }), cartControler.postSave)

router.post('/delete', bodyParser.urlencoded({ extends: true }), cartControler.postDelete)

module.exports = router