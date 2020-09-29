const productsModel = require('../models/products.model')

exports.getAdd = (req, res, next) => {
    res.render('add-product', {
        validationErrors: req.flash("validationErrors"),
        isUser: true,
        isAdmin: true,
        pageTitle: 'add Product'
    })
}

exports.postAdd = (req, res, next) => {
    console.log("1", )
    productsModel.addNewProduct({
        name: req.body.name,
        image: req.file.filename,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category
    }).then(() => {
        //console.log("=================\n", req.body, "\n", req.file.filename);
        req.flash("added", true)
        res.redirect('/admin/add')
    }).catch(err => {
        console.log("=============================================\n", err)
        next(err)
    })
}