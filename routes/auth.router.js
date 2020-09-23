const router = require('express').Router();
const bodyParser = require('body-parser');

const authController = require("../controllers/auth.controller");

router.get("/singup", authController.getSingup)

router.post(
    "/singup",
    bodyParser.urlencoded({ extended: true }),
    authController.postSingup
);

router.get("/login", authController.getLogin);

router.post(
    "/login",
    bodyParser.urlencoded({ extended: true }),
    authController.postLogin
)

module.exports = router;