const authModel = require('../models/auth.model')

exports.getSingup = (req, res, next) => {
    res.render('singup');
};

exports.postSingup = (req, res, next) => {

}

exports.getLogin = (req, res, next) => {
    res.render('login')
}