const router = require('express').Router()
const check = require('../models/checkValue')
const multer = require('multer')

const admineController = require('../controllers/admine.Controller')
const adminGuard = require('./guards/admin.guard')


router.get('/add', adminGuard, admineController.getAdd)

router.post('/add', adminGuard, multer({
    storage: multer.diskStorage({
        destination: (req, file, cd) => {
            cd(null, 'images')
        },
        filename: (req, file, cd) => {
            cd(null, Date.now() + '-' + file.originalname)
        }
    })
}).single("image"), admineController.postAdd)

module.exports = router