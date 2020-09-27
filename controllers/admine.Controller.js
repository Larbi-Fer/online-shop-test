const productsModel = require('../models/products.model')

exports.getAdd = (req, res, next) => {
    res.render('add-product', {
        validationErrors: req.flash("validationErrors"),
        isUser: true,
        isAdmin: true
    })
}

exports.postAdd = (req, res, next) => {
    productsModel.addProduct(req.body, req.file.filename).then(() => {
        req.flash("added", true)
        res.refirect('/admin/add')
    }).catch(err => {
        res.redirect('/error')
    })
}