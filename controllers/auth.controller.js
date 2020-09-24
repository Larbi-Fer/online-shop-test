const authModel = require('../models/auth.model')
var error = ""
const checkInp = require('../models/checkValue')
exports.getSingup = (req, res, next) => {
    res.render('singup', {
        authError: error
    });
    error = ""
};

exports.postSingup = (req, res, next) => {
    var resl = checkInp.checkVal({
        notEmpty: {
            value: req.body.username,
            msg: "username is empty !"
        },
        notEmpty: {
            value: req.body.email,
            msg: "email is empty !"
        },
        v: [
            req.body.password,
            {
                min: {
                    min: 6,
                    msg: "password min is 6 !"
                },
                max: {
                    max: 15,
                    msg: "password max is 15"
                },
                custum: {
                    value: req.body.confirmPassword,
                    msg: "confirm password is incorrect"
                }
            }
        ]
    })
    console.log(resl)
    return resl
    if (resl.length != 0) {
        authModel.createNewUser(req.body.username, req.body.email, req.body.password)
            .then(() => res.redirect('/login')).catch(err => res.redirect('/singup'))
    }
}

exports.getLogin = (req, res, next) => {
    res.render('login', {
        authError: error
    })
    error = ""
}

exports.postLogin = (req, res, next) => {
    authModel.login(req.body.email, req.body.password)
        .then((id) => {
            req.session.userId = id
            res.redirect('/')
        })
        .catch(err => {
            //req.flash('authEroor', err)
            error = err
            res.redirect('/login')
        })
}


exports.logout = (res, req, next) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}