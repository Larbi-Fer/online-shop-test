const authModel = require('../models/auth.model')

exports.getSingup = (req, res, next) => {
    res.render('singup', {
        authError: req.flash('authEroor')[0]
    });
};

exports.postSingup = (req, res, next) => {
    authModel.createNewUser(req.body.username, req.body.email, req.body.password)
        .then(() => res.redirect('/login')).catch(err => res.redirect('/singup'))
}

exports.getLogin = (req, res, next) => {
    res.render('login')
}

exports.postLogin = (req, res, next) => {
    authModel.login(req.body.email, req.body.password)
        .then((id) => {
            req.session.userId = id
            res.redirect('/')
        })
        .catch(err => {
            req.flash('authEroor', err)
            res.redirect('/login')
        })
}


exports.logout = (res, req, next) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}