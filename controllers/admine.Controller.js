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
    let promctsPromise
    var validCategories = ["pending", "send", "completed"]
    var category = req.query.category
    var emailQuery = req.query.q
    if (category && validCategories.includes(category)) promctsPromise = cartModel.getOrdersbyStatus(category)
    else if (emailQuery) promctsPromise = cartModel.getOrdersByEmail(emailQuery)
    else promctsPromise = cartModel.getAllOrders(req.session.userId)

    promctsPromise.then(items => {
        res.render("M-Orders", {
            isAdmin: true,
            isUser: true,
            pageTitle: "Manage Orders",
            orders: items
        })
    }).catch(err => {
        console.log(err);
        next(err)
    })

}

exports.saveOrder = (req, res, next) => {
    cartModel.editOrder(req.body.id, {
        status: req.body.status
    }).then(() => {
        res.redirect('/admin/orders')
    }).catch(err => {
        console.log(err);
        next(err)
    })
}