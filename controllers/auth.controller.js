const authModel = require('../models/auth.model')

exports.getSingup = (req, res, next) => {
    res.render('singup');
};

exports.postSingup = (req, res, next) => {
    authModel.createNewUser(req.body.username, req.body.email, req.body.password)
        .then(() => res.redirect('/login')).catch(err => res.redirect('/singup'))
}

exports.getLogin = (req, res, next) => {
    res.render('login')
}