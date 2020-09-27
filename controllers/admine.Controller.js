const productsModel = require('../models/products.model')

exports.getAdd = (req, res, next) => {
    res.render('add-product', {
        validationErrors: req.flash("validationErrors"),
        isUser: true,
        isAdmin: true
    })
}

exports.postAdd = (req, res, next) => {

}