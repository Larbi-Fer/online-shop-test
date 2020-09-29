const productsModel = require('../models/products.model')
const cartModel = require('../models/cart.model')

exports.getAdd = (req, res, next) => {
    res.render('add-product', {
        validationErrors: req.flash("validationErrors"),
        isUser: true,
        isAdmin: true,
        pageTitle: 'add Product'
    })
}

exports.postAdd = (req, res, next) => {
    productsModel.addNewProduct({
        name: req.body.name,
        image: req.file.filename,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category
    }).then(() => {
        req.flash("added", true)
        res.redirect('/admin/add')
    }).catch(err => {
        console.log(err)
        next(err)
    })
}

exports.getOrders = (req, res, next) => {
    cartModel.getAllOrders(req.session.userId).then(items => {
        res.render("M-Orders", {
            isAdmin: true,
            isUser: true,
            pageTitle: "Manage Orders",
            orders: items.items,
            email: items.email
        })
    }).catch(err => {
        console.log(err);
        next(err)
    })
}